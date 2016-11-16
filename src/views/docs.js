import { React } from '../cdn'
import User from '../classes/User'
import sample from '../data/transactionSample'
import config from '../../config.js'
export default React.createClass({
	getInitialState: function() {
   	return {
			phone:"",
			sample:sample,
			basicToken: "",
			referenceId: ""
		};
	},
	componentDidMount: function(){
		User.getBasicToken().then((token)=>{
			this.setState({basicToken:token});
		});
	},
	sendReceipt:function(){
		$.ajax({
			url: config.apiHost + "/v1/transaction",
			type: "post",
			headers: {
				Authorization: this.state.basicToken
			},
			data: this.state.sample
		}).then((data)=>{
			this.props.notification.create({message:"Your request was made successfully."});
		}).catch( (err) => {
			console.log(err);
			this.props.notification.create({message:"There was an error getting your keys.", type:"danger"});
		});
	},
	handleChange: function(e){
		var number = e.target.value;
		sample.link.phone = number;
		this.setState({phone:number});
	},
	render: function (){
		return (
			<div id="docs">
				<div className="page-header">Documentation</div>
				<div className="row">
					<div className="col-xs-6 configure">
						<div className="row margin-bottom-25 vertical-align">
							<div className="col-xs-12">
								<span className="font-size-24">
									Send Transaction<br/>
								</span>
								<span className="requestMethod">POST</span><span className="requestRoute">/transaction</span>
							</div>
						</div>
						<div className="row margin-bottom-15">
							<div className="col-xs-6">
								<span>Phone Number</span>
								<input type="text" className="form-control" onChange={this.handleChange} value={this.state.name}/>
							</div>
						</div>
						<div>
							<button type="button" className="btn btn-primary" onClick={this.sendReceipt}>Try</button>
						</div>
					</div>
					<div className="col-xs-6 code">
						<div className="sampleHeader margin-bottom-15">Headers</div>
						<span>Authorization: {this.state.basicToken} </span>
						<div className="sampleHeader  margin-top-15">Body</div>
						<code className="code">
							{JSON.stringify(sample, null, 2)}
						</code>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-6 configure">
						<div className="row margin-bottom-25 vertical-align">
							<div className="col-xs-12">
								<span className="font-size-24">
									Get Transaction<br/>
								</span>
								<span className="requestMethod">GET</span><span className="requestRoute">/transaction/:referenceToken</span>
							</div>
						</div>
						<div className="row margin-bottom-15">
							<div className="col-xs-6">
								<span>Reference Token</span>
								<input type="text" className="form-control" onChange={this.handleChange} value={this.state.name}/>
							</div>
						</div>
						<div>
							<button type="button" className="btn btn-primary">Try</button>
						</div>
					</div>
					<div className="col-xs-6 code">
						<div className="sampleHeader margin-bottom-15">Headers</div>
						<span>Authorization: {this.state.basicToken} </span>
						<div className="sampleHeader  margin-top-15">Body</div>
						<code className="code">
						</code>
					</div>
				</div>
			</div>
		);
	}
});
