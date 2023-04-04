import React from 'react';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function ListTask(props) {
    const navigate = useNavigate()
    const handleDelete = async (id) => {
        await fetch(`http://localhost:5001/${id}`, {
            method: "DELETE"
        })
        // result = await result.json()
        navigate("/")
        props.refresh()
        // console.log(props.refresh())
    }
    const handleEdit = async (id) => {
        props.updateTask(id)
        let result = await fetch(`http://localhost:5001/${id}`)
        result = await result.json()
        console.log(result)
        props.getTaskToEdit(result.title)

    }
    return (
        <div id="display-todo">
            {
                props.todo.length > 0 ?
                    props.todo.map((item, id) => {
                        return (
                            <ul key={item._id}>
                                <li>{item.title}</li>
                                <li>
                                    <button onClick={() => handleDelete(item._id)}>
                                        <MdDelete style={{color:"red"}}/>
                                    </button>
                                    <button
                                        onClick={() => { handleEdit(item._id) }}
                                    >
                                        <FiEdit style={{color:"blue"}}/>
                                    </button>
                                </li>
                            </ul>
                        )
                    }) :
                    null
            }
        </div>
    )
}

export default ListTask