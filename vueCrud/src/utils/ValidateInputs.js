export const validateLetters = (value) => {
    if (!value) return false;
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(value) && value.length <= 50;
}

export const validateBirthDate = (value) => {
    if (!value) return false;
    
    const selectedDate = new Date(value);
    const today = new Date();
    
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    
    return selectedDate <= today;
}

export const validateCurp = (value) => {
    if (!value) return false;
    const regex = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z]{2}$/;
    return regex.test(value.toUpperCase());
}

export const validateMaxLength = (value, maxLength = 50) => {
    return value && value.length <= maxLength;
}

export const validationMessages = {
    letters: 'Solo se permiten letras (máx. 50 caracteres)',
    birthDate: 'La fecha no puede ser futura',
    curp: 'Formato de CURP inválido',
    required: 'Este campo es requerido'
};