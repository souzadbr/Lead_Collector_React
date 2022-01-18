/* eslint-disable react/jsx-no-undef */
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PrivateRoute from './auth';
import Login from "./componente/pages_login/index";
import Dashboard from "./componente/dashboard/index";
import Landing from './componente/page_landing/index'

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