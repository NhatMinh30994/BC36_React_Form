import React, { Component } from "react";
import { connect } from "react-redux";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }
  state = {
    values: { maSV: "", fullName: "", phoneNumber: "", email: "" },
    errors: { maSV: "", fullName: "", phoneNumber: "", email: "" },
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(event);
    this.setState({
      values: { ...this.state.values, [name]: value },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event)
    // Kiểm tra form hợp lệ
    const isValid = event.target.checkValidity();
    if (!isValid) {
      return;
    }

    if (this.props.selectedStudent) {
      this.props.dispatch({
        type: "UPDATE_STUDENT",
        payload: this.state.values,
      });
    } else {
      this.props.dispatch({
        type: "ADD_STUDENT",
        payload: this.state.values,
      });
    }
  };

  handleBlur = (event) => {
    // console.log(event);
    let message = "";
    const { validationMessage, name, validity, title, minLength, maxLength } =
      event.target;
    const { valueMissing, tooShort, tooLong, patternMismatch } = validity;

    if (valueMissing) {
      message = `${title} không được để trống.`;
    }

    if (tooShort || tooLong) {
      message = `${title} phải đủ ${maxLength} số.`;
    }
    // console.log(message)
    // console.log(patternMismatch)
    if (patternMismatch) {
      message = `${title} không đúng định dạng.`;
    }

    this.setState({
      errors: {
        ...this.state.errors,
        // [name]: validationMessage,
        [name]: message,
      },
    });
  };

  static getDerivedStateFromProps(nextProps, currentState) {
    // console.log({ nextProps, currentState });
    if (
      nextProps.selectedStudent &&
      currentState.values.id !== nextProps.selectedStudent.id
    ) {
      currentState.values = nextProps.selectedStudent;
    }

    return currentState;
  }

  render() {
    const {
      maSV = "",
      fullName = "",
      phoneNumber = "",
      email = "",
    } = this.state.values || {};
    return (
      <div className="card p-0">
        <div className="card-header bg-dark text-white font-weight-bold">
          Thông tin đăng ký
        </div>
        <div className="card-body">
          <form ref={this.formRef} noValidate onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Mã SV</label>
                  <input
                    value={maSV}
                    required
                    title="Mã sinh viên"
                    name="maSV"
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  <span className="text-danger">{this.state.errors.maSV}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Họ tên</label>
                  <input
                    value={fullName}
                    required
                    title="Họ tên"
                    name="fullName"
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  <span className="text-danger">
                    {this.state.errors.fullName}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    value={phoneNumber}
                    required
                    title="Số điện thoại"
                    name="phoneNumber"
                    minLength={10}
                    maxLength={10}
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                  />
                  <span className="text-danger">
                    {this.state.errors.phoneNumber}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={email}
                    required
                    title="Email"
                    name="email"
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  />
                  <span className="text-danger">{this.state.errors.email}</span>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted">
              <button
                disabled={!this.formRef.current?.checkValidity()}
                className="btn btn-success mr-2"
              >
                Thêm sinh viên
              </button>
              <button type="reset" className="btn btn-outline-dark">
                RESET
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedStudent: state.studentReducer.selectedStudent,
  };
};

export default connect(mapStateToProps)(RegisterForm);
