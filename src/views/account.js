import { React } from '../cdn'

export default React.createClass({
	getInitialState: function() {
	   	return {
				apiKey:"Your secret API Key",
				keyPulled: false,
				profile: this.props.user.getProfile()
		 	};
	},
	presentKey: function() {
		if(!this.state.keyPulled) this.props.user.getSecureProfile().then((user)=>{
			this.setState({apiKey:user.app_metadata.key,keyPulled:true});
		});
	},

	render: function (){
		return (
			<div id="account">
				<h3 className="margin-bottom-25">Account</h3>
				<div className="col-xs-12 infoBox">
					<div className="row">
						<div className="col-xs-6">
							<h5>Email</h5>
							<span>{this.state.profile.email}</span>
						</div>
						<div className="col-xs-6">
							<h5>Subscription</h5>
							<span>Free Unlimited</span>
						</div>
					</div>
					<div className="row margin-top-35">
						<div className="col-xs-6">
							<h5>User ID</h5>
							<span>{this.state.profile.user_id}</span>
						</div>
						<div className="col-xs-6">
							<h5>Api Key&nbsp;&nbsp;<a href="javascript:" className="font-size-12" onClick={this.presentKey}>Show</a></h5>
							{
								(this.state.keyPulled)?
								<input id="keyBox" type="text" className="form-control" value={this.state.apiKey} readOnly/>:
								<input id="keyBox" type="password" className="form-control" value={this.state.apiKey} readOnly/>
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
});

// <div className="row light-border">
// 	<div className="col-xs-4">
// 		First Name:
// 	</div>
// 	<div className="col-xs-4">
// 		{this.props.user.givenName}
// 	</div>
// </div>
// <div className="row light-border">
// 	<div className="col-xs-4">
// 		Last Name:
// 	</div>
// 	<div className="col-xs-4">
// 		{this.props.user.surName}
// 	</div>
// </div>
// <div className="row light-border">
// 	<div className="col-xs-4">
// 		Email:
// 	</div>
// 	<div className="col-xs-4">
// 		{this.props.user.email}
// 	</div>
// 	<div className="col-xs-4">
// 		{(this.props.user.isEmailVerified)?<span></span>:<span>Verify Email</span>}
// 	</div>
// </div>
// <div className="row light-border">
// 	<div className="col-xs-4">
// 		Notification Preference:
// 	</div>
// 	<div className="col-xs-4">
// 		{(this.props.user.emailPreference == 0) ? "Immediately":"Never"}
// 	</div>
// </div>
// <div className="margin-top-50 row">
// 	{
// 		(this.state.editMode) ? (
// 			<div>
// 				<div className="col-xs-6">
// 					<button type="button" onClick={this.toggleEditMode} className="col-xs-6 col-xs-offset-3 btn btn-secondary marginTop15" data-dismiss="modal">
// 						Save
// 					</button>
// 				</div>
// 				<div className="col-xs-6">
// 					<button type="button" onClick={this.toggleEditMode} className="col-xs-6 col-xs-offset-3 btn marginTop15" data-dismiss="modal">
// 						Cancel
// 					</button>
// 				</div>
// 			</div>
// 		):(
// 			<div className="col-xs-6">
// 				<button type="button" onClick={this.toggleEditMode} className="col-xs-6 col-xs-offset-3 btn btn-primary marginTop15" data-dismiss="modal">
// 					Edit
// 				</button>
// 			</div>
// 		)
// 	}
// </div>
