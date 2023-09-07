import useTask from "../hooks/useTask";
import User from "./User";

const Users = () => {

    const { users } = useTask();

    return (
        <>
            {
                users.map(user => <User key={user._id} userName={user.name} id={user._id} />)
            }
        </>
    )
}

export default Users