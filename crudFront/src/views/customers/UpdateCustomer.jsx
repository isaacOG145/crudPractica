import React, { useState, useEffect } from "react";
import Header from "../../components/static/Header";
import "../../styles/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { updateUser } from "../../services/api";
import InputComponent from "../../components/InputComponent";
import BirthDateInput from "../../components/BirthDateInput";
import { validateLetters, validateCurp } from './../../utils/ValidateInput';

export default function UpdateCustomer() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const user = state?.user;

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        lastName: "",
        curp: "",
        birthDate: ""
    });

    const [originalData, setOriginalData] = useState({});
    const [errors, setErrors] = useState({ name: "", lastName: "", curp: "" });

    useEffect(() => {
        if (user) {
            setFormData(user);
            setOriginalData(user); // Guardamos copia original para comparar cambios
        }
    }, [user]);

    const handleReturn = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            name: validateLetters(formData.name) ? "" : "Nombre inválido",
            lastName: validateLetters(formData.lastName) ? "" : "Apellido inválido",
            curp: validateCurp(formData.curp) ? "" : "CURP inválida"
        };
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error !== "");
        if (hasErrors) return;

        // Solo enviamos campos que hayan cambiado
        const changedFields = { id: formData.id };
        Object.keys(formData).forEach(key => {
            if (key !== "id" && formData[key] !== originalData[key]) {
                changedFields[key] = formData[key];
            }
        });

        try {
            const response = await updateUser(changedFields);
            console.log("Actualización exitosa:", response.message);
            navigate(-1);
        } catch (error) {
            console.error("Error al actualizar:", error.message);
        }
    };

    return (
        <div className="app-container">
            <Header />
            <div className="content">
                <div className="return-button-container">
                    <button className="btn btn-outline-primary" onClick={handleReturn}>Volver</button>
                </div>
                <div className="form-container card">
                    <div className="card-body">
                        <h2>Actualizar usuario</h2>
                        <form className="form-group" onSubmit={handleSubmit}>

                            <InputComponent
                                type="text"
                                label="Nombre(s)"
                                id="name"
                                maxLength={50}
                                trimSpaces={true}
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            {errors.name && <small className="text-danger">{errors.name}</small>}

                            <InputComponent
                                type="text"
                                label="Apellidos"
                                id="lastName"
                                maxLength={50}
                                trimSpaces={true}
                                required
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                            {errors.lastName && <small className="text-danger">{errors.lastName}</small>}

                            <InputComponent
                                type="text"
                                label="CURP"
                                id="curp"
                                maxLength={18}
                                trimSpaces={true}
                                required
                                value={formData.curp}
                                onChange={(e) => setFormData({ ...formData, curp: e.target.value })}
                            />
                            {errors.curp && <small className="text-danger">{errors.curp}</small>}

                            <BirthDateInput
                                id="birthDate"
                                required
                                value={formData.birthDate}
                                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                            />

                            <div className="d-flex justify-content-end">
                                <button className="btn btn-warning" type="submit">Actualizar</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
