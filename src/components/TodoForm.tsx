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

  function handleSubmit() {
      props.onSubmit();
  }

  return (
    <div className="todo-form">
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
    </div>
  );
}
