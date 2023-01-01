import { Auth } from './components/auth/auth';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from './components/dashboard/dashboard';
import MyDoc from './components/applicationItem/pdfdoc/pdfdoc';

function App() {

  return (
    <Router>
      <div className="App">
        {/* <Auth /> */}
        <Switch>
          <Route exact path="/">
            <Redirect to='/main/table' />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/main">
            <Dashboard />
          </Route>
          <Route path='/flpdf/:id'>
            <MyDoc />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
