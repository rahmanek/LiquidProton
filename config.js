
export default {
	apiHost: (function(){
		if(process.env.NODE_ENV == "production") return "http://apitest.flectino.com";
		else return "http://localhost:3010";
	}()),
	webHost: (function(){
		if(process.env.NODE_ENV == "production") return "http://webtest.flectino.com";
		else return "http://localhost:3000";
	}()),
	gatewayKey: "AUB5jCkdq3b7kV9DTTdiQllORv5"
}
