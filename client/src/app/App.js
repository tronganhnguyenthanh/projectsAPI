import {Route, Routes} from "react-router-dom";
import FormStudent from "../components/students/form/FormStudent";
import FormProject from "../components/projects/form/FormProject";
const App = () => {
 return (
  <div className="App">
    <Routes>
      <Route path="/" element={<FormStudent/>}/>
      <Route path="/new/project" element={<FormProject/>}/>
    </Routes>
  </div>
 )
}

export default App;
