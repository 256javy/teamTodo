import { useEffect, useState } from 'react'

const TaskPreview = ({ task }) => {

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

        return (
            <div className='taskpreview'>
                <h2 className='taskpreview__name'>{task.name}</h2>
                <span className={`taskpreview__priority taskpreview__priority--${priorityData.modifier}`}>{priorityData.toSpanish}</span>
            </div>
        )
    }

export default TaskPreview