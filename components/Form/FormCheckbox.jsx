const FormCheckbox = ({
  isChecked,
  onChange,
  label,
  name,
  defaultValue,
  size,
}) => {
  return (
    <div className="form-control items-center">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={onChange}
        value={isChecked}
        defaultValue={isChecked}
        defaultChecked={defaultValue}
        className={`checkbox checkbox-accent ${size}`}
      />
    </div>
  );
};
export default FormCheckbox;
