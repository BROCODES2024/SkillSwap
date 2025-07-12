const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: [
      'swap_request',
      'swap_accepted',
      'swap_rejected',
      'swap_completed',
      'swap_cancelled',
      'rating_received',
      'platform_message',
      'account_verified',
      'account_banned'
    ],
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  message: {
    type: String,
    required: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  relatedSwap: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Swap'
  },
  relatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isSystem: {
    type: Boolean,
    default: false
  },
  actionUrl: {
    type: String,
    maxlength: [200, 'Action URL cannot exceed 200 characters']
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Indexes for better query performance
notificationSchema.index({ recipient: 1, isRead: 1 });
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ type: 1, createdAt: -1 });

// Static method to create notification
notificationSchema.statics.createNotification = function(data) {
  return this.create(data);
};

// Static method to get user notifications
notificationSchema.statics.getUserNotifications = function(userId, options = {}) {
  const query = { recipient: userId };
  
  if (options.unreadOnly) {
    query.isRead = false;
  }
  
  if (options.type) {
    query.type = options.type;
  }
  
  return this.find(query)
    .populate('relatedSwap', 'requestedSkill offeredSkill status')
    .populate('relatedUser', 'name email profilePhotoUrl')
    .sort({ createdAt: -1 })
    .limit(options.limit || 50);
};

// Static method to mark notifications as read
notificationSchema.statics.markAsRead = function(userId, notificationIds = null) {
  const query = { recipient: userId };
  
  if (notificationIds) {
    query._id = { $in: notificationIds };
  }
  
  return this.updateMany(query, { isRead: true });
};

// Static method to get unread count
notificationSchema.statics.getUnreadCount = function(userId) {
  return this.countDocuments({ recipient: userId, isRead: false });
};

// Static method to create system notification
notificationSchema.statics.createSystemNotification = function(recipients, data) {
  const notifications = recipients.map(recipientId => ({
    ...data,
    recipient: recipientId,
    isSystem: true
  }));
  
  return this.insertMany(notifications);
};

// Pre-save middleware to validate related data
notificationSchema.pre('save', function(next) {
  // Validate that swap-related notifications have relatedSwap
  if (['swap_request', 'swap_accepted', 'swap_rejected', 'swap_completed', 'swap_cancelled'].includes(this.type)) {
    if (!this.relatedSwap) {
      return next(new Error('Swap-related notifications must have a relatedSwap'));
    }
  }
  
  // Validate that user-related notifications have relatedUser
  if (['rating_received'].includes(this.type)) {
    if (!this.relatedUser) {
      return next(new Error('User-related notifications must have a relatedUser'));
    }
  }
  
  next();
});

module.exports = mongoose.model('Notification', notificationSchema); 