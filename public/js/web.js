(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var environment = "development";

exports.default = {
	environment: environment,
	apiHost: function () {
		if (environment == "production") return "http://apitest.flectino.com";else return "http://localhost:3010";
	}(),
	webHost: function () {
		if (environment == "production") return "http://webtest.flectino.com";else return "http://localhost:3000";
	}(),
	gatewayKey: "AUB5jCkdq3b7kV9DTTdiQllORv5",
	auth0: {
		clientId: "0SM0grBToCJjWGUbBtlZuHhylCq2dVt3",
		domain: "flectino.auth0.com"
	}
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require('./cdn');

var _header = require('./components/header.js');

var _header2 = _interopRequireDefault(_header);

var _notifications = require('./components/notifications.js');

var _notifications2 = _interopRequireDefault(_notifications);

var _nav = require('./components/nav');

var _nav2 = _interopRequireDefault(_nav);

var _Utilities = require('./classes/Utilities');

var _User = require('./classes/User.js');

var _User2 = _interopRequireDefault(_User);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browserHistory = _cdn.ReactRouter.browserHistory;

exports.default = _cdn.React.createClass({
	displayName: 'app',

	getInitialState: function getInitialState() {
		return {
			notifications: []
		};
	},
	createNotification: function createNotification(notification) {
		var notifications = this.state.notifications;
		notifications.push(notification);
		this.setState({ notifications: notifications });

		return;
	},
	removeNotification: function removeNotification(nIndex) {
		var notifications = this.state.notifications;
		notifications.splice(nIndex, 1);
		return this.setState({ notifications: notifications });
	},
	retrieveNotifications: function retrieveNotifications() {
		return this.state.notifications;
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		// Remove notifications when view changes
		if (this.props.location.pathname != nextProps.location.pathname) {
			var notifications = [];
			if (typeof nextProps.location.query.message != "undefined") notifications.push({ message: nextProps.location.query.message });
			this.setState({ notifications: notifications });
		}
		return;
	},
	componentDidMount: function componentDidMount() {

		var notifications = this.state.notifications;
		if (typeof (0, _Utilities.getQueryVariable)("message") != "undefined") notifications.push({ message: (0, _Utilities.getQueryVariable)("message").split("+").join(" ") });

		return;
	},
	render: function render() {
		var view = this.props.routes[1];
		var pass = {
			notification: {
				create: this.createNotification,
				remove: this.removeNotification,
				retrieve: this.retrieveNotifications
			}
		};
		return _cdn.React.createElement(
			'div',
			null,
			_cdn.React.createElement(_notifications2.default, { notification: pass.notification }),
			_cdn.React.createElement(_header2.default, { notification: pass.notification }),
			_cdn.React.createElement(
				'div',
				{ className: 'page-body' },
				_cdn.React.createElement(
					'div',
					{ className: 'container fix-width' },
					_cdn.React.createElement(
						'div',
						{ className: 'row view' },
						_cdn.React.createElement(
							'div',
							{ className: 'col-xs-12' },
							_cdn.React.cloneElement(this.props.children, pass)
						)
					)
				)
			)
		);
	}
});

},{"../config.js":1,"./cdn":3,"./classes/User.js":6,"./classes/Utilities":7,"./components/header.js":9,"./components/nav":10,"./components/notifications.js":11}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var $ = window.$;
var jQuery = $;
var React = window.React;
var ReactDOM = window.ReactDOM;
var ReactRouter = window.ReactRouter;
var Auth0Lock = window.Auth0Lock;
var Lodash = window._;
exports.$ = $;
exports.jQuery = jQuery;
exports.React = React;
exports.ReactDOM = ReactDOM;
exports.ReactRouter = ReactRouter;
exports.Auth0Lock = Auth0Lock;
exports.Lodash = Lodash;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cdn = require('../cdn');

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var browserHistory = _cdn.ReactRouter.browserHistory;

var Authenticate = function () {
	function Authenticate() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, Authenticate);

		var lockSettings = {
			allowedConnections: ['flectino-dev', 'github', 'google-oauth2'],
			socialButtonStyle: 'small',
			languageDictionary: {
				title: "Hi"
			},
			theme: {
				logo: 'http://img06.deviantart.net/ce86/i/2013/027/1/5/batman_logo_only_by_deathonabun-d5swf2u.png',
				primaryColor: '#31324F'
			}
		};
		if (typeof options.initialScreen != "undefined") lockSettings.initialScreen = options.initialScreen;
		if (typeof options.allowLogin != "undefined") lockSettings.allowLogin = options.allowLogin;
		// Configure Auth0
		this.lock = new _cdn.Auth0Lock(_config2.default.auth0.clientId, _config2.default.auth0.domain, lockSettings);
		// Add callback for lock `authenticated` event
		this.lock.on('authenticated', this.onAuthentication.bind(this));
		// binds login functions to keep this context
		this.login = this.login.bind(this);
	}

	_createClass(Authenticate, [{
		key: 'onAuthentication',
		value: function onAuthentication(authResult) {
			var _this = this;

			// Saves the user token
			this.setToken(authResult.idToken);
			this.lock.getProfile(authResult.idToken, function (error, profile) {
				if (error) {
					console.log('Error loading the Profile', error);
				} else {
					_this.setProfile(profile);
					browserHistory.push("dash");
				}
			});
		}
	}, {
		key: 'setProfile',
		value: function setProfile(profile) {
			// Saves profile data to localStorage
			localStorage.setItem('profile', JSON.stringify(profile));
		}
	}, {
		key: 'login',
		value: function login() {
			// Call the show method to display the widget.
			this.lock.show();
		}
	}, {
		key: 'setToken',
		value: function setToken(idToken) {
			// Saves user token to localStorage
			localStorage.setItem('id_token', idToken);
		}
	}], [{
		key: 'isLoggedIn',
		value: function isLoggedIn() {
			// Checks if there is a saved token and it's still valid
			return !!_User2.default.getToken();
		}
	}, {
		key: 'logout',
		value: function logout() {
			console.log(1);
			// Clear user token and profile data from localStorage
			localStorage.removeItem('id_token');
			localStorage.removeItem('profile');
			browserHistory.push('auth');
			return;
		}
	}]);

	return Authenticate;
}();

exports.default = Authenticate;

},{"../../config":1,"../cdn":3,"./User":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cdn = require('../cdn');

var _config = require('../../config.js');

var _config2 = _interopRequireDefault(_config);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var browserHistory = _cdn.ReactRouter.browserHistory;

var Key = function () {
	function Key() {
		_classCallCheck(this, Key);
	}

	_createClass(Key, null, [{
		key: 'update',
		value: function update(postData, user) {
			return _User2.default.getBasicToken().then(function (basic) {
				return $.ajax({
					url: _config2.default.apiHost + "/v1/key",
					type: "post",
					headers: {
						Authorization: basic
					},
					data: postData
				});
			});
		}
	}]);

	return Key;
}();

exports.default = Key;

},{"../../config.js":1,"../cdn":3,"./User":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cdn = require('../cdn');

var _config = require('../../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
	function User() {
		_classCallCheck(this, User);
	}

	_createClass(User, [{
		key: 'update',
		value: function update(postData) {
			return $.ajax({
				url: _config2.default.apiHost + "/users/" + this.getProfile().user_id,
				type: "patch",
				headers: {
					Authorization: "Bearer " + this.getToken()
				},
				data: postData
			});
		}
	}], [{
		key: 'getProfile',
		value: function getProfile() {
			// Retrieves the profile data from localStorage
			var profile = localStorage.getItem('profile');
			return profile ? JSON.parse(localStorage.profile) : {};
		}
	}, {
		key: 'getFullProfile',
		value: function getFullProfile() {
			var _this = this;

			return $.ajax({
				url: _config2.default.apiHost + "/user",
				type: "get",
				headers: {
					Authorization: "Bearer " + User.getToken()
				}
			}).catch(function (err) {
				console.log(err);
				if (err.status == 403) _this.logout();
			});
		}
	}, {
		key: 'getToken',
		value: function getToken() {
			// Retrieves the user token from localStorage
			return localStorage.getItem('id_token');
		}
	}, {
		key: 'getBasicToken',
		value: function getBasicToken() {
			return User.getFullProfile().then(function (profile) {
				return Promise.resolve("Basic " + window.btoa(profile.user_id + ":" + profile.keys[0].token));
			});
		}
	}]);

	return User;
}();

exports.default = User;

},{"../../config.js":1,"../cdn":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


var getQueryVariable = function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var preVars = query.split('/');
	var vars = preVars[0].split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]) == variable) {
			return decodeURIComponent(pair[1]);
		}
	}
	console.log('Query variable %s not found', variable);
};

var isValid = {
	email: function email(_email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(_email);
	},
	phone: function phone(_phone) {
		var stripPhone = _phone.replace(/\D/g, '');
		if (stripPhone.length >= 10) return true;else false;
	}
};

var formatPhone10 = function formatPhone10(phone) {
	var stripPhone = phone.replace(/\D/g, '');
	var dash = "";
	var openParen = "";
	var closedParen = "";
	if (stripPhone.length > 0) openParen = "(";
	if (stripPhone.length > 3) closedParen = ")";
	if (stripPhone.length > 6) dash = "-";
	var formattedPhone = openParen + stripPhone.substring(0, 3) + closedParen + stripPhone.substring(3, 6) + dash + stripPhone.substring(6, 10);
	return formattedPhone;
};

var getTimezoneOffset = function getTimezoneOffset() {
	function pad(number, length) {
		var str = "" + number;
		while (str.length < length) {
			str = '0' + str;
		}
		return str;
	}
	var date = new Date();
	var offset = date.getTimezoneOffset();
	return (offset < 0 ? '+' : '-') + pad(parseInt(Math.abs(offset / 60)), 2) + pad(Math.abs(offset % 60), 2);
};

var createTimeDate = function createTimeDate(date, time) {
	var milestoneDate = new Date(date);
	var strSplit = time.split(':');
	var hour = parseInt(strSplit[0]);
	var minute = parseInt(strSplit[1].substring(0, 2));
	var set = strSplit[1].substring(2, 4);
	if (hour === 12) {
		if (set === "am") hour = 0;else hour = 12;
	} else if (set === "pm") hour += 12;
	milestoneDate.setHours(hour);
	milestoneDate.setMinutes(minute);
	milestoneDate.setMinutes(milestoneDate.getMinutes() - milestoneDate.getTimezoneOffset());
	return milestoneDate.toISOString();
};

exports.getQueryVariable = getQueryVariable;
exports.isValid = isValid;
exports.formatPhone10 = formatPhone10;
exports.getTimezoneOffset = getTimezoneOffset;
exports.createTimeDate = createTimeDate;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require('../cdn');

