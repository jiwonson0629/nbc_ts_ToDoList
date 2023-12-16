import React from "react";
import styled from "styled-components";
import { Todos } from "../types/global.d";
import { useDispatch, useSelector } from "react-redux";
import { changeTodo, deletedTodo } from "../sherd/modules/TodoSlice";
import { RootState } from "../sherd/config";

type Props = {
  isDone: boolean;
};

function TodoList({ isDone }: Props) {
  const todolist = useSelector((state: RootState) => state.TodoSlice);
  const dispatch = useDispatch();

  // 삭제버튼
  const removeBtnHandler = (id: string) => {
    dispatch(deletedTodo(id));
  };

  const changedIsDoneBtnHandler = (id: string) => {
    dispatch(changeTodo(id));
  };

  return (
    <div>
      <ScTodoWrapper>
        <h3>{isDone ? "⭐️ Done" : "📚 Working"}</h3>
        {todolist
          .filter((item) => {
            return item.isDone === isDone;
          })
          .map((item) => {
            return (
              <ScTodoBox key={item.id}>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
                <ScBtnWrapper>
                  <button onClick={() => changedIsDoneBtnHandler(item.id)}>
                    {isDone ? "취소" : "완료"}
                  </button>
                  <button onClick={() => removeBtnHandler(item.id)}>
                    삭제
                  </button>
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
