import React,{useContext} from 'react'
import Task from './Task'
import { taskContext } from '../pages/ToDo'


const TaskList = ({ tasks }) => {
    const {handleTaskAdd} =useContext(taskContext)
    return (
        <>
           <div>
           {tasks &&
                tasks.map(task => {
                    return  <Task 
                    key={task.id} 
                    task={task}
                    />
                })} 
            </div>  
                   
        </>
    )
}

export default TaskList