var _config = require('../../config.js');

var _config2 = _interopRequireDefault(_config);

var _User = require('../classes/User.js');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = _cdn.ReactRouter.Link;
var browserHistory = _cdn.ReactRouter.browserHistory;

exports.default = _cdn.React.createClass({
	displayName: 'Footer',

	render: function render() {

		return _cdn.React.createElement(
			'div',
			{ id: 'footer' },
			_cdn.React.createElement(
				'div',
				{ className: 'container' },
				_cdn.React.createElement(
					'div',
					{ className: 'col-md-4' },
					_cdn.React.createElement(
						'div',
						{ className: 'margin-bottom-10' },
						'Resources'
					),
					_cdn.React.createElement(
						'div',
						null,
						'For Customers'
					),
					_cdn.React.createElement(
						'div',
						null,
						'For Retailers'
					),
					_cdn.React.createElement(
						'div',
						null,
						'For Developers'
					),
					_cdn.React.createElement(
						'div',
						{ className: 'margin-bottom-10' },
						'Help'
					)
				),
				_cdn.React.createElement(
					'div',
					{ className: 'col-md-4' },
					_cdn.React.createElement(
						'div',
						{ className: 'margin-bottom-10' },
						'About'
					)
				),
				_cdn.React.createElement(
					'div',
					{ className: 'col-md-4' },
					_cdn.React.createElement(
						'div',
						{ className: 'margin-bottom-10' },
						'Contact'
					),
					_cdn.React.createElement(
						'div',
						null,
						'Call: (888)930-2938'
					),
					_cdn.React.createElement(
						'div',
						null,
						'Email: info@hi.com'
					)
				)
			)
		);
	}
});

},{"../../config.js":1,"../cdn":3,"../classes/User.js":6}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require('../cdn');

var _config = require('../../config.js');

var _config2 = _interopRequireDefault(_config);

var _Authenticate = require('../classes/Authenticate.js');

var _Authenticate2 = _interopRequireDefault(_Authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = _cdn.ReactRouter.Link;
var browserHistory = _cdn.ReactRouter.browserHistory;

exports.default = _cdn.React.createClass({
	displayName: 'header',

	getInitialState: function getInitialState() {
		return {
			authenticate: {},
			nav: [{
				name: "Dashboard",
				link: "dash",
				private: true
			}, {
				name: "Account",
				link: "account",
				private: true
			}, {
				name: "Support",
				link: "support",
				private: true
			}, {
				name: "Documentation",
				link: "docs",
				private: true
			}, {
				name: "Logout",
				link: "logout",
				private: true
			}, {
				name: "Login",
				link: "login",
				private: false
			}]
		};
	},
	componentDidMount: function componentDidMount() {
		var authenticate = new _Authenticate2.default();
		this.setState({ authenticate: authenticate });
	},
	render: function render() {
		var _this = this;

		return _cdn.React.createElement(
			'div',
			{ id: 'header' },
			_cdn.React.createElement(
				'nav',
				{ className: 'navbar navbar-fixed-top' },
				_cdn.React.createElement(
					'div',
					{ className: 'container fix-width' },
					_cdn.React.createElement(
						'span',
						{ className: 'navbar-brand', href: '#' },
						'Flectino'
					),
					_cdn.React.createElement(
						'ul',
						{ className: 'nav navbar-nav float-xs-right' },
						this.state.nav.map(function (item, i) {
							if (_Authenticate2.default.isLoggedIn() && item.private) return _cdn.React.createElement(
								'li',
								{ key: i, className: 'nav-item' },
								item.name == "Logout" ? _cdn.React.createElement(
									'a',
									{ href: 'javascript:', className: 'nav-link', onClick: _Authenticate2.default.logout },
									item.name
								) : _cdn.React.createElement(
									Link,
									{ to: item.link, className: 'nav-link' },
									item.name
								)
							);else if (!_Authenticate2.default.isLoggedIn() && !item.private) return _cdn.React.createElement(
								'li',
								{ key: i, className: 'nav-item' },
								_cdn.React.createElement(
									'a',
									{ href: 'javascript:', className: 'nav-link', onClick: _this.state.authenticate.login },
									item.name
								)
							);
						})
					)
				)
			)
		);
	}
});

},{"../../config.js":1,"../cdn":3,"../classes/Authenticate.js":4}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require('../cdn');

var _User = require('../classes/User.js');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = _cdn.ReactRouter.Link;
var browserHistory = _cdn.ReactRouter.browserHistory;

exports.default = _cdn.React.createClass({
	displayName: 'nav',

	getInitialState: function getInitialState() {
		return {
			nav: [{
				name: "Dashboard",
				link: "dash",
				icon: "fa-bar-chart"
			}, {
				name: "Account",
				link: "account",
				icon: "fa-user-o"
			}, {
				name: "Support",
				link: "support",
				icon: "fa-comment-o"
			}, {
				name: "Documentation",
				link: "docs",
				icon: "fa-book"
			}, {
				name: "Logout",
				link: "logout",
				icon: "fa-sign-out"
			}]
		};
	},
	logout: function logout() {
		_User2.default.deleteAuthorization();
		browserHistory.push("login");
	},
	render: function render() {
		var _this = this;

		var frag = window.location.hash.split("?")[0];
		return _cdn.React.createElement(
			'div',
			{ id: 'nav' },
			this.state.nav.map(function (item, i) {
				if (item.name == "Logout") return _cdn.React.createElement(
					'div',
					{ key: i, className: 'linkBox' },
					_cdn.React.createElement(
						'a',
						{ href: 'javascript:', onClick: _this.props.user.logout },
						_cdn.React.createElement('i', { className: "fa fa-fw color-primary-muted " + item.icon }),
						_cdn.React.createElement(
							'span',
							null,
							'\xA0\xA0',
							item.name
						)
					)
				);else return _cdn.React.createElement(
					'div',
					{ key: i, className: 'linkBox' },
					_cdn.React.createElement(
						Link,
						{ to: item.link },
						_cdn.React.createElement('i', { className: "fa fa-fw color-black color-primary-muted " + item.icon }),
						_cdn.React.createElement(
							'span',
							null,
							'\xA0\xA0',
							item.name
						)
					)
				);
			})
		);
	}
});

},{"../cdn":3,"../classes/User.js":6}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require("../cdn");

