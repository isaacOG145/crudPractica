import React, { useState, useEffect } from "react";
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

export default function BirthDateInput({
  value = "",
  onChange = () => {},
  label = "Fecha de nacimiento",
  id = "birthDate",
  error = "",
  required = false
}) {
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (value) {
      setDate(parseISO(value));
    } else {
      setDate(null);
    }
  }, [value]);

  const handleChange = (selectedDate) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      onChange({
        target: {
          name: id,
          value: formattedDate
        }
      });
    } else {
      onChange({
        target: {
          name: id,
          value: ""
        }
      });
    }
  };

  return (
    <div className="input-container">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
          {required && <span className="required-asterisk"> *</span>}
        </label>
      )}

      <DatePicker
        selected={date}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        locale={es}
        placeholderText="Selecciona una fecha"
        className={`input-field ${error ? "input-error" : ""}`}
        id={id}
        showYearDropdown
        dropdownMode="select"
        maxDate={new Date()} // No permite fechas futuras
        yearDropdownItemNumber={100} // 100 años hacia atrás
        peekNextMonth
        showMonthDropdown
        isClearable
      />

      {error && <span className="error-message">{error}</span>}
    </div>
  );
}