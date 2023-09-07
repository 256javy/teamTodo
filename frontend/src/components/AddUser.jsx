import React from 'react'
import { useState } from 'react'
import useTask from '../hooks/useTask';


const AddUser = () => {

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
        <form className="form"
            onSubmit={handleSubmit}
        >
            <div className='form__field'>
                <label className="form__label" htmlFor="name">
                    Nombre del usuario
                </label>
                <input value={name} autoComplete='off' onChange={e => setName(e.target.value)} type="text" id="name" placeholder="Ingresa el nombre del usuario" className="form__input" />
            </div>
            <div className='form__field'>
                <label className="form__label" htmlFor="email">
                    Email del usuario
                </label>
                <input value={email} autoComplete='off' onChange={e => setEmail(e.target.value)} type="email" id="email" placeholder="Ingresa el email del usuario" className="form__input" />
            </div>
            <div className='form__field'>
                <label className="form__label" htmlFor="password">
                    Contraseña del usuario
                </label>
                <input value={password} autoComplete='off' onChange={e => setPassword(e.target.value)} type="text" id="password" placeholder="Ingresa el password del usuario" className="form__input" />
            </div>
            <input disabled={sending} type="submit" className={`form__submit ${sending ? 'form__submit--disabled' : ''}`} />
        </form>
    )
}

export default AddUser