exports.default = _cdn.React.createClass({
	displayName: "notifications",

	render: function render() {
		var _this = this;

		var notifications = this.props.notification.retrieve();
		var notificationView = _cdn.React.createElement("div", null);
		if (notifications.length > 0) {
			notificationView = _cdn.React.createElement(
				"div",
				{ id: "notifications" },
				notifications.map(function (notification, i) {
					if (notification.type == undefined) notification.type = "success";
					return _cdn.React.createElement(
						"div",
						{ className: "alert alert-" + notification.type, key: i, "data-nIndex": i },
						notification.message,
						_cdn.React.createElement(
							"span",
							{ className: "close", onClick: function onClick() {
									return _this.props.notification.remove(i);
								} },
							_cdn.React.createElement(
								"span",
								null,
								"\xD7"
							)
						)
					);
				})
			);
		}
		return notificationView;
	}
});

},{"../cdn":3}],12:[function(require,module,exports){
"use strict";

module.exports = {
    "link": {
        "phone": "+16038602854"
    },
    "transaction": {
        "date": "2016-11-11T20:07:12.868Z",
        "total": 50210,
        "items": [{
            "description": "Salad Mix, Tender Ruby Reds",
            "quantity": 8,
            "unitPrice": 803,
            "total": 6424
        }, {
            "description": "Beets, Baby Golden",
            "quantity": 5,
            "unitPrice": 974,
            "total": 4870
        }, {
            "description": "Carrots, Gold",
            "quantity": 2,
            "unitPrice": 494,
            "total": 988
        }, {
            "description": "Cabbage, Retailer Assigned",
            "quantity": 5,
            "unitPrice": 704,
            "total": 3520
        }, {
            "description": "Eggplant (Aubergine) Ret",
            "quantity": 5,
            "unitPrice": 772,
            "total": 3860
        }, {
            "description": "Carrots, Gold",
            "quantity": 5,
            "unitPrice": 383,
            "total": 1915
        }, {
            "description": "Brussels Sprouts, Stalk",
            "quantity": 3,
            "unitPrice": 151,
            "total": 453
        }, {
            "description": "Lettuce, Baby",
            "quantity": 6,
            "unitPrice": 226,
            "total": 1356
        }, {
            "description": "Squash, Australian Blue",
            "quantity": 8,
            "unitPrice": 175,
            "total": 1400
        }, {
            "description": "Greens, Polk Greens",
            "quantity": 10,
            "unitPrice": 276,
            "total": 2760
        }, {
            "description": "Lettuce, Travissio",
            "quantity": 9,
            "unitPrice": 443,
            "total": 3987
        }, {
            "description": "Creamy Hot Wheat",
            "quantity": 8,
            "unitPrice": 276,
            "total": 2208
        }, {
            "description": "Cauliflower, Purple",
            "quantity": 6,
            "unitPrice": 432,
            "total": 2592
        }, {
            "description": "Squash, Golden Delicious",
            "quantity": 1,
            "unitPrice": 556,
            "total": 556
        }, {
            "description": "Onions, Yellow",
            "quantity": 2,
            "unitPrice": 803,
            "total": 1606
        }, {
            "description": "Mushrooms, Oyster",
            "quantity": 3,
            "unitPrice": 873,
            "total": 2619
        }, {
            "description": "Cucumber, Lemon",
            "quantity": 2,
            "unitPrice": 106,
            "total": 212
        }, {
            "items": [{
                "description": "Subtotal",
                "total": 41326
            }, {
                "description": "MA State Tax @ 6.25%",
                "total": 2686
            }, {
                "description": "Gratuity",
                "total": 6198
            }, {
                "description": "Grand Total",
                "total": 50210
            }]
        }],
        "contact": [{
            "type": "facebook",
            "description": "Facebook",
            "value": "https://wwww.facebook.com/BJ'sWholesaleClub"
        }, {
            "type": "twitter",
            "description": "Twitter",
            "value": "https://www.twitter.com/BJ'sWholesaleClub"
        }, {
            "type": "instagram",
            "description": "Instagram",
            "value": "https://www.instagram.com/BJ'sWholesaleClub"
        }, {
            "type": "googlePlus",
            "description": "Google Plus",
            "value": "https://plus.google.com/BJ'sWholesaleClub"
        }, {
            "type": "twitter",
            "description": "Twitter",
            "value": "https://www.twitter.com/BJ'sWholesaleClub"
        }, {
            "type": "pinterest",
            "description": "Pinterest",
            "value": "https://www.pinterest.com/BJ'sWholesaleClub"
        }, {
            "type": "web",
            "description": "Website",
            "value": "https://www.BJ'sWholesaleClub.com/"
        }, {
            "type": "email",
            "description": "Email",
            "value": "BJ'sWholesaleClub@flectino.com"
        }, {
            "type": "phone",
            "description": "Corporate Phone",
            "value": "+13184496387"
        }, {
            "type": "phone",
            "description": "Store Phone",
            "value": "+11773634657"
        }],
        "agentToken": "OEIVkvRsufftm_4yXyUH",
        "address": {
            "line1": "256 Mcferren St",
            "city": "Livezey",
            "state": "RI",
            "postalCode": 13400
        }
    }
};

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require('../cdn');

var _Key = require('../classes/Key');

var _Key2 = _interopRequireDefault(_Key);

var _User = require('../classes/User');

var _User2 = _interopRequireDefault(_User);

var _Authenticate = require('../classes/Authenticate');

var _Authenticate2 = _interopRequireDefault(_Authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _cdn.React.createClass({
	displayName: 'account',

	getInitialState: function getInitialState() {
		return {
			key: {
				token: "",
				name: ""
			},
			showKey: false,
			profile: _User2.default.getProfile(),
			secureProfile: {},
			connection: "",
			authenticate: {}
		};
	},
	componentDidMount: function componentDidMount() {
		var _this = this;

		_User2.default.getFullProfile().then(function (secureProfile) {
			_this.setState({
				secureProfile: secureProfile,
				key: secureProfile.keys[0],
				name: secureProfile.keys[0].name,
				connection: secureProfile.identities[0].connection
			});
		});
		var authenticate = new _Authenticate2.default({
			initialScreen: "forgotPassword",
			allowLogin: false
		});
		this.setState({ authenticate: authenticate });
	},
	changePassword: function changePassword() {
		this.state.authenticate.login();
	},
	saveChanges: function saveChanges() {
		_Key2.default.update({
			name: this.state.name
		}, this.props.user);
	},
	render: function render() {
		var _this2 = this;

		return _cdn.React.createElement(
			'div',
			{ id: 'account' },
			_cdn.React.createElement(
				'div',
				{ className: 'page-header' },
				'Account'
			),
			_cdn.React.createElement(
				'div',
				{ className: 'col-xs-12 infoBox' },
				_cdn.React.createElement(
					'div',
					{ className: 'row' },
					_cdn.React.createElement(
						'div',
						{ className: 'col-xs-6' },
						_cdn.React.createElement(
							'h5',
							null,
							'Email'
						),
						_cdn.React.createElement(
							'span',
							null,
							this.state.profile.email
						)
					),
					_cdn.React.createElement(
						'div',
						{ className: 'col-xs-6' },
						_cdn.React.createElement(
							'h5',
							null,
							'Subscription'
						),
						_cdn.React.createElement(
							'span',
							null,
							'Free Unlimited'
						)
					)
				),
				_cdn.React.createElement(
					'div',
					{ className: 'row margin-top-35' },
					_cdn.React.createElement(
						'div',
						{ className: 'col-xs-6' },
						_cdn.React.createElement(
							'h5',
							null,
							'User ID'
						),
						_cdn.React.createElement(
							'span',
							null,
							this.state.profile.user_id
						)
					),
					_cdn.React.createElement(
						'div',
						{ className: 'col-xs-6' },
						_cdn.React.createElement(
							'h5',
							null,
							'Password'
						),
						_cdn.React.createElement(
							'div',
							{ className: 'col-xs-6 padding-left-0' },
							_cdn.React.createElement(
								'a',
								{ href: 'javascript:', onClick: this.changePassword },
								'Change Password'
							)
						)
					)
				)
			),
			_cdn.React.createElement(
				'div',
				{ className: 'col-xs-12 settingsBox' },
				_cdn.React.createElement(
					'div',
					{ className: 'row keyBox' },
					_cdn.React.createElement(
						'div',
						{ className: 'col-xs-6' },
						_cdn.React.createElement(
							'h5',
							null,
							'Api Key\xA0\xA0',
							_cdn.React.createElement(
								'a',
								{ href: 'javascript:', className: 'font-size-12', onClick: function onClick() {
										return _this2.setState({ showKey: !_this2.state.showKey });
									} },
								this.state.showKey ? _cdn.React.createElement(
									'span',
									null,
									'Hide'
								) : _cdn.React.createElement(
									'span',
									null,
									'Show'
								)
							)
						),
						this.state.showKey ? _cdn.React.createElement('input', { id: 'keyBox', type: 'text', className: 'form-control', value: this.state.key.token, readOnly: true }) : _cdn.React.createElement('input', { id: 'keyBox', type: 'password', className: 'form-control', value: this.state.key.token, readOnly: true })
					)
				),
				_cdn.React.createElement(
					'div',
					{ className: 'row' },
					_cdn.React.createElement(
						'div',
						{ className: 'col-xs-6 margin-top-35' },
						_cdn.React.createElement(
							'h5',
							null,
							'Business Name'
						),
						_cdn.React.createElement(
							'div',
							{ className: 'col-xs-6 padding-left-0' },
							_cdn.React.createElement('input', { id: 'name', type: 'text', className: 'form-control col-xs-6', onChange: function onChange(e) {
									_this2.setState({ name: e.target.value });
								}, value: this.state.name })
						)
					)
				),
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-6 offset-xs-6 margin-top-25' },
					_cdn.React.createElement(
						'button',
						{ type: 'button', className: 'btn btn-warning margin-left-45', onClick: this.saveChanges },
						'Save'
					)
				)
			)
		);
	}
});

},{"../cdn":3,"../classes/Authenticate":4,"../classes/Key":5,"../classes/User":6}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require('../cdn');

var _Footer = require('../components/Footer.js');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _cdn.React.createClass({
	displayName: 'auth',


	render: function render() {
		return _cdn.React.createElement(
			'div',
			{ id: 'auth' },
			_cdn.React.createElement(
				'div',
				{ className: 'page-header' },
				'Authenticate'
			)
		);
	}
});

},{"../cdn":3,"../components/Footer.js":8}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require('../cdn');

var _Footer = require('../components/Footer.js');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _cdn.React.createClass({
	displayName: 'dash',


	render: function render() {
		return _cdn.React.createElement(
			'div',
			{ id: 'dash' },
			_cdn.React.createElement(
				'div',
				{ className: 'page-header' },
				'Dashboard'
			)
		);
	}
});

},{"../cdn":3,"../components/Footer.js":8}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require('../cdn');

var _User = require('../classes/User');

var _User2 = _interopRequireDefault(_User);

var _transactionSample = require('../data/transactionSample');

var _transactionSample2 = _interopRequireDefault(_transactionSample);

var _config = require('../../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _cdn.React.createClass({
	displayName: 'docs',

	getInitialState: function getInitialState() {
		return {};
	},
	sendReceipt: function sendReceipt() {
		this.props.user.getBasicToken().then(function (token) {
			var _this = this;

			$.ajax({
				url: _config2.default.apiHost + "/v1/transaction",
				type: "post",
				headers: {
					Authorization: token
				},
				data: _transactionSample2.default
			}).then(function (stuff) {
				console.log(stuff);
			}).catch(function (err) {
				console.log(err);
				_this.props.notification.create({ message: "There was an error getting your keys.", type: "danger" });
			});
		});
	},

	render: function render() {
		return _cdn.React.createElement(
			'div',
			{ id: 'docs' },
			_cdn.React.createElement(
				'div',
				{ className: 'page-header' },
				'Documentation'
			),
			_cdn.React.createElement(
				'button',
				{ onClick: this.sendReceipt },
				'Send Sample Receipt'
			)
		);
	}
});

},{"../../config.js":1,"../cdn":3,"../classes/User":6,"../data/transactionSample":12}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require('../cdn');

