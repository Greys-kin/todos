import React, { Component } from 'react';

import './app.css';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

export default class App extends Component {
  maxId = 100;

  state = {
    todos: [this.createTodo('Completed task'), this.createTodo('Editing task'), this.createTodo('Active task')],
    filter: 'all',
  };

  clearCompleted = () => {
    this.setState(({ todos }) => {
      const newArray = todos.filter((item) => !item.done);
      return { todos: newArray };
    });
  };

  addTodo = (text) => {
    const newTodo = this.createTodo(text);
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  propToggle = (arr, propName, id) => {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleDone = (id) => {
    this.setState(({ todos }) => ({
      todos: this.propToggle(todos, 'done', id),
    }));
  };

  showEditForm = (id) => {
    this.setState(({ todos }) => ({
      todos: this.propToggle(todos, 'isEditing', id),
    }));
  };

  deleteTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id),
    }));
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  editItem = (newName, id) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id);
      const oldItem = todos[idx];
      const newItem = { ...oldItem, label: newName, isEditing: !oldItem.isEditing };

      return { todos: [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)] };
    });
  };

  filter(items, filter) {
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
  }

  createTodo(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
      created: new Date(),
      isEditing: false,
    };
  }

  render() {
    const { filter, todos } = this.state;
    const activeCount = todos.filter((el) => !el.done).length;
    const visibleItems = this.filter(todos, filter);
    return (
      <section className="todoapp">
        <main className="main">
          <header className="header">
            <h1>todos</h1>
            <NewTaskForm addTask={this.addTodo} />
          </header>
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteTodo}
            toggleDone={this.onToggleDone}
            showEditForm={this.showEditForm}
            editItem={this.editItem}
          />
          <Footer
            active={activeCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </main>
      </section>
    );
  }
}
