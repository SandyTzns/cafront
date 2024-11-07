import React from "react";

function FormFileInput({ label, name, onChange }) {
  return (
    <div className="mb-3 row">
      <label htmlFor={name} className="col-form-label col-md-3 text-start">
        {label}
      </label>
      <div className="col-md-9">
        <input
          type="file"
          className="form-control"
          id={name}
          name={name}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default FormFileInput;
