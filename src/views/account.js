import { React, ReactRouter } from '../cdn'
import Key from '../classes/Key'
import User from '../classes/User'
import Authenticate from '../classes/Authenticate';

var browserHistory = ReactRouter.browserHistory;

export default React.createClass({
	getInitialState: function() {
	   	return {
				key:{
					token:"",
					name:""
				},
				showKey: false,
				profile: User.getProfile(),
				secureProfile: {},
				connection: "",
				authenticate: {}
		 	};
	},
	componentDidMount: function(){
		User.getFullProfile().then((secureProfile)=>{
			this.setState({
				secureProfile:secureProfile,
				key:secureProfile.keys[0],
				name:secureProfile.keys[0].name,
				connection: secureProfile.identities[0].connection
			});
		}).catch(function(err){
			console.log(err);
		});
		var authenticate = new Authenticate({
			initialScreen: "forgotPassword",
			allowLogin: false
		});
		this.setState({authenticate:authenticate});
	},
	changePassword: function(){
		this.state.authenticate.login();
	},
	saveChanges: function(){
		Key.update({
			name: this.state.name
		}, this.props.user);
	},
	render: function (){
		return (
			<div id="account">
				<div className="page-header">Account</div>
				<div className="col-xs-12 infoBox">
					<div className="row">
						<div className="col-xs-6">
							<h5>Email</h5>
							<span>{this.state.secureProfile.email}</span>
						</div>
						<div className="col-xs-6">
							<h5>Subscription</h5>
							<span>Free Unlimited</span>
						</div>
					</div>
					<div className="row margin-top-35">
						<div className="col-xs-6">
							<h5>User ID</h5>
							<span>{this.state.secureProfile.user_id}</span>
						</div>
						<div className="col-xs-6">
							<h5>Password</h5>
							<div className="col-xs-6 padding-left-0">
								<a href="javascript:" onClick={this.changePassword}>Change Password</a>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xs-12 settingsBox">
					<div className="row keyBox">
						<div className="col-xs-6">
							<h5>Api Key&nbsp;&nbsp;<a href="javascript:" className="font-size-12" onClick={()=>this.setState({showKey:!this.state.showKey})}>{(this.state.showKey)?<span>Hide</span>:<span>Show</span>}</a></h5>
							{
								(this.state.showKey)?
								<input id="keyBox" type="text" className="form-control" value={this.state.key.token} readOnly/>:
								<input id="keyBox" type="password" className="form-control" value={this.state.key.token} readOnly/>
							}
						</div>
					</div>
					<div className="row">
						<div className="col-xs-6 margin-top-35">
							<h5>Business Name</h5>
							<div className="col-xs-6 padding-left-0">
								<input id="name" type="text" className="form-control col-xs-6" onChange={(e)=>{this.setState({name:e.target.value})}} value={this.state.name}/>
							</div>
						</div>
					</div>
					<div className="col-xs-6 offset-xs-6 margin-top-25">
						<button type="button" className="btn btn-warning margin-left-45" onClick={this.saveChanges}>Save</button>
					</div>
				</div>
			</div>
		);
	}
});
