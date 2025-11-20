const mongoose = require ("mongoose");

mongoose.connect("mongodb+srv://shreyasinghal5257:shreya2005@cluster21.wuupei6.mongodb.net/mymongo");

 // UserSchema 
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: {type: String, required: true },
    firstname: String,
    Lastname: String,
    email: { type: String, required:true, unique: true, match: [/.+\@.+\..+/, "Please fill a valid email address"]},
    Age: {type: Number, required: true},
});

const User = mongoose.model('User', userSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true },
    balance: {
        type: Number, 
        required: true}
})

const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User, Account
};

