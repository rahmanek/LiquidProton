import { Auth0Lock, ReactRouter } from '../cdn'
import config from '../../config.js'
var browserHistory = ReactRouter.browserHistory;
export default class User {

	constructor(clientId,domain,isClosable) {
		// Configure Auth0
		this.lock = new Auth0Lock(clientId, domain, {
			allowedConnections: ['flectino-dev', 'github', 'google-oauth2'],
			socialButtonStyle: 'small',
			languageDictionary: {
				title: "Hi"
			},
			theme:{
				logo: 'http://img06.deviantart.net/ce86/i/2013/027/1/5/batman_logo_only_by_deathonabun-d5swf2u.png',
				primaryColor: '#31324F'
			}
		});
		// Add callback for lock `authenticated` event
		this.lock.on('authenticated', this.onAuthentication.bind(this))
		// binds login functions to keep this context
		this.login = this.login.bind(this)
	}

	onAuthentication(authResult){
	   // Saves the user token
		this.setToken(authResult.idToken);
		this.lock.getProfile(authResult.idToken, (error, profile) => {
			if (error) {
				console.log('Error loading the Profile', error)
			} else {
				console.log(profile)
				this.setProfile(profile);
				browserHistory.push("dash");
			}
		})
	}

	setProfile(profile){
		// Saves profile data to localStorage
		localStorage.setItem('profile', JSON.stringify(profile))
	}

	getProfile(){
		// Retrieves the profile data from localStorage
		const profile = localStorage.getItem('profile')
		return profile ? JSON.parse(localStorage.profile) : {}
	}

	getSecureProfile(){
		return $.ajax({
			url: config.apiHost + "/user",
			type: "get",
			headers: {
				Authorization: "Bearer " + this.getToken()
			}
		});
	}

	login() {
		// Call the show method to display the widget.
		this.lock.show()
	}

	isLoggedIn(){
		// Checks if there is a saved token and it's still valid
		return !!this.getToken()
	}

	setToken(idToken){
		// Saves user token to localStorage
		localStorage.setItem('id_token', idToken);
	}

	getToken(){
		// Retrieves the user token from localStorage
		return localStorage.getItem('id_token');
	}

	getBasicToken(){
		return this.getSecureProfile().then(function(profile){
		 	return Promise.resolve("Basic " + window.btoa(profile.user_id + ":" + profile.keys[0].token));
		});
	}

	logout(){
		// Clear user token and profile data from localStorage
		localStorage.removeItem('id_token');
		localStorage.removeItem('profile');
		browserHistory.push('auth');
		return;
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
