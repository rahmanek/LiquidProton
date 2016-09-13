import React from 'react'
import { render } from 'react-dom'
import config from '../../../config.js'
import User from '../../classes/User.js'

export default React.createClass({
	getInitialState:function(){
		return {
			activity: null
		};
	},
	componentDidMount: function(){
		var postData = {
			authorization:User.getAuthorization(),
			id:this.props.location.query.id,
			activity:{}
		}
		console.log(postData);
		$.post(config.apiHost + "/activity/receipt/retrieve", postData)
		.then((data)=>{
			this.setState({activity:data});
		});

	},
	render: function (){
		if(this.state.activity === null) return(<div></div>);
		var activity = this.state.activity;
		var date = new Date(Date.parse(activity.Receipt.createdAt));
		var formattedDate = date.toLocaleString();
		return (
         <div id="activity" className="margin-top-30 margin-bottom-30">
				<div className="row activity-header">
					<div className="col-xs-6">
						{formattedDate}
					</div>
					<div className="col-xs-6 text-right">
						{activity.Key.name}
					</div>
				</div>
				<div id="receiptInfo" className="row margin-top-15 margin-bottom-15">
					<div className="col-xs-7">
						<table className="table margin-top-10"><tbody>
							<tr><td>Phone:</td><td>{activity.Key.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}</td></tr>
							<tr><td>Address:</td><td>{activity.Key.line1}<br/>{activity.Key.city}, {activity.Key.state} {activity.Key.zip}</td></tr>
							<tr><td>Email:</td><td>{activity.Key.email}</td></tr>
							<tr><td>Website:</td><td><a href={activity.Key.url}>{activity.Key.url}</a></td></tr>

						</tbody></table>
     				</div>
					<div className="col-xs-5">
					   <div className="margin-top-10">Charged to credit card ending in {activity.Link.lastFour}</div>
						<div className="margin-top-25 panel panel-primary text-center">
							<div className="panel-heading text-center">
								Total
							</div>
							<div className="panel-body text-center">
								<span>${activity.Receipt.total}</span>
							</div>
						</div>
					</div>
				</div>
				<table className="table">
					<thead><tr><th>Item</th><th>Quantity</th><th>Unit Cost</th><th>Total</th></tr></thead>
					<tbody>
					{
						activity.Receipt.transaction.map((transactions, i)=>{
							return transactions.map((item, j)=>{
								if(typeof item.unitCost == "undefined") var unitCost = "";
								else var unitCost = "$" + item.unitCost;
								if(typeof item.quantity == "undefined") var quantity = "";
								else var quantity = item.quantity;
								return (
									<tr className={i > 0 && j == 0 ? " newSection":""}>
										<td>{item.description}</td>
										<td>{quantity}</td>
										<td>{unitCost}</td>
										<td>${item.total}</td>
									</tr>
								);
							});
						})
					}
					</tbody>
				</table>
         </div>
		);
	}
});
