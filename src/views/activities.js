import React from 'react'
import { render } from 'react-dom'
import config from '../../config.js'
import User from '../classes/User.js'
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
         <div id="activities" className="views">
				{
					this.state.activities.map((activity,i)=>{
						var date = Date.parse(activity.Receipt.createdAt);
						var now = Date.now();
						var preDate = new Date(date);
						var diff = now - date;
						diff = 94400000
						var formattedDate ="";
						if(diff > 86400000){
							formattedDate = preDate.getMonth() + "/" + preDate.getDate() + "/" + preDate.getFullYear();
						} else if (diff > 3600000){
							formattedDate = preDate.toLocaleTimeString();
						} else if (diff > 60000){
							formattedDate = diff/60000 + " minutes ago";
						} else {
							formattedDate = "Less than a minute ago";
						}
						return (
							<div className="list-group-item" key={i} data-activityId={activity.id} onClick={()=>browserHistory.push("activity?id=" + activity.id)}>
								<div className="row">
									<div className="col-xs-8 col-sm-3 nowrap">
										<span>{activity.Key.name}</span>
									</div>
									<div className="col-xs-4 col-sm-3 nowrap text-right">
										<span>{formattedDate}</span>
									</div>
									<div className="col-xs-4 col-sm-2 nowrap">
										<span className="color-primary">Receipt</span>
									</div>
									<div className="col-xs-4 col-sm-2 nowrap">
										<span>${activity.Receipt.total}</span>
									</div>
									<div className="col-xs-4 col-sm-2 nowrap text-right">
         							<span>x-{activity.Link.lastFour}</span>
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
