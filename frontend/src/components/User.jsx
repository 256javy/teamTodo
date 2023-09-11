import useTask from "../hooks/useTask"

const User = ({ userName, id }) => {

  const { handleModal } = useTask();

  return (
    <article className="user" id={id}>
      <header className="user__header">
        <h2 className="user__name">{userName}</h2>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 user__addtask" onClick={e => handleModal('addTask', id)} >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </header>
    </article>
  )
}


export default User