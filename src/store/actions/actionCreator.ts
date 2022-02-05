import { Action, Store } from "redux";
import { ThunkAction } from "redux-thunk";
import { Users } from "../types";
import { ADD_USER, DELETE_USER, EDIT_USER, SET_USERS } from "./actionConstants"
import { ActionTypes } from "./actionTypes";


export const setUsers =(users: Users[]): ActionTypes => ({
  type: SET_USERS,
  payload: users
})

export const getUsers = (
  url: string
): ThunkAction<void, Store, unknown, Action<string>> => async (dispatch) => {
  const resp = await fetch(url);
  const users: Users[] = await resp.json();
  dispatch(setUsers(users));
}

export const addUser = ( name: string, email: string ): ActionTypes => ({
  type: ADD_USER, 
  payload: {
    name,
    email
  }
})

export const editUser = ( id: number, name: string, email: string ): ActionTypes => ({
  type: EDIT_USER,
  payload: {
    id,
    name,
    email
  }
})

export const deleteUser = (id: number): ActionTypes => ({
  type: DELETE_USER,
  payload: id
})

