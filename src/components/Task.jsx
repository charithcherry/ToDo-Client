import React,{useContext} from 'react'
import { taskContext } from '../pages/ToDo'
import { FiEdit } from 'react-icons/fi';


const Task = ({task}) => {
  const {handleTaskDelete,handleTaskSelect} =useContext(taskContext)
  const id=task.id
  return (
    <div className="task ">
      <input type="checkbox" className="task-checkbox" />
      <div className="task-text">{task.title}</div>
      <div className="task-buttons" onClick={()=>handleTaskSelect(id)}>
      <button className='task-button'>
      <FiEdit />
      </button>
      </div>
      <span className="task-delete" onClick={()=>handleTaskDelete(id)}>
        &times;
      </span>
    </div>
  )
}

export default Task
