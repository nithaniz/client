// App.js
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/home';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/AdminLogin" component={AdminLogin} />
         <Route path="/AdminPanel" component={AdminPanel} />
          <Route path="/LandingPage" component={LandingPage} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/ForgotPassword" component={ForgotPassword} />
          <Route path="/ResetPassword" component={ResetPassword} />
          
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;

