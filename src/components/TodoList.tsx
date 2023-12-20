import styled from "styled-components";
import { Todos } from "../types/global.d";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { changeTodo, deleteTodo, getTodos } from "../api/TodoApi";
import swal from "sweetalert";

type Props = {
  isDone: boolean;
};

function TodoList({ isDone }: Props) {
  const { isLoading, isError, data } = useQuery("todo", getTodos);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: (): void => {
      queryClient.invalidateQueries("todo");
    },
  });

  const ChangeMutation = useMutation(changeTodo, {
    onSuccess: (): void => {
      queryClient.invalidateQueries("todo");
    },
  });

  // 삭제버튼
  const removeBtnHandler = async (item: Todos) => {
    const isValid = await swal({
      title: "삭제하시겠습니까?",
      buttons: ["취소", "확인"],
    });
    if (isValid) {
      deleteMutation.mutate(item.id);
    }
  };

  const changedIsDoneBtnHandler = async (item: Todos) => {
    ChangeMutation.mutate(item);
  };

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }
  if (isError) {
    return <h1>에러발생</h1>;
  }

  return (
    <div>
      <ScTodoWrapper>
        <h3>{isDone ? "⭐️ Done" : "📚 Working"}</h3>
        <ScBox>
          {data
            .filter((item: Todos) => {
              return item.isDone === isDone;
            })
            .map((item: Todos) => {
              return (
                <ScTodoBox key={item.id}>
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                  <ScBtnWrapper>
                    <ScBtn onClick={() => changedIsDoneBtnHandler(item)}>
                      {isDone ? "취소" : "완료"}
                    </ScBtn>
                    <ScBtn onClick={() => removeBtnHandler(item)}>삭제</ScBtn>
                  </ScBtnWrapper>
                </ScTodoBox>
              );
            })}
        </ScBox>
      </ScTodoWrapper>
    </div>
  );
}
const ScTodoWrapper = styled.div`
  gap: 10px;
  min-height: 210px;
`;
const ScTodoBox = styled.div`
  background-color: #fffbd3;
  width: 150px;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
`;
const ScBox = styled.div`
  display: flex;
`;
const ScBtnWrapper = styled.div`
  display: flex;
  gap: 10px;
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
export default TodoList;
