const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address.']
  },
  phone: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  lastInteractedAt: {
    type: Date,
    default: null
  },
  noFollowUp: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index optimized for searches
ContactSchema.index({ firstName: 'text', lastName: 'text', company: 'text', email: 'text' });

module.exports = mongoose.model('Contact', ContactSchema);