import React from 'react'
import { render } from 'react-dom'

export default React.createClass({
	render: function() {
		return (
			<div id="modal">
				<div className="modal fade" id={this.props.name}>
					<div className="vertical-alignment-helper">
						<div className="modal-dialog vertical-align-center" role="document">
							<div className="modal-content">
								<div className="row">
									<div className="col-xs-10 col-xs-offset-1">
										{this.props.children}
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
