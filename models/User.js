const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
});

const Users = mongoose.model('User-auth', UserSchema);
module.exports = Users;
