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
import Authorized from './authorized.js'

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;

ReactDOM.render((
	<Router history={browserHistory}>
		<Route component={App}>
			<Route path="login" component={Login}/>
			<Route path="logout" component={Logout}/>
			<Route path="help" component={Help}/>
			<Route path="register" component={Register}/>
			<Route path="verified" component={Verified}/>
			<Route component={Authorized}>
				<Route path="activities" component={Activities}/>
				<Route path="activity" component={Activity}/>
				<Route path="settings" component={Settings}/>
				{/* <Route path="links" component={Links}/> */}
				<Route path="apiKeys" component={ApiKeys}/>
				<Route path="links/add" component={AddLink}/>
				<Route path="create" component={Create}/>
			</Route>
		</Route>
	</Router>
), document.getElementById('app'));
