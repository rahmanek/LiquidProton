import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Activities from './Activities/index.js'
import Activity from './Activity/index.js'
import Links from './Links/index.js'
import AddLink from './Links/addLink.js'
import Settings from './Settings/index.js'
import Register from './Register/index.js'
import Help from './Help/index.js'
import Home from './Home/index.js'
import Create from './Create/index.js'
import ApiKeys from './ApiKeys/index.js'
import App from './app.js'
import Authorized from './authorized'

render((
	<Router history={browserHistory}>
		<Route component={App}>
			<Route path="/home" component={Home}/>
			<Route path="/help" component={Help}/>
			<Route path="/register" component={Register}/>
			<Route component={Authorized}>
				<Route path="/" component={Activities}/>
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
