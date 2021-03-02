import React, { Component } from "react";
import TaskItem from "./TaskItem";

export default class TaskList extends Component {
  render() {
    const { tasks } = this.props;
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
                  <input type="text" className="form-control" />
                </td>
                <td>
                  <select className="form-control">
                    <option value="-1">Tất Cả</option>
                    <option value="0">Ẩn</option>
                    <option value="1">Kích Hoạt</option>
                  </select>
                </td>
                <td></td>
              </tr>

              {/* Task Items */}
              {tasks
                ? tasks.map((task, index) => {
                    return (
                      <TaskItem
                        toggleStatus={this.props.toggleStatus}
                        deleteItem={this.props.deleteItem}
                        key={task.id}
                        task={task}
                        index={index}
                      />
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
