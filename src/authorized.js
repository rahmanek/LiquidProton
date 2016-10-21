import { React } from './cdn'
import SideMenu from './components/sideMenu.js'
import User from './classes/User.js'
import config from '../config.js'

var browserHistory = ReactRouter.browserHistory;

export default React.createClass({
	getInitialState: function() {
		return{
			user:{}
		}
	},
	componentWillMount: function(){
		if(User.getAuthorization() === null ) browserHistory.push("login");
	},

	componentDidMount: function(){
	},

	render: function (){
      var pass ={
         notification: this.props.notification,
         user: this.state.user
      }
		return (
         <div id="authorized" className="container height-100 padding-right-0 padding-left-0">
            <div className="col-xs-12 padding-right-0 padding-left-0 height-100 overflow-scroll-y">
               {React.cloneElement(this.props.children, pass)}
            </div>
         </div>
		);
	}
});
