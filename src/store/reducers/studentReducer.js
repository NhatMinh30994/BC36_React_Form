const DEFAULT_STATE = {
  studentList: [
    {
      id: 1,
      maSV: 1,
      fullName: "Minh",
      phoneNumber: "0772945680",
      email: "minhtran30994@gmail.com",
    },
  ],
  selectedStudent: null,
};

export const studentReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_STUDENT": {
      const data = [...state.studentList];
      data.push({ ...payload, id: Date.now() });
      state.studentList = data;
      break;
    }

    case "SET_SELECTED_STUDENT": {
      state.selectedStudent = payload;
      break;
    }

    case "UPDATE_STUDENT": {
      const data = [...state.studentList];
      const idx = data.findIndex((element) => element.id === payload.id);
      data[idx] = payload;
      state.studentList = data;
      state.selectedStudent = null;
      break;
    }

    case "DELETE_STUDENT": {
      const data = [...state.studentList];
      const idx = data.findIndex((element) => element.id === payload.id);
      data.splice(idx, 1);
      state.studentList = data;
      break;
    }

    default:
      break;
  }
  return { ...state };
};
