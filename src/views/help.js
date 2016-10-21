import { React } from '../cdn'
import Footer from '../components/Footer.js'
export default React.createClass({

	render: function (){
		return (
			<div>
				<div id="help" className="margin-top-30">
					<div className="container">
						<div className="row">
							<div className="col-xs-12">
								Help
							</div>
						</div>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
});
