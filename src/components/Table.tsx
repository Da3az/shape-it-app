const Table = ({
  headings,
  rows,
}: {
  headings: string[];
  rows: string[][];
}) => (
  <div className="relative overflow-x-auto ">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {headings.map((heading) => (
            <th
              key={heading}
              scope="col"
              className="px-6 py-3 font-medium uppercase tracking-wider text-white"
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr className="bg-white dark:bg-gray-800">
            {row.map((cell) => (
              <td className="px-6 py-4 text-white">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
