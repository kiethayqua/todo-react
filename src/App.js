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
      dataEdit: null,
      filter: { name: "", status: -1 },
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
      dataEdit: null,
    });
  };

  closeForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };

  showForm = (id) => {
    const tasks = this.state.tasks;
    const dataEdit = tasks.find((item) => {
      return item.id === id;
    });

    this.setState({
      isDisplayForm: true,
      dataEdit: dataEdit,
    });
  };

  addTask = (task) => {
    const tasks = this.state.tasks;
    if (task.id !== "") {
      const index = tasks.findIndex((item) => {
        return item.id === task.id;
      });
      tasks.splice(index, 1, task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      const id = this.generateId();
      task.id = id;
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    this.setState({
      tasks: tasks,
    });
  };

  deleteItem = (id) => {
    const tasks = this.state.tasks;
    const index = tasks.findIndex((item) => {
      return item.id === id;
    });
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.setState({
      tasks: tasks,
    });
  };

  toggleStatus = (id) => {
    const { tasks } = this.state;
    const index = tasks.findIndex((item) => {
      return item.id === id;
    });
    tasks[index].status = !tasks[index].status;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.setState({
      tasks: tasks,
    });
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

  filterItem = (filterName, filterStatus) => {
    console.log(filterName + "-" + filterStatus);
    this.setState({
      filter: {
        name: filterName,
        status: filterStatus,
      },
    });
  };

  render() {
    let { tasks, filter } = this.state;
    console.log(filter);
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((item) => {
          return (
            item.name.toLowerCase().indexOf(filter.name.toLowerCase()) > -1
          );
        });
      }

      if (parseInt(filter.status) >= 0) {
        switch (parseInt(filter.status)) {
          case 1:
            filter.status = true;
            break;
          case 0:
            filter.status = false;
            break;
        }
        tasks = tasks.filter((item) => {
          return item.status.toString() === filter.status.toString();
        });
      }
    }
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          {/* Task Form */}
          {this.state.isDisplayForm ? (
            <TaskForm
              closeForm={this.closeForm}
              addTask={this.addTask}
              dataEdit={this.state.dataEdit}
            />
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

            {/* Control */}
            <Control />

            {/* Task List */}
            <TaskList
              tasks={tasks}
              deleteItem={this.deleteItem}
              toggleStatus={this.toggleStatus}
              showForm={this.showForm}
              filterItem={this.filterItem}
            />
          </div>
        </div>
      </div>
    );
  }
}
