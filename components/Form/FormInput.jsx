const FormInput = ({
  label,
  name,
  value,
  onChange,
  type,
  defaultValue,
  size,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className={` w-[83vw] lg:w-[90vw]  input input-bordered ${size}`}
      />
    </div>
  );
};
export default FormInput;
