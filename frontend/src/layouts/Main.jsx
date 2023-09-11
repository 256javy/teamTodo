import useTask from '../hooks/useTask';
import ModalAdd from '../components/ModalAdd';
import Users from '../components/Users';
import Alert from '../components/Alert';


const Main = () => {

  const { alert, modal, handleModal } = useTask();

  return (
    <>
      {alert?.message && <Alert type={alert.type} message={alert.message} />}
      {modal && <ModalAdd/>}
      <header className="header">
        <h1 className="header__h1">Squad Tasks</h1>
        <button className="header__button" onClick={e => handleModal('addUser')}>Añadir Persona</button>
        <button className="header__button" onClick={e => handleModal('addCategory')}>Añadir Categoria</button>
      </header>
      <main className="app">
        <Users />
      </main>
    </>
  )
}

export default Main