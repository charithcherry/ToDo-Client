import axios from 'axios'
import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import uuid from 'react-uuid';
import TaskEdit from '../components/TaskEdit';


export const taskContext = React.createContext()

const ToDo = ({ user }) => {

  console.log("To Do list call")
  const [tasks, setTask] = useState([]);
  const [addTrigger,setAddTrigger]= useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState()
  const [selectedTask, setSelectedTask] = useState()



  setSelectedTask(tasks.find(task => task.id === selectedTaskId))
  

  const taskContextValue = {
    handleTaskAdd,
    handleTaskDelete,
    handleTaskSelect,
    handleTaskChange
  }

  function handleTaskSelect(id) {
    setSelectedTaskId(id)
  }

  function handleTaskChange(id, task) {
    console.log(task)
    const newTasks = [...tasks]
    //update call has to be made
    const index = newTasks.findIndex(r => r.id === id)
    newTasks[index] = task
    setTask(newTasks)
  }
  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding leading zero if needed
    const day = String(currentDate.getDate()).padStart(2, '0'); // Adding leading zero if needed
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }

  function handleTaskAddTrigger()
  {  
    
    setSelectedTask(
         { "title":"Enter Title",
          "description":"Enter the description",
          "dueDate":getCurrentDate(),
          "completed":false
        })
    
    setAddTrigger(true)
  }

  function handleTaskAdd() {
    let id= uuid()
    const numericId = parseInt(id.replace(/-/g, ''), 16);

    // const newTask = [{
    //   id:numericId,
    //   title: "New Task",
    //   description: "Describe your task",
    //   dueDate: getCurrentDate(),
    //   completed: false,
    //   userId: user.id   // to be changed
    // }]
    setSelectedTaskId(newTask.id)
    setTask([...tasks, newTask])

    // add task to sql
    const addNewData = async () => {
      console.log("use effect call " + process.env.REACT_APP_ADD_USER_TASKS)
      try {
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: process.env.REACT_APP_ADD_USER_TASKS,
          headers: {
            'Content-Type': 'application/json'
          },
          data: newTask
        };

        const response = await axios.request(config)
        console.log("new task added "+response.data)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    addNewData();

  }

  function handleTaskDelete(id) {
    setTask(tasks.filter(task => task.id !== id))
  }

  
  //use effect for first time rendering
  useEffect(() => {
    const fetchData = async () => {
      console.log("use effect call " + process.env.REACT_APP_GET_USER_TASKS)
      try {
        let data = {
          "userId": "12121212"
        }
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: process.env.REACT_APP_GET_USER_TASKS,
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };

        const response = await axios.request(config)
        setTask(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);




  // console.log(tasks)
  return (

    <taskContext.Provider value={taskContextValue}>

      <TaskList
        tasks={tasks}
      />
      <div>
          <button 
          className='btn btn--primary mr-1'
          onClick={handleTaskAddTrigger} >New Task</button> 
      </div>  
      {(selectedTask || addTrigger) && <TaskEdit selectedTask={selectedTask} addTrigger={addTrigger} />}
    </taskContext.Provider>


  )
}

export default ToDo
