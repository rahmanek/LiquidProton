import React from 'react'
import { render } from 'react-dom'
import SideMenu from './Common/SideMenu.js'
import Notifications from './Common/notifications.js'
import User from '../classes/User.js'
import { browserHistory } from 'react-router'
import config from '../../config.js'

export default React.createClass({

	componentWillMount: function(){
		if(User.getAuthorization() === null ) browserHistory.push("home");
	},

	componentDidMount: function(){
		var postData = {
			authorization:User.getAuthorization(),
		}
		$.post(config.apiHost + "/user/retrieve", postData)
		.then((data)=>{
			this.setState({user:data});
		}).fail(function(err){
			browserHistory.push("home");
		});
	},

	render: function (){
      var pass ={
         notification: this.props.notification,
         user: this.props.user
      }
		return (
         <div className="container">
            <div className="row">
               <div className="hidden-xs col-sm-3">
                  <SideMenu location={this.props.location} user={this.props.user}/>
               </div>
               <div className="col-xs-12 col-sm-9">
						<div className={((this.props.notification.retrieve().length>0)?"margin-top-30":"")}>
                  	<Notifications notification={this.props.notification}/>
						</div>
                  {React.cloneElement(this.props.children, pass)}
               </div>
            </div>
         </div>
		);
	}
});
