import React from 'react'
import { render } from 'react-dom'
import config from '../../../config.js'
import User from '../../classes/User.js'
import { Link, browserHistory } from 'react-router'
export default React.createClass({
	getInitialState:function(){
		return {
			activities:[]
		};
	},
	componentDidMount: function(){
		var postData = {
			authorization:User.getAuthorization(),
		}
		$.post(config.apiHost + "/activity/retrieve", postData)
		.then((data)=>{
			this.setState({activities:data});
		});

	},
	render: function (){
		return (
         <div id="activities" className="margin-top-30 margin-bottom-30">
				{
					this.state.activities.map((activity,i)=>{
						var date = new Date(Date.parse(activity.Receipt.createdAt));
						var formattedDate = date.toLocaleString();
						return (
							<div className="list-group-item" key={i} data-activityId={activity.id} onClick={()=>browserHistory.push("activity?id=" + activity.id)}>
								<div className="row">
									<div className="col-xs-3 col-sm-4 nowrap">
										<span>{activity.Key.name}</span>
									</div>
									<div className="col-xs-3 col-sm-2 nowrap">
										<span>${activity.Receipt.total}</span>
									</div>
									<div className="col-xs-3 col-sm-3 nowrap">
         							<span>charged to x-{activity.Link.lastFour}</span>
         						</div>
									<div className="col-xs-3 col-sm-3 nowrap text-right">
										<span>{formattedDate}</span>
									</div>
								</div>
							</div>
						)
					})
				}
         </div>
		);
	}
});
