
export default {

	setAuthorization:function(auth, storage){
		if(storage == "local"){
			window.localStorage.setItem('authorization', auth);
			sessionStorage.clear()
		} else {
			window.sessionStorage.setItem('authorization', auth)
			localStorage.clear()
		}
		return;
	},

	getAuthorization:function(){
		//Check session storage then local storage, if neither return a null user
		var authorization = window.sessionStorage.getItem('authorization');
		if(authorization == undefined){
			authorization = window.localStorage.getItem('authorization');
		}
		if(authorization == undefined){
			authorization = null;
		}
		return authorization;
	},

	deleteAuthorization:function(){
		window.localStorage.clear();
		window.sessionStorage.clear();
		return;
	}
}
