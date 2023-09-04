import DropDownTaskList from "./DropDownTaskList"

const Person = ({ userName, id }) => {
  return (
    <article className="person">
      <h2 className="person__name">{userName}</h2>
      <form className="person__form">
        <textarea className="person__textarea" id={id} cols="30" rows="10">

        </textarea>
        <input className="person__addTask" type="submit" value="Agregar tarea" />
      </form>
      <section className="person__sectionTasks">
        <DropDownTaskList type="pendingTasks" />
        <DropDownTaskList type="completedTasks" />
      </section>
    </article>
  )
}

export default Person