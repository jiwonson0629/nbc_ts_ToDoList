import Input from "./components/Input";
import TodoList from "./components/TodoList";
import styled from "styled-components";
import { QueryClientProvider } from "react-query";
import { QueryClient } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScBody>
        <ScContainer>
          <ScHeader>
            <h1>To Do List</h1>
          </ScHeader>
          <div>
            <Input />
            <TodoList isDone={false} />
            <TodoList isDone={true} />
          </div>
        </ScContainer>
      </ScBody>
    </QueryClientProvider>
  );
}

const ScBody = styled.div`
  display: flex;
  justify-content: center;
`;
const ScHeader = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  padding: 15px;
  background-color: #ffefdd;
`;

const ScContainer = styled.div`
  max-width: 1200px;
  min-width: 800px;
`;

export default App;
