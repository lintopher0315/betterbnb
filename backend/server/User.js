const mongoose = require('mongoose');
const bycrypt = require(bycrypt);
SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    firstName: {  type: String, unique: false},
    lastName: { type: String, unique: false},
    google: {
        id: { type: String, required: false}
    },
    regularLogin: {
        username: { type: String, unique: false, required: false},
        username: { type: String, unique: false, required: false},
    }
})

UserSchema.methods.hashPassword = password => {
    return bycrypt.hashSync(password, SALT_WORK_FACTOR);
}

UserSchema.methods.checkPassword = password => {
    return bycrypt.compareSync(password, this.regularLogin.password);
}

UserSchema.pre('save', function(next) {
    if (!this.regularLogin.password) {
        console.log("no password");
        next();
    } else {
        this.regularLogin.password = this.hashPassword(this.regularLogin.password);
    }
})

module.exports = mongoose.model(User, UserSchema);
