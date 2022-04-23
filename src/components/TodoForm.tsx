import React from 'react';

interface TodoFormProps {
  value: string;
  setValue: (newValue: string) => void;
  onSubmit: () => void;
  buttonLabel: string;
  _ref?: any;
}

export default function TodoForm(props: TodoFormProps): React.ReactElement {
  function handleChange(event: any) {
    props.setValue(event.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    props.onSubmit();
  }

  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={props.value}
          onChange={handleChange}
          className="todo-input"
          placeholder="Add a todo"
          ref={props._ref}
        />
        <button onClick={handleSubmit} className="todo-button">
          {props.buttonLabel}
        </button>
      </form>
    </div>
  );
}
