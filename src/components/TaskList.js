import React, { Component } from "react";
import TaskItem from "./TaskItem";

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1,
    };
  }

  // hangle multi input
  onChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });

    this.props.filterItem(
      name === "filterName" ? value : this.state.filterName,
      name === "filterStatus" ? value : this.state.filterStatus
    );
  };

  render() {
    const { tasks } = this.props;
    const { filterName, filterStatus } = this.state;
    return (
      <div className="row mt-15">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Trạng Thái</th>
                <th className="text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="filterName"
                    onChange={this.onChange}
                    value={filterName}
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    value={filterStatus}
                    onChange={this.onChange}
                    name="filterStatus"
                  >
                    <option value={-1}>Tất Cả</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Kích Hoạt</option>
                  </select>
                </td>
                <td></td>
              </tr>

              {/* Task Items */}
              {tasks ? (
                tasks.map((task, index) => {
                  return (
                    <TaskItem
                      toggleStatus={this.props.toggleStatus}
                      deleteItem={this.props.deleteItem}
                      key={task.id}
                      task={task}
                      index={index}
                      showForm={this.props.showForm}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
