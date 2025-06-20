import PrivateRoute from './components/PrivateRoute'; // 👈 import it

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/AdminLogin" component={AdminLogin} />
          <PrivateRoute path="/AdminPanel" component={AdminPanel} />  {/* 🔒 protected */}
          <PrivateRoute path="/LandingPage" component={LandingPage} /> {/* 🔒 protected */}
          <PrivateRoute path="/Dashboard" component={Dashboard} /> {/* 🔒 protected */}
          <Route path="/ForgotPassword" component={ForgotPassword} />
          <Route path="/ResetPassword" component={ResetPassword} />
        </Switch>
      </Router>
    </div>
  );
}
