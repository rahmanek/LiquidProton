import { React } from '../cdn'

export default React.createClass({
	render: function() {
		return (
			<div id="modal">
				<div className="modal fade" id={this.props.name}>
					<div className="vertical-alignment-helper">
						<div className="modal-dialog vertical-align-center" role="document">
							<div className="container">
								<div className="modal-content">
									<div className="row">
										<div className="col-xs-12">
											{this.props.children}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});
