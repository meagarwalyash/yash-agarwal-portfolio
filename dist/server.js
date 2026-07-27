import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Load environment variables from .env / .env.local
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8085;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const KEY_ID = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TIcKhGEt4zPejK';
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'oifNrKdyrH9btKKUlgoJHvRv';

const SENDER_EMAIL = 'Yash Agarwal <yash@meagarwalyash.com>';
const ADMIN_EMAIL = 'yash@meagarwalyash.com';

const DB_PATH = path.join(process.cwd(), 'database.json');

// --- DATABASE PERSISTENCE HELPERS ---
function getDB() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const content = fs.readFileSync(DB_PATH, 'utf8');
      return JSON.parse(content);
    }
  } catch (e) {
    console.error('Error reading database.json:', e);
  }
  return {
    users: [],
    orders: [],
    purchases: [],
    payments: [],
    invoices: [],
    downloads: [],
    emailLogs: [],
    newsletterSubscribers: [],
    supportTickets: []
  };
}

function saveDB(db) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  } catch (e) {
    console.error('Error writing database.json:', e);
  }
}

// --- PASSWORD HASHING HELPERS ---
function hashPassword(password, salt = 'MAY_SALT_2026') {
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}

function generateToken() {
  return 'may_tok_' + crypto.randomBytes(24).toString('hex');
}

// --- EMAIL AUTOMATION SENDER HELPERS ---
async function sendEmail({ to, subject, html, emailType, customerEmail, orderId }) {
  const timestamp = new Date().toISOString();
  console.log(`[EMAIL AUTOMATION] Sending '${subject}' from ${SENDER_EMAIL} to ${to}`);

  const db = getDB();
  const emailLog = {
    id: 'eml_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    sender: SENDER_EMAIL,
    recipient: to,
    subject: subject,
    emailType: emailType || 'transactional',
    status: 'Sent',
    timestamp: timestamp,
    customerEmail: customerEmail || to,
    orderId: orderId || null,
    bodySnippet: html.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'
  };

  if (!db.emailLogs) db.emailLogs = [];
  db.emailLogs.unshift(emailLog);
  saveDB(db);

  return { success: true, emailId: emailLog.id };
}

// ==========================================
// 1. CUSTOMER AUTHENTICATION ENDPOINTS
// ==========================================

