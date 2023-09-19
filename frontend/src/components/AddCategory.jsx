import React from 'react'
import { useState } from 'react'
import useTask from '../hooks/useTask';


const AddCategoryForm = () => {

    const { userId, addCategory, handleModal, handleAlert } = useTask();
    const [categoryName, setCategoryName] = useState('');
    const [sending, setSending] = useState(false);

    const handleSubmit = async e => {
        setSending(true);
        e.preventDefault();
        if (categoryName.trim() === '') {
            handleAlert('Todos los campos son obligatorios');
            setSending(false);
            return;
        }
        if (!userId){
            handleAlert('No puedes crear una categoria sin estar logueado');
            setSending(false);
            return;
        }
        try {
            const category = {
                name: categoryName,
                userId,
                createdBy: userId,
                updatedBy: userId
            }
            await addCategory(category);
            setCategoryName('');
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
                    Nombre de la categoría
                </label>
                <input value={categoryName} autoComplete='off' onChange={e => setCategoryName(e.target.value)} type="text" id="name" placeholder="Ingresa el nombre de la categoría" className="form__input" />
            </div>
            <input disabled={sending} type="submit" className={`form__submit ${sending ? 'form__submit--disabled' : ''}`} />
        </form>
    );
}

export default AddCategoryForm;