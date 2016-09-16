import React from 'react'
import { render } from 'react-dom'
import config from '../../config.js'
import User from '../classes/User.js'

export default React.createClass({
	getInitialState: function() {
	   	return {
				keys: [],
				selectedKey: "",
				fingerprint:"fd92d30188397b3dd6236426554a83a8f324",
				items:[{
					quantity:0,
					description:"",
					unitPrice:0,
					total:0
				}],
				total:0
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
	removeItem: function(nIndex){
		var items = this.state.items;
		items.splice(nIndex,1);
		this.setState({items:items});
		return;
	},
	addItem: function(){
		var items = this.state.items;
		items.push({
			quantity:0,
			description:"",
			unitPrice:0,
			total:0,
			fingerprint:""
		});
		this.setState({items:items});
		return;
	},
	handleItems: function(event, itemIndex, type){
		var items = this.state.items;
		items[itemIndex][type] = event.target.value;
		this.setState({items:items});
		return;
	},
	sendReceipt: function(){

		var submission = {
			Key: this.state.selectedKey,
			Link:{
				fingerprint:this.state.fingerprint
			},
			Receipt:{
				total: this.state.total,
				items:[this.state.items]
			}
		}
		$.post(config.apiHost + "/activity/reciept/create", submission)
		.then(()=>{
			this.props.notification.create({message:"Your receipt was sent."});
			this.setState(this.getInitialState());
			return;
		}).catch( (err) => {
			console.log(err);
			this.props.notification.create({message:"There was an error creating your activity.", type:"danger"});
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
					<div className="col-xs-2">Fingerprint</div>
					<div className="col-xs-8">
						<span id="cardNumber">{this.state.fingerprint}</span>
					</div>
				</div>
				<div className="row margin-top-20">
					<div className="col-xs-2">Quantity</div>
					<div className="col-xs-3">Item Description</div>
					<div className="col-xs-2">Price</div>
					<div className="col-xs-2">Item Total</div>
				</div>
				{
					this.state.items.map((item, i)=>{
						return(
							<div key={i} className="row margin-top-20">
								<div className="col-xs-2"><input value={item.quantity} onChange={(e)=>this.handleItems(e,i,"quantity")} className="form-control"/></div>
								<div className="col-xs-3"><input value={item.description} onChange={(e)=>this.handleItems(e,i,"description")} className="form-control"/></div>
								<div className="col-xs-2"><input value={item.unitPrice} onChange={(e)=>this.handleItems(e,i,"unitPrice")} className="form-control"/></div>
								<div className="col-xs-2"><input value={item.total} onChange={(e)=>this.handleItems(e,i,"total")} className="form-control"/></div>
								<div className="col-xs-3" onClick={()=>this.removeItem(i)}><button className="btn btn-secondary">Remove</button></div>
							</div>
						)
					})
				}
				<div className="row">
					<div className="col-xs-1 col-xs-offset-9">
						<div onClick={this.addItem} className="margin-top-20"><button className="btn btn-primary">Add</button></div>
					</div>
				</div>
				<div className="row margin-top-20">
					<div className="col-xs-2 col-xs-offset-5 text-right">Total</div>
					<div className="col-xs-2">
						<input id="total" value={this.state.total} onChange={this.handleChange} className="form-control"/>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-2 col-xs-offset-5">
						<div onClick={this.sendReceipt} className="margin-top-20 col-xs-12"><button className="btn btn-primary">Send</button></div>
					</div>
				</div>

			</div>
		);
	}
});
