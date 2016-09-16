import React from 'react'
import { render } from 'react-dom'
import CardForm from '../components/cardForm.js'
import config from '../../config.js'
import User from '../classes/User.js'
import { browserHistory } from 'react-router'

export default React.createClass({
	getInitialState: function() {
	   	return {
				email:"",
				password:"",
				processSignal:false
		 	};
	},
	componentDidMount: function(){
		User.deleteAuthorization();
		return;
	},
	onTokenization: function(token){
		var postData = {
			token:token,
			email:this.state.email,
			password:this.state.password
		};
		$.post(config.apiHost + "/register", postData)
		.then((data)=>{
			browserHistory.push({
				pathname:"home",
				query:{
					message:"Thank you, you're almost finished!  Please check for a message sent to your email to finalize the signup."
				}
			});
		}).catch( (err) => {
			if(err.status == 409) this.props.notification.create({message:"A user with this email exists already!  Please login to manage your account.", type:"danger"});
			else if(err.status == 400)  this.props.notification.create({message:"The card information provided could not be verified.  Please check and try again.", type:"danger"})
			else this.props.notification.create({message:"There was an error adding your link.", type:"danger"});
			this.setState({processingCard:false});
		});


		this.setState({processSignal:false});
	},

	changeSignal: function(status, callback){
		this.setState({processSignal:status}, callback);
		return;
	},
	handleChange: function(event) {
		var changeVar = {};
		changeVar[event.target.id] = event.target.value;
		this.setState(changeVar);
		return;
	},

	render: function (){
		return (
			<div id="register" className="views">
				<div className="container height-100 padding-right-0 padding-left-0">
						<div className="col-xs-12 padding-right-0 padding-left-0 height-100 overflow-scroll-y">
							<CardForm processSignal={this.state.processSignal} changeSignal={this.changeSignal} onTokenization={this.onTokenization}></CardForm>
							<div className="row padding-left-15 padding-right-15">
								<div className="col-xs-6 border-bottom border-right form-box">
									<div className="cursor-default">Email</div>
									<input className="col-xs-12 border-none margin-top-5" value={this.state.email} onChange={this.handleChange} type="text"  id="email" placeholder="Email"/>
								</div>
								<div className="col-xs-6 border-bottom form-box">
										<span className="cursor-default">Password</span>
										<input className="col-xs-12 border-none margin-top-5" value={this.state.password} onChange={this.handleChange} type="password"  id="password" placeholder="Password Here"/>
								</div>
							</div>
							<div className="row margin-top-25 margin-bottom-15">
								<button className="btn col-xs-4 col-xs-offset-4" id="submit-button" onClick={()=>this.setState({processSignal:true})}>Register</button>
							</div>
						</div>
				</div>
			</div>
		);
	}
});
