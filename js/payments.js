/**
 * MAY Platform — Modular Payment Abstraction Engine (js/payments.js)
 * Supports Razorpay (primary) + sandbox fallback mode for testing.
 */

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
   * Launch Checkout Payment Flow
   * @param {Object} itemDetails - { id, title, price, type, downloadUrl }
   * @param {Object} userDetails - { name, email, phone, gst }
   * @param {Function} onSuccessCallback - Callback upon successful payment
   * @param {Function} onFailureCallback - Callback upon payment failure
   */
  processCheckout: async function(itemDetails, userDetails, onSuccessCallback, onFailureCallback) {
    const isLoaded = await this.loadSDK();
    const orderId = 'MAY_ORD_' + Math.floor(100000 + Math.random() * 900000);
    const amountInPaisa = Math.round(itemDetails.price * 100);

    const orderPayload = {
      orderId: orderId,
      itemId: itemDetails.id,
      itemTitle: itemDetails.title,
      itemType: itemDetails.type || 'product',
      amount: itemDetails.price,
      amountInPaisa: amountInPaisa,
      currency: 'INR',
      userEmail: userDetails.email,
      userName: userDetails.name || 'Valued Growth Leader',
      userPhone: userDetails.phone || '',
      userGst: userDetails.gst || '',
      timestamp: new Date().toISOString()
    };

    // If Razorpay SDK is active and configured
    if (isLoaded && window.RAZORPAY_KEY_ID && window.RAZORPAY_KEY_ID !== 'YOUR_RAZORPAY_KEY_ID') {
      const options = {
        key: window.RAZORPAY_KEY_ID,
        amount: amountInPaisa,
        currency: 'INR',
        name: 'Yash Agarwal (MeAgarwalYash.com)',
        description: itemDetails.title,
        image: 'maylogo.png',
        handler: function(response) {
          orderPayload.paymentId = response.razorpay_payment_id;
          orderPayload.razorpaySignature = response.razorpay_signature;
          MAY_PaymentEngine.recordOrder(orderPayload);
          if (onSuccessCallback) onSuccessCallback(orderPayload);
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone
        },
        theme: {
          color: '#D4AF37'
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      // Instant High-Fidelity Sandbox Mode (for seamless preview without API keys)
      console.log('⚡ MAY Payment Engine: Launching Instant Sandbox Gateway...');
      setTimeout(() => {
        orderPayload.paymentId = 'pay_sandbox_' + Math.random().toString(36).substring(2, 10);
        orderPayload.mode = 'SANDBOX';
        MAY_PaymentEngine.recordOrder(orderPayload);
        if (onSuccessCallback) onSuccessCallback(orderPayload);
      }, 600);
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
