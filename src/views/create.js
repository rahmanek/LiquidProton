import { React } from '../cdn'
import config from '../../config.js'
import User from '../classes/User.js'

export default React.createClass({
	getInitialState: function() {
	   	return {
				keys: [],
				selectedKey: "",
				accessSecret:"",
				items:[[{
					quantity:"",
					description:"",
					unitPrice:"",
					total:""
				}]],
				total:"",
				cardNumber:[]
		 	};
	},
	componentDidMount: function(){
		var postData = {
			authorization: User.getAuthorization()
		}
		$.post(config.apiHost + "/apiKey/retrieve", postData)
		.then((data)=>{
			data.map(function(datum){
				var date = new Date(Date.parse(datum.createdAt));
				return datum.formattedDate = date.toDateString();
			});
			this.setState({keys:data})
		}).catch( (err) => {
			console.log(err);
			this.props.notification.create({message:"There was an error getting your keys.", type:"danger"});
		});
	},

	handleChange: function(event) {
		var changeVar = {};
		changeVar[event.target.id] = event.target.value;
		this.setState(changeVar);
		return;
	},
	removeItem: function(i,j){
		var items = this.state.items;
		items[i].splice(j,1);
		this.setState({items:items});
		return;
	},
	addItem: function(i){
		var items = this.state.items;
		items[i].push({
			quantity:"",
			description:"",
			unitPrice:"",
			total:"",
			fingerprint:""
		});
		this.setState({items:items});
		return;
	},
	addSection: function(){
		var items = this.state.items;
		items.push([{
			quantity:"",
			description:"",
			unitPrice:"",
			total:"",
			fingerprint:""
		}]);
		this.setState({items:items});
		return;
	},
	removeSection: function(i){
		var items = this.state.items;
		items.splice(i,1);
		this.setState({items:items});
		return;
	},
	handleItems: function(event, i, j, type){
		var items = this.state.items;
		items[i][j][type] = event.target.value;
		this.setState({items:items});
		return;
	},
	sendReceipt: function(){
		var authorization = "Basic " + btoa("AUB5jCkdq3b7kV9DTTdiQllORv5:" + this.props.user.accessSecret);
		var postData = {
		  "payment_method": {
		    "credit_card": {
		      "full_name": "Fred Joe",
		      "number": this.state.cardNumber,
		      "month": "3",
		      "year": "2032"
		    }
		  }
		};
		$.ajax({
		    url: 'https://core.spreedly.com/v1/payment_methods.json',
		    type: 'post',
		    data: postData,
		    headers: {
		        Authorization: authorization
		    },
		    dataType: 'json',
		    success: (data)=> {
				 var submission = {
				 	Key: this.state.selectedKey,
				 	Link:{
				 		fingerprint:data.transaction.payment_method.fingerprint
				 	},
				 	Receipt:{
				 		total: this.state.total,
				 		items: this.state.items
				 	}
				 }
				 $.post(config.apiHost + "/activity/reciept/create", submission)
				 .then(()=>{
				 	this.props.notification.create({message:"Your receipt was sent."});
					var reInitialize = this.getInitialState();
					delete reInitialize.keys;
				 	this.setState(reInitialize);
				 	return;
				 }).catch( (err) => {
				 	console.log(err);
				 	this.props.notification.create({message:"There was an error creating your activity.", type:"danger"});
				 });
			 },
			 error:(err)=>{
				 console.log(err);
				 this.props.notification.create({message:"There was an error creating your receipt.", type:"danger"});
			 }
		});



	},
	render: function (){
		return (
			<div id="create" className="views">
				<div className="row">
					<div className="col-xs-2">Key</div>
					<div className="col-xs-8">
						<select className="form-control" value={this.state.selectedKey} onChange={(e)=>this.setState({selectedKey:e.target.value})} name="select">
							<option value="" disabled></option>
							{
								this.state.keys.map(function(key, i){
									return (<option key={i} value={key.token}>{key.token}</option>)
								})
							}
						</select>
					</div>
				</div>
				<div className="row margin-top-20">
					<div className="col-xs-2">Access Secret</div>
					<div className="col-xs-8">
						<span id="cardNumber">{this.props.user.accessSecret}</span>
					</div>
				</div>
				<div className="row margin-top-20">
					<div className="col-xs-2">Card Number</div>
					<div className="col-xs-8">
						<input id="cardNumber" value={this.state.cardNumber} onChange={this.handleChange} className="form-control"/>
					</div>
				</div>
				<div className="row margin-top-20">
					<div className="col-xs-2">Quantity</div>
					<div className="col-xs-3">Item Description</div>
					<div className="col-xs-2">Price</div>
					<div className="col-xs-2">Item Total</div>
				</div>
				{
					this.state.items.map((itemGroup, i)=>{
						return (
							<div key={i} className="border-top padding-top-10 padding-bottom-10">
								{
									itemGroup.map((item,j)=>{
										return(
											<div key={j} className="row margin-top-20">
												<div className="col-xs-2"><input value={item.quantity} onChange={(e)=>this.handleItems(e,i,j,"quantity")} className="form-control"/></div>
												<div className="col-xs-3"><input value={item.description} onChange={(e)=>this.handleItems(e,i,j,"description")} className="form-control"/></div>
												<div className="col-xs-2"><input value={item.unitPrice} onChange={(e)=>this.handleItems(e,i,j,"unitPrice")} className="form-control"/></div>
												<div className="col-xs-2"><input value={item.total} onChange={(e)=>this.handleItems(e,i,j,"total")} className="form-control"/></div>
												<div className="col-xs-3" onClick={()=>this.removeItem(i,j)}><button className="btn btn-secondary">Remove Item</button></div>
											</div>
										);
									})
								}
								<div className="row margin-top-20">
									<div className="col-xs-2">
										<div onClick={()=>this.addItem(i)}><button className="btn btn-primary">Add Item</button></div>
									</div>
									<div className="col-xs-2">
										<div onClick={()=>this.removeSection(i)}><button className="btn btn-secondary">Remove Section</button></div>
									</div>
								</div>
							</div>
						)
					})
				}

				<div className="row margin-top-20">
					<div className="col-xs-2 col-xs-offset-5 text-right">Total</div>
					<div className="col-xs-2">
						<input id="total" value={this.state.total} onChange={this.handleChange} className="form-control"/>
					</div>
				</div>
				<div className="row margin-top-20">
					<div className="col-xs-2 col-xs-offset-7">
						<div onClick={this.sendReceipt}><button className="btn btn-primary">Send</button></div>
					</div>
					<div className="col-xs-2">
						<div onClick={this.addSection}><button className="btn btn-primary">Add Section</button></div>
					</div>
				</div>

			</div>
		);
	}
});
