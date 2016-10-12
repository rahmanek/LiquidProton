import { React, ReactRouter } from '../cdn'
var Link = ReactRouter.Link;



export default React.createClass({
	render: function (){
		return (
			<div id="verified" className="margin-top-50 margin-bottom-30">
				<div className="row light-border">
					<div className="col-xs-10 col-xs-offset-1 text-center font-size-18 color">
						Your Email was verified successfully.  Look out for another email to help you get started!<br/><br/>
						You can also login to your account <Link to="/login" className="color-primary">here</Link>

					</div>
   			</div>
			</div>
		);
	}
});
