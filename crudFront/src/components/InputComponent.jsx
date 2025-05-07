import React, { useState, useEffect } from "react";

export default function InputComponent({ 
    type = "text", 
    value: propValue = "", 
    onChange = () => {}, 
    label = "", 
    id = "", 
    error = "",
    maxLength = null,
    trimSpaces = false, // Evita espacios al inicio/fin
    disabled = false,
    placeholder = "",
    required = false
}) {
    const [internalValue, setInternalValue] = useState(propValue);
    const [charCount, setCharCount] = useState(propValue.length);

    // Sincroniza el valor interno con el prop
    useEffect(() => {
        setInternalValue(propValue);
        setCharCount(propValue.length);
    }, [propValue]);

    const handleChange = (e) => {
        let newValue = e.target.value;
        
        // Limpieza de espacios si trimSpaces es true
        if (trimSpaces && type === "text") {
            newValue = newValue.trimStart();
            if (newValue !== e.target.value) {
                e.target.value = newValue; // Forza la actualización en el input
            }
        }

        // Validación para números
        if (type === "number" && newValue && isNaN(newValue)) {
            return;
        }

        // Validación de maxLength
        if (maxLength && newValue.length > maxLength) {
            return;
        }

        setInternalValue(newValue);
        setCharCount(newValue.length);
        onChange(e); // Notifica al componente padre
    };

    return (
        <div className="input-container">
            {label && (
                <label htmlFor={id} className="input-label">
                    {label}
                    {required && <span className="required-asterisk"> *</span>}
                </label>
            )}
            
            <input
                type={type}
                value={internalValue}
                onChange={handleChange}
                id={id}
                className={`input-field ${error ? "input-error" : ""}`}
                disabled={disabled}
                placeholder={placeholder}
                maxLength={maxLength}
            />
            
            <div className="input-footer">
                {error && <span className="error-message">{error}</span>}
                {maxLength && (
                    <span className="char-counter">
                        {charCount}/{maxLength}
                    </span>
                )}
            </div>
        </div>
    );
}