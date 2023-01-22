import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Home';
import Orders from './Orders';



function App() {
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route path="/orders" element={<Orders/>}></Route>
      </Routes>
    </Router>
   
  );
}

export default App;
