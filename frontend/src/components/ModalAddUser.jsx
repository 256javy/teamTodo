import { useState } from 'react'
import useTask from '../hooks/useTask';

const ModalAddUser = () => {

    const { addUser, handleModal, handleAlert } = useTask();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [sending, setSending] = useState(false);

    const handleSubmit = async e => {
        setSending(true);
        e.preventDefault();
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            handleAlert('Todos los campos son obligatorios');
            setSending(false);
            return;
        }
        try {
            const user = {
                name,
                email,
                password
            }
            await addUser(user);
            setName('');
            setEmail('');
            setPassword('');
            handleModal();
        } catch (error) {
            console.log(error);
        } finally {
            setSending(false);
        }
    }


    return (
        <div className='modal'>
                <svg onClick={e => handleModal()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 modal__close">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            <form className="adduser"
                onSubmit={handleSubmit}
            >
                <div className='adduser__field'>
                    <label className="adduser__label" htmlFor="name">
                        Nombre del usuario
                    </label>
                    <input value={name} autoComplete='off' onChange={e => setName(e.target.value)} type="text" id="name" placeholder="Ingresa el nombre del usuario" className="adduser__input" />
                </div>
                <div className='adduser__field'>
                    <label className="adduser__label" htmlFor="email">
                        Email del usuario
                    </label>
                    <input value={email} autoComplete='off' onChange={e => setEmail(e.target.value)} type="email" id="email" placeholder="Ingresa el email del usuario" className="adduser__input" />
                </div>
                <div className='adduser__field'>
                    <label className="adduser__label" htmlFor="password">
                        Contraseña del usuario
                    </label>
                    <input value={password} autoComplete='off' onChange={e => setPassword(e.target.value)} type="text" id="password" placeholder="Ingresa el password del usuario" className="adduser__input" />
                </div>
                <input disabled={sending} type="submit" className={`adduser__submit ${sending ? 'adduser__submit--disabled' : ''}`} />
            </form>
        </div>
    )
}

export default ModalAddUser;