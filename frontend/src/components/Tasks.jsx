
import { useEffect, useState } from "react";
import useTask from "../hooks/useTask"
import TaskPreview from "./TaskPreview";

const Tasks = ({ userId }) => {

    const [userTasks, setUserTasks] = useState([]);

    const {  addetTaskUserId, getTasksByUserId } = useTask();

    const getTasks = async () => {
        const tasks = await getTasksByUserId(userId);
        setUserTasks(tasks);
    }

    useEffect(() => {
        getTasks();
    }, [addetTaskUserId]); 

    useEffect(() => {
        if (addetTaskUserId === userId) {
            getTasks();
        }
    }, [addetTaskUserId]);    

    return (
        <ul className="tasks">
            {
                userTasks.map(task => <TaskPreview key={task._id} task={task} />)
            }
        </ul>
    )
}

export default Tasks