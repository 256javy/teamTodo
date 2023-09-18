import { useState, useEffect } from 'react';
import useTask from "../hooks/useTask";
import useTranslate from '../hooks/useTranslate';

const ViewTask = ({ task }) => {

    const [categoryData, setCategoryData] = useState({});
    const [userData, setUserData] = useState({});
    const dueDateFormatted = new Date(task.dueDate).toLocaleDateString();

    const { getCategory, getUserById } = useTask();
    const { toSpanish:prioritySpanish } = useTranslate('Priority', task.priority);
    const statusSpanish = useTranslate('Status', task.status);

    useEffect(() => {
        const getCategoryData = async () => {
            const category = await getCategory(task.categoryId);
            setCategoryData(category);
        }
        const getUserData = async () => {
            const user = await getUserById(task.userId);
            setUserData(user);
        }
        getCategoryData();
        getUserData();
    }, []);

    return (
        <article className='taskview'>
            <header className="taskview__header">
                <h2 className='taskview__name'>{task.name}</h2>
                <div className='taskview__user'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="taskview__usericon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h2 className='taskview__username'>{userData?.name}</h2>
                </div>
            </header>
            <div className="taskview__body">
                <p className='taskview__description'>{task.description}</p>
            </div>
            <div className="taskview__footer">
                <p className='taskview__category'>Categoria: {categoryData.name}</p>
                <p className='taskview__priority'>Prioridad: {prioritySpanish}</p>
                <p className='taskview__date'>Fecha de Entrega: {dueDateFormatted}</p>
                <p className='taskview__status'>Estado: {statusSpanish}</p>
            </div>
        </article>
    )
}

export default ViewTask