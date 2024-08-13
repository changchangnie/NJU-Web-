import LoginSignup from "./components/LoginSignup";import TodoList from "./components/TaskList";
import './App.css'
import Project from "./components/Project";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginSignup/>} />
                <Route path="/project" element={<Project/>} />
            </Routes>
        </Router>
    );
}

export default App;