var _Footer = require('../components/Footer.js');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _cdn.React.createClass({
	displayName: 'support',


	render: function render() {
		return _cdn.React.createElement(
			'div',
			{ id: 'support' },
			_cdn.React.createElement(
				'div',
				{ className: 'page-header' },
				'Support'
			)
		);
	}
});

},{"../cdn":3,"../components/Footer.js":8}],18:[function(require,module,exports){
'use strict';

var _cdn = require('./cdn');

var _Authenticate = require('./classes/Authenticate');

var _Authenticate2 = _interopRequireDefault(_Authenticate);

var _app = require('./app.js');

var _app2 = _interopRequireDefault(_app);

var _auth = require('./views/auth');

var _auth2 = _interopRequireDefault(_auth);

var _dash = require('./views/dash');

var _dash2 = _interopRequireDefault(_dash);

var _account = require('./views/account');

var _account2 = _interopRequireDefault(_account);

var _docs = require('./views/docs');

var _docs2 = _interopRequireDefault(_docs);

var _support = require('./views/support');

var _support2 = _interopRequireDefault(_support);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _User = require('./classes/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _cdn.ReactRouter.Router;
var Route = _cdn.ReactRouter.Route;
var browserHistory = _cdn.ReactRouter.browserHistory;

// validate authentication for private routes
var requireAuth = function requireAuth(nextState, replace) {
	if (!_Authenticate2.default.isLoggedIn()) {
		browserHistory.push("dash");
	} else {
		return true;
	}
};

_cdn.ReactDOM.render(React.createElement(
	Router,
	{ history: browserHistory },
	React.createElement(
		Route,
		{ component: _app2.default },
		React.createElement(Route, { path: 'auth', component: _auth2.default }),
		React.createElement(Route, { path: 'docs', component: _docs2.default }),
		React.createElement(Route, { path: 'dash', component: _dash2.default, onEnter: requireAuth }),
		React.createElement(Route, { path: 'account', component: _account2.default, onEnter: requireAuth }),
		React.createElement(Route, { path: 'support', component: _support2.default })
	)
), document.getElementById('app'));

},{"../config":1,"./app.js":2,"./cdn":3,"./classes/Authenticate":4,"./classes/User":6,"./views/account":13,"./views/auth":14,"./views/dash":15,"./views/docs":16,"./views/support":17}]},{},[18])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcY2RuLmpzIiwic3JjXFxjbGFzc2VzXFxBdXRoZW50aWNhdGUuanMiLCJzcmNcXGNsYXNzZXNcXEtleS5qcyIsInNyY1xcY2xhc3Nlc1xcVXNlci5qcyIsInNyY1xcY2xhc3Nlc1xcVXRpbGl0aWVzLmpzIiwic3JjXFxjb21wb25lbnRzXFxGb290ZXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXGhlYWRlci5qcyIsInNyY1xcY29tcG9uZW50c1xcbmF2LmpzIiwic3JjXFxjb21wb25lbnRzXFxub3RpZmljYXRpb25zLmpzIiwic3JjXFxkYXRhXFx0cmFuc2FjdGlvblNhbXBsZS5qcyIsInNyY1xcdmlld3NcXGFjY291bnQuanMiLCJzcmNcXHZpZXdzXFxhdXRoLmpzIiwic3JjXFx2aWV3c1xcZGFzaC5qcyIsInNyY1xcdmlld3NcXGRvY3MuanMiLCJzcmNcXHZpZXdzXFxzdXBwb3J0LmpzIiwic3JjXFx3ZWIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNDQSxJQUFJLGNBQWMsYUFBbEI7O2tCQUVlO0FBQ2QsY0FBYSxXQURDO0FBRWQsVUFBVSxZQUFVO0FBQ25CLE1BQUcsZUFBZSxZQUFsQixFQUFnQyxPQUFPLDZCQUFQLENBQWhDLEtBQ0ssT0FBTyx1QkFBUDtBQUNMLEVBSFMsRUFGSTtBQU1kLFVBQVUsWUFBVTtBQUNuQixNQUFHLGVBQWUsWUFBbEIsRUFBZ0MsT0FBTyw2QkFBUCxDQUFoQyxLQUNLLE9BQU8sdUJBQVA7QUFDTCxFQUhTLEVBTkk7QUFVZCxhQUFZLDZCQVZFO0FBV2QsUUFBTTtBQUNMLFlBQVUsa0NBREw7QUFFTCxVQUFRO0FBRkg7QUFYUSxDOzs7Ozs7Ozs7QUNIZjs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLGlCQUFpQixp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QTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLFNBQVMsaUJBQVksTUFBekI7QUFDQSxJQUFJLFFBQVEsaUJBQVksS0FBeEI7QUFDQSxJQUFJLGlCQUFpQixpQkFBWSxjQUFqQzs7QUFFQTtBQUNBLElBQU0sY0FBYyxTQUFkLFdBQWMsQ0FBQyxTQUFELEVBQVksT0FBWixFQUF3QjtBQUMzQyxLQUFJLENBQUMsdUJBQWEsVUFBYixFQUFMLEVBQWdDO0FBQy9CLGlCQUFlLElBQWYsQ0FBb0IsTUFBcEI7QUFDQSxFQUZELE1BRU87QUFDTixTQUFPLElBQVA7QUFDQTtBQUNELENBTkQ7O0FBU0EsY0FBUyxNQUFULENBQ0M7QUFBQyxPQUFEO0FBQUEsR0FBUSxTQUFTLGNBQWpCO0FBQ0M7QUFBQyxPQUFEO0FBQUEsSUFBTyx3QkFBUDtBQUNDLHNCQUFDLEtBQUQsSUFBTyxNQUFLLE1BQVosRUFBbUIseUJBQW5CLEdBREQ7QUFFQyxzQkFBQyxLQUFELElBQU8sTUFBSyxNQUFaLEVBQW1CLHlCQUFuQixHQUZEO0FBR0Msc0JBQUMsS0FBRCxJQUFPLE1BQUssTUFBWixFQUFtQix5QkFBbkIsRUFBb0MsU0FBUyxXQUE3QyxHQUhEO0FBSUMsc0JBQUMsS0FBRCxJQUFPLE1BQUssU0FBWixFQUFzQiw0QkFBdEIsRUFBMEMsU0FBUyxXQUFuRCxHQUpEO0FBS0Msc0JBQUMsS0FBRCxJQUFPLE1BQUssU0FBWixFQUFzQiw0QkFBdEI7QUFMRDtBQURELENBREQsRUFVRyxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FWSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxudmFyIGVudmlyb25tZW50ID0gXCJkZXZlbG9wbWVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGVudmlyb25tZW50OiBlbnZpcm9ubWVudCxcclxuXHRhcGlIb3N0OiAoZnVuY3Rpb24oKXtcclxuXHRcdGlmKGVudmlyb25tZW50ID09IFwicHJvZHVjdGlvblwiKSByZXR1cm4gXCJodHRwOi8vYXBpdGVzdC5mbGVjdGluby5jb21cIjtcclxuXHRcdGVsc2UgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDozMDEwXCI7XHJcblx0fSgpKSxcclxuXHR3ZWJIb3N0OiAoZnVuY3Rpb24oKXtcclxuXHRcdGlmKGVudmlyb25tZW50ID09IFwicHJvZHVjdGlvblwiKSByZXR1cm4gXCJodHRwOi8vd2VidGVzdC5mbGVjdGluby5jb21cIjtcclxuXHRcdGVsc2UgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcblx0fSgpKSxcclxuXHRnYXRld2F5S2V5OiBcIkFVQjVqQ2tkcTNiN2tWOURUVGRpUWxsT1J2NVwiLFxyXG5cdGF1dGgwOntcclxuXHRcdGNsaWVudElkOiBcIjBTTTBnckJUb0NKaldHVWJCdGxadUhoeWxDcTJkVnQzXCIsXHJcblx0XHRkb21haW46IFwiZmxlY3Rpbm8uYXV0aDAuY29tXCJcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVhY3QsIFJlYWN0Um91dGVyfSBmcm9tICcuL2NkbidcclxuaW1wb3J0IEhlYWRlciBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyLmpzJ1xyXG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuL2NvbXBvbmVudHMvbm90aWZpY2F0aW9ucy5qcydcclxuaW1wb3J0IE5hdiBmcm9tICcuL2NvbXBvbmVudHMvbmF2J1xyXG5pbXBvcnQgeyBnZXRRdWVyeVZhcmlhYmxlIH0gZnJvbSAnLi9jbGFzc2VzL1V0aWxpdGllcydcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi9jbGFzc2VzL1VzZXIuanMnXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnLmpzJ1xyXG5cclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybntcclxuXHRcdFx0bm90aWZpY2F0aW9uczpbXVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y3JlYXRlTm90aWZpY2F0aW9uOiBmdW5jdGlvbihub3RpZmljYXRpb24pe1xyXG5cdFx0dmFyIG5vdGlmaWNhdGlvbnMgPSB0aGlzLnN0YXRlLm5vdGlmaWNhdGlvbnM7XHJcblx0XHRub3RpZmljYXRpb25zLnB1c2gobm90aWZpY2F0aW9uKTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbnM6bm90aWZpY2F0aW9uc30pO1xyXG5cclxuXHRcdHJldHVybjtcclxuXHR9LFxyXG5cdHJlbW92ZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obkluZGV4KXtcclxuXHRcdHZhciBub3RpZmljYXRpb25zID0gdGhpcy5zdGF0ZS5ub3RpZmljYXRpb25zO1xyXG5cdFx0bm90aWZpY2F0aW9ucy5zcGxpY2UobkluZGV4LDEpO1xyXG5cdFx0cmV0dXJuIHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbnM6bm90aWZpY2F0aW9uc30pO1xyXG5cdH0sXHJcblx0cmV0cmlldmVOb3RpZmljYXRpb25zOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUubm90aWZpY2F0aW9ucztcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6ZnVuY3Rpb24obmV4dFByb3BzKXtcclxuXHRcdC8vIFJlbW92ZSBub3RpZmljYXRpb25zIHdoZW4gdmlldyBjaGFuZ2VzXHJcblx0XHRpZih0aGlzLnByb3BzLmxvY2F0aW9uLnBhdGhuYW1lICE9IG5leHRQcm9wcy5sb2NhdGlvbi5wYXRobmFtZSl7XHJcblx0XHRcdHZhciBub3RpZmljYXRpb25zID0gW107XHJcblx0XHRcdGlmICh0eXBlb2YgbmV4dFByb3BzLmxvY2F0aW9uLnF1ZXJ5Lm1lc3NhZ2UgIT0gXCJ1bmRlZmluZWRcIikgbm90aWZpY2F0aW9ucy5wdXNoKHttZXNzYWdlOm5leHRQcm9wcy5sb2NhdGlvbi5xdWVyeS5tZXNzYWdlfSk7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbnM6bm90aWZpY2F0aW9uc30pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0dmFyIG5vdGlmaWNhdGlvbnMgPSB0aGlzLnN0YXRlLm5vdGlmaWNhdGlvbnM7XHJcblx0XHRpZiAodHlwZW9mIGdldFF1ZXJ5VmFyaWFibGUoXCJtZXNzYWdlXCIpICE9IFwidW5kZWZpbmVkXCIpIG5vdGlmaWNhdGlvbnMucHVzaCh7bWVzc2FnZTpnZXRRdWVyeVZhcmlhYmxlKFwibWVzc2FnZVwiKS5zcGxpdChcIitcIikuam9pbihcIiBcIil9KTtcclxuXHJcblx0XHRyZXR1cm47XHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0dmFyIHZpZXcgPSB0aGlzLnByb3BzLnJvdXRlc1sxXTtcclxuXHRcdHZhciBwYXNzID0ge1xyXG5cdFx0XHRub3RpZmljYXRpb246e1xyXG5cdFx0XHRcdGNyZWF0ZTogdGhpcy5jcmVhdGVOb3RpZmljYXRpb24sXHJcblx0XHRcdFx0cmVtb3ZlOiB0aGlzLnJlbW92ZU5vdGlmaWNhdGlvbixcclxuXHRcdFx0XHRyZXRyaWV2ZTogdGhpcy5yZXRyaWV2ZU5vdGlmaWNhdGlvbnNcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuICAgICAgICAgPGRpdj5cclxuXHRcdFx0XHQ8Tm90aWZpY2F0aW9ucyBub3RpZmljYXRpb249e3Bhc3Mubm90aWZpY2F0aW9ufS8+XHJcbiAgICAgICAgICAgIDxIZWFkZXIgbm90aWZpY2F0aW9uPXtwYXNzLm5vdGlmaWNhdGlvbn0vPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZS1ib2R5XCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBmaXgtd2lkdGhcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgdmlld1wiPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyXCI+XHJcblx0XHRcdFx0XHRcdFx0XHR7UmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2hpbGRyZW4sIHBhc3MpfVxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG4gICAgICAgICA8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuIiwiXHJcbnZhciAkID0gd2luZG93LiQ7XHJcbnZhciBqUXVlcnkgPSAkO1xyXG52YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3Q7XHJcbnZhciBSZWFjdERPTSA9IHdpbmRvdy5SZWFjdERPTTtcclxudmFyIFJlYWN0Um91dGVyID0gd2luZG93LlJlYWN0Um91dGVyO1xyXG52YXIgQXV0aDBMb2NrID0gd2luZG93LkF1dGgwTG9jaztcclxudmFyIExvZGFzaCA9IHdpbmRvdy5fO1xyXG5leHBvcnQgeyAkLCBqUXVlcnksIFJlYWN0LCBSZWFjdERPTSwgUmVhY3RSb3V0ZXIsIEF1dGgwTG9jaywgTG9kYXNoIH1cclxuIiwiaW1wb3J0IHsgQXV0aDBMb2NrLCBSZWFjdFJvdXRlciB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi9Vc2VyJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZydcclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRoZW50aWNhdGV7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnM9e30pIHtcclxuXHJcblx0XHR2YXIgbG9ja1NldHRpbmdzID0ge1xyXG5cdFx0XHRhbGxvd2VkQ29ubmVjdGlvbnM6IFsnZmxlY3Rpbm8tZGV2JywgJ2dpdGh1YicsICdnb29nbGUtb2F1dGgyJ10sXHJcblx0XHRcdHNvY2lhbEJ1dHRvblN0eWxlOiAnc21hbGwnLFxyXG5cdFx0XHRsYW5ndWFnZURpY3Rpb25hcnk6IHtcclxuXHRcdFx0XHR0aXRsZTogXCJIaVwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHRoZW1lOntcclxuXHRcdFx0XHRsb2dvOiAnaHR0cDovL2ltZzA2LmRldmlhbnRhcnQubmV0L2NlODYvaS8yMDEzLzAyNy8xLzUvYmF0bWFuX2xvZ29fb25seV9ieV9kZWF0aG9uYWJ1bi1kNXN3ZjJ1LnBuZycsXHJcblx0XHRcdFx0cHJpbWFyeUNvbG9yOiAnIzMxMzI0RidcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5pbml0aWFsU2NyZWVuICE9XCJ1bmRlZmluZWRcIikgbG9ja1NldHRpbmdzLmluaXRpYWxTY3JlZW4gPSBvcHRpb25zLmluaXRpYWxTY3JlZW47XHJcblx0XHRpZiAodHlwZW9mIG9wdGlvbnMuYWxsb3dMb2dpbiAhPVwidW5kZWZpbmVkXCIpIGxvY2tTZXR0aW5ncy5hbGxvd0xvZ2luID0gb3B0aW9ucy5hbGxvd0xvZ2luO1xyXG5cdFx0Ly8gQ29uZmlndXJlIEF1dGgwXHJcblx0XHR0aGlzLmxvY2sgPSBuZXcgQXV0aDBMb2NrKGNvbmZpZy5hdXRoMC5jbGllbnRJZCwgY29uZmlnLmF1dGgwLmRvbWFpbiwgbG9ja1NldHRpbmdzKTtcclxuXHRcdC8vIEFkZCBjYWxsYmFjayBmb3IgbG9jayBgYXV0aGVudGljYXRlZGAgZXZlbnRcclxuXHRcdHRoaXMubG9jay5vbignYXV0aGVudGljYXRlZCcsIHRoaXMub25BdXRoZW50aWNhdGlvbi5iaW5kKHRoaXMpKVxyXG5cdFx0Ly8gYmluZHMgbG9naW4gZnVuY3Rpb25zIHRvIGtlZXAgdGhpcyBjb250ZXh0XHJcblx0XHR0aGlzLmxvZ2luID0gdGhpcy5sb2dpbi5iaW5kKHRoaXMpXHJcblx0fVxyXG5cclxuXHRvbkF1dGhlbnRpY2F0aW9uKGF1dGhSZXN1bHQpe1xyXG5cdCAgIC8vIFNhdmVzIHRoZSB1c2VyIHRva2VuXHJcblx0XHR0aGlzLnNldFRva2VuKGF1dGhSZXN1bHQuaWRUb2tlbik7XHJcblx0XHR0aGlzLmxvY2suZ2V0UHJvZmlsZShhdXRoUmVzdWx0LmlkVG9rZW4sIChlcnJvciwgcHJvZmlsZSkgPT4ge1xyXG5cdFx0XHRpZiAoZXJyb3IpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnRXJyb3IgbG9hZGluZyB0aGUgUHJvZmlsZScsIGVycm9yKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2V0UHJvZmlsZShwcm9maWxlKTtcclxuXHRcdFx0XHRicm93c2VySGlzdG9yeS5wdXNoKFwiZGFzaFwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHNldFByb2ZpbGUocHJvZmlsZSl7XHJcblx0XHQvLyBTYXZlcyBwcm9maWxlIGRhdGEgdG8gbG9jYWxTdG9yYWdlXHJcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvZmlsZScsIEpTT04uc3RyaW5naWZ5KHByb2ZpbGUpKVxyXG5cdH1cclxuXHJcblx0bG9naW4oKSB7XHJcblx0XHQvLyBDYWxsIHRoZSBzaG93IG1ldGhvZCB0byBkaXNwbGF5IHRoZSB3aWRnZXQuXHJcblx0XHR0aGlzLmxvY2suc2hvdygpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgaXNMb2dnZWRJbigpe1xyXG5cdFx0Ly8gQ2hlY2tzIGlmIHRoZXJlIGlzIGEgc2F2ZWQgdG9rZW4gYW5kIGl0J3Mgc3RpbGwgdmFsaWRcclxuXHRcdHJldHVybiAhIVVzZXIuZ2V0VG9rZW4oKVxyXG5cdH1cclxuXHJcblx0c2V0VG9rZW4oaWRUb2tlbil7XHJcblx0XHQvLyBTYXZlcyB1c2VyIHRva2VuIHRvIGxvY2FsU3RvcmFnZVxyXG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgaWRUb2tlbik7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgbG9nb3V0KCl7XHJcblx0XHRjb25zb2xlLmxvZygxKTtcclxuXHRcdC8vIENsZWFyIHVzZXIgdG9rZW4gYW5kIHByb2ZpbGUgZGF0YSBmcm9tIGxvY2FsU3RvcmFnZVxyXG5cdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2lkX3Rva2VuJyk7XHJcblx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgncHJvZmlsZScpO1xyXG5cdFx0YnJvd3Nlckhpc3RvcnkucHVzaCgnYXV0aCcpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgQXV0aDBMb2NrLCBSZWFjdFJvdXRlciB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcuanMnXHJcbmltcG9ydCBVc2VyIGZyb20gJy4vVXNlcic7XHJcbnZhciBicm93c2VySGlzdG9yeSA9IFJlYWN0Um91dGVyLmJyb3dzZXJIaXN0b3J5O1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLZXkge1xyXG5cclxuXHRzdGF0aWMgdXBkYXRlKHBvc3REYXRhLCB1c2VyKXtcclxuXHRcdHJldHVybiBVc2VyLmdldEJhc2ljVG9rZW4oKS50aGVuKGZ1bmN0aW9uKGJhc2ljKXtcclxuXHRcdFx0cmV0dXJuICQuYWpheCh7XHJcblx0XHRcdFx0dXJsOiBjb25maWcuYXBpSG9zdCArIFwiL3YxL2tleVwiLFxyXG5cdFx0XHRcdHR5cGU6IFwicG9zdFwiLFxyXG5cdFx0XHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0XHRcdEF1dGhvcml6YXRpb246IGJhc2ljLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZGF0YTpwb3N0RGF0YVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG4iLCJpbXBvcnQgeyBMb2Rhc2ggfSBmcm9tICcuLi9jZG4nXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnLmpzJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIHtcclxuXHJcblx0c3RhdGljIGdldFByb2ZpbGUoKXtcclxuXHRcdC8vIFJldHJpZXZlcyB0aGUgcHJvZmlsZSBkYXRhIGZyb20gbG9jYWxTdG9yYWdlXHJcblx0XHRjb25zdCBwcm9maWxlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2ZpbGUnKVxyXG5cdFx0cmV0dXJuIHByb2ZpbGUgPyBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5wcm9maWxlKSA6IHt9O1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldEZ1bGxQcm9maWxlKCl7XHJcblx0XHRyZXR1cm4gJC5hamF4KHtcclxuXHRcdFx0dXJsOiBjb25maWcuYXBpSG9zdCArIFwiL3VzZXJcIixcclxuXHRcdFx0dHlwZTogXCJnZXRcIixcclxuXHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdEF1dGhvcml6YXRpb246IFwiQmVhcmVyIFwiICsgVXNlci5nZXRUb2tlbigpXHJcblx0XHRcdH1cclxuXHRcdH0pLmNhdGNoKChlcnIpPT57XHJcblx0XHRcdGNvbnNvbGUubG9nKGVycik7XHJcblx0XHRcdGlmIChlcnIuc3RhdHVzID09IDQwMykgdGhpcy5sb2dvdXQoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldFRva2VuKCl7XHJcblx0XHQvLyBSZXRyaWV2ZXMgdGhlIHVzZXIgdG9rZW4gZnJvbSBsb2NhbFN0b3JhZ2VcclxuXHRcdHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRfdG9rZW4nKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXRCYXNpY1Rva2VuKCl7XHJcblx0XHRyZXR1cm4gVXNlci5nZXRGdWxsUHJvZmlsZSgpLnRoZW4oZnVuY3Rpb24ocHJvZmlsZSl7XHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoXCJCYXNpYyBcIiArIHdpbmRvdy5idG9hKHByb2ZpbGUudXNlcl9pZCArIFwiOlwiICsgcHJvZmlsZS5rZXlzWzBdLnRva2VuKSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShwb3N0RGF0YSl7XHJcblx0XHRyZXR1cm4gJC5hamF4KHtcclxuXHRcdFx0dXJsOiBjb25maWcuYXBpSG9zdCArIFwiL3VzZXJzL1wiICsgdGhpcy5nZXRQcm9maWxlKCkudXNlcl9pZCxcclxuXHRcdFx0dHlwZTogXCJwYXRjaFwiLFxyXG5cdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0QXV0aG9yaXphdGlvbjogXCJCZWFyZXIgXCIgKyB0aGlzLmdldFRva2VuKCksXHJcblx0XHRcdH0sXHJcblx0XHRcdGRhdGE6cG9zdERhdGFcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG4iLCJcclxuXHJcbnZhciBnZXRRdWVyeVZhcmlhYmxlID0gZnVuY3Rpb24odmFyaWFibGUpIHtcclxuXHR2YXIgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcclxuXHR2YXIgcHJlVmFycyA9IHF1ZXJ5LnNwbGl0KCcvJyk7XHJcblx0dmFyIHZhcnMgPSBwcmVWYXJzWzBdLnNwbGl0KCcmJyk7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoJz0nKTtcclxuXHRcdGlmIChkZWNvZGVVUklDb21wb25lbnQocGFpclswXSkgPT0gdmFyaWFibGUpIHtcclxuXHRcdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y29uc29sZS5sb2coJ1F1ZXJ5IHZhcmlhYmxlICVzIG5vdCBmb3VuZCcsIHZhcmlhYmxlKTtcclxufVxyXG5cclxudmFyIGlzVmFsaWQgPSB7XHJcblx0ZW1haWw6IGZ1bmN0aW9uKGVtYWlsKSB7XHJcblx0XHR2YXIgcmUgPSAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcclxuXHRcdHJldHVybiByZS50ZXN0KGVtYWlsKTtcclxuXHR9LFxyXG5cdHBob25lOiBmdW5jdGlvbihwaG9uZSkge1xyXG5cdFx0dmFyIHN0cmlwUGhvbmUgPSBwaG9uZS5yZXBsYWNlKC9cXEQvZywnJyk7XHJcblx0XHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPj0gMTApIHJldHVybiB0cnVlO1xyXG5cdFx0ZWxzZSBmYWxzZTtcclxuXHR9XHJcbn1cclxuXHJcbnZhciBmb3JtYXRQaG9uZTEwID0gZnVuY3Rpb24ocGhvbmUpe1xyXG5cdHZhciBzdHJpcFBob25lID0gcGhvbmUucmVwbGFjZSgvXFxEL2csJycpO1xyXG5cdHZhciBkYXNoID0gXCJcIjtcclxuXHR2YXIgb3BlblBhcmVuID0gXCJcIjtcclxuXHR2YXIgY2xvc2VkUGFyZW4gPSBcIlwiO1xyXG5cdGlmIChzdHJpcFBob25lLmxlbmd0aCA+IDApIG9wZW5QYXJlbiA9IFwiKFwiO1xyXG5cdGlmIChzdHJpcFBob25lLmxlbmd0aCA+IDMpIGNsb3NlZFBhcmVuID0gXCIpXCI7XHJcblx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID4gNikgZGFzaCA9IFwiLVwiO1xyXG5cdHZhciBmb3JtYXR0ZWRQaG9uZSA9IG9wZW5QYXJlbiArIHN0cmlwUGhvbmUuc3Vic3RyaW5nKDAsMykgKyBjbG9zZWRQYXJlbiArIHN0cmlwUGhvbmUuc3Vic3RyaW5nKDMsNikgKyBkYXNoICsgc3RyaXBQaG9uZS5zdWJzdHJpbmcoNiwxMCk7XHJcblx0cmV0dXJuIGZvcm1hdHRlZFBob25lO1xyXG59XHJcblxyXG52YXIgZ2V0VGltZXpvbmVPZmZzZXQgPSBmdW5jdGlvbigpe1xyXG5cdGZ1bmN0aW9uIHBhZChudW1iZXIsIGxlbmd0aCl7XHJcblx0XHQgdmFyIHN0ciA9IFwiXCIgKyBudW1iZXJcclxuXHRcdCB3aGlsZSAoc3RyLmxlbmd0aCA8IGxlbmd0aCkge1xyXG5cdFx0XHQgIHN0ciA9ICcwJytzdHJcclxuXHRcdCB9XHJcblx0XHQgcmV0dXJuIHN0clxyXG5cdH1cclxuXHR2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0dmFyIG9mZnNldCA9IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcclxuXHRyZXR1cm4gKChvZmZzZXQ8MD8gJysnOictJykgKyBwYWQocGFyc2VJbnQoTWF0aC5hYnMob2Zmc2V0LzYwKSksIDIpKyBwYWQoTWF0aC5hYnMob2Zmc2V0JTYwKSwgMikpO1xyXG59XHJcblxyXG52YXIgY3JlYXRlVGltZURhdGUgPSBmdW5jdGlvbihkYXRlLCB0aW1lKXtcclxuXHR2YXIgbWlsZXN0b25lRGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG5cdHZhciBzdHJTcGxpdCA9IHRpbWUuc3BsaXQoJzonKTtcclxuXHR2YXIgaG91ciA9IHBhcnNlSW50KHN0clNwbGl0WzBdKTtcclxuXHR2YXIgbWludXRlID0gcGFyc2VJbnQoc3RyU3BsaXRbMV0uc3Vic3RyaW5nKDAsMikpO1xyXG5cdHZhciBzZXQgPSBzdHJTcGxpdFsxXS5zdWJzdHJpbmcoMiw0KTtcclxuXHRpZiAoaG91ciA9PT0gMTIpIHtcclxuXHRcdGlmIChzZXQgPT09IFwiYW1cIikgaG91ciA9IDA7XHJcblx0XHRlbHNlIGhvdXIgPSAxMjtcclxuXHR9IGVsc2UgaWYgKHNldCA9PT0gXCJwbVwiKSBob3VyICs9IDEyO1xyXG5cdG1pbGVzdG9uZURhdGUuc2V0SG91cnMoaG91cik7XHJcblx0bWlsZXN0b25lRGF0ZS5zZXRNaW51dGVzKG1pbnV0ZSk7XHJcblx0bWlsZXN0b25lRGF0ZS5zZXRNaW51dGVzKG1pbGVzdG9uZURhdGUuZ2V0TWludXRlcygpIC0gIG1pbGVzdG9uZURhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSk7XHJcblx0cmV0dXJuIG1pbGVzdG9uZURhdGUudG9JU09TdHJpbmcoKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IGdldFF1ZXJ5VmFyaWFibGUsIGlzVmFsaWQsIGZvcm1hdFBob25lMTAsIGdldFRpbWV6b25lT2Zmc2V0LCBjcmVhdGVUaW1lRGF0ZSB9XHJcbiIsImltcG9ydCB7IFJlYWN0LCBSZWFjdFJvdXRlciB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcuanMnXHJcbmltcG9ydCBVc2VyIGZyb20gJy4uL2NsYXNzZXMvVXNlci5qcydcclxuXHJcbnZhciBMaW5rID0gUmVhY3RSb3V0ZXIuTGluaztcclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPVwiZm9vdGVyXCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXJnaW4tYm90dG9tLTEwXCI+UmVzb3VyY2VzPC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXY+Rm9yIEN1c3RvbWVyczwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2PkZvciBSZXRhaWxlcnM8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdj5Gb3IgRGV2ZWxvcGVyczwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi1ib3R0b20tMTBcIj5IZWxwPC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdFx0ey8qIDxkaXYgY2xhc3NOYW1lPVwibWFyZ2luLWJvdHRvbS0xMFwiPlJlc291cmNlczwvZGl2PiAqL31cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXJnaW4tYm90dG9tLTEwXCI+QWJvdXQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi1ib3R0b20tMTBcIj5Db250YWN0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXY+Q2FsbDogKDg4OCk5MzAtMjkzODwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2PkVtYWlsOiBpbmZvQGhpLmNvbTwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuLi9jZG4nXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnLmpzJ1xyXG5pbXBvcnQgQXV0aGVudGljYXRlIGZyb20gJy4uL2NsYXNzZXMvQXV0aGVudGljYXRlLmpzJ1xyXG5cclxudmFyIExpbmsgPSBSZWFjdFJvdXRlci5MaW5rO1xyXG52YXIgYnJvd3Nlckhpc3RvcnkgPSBSZWFjdFJvdXRlci5icm93c2VySGlzdG9yeTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJue1xyXG5cdFx0XHRhdXRoZW50aWNhdGU6e30sXHJcblx0XHRcdG5hdjpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bmFtZTogXCJEYXNoYm9hcmRcIixcclxuXHRcdFx0XHRcdGxpbms6IFwiZGFzaFwiLFxyXG5cdFx0XHRcdFx0cHJpdmF0ZTogdHJ1ZVxyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0bmFtZTpcIkFjY291bnRcIixcclxuXHRcdFx0XHRcdGxpbms6XCJhY2NvdW50XCIsXHJcblx0XHRcdFx0XHRwcml2YXRlOiB0cnVlXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOiBcIlN1cHBvcnRcIixcclxuXHRcdFx0XHRcdGxpbms6IFwic3VwcG9ydFwiLFxyXG5cdFx0XHRcdFx0cHJpdmF0ZTogdHJ1ZVxyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0bmFtZTogXCJEb2N1bWVudGF0aW9uXCIsXHJcblx0XHRcdFx0XHRsaW5rOiBcImRvY3NcIixcclxuXHRcdFx0XHRcdHByaXZhdGU6IHRydWVcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiTG9nb3V0XCIsXHJcblx0XHRcdFx0XHRsaW5rOlwibG9nb3V0XCIsXHJcblx0XHRcdFx0XHRwcml2YXRlOiB0cnVlXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOiBcIkxvZ2luXCIsXHJcblx0XHRcdFx0XHRsaW5rOlwibG9naW5cIixcclxuXHRcdFx0XHRcdHByaXZhdGU6IGZhbHNlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHJcblx0XHR9XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcclxuXHRcdHZhciBhdXRoZW50aWNhdGUgPSBuZXcgQXV0aGVudGljYXRlKCk7XHJcblx0XHR0aGlzLnNldFN0YXRlKHthdXRoZW50aWNhdGU6YXV0aGVudGljYXRlfSlcclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImhlYWRlclwiPlxyXG5cdFx0XHRcdDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1maXhlZC10b3BcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGZpeC13aWR0aFwiPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiI1wiPkZsZWN0aW5vPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwibmF2IG5hdmJhci1uYXYgZmxvYXQteHMtcmlnaHRcIj5cclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnN0YXRlLm5hdi5tYXAoKGl0ZW0sIGkpPT57XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmKEF1dGhlbnRpY2F0ZS5pc0xvZ2dlZEluKCkgJiYgaXRlbS5wcml2YXRlKSByZXR1cm4oXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGxpIGtleT17aX0gY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KGl0ZW0ubmFtZSA9PSBcIkxvZ291dFwiKT9cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGEgaHJlZj1cImphdmFzY3JpcHQ6XCIgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiBvbkNsaWNrPXtBdXRoZW50aWNhdGUubG9nb3V0fT57aXRlbS5uYW1lfTwvYT46XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxMaW5rIHRvPXtpdGVtLmxpbmt9IGNsYXNzTmFtZT1cIm5hdi1saW5rXCI+e2l0ZW0ubmFtZX08L0xpbms+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZighQXV0aGVudGljYXRlLmlzTG9nZ2VkSW4oKSAmJiAhaXRlbS5wcml2YXRlKSByZXR1cm4oXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGxpIGtleT17aX0gY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgb25DbGljaz17dGhpcy5zdGF0ZS5hdXRoZW50aWNhdGUubG9naW59PntpdGVtLm5hbWV9PC9hPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQ8L3VsPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9uYXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuLi9jZG4nXHJcbmltcG9ydCBVc2VyIGZyb20gJy4uL2NsYXNzZXMvVXNlci5qcydcclxuXHJcbnZhciBMaW5rID0gUmVhY3RSb3V0ZXIuTGluaztcclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybntcclxuXHRcdFx0bmF2OltcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRuYW1lOiBcIkRhc2hib2FyZFwiLFxyXG5cdFx0XHRcdFx0bGluazogXCJkYXNoXCIsXHJcblx0XHRcdFx0XHRpY29uOiBcImZhLWJhci1jaGFydFwiXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOlwiQWNjb3VudFwiLFxyXG5cdFx0XHRcdFx0bGluazpcImFjY291bnRcIixcclxuXHRcdFx0XHRcdGljb246IFwiZmEtdXNlci1vXCJcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiU3VwcG9ydFwiLFxyXG5cdFx0XHRcdFx0bGluazogXCJzdXBwb3J0XCIsXHJcblx0XHRcdFx0XHRpY29uOiBcImZhLWNvbW1lbnQtb1wiXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOiBcIkRvY3VtZW50YXRpb25cIixcclxuXHRcdFx0XHRcdGxpbms6IFwiZG9jc1wiLFxyXG5cdFx0XHRcdFx0aWNvbjogXCJmYS1ib29rXCJcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiTG9nb3V0XCIsXHJcblx0XHRcdFx0XHRsaW5rOlwibG9nb3V0XCIsXHJcblx0XHRcdFx0XHRpY29uOiBcImZhLXNpZ24tb3V0XCJcclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGxvZ291dDogZnVuY3Rpb24oKXtcclxuXHRcdFVzZXIuZGVsZXRlQXV0aG9yaXphdGlvbigpO1xyXG5cdFx0YnJvd3Nlckhpc3RvcnkucHVzaChcImxvZ2luXCIpO1xyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHZhciBmcmFnID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3BsaXQoXCI/XCIpWzBdO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cIm5hdlwiPlxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRoaXMuc3RhdGUubmF2Lm1hcCgoaXRlbSwgaSk9PntcclxuXHRcdFx0XHRcdFx0aWYgKGl0ZW0ubmFtZSA9PSBcIkxvZ291dFwiKSByZXR1cm4oXHJcblx0XHRcdFx0XHRcdFx0PGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cImxpbmtCb3hcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIG9uQ2xpY2s9e3RoaXMucHJvcHMudXNlci5sb2dvdXR9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9e1wiZmEgZmEtZncgY29sb3ItcHJpbWFyeS1tdXRlZCBcIiArIGl0ZW0uaWNvbn0+PC9pPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj4mbmJzcDsmbmJzcDt7aXRlbS5uYW1lfTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdDwvYT5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0ZWxzZSByZXR1cm4oXHJcblx0XHRcdFx0XHRcdFx0PGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cImxpbmtCb3hcIj5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHQ8TGluayB0bz17aXRlbS5saW5rfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPXtcImZhIGZhLWZ3IGNvbG9yLWJsYWNrIGNvbG9yLXByaW1hcnktbXV0ZWQgXCIgKyBpdGVtLmljb259PjwvaT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4+Jm5ic3A7Jm5ic3A7e2l0ZW0ubmFtZX08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L0xpbms+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsImltcG9ydCB7IFJlYWN0IH0gZnJvbSAnLi4vY2RuJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblx0XHR2YXIgbm90aWZpY2F0aW9ucyA9IHRoaXMucHJvcHMubm90aWZpY2F0aW9uLnJldHJpZXZlKCk7XHJcblx0XHR2YXIgbm90aWZpY2F0aW9uVmlldyA9ICg8ZGl2PjwvZGl2Pik7XHJcblx0XHRpZiAobm90aWZpY2F0aW9ucy5sZW5ndGggPiAwKXtcclxuXHRcdFx0bm90aWZpY2F0aW9uVmlldyA9IChcclxuXHRcdFx0XHQ8ZGl2IGlkPVwibm90aWZpY2F0aW9uc1wiPlxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRub3RpZmljYXRpb25zLm1hcCgobm90aWZpY2F0aW9uLCBpKT0+e1xyXG5cdFx0XHRcdFx0XHRcdGlmIChub3RpZmljYXRpb24udHlwZSA9PSB1bmRlZmluZWQpIG5vdGlmaWNhdGlvbi50eXBlID0gXCJzdWNjZXNzXCI7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuKFxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e1wiYWxlcnQgYWxlcnQtXCIgKyBub3RpZmljYXRpb24udHlwZX0ga2V5PXtpfSBkYXRhLW5JbmRleD17aX0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdHtub3RpZmljYXRpb24ubWVzc2FnZX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2xvc2VcIiBvbkNsaWNrPXsgKCkgPT4gdGhpcy5wcm9wcy5ub3RpZmljYXRpb24ucmVtb3ZlKGkpIH0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4+JnRpbWVzOzwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG4gICAgXHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHRcdHJldHVybiBub3RpZmljYXRpb25WaWV3O1xyXG5cdH1cclxufSk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgXCJsaW5rXCI6e1xyXG4gICAgICAgIFwicGhvbmVcIjpcIisxNjAzODYwMjg1NFwiXHJcbiAgICB9LFxyXG4gICAgXCJ0cmFuc2FjdGlvblwiOntcclxuICAgICAgICBcImRhdGVcIjpcIjIwMTYtMTEtMTFUMjA6MDc6MTIuODY4WlwiLFxyXG4gICAgICAgIFwidG90YWxcIjo1MDIxMCxcclxuICAgICAgICBcIml0ZW1zXCI6W1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJTYWxhZCBNaXgsIFRlbmRlciBSdWJ5IFJlZHNcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjo4LFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjo4MDMsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6NjQyNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJCZWV0cywgQmFieSBHb2xkZW5cIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjo1LFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjo5NzQsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6NDg3MFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJDYXJyb3RzLCBHb2xkXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6MixcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6NDk0LFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjk4OFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJDYWJiYWdlLCBSZXRhaWxlciBBc3NpZ25lZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjUsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjcwNCxcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjozNTIwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkVnZ3BsYW50IChBdWJlcmdpbmUpIFJldFwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjUsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjc3MixcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjozODYwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkNhcnJvdHMsIEdvbGRcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjo1LFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjozODMsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6MTkxNVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJCcnVzc2VscyBTcHJvdXRzLCBTdGFsa1wiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjMsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjE1MSxcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjo0NTNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiTGV0dHVjZSwgQmFieVwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjYsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjIyNixcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjoxMzU2XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIlNxdWFzaCwgQXVzdHJhbGlhbiBCbHVlXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6OCxcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6MTc1LFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjE0MDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiR3JlZW5zLCBQb2xrIEdyZWVuc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjEwLFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjoyNzYsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6Mjc2MFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJMZXR0dWNlLCBUcmF2aXNzaW9cIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjo5LFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjo0NDMsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6Mzk4N1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJDcmVhbXkgSG90IFdoZWF0XCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6OCxcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6Mjc2LFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjIyMDhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiQ2F1bGlmbG93ZXIsIFB1cnBsZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjYsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjQzMixcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjoyNTkyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIlNxdWFzaCwgR29sZGVuIERlbGljaW91c1wiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjEsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjU1NixcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjo1NTZcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiT25pb25zLCBZZWxsb3dcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjoyLFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjo4MDMsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6MTYwNlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJNdXNocm9vbXMsIE95c3RlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjMsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjg3MyxcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjoyNjE5XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkN1Y3VtYmVyLCBMZW1vblwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjIsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjEwNixcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjoyMTJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJpdGVtc1wiOltcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIlN1YnRvdGFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxcIjo0MTMyNlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJNQSBTdGF0ZSBUYXggQCA2LjI1JVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsXCI6MjY4NlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJHcmF0dWl0eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsXCI6NjE5OFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJHcmFuZCBUb3RhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsXCI6NTAyMTBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiY29udGFjdFwiOltcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJmYWNlYm9va1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiRmFjZWJvb2tcIixcclxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImh0dHBzOi8vd3d3dy5mYWNlYm9vay5jb20vQkonc1dob2xlc2FsZUNsdWJcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjpcInR3aXR0ZXJcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIlR3aXR0ZXJcIixcclxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImh0dHBzOi8vd3d3LnR3aXR0ZXIuY29tL0JKJ3NXaG9sZXNhbGVDbHViXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJpbnN0YWdyYW1cIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkluc3RhZ3JhbVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiaHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9CSidzV2hvbGVzYWxlQ2x1YlwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiZ29vZ2xlUGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiR29vZ2xlIFBsdXNcIixcclxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImh0dHBzOi8vcGx1cy5nb29nbGUuY29tL0JKJ3NXaG9sZXNhbGVDbHViXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJ0d2l0dGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJUd2l0dGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJodHRwczovL3d3dy50d2l0dGVyLmNvbS9CSidzV2hvbGVzYWxlQ2x1YlwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOlwicGludGVyZXN0XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJQaW50ZXJlc3RcIixcclxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImh0dHBzOi8vd3d3LnBpbnRlcmVzdC5jb20vQkonc1dob2xlc2FsZUNsdWJcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjpcIndlYlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiV2Vic2l0ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiaHR0cHM6Ly93d3cuQkonc1dob2xlc2FsZUNsdWIuY29tL1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiZW1haWxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkVtYWlsXCIsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJCSidzV2hvbGVzYWxlQ2x1YkBmbGVjdGluby5jb21cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjpcInBob25lXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJDb3Jwb3JhdGUgUGhvbmVcIixcclxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcIisxMzE4NDQ5NjM4N1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOlwicGhvbmVcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIlN0b3JlIFBob25lXCIsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCIrMTE3NzM2MzQ2NTdcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImFnZW50VG9rZW5cIjpcIk9FSVZrdlJzdWZmdG1fNHlYeVVIXCIsXHJcbiAgICAgICAgXCJhZGRyZXNzXCI6e1xyXG4gICAgICAgICAgICBcImxpbmUxXCI6XCIyNTYgTWNmZXJyZW4gU3RcIixcclxuICAgICAgICAgICAgXCJjaXR5XCI6XCJMaXZlemV5XCIsXHJcbiAgICAgICAgICAgIFwic3RhdGVcIjpcIlJJXCIsXHJcbiAgICAgICAgICAgIFwicG9zdGFsQ29kZVwiOjEzNDAwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IFJlYWN0IH0gZnJvbSAnLi4vY2RuJ1xyXG5pbXBvcnQgS2V5IGZyb20gJy4uL2NsYXNzZXMvS2V5J1xyXG5pbXBvcnQgVXNlciBmcm9tICcuLi9jbGFzc2VzL1VzZXInXHJcbmltcG9ydCBBdXRoZW50aWNhdGUgZnJvbSAnLi4vY2xhc3Nlcy9BdXRoZW50aWNhdGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuXHQgICBcdHJldHVybiB7XHJcblx0XHRcdFx0a2V5OntcclxuXHRcdFx0XHRcdHRva2VuOlwiXCIsXHJcblx0XHRcdFx0XHRuYW1lOlwiXCJcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHNob3dLZXk6IGZhbHNlLFxyXG5cdFx0XHRcdHByb2ZpbGU6IFVzZXIuZ2V0UHJvZmlsZSgpLFxyXG5cdFx0XHRcdHNlY3VyZVByb2ZpbGU6IHt9LFxyXG5cdFx0XHRcdGNvbm5lY3Rpb246IFwiXCIsXHJcblx0XHRcdFx0YXV0aGVudGljYXRlOiB7fVxyXG5cdFx0IFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xyXG5cdFx0VXNlci5nZXRGdWxsUHJvZmlsZSgpLnRoZW4oKHNlY3VyZVByb2ZpbGUpPT57XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdHNlY3VyZVByb2ZpbGU6c2VjdXJlUHJvZmlsZSxcclxuXHRcdFx0XHRrZXk6c2VjdXJlUHJvZmlsZS5rZXlzWzBdLFxyXG5cdFx0XHRcdG5hbWU6c2VjdXJlUHJvZmlsZS5rZXlzWzBdLm5hbWUsXHJcblx0XHRcdFx0Y29ubmVjdGlvbjogc2VjdXJlUHJvZmlsZS5pZGVudGl0aWVzWzBdLmNvbm5lY3Rpb25cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHRcdHZhciBhdXRoZW50aWNhdGUgPSBuZXcgQXV0aGVudGljYXRlKHtcclxuXHRcdFx0aW5pdGlhbFNjcmVlbjogXCJmb3Jnb3RQYXNzd29yZFwiLFxyXG5cdFx0XHRhbGxvd0xvZ2luOiBmYWxzZVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnNldFN0YXRlKHthdXRoZW50aWNhdGU6YXV0aGVudGljYXRlfSk7XHJcblx0fSxcclxuXHRjaGFuZ2VQYXNzd29yZDogZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMuc3RhdGUuYXV0aGVudGljYXRlLmxvZ2luKCk7XHJcblx0fSxcclxuXHRzYXZlQ2hhbmdlczogZnVuY3Rpb24oKXtcclxuXHRcdEtleS51cGRhdGUoe1xyXG5cdFx0XHRuYW1lOiB0aGlzLnN0YXRlLm5hbWVcclxuXHRcdH0sIHRoaXMucHJvcHMudXNlcik7XHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImFjY291bnRcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtaGVhZGVyXCI+QWNjb3VudDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGluZm9Cb3hcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aDU+RW1haWw8L2g1PlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuPnt0aGlzLnN0YXRlLnByb2ZpbGUuZW1haWx9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG5cdFx0XHRcdFx0XHRcdDxoNT5TdWJzY3JpcHRpb248L2g1PlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuPkZyZWUgVW5saW1pdGVkPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgbWFyZ2luLXRvcC0zNVwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdFx0PGg1PlVzZXIgSUQ8L2g1PlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuPnt0aGlzLnN0YXRlLnByb2ZpbGUudXNlcl9pZH08L3NwYW4+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdFx0PGg1PlBhc3N3b3JkPC9oNT5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IHBhZGRpbmctbGVmdC0wXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiamF2YXNjcmlwdDpcIiBvbkNsaWNrPXt0aGlzLmNoYW5nZVBhc3N3b3JkfT5DaGFuZ2UgUGFzc3dvcmQ8L2E+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgc2V0dGluZ3NCb3hcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IGtleUJveFwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdFx0PGg1PkFwaSBLZXkmbmJzcDsmbmJzcDs8YSBocmVmPVwiamF2YXNjcmlwdDpcIiBjbGFzc05hbWU9XCJmb250LXNpemUtMTJcIiBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7c2hvd0tleTohdGhpcy5zdGF0ZS5zaG93S2V5fSl9PnsodGhpcy5zdGF0ZS5zaG93S2V5KT88c3Bhbj5IaWRlPC9zcGFuPjo8c3Bhbj5TaG93PC9zcGFuPn08L2E+PC9oNT5cclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHQodGhpcy5zdGF0ZS5zaG93S2V5KT9cclxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBpZD1cImtleUJveFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3RoaXMuc3RhdGUua2V5LnRva2VufSByZWFkT25seS8+OlxyXG5cdFx0XHRcdFx0XHRcdFx0PGlucHV0IGlkPVwia2V5Qm94XCIgdHlwZT1cInBhc3N3b3JkXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3RoaXMuc3RhdGUua2V5LnRva2VufSByZWFkT25seS8+XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBtYXJnaW4tdG9wLTM1XCI+XHJcblx0XHRcdFx0XHRcdFx0PGg1PkJ1c2luZXNzIE5hbWU8L2g1PlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgcGFkZGluZy1sZWZ0LTBcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBpZD1cIm5hbWVcIiB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBjb2wteHMtNlwiIG9uQ2hhbmdlPXsoZSk9Pnt0aGlzLnNldFN0YXRlKHtuYW1lOmUudGFyZ2V0LnZhbHVlfSl9fSB2YWx1ZT17dGhpcy5zdGF0ZS5uYW1lfS8+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IG9mZnNldC14cy02IG1hcmdpbi10b3AtMjVcIj5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi13YXJuaW5nIG1hcmdpbi1sZWZ0LTQ1XCIgb25DbGljaz17dGhpcy5zYXZlQ2hhbmdlc30+U2F2ZTwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL0Zvb3Rlci5qcydcclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImF1dGhcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtaGVhZGVyXCI+QXV0aGVudGljYXRlPC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL0Zvb3Rlci5qcydcclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImRhc2hcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtaGVhZGVyXCI+RGFzaGJvYXJkPC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi4vY2xhc3Nlcy9Vc2VyJ1xyXG5pbXBvcnQgc2FtcGxlIGZyb20gJy4uL2RhdGEvdHJhbnNhY3Rpb25TYW1wbGUnXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnLmpzJ1xyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgXHRyZXR1cm4ge307XHJcblx0fSxcclxuXHRzZW5kUmVjZWlwdDpmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5wcm9wcy51c2VyLmdldEJhc2ljVG9rZW4oKS50aGVuKGZ1bmN0aW9uKHRva2VuKXtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR1cmw6IGNvbmZpZy5hcGlIb3N0ICsgXCIvdjEvdHJhbnNhY3Rpb25cIixcclxuXHRcdFx0XHR0eXBlOiBcInBvc3RcIixcclxuXHRcdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XHRBdXRob3JpemF0aW9uOiB0b2tlblxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZGF0YTogc2FtcGxlXHJcblx0XHRcdH0pLnRoZW4oZnVuY3Rpb24oc3R1ZmYpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHN0dWZmKTtcclxuXHRcdFx0fSkuY2F0Y2goIChlcnIpID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHRcdHRoaXMucHJvcHMubm90aWZpY2F0aW9uLmNyZWF0ZSh7bWVzc2FnZTpcIlRoZXJlIHdhcyBhbiBlcnJvciBnZXR0aW5nIHlvdXIga2V5cy5cIiwgdHlwZTpcImRhbmdlclwifSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJkb2NzXCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlLWhlYWRlclwiPkRvY3VtZW50YXRpb248L2Rpdj5cclxuXHRcdFx0XHQ8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2VuZFJlY2VpcHR9PlNlbmQgU2FtcGxlIFJlY2VpcHQ8L2J1dHRvbj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsImltcG9ydCB7IFJlYWN0IH0gZnJvbSAnLi4vY2RuJ1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvRm9vdGVyLmpzJ1xyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPVwic3VwcG9ydFwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZS1oZWFkZXJcIj5TdXBwb3J0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdERPTSwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuL2NkbidcclxuaW1wb3J0IEF1dGhlbnRpY2F0ZSBmcm9tICcuL2NsYXNzZXMvQXV0aGVudGljYXRlJ1xyXG5cclxuaW1wb3J0IEFwcCBmcm9tICcuL2FwcC5qcydcclxuaW1wb3J0IEF1dGggZnJvbSAnLi92aWV3cy9hdXRoJ1xyXG5pbXBvcnQgRGFzaCBmcm9tICcuL3ZpZXdzL2Rhc2gnXHJcbmltcG9ydCBBY2NvdW50IGZyb20gJy4vdmlld3MvYWNjb3VudCdcclxuaW1wb3J0IERvY3MgZnJvbSAnLi92aWV3cy9kb2NzJ1xyXG5pbXBvcnQgU3VwcG9ydCBmcm9tICcuL3ZpZXdzL3N1cHBvcnQnXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xyXG5pbXBvcnQgVXNlciBmcm9tICcuL2NsYXNzZXMvVXNlcidcclxuXHJcbnZhciBSb3V0ZXIgPSBSZWFjdFJvdXRlci5Sb3V0ZXI7XHJcbnZhciBSb3V0ZSA9IFJlYWN0Um91dGVyLlJvdXRlO1xyXG52YXIgYnJvd3Nlckhpc3RvcnkgPSBSZWFjdFJvdXRlci5icm93c2VySGlzdG9yeTtcclxuXHJcbi8vIHZhbGlkYXRlIGF1dGhlbnRpY2F0aW9uIGZvciBwcml2YXRlIHJvdXRlc1xyXG5jb25zdCByZXF1aXJlQXV0aCA9IChuZXh0U3RhdGUsIHJlcGxhY2UpID0+IHtcclxuXHRpZiAoIUF1dGhlbnRpY2F0ZS5pc0xvZ2dlZEluKCkpIHtcclxuXHRcdGJyb3dzZXJIaXN0b3J5LnB1c2goXCJkYXNoXCIpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG5SZWFjdERPTS5yZW5kZXIoKFxyXG5cdDxSb3V0ZXIgaGlzdG9yeT17YnJvd3Nlckhpc3Rvcnl9PlxyXG5cdFx0PFJvdXRlIGNvbXBvbmVudD17QXBwfT5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJhdXRoXCIgY29tcG9uZW50PXtBdXRofS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiZG9jc1wiIGNvbXBvbmVudD17RG9jc30vPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cImRhc2hcIiBjb21wb25lbnQ9e0Rhc2h9IG9uRW50ZXI9e3JlcXVpcmVBdXRofS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiYWNjb3VudFwiIGNvbXBvbmVudD17QWNjb3VudH0gb25FbnRlcj17cmVxdWlyZUF1dGh9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzdXBwb3J0XCIgY29tcG9uZW50PXtTdXBwb3J0fS8+XHJcblx0XHQ8L1JvdXRlPlxyXG5cdDwvUm91dGVyPlxyXG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xyXG4iXX0=
