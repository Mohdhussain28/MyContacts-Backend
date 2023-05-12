const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    phone: {
        type: String,
        required: [true, "Please add the email address"]
    },
    email: {
        type: String,
        required: [true, "Please add the email address"]
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Contact", contactSchema);

