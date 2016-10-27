import { React } from '../cdn'

export default React.createClass({
	render: function (){
		var notifications = this.props.notification.retrieve();
		var notificationView = (<div></div>);
		if (notifications.length > 0){
			notificationView = (
				<div id="notifications">
					{
						notifications.map((notification, i)=>{
							if (notification.type == undefined) notification.type = "success";
							return(
								<div className={"alert alert-" + notification.type} key={i} data-nIndex={i}>
									{notification.message}
									<span className="close" onClick={ () => this.props.notification.remove(i) }>
										<span>&times;</span>
									</span>
								</div>
							)
						})
					}
    			</div>
			)
		}
		return notificationView;
	}
});
