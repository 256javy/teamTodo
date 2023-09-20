import { useState, useEffect, createContext } from "react";
import clienteAxios from "../api/clienteAxios";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {

    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const [users, setUsers] = useState([]);
    const [alert, setAlert] = useState({});
    const [modal, setModal] = useState(false);
    const [alertTimeout, setAlertTimeout] = useState(null);
    const [categories, setCategories] = useState([]);
    const [modalFor, setModalFor] = useState('');
    const [addTaskuserId, setAddTaskuserId] = useState('');
    const [addetTaskUserId, setAddetTaskUserId] = useState('');
    const [taskToEdit, setTaskToEdit] = useState({});
    const [confirmALert, serConfirmAlert] = useState(false);
    const [confirmAlertContent, setConfirmAlertContent] = useState({});

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await clienteAxios.get('/users');
                setUsers(data);
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
            } catch (error) {
                handleAlert('Hubo un error al obtener las categorias');
            }
        }
        getCategories();
    }, []);

    const handleUserId = userId => {
        setUserId(userId);
    }

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
            await clienteAxios.post('/tasks', task);
            handleAlert('Tarea creada correctamente', 'normal');
            setAddetTaskUserId(task.userId);
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

    const handleModal = (modalFor, userId, task) => {
        if (modal) {
            setModal(false);
            setModalFor('');
            return;
        }
        setAddetTaskUserId('');
        if (modalFor === 'addTask') {
            setAddTaskuserId(userId);
        } else if (modalFor === 'editTask') {
            setTaskToEdit(task);
        } else if (modalFor === 'viewTask') {
            setTaskToEdit(task);
        }
        setModalFor(modalFor);
        setModal(true);
    }

    const handleDelete = async (type, id) => {
        try {
            if (type === 'user') {
                await clienteAxios.delete(`/users/${id}`);
                setUsers(prevState => prevState.filter(user => user._id !== id));
                handleAlert('Usuario eliminado correctamente', 'normal');
            }
            if (type === 'category') {
                await clienteAxios.delete(`/categories/${id}`);
                setCategories(prevState => prevState.filter(category => category._id !== id));
                handleAlert('Categoria eliminada correctamente', 'normal');
            }
            if (type === 'task') {
                await clienteAxios.delete(`/tasks/${id}`);
                handleAlert('Tarea eliminada correctamente', 'normal');
            }
        } catch (error) {
            handleAlert(`Hubo un error al eliminar ${type}`);
        }
    }


    const getTasksByUserId = async filters => {
        let tasks = [];
        try {
            const { data } = await clienteAxios.post('/tasks/query/', filters);
            tasks = data;
        } catch (error) {
            console.log(error);
        }
        return tasks;
    }

    const updateTask = async (task, userId) => {
        try {
            await clienteAxios.patch(`/tasks/${task.id}`, task);
            handleAlert('Tarea editada correctamente', 'normal');
            setTaskToEdit({});
            setAddetTaskUserId(userId);
        } catch (error) {
            handleAlert('Hubo un error al editar la tarea')
        }
    }

    const getCategory = async categoryId => {
        let category = {};
        try {
            const { data } = await clienteAxios.get(`/categories/${categoryId}`);
            category = data;
        } catch (error) {
            console.log(error);
        }
        return category;
    }

    const getUserById = async userId => {
        let user = {};
        try {
            const { data } = await clienteAxios.get(`/users/${userId}`);
            user = data;
        } catch (error) {
            console.log(error);
        }
        return user;
    }

    const handleLogin = () => {
        if (userId) return;
        handleModal('selectUser');
    }

    const handleLogout = () => {
        localStorage.removeItem('userId');
        setUserId('');
    }

    const handleConfirmAlert = (title, message, data) => {
        serConfirmAlert(!confirmALert);
        if (confirmALert) {
            setConfirmAlertContent({});
            return;
        }
        setConfirmAlertContent({
            title,
            message,
            data
        });
    }

    const handleOk = data => {
        console.log(data);
        if(data.type == 'user') {
            handleDelete(data.type, data.userId);
        }
        if(data.type == 'task') {
            updateTask({
                id: data.id,
                status: data.status
            }, data.userId);
        }
        handleConfirmAlert();
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
                addTask,
                addTaskuserId,
                handleDelete,
                getTasksByUserId,
                addetTaskUserId,
                taskToEdit,
                updateTask,
                getCategory,
                getUserById,
                userId,
                handleUserId,
                handleLogin,
                handleLogout,
                confirmALert,
                handleConfirmAlert,
                confirmAlertContent,
                handleOk
            }
        }>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContext;
export { TaskProvider };
