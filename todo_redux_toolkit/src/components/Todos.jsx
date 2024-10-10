import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, updateTodo } from '../features/todo/todoSlice'
import { FaEdit, FaSave, FaTrash } from "react-icons/fa"

function Todos() {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()
    const [editId, setEditId] = useState(null)
    const [editText, setEditText] = useState('')

    const handleEdit = (id, text) => {
        setEditId(id)
        setEditText(text)
    }

    const handleUpdate = () => {
        if (editText.trim()) {
            dispatch(updateTodo({ id: editId, newText: editText }))
            setEditId(null)
            setEditText('')
        }
    }

    return (
        <>
            <div className="text-xl font-bold text-center text-blue-600 mb-4 p-2 bg-gray-100 rounded-lg shadow">Todos</div>
            <ul className="list-none">
                {todos.map((todo) => (
                    <li
                        className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
                        key={todo.id}
                    >
                        {editId === todo.id ? (
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="text-black px-2 py-1 rounded flex-grow mr-2"
                            />
                        ) : (
                            <div className='text-white flex-grow'>{todo.text}</div>
                        )}
                        <div className="flex items-center">
                            {editId === todo.id ? (
                                <button
                                    onClick={handleUpdate}
                                    className="text-white bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-600 rounded text-md mr-2"
                                >
                                    <FaSave size={25}/>
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEdit(todo.id, todo.text)}
                                    className="text-white bg-blue-500 border-0 py-2 px-2 focus:outline-none hover:bg-blue-600 rounded text-md mr-2"
                                >
                                    <FaEdit size={25}/>
                                </button>
                            )}
                            <button
                                onClick={() => dispatch(removeTodo(todo.id))}
                                className="text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-md"
                            >
                                <FaTrash size={25}/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Todos