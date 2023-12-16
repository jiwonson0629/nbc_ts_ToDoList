import React from "react";
import styled from "styled-components";
import { Todos } from "../types/global.d";

type Props = {
  todoList: Todos[];
  setTodoList: React.Dispatch<React.SetStateAction<Todos[]>>;
  isDone: boolean;
};

function TodoList({ todoList, setTodoList, isDone }: Props) {
  const removeBtnHandler = (item: Todos) => {
    const newTodo = todoList.filter((list) => {
      return list.id !== item.id;
    });
    setTodoList(newTodo);
  };
  const changedIsDoneBtnHandler = (item: Todos) => {
    const changedIsDone = todoList.map((todo) => {
      if (todo.id === item.id) {
        return { ...item, isDone: !item.isDone };
      } else {
        return todo;
      }
    });
    setTodoList(changedIsDone);
  };
  return (
    <div>
      <ScTodoWrapper>
        <h3>{isDone ? "⭐️ Done" : "📚 Working"}</h3>
        {todoList
          .filter((item) => {
            return item.isDone === isDone;
          })
          .map((item) => {
            return (
              <ScTodoBox key={item.id}>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
                <ScBtnWrapper>
                  <button onClick={() => changedIsDoneBtnHandler(item)}>
                    {isDone ? "취소" : "완료"}
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
