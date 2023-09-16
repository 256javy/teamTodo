import { useEffect, useState } from 'react'
import useTask from '../hooks/useTask';

const TaskPreview = ({ task }) => {

    const { handleModal } = useTask();

    const [priorityData, setPriorityData] = useState({});

    const PRIORITY_LOW = 'Low';
    const PRIORITY_MEDIUM = 'Medium';
    const PRIORITY_HIGH = 'High';
    const PRIORITY_URGENT = 'Urgent';

    useEffect(() => {
        const handleTranslatePriority = () => {
            switch (task.priority) {
                case PRIORITY_LOW:
                    setPriorityData({
                        toSpanish: 'Baja',
                        modifier: 'low'
                    });
                    break;
                case PRIORITY_MEDIUM:
                    setPriorityData({
                        toSpanish: 'Media',
                        modifier: 'medium'
                    });
                    break;
                case PRIORITY_HIGH:
                    setPriorityData({
                        toSpanish: 'Alta',
                        modifier: 'high'
                    });
                    break;
                case PRIORITY_URGENT:
                    setPriorityData({
                        toSpanish: 'Urgente',
                        modifier: 'urgent'
                    });
                    break;
                default:
                    setPriorityData({
                        toSpanish: 'Baja',
                        modifier: 'low'
                    });
                    break;
            }
        }
        handleTranslatePriority();
    }, [task.priority]);

    const handleEdit = () => {
        handleModal('editTask', null, task)
    }

    return (
        <li className='taskpreview'>
            <button type='button' className="taskpreview__button" onClick={handleEdit}>
                <h2 className='taskpreview__name'>{task.name}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="taskpreview__edit">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </button>
            <span className={`taskpreview__priority taskpreview__priority--${priorityData.modifier}`}>{priorityData.toSpanish}</span>
        </li>
    )
}

export default TaskPreview