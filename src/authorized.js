import React from 'react'
import { render } from 'react-dom'
import SideMenu from './components/sideMenu.js'
import User from './classes/User.js'
import { browserHistory } from 'react-router'
import config from '../config.js'

export default React.createClass({
	getInitialState: function() {
		return{
			user:{}
		}
	},
	componentWillMount: function(){
		if(User.getAuthorization() === null ) browserHistory.push("login");
	},

	componentDidMount: function(){
		var postData = {
			authorization:User.getAuthorization(),
		}
		$.post(config.apiHost + "/user/retrieve", postData)
		.then((data)=>{
			this.setState({user:data});
		}).fail(function(err){
			browserHistory.push("login");
		});
	},

	render: function (){
      var pass ={
         notification: this.props.notification,
         user: this.state.user
      }
		return (
         <div id="authorized" className="container height-100 padding-right-0 padding-left-0">
            <div className="hidden-xs col-sm-3">
               <SideMenu location={this.props.location} user={pass.user}/>
            </div>
            <div className="col-xs-12 col-sm-9 padding-right-0 padding-left-0 height-100 overflow-scroll-y">
               {React.cloneElement(this.props.children, pass)}
            </div>
         </div>
		);
	}
});
