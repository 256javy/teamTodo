import { useState } from 'react';
import useTask from '../hooks/useTask';
import ModalAddUser from '../components/ModalAddUser';
import Users from '../components/Users';
import Alert from '../components/Alert';


const Main = () => {

  const { alert, modal, handleModal } = useTask();

  const closedModal = () => {
    setShowModal(false);
  }

  return (
    <>
      {alert?.message && <Alert type={alert.type} message={alert.message} />}
      {modal && <ModalAddUser/>}
      <header className="header">
        <h1 className="header__h1">Squad Tasks</h1>
        <button className="header__button" onClick={e => handleModal()}>Añadir Persona</button>
      </header>
      <main className="app">
        <Users />
      </main>
    </>
  )
}

export default Main