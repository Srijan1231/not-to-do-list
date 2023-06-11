import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { TaskForm } from "./components/TaskForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchTask } from "./Helper/axiosHelper";
import { useState } from "react";
import TaskContainer from "./components/TaskContainer";

function App() {
  const [list, setList] = useState([]);
  const getTaskList = async () => {
    const { status, taskList } = await fetchTask();
    if (status === "success" && taskList.length) {
      setList(taskList);
    }
  };
  console.log(list);
  return (
    <div className="wrapper">
      <Container>
        <Row>
          <Col className="mt-5 text-center fs-1 mb-2">Task Mgmt</Col>
        </Row>
        {/* form  */}
        <TaskForm getTaskList={getTaskList} />

        {/* task display table  */}
        <TaskContainer list={list} />
      </Container>
      <ToastContainer />
    </div>
  );
}

export default App;
