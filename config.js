
var environment = "development";

export default {
	environment: environment,
	apiHost: (function(){
		if(environment == "production") return "http://apitest.flectino.com";
		else return "http://localhost:3010";
	}()),
	webHost: (function(){
		if(environment == "production") return "http://webtest.flectino.com";
		else return "http://localhost:3000";
	}()),
	gatewayKey: "AUB5jCkdq3b7kV9DTTdiQllORv5",
	auth0:{
		clientId: "0SM0grBToCJjWGUbBtlZuHhylCq2dVt3",
		domain: "flectino.auth0.com"
	}
}
