/**
 * MAY Platform — User Authentication & Session Engine (js/auth.js)
 * Production Customer Account Architecture:
 * Supports Sign Up, Login, Logout, Forgot Password, Reset Password,
 * Profile Management, and Session Sync.
 * NO HARDCODED DEMO USERS.
 */

window.MAY_AuthEngine = {
  SESSION_KEY: 'MAY_ACTIVE_USER_SESSION',
  TOKEN_KEY: 'MAY_AUTH_TOKEN',

  // Get current authenticated user session
  getCurrentUser: function() {
    try {
      const active = localStorage.getItem(this.SESSION_KEY);
      if (active) return JSON.parse(active);
    } catch (e) {}
    return null;
  },

  // Save current active user session
  setCurrentUser: function(userObj) {
    if (!userObj) {
      localStorage.removeItem(this.SESSION_KEY);
      localStorage.removeItem(this.TOKEN_KEY);
      return;
    }
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(userObj));
    if (userObj.token) {
      localStorage.setItem(this.TOKEN_KEY, userObj.token);
    }
  },

  // Log Out current session
  logout: function() {
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    window.location.reload();
  },

  // Sign Up / Register new customer
  register: async function(name, email, password, phone, gst) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, gst })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        this.setCurrentUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Registration failed.' };
      }
    } catch (err) {
      return { success: false, message: 'Server error during registration.' };
    }
  },

  // Log In existing customer
  login: async function(email, password) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        this.setCurrentUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message || 'Login failed.' };
      }
    } catch (err) {
      return { success: false, message: 'Server error during login.' };
    }
  },

  // Request Password Reset Link
  forgotPassword: async function(email) {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      return { success: res.ok, message: data.message };
    } catch (err) {
      return { success: false, message: 'Server error.' };
    }
  },

  // Submit Password Reset
  resetPassword: async function(resetToken, newPassword) {
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resetToken, newPassword })
      });
      const data = await res.json();
      return { success: res.ok, message: data.message };
    } catch (err) {
      return { success: false, message: 'Server error.' };
    }
  },

  // Update Profile Details
  updateProfile: async function(name, phone, gst) {
    const current = this.getCurrentUser();
    if (!current) return { success: false, message: 'Not logged in' };

    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: current.email, name, phone, gst })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        this.setCurrentUser(data.user);
        return { success: true, user: data.user };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: 'Server error updating profile.' };
    }
  },

  // Auto-register purchaser after successful payment if no account exists
  autoRegisterPurchaser: function(email, name, orderDetails) {
    let current = this.getCurrentUser();
    if (!current || current.email.toLowerCase() !== email.toLowerCase()) {
      current = {
        id: 'usr_' + Date.now(),
        name: name || email.split('@')[0],
        email: email,
        phone: orderDetails.userPhone || '',
        gst: orderDetails.userGst || '',
        memberTier: 'Pro Growth Executive',
        purchasedCourses: orderDetails.itemType === 'course' ? [orderDetails.itemId] : [],
        purchasedProducts: orderDetails.itemType === 'product' ? [orderDetails.itemId] : [orderDetails.itemId],
        orders: [orderDetails],
        createdAt: new Date().toISOString()
      };
    } else {
      if (orderDetails.itemType === 'course' && !current.purchasedCourses.includes(orderDetails.itemId)) {
        current.purchasedCourses.push(orderDetails.itemId);
      }
      if (orderDetails.itemType === 'product' && !current.purchasedProducts.includes(orderDetails.itemId)) {
        current.purchasedProducts.push(orderDetails.itemId);
      }
      if (!current.orders) current.orders = [];
      current.orders.unshift(orderDetails);
    }
    this.setCurrentUser(current);
  }
};
