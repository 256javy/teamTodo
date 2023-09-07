import { useState, useEffect, createContext } from "react";
import clienteAxios from "../api/clienteAxios";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [alert, setAlert] = useState({});
    const [modal, setModal] = useState(false);
    const [alertTimeout, setAlertTimeout] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await clienteAxios.get('/users');
                setUsers(data);
                console.log(data);
            } catch (error) {
                handleAlert('Hubo un error al obtener los usuarios');
            }
        }
        getUsers();
    }, []);

    const addUser = async user => {
        try {
            const { data } = await clienteAxios.post('/users', user);
            setUsers(prevState => [...prevState, data]);
            handleAlert('Usuario creado correctamente', 'normal');
        } catch (error) {
            handleAlert('Hubo un error al crear el usuario')
        }
    }

    const handleAlert = (message, type = 'error', time = 3000) => {
        if (alertTimeout) {
            clearTimeout(alertTimeout);
            setAlertTimeout(null);
            setAlert({});
            setTimeout(() => {
                newAlert(message, type, time);
            }, 50);
            return;
        }
        newAlert(message, type, time);
    }

    const newAlert = (message, type = 'error', time = 3000) => {
        document.documentElement.style.setProperty('--alert-time', `${time}ms`);
        setAlert({
            type,
            message
        });

        const timeoutId = setTimeout(() => {
            setAlert({});
            setAlertTimeout(null);
        }, time);

        setAlertTimeout(timeoutId);
    }

    const handleModal = () => {
        setModal(!modal);
    }

    return (
        <TaskContext.Provider value={
            {
                users,
                addUser,
                alert,
                handleAlert,
                modal,
                handleModal
            }
        }>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContext;
export { TaskProvider };
