import React from 'react'
import { render } from 'react-dom'
import config from '../../config.js'
import User from '../classes/User.js'
import { Link } from 'react-router'
import Modal from '../components/modal.js'

import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;
require('bootstrap/js/modal');

export default React.createClass({
	getInitialState: function() {
	   	return {
				links: []
		 	};
	},
	componentDidMount: function(){
		var postData = {
			authorization: User.getAuthorization()
		}
		$.post(config.apiHost + "/link/creditCard/retrieve", postData)
		.then((data)=>{
			data.map(function(datum){
				var date = new Date(Date.parse(datum.createdAt));
				return datum.formattedDate = date.toLocaleDateString();
			});
			this.setState({links:data})
		}).catch( (err) => {
			console.log(err);
			this.props.notification.create({message:"There was an error getting your links.", type:"danger"});
		});
	},

	removeLink: function(linkId){

		var postData = {
			authorization: User.getAuthorization(),
			id:this.state.links[linkId].id
		}
		$.post(config.apiHost + "/link/creditCard/delete", postData)
		.then((data)=>{

			jQuery('#removeModal' + linkId).modal('hide');

			var links = this.state.links;
			links.splice(linkId,1);
			this.setState({links:links}, function(){
				this.props.notification.create({message:"The card was successfully deleted."});
			});
			return;
		}).catch( (err) => {
			jQuery('#removeModal' + linkId).modal('hide');
			this.props.motification.create({message:"There was an error deleting the link.", type:"danger"});
			return;
		});
		return;
	},

	render: function(){
		return (
			<div id="links" className="margin-top-30">
				<div className="row">
					<div className="col-xs-12">
						<Link to="/links/add">
							<button className="btn col-xs-2 col-xs-offset-9">
								Add Link <i className="fa fa-plus"></i>
							</button>
						</Link>
					</div>
				</div>
				<div className="row margin-top-15">
					<div className="col-xs-12">
						<div className="list-group">
						<div className="list-group-item">
							<div className="row">
								<div className="col-xs-3 bold">
									Card Last Four
								</div>
								<div className="col-xs-4 bold">
									Date Added
								</div>
								<div className="col-xs-4 bold">
									Cardholder name
								</div>
							</div>
						</div>
							{
								this.state.links.map((link, i)=>{
									return (
										<div className="list-group-item" key={i}>
											<div className="row">
												<div className="col-xs-3">
													{link.lastFour}
												</div>
												<div className="col-xs-4">
													{link.formattedDate}
												</div>
												<div className="col-xs-4">
													{link.name}
												</div>
												<div className="col-xs-1">
													<span className="linkHand" data-toggle="modal" data-target={"#removeModal" + i}>
	           										<i className="fa fa-times"></i>
													</span>
	           								</div>
											</div>
											<Modal name={"removeModal" + i}>
												<div>
													<div className="text-center">
														<div className="bold">Are you sure?</div>
														<div className="margin-top-15">Your credit card will be removed, but can be added back at any time.</div>
													</div>
													<div className="row margin-top-15">
														<button type="button" className="col-xs-4 col-xs-offset-1 btn btn-primary" onClick={()=> this.removeLink(i)}>
															Yes, remove it
														</button>
														<button type="button" className="col-xs-4 col-xs-offset-2 btn marginTop15" data-dismiss="modal">
															No, do not remove it
														</button>
													</div>
												</div>
											</Modal>
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
