import { useEffect, useState } from 'react'
import useTask from '../hooks/useTask';
import useTranslate from '../hooks/useTranslate';

const TaskPreview = ({ task }) => {

    const { handleModal, getCategory } = useTask();

    const [priorityData, setPriorityData] = useState({});
    const [categoryData, setCategoryData] = useState({});

    useEffect(() => {
        const translate = useTranslate('Priority', task.priority);
        setPriorityData(translate);
    }, [task.priority]);

    useEffect(() => {
        const getCategoryData = async () => {
            const category = await getCategory(task.categoryId);
            setCategoryData(category);
        }
        getCategoryData();
    }, [task.category]);

    const handleEdit = () => {
        handleModal('editTask', null, task)
    }

    const viewTask = () => {
        handleModal('viewTask', null, task)
    }

    return (
        <li className='taskpreview'>
            <div className="taskpreview__buttons">
                <button type='button' className="taskpreview__button" onClick={handleEdit}>
                    <h2 className='taskpreview__name'>{task.name}</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="taskpreview__edit">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button>
                <button type="button" className='taskpreview__view' onClick={viewTask}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>
            <div className="taskpreview__info">
                <span className='taskpreview__category'>{categoryData.name}</span>
                <span className={`taskpreview__priority taskpreview__priority--${priorityData.modifier}`}>{priorityData.toSpanish}</span>
            </div>
        </li>
    )
}

export default TaskPreview