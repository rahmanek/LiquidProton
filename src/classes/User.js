export default class User {

	constructor() {
		// Configure Auth0
		// this.lock = new Auth0Lock(clientId, domain, {
		// 	allowedConnections: ['flectino-dev', 'github', 'google-oauth2'],
		// 	socialButtonStyle: 'small',
		// 	languageDictionary: {
		// 		title: "Hi"
		// 	},
		// 	theme:{
		// 		logo: 'http://img06.deviantart.net/ce86/i/2013/027/1/5/batman_logo_only_by_deathonabun-d5swf2u.png',
		// 		primaryColor: '#31324F'
		// 	}
		// });
		// // Add callback for lock `authenticated` event
		// this.lock.on('authenticated', this._doAuthentication.bind(this))
		// // binds login functions to keep this context
		// this.login = this.login.bind(this)
	}

	static retrieve(userToken){
		console.log("retrieveing user!");
		// var postData = {
		// 	authorization: User.getAuthorization()
		// }
		// $.post(config.apiHost + "/apiKey/retrieve", postData)
		// .then((data)=>{
		// 	data.map(function(datum){
		// 		var date = new Date(Date.parse(datum.createdAt));
		// 		return datum.formattedDate = date.toDateString();
		// 	});
		// 	this.setState({keys:data})
		// }).catch( (err) => {
		// 	console.log(err);
		// 	this.props.notification.create({message:"There was an error getting your keys.", type:"danger"});
		// });
	}
}
