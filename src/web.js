import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Activities from './views/activities.js'
import Activity from './views/activity.js'
import Links from './views/links.js'
import AddLink from './views/addLink.js'
import Settings from './views/settings.js'
import Register from './views/register.js'
import Help from './views/help.js'
import Login from './views/login.js'
import Create from './views/create.js'
import ApiKeys from './views/apiKeys.js'
import App from './app.js'
import Authorized from './authorized.js'

render((
	<Router history={browserHistory}>
		<Route component={App}>
			<Route path="/login" component={Login}/>
			<Route path="/help" component={Help}/>
			<Route path="/register" component={Register}/>
			<Route component={Authorized}>
				<Route path="/activities" component={Activities}/>
				<Route path="/activity" component={Activity}/>
				<Route path="/settings" component={Settings}/>
				<Route path="/links" component={Links}/>
				<Route path="/apiKeys" component={ApiKeys}/>
				<Route path="/links/add" component={AddLink}/>
				<Route path="/create" component={Create}/>
			</Route>
		</Route>
	</Router>
), document.getElementById('app'));
