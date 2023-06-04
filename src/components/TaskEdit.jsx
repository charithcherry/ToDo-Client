import React,{useContext,useState} from 'react'
import { taskContext } from '../pages/ToDo'

const TaskEdit = ({ selectedTask,addTrigger }) => {
    const [listTitle,setListTitle] = useState(selectedTask?.title)
    const [listDescription,setListDescription] = useState(selectedTask?.description)
    const [listdueDate,setListdueDate] = useState(selectedTask?.dueDate)
    const [listCompleted,setCompleted] = useState(selectedTask?.completed)
    const {handleTaskSelect,handleTaskChange} =useContext(taskContext)
    
    console.log(selectedTask)
    
    
    function handleChange(changes)
    {
            handleTaskChange(selectedTask.id,{...selectedTask,...changes})
    }

    
    console.log(selectedTask)
    return (
        <div className='task-edit'>
            <div className='task-edit__remove-button-container'>
                <button className='btn task-edit__remove-button'onClick={() => handleTaskSelect(undefined)} >&times;</button>
            </div>
            <br></br>
            <div className='task-edit__details-grid'>
                <label htmlFor="title" className='task-edit__label'>Title</label>
                <input type='text' name="title" id="title" value={listTitle} className='task-edit__input' onChange={e => handleChange({ title: e.target.value })} />
                <label htmlFor="dueDate" className='task-edit__label'>Due Date</label>
                <input type='date' name="dueDate" id="dueDate" value={listdueDate} className='task-edit__input' onChange={e => handleChange({ dueDate: e.target.value })}/>
                <label htmlFor="Description" className='task-edit__label'>Description</label>
                <textarea name="description" id="description" value={listDescription} className='task-edit__input' onChange={e => handleChange({ description: e.target.value })}/>
                <label htmlFor="completed" className='task-edit__label'>Completed</label>
                <input type='checkbox' name="completed" id="completed" className='task-edit__input' checked={listCompleted} onChange={e => handleChange({ completed: e.target.value })}/>
            </div>
        </div>
    )
}

export default TaskEdit
