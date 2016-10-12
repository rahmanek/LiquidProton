import { React, ReactRouter, $ } from '../cdn'
import config from '../../config.js'
import User from '../classes/User.js'

var Link = ReactRouter.Link;

export default React.createClass({
	getInitialState: function() {
	   	return {
				keys: []
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

	render: function(){
		return (
			<div id="keys" className="margin-top-30">
				<div className="row margin-top-15">
					<div className="col-xs-12">
						<div className="list-group margin-bottom-0">
							{
								this.state.keys.map((key, i)=>{
									return (
										<div className="list-group-item" key={i}>
											<div className="row">
												<div className="col-xs-6 bold">{key.name}</div>
												<div className="col-xs-6 text-right">Date Added: {key.formattedDate}</div>
											</div>
											<div className="row margin-top-15">
												<div className="col-xs-12">
													Address: {key.line1}, {key.city}, {key.state} {key.zip}
												</div>
												<div className="col-xs-12">
													URL: {key.url}
												</div>
											</div>
											<div className="row margin-top-15">
												<div className="col-xs-12">
													Key: {key.token}
												</div>
												<div className="col-xs-12">
													Request Count: {key.requests}
												</div>
											</div>
										</div>
									);
								})
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
});
