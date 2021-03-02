import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("tasks"))
      this.setState({
        tasks: JSON.parse(localStorage.getItem("tasks")),
      });
  }

  toggleForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,
    });
  };

  closeForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };

  addTask = (task) => {
    const tasks = this.state.tasks;
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.setState({
      tasks: tasks,
    });
  };

  deleteItem = (id) => {
    const tasks = this.state.tasks;
    const index = tasks.findIndex((item) => {
      return item.id == id;
    });
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.setState({
      tasks: tasks,
    });
  };

  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          {/* Task Form */}
          {this.state.isDisplayForm ? (
            <TaskForm closeForm={this.closeForm} addTask={this.addTask} />
          ) : (
            ""
          )}

          <div
            className={
              this.state.isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.toggleForm}
            >
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.generateData}
            >
              <span className="fa fa-plus mr-5"></span>Generate Data
            </button>

            {/* Control */}
            <Control />

            {/* Task List */}
            <TaskList tasks={this.state.tasks} deleteItem={this.deleteItem} />
          </div>
        </div>
      </div>
    );
  }
}
