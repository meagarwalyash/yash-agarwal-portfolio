import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8085;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const KEY_ID = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_TIch4JGGb5hd8u';
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'UTUNQVotxJgwZXSI3plFgjP5';

/**
 * STEP 1: BACKEND - Create Order
 * Endpoint: POST /api/create-order
 * Request: { amount (in paise), currency, receipt }
 * Return: { order_id, amount, currency, key_id }
 */
app.post('/api/create-order', async (req, res) => {
  try {
    let { amount, currency = 'INR', receipt } = req.body;

    if (!amount) {
      return res.status(400).json({ status: 'error', message: 'Amount is required' });
    }

    amount = parseInt(amount, 10);
    if (isNaN(amount) || amount < 100) {
      return res.status(400).json({ status: 'error', message: 'Amount must be at least 100 paise (₹1)' });
    }

    if (!KEY_ID || !KEY_SECRET) {
      return res.status(401).json({ status: 'error', message: 'Razorpay credentials not configured' });
    }

    const receiptId = receipt || `rcpt_${Date.now()}`;

    // Call Razorpay Orders API: POST https://api.razorpay.com/v1/orders
    const authHeader = 'Basic ' + Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString('base64');
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        amount: amount,
        currency: currency,
        receipt: receiptId
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status || 500).json({
        status: 'error',
        message: data.error ? data.error.description : 'Failed to create Razorpay order'
      });
    }

    return res.status(200).json({
      order_id: data.id,
      amount: data.amount,
      currency: data.currency,
      key_id: KEY_ID
    });
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    return res.status(500).json({ status: 'error', message: err.message || 'Internal server error' });
  }
});

/**
 * STEP 3: BACKEND - Verify Signature
 * Endpoint: POST /api/verify-payment
 * Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
 * Compare generated signature with razorpay_signature
 */
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required parameters: razorpay_payment_id, razorpay_order_id, and razorpay_signature are required'
      });
    }

    if (!KEY_SECRET) {
      return res.status(401).json({ status: 'error', message: 'Razorpay secret key not configured' });
    }

    const generated_signature = crypto
      .createHmac('sha256', KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature.toLowerCase() === razorpay_signature.toLowerCase()) {
      return res.status(200).json({
        status: 'success',
        message: 'Payment verified successfully',
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id
      });
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid payment signature. Verification failed.'
      });
    }
  } catch (err) {
    console.error('Error verifying payment signature:', err);
    return res.status(500).json({ status: 'error', message: err.message || 'Internal server error' });
  }
});

// Serve Static Frontend Assets
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname));

app.get('*', (req, res) => {
  const filePath = path.join(__dirname, req.path === '/' ? 'index.html' : req.path);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.sendFile(filePath);
  } else {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Razorpay backend server listening at http://localhost:${PORT}`);
});
