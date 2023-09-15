
import { useEffect, useState } from "react";
import useTask from "../hooks/useTask"
import TaskPreview from "./TaskPreview";

const Tasks = ({ userid }) => {

    const [userTasks, setUserTasks] = useState([]);

    const { tasks, getTasksByUserId } = useTask();

    useEffect(() => {
        const taskResult = getTasksByUserId(userid);
        console.log(taskResult);
        setUserTasks(taskResult);
    }, [tasks]);

    return (
        <div className="tasks">
            {
                userTasks.map(task => (
                    <TaskPreview key={task._id} task={task}/>
                ))
            }
        </div>
    )
}

export default Tasks