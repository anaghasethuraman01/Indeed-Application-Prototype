const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    conversationId: {
        type: String
    },
    sender: {
        type: String
    },
    messageText: {
        type: String
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);
