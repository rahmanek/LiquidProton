import { ReactDOM, React } from './cdn'
import config from '../config'
import Modal from './components/modal'
import { getQueryVariable } from './classes/Utilities'

var Landing = React.createClass({
	getInitialState:function(){
		return {
			transaction: null,
			showEmail: false,
			showPhone: false
		};
	},
	componentWillMount: function(){
		$.get(config.apiHost + "/v1/transaction/" + window.location.pathname.split("/")[2])
		.then((data)=>{
			data.Items.sort(function(a,b){
				if(a.sequence > b.sequence) return 1;
				else return -1;
			});
			this.setState({transaction:data},function(){
				JsBarcode("#code128", "1234567890123", {format: "itf14"});
			});
		});
	},
	sendTransaction: function(){
		console.log("Sent!")
	},
	sendCoupon: function(){
		jQuery('#couponModal').modal('show');
	},
	returnPolicy: function(){
		jQuery('#returnModal').modal('show');
	},
	render: function (){
		var transaction = this.state.transaction;
		if(transaction === null) return (<div>Loading...</div>);
		var date = new Date(Date.parse(transaction.transactedAt));
		// Remove seconds from locale date string
		var formattedDate = date.toLocaleString().replace(/([:][1-9]{2}[" "])/, " ");
		var contactItems = [];
		var faIcons = {
			facebook:"facebook",
			phone: "phone",
			web: "globe",
			googlePlus: "google-plus",
			phone: "phone",
			email: "envelope",
			instagram: "instagram",
			pinterest: "pinterest-p",
			twitter: "twitter"
		}

		transaction.contact.map(function(contact,i){
			var preValue = contact.value;
			if(contact.type == "email") contact.value = "mailto:" + preValue;
			if(contact.type == "phone") contact.value = "tel:" + preValue;
			contactItems.push(
				<a key={i} href={contact.value} className="color-white">
					<li className="list-group-item bg-inverse">
						{contact.description}
						<i className={"vertical-align-middle float-right fa fa-fw line-height-inherit fa-" + faIcons[contact.type]}></i>
						{(contact.type == "phone" || contact.type == "email")?<div className="text-muted nowrap">{preValue}</div>:<div></div>}
					</li>
				</a>
			);
		})

		return (
         <div id="landing" className="container">
				<div className="collapse menu overflow-scroll-y position-fixed" id="exCollapsingNavbar">
					<div className="height-100vh bg-inverse text-white">
						<li className="list-group-item bg-inverse menuHead">Connect with {transaction.Key.name}</li>
						<ul className="list-group bg-inverse">
							{
								contactItems.map(function(item){
									return item;
								})
							}
						</ul>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 margin-top-15">
						<div className="col-xs-3 padding-left-0">
							<img className="logo" src="/assets/logos/dunk.jpg"/>
						</div>
						<div className="col-xs-9 padding-left-0">
							<div className="inline-block">
								<div className="brand-title vertical-align">{transaction.Key.name}</div>
								<div className="address">
									{transaction.address.line1}{(typeof transaction.address.line2 == "undefined")?"":" " + transaction.address.line2}
									, {transaction.address.city}, {transaction.address.state} {transaction.address.postalCode}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row activity-header">
					<div className="col-xs-8 date">
						{formattedDate}
					</div>
					<div className="col-xs-4 total align-center">
						{/* ${(transaction.total / 100).toFixed(2)} */}
						<div className="col-xs-6">
						 <i className="fa fa-share-alt" data-toggle="collapse" data-target="#share"/>
						</div><div>
						 <i className="fa fa-bars" data-toggle="collapse" data-target="#exCollapsingNavbar"/>
						</div>
					</div>
				</div>
				<div className="row promo1 vertical-align">
					<div className="col-xs-6">
						<a href="javascript:" onClick={this.returnPolicy}>Return Policy</a>
					</div>
					<div className="col-xs-6 price align-right padding-right-0">
						${(transaction.total / 100).toFixed(2)}
					</div>
				</div>
				<div id="share" className="bg-inverse row collapse text-white padding-top-10 padding-bottom-5 margin-bottom-15">
					<div className="col-xs-12 align-center margin-bottom-15">
						Share your transaction
					</div>
					<div className = "col-xs-12">
						<div className="col-xs-6 align-center">
							<i className="fa fa-fw fa-envelope font-size-42" onClick={()=>this.setState({showText:false,showEmail:true})}></i><br/>Email
						</div>
						<div className="col-xs-6 align-center">
							<i className="fa fa-fw fa-phone font-size-42" onClick={()=>this.setState({showText:true,showEmail:false})}></i><br/>Text
						</div>
					</div>
					{
						(this.state.showEmail || this.state.showText)?(
							<div className="col-xs-12 margin-top-20 margin-bottom-10">
								<div className="col-xs-8 offset-xs-1">
									{
										(this.state.showEmail)?<input className="form-control" placeholder="Email Address"/>:<input className="form-control" placeholder="Phone Number"/>
									}
								</div>
								<button type="button" className="margin-top-5 col-xs-2 btn btn-info btn-sm" onClick={this.sendTransaction}>Send</button>
							</div>
						):<div className="col-xs-12 margin-bottom-15"></div>
					}
				</div>
				{/* <div className="row vertical-align">
					<div className="col-xs-6">
					</div>
					<div className="col-xs-6 align-center">
						<a href="javascript:" onClick={this.returnPolicy}>Return Policy</a>
					</div>
				</div> */}

				<table className="table">
					<thead><tr><th></th><th>Item</th><th>Total</th></tr></thead>
					<tbody>
					{
						transaction.Items.map((item, i)=>{
							if(typeof item.unitPrice == "undefined") var unitPrice = "";
							else var unitPrice = "$" + item.unitPrice/100;
							if(typeof item.quantity == "undefined") var quantity = "";
							else var quantity = item.quantity;
							var groupStart = false;
							transaction.itemGroups.map(function(group){
								if (group.start == item.sequence) groupStart = true;
							});
							return (
								<tr className={(groupStart)?"newSection":""} key={i}>
									<td>{quantity}</td>
									<td>{item.description}</td>
									<td>${(item.total/100).toFixed(2)}</td>
								</tr>
							);
						})
					}
					</tbody>
				</table>
				<div className="row promo1 align-center">
					<div className="col-xs-12">
						Get a free donut on your next visit! <br/>
						<a className="promo" href="javascript:">
							<button type="button" className="btn btn-sm btn-secondary margin-top-10" onClick={this.sendCoupon} data-dismiss="modal">
								Claim Here
							</button>
						</a>
					</div>
				</div>

				<div className="row">
						<svg className="margin-auto display-block" id="code128"></svg>
				</div>
				<Modal name="returnModal">
					<div>
						<div className="align-center">
							<div className="bold padding-bottom-20">Return Policy</div>
							<div>Return stuff in 90 days and you good.</div>
						</div>
						<div className="row padding-top-20">
							<button type="button" className="col-xs-6 offset-xs-3 btn btn-app-primary" onClick={this.clearForm} data-dismiss="modal">
								Go Back
							</button>
						</div>
					</div>
				</Modal>
				<Modal name="couponModal">
					<div>
						<div className="align-center">
							<div className="bold padding-bottom-20">Your coupon is on its way!</div>
							<div>You should receive your coupon by text soon!</div>
						</div>
						<div className="row padding-top-20">
							<button type="button" className="col-xs-6 offset-xs-3 btn btn-app-primary" onClick={this.clearForm} data-dismiss="modal">
								Go Back
							</button>
						</div>
					</div>
				</Modal>
         </div>
		);
	}
});


ReactDOM.render((
	<div>
		<Landing/>
	</div>
), document.getElementById('app'));
