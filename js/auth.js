/**
 * MAY Platform — User Authentication & Session Engine (js/auth.js)
 * Manages user accounts, sessions, purchases, wishlist, and profile details.
 */

window.MAY_AuthEngine = {
  SESSION_KEY: 'MAY_ACTIVE_USER_SESSION',
  USERS_KEY: 'MAY_PLATFORM_USERS',

  // Initialize or get currentUser session
  getCurrentUser: function() {
    try {
      const active = localStorage.getItem(this.SESSION_KEY);
      if (active) return JSON.parse(active);
    } catch (e) {}

    // Default demo session for immediate testing if desired
    return null;
  },

  // Save current active user session
  setCurrentUser: function(userObj) {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(userObj));
    this.updateUserInStore(userObj);
  },

  // Log Out current session
  logout: function() {
    localStorage.removeItem(this.SESSION_KEY);
    window.location.reload();
  },

  // Log In with Email & Password
  login: function(email, password) {
    const users = this.getAllUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (found) {
      this.setCurrentUser(found);
      return { success: true, user: found };
    }

    // Auto-create user account on first login for friction-free UX
    const newUser = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: email.split('@')[0].replace('.', ' '),
      email: email,
      phone: '',
      gst: '',
      memberTier: 'Free Insider',
      purchasedCourses: ['c1'],
      purchasedProducts: ['dp1'],
      orders: [],
      createdAt: new Date().toISOString()
    };
    this.setCurrentUser(newUser);
    return { success: true, user: newUser, isNew: true };
  },

  // Auto-Register user upon completed purchase
  autoRegisterPurchaser: function(email, name, orderDetails) {
    const users = this.getAllUsers();
    let existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!existing) {
      existing = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        name: name || email.split('@')[0],
        email: email,
        phone: orderDetails.userPhone || '',
        gst: orderDetails.userGst || '',
        memberTier: 'Pro Growth Executive',
        purchasedCourses: orderDetails.itemType === 'course' ? [orderDetails.itemId] : ['c1'],
        purchasedProducts: orderDetails.itemType === 'product' ? [orderDetails.itemId] : ['dp1'],
        orders: [orderDetails],
        createdAt: new Date().toISOString()
      };
    } else {
      if (orderDetails.itemType === 'course' && !existing.purchasedCourses.includes(orderDetails.itemId)) {
        existing.purchasedCourses.push(orderDetails.itemId);
      }
      if (orderDetails.itemType === 'product' && !existing.purchasedProducts.includes(orderDetails.itemId)) {
        existing.purchasedProducts.push(orderDetails.itemId);
      }
      if (!existing.orders) existing.orders = [];
      existing.orders.unshift(orderDetails);
    }

    this.setCurrentUser(existing);
  },

  // Storage Helpers
  getAllUsers: function() {
    try {
      const stored = localStorage.getItem(this.USERS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  updateUserInStore: function(userObj) {
    let users = this.getAllUsers();
    const idx = users.findIndex(u => u.email.toLowerCase() === userObj.email.toLowerCase());
    if (idx >= 0) {
      users[idx] = userObj;
    } else {
      users.push(userObj);
    }
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }
};
