type IngredientInputProps = {
  id: number; // id 속성을 명시적으로 정의
  onRemove: (id: number) => void;
};
const options = ['g', 'ea'];

export const IngredientInput: React.FC<IngredientInputProps> = ({ id, onRemove }) => {
  const inputcss = () => {
    return ' px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-300 focus:border-2 ';
  };
  return (
    <tr key={id}>
      <th className="whitespace-nowrap  px-6 py-4 font-medium text-center">
        <input type="text" id={`${id}name-input`} className={inputcss()} required />
      </th>
      <th className="whitespace-nowrap  px-6 py-4 font-medium text-center">
        <input type="text" id={`${id}quantity-input`} className={inputcss()} required />
      </th>
      <th className="whitespace-nowrap  px-6 py-4 font-medium text-center">
        <select id={`${id}units-input`} className={inputcss()} required>
          {options.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </th>
      <th className="whitespace-nowrap  px-6 py-4 font-medium text-center">
        <button onClick={() => onRemove(id)}>재료 제거</button>
      </th>
    </tr>
  );
};
