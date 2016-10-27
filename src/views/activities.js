import { React, ReactRouter } from '../cdn'
import config from '../../config.js'
import User from '../classes/User.js'

var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

export default React.createClass({
	getInitialState:function(){
		return {
			activities:[]
		};
	},
	componentDidMount: function(){
		var postData = {
			id_token:this.props.auth.getToken()
		}
		$.post(config.apiHost + "/activities/retrieve", postData)
		.then((data)=>{
			this.setState({activities:data});
		});

	},
	render: function (){
		return (
         <div id="activities" className="crunch-view">
				<div className="container">
					<div className="row">

					{
						this.state.activities.map((activity,i)=>{
							var date = Date.parse(activity.createdAt);
							var now = Date.now();
							var preDate = new Date(date);
							var diff = now - date;
							var formattedDate ="";
							if(diff > 86400000){
								formattedDate = preDate.getMonth() + "/" + preDate.getDate() + "/" + preDate.getFullYear();
							} else if (diff > 3600000){
								formattedDate = preDate.toLocaleTimeString();
							} else if (diff > 60000){
								formattedDate = parseInt(diff/60000) + " minutes ago";
							} else {
								formattedDate = "Less than a minute ago";
							}
							var activitySection;
							if(activity.data.type == "receipt") activitySection = (
								<span>${activity.data.total}</span>
							);else if (activity.data.type == "message" || activity.data.type == "coupon") activitySection = (
								<span>{activity.data.subject}</span>
							)
							return (
								<div className="list-group-item" key={i} data-activityId={activity.id} onClick={()=>browserHistory.push("activity?id=" + activity.id)}>
									<div className="row">
										<div className="col-xs-8 col-sm-3 nowrap">
											<span>{activity.senderName}</span>
										</div>
										<div className="col-xs-4 col-sm-3 nowrap text-right">
											<span>{formattedDate}</span>
										</div>
										<div className="col-xs-4 col-sm-2 nowrap">
											<span className={activity.data.type}>{activity.data.type.charAt(0).toUpperCase() + activity.data.type.slice(1)}</span>
										</div>
										<div className="col-xs-4 col-sm-4 nowrap">
											{activitySection}
										</div>
									</div>
								</div>
							)
						})
					}
				</div></div>
         </div>
		);
	}
});
