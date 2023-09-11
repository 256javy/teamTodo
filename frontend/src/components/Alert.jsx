
const Alert = ({type, message}) => {
  return (
    <div className={`alert alert--${type}`}>
        <div className={`alert__progress alert__progress--${type}`}> 
          <div className={`alert__progressbar alert__progressbar--${type}`}></div>
        </div>
        <p className="alert__message">{message}</p>
    </div>
  )
}

export default Alert