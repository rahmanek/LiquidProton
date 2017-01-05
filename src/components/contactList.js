import { React } from '../cdn'

export default React.createClass({
	getInitialState: function() {
		return{
			faIcons: {
				facebook:"facebook",
				phone: "phone",
				web: "globe",
				googlePlus: "google-plus",
				phone: "phone",
				email: "envelope",
				instagram: "instagram",
				pinterest: "pinterest-p",
				twitter: "twitter"
			}
		}
	},
	render: function (){
		if(this.props.transaction == null) return (<div></div>);
		else var transaction = this.props.transaction;
		var contactItems = [];
		this.props.transaction.contact.map((contact,i)=>{
			var link = contact.value;
			if(contact.type == "email") link = "mailto:" + contact.link;
			if(contact.type == "phone") link = "tel:" + contact.link;
			contactItems.push(
				<a key={i} href={link} className="color-white">
					<li className="list-group-item bg-inverse">
						{contact.description}
						<i className={"vertical-align-middle float-right fa fa-fw line-height-inherit fa-" + this.state.faIcons[contact.type]}></i>
						{(contact.type == "phone" || contact.type == "email")?<div className="text-muted nowrap">{contact.value}</div>:<div></div>}
					</li>
				</a>
			);
		});
		return (
			<div className="collapse menu overflow-scroll-y position-fixed" id="navbar">
				<div className="height-100vh bg-inverse text-white">
					<li className="list-group-item bg-inverse menuHead">Connect with {transaction.Key.name}</li>
					<ul className="list-group bg-inverse">
						{
							contactItems.map(function(item){
								return item;
							})
						}
					</ul>
				</div>
			</div>
		);
	}
});
