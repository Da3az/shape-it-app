const CoordinateInput = ({
  id,
  name,
  label,
  value,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  value?: string | number;
  onChange: (el: string) => void;
}) => (
  <div className="flex items-center pl-3 py-2">
    <input
      id={id}
      name={name}
      onChange={(el) => onChange(el.target.value.replaceAll(/\D/g, ''))}
      value={value ?? ''}
      className="w-24 p-2  bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
    />
    <label
      htmlFor={id}
      className="w-full flex font-semibold items-center gap-2 ml-2 text-sm  text-gray-900 dark:text-gray-300"
    >
      {label}
    </label>
  </div>
);

export default CoordinateInput;
