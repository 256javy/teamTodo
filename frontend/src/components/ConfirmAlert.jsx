
const ConfirmAlert = ({title, message}) => {
  return (
    <div className='confirm'>
        <h2 className='confirm__h2'>{title}</h2>
        <p className='confirm__p'>{message}</p>
        <div className='confirm__buttons'>
            <button className='confirm__button confirm__button--yes'>Si</button>
            <button className='confirm__button confirm__button--no'>No</button>
        </div>
    </div>
  )
}

export default ConfirmAlert;