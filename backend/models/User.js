const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  profilePhoto: {
    type: String,
    default: null
  },
  skillsOffered: [{
    type: String,
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  }],
  skillsWanted: [{
    type: String,
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  }],
  availability: {
    weekdays: {
      type: Boolean,
      default: false
    },
    weekends: {
      type: Boolean,
      default: false
    },
    evenings: {
      type: Boolean,
      default: false
    },
    mornings: {
      type: Boolean,
      default: false
    }
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  banReason: {
    type: String,
    maxlength: [500, 'Ban reason cannot exceed 500 characters']
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  completedSwaps: {
    type: Number,
    default: 0
  },
  pendingSwaps: {
    type: Number,
    default: 0
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full profile URL
userSchema.virtual('profilePhotoUrl').get(function() {
  if (this.profilePhoto) {
    return `${process.env.BASE_URL}/uploads/${this.profilePhoto}`;
  }
  return null;
});

// Index for search functionality
userSchema.index({ 
  name: 'text', 
  'skillsOffered': 'text', 
  'skillsWanted': 'text',
  location: 'text'
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to update rating
userSchema.methods.updateRating = function(newRating) {
  const totalRating = this.rating.average * this.rating.count + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

// Method to get public profile (excludes sensitive data)
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordExpire;
  delete userObject.emailVerificationToken;
  delete userObject.emailVerificationExpire;
  delete userObject.isAdmin;
  delete userObject.isBanned;
  delete userObject.banReason;
  return userObject;
};

// Static method to find users by skills
userSchema.statics.findBySkills = function(skills, options = {}) {
  const query = {
    isPublic: true,
    isBanned: false,
    $or: [
      { skillsOffered: { $in: skills } },
      { skillsWanted: { $in: skills } }
    ]
  };

  if (options.location) {
    query.location = new RegExp(options.location, 'i');
  }

  if (options.availability) {
    const availabilityQuery = {};
    Object.keys(options.availability).forEach(key => {
      if (options.availability[key]) {
        availabilityQuery[`availability.${key}`] = true;
      }
    });
    if (Object.keys(availabilityQuery).length > 0) {
      query.$and = [availabilityQuery];
    }
  }

  return this.find(query)
    .select('name email location skillsOffered skillsWanted availability rating profilePhotoUrl')
    .sort(options.sort || { createdAt: -1 });
};

module.exports = mongoose.model('User', userSchema); 