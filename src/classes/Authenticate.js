import { Auth0Lock, ReactRouter } from '../cdn'
import User from './User'
import config from '../../config'
var browserHistory = ReactRouter.browserHistory;

export default class Authenticate{

	constructor(options={}) {
		console.log(options)
		var lockSettings = {
			allowedConnections: ['flectino-dev', 'github', 'google-oauth2'],
			socialButtonStyle: 'small',
			languageDictionary: {
				title: "Hi"
			},
			theme:{
				logo: 'http://img06.deviantart.net/ce86/i/2013/027/1/5/batman_logo_only_by_deathonabun-d5swf2u.png',
				primaryColor: '#00a08a'
			}
		};
		if (typeof options.initialScreen !="undefined") lockSettings.initialScreen = options.initialScreen;
		if (typeof options.allowLogin !="undefined") lockSettings.allowLogin = options.allowLogin;
		if (typeof options.container !="undefined") lockSettings.container = options.container;
		// Configure Auth0
		this.lock = new Auth0Lock(config.auth0.clientId, config.auth0.domain, lockSettings);
		// Add callback for lock `authenticated` event
		this.lock.on('authenticated', this.onAuthentication.bind(this))
		// binds login functions to keep this context
		this.login = this.login.bind(this)
	}

	onAuthentication(authResult){
	   // Saves the user token
		this.setToken(authResult.idToken);
		window.location = "/dash";
	}

	setProfile(profile){
		// Saves profile data to localStorage
		localStorage.setItem('profile', JSON.stringify(profile))
	}

	login() {
		// Call the show method to display the widget.
		this.lock.show()
	}

	static isLoggedIn(){
		// Checks if there is a saved token and it's still valid
		return !!User.getToken()
	}

	setToken(idToken){
		// Saves user token to localStorage
		localStorage.setItem('id_token', idToken);
	}

	static logout(){
		// Clear user token and profile data from localStorage
		localStorage.removeItem('id_token');
		localStorage.removeItem('profile');
		window.location = "/";
		return;
	}

}
