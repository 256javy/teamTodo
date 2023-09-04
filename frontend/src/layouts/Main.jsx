import { useState } from 'react';
import useTask from '../hooks/useTask';
import ModalAddUser from '../components/ModalAddUser';
import Person from '../components/Person';

const Main = () => {

  const { users, setUsers } = useTask();
  const [showModal, setShowModal] = useState(false);

  const closedModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <header className="header">
        <h1 className="header__h1">Squad Tasks</h1>
        <button className="header__button" onClick={e => setShowModal(true)}>Añadir Persona</button>
      </header>
      <main className="app">
        {
          users.length > 0 ?
            users.map(user => <Person key={user._id} userName={user.name} email={user._} />)
            :
            <p className="app__p">No hay usuarios</p>
        }
      </main>
      {showModal && <ModalAddUser  closedModal={closedModal} />}
    </>
  )
}

export default Main