import React, { useState, useEffect, useRef } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdCancelPresentation } from 'react-icons/md';

interface TodoListProps {}

interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList(props: TodoListProps): React.ReactElement {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState<any[]>([]);

  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState('');

  const inputRef: any = useRef<HTMLDivElement>(null);

  // focus input at first render
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // get from localStorage
  useEffect(() => {
    const temp = localStorage.getItem('todos');
    const localTodos = JSON.parse(temp || '');
    if (localTodos.length > 0) setTodos(localTodos);
  }, []);

  // save to localStorage
  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem('todos', temp);
  }, [todos]);

  // add todos
  function handleAdd() {
    if (!input || /^\s*$/.test(input)) return;
    const newTodo: ITodo = {
      id: new Date().getTime(),
      text: input,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setInput('');
  }

  // toggle todos (complete)
  function toggleComplete(id: number) {
    const toggled = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(toggled);
  }

  // edit todos
  function handleEdit(id: number) {
    const updated = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updated);
    setTodoEditing(null);
  }

  // cancel edit
  function cancelEdit(id: number) {
    setTodoEditing(null);
  }

  // delete todos
  function handleDelete(id: number) {
    const updated = [...todos].filter((todo) => todo.id !== id);
    setTodos(updated);
  }

  // clear all todos
  function handleClearAll() {
    if (window.confirm('Are you sure you want to clear all todos?')) {
      setTodos([]);
    }
  }

  return (
    <>
      <h1>What's your Plan?</h1>
      <TodoForm
        value={input}
        setValue={setInput}
        onSubmit={handleAdd}
        buttonLabel={'Add Todo'}
        _ref={inputRef}
      />

      {todos.map((todo) => {
        return (
          <div
            key={todo.id}
            className={todo.completed ? 'todo-row complete' : 'todo-row'}
          >
            {todoEditing === todo.id ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="todo-input-edit"
                />
                <IoMdCheckmarkCircleOutline
                  onClick={() => handleEdit(todo.id)}
                  style={{ cursor: 'pointer' }}
                />
                <MdCancelPresentation
                  onClick={() => cancelEdit(todo.id)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            ) : (
              <div
                onClick={() => toggleComplete(todo.id)}
                style={{ cursor: 'pointer' }}
              >
                {todo.text}
              </div>
            )}

            {todoEditing ? undefined : (
              <div className="icons">
                {todo.completed ? undefined : (
                  <TiEdit
                    onClick={() => setTodoEditing(todo.id)}
                    className="edit-icon"
                  />
                )}
                <RiCloseCircleLine
                  onClick={() => handleDelete(todo.id)}
                  className="delete-icon"
                />
              </div>
            )}
          </div>
        );
      })}

      {todos.length > 3 && (
        <button className="clear-all-button" onClick={handleClearAll}>
          clear all
        </button>
      )}
    </>
  );
}
