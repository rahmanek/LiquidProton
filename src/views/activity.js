import { React } from '../cdn'
import config from '../../config.js'
import User from '../classes/User.js'

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
         <div id="activity" className="views">
				<div className="row activity-header">
					<div className="col-xs-6">
						{formattedDate}
					</div>
					<div className="col-xs-6 text-right">
						{activity.Key.name}
					</div>
				</div>
				<div id="receiptInfo" className="row margin-top-15 margin-bottom-15">
					<div className="col-xs-12 col-sm-7">
						<table className="table margin-top-10"><tbody>
							<tr><td>Phone:</td><td>{activity.Key.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}</td></tr>
							<tr><td>Address:</td><td>{activity.Key.line1}<br/>{activity.Key.city}, {activity.Key.state} {activity.Key.zip}</td></tr>
							<tr><td>Email:</td><td>{activity.Key.email}</td></tr>
							<tr><td>Website:</td><td><a href={activity.Key.url}>{activity.Key.url}</a></td></tr>

						</tbody></table>
     				</div>
					<div className="hidden-xs col-sm-5">
					   <div className="margin-top-10">Charged to CC-{activity.Link.lastFour}</div>
						<div className="card card-block margin-top-15 align-right">
							<p className="card-text color-secondary">Total</p>
							<h4 className="card-title">${activity.Receipt.total}</h4>
						</div>
					</div>
					<div className="col-xs-12 hidden-sm hidden-md hidden-lg text-center">
						<div className="margin-top-10">Charged CC-{activity.Link.lastFour}</div>
						<div className="margin-top-10">
								<span className="color-secondary">Total: </span>
								<span className="bold align-right">${activity.Receipt.total}</span>
						</div>
					</div>
				</div>
				<table className="table">
					<thead><tr><th>Item</th><th>Quantity</th><th>Unit Cost</th><th>Total</th></tr></thead>
					<tbody>
					{
						activity.Receipt.items.map((itemGroup, i)=>{
							return itemGroup.map((item, j)=>{
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
