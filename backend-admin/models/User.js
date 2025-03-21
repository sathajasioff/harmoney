const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: "admin" },
});

module.exports = mongoose.model("User", UserSchema);
export default User;
