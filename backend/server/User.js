const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    firstName: {  type: String, unique: false},
    lastName: { type: String, unique: false},
    google: {
        id: { type: String, required: false}
    },
    regularLogin: {
        username: { type: String, unique: false, required: false},
        password: { type: String, unique: false, required: false},
    }
})

UserSchema.methods.hashPassword = password => {
    return bcrypt.hashSync(password, SALT_WORK_FACTOR);
}

UserSchema.methods.checkPassword = (password, actualPassword) => {
    return bcrypt.compareSync(password, actualPassword);
}

UserSchema.pre('save', function(next) {
    if (!this.regularLogin.password) {
        console.log("no password");
        next();
    } else {
        this.regularLogin.password = this.hashPassword(this.regularLogin.password);
        next();
    }
})

module.exports = mongoose.model('User', UserSchema);
