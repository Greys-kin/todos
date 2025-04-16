import React, { useState, useEffect, useRef } from 'react';

import './app.css';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

const App = () => {
  const maxId = useRef(100);
  const interval = useRef(null);
  const createTodo = (label, min = 0, sec = 0) => {
    const totalMilliseconds = (min * 60 + sec) * 1000;
    return {
      label,
      important: false,
      done: false,
      id: maxId.current++,
      created: new Date(),
      isEditing: false,
      timeLeft: totalMilliseconds,
      isPlay: false,
    };
  };
  const [todos, setTodos] = useState([
    createTodo('Completed task'),
    createTodo('Editing task'),
    createTodo('Active task'),
  ]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    return () => clearInterval(interval.current);
  }, []);

  const startTimer = (id) => {
    clearInterval(interval.current);
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, isPlay: true } : todo)));

    interval.current = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id && todo.timeLeft > 0 ? { ...todo, timeLeft: todo.timeLeft - 1000 } : todo
        )
      );
    }, 1000);
  };

  const stopTimer = (id) => {
    clearInterval(interval.current);
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, isPlay: false } : todo)));
  };

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((item) => !item.done));
  };

  const addTodo = (text, min = 0, sec = 0) => {
    const newTodo = createTodo(text, min, sec);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const propToggle = (arr, propName, id) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const onToggleDone = (id) => {
    setTodos((prevTodos) => propToggle(prevTodos, 'done', id));
  };

  const showEditForm = (id) => {
    setTodos((prevTodos) => propToggle(prevTodos, 'isEditing', id));
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const onFilterChange = (filter) => {
    setFilter(filter);
  };

  const editItem = (newName, id) => {
    setTodos((prevTodos) => {
      const idx = prevTodos.findIndex((el) => el.id === id);
      const oldItem = prevTodos[idx];
      const newItem = { ...oldItem, label: newName, isEditing: !oldItem.isEditing };
      return [...prevTodos.slice(0, idx), newItem, ...prevTodos.slice(idx + 1)];
    });
  };

  const filterItems = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'completed':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  const visibleItems = filterItems(todos, filter);
  const activeCount = todos.filter((el) => !el.done).length;

  return (
    <section className="todoapp">
      <main className="main">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={addTodo} />
        </header>
        <TaskList
          todos={visibleItems}
          onDeleted={deleteTodo}
          toggleDone={onToggleDone}
          showEditForm={showEditForm}
          editItem={editItem}
          startTimer={startTimer}
          stopTimer={stopTimer}
          isPlay={todos.isPlay}
        />
        <Footer active={activeCount} filter={filter} onFilterChange={onFilterChange} clearCompleted={clearCompleted} />
      </main>
    </section>
  );
};

export default App;
