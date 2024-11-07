import React from "react";

function FormTextInput({ label, name, type = "text", value, onChange }) {
  return (
    <div className="mb-3 row">
      <label htmlFor={name} className="col-form-label col-md-3 text-start">
        {label}
      </label>
      <div className="col-md-9">
        <input
          type={type}
          className="form-control"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default FormTextInput;
