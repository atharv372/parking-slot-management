const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({

  slotNumber: {
    type: Number,
    required: true,
    unique: true,
  },

  isBooked: {
    type: Boolean,
    default: false,
  },
  
  vehicleNumber: {
  type: String,
  default: "",
  },

  vehicleOwner:  {
  type: String,
  default: "",
  },

  bookedAt: {
  type: Date,
  default: null,
},

});

module.exports = mongoose.model("Slot", slotSchema);