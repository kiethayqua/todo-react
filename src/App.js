import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    this.setState({
      tasks: JSON.parse(localStorage.getItem("tasks")),
    });
  }

  generateData = () => {
    const tasks = [
      {
        id: this.generateId(),
        name: "Code",
        status: true,
      },
      {
        id: this.generateId(),
        name: "Ăn",
        status: false,
      },
      {
        id: this.generateId(),
        name: "Uống",
        status: true,
      },
    ];

    console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  generateString = () => {
    return Math.floor(1 * Math.random() * 0x10000).toString();
  };

  generateId = () => {
    return (
      this.generateString() +
      "-" +
      this.generateString() +
      this.generateString() +
      "-" +
      this.generateString() +
      this.generateString() +
      "-" +
      this.generateString()
    );
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
          <TaskForm />

          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <button type="button" className="btn btn-primary">
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
            <TaskList tasks={this.state.tasks} />
          </div>
        </div>
      </div>
    );
  }
}
