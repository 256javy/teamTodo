import { useState, useEffect, createContext } from "react";
import clienteAxios from "../api/clienteAxios";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [alert, setAlert] = useState({});
    const [modal, setModal] = useState(false);
    const [alertTimeout, setAlertTimeout] = useState(null);
    const [categories, setCategories] = useState([]);
    const [modalFor, setModalFor] = useState('');
    const [tasks, setTasks] = useState([]);
    const [addTaskuserId, setAddTaskuserId] = useState('');

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

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await clienteAxios.get('/categories');
                setCategories(data);
                console.log(data);
            } catch (error) {
                handleAlert('Hubo un error al obtener las categorias');
            }
        }
        getCategories();
    }, []);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const { data } = await clienteAxios.get('/tasks');
                setTasks(data);
                console.log(data);
            } catch (error) {
                handleAlert('Hubo un error al obtener las tareas');
            }
        }
        getTasks();
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

    const addCategory = async category => {
        try {
            const { data } = await clienteAxios.post('/categories', category);
            setCategories(prevState => [...prevState, data]);
            handleAlert('Categoria creada correctamente', 'normal');
        } catch (error) {
            handleAlert('Hubo un error al crear la categoria')
        }
    }

    const addTask = async task => {
        try {
            const { data } = await clienteAxios.post('/tasks', task);
            setTasks(prevState => [...prevState, data]);
            handleAlert('Tarea creada correctamente', 'normal');
        } catch (error) {
            handleAlert('Hubo un error al crear la tarea')
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

    const handleModal = (modalFor, userId) => {
        if (modal) {
            setModal(false);
            setModalFor('');
            return;
        }
        if (modalFor === 'addTask') {
            setAddTaskuserId(userId);
        }
        setModalFor(modalFor);
        setModal(true);
    }

    return (
        <TaskContext.Provider value={
            {
                users,
                addUser,
                alert,
                handleAlert,
                modal,
                modalFor,
                handleModal,
                categories,
                addCategory,
                tasks,
                addTask,
                addTaskuserId
            }
        }>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContext;
export { TaskProvider };
