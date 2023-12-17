import { ChangeEvent } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Todos } from "../types/global.d";
import { useDispatch } from "react-redux";
import { addTodo } from "../sherd/modules/TodoSlice";
// @ts-ignore
import uuid from "react-uuid";
import axios from "axios";

function Input() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const titleOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => [
    setTitle(e.target.value),
  ];
  const contentOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => [
    setContent(e.target.value),
  ];
  const onClickBtnHandler = async () => {
    const newTodo: Todos = {
      id: uuid(),
      title,
      content,
      isDone: false,
    };

    const { data } = await axios.post("http://localhost:4000/todos", newTodo);

    dispatch(addTodo(data));
    setTitle("");
    setContent("");
  };

  return (
    <ScInputBox>
      제목 : <input required value={title} onChange={titleOnchangeHandler} />
      내용: <input required value={content} onChange={contentOnchangeHandler} />
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
