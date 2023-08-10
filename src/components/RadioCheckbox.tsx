const RadioCheckbox = ({
  id,
  label,
  value,
  name,
  icon,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  value?: string | number;
  icon: React.ReactNode;
  onChange: (el: string) => void;
}) => (
  <div className="flex items-center pl-3">
    <input
      id={id}
      name={name}
      type="checkbox"
      onChange={() => onChange(id)}
      value={value}
      checked={value === id}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
    />
    <label
      htmlFor={id}
      className="w-full flex font-semibold items-center gap-2 py-3 ml-2 text-sm  text-gray-900 dark:text-gray-300"
    >
      {label}
      {icon}
    </label>
  </div>
);

export default RadioCheckbox;
