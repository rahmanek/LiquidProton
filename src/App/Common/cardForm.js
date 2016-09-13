import React from 'react'
import { render } from 'react-dom'
import config from '../../../config.js'
import User from '../../classes/User.js'
import { browserHistory } from 'react-router'

export default React.createClass({
	getInitialState: function() {
	   return {
			numberIsValid: false,
			cvvIsValid: false,
			month: "",
			year: "",
			givenName:"",
			surName:"",
			processingCard: false
		};
	},
	handleChange: function(event) {
		var changeVar = {};
		changeVar[event.target.id] = event.target.value;
		this.setState(changeVar);
		return;
	},
	componentDidMount: function(){

		Spreedly.init(config.gatewayKey, {
			"numberEl": "spreedly-number",
			"cvvEl": "spreedly-cvv"
		});

		Spreedly.on('ready', function() {
		  Spreedly.setFieldType("number", "text");
		  Spreedly.setNumberFormat("prettyFormat");
		  Spreedly.setPlaceholder("number", "xxxx xxxx xxxx xxxx xxxx");
		  Spreedly.setStyle("number", "width:100%;");
		  Spreedly.setPlaceholder("cvv", "xxx");
		  Spreedly.setStyle("cvv", "width:100%;");
		});

		Spreedly.on("consoleError", function(error) {
		  console.log("Error from Spreedly iFrame: " + error["msg"]);
		});

		Spreedly.on('errors', function(errors) {
			console.log(errors)
		});
		Spreedly.on('fieldEvent', (name, type, activeEl, inputProperties) => {

			if(typeof inputProperties.validNumber != "undefined"){
				if (activeEl == "number" && inputProperties.validNumber) this.setState({numberIsValid:true});
				else if (activeEl == "number" && !inputProperties.validNumber) this.setState({numberIsValid:false});
			}
			if(typeof inputProperties.validCvv != "undefined"){
				if (activeEl == "cvv" && inputProperties.validCvv) this.setState({cvvIsValid:true});
				else if (activeEl == "cvv" && !inputProperties.validCvv) this.setState({cvvIsValid:false});
			}
		});

		Spreedly.on("paymentMethod", (token, data)=>{
			if(this.state.processingCard) return;
			this.setState({processingCard:true},function(){
				var postData = {
					authorization: User.getAuthorization(),
					token:token
				};
				$.post(config.apiHost + "/link/creditCard/create", postData)
				.then((data)=>{
					browserHistory.push({
						pathname:"links",
						query:{
							message:"Your card has been successfully added!"
						}
					});
				}).catch( (err) => {
					if(err.status == 409) this.props.notification.create({message:"The same link has been added already!", type:"danger"});
					else if(err.status == 400)  this.props.notification.create({message:"The card information provided could not be verified.  Please check and try again.", type:"danger"})
					else this.props.notification.create({message:"There was an error adding your link.", type:"danger"});
					this.setState({processingCard:false});
				});
				return;
			});
		});
	},
	submitPaymentForm: function(){
		Spreedly.tokenizeCreditCard({
			month: this.state.month,
			year: this.state.year,
			first_name: this.state.givenName,
			last_name:this.state.surName
		});

		return;
	},

	render: function(){
		return (
			<div id="addCard" className="margin-top-30">
				<div id="payment-form">

					<input type="hidden" name="payment_method_token" id="payment_method_token"/>
					<div className = "row">
						<div className="col-xs-12">
							<div className="col-xs-12 ccBox">
								<div className="col-xs-10">
									<span className="cursor-default">Credit Card</span>
								</div>
								<div className="col-xs-2 font-size-18 text-right">
								{
									(this.state.numberIsValid)
										?(<i className="fa fa-check-circle text-success"/>)
										:(<i className="fa fa-times text-danger font-size-18"/>)
								}
								</div>
								<div className="col-xs-12 margin-top-5">
									<div id="spreedly-number" className="col-xs-12"></div>
								</div>
							</div>
						</div>
					</div>
					<div className = "row">
						<div className="col-xs-12">
							<div className="col-xs-6 cvvBox">
								<div className="col-xs-10">
									<span  className="cursor-default">CVV</span>
								</div>
								<div className="col-xs-2 font-size-18 text-right">
								{
									(this.state.cvvIsValid)
										?(<i className="fa fa-check-circle text-success font-size-18"/>)
										:(<i className="fa fa-times text-danger font-size-18"/>)
								}
								</div>
								<div className="col-xs-12 margin-top-5">
									<div id="spreedly-cvv" className="col-xs-12"></div>
								</div>
							</div>
							<div className="col-xs-6 expBox">
								<div className="col-xs-10">
									<span className="cursor-default">Expiration</span>
								</div>
								<div className="col-xs-2 font-size-18">
									<div className="col-xs-2 font-size-18">
										<i className="fa fa-times text-danger font-size-18"></i>
										{/*<i className="fa fa-check-circle text-success"></i>*/}
									</div>
								</div>
								<div className="col-xs-12 margin-top-5 text-right">
									<input className="col-xs-3 border-none" value={this.state.month} onChange={this.handleChange} type="text" id="month" name="month" maxLength="2" placeholder="MM"/>
									<div className="col-xs-1">
										<span>/</span>
									</div>
									<input className="col-xs-6 border-none" value={this.state.year} onChange={this.handleChange} type="text" id="year" name="year" maxLength="4" placeholder="YYYY"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
