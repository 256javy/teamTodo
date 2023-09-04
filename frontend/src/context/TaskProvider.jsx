import { useState, useEffect, createContext } from "react";
import clienteAxios from "../api/clienteAxios";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [alerta, setAlerta] = useState({});

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await clienteAxios.get('/users');
                setUsers(data);
                console.log(data);
            } catch (error) {
                setAlerta({
                    error: true,
                    msg: 'Hubo un error al obtener los usuarios'
                });
            }
        }
        getUsers();
    }, []);

    const addUser = async user => {
        try {
            const { data } = await clienteAxios.post('/users', user);
            setUsers(prevState => [...prevState, data]);
            setAlerta({
                error: false,
                msg: 'Usuario creado correctamente'
            });
        } catch (error) {
            setAlerta({
                error: true,
                msg: 'Hubo un error al crear el usuario'
            });
        }
    }

    return (
        <TaskContext.Provider value={
            {
                users,
                setUsers,
                addUser,
            }
        }>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContext;
export { TaskProvider };
