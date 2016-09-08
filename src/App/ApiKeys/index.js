import React from 'react'
import { render } from 'react-dom'
import config from '../../../config.js'
import User from '../../classes/User.js'
import { Link } from 'react-router'

import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;
require('bootstrap/js/modal');

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
		console.log(this.state.keys);
		return (
			<div id="keys" className="margin-top-30">
				<div className="row margin-top-15">
					<div className="col-xs-12">
						<div className="list-group">
							<div className="list-group-item">
								<div className="row">
									<div className="col-xs-3 bold">
										Date Added
									</div>
									<div className="col-xs-3 bold">
										Number of Requests
									</div>
									<div className="col-xs-6 bold">
										API Token
									</div>
								</div>
							</div>
							{
								this.state.keys.map((key, i)=>{
									return (
										<div className="list-group-item" key={i}>
											<div className="row">
												<div className="col-xs-3">
													{key.formattedDate}
												</div>
												<div className="col-xs-3">
													{key.requests}
												</div>
												<div className="col-xs-6">
													{key.token}
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
