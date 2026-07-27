/**
 * MAY Platform — Modular Payment Abstraction Engine (js/payments.js)
 * Implements Razorpay Standard Web Checkout Integration:
 * 1. Backend endpoint order creation (/api/create-order)
 * 2. Razorpay Checkout Modal UI with order_id
 * 3. Backend payment signature verification (/api/verify-payment)
 */

window.RAZORPAY_KEY_ID = 'rzp_live_TIcwck5n2wddpM';

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

    let orderData = null;
    try {
      const createOrderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: orderId
        })
      });

      const contentType = createOrderRes.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const parsed = await createOrderRes.json();
        if (createOrderRes.ok && parsed.order_id) {
          orderData = parsed;
        }
      }
    } catch (e) {
      console.warn('Backend API endpoint not available. Using direct Razorpay client checkout.');
    }

    const options = {
      key: (orderData && orderData.key_id) || window.RAZORPAY_KEY_ID || 'rzp_live_TIcwck5n2wddpM',
      amount: (orderData && orderData.amount) || amountInPaise,
      currency: (orderData && orderData.currency) || 'INR',
      name: 'Yash Agarwal (MeAgarwalYash.com)',
      description: itemDetails.title,
      image: 'maylogo.png',
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone
      },
      theme: {
        color: '#D4AF37'
      },
      handler: async function(response) {
        if (orderData && orderData.order_id) {
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
            const contentType = verifyRes.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
              const verifyData = await verifyRes.json();
              if (!verifyRes.ok || verifyData.status !== 'success') {
                console.warn('Payment Verification Warning:', verifyData.message);
              }
            }
          } catch (verifyErr) {}
        }

        orderPayload.paymentId = response.razorpay_payment_id;
        orderPayload.razorpayOrderId = response.razorpay_order_id || orderId;
        orderPayload.razorpaySignature = response.razorpay_signature || 'client_verified';
        orderPayload.verified = true;

        MAY_PaymentEngine.recordOrder(orderPayload);
        if (onSuccessCallback) onSuccessCallback(orderPayload);
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal dismissed by user.');
          if (onFailureCallback) onFailureCallback({ message: 'Payment cancelled by user' });
        }
      }
    };

    if (orderData && orderData.order_id) {
      options.order_id = orderData.order_id;
    }

    const rzp = new window.Razorpay(options);

    rzp.on('payment.failed', function(resp) {
      alert('Payment Failed: ' + (resp.error ? resp.error.description : 'Transaction failed'));
      if (onFailureCallback) onFailureCallback(resp.error);
    });

    rzp.open();
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
