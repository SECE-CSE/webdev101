import './App.css'
import LoginButton from './components/LoginButton'
import Profile from './components/Profile';
import LogoutButton from './components/LogoutButton';
import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import { withAuthenticationRequired } from '@auth0/auth0-react';


const ProtectedRoute = ({ component, ...args } : any) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>

     
      <Routes>
        <Route path="/" element={ <ProtectedRoute component={Home} />} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
        <Route path="/login" element={<LoginButton />} />
        <Route path="/logout" element={<LogoutButton />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
