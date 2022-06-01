import './styles/App.css';
import AdminLogin from "./pages/login/adminLogin"
import { BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
          <Router>
            <Link to={"/a_login"}>Admin Login</Link>
            <Routes>
              <Route path='/a_login' element={<AdminLogin />}></Route>
            </Routes>
          </Router>
    </div>
  );
}

export default App;
