import { ReactDOM, ReactRouter } from './cdn'
import Activities from './views/activities.js'
import Activity from './views/activity.js'
// import Links from './views/links.js'
import AddLink from './views/addLink.js'
import Settings from './views/settings.js'
import Register from './views/register.js'
import Help from './views/help.js'
import Login from './views/login.js'
import Logout from './views/logout.js'
import Create from './views/create.js'
import ApiKeys from './views/apiKeys.js'
import Verified from './views/verified.js'
import App from './app.js'
import config from '../config.js'

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;


// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  // if (!auth.loggedIn()) {
  //   replace({ pathname: '/login' })
  // }
}


ReactDOM.render((
	<Router history={browserHistory}>
		<Route component={App} auth={auth}>
			<Route path="login" component={Login}/>
			<Route path="logout" component={Logout}/>
			<Route path="help" component={Help}/>
			<Route path="register" component={Register}/>
			<Route path="verified" component={Verified}/>
			<Route path="activities" component={Activities} onEnter={requireAuth}/>
			<Route path="activity" component={Activity} onEnter={requireAuth}/>
			<Route path="settings" component={Settings} onEnter={requireAuth}/>
			{/* <Route path="links" component={Links} onEnter={requireAuth}/> */}
			<Route path="apiKeys" component={ApiKeys} onEnter={requireAuth}/>
			<Route path="links/add" component={AddLink} onEnter={requireAuth}/>
			<Route path="create" component={Create} onEnter={requireAuth}/>
		</Route>
	</Router>
), document.getElementById('app'));
