import useTask from '../hooks/useTask';
import AddUser from './AddUser';
import AddCategory from './AddCategory';
import AddTask from './AddTask';
import EditTask from './EditTask';
import ViewTask from './ViewTask';

const ModalAdd = () => {

    const { handleModal, modalFor, taskToEdit } = useTask();

    return (
        <div className='modal'>
                <svg onClick={e => handleModal()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 modal__close">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            {
                modalFor === 'addUser' && <AddUser /> ||
                modalFor === 'addCategory' && <AddCategory /> ||
                modalFor === 'addTask' && <AddTask /> ||
                modalFor === 'editTask' && <EditTask taskToEdit={taskToEdit} /> ||
                modalFor === 'viewTask' && <ViewTask task={taskToEdit} />
            }
        </div>
    )
}

export default ModalAdd;