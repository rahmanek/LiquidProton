import { React, ReactRouter } from '../cdn'
import Authenticate from '../classes/Authenticate';

var browserHistory = ReactRouter.browserHistory;

export default React.createClass({
	getInitialState: function() {
	   	return {
				loggingIn: false
		 	};
	},
	componentDidMount: function(){
		if(Authenticate.isLoggedIn()) browserHistory.push('/dash');
		else {
			var auth = new Authenticate();
			auth.login();
		}
	},


	render: function (){
		return (
			<div id="auth">
				<div id="authContainer">
				</div>
			</div>
		)
	}
});
