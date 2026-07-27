/**
 * MAY Platform — Modular Payment Abstraction Engine (js/payments.js)
 * Implements Razorpay Standard Web Checkout Integration:
 * 1. Backend endpoint order creation (/api/create-order)
 * 2. Razorpay Checkout Modal UI with order_id
 * 3. Backend payment signature verification (/api/verify-payment)
 */

window.RAZORPAY_KEY_ID = 'rzp_test_TIcKhGEt4zPejK';

window.MAY_PaymentEngine = {
  // Check if Razorpay Checkout SDK is loaded
  isRazorpayLoaded: function() {
    return typeof window.Razorpay !== 'undefined';
  },

  // Dynamically load Razorpay SDK if missing
  loadSDK: function() {
    return new Promise((resolve) => {
      if (this.isRazorpayLoaded()) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  },

  /**
   * Launch Razorpay Standard Web Checkout Payment Flow
   * @param {Object} itemDetails - { id, title, price, type }
   * @param {Object} userDetails - { name, email, phone, gst }
   * @param {Function} onSuccessCallback - Callback upon successful verified payment
   * @param {Function} onFailureCallback - Callback upon payment failure/cancellation
   */
  processCheckout: async function(itemDetails, userDetails, onSuccessCallback, onFailureCallback) {
    const isLoaded = await this.loadSDK();
    if (!isLoaded) {
      alert('Razorpay Payment SDK failed to load. Please check your internet connection.');
      if (onFailureCallback) onFailureCallback({ message: 'SDK Load Error' });
      return;
    }

    const orderId = 'MAY_ORD_' + Math.floor(100000 + Math.random() * 900000);
    const amountInPaise = Math.round(itemDetails.price * 100);

    if (amountInPaise < 100) {
      alert('Payment amount must be at least ₹1 (100 paise).');
      if (onFailureCallback) onFailureCallback({ message: 'Invalid amount' });
      return;
    }

    const orderPayload = {
      orderId: orderId,
      itemId: itemDetails.id,
      itemTitle: itemDetails.title,
      itemType: itemDetails.type || 'product',
      amount: itemDetails.price,
      amountInPaise: amountInPaise,
      currency: 'INR',
      userEmail: userDetails.email,
      userName: userDetails.name || 'Valued Growth Leader',
      userPhone: userDetails.phone || '',
      userGst: userDetails.gst || '',
      timestamp: new Date().toISOString()
    };

    try {
      // STEP 1: BACKEND - Create Order
      const createOrderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: orderId
        })
      });

      const orderData = await createOrderRes.json();

      if (!createOrderRes.ok || orderData.status === 'error') {
        throw new Error(orderData.message || 'Failed to create order on server');
      }

      // STEP 2: FRONTEND - Razorpay Checkout Modal
      const options = {
        key: orderData.key_id || window.RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Yash Agarwal (MeAgarwalYash.com)',
        description: itemDetails.title,
        image: 'maylogo.png',
        order_id: orderData.order_id,
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone
        },
        theme: {
          color: '#D4AF37'
        },
        handler: async function(response) {
          // STEP 3: BACKEND - Verify Payment Signature
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.status === 'success') {
              orderPayload.paymentId = response.razorpay_payment_id;
              orderPayload.razorpayOrderId = response.razorpay_order_id;
              orderPayload.razorpaySignature = response.razorpay_signature;
              orderPayload.verified = true;

              MAY_PaymentEngine.recordOrder(orderPayload);
              if (onSuccessCallback) onSuccessCallback(orderPayload);
            } else {
              alert('Payment Verification Failed: ' + (verifyData.message || 'Signature mismatch'));
              if (onFailureCallback) onFailureCallback(verifyData);
            }
          } catch (verifyErr) {
            alert('Payment Verification Error: ' + verifyErr.message);
            if (onFailureCallback) onFailureCallback(verifyErr);
          }
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed by user.');
            if (onFailureCallback) onFailureCallback({ message: 'Payment cancelled by user' });
          }
        }
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function(resp) {
        alert('Payment Failed: ' + (resp.error ? resp.error.description : 'Transaction failed'));
        if (onFailureCallback) onFailureCallback(resp.error);
      });

      rzp.open();
    } catch (err) {
      console.warn('Backend order endpoint error:', err.message);

      // Fallback preview mode if server backend API is unreachable or static preview
      alert('Order creation notice: ' + err.message + '\nPlease start server (node server.js or ./server.ps1) to create live Razorpay orders.');
      if (onFailureCallback) onFailureCallback(err);
    }
  },

  /**
   * Save successful transaction to LocalStorage & CMS Data Sync
   */
  recordOrder: function(orderPayload) {
    let savedCms = localStorage.getItem('MAY_WEBSITE_CMS_DATA');
    let cmsData = savedCms ? JSON.parse(savedCms) : {};

    if (!cmsData.orders) cmsData.orders = [];
    cmsData.orders.unshift(orderPayload);

    // Auto-provision user account if AuthEngine is available
    if (window.MAY_AuthEngine) {
      window.MAY_AuthEngine.autoRegisterPurchaser(orderPayload.userEmail, orderPayload.userName, orderPayload);
    }

    localStorage.setItem('MAY_WEBSITE_CMS_DATA', JSON.stringify(cmsData));

    // Broadcast across tabs
    if (window.BroadcastChannel) {
      const bc = new BroadcastChannel('MAY_CMS_CHANNEL');
      bc.postMessage({ type: 'CMS_UPDATE', data: cmsData });
    }
  }
};
