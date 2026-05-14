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

  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  vehicleNumber: {
  type: String,
  default: "",
  },

  vehicleOwner:  {
  type: String,
  default: "",
  },

  bookedBy: {
  type: String,
  default: "",
  },

  bookedAt: {
  type: Date,
  default: null,
},

});

module.exports = mongoose.model("Slot", slotSchema);