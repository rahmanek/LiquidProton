import { React, ReactRouter} from './cdn'
import Header from './components/header.js'
import Notifications from './components/notifications.js'
import Nav from './components/nav'
import { getQueryVariable } from './classes/Utilities'
import User from './classes/User.js'
import config from '../config.js'

var browserHistory = ReactRouter.browserHistory;

export default React.createClass({
	getInitialState: function() {
		return{
			notifications:[]
		}
	},
	createNotification: function(notification){
		var notifications = this.state.notifications;
		notifications.push(notification);
		this.setState({notifications:notifications});

		return;
	},
	removeNotification: function(nIndex){
		var notifications = this.state.notifications;
		notifications.splice(nIndex,1);
		return this.setState({notifications:notifications});
	},
	retrieveNotifications: function(){
		return this.state.notifications;
	},
	componentWillReceiveProps:function(nextProps){
		// Remove notifications when view changes
		if(this.props.location.pathname != nextProps.location.pathname){
			var notifications = [];
			if (typeof nextProps.location.query.message != "undefined") notifications.push({message:nextProps.location.query.message});
			this.setState({notifications:notifications});
		}
		return;
	},
	componentDidMount: function(){

		var notifications = this.state.notifications;
		if (typeof getQueryVariable("message") != "undefined") notifications.push({message:getQueryVariable("message").split("+").join(" ")});

		return;
	},
	render: function (){
		var view = this.props.routes[1];
		var pass = {
			notification:{
				create: this.createNotification,
				remove: this.removeNotification,
				retrieve: this.retrieveNotifications
			},
			user: this.props.route.user
		}
		return (
         <div>
				<Notifications notification={pass.notification}/>
            <Header notification={pass.notification} user={this.props.route.user} nav={view.nav}/>
				<div className="page-body">
					<div className="container fix-width">
						<div className="row view">
							<div className={(view.nav)?"col-xs-3":"hidden-xs-up"}>
								<Nav user={pass.user}/>
							</div>
							<div className={(view.nav)?"col-xs-9":"col-xs-12"}>
								{React.cloneElement(this.props.children, pass)}
							</div>
						</div>
					</div>
				</div>
         </div>
		);
	}
});
