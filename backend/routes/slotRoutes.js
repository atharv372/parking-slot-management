const express = require("express");

const Slot = require("../models/Slot");

const router = express.Router();


// ================= GET ALL SLOTS =================
router.get("/", async (req, res) => {

  try {

    const slots = await Slot.find();

    res.status(200).json(slots);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ================= CREATE INITIAL SLOTS =================
router.post("/create", async (req, res) => {

  try {

    // Check if slots already exist
    const existingSlots = await Slot.find();

    if (existingSlots.length > 0) {
      return res.status(400).json({
        message: "Slots already created",
      });
    }

    const slots = [];

    // Create 10 slots
    for (let i = 1; i <= 10; i++) {

      slots.push({
        slotNumber: i,
      });
    }

    await Slot.insertMany(slots);

    res.status(201).json({
      message: "10 parking slots created successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
// ================= BOOK / UNBOOK SLOT =================
router.put("/:id", async (req, res) => {

  try {

    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found",
      });
    }

    // If slot is already booked -> unbook it
    if (slot.isBooked) {

      slot.isBooked = false;

      slot.vehicleNumber = "";

      slot.vehicleOwner = "";

      slot.bookedAt = null;

    } else {

      // Book slot with vehicle details
      slot.isBooked = true;

      slot.vehicleNumber = req.body.vehicleNumber;

      slot.vehicleOwner = req.body.vehicleOwner;

      slot.bookedAt = new Date();
    }

    await slot.save();

    res.status(200).json({
      message: "Slot updated successfully",
      slot,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
module.exports = router;