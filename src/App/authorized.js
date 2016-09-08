import React from 'react'
import { render } from 'react-dom'
import SideMenu from './Common/SideMenu.js'
import Notifications from './Common/notifications.js'

export default React.createClass({

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
                  <Notifications notification={this.props.notification}/>
                  {React.cloneElement(this.props.children, pass)}
               </div>
            </div>
         </div>
		);
	}
});
