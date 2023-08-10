const PropSelectContainer = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col w-full">
    <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
      {title}
    </h3>
    <ul
      role="group"
      className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-800 dark:border-gray-600 dark:text-white"
    >
      {children}
    </ul>
  </div>
);

export default PropSelectContainer