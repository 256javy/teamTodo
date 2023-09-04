import { useState } from 'react'
import useTask from '../hooks/useTask';

const ModalAddUser = ({closedModal}) => {

    const { addUser } = useTask();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [sending, setSending] = useState(false);

    const handleSubmit = async e => {
        setSending(true);
        e.preventDefault();
        //validar que los campos no esten vacios
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            alert('Todos los campos son obligatorios');
            setSending(false);
            return;
        }

        setSending(true);
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
            closedModal();
        } catch (error) {
            console.log(error);  
        } finally {
            setSending(false);
        }

    }


    return (
        <div className='modalcontainer'>
            <p className='modalx' onClick={e => closedModal()}>X</p>
            <form className="modaladduser"
                onSubmit={handleSubmit}
            >
                <div className='modaladduser__field'>
                    <label className="modaladduser__label" htmlFor="name">
                        Nombre del usuario
                    </label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" placeholder="Ingresa el nombre del usuario" className="modaladduser__input" />
                </div>
                <div className='modaladduser__field'>
                    <label className="modaladduser__label" htmlFor="email">
                        Email del usuario
                    </label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="email" placeholder="Ingresa el email del usuario" className="modaladduser__input" />
                </div>
                <div className='modaladduser__field'>
                    <label className="modaladduser__label" htmlFor="password">
                        Contraseña del usuario
                    </label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="text" id="password" placeholder="Ingresa el password del usuario" className="modaladduser__input" />
                </div>
                <input disabled={sending} type="submit" className='modaladduser__submit' />
            </form>
        </div>
    )
}

export default ModalAddUser;