import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

const [vehicleNumber, setVehicleNumber] = useState("");

const [vehicleOwner, setVehicleOwner] = useState("");
  
  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try{
    const res = await axios.get("https://parking-backend-33il.onrender.com/api/slots");
    setSlots(res.data);
   } catch (err) {
     console.log(err);
   }
  };
  useEffect(() => {

  const storedUser = localStorage.getItem("user");

  if (!storedUser) {

    navigate("/");
  }

}, [navigate]);
const toggleSlot = async (slot) => {

  // If slot already booked -> unbook directly
  if (slot.isBooked) {

    try {

      await axios.put(
        `https://parking-backend-33il.onrender.com/api/slots/${slot._id}`
      );

      fetchSlots();

    } catch (err) {

      console.log(err);
    }

  } else {

    // Open booking form popup
    setSelectedSlot(slot);
  }
};
const handleBooking = async () => {

  try {

    await axios.put(
      `https://parking-backend-33il.onrender.com/api/slots/${selectedSlot._id}`,
      {
        vehicleNumber,
        vehicleOwner,
      }
    );

    setSelectedSlot(null);

    setVehicleNumber("");

    setVehicleOwner("");

    fetchSlots();

  } catch (err) {

    console.log(err);
  }
};
const totalSlots = slots.length;

const occupiedSlots = slots.filter(
  (slot) => slot.isBooked
).length;

const availableSlots = totalSlots - occupiedSlots;
 return (
  <div className="p-6 min-h-screen bg-gray-900">
    <h1 className="text-4xl font-bold text-center mb-8 text-white">
  Parking Slot Dashboard
</h1>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

  <div className="bg-blue-500 text-white p-6 rounded-lg text-center">

    <h2 className="text-2xl font-bold">
      {totalSlots}
    </h2>

    <p>Total Slots</p>

  </div>

  <div className="bg-green-500 text-white p-6 rounded-lg text-center">

    <h2 className="text-2xl font-bold">
      {availableSlots}
    </h2>

    <p>Available Slots</p>

  </div>

  <div className="bg-red-500 text-white p-6 rounded-lg text-center">

    <h2 className="text-2xl font-bold">
      {occupiedSlots}
    </h2>

    <p>Occupied Slots</p>

  </div>

</div>

    {/* SLOT GRID */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

      {slots.map((slot) => (

        <div
          key={slot._id}
          onClick={() => toggleSlot(slot)}
          className={`p-6 rounded-lg text-white text-center font-bold cursor-pointer transform hover:scale-105 transition duration-300 shadow-lg ${
            slot.isBooked ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <h2 className="text-xl font-bold">
            Slot {slot.slotNumber}
          </h2>

          {slot.isBooked && (
            <div className="mt-2 text-sm">

                <p>
                  {slot.vehicleNumber}
                </p>

                <p>
                  {slot.vehicleOwner}
                </p>

                <p>
                  {new Date(slot.bookedAt).toLocaleString()}
                </p>
          </div>
          )}
        </div>
      ))}
    </div>
    {/* POPUP */}
    {selectedSlot && (

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

        <div className="bg-white p-6 rounded-lg w-96">

          <h2 className="text-xl font-bold mb-4">
            Book Slot {selectedSlot.slotNumber}
          </h2>

          <input
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            className="w-full border p-2 mb-3"
          />

          <input
            placeholder="Owner Name"
            value={vehicleOwner}
            onChange={(e) => setVehicleOwner(e.target.value)}
            className="w-full border p-2 mb-3"
          />

          <button
            onClick={handleBooking}
            className="bg-green-500 text-white px-4 py-2 mr-2"
          >
            Confirm
          </button>

          <button
            onClick={() => setSelectedSlot(null)}
            className="bg-red-500 text-white px-4 py-2"
          >
            Cancel
          </button>

        </div>

      </div>

    )}

  </div>
);
}

export default Dashboard;