import useTask from '../hooks/useTask'

const SelectUser = () => {

  const { users, handleModal, handleUserId } = useTask();

  const login = userId => {
    localStorage.setItem('userId', userId);
    handleUserId(userId);
    handleModal();
  }

  return (
    <section className='users'>
      <h2 className='users__h2'>¿Eres uno de estos usuarios? Si es así, selecciona tu nombre. Si no, cierra el modal y agrégate como usuario.</h2>
      <ul className='users__list'>
        {
          users.map(user => (
            <li key={user._id} id={user._id} className='optionuser' onClick={e => login(user._id)}>
              <p className='optionuser__name'>{user.name}</p>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default SelectUser