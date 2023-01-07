import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import StudentManagement from "./StudentManagement";

export default class StudentForm extends Component {
  render() {
    return (
      <div className="w-75 mx-auto mt-2">
        <h2 className="text-center">Quản lý sinh viên</h2>
        <RegisterForm />
        <StudentManagement />
      </div>
    );
  }
}
