import { React, ReactRouter } from '../cdn'
import Header from '../components/header.js'
import config from '../../config.js'
import User from '../classes/User.js'
import Footer from '../components/Footer.js'

var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

export default React.createClass({
	getInitialState: function() {
   	return {
			email: "",
			password: ""
	 	};
	},
	authenticate:function(){

		var postData = {
			email:this.state.email,
			password:this.state.password
		}
		$.post(config.apiHost + "/user/authenticate", postData)
		.then((data)=>{
			User.setAuthorization(data.authorization);
			browserHistory.push("activities")
		}).catch((err) => {
			this.props.notification.create({message:"The email or password is incorrect, please try again.",type:"danger"});
		});
	},
	handleChange: function(event) {
		var changeVar = {};
		changeVar[event.target.id] = event.target.value;
		return this.setState(changeVar);
	},
	render: function (){
		return (
			<div>
				<div id="login" className="margin-top-30">
					<div className="container">
						<div className="row margin-top-50">
							<div className="col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
								<div id="authBox" className="panel panel-default">
									<div className="font-size-20  primary-color">Login</div>
									<div className="margin-top-15">Email</div>
									<input id="email" onChange={this.handleChange} className="form-control margin-top-5"/>
									<div className="margin-top-15">Password</div>
									<input id="password" type="password" onChange={this.handleChange} className="form-control margin-top-5"/>
									<div className="margin-top-5">
										<div className="inline-block margin-top-15">
											<Link to="register" className="margin-top-5">
												Need to create an account?
											</Link>
										</div>
										<button className="btn margin-top-10 float-right display-block btn-primary" onClick={this.authenticate}>Login</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
});
