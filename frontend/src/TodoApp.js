import React, { useEffect, useState } from 'react'
// import { FcPlus, FcOk } from "react-icons/fc";
import { IoCheckmarkDoneCircleSharp ,IoAddCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom"
import ListTask from './ListTask';
function TodoApp() {
    const [tasks, getALLtask] = useState([])
    const [newtaskIn, getTask] = useState("")
    const [taskId, updateTask] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        callTasks()
        console.log("called useeffect")
    }, [])
    const callTasks = async () => {
        let result = await fetch("https://todo-app-fullstack-syab.onrender.com/")
        result = await result.json()
        getALLtask(result)
    }
    const addTask = async () => {
        if (newtaskIn) {
            let result = await fetch("https://todo-app-fullstack-syab.onrender.com/", {
                method: "POST",
                body: JSON.stringify({ title: newtaskIn }),
                headers: {
                    "Content-type": "application/json"
                }

            })
            result = await result.json()
            console.log(result)
            navigate("/")
            getTask("")
            callTasks()
        }
    }
    const handleUpdate = async () => {
        let result = await fetch(`https://todo-app-fullstack-syab.onrender.com/${taskId}`,
            {
                method: "PUT",
                body: JSON.stringify({ title: newtaskIn }),
                headers: {
                    "Content-Type": "application/json"
                }

            })
        result = await result.json()
        if (result) {
            updateTask("")
            getTask("")
            callTasks()
        }
    }
    return (

        <div className='box'>
            <h1>To-Do List</h1>
            <div id="input-task">
                <input placeholder='Enter event..' onChange={(e) => { getTask(e.target.value) }} value={newtaskIn} />
                {taskId ? <button onClick={() => handleUpdate()}>
                    < IoCheckmarkDoneCircleSharp style={{color:"#f107bf"}}/>
                    </button> 
                    : 
                    <button onClick={() => addTask()}>
                        <IoAddCircle style={{color:"green"}} />
                        </button>}

            </div>
            {<ListTask
                todo={tasks}
                refresh={callTasks}
                updateTask={updateTask}
                getTaskToEdit={getTask}
            />}

        </div>
    )
}

export default TodoApp