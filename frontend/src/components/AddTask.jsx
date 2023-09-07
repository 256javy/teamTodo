import { useState } from 'react';
import useTask from '../hooks/useTask';

const AddTaskForm = () => {

    const { categories, addTask, handleModal, handleAlert, addTaskuserId } = useTask();
    const status = 'Not Started'; 
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [sending, setSending] = useState(false);

    const handleAddTask = async e => {
        setSending(true);
        e.preventDefault();
        if (taskName.trim() === '' || taskDescription.trim() === '' || taskPriority.trim() === '' || taskDueDate.trim() === '' || taskCategory.trim() === '') {//Todo si la categoria no existe alertar de que se debe crear una categoria
            handleAlert('Todos los campos son obligatorios');
            setSending(false);
            return;
        }
        try {
            const task = {
                name: taskName,
                description: taskDescription,
                priority: taskPriority,
                dueDate: taskDueDate,
                categoryId: taskCategory,
                status,
                userId: addTaskuserId,
                createdBy: addTaskuserId//TODO: cambiar por el id del usuario logueado
            }
            console.log(task)
            await addTask(task);
            setTaskName('');
            setTaskDescription('');
            setTaskPriority('');
            setTaskDueDate('');
            setTaskCategory('');
            handleModal();
        } catch (error) {
            console.log(error);
        }
        finally {
            setSending(false);
        }
    };

    return (
        <form className="form" onSubmit={handleAddTask}>
            <div className="form__field">
                <label htmlFor="name" className="form__label">
                    Titulo
                </label>
                <input
                    type="text"
                    className="form__input"
                    id="name"
                    value={taskName}
                    onChange={(event) => setTaskName(event.target.value)}
                />
            </div>
            <div className="form__field">
                <label htmlFor="description" className="form__label">
                    Descripción
                </label>
                <textarea
                    className="form__input"
                    id="description"
                    value={taskDescription}
                    onChange={(event) => setTaskDescription(event.target.value)}
                />
            </div>
            <div className="form__field">
                <label htmlFor="priority" className="form__label">
                    Prioridad
                </label>
                <select
                    className="form__input"
                    id="priority"
                    value={taskPriority}
                    onChange={(event) => setTaskPriority(event.target.value)}
                >
                    <option value="">Selecciona una prioridad</option>
                    <option value="High">Alta</option>
                    <option value="Medium">Media</option>
                    <option value="Low">Baja</option>
                    <option value="Urgent">Urgente  </option>
                </select>
            </div>
            <div className="form__field">
                <label htmlFor="dueDate" className="form__label">
                    Fecha de vencimiento
                </label>
                <input
                    type="date"
                    className="form__input"
                    id="dueDate"
                    value={taskDueDate}
                    onChange={(event) => setTaskDueDate(event.target.value)}
                />
            </div>
            <div className="form__field">
                <label htmlFor="category" className="form__label">
                    Categoría
                </label>
                <select
                    className="form__input"
                    id="category"
                    value={taskCategory}
                    onChange={(event) => setTaskCategory(event.target.value)}
                >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <input disabled={sending} type="submit" className={`form__submit ${sending ? 'form__submit--disabled' : ''}`} />
        </form>
    );
}

export default AddTaskForm;