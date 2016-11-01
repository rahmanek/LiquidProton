import { ReactDOM, ReactRouter } from './cdn'

import Activities from './views/activities.js'
import Activity from './views/activity.js'
import Settings from './views/settings.js'
import Help from './views/help.js'
import Landing from './views/landing.js'
import Create from './views/create.js'
import ApiKeys from './views/apiKeys.js'
import App from './app.js'

import config from '../config.js'
import AuthService from './classes/AuthService'

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;

const auth = new AuthService(config.auth0.clientId, config.auth0.domain);

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    browserHistory.push("landing");
  }
}


ReactDOM.render((
	<Router history={browserHistory}>
		<Route component={App} auth={auth}>
			<Route path="landing" component={Landing}/>
			<Route path="help" component={Help}/>
			{/* <Route path="dash" component={Dash} onEnter={requireAuth}/> */}
			<Route path="settings" component={Settings} onEnter={requireAuth}/>
			<Route path="apiKeys" component={ApiKeys} onEnter={requireAuth}/>
			<Route path="create" component={Create} onEnter={requireAuth}/>
		</Route>
	</Router>
), document.getElementById('app'));
