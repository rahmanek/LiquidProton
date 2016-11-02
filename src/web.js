import { ReactDOM, ReactRouter } from './cdn'

import App from './app.js'
import Landing from './views/landing'
import Dash from './views/dash'
import ApiKey from './views/apiKey'
import Account from './views/account'
import Docs from './views/docs'
import Support from './views/support'

import config from '../config.js'
import AuthService from './classes/AuthService'

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;

const auth = new AuthService(config.auth0.clientId, config.auth0.domain);

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
	if (!auth.isLoggedIn()) {
		browserHistory.push("landing");
	} else {
		return true;
	}
}


ReactDOM.render((
	<Router history={browserHistory}>
		<Route component={App} auth={auth}>
			<Route path="landing" component={Landing} nav={false}/>
			<Route path="docs" component={Docs} nav={false}/>
			<Route path="dash" component={Dash} onEnter={requireAuth} nav={true}/>
			<Route path="apiKey" component={ApiKey} onEnter={requireAuth} nav={true}/>
			<Route path="account" component={Account} onEnter={requireAuth} nav={true}/>
			<Route path="support" component={Support} nav={true}/>
		</Route>
	</Router>
), document.getElementById('app'));
