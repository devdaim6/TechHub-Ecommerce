const FormSelect = ({
  label,
  name,
  value,
  onChange,
  list,
  defaultValue,
  size,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        onChange={onChange}
        className={`select select-bordered ${size}`}
        defaultValue={defaultValue}
        value={value}
      >
        {list.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default FormSelect;
