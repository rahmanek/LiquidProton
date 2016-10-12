import { React, ReactRouter } from '../cdn'
import config from '../../config.js'
import User from '../classes/User.js'

var browserHistory = ReactRouter.browserHistory;

export default React.createClass({
	getInitialState: function() {
	   return {
			numberIsValid: false,
			cvvIsValid: false,
			month: "",
			year: "",
			givenName:"",
			surName:"",
			processingCard: false,
			monthIsValid: false,
			yearIsValid: false
		};
	},
	handleChange: function(event) {
		var changeVar = {};
		if(event.target.id == "month" && event.target.value > 0 && event.target.value <= 12) changeVar.monthIsValid = true;
		else if(event.target.id == "month") changeVar.monthIsValid = false;

		if(event.target.id == "year" && event.target.value >= new Date().getFullYear()) changeVar.yearIsValid = true;
		else if(event.target.id == "year") changeVar.yearIsValid = false;

		changeVar[event.target.id] = event.target.value;
		this.setState(changeVar);
		return;
	},
	handleMonth: function(event) {
		var changeVar = {};
		changeVar[event.target.id] = event.target.value;
		this.setState(changeVar);
		return;
	},
	componentWillReceiveProps: function(nextProps){
		if (nextProps.processSignal == true){
			this.props.changeSignal(false, ()=>{
				this.submitCard();
			});
		}
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
			this.setState({processingCard:false}, function(){
				this.props.onTokenization(token);
			});
			return;
		});
	},
	submitCard: function(){
		if(this.state.processingCard) return;
		this.setState({processingCard:true},function(){
			Spreedly.tokenizeCreditCard({
				month: this.state.month,
				year: this.state.year,
				first_name: this.state.givenName,
				last_name:this.state.surName
			});
		});
		return;
	},

	render: function(){
		console.log(this.state);
		return (
			<div id="cardForm">
				<input type="hidden" name="payment_method_token" id="payment_method_token"/>
				<div className="row padding-left-15 padding-right-15">
					<div className="col-xs-6 form-box">
						<div className="cursor-default">First Name</div>
						<input className="col-xs-12 border-none margin-top-5" value={this.state.givenName} onChange={this.handleChange} type="text" id="givenName" name="full_name" placeholder="First name here"/>
					</div>
					<div className="col-xs-6 form-box">
						<div className="cursor-default">Last Name</div>
						<input className="col-xs-12 border-none margin-top-5" value={this.state.surName} onChange={this.handleChange} type="text"  id="surName" name="full_name" placeholder="Last name here"/>
					</div>
				</div>
				<div className="row padding-left-15 padding-right-15">
					<div className="col-xs-12 form-box">
						<div>
							<span className="cursor-default">Credit Card Number</span>
							{
								(this.state.numberIsValid)
									?(<i className="fa fa-check-circle text-success float-right"/>)
									:(<i className="fa fa-times text-danger font-size-18 float-right"/>)
							}
						</div>
						<div id="spreedly-number" className="col-xs-12 margin-top-5">
						</div>
					</div>
				</div>
				<div className = "row padding-left-15 padding-right-15">
					<div className="col-xs-6 form-box">
						<div>
							<span className="cursor-default">CVV</span>
							{
								(this.state.cvvIsValid)
									?(<i className="fa fa-check-circle text-success font-size-18 float-right"/>)
									:(<i className="fa fa-times text-danger font-size-18 float-right"/>)
							}
						</div>
						<div className=" margin-top-10">
							<div id="spreedly-cvv" className="col-xs-12"></div>
						</div>
					</div>
					<div className="col-xs-6 form-box">
						<div>
							<span className="cursor-default">Expiration</span>
							{
								(this.state.monthIsValid && this.state.yearIsValid)
									?(<i className="fa fa-check-circle text-success font-size-18 float-right"/>)
									:(<i className="fa fa-times text-danger font-size-18 float-right"/>)
							}
						</div>
						<div className="col-xs-12 margin-top-5 text-right">
							<input className="col-xs-5 col-sm-3 border-none" value={this.state.month} onChange={this.handleChange} min="1" max="12" type="number" id="month" name="month" maxLength="2" placeholder="MM"/>
							<div className="col-xs-1 col-sm-1">
								<span>/</span>
							</div>
							<input className="col-xs-3 col-sm-6 border-none" value={this.state.year} onChange={this.handleChange} min="2016" type="number"  id="year" name="year" maxLength="4" placeholder="YYYY"/>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
