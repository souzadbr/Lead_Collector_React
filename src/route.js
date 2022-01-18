/* eslint-disable react/jsx-no-undef */
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PrivateRoute from './auth';
import Login from "./components/pages/Login";
import Dashboard from './components/pages/Dashboard';
import Landing from './components/pages/Landing';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={Login}/>
            <PrivateRoute path='/dashboard' component={Dashboard}/>
            <Route exact path='/landing' component={Landing}/>
        </Switch>
    </Router>

);

export default Routes;