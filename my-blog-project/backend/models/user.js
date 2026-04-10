const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ek email se ek hi account bane
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "https://via.placeholder.com/150", // Default image agar user upload na kare
    },
  },
  {
    timestamps: true, // Isse 'createdAt' aur 'updatedAt' apne aap ban jayenge
  }
);

// Password ko save karne se pehle encrypt (hash) karne ka logic
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Password match karne ke liye helper function
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;