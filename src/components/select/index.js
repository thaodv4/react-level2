import './style.css';

const Select = ({ onChange, options = [], defaultOptions, ...props }) => {
  return (
    <select onChange={onChange} {...props} className='select'>
      {defaultOptions && <option value={defaultOptions.id}>{defaultOptions.name}</option>}
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
