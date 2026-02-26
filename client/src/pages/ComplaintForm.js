import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/api/complaints",
        { title, description, category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Complaint submitted successfully 🎉");

      setTitle("");
      setDescription("");
      setCategory("");

    } catch (error) {
      toast.error("Error submitting complaint ❌");
      console.log(error.response);
    }
  };

    return (
  <div className="max-w-2xl mx-auto">
    <div className="bg-white p-8 rounded-2xl shadow-sm border">

      <h2 className="text-2xl font-bold mb-6">
        Submit a Complaint
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Complaint Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter complaint title"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            placeholder="Describe your issue..."
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="">Select Category</option>
            <option value="Academic">Academic</option>
            <option value="Hostel">Hostel</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Submit Complaint
          </button>
        </div>

      </form>
    </div>
  </div>
  );
}

export default ComplaintForm;