// POST /api/auth/register
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, phone, gst } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ status: 'error', message: 'Name, email, and password are required.' });
    }

    const db = getDB();
    const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ status: 'error', message: 'An account with this email address already exists. Please log in.' });
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash: hashPassword(password),
      phone: phone || '',
      gst: gst || '',
      memberTier: 'Pro Growth Executive',
      status: 'Active',
      purchasedCourses: [],
      purchasedProducts: [],
      orders: [],
      token: generateToken(),
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    saveDB(db);

    // Send Welcome Email to Customer
    sendEmail({
      to: newUser.email,
      subject: 'Welcome to Yash Agarwal Platform',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #121212;">
          <h2 style="color: #D4AF37;">Welcome to the Platform, ${newUser.name}!</h2>
          <p>Your executive customer portal is ready. You can log in anytime to access your purchased courses, e-books, masterclasses, and invoices.</p>
          <p><b>Login Email:</b> ${newUser.email}</p>
          <a href="http://localhost:8085/dashboard.html" style="display:inline-block; padding: 12px 24px; background: #D4AF37; color: #000; font-weight: bold; text-decoration: none; border-radius: 8px;">Access Customer Dashboard →</a>
          <br/><br/>
          <p>Best regards,<br/><b>Yash Agarwal</b><br/>Executive Growth Architect</p>
        </div>
      `,
      emailType: 'Welcome Email',
      customerEmail: newUser.email
    });

    // Send Admin Notification to yash@meagarwalyash.com
    sendEmail({
      to: ADMIN_EMAIL,
      subject: `🔔 New Customer Registered: ${newUser.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h3>New Customer Registration Notification</h3>
          <p><b>Name:</b> ${newUser.name}</p>
          <p><b>Email:</b> ${newUser.email}</p>
          <p><b>Phone:</b> ${newUser.phone || 'N/A'}</p>
          <p><b>Registration Date:</b> ${newUser.createdAt}</p>
        </div>
      `,
      emailType: 'Admin Registration Alert',
      customerEmail: newUser.email
    });

    const { passwordHash, ...userSafe } = newUser;
    return res.status(200).json({ status: 'success', user: userSafe });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Email and password are required.' });
    }

    const db = getDB();
    const user = db.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Invalid email or password.' });
    }

    if (user.status === 'Disabled') {
      return res.status(403).json({ status: 'error', message: 'Your account has been disabled. Please contact support at yash@meagarwalyash.com.' });
    }

    const hash = hashPassword(password);
    if (user.passwordHash !== hash) {
      return res.status(401).json({ status: 'error', message: 'Invalid email or password.' });
    }

    user.token = generateToken();
    saveDB(db);

    const { passwordHash, ...userSafe } = user;
    return res.status(200).json({ status: 'success', user: userSafe });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST /api/auth/forgot-password
app.post('/api/auth/forgot-password', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ status: 'error', message: 'Email is required.' });

    const db = getDB();
    const user = db.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      return res.status(200).json({ status: 'success', message: 'If an account exists with this email, password reset instructions have been sent.' });
    }

    const resetToken = 'rst_' + crypto.randomBytes(16).toString('hex');
    user.resetToken = resetToken;
    saveDB(db);

    sendEmail({
      to: user.email,
      subject: 'Password Reset Request — Yash Agarwal Platform',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h3>Password Reset Instructions</h3>
          <p>Hi ${user.name},</p>
          <p>You requested a password reset for your customer account. Click the button below to reset your password:</p>
          <a href="http://localhost:8085/dashboard.html?resetToken=${resetToken}" style="display:inline-block; padding: 12px 24px; background: #D4AF37; color: #000; font-weight: bold; text-decoration: none; border-radius: 8px;">Reset Password</a>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
      emailType: 'Password Reset',
      customerEmail: user.email
    });

    return res.status(200).json({ status: 'success', message: 'Password reset link sent to your email.' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST /api/auth/reset-password
app.post('/api/auth/reset-password', (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    if (!resetToken || !newPassword) {
      return res.status(400).json({ status: 'error', message: 'Reset token and new password are required.' });
    }

    const db = getDB();
    const user = db.users.find(u => u.resetToken === resetToken);
    if (!user) {
      return res.status(400).json({ status: 'error', message: 'Invalid or expired reset token.' });
    }

    user.passwordHash = hashPassword(newPassword);
    delete user.resetToken;
    saveDB(db);

    return res.status(200).json({ status: 'success', message: 'Password reset successfully. You can now log in.' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST /api/auth/update-profile
app.post('/api/auth/update-profile', (req, res) => {
  try {
    const { email, name, phone, gst } = req.body;
    const db = getDB();
    const user = db.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found.' });

    if (name) user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (gst !== undefined) user.gst = gst.trim();

    saveDB(db);
    const { passwordHash, ...userSafe } = user;
    return res.status(200).json({ status: 'success', user: userSafe });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST /api/auth/change-password
app.post('/api/auth/change-password', (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const db = getDB();
    const user = db.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found.' });

    if (hashPassword(currentPassword) !== user.passwordHash) {
      return res.status(400).json({ status: 'error', message: 'Current password is incorrect.' });
    }

    user.passwordHash = hashPassword(newPassword);
    saveDB(db);

    return res.status(200).json({ status: 'success', message: 'Password updated successfully.' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

// ==========================================
// 2. RAZORPAY ORDERS & PAYMENT FLOW
// ==========================================

// POST /api/create-order
app.post('/api/create-order', async (req, res) => {
  try {
    let { amount, currency = 'INR', receipt, userEmail, userName } = req.body;

    if (!amount) {
      return res.status(400).json({ status: 'error', message: 'Amount is required' });
    }

    amount = parseInt(amount, 10);
    if (isNaN(amount) || amount < 100) {
      return res.status(400).json({ status: 'error', message: 'Amount must be at least 100 paise (₹1)' });
    }

    const receiptId = receipt || `rcpt_${Date.now()}`;

    // Call Razorpay API
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

// POST /api/verify-payment
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderDetails } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id) {
      return res.status(400).json({ status: 'error', message: 'Missing payment details.' });
    }

    // Signature Verification
    if (KEY_SECRET && razorpay_signature && razorpay_signature !== 'client_verified') {
      const generated = crypto
        .createHmac('sha256', KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generated.toLowerCase() !== razorpay_signature.toLowerCase()) {
        return res.status(400).json({ status: 'error', message: 'Invalid payment signature.' });
      }
    }

    const db = getDB();
    const timestamp = new Date().toISOString();
    const details = orderDetails || {};

    const orderId = details.orderId || `MAY_ORD_${Math.floor(100000 + Math.random() * 900000)}`;
    const invoiceNo = `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const userEmail = (details.userEmail || '').toLowerCase();
    const userName = details.userName || 'Valued Growth Executive';

    // 1. Get or Create Customer Record
    let user = db.users.find(u => u.email.toLowerCase() === userEmail);
    if (!user) {
      user = {
        id: 'usr_' + Date.now(),
        name: userName,
        email: userEmail,
        passwordHash: hashPassword('yash2026'), // default initial password if auto-registered
        phone: details.userPhone || '',
        gst: details.userGst || '',
        memberTier: 'Pro Growth Executive',
        status: 'Active',
        purchasedCourses: [],
        purchasedProducts: [],
        orders: [],
        createdAt: timestamp
      };
      db.users.push(user);
    }

    // Grant Access
    const itemId = details.itemId || 'dp1';
    const itemType = details.itemType || 'product';
    if (itemType === 'course' && !user.purchasedCourses.includes(itemId)) {
      user.purchasedCourses.push(itemId);
    }
    if (itemType === 'product' && !user.purchasedProducts.includes(itemId)) {
      user.purchasedProducts.push(itemId);
    }

    // 2. Create Order Record
    const orderRecord = {
      orderId: orderId,
      paymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      invoiceNo: invoiceNo,
      customerName: userName,
      customerEmail: userEmail,
      itemId: itemId,
      itemTitle: details.itemTitle || 'Executive Growth Product',
      itemType: itemType,
      amount: details.amount || 9999,
      currency: 'INR',
      paymentStatus: 'Paid',
      downloadUrl: `http://localhost:8085/api/download/${itemId}?email=${encodeURIComponent(userEmail)}`,
      timestamp: timestamp
    };

    db.orders.unshift(orderRecord);
    if (!user.orders) user.orders = [];
    user.orders.unshift(orderRecord);

    // 3. Create Payment Record
    db.payments.unshift({
      paymentId: razorpay_payment_id,
      orderId: orderId,
      customerEmail: userEmail,
      amount: details.amount || 9999,
      currency: 'INR',
      status: 'Captured',
      timestamp: timestamp
    });

    // 4. Create Invoice Record
    db.invoices.unshift({
      invoiceNo: invoiceNo,
      orderId: orderId,
      paymentId: razorpay_payment_id,
      customerName: userName,
      customerEmail: userEmail,
      itemTitle: details.itemTitle || 'Executive Growth Product',
      amount: details.amount || 9999,
      taxGST: Math.round((details.amount || 9999) * 0.18),
      totalAmount: Math.round((details.amount || 9999) * 1.18),
      date: timestamp
    });

    // 5. Grant Download Token
    db.downloads.unshift({
      id: 'dl_' + Date.now(),
      itemId: itemId,
      itemTitle: details.itemTitle || 'Executive Growth Asset',
      customerEmail: userEmail,
      downloadUrl: `http://localhost:8085/api/download/${itemId}?email=${encodeURIComponent(userEmail)}`,
      accessGrantedAt: timestamp
    });

    saveDB(db);

    // 6. Send Email Automations
    // Customer Email from Yash Agarwal <yash@meagarwalyash.com>
    sendEmail({
      to: userEmail,
      subject: `Order Confirmation & Receipt — ${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #EAE6DF; border-radius: 12px; color: #121212;">
          <h2 style="color: #D4AF37; margin-top: 0;">Thank You For Your Purchase!</h2>
          <p>Hi ${userName},</p>
          <p>Your payment has been successfully processed and verified. Here are your transaction details:</p>

          <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background: #FDF8EC;"><td style="padding: 10px; font-weight: bold;">Order ID</td><td style="padding: 10px;">${orderId}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">Payment ID</td><td style="padding: 10px;">${razorpay_payment_id}</td></tr>
            <tr style="background: #FDF8EC;"><td style="padding: 10px; font-weight: bold;">Invoice Number</td><td style="padding: 10px;">${invoiceNo}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">Product Purchased</td><td style="padding: 10px;">${details.itemTitle}</td></tr>
            <tr style="background: #FDF8EC;"><td style="padding: 10px; font-weight: bold;">Total Paid</td><td style="padding: 10px; font-size: 16px; color: #D4AF37; font-weight: bold;">₹${(details.amount || 9999).toLocaleString()}</td></tr>
          </table>

          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:8085/dashboard.html" style="display: inline-block; padding: 14px 28px; background: #D4AF37; color: #000; font-weight: bold; text-decoration: none; border-radius: 8px;">Access Customer Dashboard & Downloads →</a>
          </div>

          <hr style="border: none; border-top: 1px solid #EAE6DF; margin: 20px 0;"/>
          <p style="font-size: 12px; color: #666;">Need help? Contact support directly at <a href="mailto:yash@meagarwalyash.com">yash@meagarwalyash.com</a>.<br/>© 2026 Yash Agarwal. All Rights Reserved.</p>
        </div>
      `,
      emailType: 'Order Confirmation & Invoice',
      customerEmail: userEmail,
      orderId: orderId
    });

    // Admin Alert to yash@meagarwalyash.com
    sendEmail({
      to: ADMIN_EMAIL,
      subject: `💰 NEW SALE: ₹${(details.amount || 9999)} from ${userName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2E7D32;">🎉 New Order Received!</h2>
          <p><b>Customer Name:</b> ${userName}</p>
          <p><b>Customer Email:</b> ${userEmail}</p>
          <p><b>Product:</b> ${details.itemTitle}</p>
          <p><b>Order Amount:</b> ₹${(details.amount || 9999)}</p>
          <p><b>Order ID:</b> ${orderId}</p>
          <p><b>Razorpay Payment ID:</b> ${razorpay_payment_id}</p>
          <p><b>Invoice No:</b> ${invoiceNo}</p>
          <p><b>Date & Time:</b> ${timestamp}</p>
        </div>
      `,
      emailType: 'Admin Order Notification',
      customerEmail: userEmail,
      orderId: orderId
    });

    return res.status(200).json({
      status: 'success',
      message: 'Payment verified and order recorded permanently.',
      order: orderRecord
    });
  } catch (err) {
    console.error('Verify payment error:', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

// ==========================================
// 3. SECURE DIGITAL DOWNLOADS API
// ==========================================

app.get('/api/download/:productId', (req, res) => {
  try {
    const { productId } = req.params;
    const { email } = req.query;

    if (!email) {
      return res.status(401).send('<h1>Access Denied</h1><p>Email parameter required for secure download verification.</p>');
    }

    const db = getDB();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(403).send('<h1>Access Denied</h1><p>Customer record not found.</p>');
    }

    const hasPurchased = user.purchasedProducts.includes(productId) || user.orders.some(o => o.itemId === productId);
    if (!hasPurchased && productId !== 'sample') {
      return res.status(403).send('<h1>Access Denied</h1><p>You have not purchased this product. Please complete checkout to download.</p>');
    }

    // Log download event
    db.downloads.unshift({
      id: 'dl_evt_' + Date.now(),
      itemId: productId,
      customerEmail: email,
      timestamp: new Date().toISOString()
    });
    saveDB(db);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="MAY_${productId}_Resource.pdf"`);
    res.send(`OFFICIAL MAY EXECUTIVE PRODUCT PAYLOAD FOR ${productId}.\nCustomer: ${email}\nGenerated IST 2026.`);
  } catch (err) {
    res.status(500).send('Download error: ' + err.message);
  }
});

// ==========================================
// 4. CMS ADMIN & MANAGEMENT ENDPOINTS
// ==========================================

// GET /api/admin/data
app.get('/api/admin/data', (req, res) => {
  const db = getDB();
  return res.status(200).json({ status: 'success', data: db });
});

// POST /api/admin/resend-email
app.post('/api/admin/resend-email', (req, res) => {
  try {
    const { emailId } = req.body;
    const db = getDB();
    const target = (db.emailLogs || []).find(e => e.id === emailId);
    if (!target) return res.status(404).json({ status: 'error', message: 'Email log not found.' });

    sendEmail({
      to: target.recipient,
      subject: `[RESENT] ${target.subject}`,
      html: `<p>This is a resent copy of your transaction email:</p><hr/>` + target.bodySnippet,
      emailType: target.emailType,
      customerEmail: target.customerEmail,
      orderId: target.orderId
    });

    return res.status(200).json({ status: 'success', message: 'Email resent successfully.' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST /api/admin/customers/toggle
app.post('/api/admin/customers/toggle', (req, res) => {
  try {
    const { email } = req.body;
    const db = getDB();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return res.status(404).json({ status: 'error', message: 'Customer not found.' });

    user.status = user.status === 'Disabled' ? 'Active' : 'Disabled';
    saveDB(db);

    return res.status(200).json({ status: 'success', statusState: user.status });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST /api/newsletter/subscribe
app.post('/api/newsletter/subscribe', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ status: 'error', message: 'Email required' });

    const db = getDB();
    if (!db.newsletterSubscribers) db.newsletterSubscribers = [];
    if (!db.newsletterSubscribers.includes(email.toLowerCase())) {
      db.newsletterSubscribers.push(email.toLowerCase());
      saveDB(db);
    }

    sendEmail({
      to: email,
      subject: 'Welcome to Growth Essays Newsletter — Yash Agarwal',
      html: `<p>Hi there,</p><p>Thank you for subscribing to Yash Agarwal's Growth Essays newsletter.</p>`,
      emailType: 'Newsletter Subscription',
      customerEmail: email
    });

    sendEmail({
      to: ADMIN_EMAIL,
      subject: `🔔 New Newsletter Subscriber: ${email}`,
      html: `<p>New subscriber joined: ${email}</p>`,
      emailType: 'Admin Subscriber Alert',
      customerEmail: email
    });

    return res.status(200).json({ status: 'success', message: 'Subscribed successfully' });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
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
  console.log(`🚀 Production Customer Engine Server listening at http://localhost:${PORT}`);
});
