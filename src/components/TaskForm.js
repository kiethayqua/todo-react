import React, { Component } from "react";

export default class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: false,
    };
  }

  closeForm = () => {
    this.props.closeForm();
  };

  // handling multiple input
  onChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault(); // ko refresh
    const data = {
      id: this.generateId(),
      name: this.state.name,
      status: this.state.status,
    };
    this.props.addTask(data);
    this.setState({
      name: "",
      status: false,
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

  render() {
    return (
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="panel panel-warning">
          <div
            className="panel-heading"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h3 className="panel-title">Thêm Công Việc</h3>
            <i
              className="fa fa-times-circle"
              aria-hidden="true"
              onClick={this.closeForm}
            ></i>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Tên :</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={this.onChange}
                  value={this.state.name}
                />
              </div>
              <label>Trạng Thái :</label>
              <select
                className="form-control"
                required="required"
                name="status"
                onChange={this.onChange}
              >
                <option value={true}>Kích Hoạt</option>
                <option value={false}>Ẩn</option>
              </select>
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-warning">
                  Thêm
                </button>
                &nbsp;
                <button type="submit" className="btn btn-danger">
                  Hủy Bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
