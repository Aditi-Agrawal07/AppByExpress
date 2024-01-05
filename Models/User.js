const mongoose = require("mongoose");

// Schema for Users
const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: {
      salt: {
        type: String,
        select: false
      },
      hash: {
        type: String,
        select: false
      }
    
    },
  
    age: Number,
    country: String,
    weight: Number,
    role: {
      type: String,
      enum: ['student', 'teacher', 'recruiter'],
      default: 'student'
    },
     createdAt: Date
  },
  {
    timestamps: true,
  },
);

// Model for Users
const User = mongoose.model("User", UserSchema, "users");

module.exports = User;
