function InputField({ type, id, placeholder, value, onChange }) {
  return (
      <input
        type={type}
        id={id}
        className="w-full rounded-md bg-transparent border border-gray-400 hover:border-yellow-400 focus:outline-none active:border-yellow-400 py-2 text-sm text-white shadow-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="on"
      />
  );
}

export default InputField;
