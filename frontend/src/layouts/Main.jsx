import { useState } from 'react';
import useTask from '../hooks/useTask';
import ModalAdd from '../components/ModalAdd';
import Users from '../components/Users';
import Alert from '../components/Alert';
import ConfirmAlert from '../components/ConfirmAlert';
import { useEffect } from 'react';


const Main = () => {

  const { userId, alert, modal, handleModal, getUserById, handleLogin, handleLogout, confirmALert, confirmAlertContent } = useTask();
  const [userLoggedName, setUserLoggedName] = useState('')

  useEffect(() => {
    if (!userId) {
      handleModal('selectUser');
    }
  }, [])

  useEffect(() => {
    if (userId) {
      const getUser = async () => {
        const user = await getUserById(userId);
        setUserLoggedName(user.name);
      }
      getUser();
      return;
    }
    setUserLoggedName('');  
  }, [userId])

  return (
    <>
      {alert?.message && <Alert type={alert.type} message={alert.message} />}
      {modal && <ModalAdd />}
      {confirmALert && <ConfirmAlert title={confirmAlertContent.title} message={confirmAlertContent.message} data={confirmAlertContent.data} />}
      <header className="header">
        <h1 className="header__h1">Squad Tasks</h1>
        <button className="header__button" onClick={e => handleModal('addUser')}>Añadir Persona</button>
        <button className="header__button" onClick={e => handleModal('addCategory')}>Añadir Categoria</button>
        <div className='loginout'>
          {
            userId &&
            <button type="button" className="logout" onClick={handleLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="logout__icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </button>
          }
          <button type='button' className='loggeduser' onClick={handleLogin}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="loggeduser__usericon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h2 className='loggeduser__name'>{userLoggedName != '' ? userLoggedName : 'Login'}</h2>
          </button>
        </div>
      </header>
      <main className="app">
        <Users />
      </main>
    </>
  )
}

export default Main