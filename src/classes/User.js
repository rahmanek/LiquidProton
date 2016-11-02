export default class User {


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
