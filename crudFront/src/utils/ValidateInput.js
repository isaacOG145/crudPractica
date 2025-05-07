export const validateLetters = (value) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(value);
}

export const validateCurp = (value) => {
    const regex = /^([A-Z]{4})(\d{6})([HM])([A-Z]{2})([B-DF-HJ-NP-TV-Z]{3})([A-Z\d]{1})(\d)$/;
    return regex.test(value.toUpperCase());
};
