export const Input = ({ label, required, value, type = "text", placeholder, onChange, min }) => {
  return (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            min={min}
            placeholder={placeholder}
            className="w-full rounded-lg border px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500"
        />    
    </div>
  );
}