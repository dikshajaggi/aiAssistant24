import React, { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";

const BillingModal = ({ isOpen, onClose, patient, onSave }) => {
    console.log(isOpen, "checking")
  const [items, setItems] = useState([{ treatment: "", cost: "" }]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sum = items.reduce((acc, item) => acc + (Number(item.cost) || 0), 0);
    setTotal(sum);
  }, [items]);

  const handleChange = (index, e) => {
    const updated = [...items];
    updated[index][e.target.name] = e.target.value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { treatment: "", cost: "" }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      patient_id: patient.id,
      clinic_id: localStorage.getItem("clinic_id"),
      items,
      total_amount: total,
    };
    onSave(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-5 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-800">
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Generate Patient Bill — {patient.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Add treatments & costs to generate the bill.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
              
              {/* Treatment Input */}
              <input
                type="text"
                name="treatment"
                placeholder="Treatment (e.g. RCT, Filling, Implant)"
                value={item.treatment}
                onChange={(e) => handleChange(index, e)}
                className="w-full sm:w-3/5 px-3 py-2 rounded-lg border focus:outline-none"
                required
              />

              {/* Cost Input */}
              <input
                type="number"
                name="cost"
                placeholder="Cost ₹"
                value={item.cost}
                onChange={(e) => handleChange(index, e)}
                className="w-full sm:w-2/5 px-3 py-2 rounded-lg border focus:outline-none"
                required
              />

              {/* Delete Button */}
              <button onClick={() => removeItem(index)} className="cursor-pointer text-red-500 hover:opacity-80">
                <Trash2 size={18} />
              </button>

            </div>
          ))}

          {/* Add Item */}
          <button type="button" onClick={addItem} className="cursor-pointer flex items-center gap-2 text-sm bg-secondary1 text-white px-3 py-2 rounded-lg hover:opacity-90">
            <Plus size={16} /> Add Treatment
          </button>

          {/* Total */}
          <div className="bg-primary1/10 p-3 rounded-xl text-lg font-semibold text-primary1">
            Total Amount: ₹{total}
          </div>

          {/* Save */}
          <button type="submit" className="cursor-pointer w-full bg-primary1 text-white py-2 rounded-xl font-medium hover:opacity-90">
            Save & Generate Bill
          </button>
        </form>

      </div>
    </div>
  );
};

export default BillingModal;
