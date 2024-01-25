import './style.css';

const Select = ({ handleChange, options = [], defaultOptions, ...props }) => {
  return (
    <select onChange={handleChange} {...props} className='select'>
      {defaultOptions && <option>{defaultOptions.name}</option>}
      {options.map((option) => {
        return (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};
export default Select;
