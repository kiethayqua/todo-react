import React, { Component } from "react";

export default class TaskItem extends Component {
  deleteItem = () => {
    this.props.deleteItem(this.props.task.id);
  };
  render() {
    const { task, index } = this.props;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          {task.status ? (
            <span className="label label-success">Kích Hoạt</span>
          ) : (
            <span className="label label-danger">Ẩn</span>
          )}
        </td>
        <td className="text-center">
          <button type="button" className="btn btn-warning">
            <span className="fa fa-pencil mr-5"></span>Sửa
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.deleteItem}
          >
            <span className="fa fa-trash mr-5"></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}
