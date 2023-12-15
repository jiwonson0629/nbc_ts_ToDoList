import React from "react";
import styled from "styled-components";
import { Todos } from "../types/global.d";
import { useDispatch, useSelector } from "react-redux";
import { changeTodo, deletedTodo } from "../sherd/modules/TodoSlice";

type Props = {
  todoList: Todos[];
  setTodoList: React.Dispatch<React.SetStateAction<Todos[]>>;
  isDone: boolean;
};

function TodoList({ isDone }: Props) {
  const todolist = useSelector((state) => console.log(state));
  console.log(todolist);
  const dispatch = useDispatch();
  // 삭제버튼
  const removeBtnHandler = (item: Todos) => {
    dispatch(deletedTodo(item));
  };
  const changedIsDoneBtnHandler = (item: Todos) => {
    dispatch(changeTodo(item));
  };
  return (
    <div>
      <ScTodoWrapper>
        <h3>{isDone ? "⭐️ Done" : "📚 Working"}</h3>
        {todolist
          .filter((item: Todos) => {
            return item.isDone === isDone;
          })
          .map((item) => {
            console.log(item);
            return (
              <ScTodoBox key={item.id}>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
                <ScBtnWrapper>
                  <button onClick={() => changedIsDoneBtnHandler(item)}>
                    완료
                  </button>
                  <button onClick={() => removeBtnHandler(item)}>삭제</button>
                </ScBtnWrapper>
              </ScTodoBox>
            );
          })}
      </ScTodoWrapper>
    </div>
  );
}
const ScTodoWrapper = styled.div`
  gap: 10px;
`;
const ScTodoBox = styled.div`
  border: 1px solid black;
  width: 150px;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
`;
const ScBtnWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
export default TodoList;
