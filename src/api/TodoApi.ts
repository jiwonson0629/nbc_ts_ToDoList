import axios from "axios";
import { Todos } from "../types/global.d";

const getTodos = async () => {
  const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`);
  return res.data;
};

const addTodo = async (newTodo: Todos) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, newTodo);
};

const deleteTodo = async (id: string) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`);
};

const changeTodo = async (item: Todos) => {
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${item.id}`, {
    isDone: !item.isDone,
  });
};
export { getTodos, addTodo, deleteTodo, changeTodo };
