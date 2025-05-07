import React, { useState, useEffect } from "react";
import Header from "../components/static/Header";
import "../styles/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUser } from "../services/api";
import { formatDate } from "../utils/DateUtils";

export default function Home() {
    const [customers, setCustomers] = useState([]);
    const [reloadFlag, setReloadFlag] = useState(false);
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate("/customer/new");
    };

    const handleEdit = (user) => {
        navigate("/customer/update", { state: { user } });
    };
    
    const deleteUsers = async (id) => {
        try {
            const response = await deleteUser(id);
           
            if(response && response.type === "SUCCESS") {
                // Actualiza el estado local filtrando el usuario eliminado
                setCustomers(prevCustomers => prevCustomers.filter(user => user.id !== id));
            }
        } catch(error) {
            console.error("Delete error:", error);
            // Opcional: Mostrar mensaje de error al usuario
        }
    };
    
    const loadUsers = async () => {
        try {
            setCustomers(await getAllUsers());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadUsers();
    }, [reloadFlag]);

    return (
        <div className="app-container">
            <Header />
            <div className="content">
                <div className="add-button-container">
                    <button className="btn btn-outline-success" onClick={handleRegister}>Agregar nuevo</button>
                </div>
                <table className="table table-container">
                    <thead className="table-dark">
                        <tr>
                            <th>ID cliente</th>
                            <th>Nombre completo</th>
                            <th>CURP</th>
                            <th>Fecha de nacimiento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name} {user.lastName}</td>
                                <td>{user.curp}</td>
                                <td>{formatDate(user.birthDate)}</td>
                                <td>
                                    <div className="actions-container">
                                        <button className="btn btn-outline-warning" onClick={() => handleEdit(user)}>Editar</button>
                                        <button 
                                            className="btn btn-outline-danger" 
                                            onClick={() => deleteUsers(user.id)} 
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}