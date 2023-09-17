
import { useEffect, useState } from "react";
import useTask from "../hooks/useTask"
import TaskPreview from "./TaskPreview";


const Tasks = ({ userId }) => {

    const [userTasks, setUserTasks] = useState([]);
    const [filters, setFilters] = useState({
        status: 'Not Started',
        categoryId: '',
        priority: ''
    });

    const { addetTaskUserId, getTasksByUserId, categories } = useTask();

    const getTasks = async () => {
        const tasks = await getTasksByUserId({
            userId,
            status: filters.status.trim() === '' ? null : filters.status,
            categoryId: filters.categoryId.trim() === '' ? null : filters.categoryId,
            priority: filters.priority.trim() === '' ? null : filters.priority
        });
        setUserTasks(tasks);
    }

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        if (addetTaskUserId === userId) {
            getTasks();
        }
    }, [addetTaskUserId]);

    useEffect(() => {
        getTasks();
    }, [filters]);

    const handleChange = e => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <div className="filters">
                <div className="filter">
                    <label htmlFor={`status${userId}`} className="filter__name">Estado</label>
                    <select name="status" id={`status${userId}`} className='filter__select' value={filters.status} onChange={handleChange}>
                        {/* {<option className="filter__option" value="">Seleccione</option>} */}
                        <option className="filter__option" value="Not Started">No Iniciadas</option>
                        <option className="filter__option" value="In Progress">En Progreso</option>
                        <option className="filter__option" value="Completed">Completadas</option>
                        <option className="filter__option" value="Archived">Archivadas</option>
                        {/* <option className="filter__option" value="Deleted">Eliminadas</option> */}
                    </select>
                </div>
                <div className="filter">
                    <label htmlFor={`categoryId${userId}`} className="filter__name">Categoria</label>
                    <select name="categoryId" id={`categoryId${userId}`} className='filter__select' value={filters.categoryId} onChange={handleChange}>
                        <option className="filter__option" value="">Seleccione</option>
                        {
                            categories.map(category => <option key={category._id} className="filter__option" value={category._id}>{category.name}</option>)
                        }
                    </select>
                </div>
                <div className="filter">
                    <label htmlFor={`priority${userId}`} className="filter__name">Prioridad</label>
                    <select name="priority" id={`priority${userId}`} className='filter__select' value={filters.priority} onChange={handleChange}>
                        <option className="filter__option" value="">Seleccione</option>
                        <option className="filter__option" value="Low">Baja</option>
                        <option className="filter__option" value="Medium">Media</option>
                        <option className="filter__option" value="High">Alta</option>
                        <option className="filter__option" value="Urgent">Urgente</option>
                    </select>
                </div>
            </div>
            <ul className="tasks">
                {
                    userTasks.map(task => <TaskPreview key={task._id} task={task} />)
                }
            </ul>
        </>
    )
}

export default Tasks