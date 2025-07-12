const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requestedSkill: {
    type: String,
    required: [true, 'Requested skill is required'],
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  },
  offeredSkill: {
    type: String,
    required: [true, 'Offered skill is required'],
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  scheduledDate: {
    type: Date
  },
  completedDate: {
    type: Date
  },
  rating: {
    fromRequester: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        maxlength: [300, 'Comment cannot exceed 300 characters']
      },
      date: Date
    },
    fromRecipient: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        maxlength: [300, 'Comment cannot exceed 300 characters']
      },
      date: Date
    }
  },
  cancellationReason: {
    type: String,
    maxlength: [200, 'Cancellation reason cannot exceed 200 characters']
  },
  isRead: {
    requester: {
      type: Boolean,
      default: false
    },
    recipient: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
swapSchema.index({ requester: 1, status: 1 });
swapSchema.index({ recipient: 1, status: 1 });
swapSchema.index({ status: 1, createdAt: -1 });
swapSchema.index({ 'isRead.requester': 1, 'isRead.recipient': 1 });

// Virtual for checking if swap is overdue
swapSchema.virtual('isOverdue').get(function() {
  if (this.scheduledDate && this.status === 'accepted') {
    return new Date() > this.scheduledDate;
  }
  return false;
});

// Virtual for checking if both users have rated
swapSchema.virtual('isFullyRated').get(function() {
  return this.rating.fromRequester.rating && this.rating.fromRecipient.rating;
});

// Pre-save middleware to update user stats
swapSchema.pre('save', async function(next) {
  if (this.isNew) {
    // Update pending swaps count for both users
    await this.model('User').updateMany(
      { _id: { $in: [this.requester, this.recipient] } },
      { $inc: { pendingSwaps: 1 } }
    );
  } else if (this.isModified('status')) {
    const oldDoc = await this.model('Swap').findById(this._id);
    if (oldDoc && oldDoc.status !== this.status) {
      if (this.status === 'completed') {
        // Decrease pending and increase completed
        await this.model('User').updateMany(
          { _id: { $in: [this.requester, this.recipient] } },
          { $inc: { pendingSwaps: -1, completedSwaps: 1 } }
        );
      } else if (this.status === 'cancelled' || this.status === 'rejected') {
        // Decrease pending
        await this.model('User').updateMany(
          { _id: { $in: [this.requester, this.recipient] } },
          { $inc: { pendingSwaps: -1 } }
        );
      }
    }
  }
  next();
});

// Static method to get swaps for a user
swapSchema.statics.getUserSwaps = function(userId, status = null) {
  const query = {
    $or: [
      { requester: userId },
      { recipient: userId }
    ]
  };
  
  if (status) {
    query.status = status;
  }
  
  return this.find(query)
    .populate('requester', 'name email profilePhotoUrl')
    .populate('recipient', 'name email profilePhotoUrl')
    .sort({ createdAt: -1 });
};

// Static method to get pending swaps count
swapSchema.statics.getPendingCount = function(userId) {
  return this.countDocuments({
    $or: [
      { requester: userId },
      { recipient: userId }
    ],
    status: 'pending'
  });
};

// Method to mark as read
swapSchema.methods.markAsRead = function(userId) {
  if (this.requester.toString() === userId.toString()) {
    this.isRead.requester = true;
  } else if (this.recipient.toString() === userId.toString()) {
    this.isRead.recipient = true;
  }
  return this.save();
};

// Method to add rating
swapSchema.methods.addRating = function(userId, rating, comment) {
  const ratingData = {
    rating,
    comment,
    date: new Date()
  };
  
  if (this.requester.toString() === userId.toString()) {
    this.rating.fromRequester = ratingData;
  } else if (this.recipient.toString() === userId.toString()) {
    this.rating.fromRecipient = ratingData;
  }
  
  return this.save();
};

module.exports = mongoose.model('Swap', swapSchema); 