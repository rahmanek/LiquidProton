import { React } from '../cdn'

export default React.createClass({
	getInitialState: function() {
	   	return {
				editMode: false
		 	};
	},
	toggleEditMode: function() {
		this.setState({editMode:!this.state.editMode});
		return;
	},
	render: function (){
		return (
			<div id="account">
				{/* <div className="row light-border">
					<div className="col-xs-4">
						First Name:
					</div>
    				<div className="col-xs-4">
						{this.props.user.givenName}
        			</div>
   			</div>
				<div className="row light-border">
					<div className="col-xs-4">
						Last Name:
					</div>
    				<div className="col-xs-4">
						{this.props.user.surName}
        			</div>
   			</div>
				<div className="row light-border">
					<div className="col-xs-4">
						Email:
					</div>
					<div className="col-xs-4">
						{this.props.user.email}
					</div>
					<div className="col-xs-4">
						{(this.props.user.isEmailVerified)?<span></span>:<span>Verify Email</span>}
					</div>
				</div>
				<div className="row light-border">
					<div className="col-xs-4">
						Notification Preference:
					</div>
					<div className="col-xs-4">
						{(this.props.user.emailPreference == 0) ? "Immediately":"Never"}
					</div>
				</div>
				<div className="margin-top-50 row">
					{
						(this.state.editMode) ? (
							<div>
								<div className="col-xs-6">
									<button type="button" onClick={this.toggleEditMode} className="col-xs-6 col-xs-offset-3 btn btn-secondary marginTop15" data-dismiss="modal">
										Save
									</button>
								</div>
								<div className="col-xs-6">
									<button type="button" onClick={this.toggleEditMode} className="col-xs-6 col-xs-offset-3 btn marginTop15" data-dismiss="modal">
										Cancel
									</button>
								</div>
							</div>
						):(
							<div className="col-xs-6">
								<button type="button" onClick={this.toggleEditMode} className="col-xs-6 col-xs-offset-3 btn btn-primary marginTop15" data-dismiss="modal">
									Edit
								</button>
							</div>
						)
					}
				</div> */}
				Account
			</div>
		);
	}
});
