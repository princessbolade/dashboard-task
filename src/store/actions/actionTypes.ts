import { Users } from "../types";
import { ADD_USER, DELETE_USER, EDIT_USER, GET_USER, SET_USERS } from "./actionConstants";

export type ActionTypes = 
  | { type: typeof SET_USERS; payload: Users[] }
  | { type: typeof GET_USER }
  | { type: typeof ADD_USER; payload: {
    name: string;
    email: string
  } }
  | { type: typeof EDIT_USER; payload: {
    id: number;
    name: string;
    email: string
  }}
  | { type: typeof DELETE_USER; payload: number }