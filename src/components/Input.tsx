import React from "react";
import { ChangeEvent } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Todos } from "../types/global.d";
// @ts-ignore
import uuid from "react-uuid";
import { useMutation, useQueryClient } from "react-query";
import { addTodo } from "../api/TodoApi";
import { FormEvent } from "react";

function Input() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const queryClient = useQueryClient();
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todo");
    },
  });

  const titleOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => [
    setTitle(e.target.value),
  ];
  const contentOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => [
    setContent(e.target.value),
  ];
  const onClickBtnHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Todos = {
      id: uuid(),
      title,
      content,
      isDone: false,
    };
    mutation.mutate(newTodo);
    setTitle("");
    setContent("");
  };

  return (
    <ScInputBox onSubmit={onClickBtnHandler}>
      제목 : <ScInput required value={title} onChange={titleOnchangeHandler} />
      내용:{" "}
      <ScInput required value={content} onChange={contentOnchangeHandler} />
      <ScBtn>등록하기</ScBtn>
    </ScInputBox>
  );
}

const ScInputBox = styled.form`
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #fffbd3;
  gap: 10px;
  padding: 10px;
`;

const ScInput = styled.input`
  border-radius: 5px;
`;
const ScBtn = styled.button`
  background-color: lightgray;
  border: 1px solid lightgray;
  border-radius: 8px;

  &:hover {
    box-shadow: 3px 2px 10px 1px rgba(0, 0, 0, 0.24);
    transform: scale(0.98);
  }
`;
export default Input;
