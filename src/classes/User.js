import { Lodash } from '../cdn'
import config from '../../config.js'
export default class User {

	static getProfile(){
		// Retrieves the profile data from localStorage
		const profile = localStorage.getItem('profile')
		return profile ? JSON.parse(localStorage.profile) : {};
	}

	static getFullProfile(){
		return $.ajax({
			url: config.apiHost + "/user",
			type: "get",
			headers: {
				Authorization: "Bearer " + User.getToken()
			}
		}).catch((err)=>{
			console.log(err);
			if (err.status == 403) this.logout();
		});
	}

	static getToken(){
		// Retrieves the user token from localStorage
		return localStorage.getItem('id_token');
	}

	static getBasicToken(){
		return User.getFullProfile().then(function(profile){
			return Promise.resolve("Basic " + window.btoa(profile.user_id + ":" + profile.keys[0].token));
		});
	}

	update(postData){
		return $.ajax({
			url: config.apiHost + "/users/" + this.getProfile().user_id,
			type: "patch",
			headers: {
				Authorization: "Bearer " + this.getToken(),
			},
			data:postData
		});
	}
}
