import React from 'react'
import { render } from 'react-dom'
import config from '../../../config.js'

import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;
require('bootstrap/js/dropdown');

export default React.createClass({
	render: function (){
		var notifications = this.props.notification.retrieve();
		var notificationView = (<div></div>);
		if (notifications.length > 0){
			notificationView = (
				<div className="margin-top-30">
					{
						notifications.map((notification, i)=>{
							if (notification.type == undefined) notification.type = "success";
							return(
								<div className={"alert margin-top-15 margin-bottom-0 alert-" + notification.type} key={i} data-nIndex={i}>
									{notification.message}
									<span className="close" onClick={ () => this.props.notification.remove(i) }>
										<span>&times;</span>
									</span>
								</div>
							)
						})
					}
    			</div>
			)
		}

		return notificationView;
	}
});
