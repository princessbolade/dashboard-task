// import axios from "axios";
import {
  ADD_USER,
  DELETE_USER,
  EDIT_USER,
  SET_USERS,
} from "../actions/actionConstants";
import { ActionTypes } from "../actions/actionTypes";
import { Store, Users } from "../types";

const initialState = {
  users: [],
};

// Standard interface and functions
const addUser = (users: Users[], name: string, email: string): Users[] => [
  {
    id: Math.max(0, Math.max(...users.map(({ id }) => id))) + 1,
    name,
    email,
    username: name,
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "South Elvis",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
  ...users,
];

const editUser = (
  users: Users[],
  id: number,
  name: string,
  email: string
): Users[] =>
  users.map((user) => ({
    ...user,
    id: user.id === id ? id : user.id,
    name: user.id === id ? name : user.name,
    email: user.id === id ? email : user.email,
  }));

const deleteUser = (users: Users[], id: number): Users[] =>
  users.filter((user) => user.id !== id);

// const url = "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data";

const userReducer = (state: Store = initialState, action: ActionTypes) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: [...state.users, ...action.payload],
      };
    case ADD_USER:
      return {
        ...state,
        users: addUser(state.users, action.payload.name, action.payload.email),
      };
    case EDIT_USER:
      return {
        ...state,
        users: editUser(
          state.users,
          action.payload.id,
          action.payload.name,
          action.payload.email
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        users: deleteUser(state.users, action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;

export type RootState = ReturnType<typeof userReducer>;
