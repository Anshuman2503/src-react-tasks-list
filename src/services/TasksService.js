import { ServiceConstants } from "../constants";
import axios from "axios";

export const getAllTasks = () => {
  return axios.get(`${ServiceConstants.TASKS_URL}`);
};

export const addTask = (payload) => {
  return axios.post(`${ServiceConstants.TASKS_URL}`, { task: payload });
};

export const updateTask = (id, payload) => {
  return axios.put(`${ServiceConstants.TASKS_URL}/${id}`, { task: payload });
};

export const deleteTask = (id) => {
  return axios.delete(`${ServiceConstants.TASKS_URL}/${id}`);
};
