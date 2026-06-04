"use client"

const AddRoomPage = () => {
    const onSubmit=async(e)=>{
        e.preventDefault()
        const formData= new FormData(e.currentTarget)
        const room= Object.fromEntries(formData.entries())
       
        const res=await fetch('http://localhost:5000/rooms',{
            method: 'POST',
             headers:
             {'Content-Type': 'application/json'},
              body: JSON.stringify(room)})
              const data= await res.json()
              console.log(data)
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
      onSubmit={onSubmit}
       className="w-full max-w-xl space-y-4 bg-white p-8 rounded-2xl shadow-md">
        
        <h1 className="text-2xl font-semibold text-center mb-2">
          Add Room
        </h1>

        {/* Room Name */}
        <input
          type="text"
          name="roomName"
          placeholder="Room Name"
          required
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          required
          className="border border-gray-300 rounded-lg p-3 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Image URL */}
        <input
          type="url"
          name="image"
          placeholder="Image URL"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Floor */}
        <input
          type="text"
          name="floor"
          placeholder="Floor (e.g. 3rd Floor)"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Capacity */}
        <input
          type="number"
          name="capacity"
          placeholder="Capacity (e.g. 4)"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Hourly Rate */}
        <input
          type="number"
          name="hourlyRate"
          placeholder="Hourly Rate ($)"
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Amenities */}
        <div className="space-y-2">
          <p className="font-semibold">Amenities</p>

          {["Whiteboard", "Projector", "Wi-Fi", "Power Outlets", "Quiet Zone", "Air Conditioning"].map(
            (item) => (
              <label key={item} className="flex items-center gap-2">
                <input type="checkbox" name="amenities" value={item} />
                <span>{item}</span>
              </label>
            )
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRoomPage;