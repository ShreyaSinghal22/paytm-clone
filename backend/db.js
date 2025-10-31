const mongoose = require ("mongoose");


mongoose.connect("mongodb://localhost:27017/mymongo");

 // UserSchema 
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: {type: String, required: true },
    firstname: String,
    Lastname: String,
    email: { type: String, required:true, unique: true, match: [/.+\@.+\..+/, "Please fill a valid email address"]},
    Age: {type: Number, required: true},
});

const user = mongoose.model('User', userSchema);

module.exports = {
    user
};

