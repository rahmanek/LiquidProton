import { ReactDOM, ReactRouter } from './cdn'
import Authenticate from './classes/Authenticate'

import App from './app.js'
import Auth from './views/auth'
import Dash from './views/dash'
import Account from './views/account'
import Docs from './views/docs'
import Support from './views/support'
import config from '../config'
import User from './classes/User'

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
	if (!Authenticate.isLoggedIn()) {
		browserHistory.push("dash");
	} else {
		return true;
	}
}


ReactDOM.render((
	<Router history={browserHistory}>
		<Route component={App}>
			<Route path="auth" component={Auth}/>
			<Route path="docs" component={Docs}/>
			<Route path="dash" component={Dash} onEnter={requireAuth}/>
			<Route path="account" component={Account} onEnter={requireAuth}/>
			<Route path="support" component={Support}/>
		</Route>
	</Router>
), document.getElementById('app'));
