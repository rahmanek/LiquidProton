import { ReactDOM, React } from './cdn'
import config from '../config'
import Modal from './components/modal'
import { getQueryVariable } from './classes/Utilities'

var Coupon = React.createClass({
	getInitialState:function(){
		return {
			coupon: {}
		};
	},
	componentDidMount: function(){
		$.get(config.apiHost + "/v1/coupon/" + window.location.pathname.split("/")[2])
		.then((data)=>{
			this.setState({coupon:data},function(){
				// JsBarcode("#code128", "1234567890123", {format: "itf14"});
			});
		});
	},

	render: function (){
		return(
			<div id="coupon" className="container">
				<h3>HI</h3>
			</div>
		)
	}
});


ReactDOM.render((
	<div><Coupon/>
	</div>
), document.getElementById('app'));
