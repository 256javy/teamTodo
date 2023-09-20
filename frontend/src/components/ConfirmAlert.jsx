import useTask from "../hooks/useTask";
const ConfirmAlert = ({ title, message, data }) => {

  const { handleConfirmAlert, handleOk } = useTask();

  return (
    <div className='confirm'>
      <div className="confirm__content">
        <h2 className='confirm__h2'>{title}</h2>
        <p className='confirm__p'>{message}</p>
        <div className='confirm__buttons'>
          <button className='confirm__button confirm__button--yes' onClick={e => handleOk(data)}>Si</button>
          <button className='confirm__button confirm__button--no' onClick={handleConfirmAlert}>No</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmAlert;