const mongoose = require('mongoose');



const bikeSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  price: Number,
  image: String,
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  riderIdPRoof:{
    type: String,
  },
  available: { type: Boolean, default: true },
  luggageOptions: {type:String,required:true} // Array of luggage objects
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;
