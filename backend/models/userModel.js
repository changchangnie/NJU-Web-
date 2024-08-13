const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength:6,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
})

userSchema.pre('save',async function(next){
   if( !this.isModified('password')) return next();
   const hash = crypto.createHash('sha256');
   hash.update(this.password);
   this.password = hash.digest('hex');

   next();
});

userSchema.methods.comparePassword = function(password){
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    return this.password === hashedPassword;
}

module.exports = mongoose.model("User",userSchema);