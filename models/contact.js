const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  queries: [
    {
      name: {
        type: String,
      },
      message: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default: null,
      },
      submittedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export default Contact;
