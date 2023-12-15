import React from "react";
import { ChangeEvent } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Todos } from "../types/global.d";
// @ts-ignore
import uuid from "react-uuid";

type Props = {
  todoList: Todos[];
  setTodoList: React.Dispatch<React.SetStateAction<Todos[]>>;
};

function Input({ todoList, setTodoList }: Props) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const titleOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => [
    setTitle(e.target.value),
  ];
  const contentOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => [
    setContent(e.target.value),
  ];
  const onClickBtnHandler = () => {
    const newTodo: Todos = {
      id: uuid(),
      title,
      content,
      isDone: false,
    };
    setTodoList([newTodo, ...todoList]);
    setTitle("");
    setContent("");
  };

  return (
    <ScInputBox>
      제목 : <input value={title} onChange={titleOnchangeHandler} />
      내용: <input value={content} onChange={contentOnchangeHandler} />
      <button onClick={onClickBtnHandler}>등록하기</button>
    </ScInputBox>
  );
}

const ScInputBox = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #bfe9e8;
  gap: 10px;
  padding: 10px;
`;

export default Input;
