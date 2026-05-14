function SlotCard({ slotNumber, status }) {

  return (
    <div
      className={`
        p-6 rounded-xl text-white text-center font-bold text-xl shadow-lg
        ${status === "available" ? "bg-green-500" : "bg-red-500"}
      `}
    >
      <h2>{slotNumber}</h2>

      <p className="mt-2 text-sm">
        {status}
      </p>
    </div>
  );
}

export default SlotCard;