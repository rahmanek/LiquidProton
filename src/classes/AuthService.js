import { Auth0Lock, ReactRouter } from '../cdn'
var browserHistory = ReactRouter.browserHistory;
export default class AuthService {

	constructor(clientId,domain) {
		// Configure Auth0
		this.lock = new Auth0Lock(clientId, domain, {
			allowedConnections: ['flectino-dev'],
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
		this.lock.on('authenticated', this._doAuthentication.bind(this))
		// binds login functions to keep this context
		this.login = this.login.bind(this)
	}

	_doAuthentication(authResult){
	   // Saves the user token
		this.setToken(authResult.idToken);
		this.lock.getProfile(authResult.idToken, (error, profile) => {
			if (error) {
				console.log('Error loading the Profile', error)
			} else {
				this.setProfile(profile);
				if (typeof profile.group != "undefined" && profile.group == "agent") browserHistory.push("dash");
				else browserHistory.push("activities");
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

	login() {
		// Call the show method to display the widget.
		this.lock.show()
	}

	loggedIn(){
		// Checks if there is a saved token and it's still valid
		return !!this.getToken()
	}

	setToken(idToken){
		// Saves user token to localStorage
		localStorage.setItem('id_token', idToken)
	}

	getToken(){
		// Retrieves the user token from localStorage
		return localStorage.getItem('id_token')
	}

	logout(){
		browserHistory.push('landing');
		// Clear user token and profile data from localStorage
		localStorage.removeItem('id_token');
		localStorage.removeItem('profile');
		return;

	}
}
