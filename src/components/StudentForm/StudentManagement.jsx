import React, { Component } from "react";

import { connect } from "react-redux";

class StudentManagement extends Component {
  state = {
    keyword: "",
  };
  
  renderContent = () => {
    const filterData = this.props.studentList.filter(ele => {
      return ele.fullName.toLowerCase().indexOf(this.state.keyword.toLowerCase()) !== -1;
    })
    return filterData.map((element, idx) => {
      return (
        <tr
          key={element.maSV}
          className={idx % 2 === 0 ? "bg-light" : undefined}
        >
          <td>{element.maSV}</td>
          <td>{element.fullName}</td>
          <td>{element.phoneNumber}</td>
          <td>{element.email}</td>
          <td>
            <button
              onClick={() => this.setSelectedStudent(element)}
              className="btn btn-info mr-2"
            >
              SỬA
            </button>
            <button
              onClick={() => this.deleteStudent(element)}
              className="btn btn-danger"
            >
              XÓA
            </button>
          </td>
        </tr>
      );
    });
  };

  setSelectedStudent = (student) => {
    this.props.dispatch({
      type: "SET_SELECTED_STUDENT",
      payload: student,
    });
  };

  deleteStudent = (student) => {
    this.props.dispatch({
      type: "DELETE_STUDENT",
      payload: student,
    });
  };

  // searchStudent = (event) => {
  //   this.setState({
  //     keyword: event.target.value,
  //   })
  // }

  render() {
    return (
      <div className="card p-0 mt-3">
        <div className="card-header bg-dark text-white font-weight-bold">
          Danh sách sinh viên
        </div>
        <div className="row mt-4 px-3 ">
          <div className="col-4">
            <div className="form-group mb-0">
              <input
                type="text"
                placeholder="Tìm kiếm sinh viên..."
                className="form-control"
                // onChange={this.searchStudent}
                onChange={(event) => this.setState({keyword: event.target.value})}
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Mã SV</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Tác vụ</th>
              </tr>
            </thead>
            <tbody>{this.renderContent()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    studentList: state.studentReducer.studentList,
  };
};

export default connect(mapStateToProps)(StudentManagement);
