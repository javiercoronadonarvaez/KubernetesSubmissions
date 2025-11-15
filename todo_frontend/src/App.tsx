import LocalImage from "./components/LocalImage";
import TodoForm from "./components/TodoForm";

const App = () => {
  return (
    <div>
      <h1>The Project App</h1>
      <>
        <LocalImage />
      </>
      <>
        <TodoForm />
      </>
      <p>DevOps with Kubernetes</p>
    </div>
  );
};

export default App;
