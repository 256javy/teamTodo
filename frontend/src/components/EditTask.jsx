import { useState } from 'react';
import useTask from '../hooks/useTask';

const AddTaskForm = ({taskToEdit}) => {

    const { updateTask, handleModal, handleAlert } = useTask();

    const [taskName, setTaskName] = useState(taskToEdit.name);
    const [taskDescription, setTaskDescription] = useState(taskToEdit.description);
    const [taskDueDate, setTaskDueDate] = useState(taskToEdit.dueDate.substring(0, 10));
    const [sending, setSending] = useState(false);


    const handleEditTask = async e => {
        setSending(true);
        e.preventDefault();
        if (taskName.trim() === '' || taskDescription.trim() === '' ||  taskDueDate.trim() === '') {
            handleAlert('Todos los campos son obligatorios');
            setSending(false);
            return;
        }
        try {
            const task = {
                id: taskToEdit._id,
                name: taskName,
                description: taskDescription,
                dueDate: taskDueDate,
            }
            await updateTask(task, taskToEdit.userId);
            setTaskName('');
            setTaskDescription('');
            setTaskDueDate('');
            handleModal();
        } catch (error) {
            console.log(error);
        }
        finally {
            setSending(false);
        }
    };

    const handleDeleteTask = async ()  => {//TODO: Agregar alerta de confirmacion
        setSending(true);
        try {
            const task = {
                id: taskToEdit._id,
                status: 'Deleted'
            }
            await updateTask(task, taskToEdit.userId);
            setTaskName('');
            setTaskDescription('');
            setTaskDueDate('');
            handleModal();
        } catch (error) {
            console.log(error);
        }
        finally {
            setSending(false);
        }
    }

    return (
        <form className="form" onSubmit={handleEditTask}>
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
            <input disabled={sending} type="submit" className={`form__submit ${sending ? 'form__submit--disabled' : ''}`} value="Guardar Cambios"/>
            <input disabled={sending} type="button" className={`form__submit form__submit--delete ${sending ? 'form__submit--disabled' : ''}`} value="Eliminar Tarea" onClick={handleDeleteTask}/>
        </form>
    );
}

export default AddTaskForm;