const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  rider: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider', required: true },
  role: {type: String, required:true},
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  destination: { type: String, required: true },
  tripdate: { type: String, required: true },
  comment: { type: String, required: true },
  responded: { type: Boolean, default: false },
  response: { type: String }
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
