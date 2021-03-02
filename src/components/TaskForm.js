import React, { Component } from "react";

export default class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false,
    };
  }

  componentDidMount() {
    if (this.props.dataEdit) {
      this.setState({
        id: this.props.dataEdit.id,
        name: this.props.dataEdit.name,
        status: this.props.dataEdit.status,
      });
    }
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
    this.props.addTask(this.state);
    this.setState({
      name: "",
      status: false,
    });
  };

  clearForm = () => {
    this.setState({
      name: "",
      status: false,
    });
  };

  render() {
    return (
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="panel panel-warning">
          <div
            className="panel-heading"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h3 className="panel-title">
              {this.props.dataEdit ? "Chỉnh Sửa" : "Thêm Công Việc"}
            </h3>
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
                value={this.state.status}
              >
                <option value={"true"}>Kích Hoạt</option>
                <option value={"false"}>Ẩn</option>
              </select>
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-warning">
                  Thêm
                </button>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.clearForm}
                >
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
