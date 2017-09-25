var mongoose = require('mongoose');

var userVerificationSchema = new mongoose.Schema({
    user_id: {
        type: String,
	unique: true,
	required: true
    },
    user_verified: {
        type: Boolean,
        default: false
    }
});


mongoose.model('userVerification', userVerificationSchema);
