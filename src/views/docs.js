import { React } from '../cdn'
import User from '../classes/User'
import sample from '../data/transactionSample'
import config from '../../config.js'
export default React.createClass({
	getInitialState: function() {
   	return {};
	},
	sendReceipt:function(){
		this.props.user.getBasicToken().then(function(token){
			$.ajax({
				url: config.apiHost + "/v1/transaction",
				type: "post",
				headers: {
					Authorization: token
				},
				data: sample
			}).then(function(stuff){
				console.log(stuff);
			}).catch( (err) => {
				console.log(err);
				this.props.notification.create({message:"There was an error getting your keys.", type:"danger"});
			});
		});
	},

	render: function (){
		return (
			<div id="docs">
				<div className="page-header">Documentation</div>
				<button onClick={this.sendReceipt}>Send Sample Receipt</button>
			</div>
		);
	}
});
