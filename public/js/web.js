(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var environment = "production";
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

		console.log(options);
		var lockSettings = {
			allowedConnections: ['flectino-dev', 'github', 'google-oauth2'],
			socialButtonStyle: 'small',
			languageDictionary: {
				title: "Hi"
			},
			theme: {
				logo: 'http://img06.deviantart.net/ce86/i/2013/027/1/5/batman_logo_only_by_deathonabun-d5swf2u.png',
				primaryColor: '#00a08a'
			}
		};
		if (typeof options.initialScreen != "undefined") lockSettings.initialScreen = options.initialScreen;
		if (typeof options.allowLogin != "undefined") lockSettings.allowLogin = options.allowLogin;
		if (typeof options.container != "undefined") lockSettings.container = options.container;
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
			// Saves the user token
			this.setToken(authResult.idToken);
			window.location = "/dash";
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
			// Clear user token and profile data from localStorage
			localStorage.removeItem('id_token');
			localStorage.removeItem('profile');
			window.location = "/";
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
        "phone": ""
    },
    "transaction": {
        "date": "2016-11-11T20:07:12.868Z",
        "total": 50210,
        "items": [{
            "description": "Donuts",
            "quantity": 8,
            "unitPrice": 803,
            "total": 6424
        }, {
            "description": "Cookies",
            "quantity": 5,
            "unitPrice": 974,
            "total": 4870
        }, {
            "description": "Milk",
            "quantity": 2,
            "unitPrice": 494,
            "total": 988
        }, {
            "description": "Ice Cream",
            "quantity": 5,
            "unitPrice": 704,
            "total": 3520
        }, {
            "description": "FroYo",
            "quantity": 5,
            "unitPrice": 772,
            "total": 3860
        }, {
            "description": "Chocolate",
            "quantity": 5,
            "unitPrice": 383,
            "total": 1915
        }, {
            "description": "Burger",
            "quantity": 3,
            "unitPrice": 151,
            "total": 453
        }, {
            "description": "Steak",
            "quantity": 6,
            "unitPrice": 226,
            "total": 1356
        }, {
            "description": "Mushroom Ravioli",
            "quantity": 8,
            "unitPrice": 175,
            "total": 1400
        }, {
            "description": "Mac & Cheese",
            "quantity": 10,
            "unitPrice": 276,
            "total": 2760
        }, {
            "description": "Advil",
            "quantity": 9,
            "unitPrice": 443,
            "total": 3987
        }, {
            "description": "Boston Globe",
            "quantity": 8,
            "unitPrice": 276,
            "total": 2208
        }, {
            "description": "Oyster",
            "quantity": 6,
            "unitPrice": 432,
            "total": 2592
        }, {
            "description": "Munchkins",
            "quantity": 1,
            "unitPrice": 556,
            "total": 556
        }, {
            "description": "Pencils",
            "quantity": 2,
            "unitPrice": 803,
            "total": 1606
        }, {
            "description": "Batteries",
            "quantity": 3,
            "unitPrice": 873,
            "total": 2619
        }, {
            "description": "Lemon",
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
            "value": "https://wwww.facebook.com/Acme"
        }, {
            "type": "twitter",
            "description": "Twitter",
            "value": "https://www.twitter.com/Acme"
        }, {
            "type": "instagram",
            "description": "Instagram",
            "value": "https://www.instagram.com/Acme"
        }, {
            "type": "googlePlus",
            "description": "Google Plus",
            "value": "https://plus.google.com/Acme"
        }, {
            "type": "twitter",
            "description": "Twitter",
            "value": "https://www.twitter.com/Acme"
        }, {
            "type": "pinterest",
            "description": "Pinterest",
            "value": "https://www.pinterest.com/Acme"
        }, {
            "type": "web",
            "description": "Website",
            "value": "https://www.Acme.com/"
        }, {
            "type": "email",
            "description": "Email",
            "value": "Acme@flectino.com"
        }, {
            "type": "phone",
            "description": "Corporate Phone",
            "value": "+13184496387"
        }, {
            "type": "phone",
            "description": "Store Phone",
            "value": "+11773634657"
        }],
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

var browserHistory = _cdn.ReactRouter.browserHistory;

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
		}).catch(function (err) {
			console.log(err);
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
							this.state.secureProfile.email
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
							this.state.secureProfile.user_id
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

var _Authenticate = require('../classes/Authenticate');

var _Authenticate2 = _interopRequireDefault(_Authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browserHistory = _cdn.ReactRouter.browserHistory;

exports.default = _cdn.React.createClass({
	displayName: 'auth',

	getInitialState: function getInitialState() {
		return {
			loggingIn: false
		};
	},
	componentDidMount: function componentDidMount() {
		if (_Authenticate2.default.isLoggedIn()) browserHistory.push('/dash');else {
			var auth = new _Authenticate2.default();
			auth.login();
		}
	},

	render: function render() {
		return _cdn.React.createElement(
			'div',
			{ id: 'auth' },
			_cdn.React.createElement('div', { id: 'authContainer' })
		);
	}
});

},{"../cdn":3,"../classes/Authenticate":4,"../components/Footer.js":8}],15:[function(require,module,exports){
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
		return {
			phone: "",
			sample: _transactionSample2.default,
			basicToken: "",
			referenceId: ""
		};
	},
	componentDidMount: function componentDidMount() {
		var _this = this;

		_User2.default.getBasicToken().then(function (token) {
			_this.setState({ basicToken: token });
		});
	},
	sendReceipt: function sendReceipt() {
		var _this2 = this;

		$.ajax({
			url: _config2.default.apiHost + "/v1/transaction",
			type: "post",
			headers: {
				Authorization: this.state.basicToken
			},
			data: this.state.sample
		}).then(function (data) {
			_this2.props.notification.create({ message: "Your request was made successfully." });
		}).catch(function (err) {
			console.log(err);
			_this2.props.notification.create({ message: "There was an error getting your keys.", type: "danger" });
		});
	},
	handleChange: function handleChange(e) {
		var number = e.target.value;
		_transactionSample2.default.link.phone = number;
		this.setState({ phone: number });
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
				'div',
				{ className: 'row' },
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-6 configure' },
					_cdn.React.createElement(
						'div',
						{ className: 'row margin-bottom-25 vertical-align' },
						_cdn.React.createElement(
							'div',
							{ className: 'col-xs-12' },
							_cdn.React.createElement(
								'span',
								{ className: 'font-size-24' },
								'Send Transaction',
								_cdn.React.createElement('br', null)
							),
							_cdn.React.createElement(
								'span',
								{ className: 'requestMethod' },
								'POST'
							),
							_cdn.React.createElement(
								'span',
								{ className: 'requestRoute' },
								'/transaction'
							)
						)
					),
					_cdn.React.createElement(
						'div',
						{ className: 'row margin-bottom-15' },
						_cdn.React.createElement(
							'div',
							{ className: 'col-xs-6' },
							_cdn.React.createElement(
								'span',
								null,
								'Phone Number'
							),
							_cdn.React.createElement('input', { type: 'text', className: 'form-control', onChange: this.handleChange, value: this.state.name })
						)
					),
					_cdn.React.createElement(
						'div',
						null,
						_cdn.React.createElement(
							'button',
							{ type: 'button', className: 'btn btn-primary', onClick: this.sendReceipt },
							'Try'
						)
					)
				),
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-6 code' },
					_cdn.React.createElement(
						'div',
						{ className: 'sampleHeader margin-bottom-15' },
						'Headers'
					),
					_cdn.React.createElement(
						'span',
						null,
						'Authorization: ',
						this.state.basicToken,
						' '
					),
					_cdn.React.createElement(
						'div',
						{ className: 'sampleHeader  margin-top-15' },
						'Body'
					),
					_cdn.React.createElement(
						'code',
						{ className: 'code' },
						JSON.stringify(_transactionSample2.default, null, 2)
					)
				)
			),
			_cdn.React.createElement(
				'div',
				{ className: 'row' },
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-6 configure' },
					_cdn.React.createElement(
						'div',
						{ className: 'row margin-bottom-25 vertical-align' },
						_cdn.React.createElement(
							'div',
							{ className: 'col-xs-12' },
							_cdn.React.createElement(
								'span',
								{ className: 'font-size-24' },
								'Get Transaction',
								_cdn.React.createElement('br', null)
							),
							_cdn.React.createElement(
								'span',
								{ className: 'requestMethod' },
								'GET'
							),
							_cdn.React.createElement(
								'span',
								{ className: 'requestRoute' },
								'/transaction/:referenceToken'
							)
						)
					),
					_cdn.React.createElement(
						'div',
						{ className: 'row margin-bottom-15' },
						_cdn.React.createElement(
							'div',
							{ className: 'col-xs-6' },
							_cdn.React.createElement(
								'span',
								null,
								'Reference Token'
							),
							_cdn.React.createElement('input', { type: 'text', className: 'form-control', onChange: this.handleChange, value: this.state.name })
						)
					),
					_cdn.React.createElement(
						'div',
						null,
						_cdn.React.createElement(
							'button',
							{ type: 'button', className: 'btn btn-primary' },
							'Try'
						)
					)
				),
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-6 code' },
					_cdn.React.createElement(
						'div',
						{ className: 'sampleHeader margin-bottom-15' },
						'Headers'
					),
					_cdn.React.createElement(
						'span',
						null,
						'Authorization: ',
						this.state.basicToken,
						' '
					),
					_cdn.React.createElement(
						'div',
						{ className: 'sampleHeader  margin-top-15' },
						'Body'
					),
					_cdn.React.createElement('code', { className: 'code' })
				)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcY2RuLmpzIiwic3JjXFxjbGFzc2VzXFxBdXRoZW50aWNhdGUuanMiLCJzcmNcXGNsYXNzZXNcXEtleS5qcyIsInNyY1xcY2xhc3Nlc1xcVXNlci5qcyIsInNyY1xcY2xhc3Nlc1xcVXRpbGl0aWVzLmpzIiwic3JjXFxjb21wb25lbnRzXFxGb290ZXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXGhlYWRlci5qcyIsInNyY1xcY29tcG9uZW50c1xcbmF2LmpzIiwic3JjXFxjb21wb25lbnRzXFxub3RpZmljYXRpb25zLmpzIiwic3JjXFxkYXRhXFx0cmFuc2FjdGlvblNhbXBsZS5qcyIsInNyY1xcdmlld3NcXGFjY291bnQuanMiLCJzcmNcXHZpZXdzXFxhdXRoLmpzIiwic3JjXFx2aWV3c1xcZGFzaC5qcyIsInNyY1xcdmlld3NcXGRvY3MuanMiLCJzcmNcXHZpZXdzXFxzdXBwb3J0LmpzIiwic3JjXFx3ZWIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNDQSxJQUFJLGNBQWMsWUFBbEI7QUFDQSxJQUFJLGNBQWMsYUFBbEI7a0JBQ2U7QUFDZCxjQUFhLFdBREM7QUFFZCxVQUFVLFlBQVU7QUFDbkIsTUFBRyxlQUFlLFlBQWxCLEVBQWdDLE9BQU8sNkJBQVAsQ0FBaEMsS0FDSyxPQUFPLHVCQUFQO0FBQ0wsRUFIUyxFQUZJO0FBTWQsVUFBVSxZQUFVO0FBQ25CLE1BQUcsZUFBZSxZQUFsQixFQUFnQyxPQUFPLDZCQUFQLENBQWhDLEtBQ0ssT0FBTyx1QkFBUDtBQUNMLEVBSFMsRUFOSTtBQVVkLGFBQVksNkJBVkU7QUFXZCxRQUFNO0FBQ0wsWUFBVSxrQ0FETDtBQUVMLFVBQVE7QUFGSDtBQVhRLEM7Ozs7Ozs7OztBQ0hmOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7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O0FBS0Msc0JBQUMsS0FBRCxJQUFPLE1BQUssU0FBWixFQUFzQiw0QkFBdEI7QUFMRDtBQURELENBREQsRUFVRyxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FWSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxudmFyIGVudmlyb25tZW50ID0gXCJwcm9kdWN0aW9uXCI7XHJcbnZhciBlbnZpcm9ubWVudCA9IFwiZGV2ZWxvcG1lbnRcIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGVudmlyb25tZW50OiBlbnZpcm9ubWVudCxcclxuXHRhcGlIb3N0OiAoZnVuY3Rpb24oKXtcclxuXHRcdGlmKGVudmlyb25tZW50ID09IFwicHJvZHVjdGlvblwiKSByZXR1cm4gXCJodHRwOi8vYXBpdGVzdC5mbGVjdGluby5jb21cIjtcclxuXHRcdGVsc2UgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDozMDEwXCI7XHJcblx0fSgpKSxcclxuXHR3ZWJIb3N0OiAoZnVuY3Rpb24oKXtcclxuXHRcdGlmKGVudmlyb25tZW50ID09IFwicHJvZHVjdGlvblwiKSByZXR1cm4gXCJodHRwOi8vd2VidGVzdC5mbGVjdGluby5jb21cIjtcclxuXHRcdGVsc2UgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcblx0fSgpKSxcclxuXHRnYXRld2F5S2V5OiBcIkFVQjVqQ2tkcTNiN2tWOURUVGRpUWxsT1J2NVwiLFxyXG5cdGF1dGgwOntcclxuXHRcdGNsaWVudElkOiBcIjBTTTBnckJUb0NKaldHVWJCdGxadUhoeWxDcTJkVnQzXCIsXHJcblx0XHRkb21haW46IFwiZmxlY3Rpbm8uYXV0aDAuY29tXCJcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVhY3QsIFJlYWN0Um91dGVyfSBmcm9tICcuL2NkbidcclxuaW1wb3J0IEhlYWRlciBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyLmpzJ1xyXG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuL2NvbXBvbmVudHMvbm90aWZpY2F0aW9ucy5qcydcclxuaW1wb3J0IE5hdiBmcm9tICcuL2NvbXBvbmVudHMvbmF2J1xyXG5pbXBvcnQgeyBnZXRRdWVyeVZhcmlhYmxlIH0gZnJvbSAnLi9jbGFzc2VzL1V0aWxpdGllcydcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi9jbGFzc2VzL1VzZXIuanMnXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnLmpzJ1xyXG5cclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybntcclxuXHRcdFx0bm90aWZpY2F0aW9uczpbXVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y3JlYXRlTm90aWZpY2F0aW9uOiBmdW5jdGlvbihub3RpZmljYXRpb24pe1xyXG5cdFx0dmFyIG5vdGlmaWNhdGlvbnMgPSB0aGlzLnN0YXRlLm5vdGlmaWNhdGlvbnM7XHJcblx0XHRub3RpZmljYXRpb25zLnB1c2gobm90aWZpY2F0aW9uKTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbnM6bm90aWZpY2F0aW9uc30pO1xyXG5cclxuXHRcdHJldHVybjtcclxuXHR9LFxyXG5cdHJlbW92ZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obkluZGV4KXtcclxuXHRcdHZhciBub3RpZmljYXRpb25zID0gdGhpcy5zdGF0ZS5ub3RpZmljYXRpb25zO1xyXG5cdFx0bm90aWZpY2F0aW9ucy5zcGxpY2UobkluZGV4LDEpO1xyXG5cdFx0cmV0dXJuIHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbnM6bm90aWZpY2F0aW9uc30pO1xyXG5cdH0sXHJcblx0cmV0cmlldmVOb3RpZmljYXRpb25zOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUubm90aWZpY2F0aW9ucztcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6ZnVuY3Rpb24obmV4dFByb3BzKXtcclxuXHRcdC8vIFJlbW92ZSBub3RpZmljYXRpb25zIHdoZW4gdmlldyBjaGFuZ2VzXHJcblx0XHRpZih0aGlzLnByb3BzLmxvY2F0aW9uLnBhdGhuYW1lICE9IG5leHRQcm9wcy5sb2NhdGlvbi5wYXRobmFtZSl7XHJcblx0XHRcdHZhciBub3RpZmljYXRpb25zID0gW107XHJcblx0XHRcdGlmICh0eXBlb2YgbmV4dFByb3BzLmxvY2F0aW9uLnF1ZXJ5Lm1lc3NhZ2UgIT0gXCJ1bmRlZmluZWRcIikgbm90aWZpY2F0aW9ucy5wdXNoKHttZXNzYWdlOm5leHRQcm9wcy5sb2NhdGlvbi5xdWVyeS5tZXNzYWdlfSk7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbnM6bm90aWZpY2F0aW9uc30pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0dmFyIG5vdGlmaWNhdGlvbnMgPSB0aGlzLnN0YXRlLm5vdGlmaWNhdGlvbnM7XHJcblx0XHRpZiAodHlwZW9mIGdldFF1ZXJ5VmFyaWFibGUoXCJtZXNzYWdlXCIpICE9IFwidW5kZWZpbmVkXCIpIG5vdGlmaWNhdGlvbnMucHVzaCh7bWVzc2FnZTpnZXRRdWVyeVZhcmlhYmxlKFwibWVzc2FnZVwiKS5zcGxpdChcIitcIikuam9pbihcIiBcIil9KTtcclxuXHJcblx0XHRyZXR1cm47XHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0dmFyIHZpZXcgPSB0aGlzLnByb3BzLnJvdXRlc1sxXTtcclxuXHRcdHZhciBwYXNzID0ge1xyXG5cdFx0XHRub3RpZmljYXRpb246e1xyXG5cdFx0XHRcdGNyZWF0ZTogdGhpcy5jcmVhdGVOb3RpZmljYXRpb24sXHJcblx0XHRcdFx0cmVtb3ZlOiB0aGlzLnJlbW92ZU5vdGlmaWNhdGlvbixcclxuXHRcdFx0XHRyZXRyaWV2ZTogdGhpcy5yZXRyaWV2ZU5vdGlmaWNhdGlvbnNcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuICAgICAgICAgPGRpdj5cclxuXHRcdFx0XHQ8Tm90aWZpY2F0aW9ucyBub3RpZmljYXRpb249e3Bhc3Mubm90aWZpY2F0aW9ufS8+XHJcbiAgICAgICAgICAgIDxIZWFkZXIgbm90aWZpY2F0aW9uPXtwYXNzLm5vdGlmaWNhdGlvbn0vPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZS1ib2R5XCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBmaXgtd2lkdGhcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgdmlld1wiPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyXCI+XHJcblx0XHRcdFx0XHRcdFx0XHR7UmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2hpbGRyZW4sIHBhc3MpfVxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG4gICAgICAgICA8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuIiwiXHJcbnZhciAkID0gd2luZG93LiQ7XHJcbnZhciBqUXVlcnkgPSAkO1xyXG52YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3Q7XHJcbnZhciBSZWFjdERPTSA9IHdpbmRvdy5SZWFjdERPTTtcclxudmFyIFJlYWN0Um91dGVyID0gd2luZG93LlJlYWN0Um91dGVyO1xyXG52YXIgQXV0aDBMb2NrID0gd2luZG93LkF1dGgwTG9jaztcclxudmFyIExvZGFzaCA9IHdpbmRvdy5fO1xyXG5leHBvcnQgeyAkLCBqUXVlcnksIFJlYWN0LCBSZWFjdERPTSwgUmVhY3RSb3V0ZXIsIEF1dGgwTG9jaywgTG9kYXNoIH1cclxuIiwiaW1wb3J0IHsgQXV0aDBMb2NrLCBSZWFjdFJvdXRlciB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi9Vc2VyJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZydcclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRoZW50aWNhdGV7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnM9e30pIHtcclxuXHRcdGNvbnNvbGUubG9nKG9wdGlvbnMpXHJcblx0XHR2YXIgbG9ja1NldHRpbmdzID0ge1xyXG5cdFx0XHRhbGxvd2VkQ29ubmVjdGlvbnM6IFsnZmxlY3Rpbm8tZGV2JywgJ2dpdGh1YicsICdnb29nbGUtb2F1dGgyJ10sXHJcblx0XHRcdHNvY2lhbEJ1dHRvblN0eWxlOiAnc21hbGwnLFxyXG5cdFx0XHRsYW5ndWFnZURpY3Rpb25hcnk6IHtcclxuXHRcdFx0XHR0aXRsZTogXCJIaVwiXHJcblx0XHRcdH0sXHJcblx0XHRcdHRoZW1lOntcclxuXHRcdFx0XHRsb2dvOiAnaHR0cDovL2ltZzA2LmRldmlhbnRhcnQubmV0L2NlODYvaS8yMDEzLzAyNy8xLzUvYmF0bWFuX2xvZ29fb25seV9ieV9kZWF0aG9uYWJ1bi1kNXN3ZjJ1LnBuZycsXHJcblx0XHRcdFx0cHJpbWFyeUNvbG9yOiAnIzAwYTA4YSdcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5pbml0aWFsU2NyZWVuICE9XCJ1bmRlZmluZWRcIikgbG9ja1NldHRpbmdzLmluaXRpYWxTY3JlZW4gPSBvcHRpb25zLmluaXRpYWxTY3JlZW47XHJcblx0XHRpZiAodHlwZW9mIG9wdGlvbnMuYWxsb3dMb2dpbiAhPVwidW5kZWZpbmVkXCIpIGxvY2tTZXR0aW5ncy5hbGxvd0xvZ2luID0gb3B0aW9ucy5hbGxvd0xvZ2luO1xyXG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLmNvbnRhaW5lciAhPVwidW5kZWZpbmVkXCIpIGxvY2tTZXR0aW5ncy5jb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lcjtcclxuXHRcdC8vIENvbmZpZ3VyZSBBdXRoMFxyXG5cdFx0dGhpcy5sb2NrID0gbmV3IEF1dGgwTG9jayhjb25maWcuYXV0aDAuY2xpZW50SWQsIGNvbmZpZy5hdXRoMC5kb21haW4sIGxvY2tTZXR0aW5ncyk7XHJcblx0XHQvLyBBZGQgY2FsbGJhY2sgZm9yIGxvY2sgYGF1dGhlbnRpY2F0ZWRgIGV2ZW50XHJcblx0XHR0aGlzLmxvY2sub24oJ2F1dGhlbnRpY2F0ZWQnLCB0aGlzLm9uQXV0aGVudGljYXRpb24uYmluZCh0aGlzKSlcclxuXHRcdC8vIGJpbmRzIGxvZ2luIGZ1bmN0aW9ucyB0byBrZWVwIHRoaXMgY29udGV4dFxyXG5cdFx0dGhpcy5sb2dpbiA9IHRoaXMubG9naW4uYmluZCh0aGlzKVxyXG5cdH1cclxuXHJcblx0b25BdXRoZW50aWNhdGlvbihhdXRoUmVzdWx0KXtcclxuXHQgICAvLyBTYXZlcyB0aGUgdXNlciB0b2tlblxyXG5cdFx0dGhpcy5zZXRUb2tlbihhdXRoUmVzdWx0LmlkVG9rZW4pO1xyXG5cdFx0d2luZG93LmxvY2F0aW9uID0gXCIvZGFzaFwiO1xyXG5cdH1cclxuXHJcblx0c2V0UHJvZmlsZShwcm9maWxlKXtcclxuXHRcdC8vIFNhdmVzIHByb2ZpbGUgZGF0YSB0byBsb2NhbFN0b3JhZ2VcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9maWxlJywgSlNPTi5zdHJpbmdpZnkocHJvZmlsZSkpXHJcblx0fVxyXG5cclxuXHRsb2dpbigpIHtcclxuXHRcdC8vIENhbGwgdGhlIHNob3cgbWV0aG9kIHRvIGRpc3BsYXkgdGhlIHdpZGdldC5cclxuXHRcdHRoaXMubG9jay5zaG93KClcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBpc0xvZ2dlZEluKCl7XHJcblx0XHQvLyBDaGVja3MgaWYgdGhlcmUgaXMgYSBzYXZlZCB0b2tlbiBhbmQgaXQncyBzdGlsbCB2YWxpZFxyXG5cdFx0cmV0dXJuICEhVXNlci5nZXRUb2tlbigpXHJcblx0fVxyXG5cclxuXHRzZXRUb2tlbihpZFRva2VuKXtcclxuXHRcdC8vIFNhdmVzIHVzZXIgdG9rZW4gdG8gbG9jYWxTdG9yYWdlXHJcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaWRfdG9rZW4nLCBpZFRva2VuKTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBsb2dvdXQoKXtcclxuXHRcdC8vIENsZWFyIHVzZXIgdG9rZW4gYW5kIHByb2ZpbGUgZGF0YSBmcm9tIGxvY2FsU3RvcmFnZVxyXG5cdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2lkX3Rva2VuJyk7XHJcblx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgncHJvZmlsZScpO1xyXG5cdFx0d2luZG93LmxvY2F0aW9uID0gXCIvXCI7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBBdXRoMExvY2ssIFJlYWN0Um91dGVyIH0gZnJvbSAnLi4vY2RuJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZy5qcydcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi9Vc2VyJztcclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleSB7XHJcblxyXG5cdHN0YXRpYyB1cGRhdGUocG9zdERhdGEsIHVzZXIpe1xyXG5cdFx0cmV0dXJuIFVzZXIuZ2V0QmFzaWNUb2tlbigpLnRoZW4oZnVuY3Rpb24oYmFzaWMpe1xyXG5cdFx0XHRyZXR1cm4gJC5hamF4KHtcclxuXHRcdFx0XHR1cmw6IGNvbmZpZy5hcGlIb3N0ICsgXCIvdjEva2V5XCIsXHJcblx0XHRcdFx0dHlwZTogXCJwb3N0XCIsXHJcblx0XHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdFx0QXV0aG9yaXphdGlvbjogYmFzaWMsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRkYXRhOnBvc3REYXRhXHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IExvZGFzaCB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcuanMnXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIge1xyXG5cclxuXHRzdGF0aWMgZ2V0UHJvZmlsZSgpe1xyXG5cdFx0Ly8gUmV0cmlldmVzIHRoZSBwcm9maWxlIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcclxuXHRcdGNvbnN0IHByb2ZpbGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZmlsZScpXHJcblx0XHRyZXR1cm4gcHJvZmlsZSA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLnByb2ZpbGUpIDoge307XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0RnVsbFByb2ZpbGUoKXtcclxuXHRcdHJldHVybiAkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IGNvbmZpZy5hcGlIb3N0ICsgXCIvdXNlclwiLFxyXG5cdFx0XHR0eXBlOiBcImdldFwiLFxyXG5cdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0QXV0aG9yaXphdGlvbjogXCJCZWFyZXIgXCIgKyBVc2VyLmdldFRva2VuKClcclxuXHRcdFx0fVxyXG5cdFx0fSkuY2F0Y2goKGVycik9PntcclxuXHRcdFx0Y29uc29sZS5sb2coZXJyKTtcclxuXHRcdFx0aWYgKGVyci5zdGF0dXMgPT0gNDAzKSB0aGlzLmxvZ291dCgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0VG9rZW4oKXtcclxuXHRcdC8vIFJldHJpZXZlcyB0aGUgdXNlciB0b2tlbiBmcm9tIGxvY2FsU3RvcmFnZVxyXG5cdFx0cmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpZF90b2tlbicpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldEJhc2ljVG9rZW4oKXtcclxuXHRcdHJldHVybiBVc2VyLmdldEZ1bGxQcm9maWxlKCkudGhlbihmdW5jdGlvbihwcm9maWxlKXtcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShcIkJhc2ljIFwiICsgd2luZG93LmJ0b2EocHJvZmlsZS51c2VyX2lkICsgXCI6XCIgKyBwcm9maWxlLmtleXNbMF0udG9rZW4pKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKHBvc3REYXRhKXtcclxuXHRcdHJldHVybiAkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IGNvbmZpZy5hcGlIb3N0ICsgXCIvdXNlcnMvXCIgKyB0aGlzLmdldFByb2ZpbGUoKS51c2VyX2lkLFxyXG5cdFx0XHR0eXBlOiBcInBhdGNoXCIsXHJcblx0XHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0XHRBdXRob3JpemF0aW9uOiBcIkJlYXJlciBcIiArIHRoaXMuZ2V0VG9rZW4oKSxcclxuXHRcdFx0fSxcclxuXHRcdFx0ZGF0YTpwb3N0RGF0YVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcbiIsIlxyXG5cclxudmFyIGdldFF1ZXJ5VmFyaWFibGUgPSBmdW5jdGlvbih2YXJpYWJsZSkge1xyXG5cdHZhciBxdWVyeSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpO1xyXG5cdHZhciBwcmVWYXJzID0gcXVlcnkuc3BsaXQoJy8nKTtcclxuXHR2YXIgdmFycyA9IHByZVZhcnNbMF0uc3BsaXQoJyYnKTtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdCgnPScpO1xyXG5cdFx0aWYgKGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKSA9PSB2YXJpYWJsZSkge1xyXG5cdFx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjb25zb2xlLmxvZygnUXVlcnkgdmFyaWFibGUgJXMgbm90IGZvdW5kJywgdmFyaWFibGUpO1xyXG59XHJcblxyXG52YXIgaXNWYWxpZCA9IHtcclxuXHRlbWFpbDogZnVuY3Rpb24oZW1haWwpIHtcclxuXHRcdHZhciByZSA9IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xyXG5cdFx0cmV0dXJuIHJlLnRlc3QoZW1haWwpO1xyXG5cdH0sXHJcblx0cGhvbmU6IGZ1bmN0aW9uKHBob25lKSB7XHJcblx0XHR2YXIgc3RyaXBQaG9uZSA9IHBob25lLnJlcGxhY2UoL1xcRC9nLCcnKTtcclxuXHRcdGlmIChzdHJpcFBob25lLmxlbmd0aCA+PSAxMCkgcmV0dXJuIHRydWU7XHJcblx0XHRlbHNlIGZhbHNlO1xyXG5cdH1cclxufVxyXG5cclxudmFyIGZvcm1hdFBob25lMTAgPSBmdW5jdGlvbihwaG9uZSl7XHJcblx0dmFyIHN0cmlwUGhvbmUgPSBwaG9uZS5yZXBsYWNlKC9cXEQvZywnJyk7XHJcblx0dmFyIGRhc2ggPSBcIlwiO1xyXG5cdHZhciBvcGVuUGFyZW4gPSBcIlwiO1xyXG5cdHZhciBjbG9zZWRQYXJlbiA9IFwiXCI7XHJcblx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID4gMCkgb3BlblBhcmVuID0gXCIoXCI7XHJcblx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID4gMykgY2xvc2VkUGFyZW4gPSBcIilcIjtcclxuXHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPiA2KSBkYXNoID0gXCItXCI7XHJcblx0dmFyIGZvcm1hdHRlZFBob25lID0gb3BlblBhcmVuICsgc3RyaXBQaG9uZS5zdWJzdHJpbmcoMCwzKSArIGNsb3NlZFBhcmVuICsgc3RyaXBQaG9uZS5zdWJzdHJpbmcoMyw2KSArIGRhc2ggKyBzdHJpcFBob25lLnN1YnN0cmluZyg2LDEwKTtcclxuXHRyZXR1cm4gZm9ybWF0dGVkUGhvbmU7XHJcbn1cclxuXHJcbnZhciBnZXRUaW1lem9uZU9mZnNldCA9IGZ1bmN0aW9uKCl7XHJcblx0ZnVuY3Rpb24gcGFkKG51bWJlciwgbGVuZ3RoKXtcclxuXHRcdCB2YXIgc3RyID0gXCJcIiArIG51bWJlclxyXG5cdFx0IHdoaWxlIChzdHIubGVuZ3RoIDwgbGVuZ3RoKSB7XHJcblx0XHRcdCAgc3RyID0gJzAnK3N0clxyXG5cdFx0IH1cclxuXHRcdCByZXR1cm4gc3RyXHJcblx0fVxyXG5cdHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuXHR2YXIgb2Zmc2V0ID0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xyXG5cdHJldHVybiAoKG9mZnNldDwwPyAnKyc6Jy0nKSArIHBhZChwYXJzZUludChNYXRoLmFicyhvZmZzZXQvNjApKSwgMikrIHBhZChNYXRoLmFicyhvZmZzZXQlNjApLCAyKSk7XHJcbn1cclxuXHJcbnZhciBjcmVhdGVUaW1lRGF0ZSA9IGZ1bmN0aW9uKGRhdGUsIHRpbWUpe1xyXG5cdHZhciBtaWxlc3RvbmVEYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcblx0dmFyIHN0clNwbGl0ID0gdGltZS5zcGxpdCgnOicpO1xyXG5cdHZhciBob3VyID0gcGFyc2VJbnQoc3RyU3BsaXRbMF0pO1xyXG5cdHZhciBtaW51dGUgPSBwYXJzZUludChzdHJTcGxpdFsxXS5zdWJzdHJpbmcoMCwyKSk7XHJcblx0dmFyIHNldCA9IHN0clNwbGl0WzFdLnN1YnN0cmluZygyLDQpO1xyXG5cdGlmIChob3VyID09PSAxMikge1xyXG5cdFx0aWYgKHNldCA9PT0gXCJhbVwiKSBob3VyID0gMDtcclxuXHRcdGVsc2UgaG91ciA9IDEyO1xyXG5cdH0gZWxzZSBpZiAoc2V0ID09PSBcInBtXCIpIGhvdXIgKz0gMTI7XHJcblx0bWlsZXN0b25lRGF0ZS5zZXRIb3Vycyhob3VyKTtcclxuXHRtaWxlc3RvbmVEYXRlLnNldE1pbnV0ZXMobWludXRlKTtcclxuXHRtaWxlc3RvbmVEYXRlLnNldE1pbnV0ZXMobWlsZXN0b25lRGF0ZS5nZXRNaW51dGVzKCkgLSAgbWlsZXN0b25lRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpKTtcclxuXHRyZXR1cm4gbWlsZXN0b25lRGF0ZS50b0lTT1N0cmluZygpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgZ2V0UXVlcnlWYXJpYWJsZSwgaXNWYWxpZCwgZm9ybWF0UGhvbmUxMCwgZ2V0VGltZXpvbmVPZmZzZXQsIGNyZWF0ZVRpbWVEYXRlIH1cclxuIiwiaW1wb3J0IHsgUmVhY3QsIFJlYWN0Um91dGVyIH0gZnJvbSAnLi4vY2RuJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZy5qcydcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi4vY2xhc3Nlcy9Vc2VyLmpzJ1xyXG5cclxudmFyIExpbmsgPSBSZWFjdFJvdXRlci5MaW5rO1xyXG52YXIgYnJvd3Nlckhpc3RvcnkgPSBSZWFjdFJvdXRlci5icm93c2VySGlzdG9yeTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJmb290ZXJcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi1ib3R0b20tMTBcIj5SZXNvdXJjZXM8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdj5Gb3IgQ3VzdG9tZXJzPC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXY+Rm9yIFJldGFpbGVyczwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2PkZvciBEZXZlbG9wZXJzPC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWFyZ2luLWJvdHRvbS0xMFwiPkhlbHA8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG5cdFx0XHRcdFx0XHR7LyogPGRpdiBjbGFzc05hbWU9XCJtYXJnaW4tYm90dG9tLTEwXCI+UmVzb3VyY2VzPC9kaXY+ICovfVxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi1ib3R0b20tMTBcIj5BYm91dDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC00XCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibWFyZ2luLWJvdHRvbS0xMFwiPkNvbnRhY3Q8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdj5DYWxsOiAoODg4KTkzMC0yOTM4PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXY+RW1haWw6IGluZm9AaGkuY29tPC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsImltcG9ydCB7IFJlYWN0LCBSZWFjdFJvdXRlciB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcuanMnXHJcbmltcG9ydCBBdXRoZW50aWNhdGUgZnJvbSAnLi4vY2xhc3Nlcy9BdXRoZW50aWNhdGUuanMnXHJcblxyXG52YXIgTGluayA9IFJlYWN0Um91dGVyLkxpbms7XHJcbnZhciBicm93c2VySGlzdG9yeSA9IFJlYWN0Um91dGVyLmJyb3dzZXJIaXN0b3J5O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm57XHJcblx0XHRcdGF1dGhlbnRpY2F0ZTp7fSxcclxuXHRcdFx0bmF2OltcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRuYW1lOiBcIkRhc2hib2FyZFwiLFxyXG5cdFx0XHRcdFx0bGluazogXCJkYXNoXCIsXHJcblx0XHRcdFx0XHRwcml2YXRlOiB0cnVlXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOlwiQWNjb3VudFwiLFxyXG5cdFx0XHRcdFx0bGluazpcImFjY291bnRcIixcclxuXHRcdFx0XHRcdHByaXZhdGU6IHRydWVcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiU3VwcG9ydFwiLFxyXG5cdFx0XHRcdFx0bGluazogXCJzdXBwb3J0XCIsXHJcblx0XHRcdFx0XHRwcml2YXRlOiB0cnVlXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOiBcIkRvY3VtZW50YXRpb25cIixcclxuXHRcdFx0XHRcdGxpbms6IFwiZG9jc1wiLFxyXG5cdFx0XHRcdFx0cHJpdmF0ZTogdHJ1ZVxyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0bmFtZTogXCJMb2dvdXRcIixcclxuXHRcdFx0XHRcdGxpbms6XCJsb2dvdXRcIixcclxuXHRcdFx0XHRcdHByaXZhdGU6IHRydWVcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiTG9naW5cIixcclxuXHRcdFx0XHRcdGxpbms6XCJsb2dpblwiLFxyXG5cdFx0XHRcdFx0cHJpdmF0ZTogZmFsc2VcclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGF1dGhlbnRpY2F0ZSA9IG5ldyBBdXRoZW50aWNhdGUoKTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe2F1dGhlbnRpY2F0ZTphdXRoZW50aWNhdGV9KVxyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPVwiaGVhZGVyXCI+XHJcblx0XHRcdFx0PG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWZpeGVkLXRvcFwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgZml4LXdpZHRoXCI+XHJcblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIjXCI+RmxlY3Rpbm88L3NwYW4+XHJcblx0XHRcdFx0XHRcdDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2YmFyLW5hdiBmbG9hdC14cy1yaWdodFwiPlxyXG5cdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc3RhdGUubmF2Lm1hcCgoaXRlbSwgaSk9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYoQXV0aGVudGljYXRlLmlzTG9nZ2VkSW4oKSAmJiBpdGVtLnByaXZhdGUpIHJldHVybihcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGkga2V5PXtpfSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQoaXRlbS5uYW1lID09IFwiTG9nb3V0XCIpP1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiamF2YXNjcmlwdDpcIiBjbGFzc05hbWU9XCJuYXYtbGlua1wiIG9uQ2xpY2s9e0F1dGhlbnRpY2F0ZS5sb2dvdXR9PntpdGVtLm5hbWV9PC9hPjpcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PExpbmsgdG89e2l0ZW0ubGlua30gY2xhc3NOYW1lPVwibmF2LWxpbmtcIj57aXRlbS5uYW1lfTwvTGluaz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmKCFBdXRoZW50aWNhdGUuaXNMb2dnZWRJbigpICYmICFpdGVtLnByaXZhdGUpIHJldHVybihcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGkga2V5PXtpfSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGEgaHJlZj1cImphdmFzY3JpcHQ6XCIgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiBvbkNsaWNrPXt0aGlzLnN0YXRlLmF1dGhlbnRpY2F0ZS5sb2dpbn0+e2l0ZW0ubmFtZX08L2E+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdDwvdWw+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L25hdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsImltcG9ydCB7IFJlYWN0LCBSZWFjdFJvdXRlciB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi4vY2xhc3Nlcy9Vc2VyLmpzJ1xyXG5cclxudmFyIExpbmsgPSBSZWFjdFJvdXRlci5MaW5rO1xyXG52YXIgYnJvd3Nlckhpc3RvcnkgPSBSZWFjdFJvdXRlci5icm93c2VySGlzdG9yeTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJue1xyXG5cdFx0XHRuYXY6W1xyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiRGFzaGJvYXJkXCIsXHJcblx0XHRcdFx0XHRsaW5rOiBcImRhc2hcIixcclxuXHRcdFx0XHRcdGljb246IFwiZmEtYmFyLWNoYXJ0XCJcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdG5hbWU6XCJBY2NvdW50XCIsXHJcblx0XHRcdFx0XHRsaW5rOlwiYWNjb3VudFwiLFxyXG5cdFx0XHRcdFx0aWNvbjogXCJmYS11c2VyLW9cIlxyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0bmFtZTogXCJTdXBwb3J0XCIsXHJcblx0XHRcdFx0XHRsaW5rOiBcInN1cHBvcnRcIixcclxuXHRcdFx0XHRcdGljb246IFwiZmEtY29tbWVudC1vXCJcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiRG9jdW1lbnRhdGlvblwiLFxyXG5cdFx0XHRcdFx0bGluazogXCJkb2NzXCIsXHJcblx0XHRcdFx0XHRpY29uOiBcImZhLWJvb2tcIlxyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0bmFtZTogXCJMb2dvdXRcIixcclxuXHRcdFx0XHRcdGxpbms6XCJsb2dvdXRcIixcclxuXHRcdFx0XHRcdGljb246IFwiZmEtc2lnbi1vdXRcIlxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0bG9nb3V0OiBmdW5jdGlvbigpe1xyXG5cdFx0VXNlci5kZWxldGVBdXRob3JpemF0aW9uKCk7XHJcblx0XHRicm93c2VySGlzdG9yeS5wdXNoKFwibG9naW5cIik7XHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0dmFyIGZyYWcgPSB3aW5kb3cubG9jYXRpb24uaGFzaC5zcGxpdChcIj9cIilbMF07XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPVwibmF2XCI+XHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGhpcy5zdGF0ZS5uYXYubWFwKChpdGVtLCBpKT0+e1xyXG5cdFx0XHRcdFx0XHRpZiAoaXRlbS5uYW1lID09IFwiTG9nb3V0XCIpIHJldHVybihcclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwibGlua0JveFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGEgaHJlZj1cImphdmFzY3JpcHQ6XCIgb25DbGljaz17dGhpcy5wcm9wcy51c2VyLmxvZ291dH0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxpIGNsYXNzTmFtZT17XCJmYSBmYS1mdyBjb2xvci1wcmltYXJ5LW11dGVkIFwiICsgaXRlbS5pY29ufT48L2k+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuPiZuYnNwOyZuYnNwO3tpdGVtLm5hbWV9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9hPlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRlbHNlIHJldHVybihcclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwibGlua0JveFwiPlxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdDxMaW5rIHRvPXtpdGVtLmxpbmt9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9e1wiZmEgZmEtZncgY29sb3ItYmxhY2sgY29sb3ItcHJpbWFyeS1tdXRlZCBcIiArIGl0ZW0uaWNvbn0+PC9pPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj4mbmJzcDsmbmJzcDt7aXRlbS5uYW1lfTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdDwvTGluaz5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuIiwiaW1wb3J0IHsgUmVhY3QgfSBmcm9tICcuLi9jZG4nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHZhciBub3RpZmljYXRpb25zID0gdGhpcy5wcm9wcy5ub3RpZmljYXRpb24ucmV0cmlldmUoKTtcclxuXHRcdHZhciBub3RpZmljYXRpb25WaWV3ID0gKDxkaXY+PC9kaXY+KTtcclxuXHRcdGlmIChub3RpZmljYXRpb25zLmxlbmd0aCA+IDApe1xyXG5cdFx0XHRub3RpZmljYXRpb25WaWV3ID0gKFxyXG5cdFx0XHRcdDxkaXYgaWQ9XCJub3RpZmljYXRpb25zXCI+XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdG5vdGlmaWNhdGlvbnMubWFwKChub3RpZmljYXRpb24sIGkpPT57XHJcblx0XHRcdFx0XHRcdFx0aWYgKG5vdGlmaWNhdGlvbi50eXBlID09IHVuZGVmaW5lZCkgbm90aWZpY2F0aW9uLnR5cGUgPSBcInN1Y2Nlc3NcIjtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4oXHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17XCJhbGVydCBhbGVydC1cIiArIG5vdGlmaWNhdGlvbi50eXBlfSBrZXk9e2l9IGRhdGEtbkluZGV4PXtpfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0e25vdGlmaWNhdGlvbi5tZXNzYWdlfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjbG9zZVwiIG9uQ2xpY2s9eyAoKSA9PiB0aGlzLnByb3BzLm5vdGlmaWNhdGlvbi5yZW1vdmUoaSkgfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj4mdGltZXM7PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9XHJcbiAgICBcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG5vdGlmaWNhdGlvblZpZXc7XHJcblx0fVxyXG59KTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBcImxpbmtcIjp7XHJcbiAgICAgICAgXCJwaG9uZVwiOlwiXCJcclxuICAgIH0sXHJcbiAgICBcInRyYW5zYWN0aW9uXCI6e1xyXG4gICAgICAgIFwiZGF0ZVwiOlwiMjAxNi0xMS0xMVQyMDowNzoxMi44NjhaXCIsXHJcbiAgICAgICAgXCJ0b3RhbFwiOjUwMjEwLFxyXG4gICAgICAgIFwiaXRlbXNcIjpbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkRvbnV0c1wiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjgsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjgwMyxcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjo2NDI0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkNvb2tpZXNcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjo1LFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjo5NzQsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6NDg3MFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJNaWxrXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6MixcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6NDk0LFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjk4OFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJJY2UgQ3JlYW1cIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjo1LFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjo3MDQsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6MzUyMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJGcm9Zb1wiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjUsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjc3MixcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjozODYwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkNob2NvbGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjUsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjM4MyxcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjoxOTE1XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkJ1cmdlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjMsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjE1MSxcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjo0NTNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiU3RlYWtcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjo2LFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjoyMjYsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6MTM1NlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJNdXNocm9vbSBSYXZpb2xpXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6OCxcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6MTc1LFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjE0MDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiTWFjICYgQ2hlZXNlXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6MTAsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjI3NixcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjoyNzYwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkFkdmlsXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6OSxcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6NDQzLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjM5ODdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiQm9zdG9uIEdsb2JlXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6OCxcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6Mjc2LFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjIyMDhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiT3lzdGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6NixcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6NDMyLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjI1OTJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiTXVuY2hraW5zXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6MSxcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6NTU2LFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjU1NlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJQZW5jaWxzXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6MixcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6ODAzLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjE2MDZcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiQmF0dGVyaWVzXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6MyxcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6ODczLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjI2MTlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiTGVtb25cIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjoyLFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjoxMDYsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6MjEyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaXRlbXNcIjpbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJTdWJ0b3RhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsXCI6NDEzMjZcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiTUEgU3RhdGUgVGF4IEAgNi4yNSVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjI2ODZcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiR3JhdHVpdHlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjYxOThcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiR3JhbmQgVG90YWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjUwMjEwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImNvbnRhY3RcIjpbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiZmFjZWJvb2tcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkZhY2Vib29rXCIsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJodHRwczovL3d3d3cuZmFjZWJvb2suY29tL0FjbWVcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjpcInR3aXR0ZXJcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIlR3aXR0ZXJcIixcclxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImh0dHBzOi8vd3d3LnR3aXR0ZXIuY29tL0FjbWVcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjpcImluc3RhZ3JhbVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiSW5zdGFncmFtXCIsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJodHRwczovL3d3dy5pbnN0YWdyYW0uY29tL0FjbWVcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjpcImdvb2dsZVBsdXNcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkdvb2dsZSBQbHVzXCIsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9BY21lXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJ0d2l0dGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJUd2l0dGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJodHRwczovL3d3dy50d2l0dGVyLmNvbS9BY21lXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJwaW50ZXJlc3RcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIlBpbnRlcmVzdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiaHR0cHM6Ly93d3cucGludGVyZXN0LmNvbS9BY21lXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJ3ZWJcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIldlYnNpdGVcIixcclxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImh0dHBzOi8vd3d3LkFjbWUuY29tL1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiZW1haWxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkVtYWlsXCIsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJBY21lQGZsZWN0aW5vLmNvbVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOlwicGhvbmVcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkNvcnBvcmF0ZSBQaG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiKzEzMTg0NDk2Mzg3XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJwaG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiU3RvcmUgUGhvbmVcIixcclxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcIisxMTc3MzYzNDY1N1wiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYWRkcmVzc1wiOntcclxuICAgICAgICAgICAgXCJsaW5lMVwiOlwiMjU2IE1jZmVycmVuIFN0XCIsXHJcbiAgICAgICAgICAgIFwiY2l0eVwiOlwiTGl2ZXpleVwiLFxyXG4gICAgICAgICAgICBcInN0YXRlXCI6XCJSSVwiLFxyXG4gICAgICAgICAgICBcInBvc3RhbENvZGVcIjoxMzQwMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSZWFjdCwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuLi9jZG4nXHJcbmltcG9ydCBLZXkgZnJvbSAnLi4vY2xhc3Nlcy9LZXknXHJcbmltcG9ydCBVc2VyIGZyb20gJy4uL2NsYXNzZXMvVXNlcidcclxuaW1wb3J0IEF1dGhlbnRpY2F0ZSBmcm9tICcuLi9jbGFzc2VzL0F1dGhlbnRpY2F0ZSc7XHJcblxyXG52YXIgYnJvd3Nlckhpc3RvcnkgPSBSZWFjdFJvdXRlci5icm93c2VySGlzdG9yeTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdCAgIFx0cmV0dXJuIHtcclxuXHRcdFx0XHRrZXk6e1xyXG5cdFx0XHRcdFx0dG9rZW46XCJcIixcclxuXHRcdFx0XHRcdG5hbWU6XCJcIlxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c2hvd0tleTogZmFsc2UsXHJcblx0XHRcdFx0cHJvZmlsZTogVXNlci5nZXRQcm9maWxlKCksXHJcblx0XHRcdFx0c2VjdXJlUHJvZmlsZToge30sXHJcblx0XHRcdFx0Y29ubmVjdGlvbjogXCJcIixcclxuXHRcdFx0XHRhdXRoZW50aWNhdGU6IHt9XHJcblx0XHQgXHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XHJcblx0XHRVc2VyLmdldEZ1bGxQcm9maWxlKCkudGhlbigoc2VjdXJlUHJvZmlsZSk9PntcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7XHJcblx0XHRcdFx0c2VjdXJlUHJvZmlsZTpzZWN1cmVQcm9maWxlLFxyXG5cdFx0XHRcdGtleTpzZWN1cmVQcm9maWxlLmtleXNbMF0sXHJcblx0XHRcdFx0bmFtZTpzZWN1cmVQcm9maWxlLmtleXNbMF0ubmFtZSxcclxuXHRcdFx0XHRjb25uZWN0aW9uOiBzZWN1cmVQcm9maWxlLmlkZW50aXRpZXNbMF0uY29ubmVjdGlvblxyXG5cdFx0XHR9KTtcclxuXHRcdH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XHJcblx0XHRcdGNvbnNvbGUubG9nKGVycik7XHJcblx0XHR9KTtcclxuXHRcdHZhciBhdXRoZW50aWNhdGUgPSBuZXcgQXV0aGVudGljYXRlKHtcclxuXHRcdFx0aW5pdGlhbFNjcmVlbjogXCJmb3Jnb3RQYXNzd29yZFwiLFxyXG5cdFx0XHRhbGxvd0xvZ2luOiBmYWxzZVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnNldFN0YXRlKHthdXRoZW50aWNhdGU6YXV0aGVudGljYXRlfSk7XHJcblx0fSxcclxuXHRjaGFuZ2VQYXNzd29yZDogZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMuc3RhdGUuYXV0aGVudGljYXRlLmxvZ2luKCk7XHJcblx0fSxcclxuXHRzYXZlQ2hhbmdlczogZnVuY3Rpb24oKXtcclxuXHRcdEtleS51cGRhdGUoe1xyXG5cdFx0XHRuYW1lOiB0aGlzLnN0YXRlLm5hbWVcclxuXHRcdH0sIHRoaXMucHJvcHMudXNlcik7XHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImFjY291bnRcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtaGVhZGVyXCI+QWNjb3VudDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGluZm9Cb3hcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aDU+RW1haWw8L2g1PlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuPnt0aGlzLnN0YXRlLnNlY3VyZVByb2ZpbGUuZW1haWx9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG5cdFx0XHRcdFx0XHRcdDxoNT5TdWJzY3JpcHRpb248L2g1PlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuPkZyZWUgVW5saW1pdGVkPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgbWFyZ2luLXRvcC0zNVwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdFx0PGg1PlVzZXIgSUQ8L2g1PlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuPnt0aGlzLnN0YXRlLnNlY3VyZVByb2ZpbGUudXNlcl9pZH08L3NwYW4+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdFx0PGg1PlBhc3N3b3JkPC9oNT5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IHBhZGRpbmctbGVmdC0wXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiamF2YXNjcmlwdDpcIiBvbkNsaWNrPXt0aGlzLmNoYW5nZVBhc3N3b3JkfT5DaGFuZ2UgUGFzc3dvcmQ8L2E+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgc2V0dGluZ3NCb3hcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IGtleUJveFwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdFx0PGg1PkFwaSBLZXkmbmJzcDsmbmJzcDs8YSBocmVmPVwiamF2YXNjcmlwdDpcIiBjbGFzc05hbWU9XCJmb250LXNpemUtMTJcIiBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7c2hvd0tleTohdGhpcy5zdGF0ZS5zaG93S2V5fSl9PnsodGhpcy5zdGF0ZS5zaG93S2V5KT88c3Bhbj5IaWRlPC9zcGFuPjo8c3Bhbj5TaG93PC9zcGFuPn08L2E+PC9oNT5cclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHQodGhpcy5zdGF0ZS5zaG93S2V5KT9cclxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBpZD1cImtleUJveFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3RoaXMuc3RhdGUua2V5LnRva2VufSByZWFkT25seS8+OlxyXG5cdFx0XHRcdFx0XHRcdFx0PGlucHV0IGlkPVwia2V5Qm94XCIgdHlwZT1cInBhc3N3b3JkXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3RoaXMuc3RhdGUua2V5LnRva2VufSByZWFkT25seS8+XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBtYXJnaW4tdG9wLTM1XCI+XHJcblx0XHRcdFx0XHRcdFx0PGg1PkJ1c2luZXNzIE5hbWU8L2g1PlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgcGFkZGluZy1sZWZ0LTBcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBpZD1cIm5hbWVcIiB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBjb2wteHMtNlwiIG9uQ2hhbmdlPXsoZSk9Pnt0aGlzLnNldFN0YXRlKHtuYW1lOmUudGFyZ2V0LnZhbHVlfSl9fSB2YWx1ZT17dGhpcy5zdGF0ZS5uYW1lfS8+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IG9mZnNldC14cy02IG1hcmdpbi10b3AtMjVcIj5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi13YXJuaW5nIG1hcmdpbi1sZWZ0LTQ1XCIgb25DbGljaz17dGhpcy5zYXZlQ2hhbmdlc30+U2F2ZTwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuLi9jZG4nXHJcbmltcG9ydCBGb290ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Gb290ZXIuanMnXHJcbmltcG9ydCBBdXRoZW50aWNhdGUgZnJvbSAnLi4vY2xhc3Nlcy9BdXRoZW50aWNhdGUnO1xyXG5cclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuXHQgICBcdHJldHVybiB7XHJcblx0XHRcdFx0bG9nZ2luZ0luOiBmYWxzZVxyXG5cdFx0IFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xyXG5cdFx0aWYoQXV0aGVudGljYXRlLmlzTG9nZ2VkSW4oKSkgYnJvd3Nlckhpc3RvcnkucHVzaCgnL2Rhc2gnKTtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR2YXIgYXV0aCA9IG5ldyBBdXRoZW50aWNhdGUoKTtcclxuXHRcdFx0YXV0aC5sb2dpbigpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImF1dGhcIj5cclxuXHRcdFx0XHQ8ZGl2IGlkPVwiYXV0aENvbnRhaW5lclwiPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL0Zvb3Rlci5qcydcclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImRhc2hcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtaGVhZGVyXCI+RGFzaGJvYXJkPC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi4vY2xhc3Nlcy9Vc2VyJ1xyXG5pbXBvcnQgc2FtcGxlIGZyb20gJy4uL2RhdGEvdHJhbnNhY3Rpb25TYW1wbGUnXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnLmpzJ1xyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgXHRyZXR1cm4ge1xyXG5cdFx0XHRwaG9uZTpcIlwiLFxyXG5cdFx0XHRzYW1wbGU6c2FtcGxlLFxyXG5cdFx0XHRiYXNpY1Rva2VuOiBcIlwiLFxyXG5cdFx0XHRyZWZlcmVuY2VJZDogXCJcIlxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xyXG5cdFx0VXNlci5nZXRCYXNpY1Rva2VuKCkudGhlbigodG9rZW4pPT57XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2Jhc2ljVG9rZW46dG9rZW59KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0c2VuZFJlY2VpcHQ6ZnVuY3Rpb24oKXtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogY29uZmlnLmFwaUhvc3QgKyBcIi92MS90cmFuc2FjdGlvblwiLFxyXG5cdFx0XHR0eXBlOiBcInBvc3RcIixcclxuXHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdEF1dGhvcml6YXRpb246IHRoaXMuc3RhdGUuYmFzaWNUb2tlblxyXG5cdFx0XHR9LFxyXG5cdFx0XHRkYXRhOiB0aGlzLnN0YXRlLnNhbXBsZVxyXG5cdFx0fSkudGhlbigoZGF0YSk9PntcclxuXHRcdFx0dGhpcy5wcm9wcy5ub3RpZmljYXRpb24uY3JlYXRlKHttZXNzYWdlOlwiWW91ciByZXF1ZXN0IHdhcyBtYWRlIHN1Y2Nlc3NmdWxseS5cIn0pO1xyXG5cdFx0fSkuY2F0Y2goIChlcnIpID0+IHtcclxuXHRcdFx0Y29uc29sZS5sb2coZXJyKTtcclxuXHRcdFx0dGhpcy5wcm9wcy5ub3RpZmljYXRpb24uY3JlYXRlKHttZXNzYWdlOlwiVGhlcmUgd2FzIGFuIGVycm9yIGdldHRpbmcgeW91ciBrZXlzLlwiLCB0eXBlOlwiZGFuZ2VyXCJ9KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0aGFuZGxlQ2hhbmdlOiBmdW5jdGlvbihlKXtcclxuXHRcdHZhciBudW1iZXIgPSBlLnRhcmdldC52YWx1ZTtcclxuXHRcdHNhbXBsZS5saW5rLnBob25lID0gbnVtYmVyO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGhvbmU6bnVtYmVyfSk7XHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImRvY3NcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtaGVhZGVyXCI+RG9jdW1lbnRhdGlvbjwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGNvbmZpZ3VyZVwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBtYXJnaW4tYm90dG9tLTI1IHZlcnRpY2FsLWFsaWduXCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTJcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2l6ZS0yNFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRTZW5kIFRyYW5zYWN0aW9uPGJyLz5cclxuXHRcdFx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInJlcXVlc3RNZXRob2RcIj5QT1NUPC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cInJlcXVlc3RSb3V0ZVwiPi90cmFuc2FjdGlvbjwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IG1hcmdpbi1ib3R0b20tMTVcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj5QaG9uZSBOdW1iZXI8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLm5hbWV9Lz5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17dGhpcy5zZW5kUmVjZWlwdH0+VHJ5PC9idXR0b24+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGNvZGVcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzYW1wbGVIZWFkZXIgbWFyZ2luLWJvdHRvbS0xNVwiPkhlYWRlcnM8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PHNwYW4+QXV0aG9yaXphdGlvbjoge3RoaXMuc3RhdGUuYmFzaWNUb2tlbn0gPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNhbXBsZUhlYWRlciAgbWFyZ2luLXRvcC0xNVwiPkJvZHk8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGNvZGUgY2xhc3NOYW1lPVwiY29kZVwiPlxyXG5cdFx0XHRcdFx0XHRcdHtKU09OLnN0cmluZ2lmeShzYW1wbGUsIG51bGwsIDIpfVxyXG5cdFx0XHRcdFx0XHQ8L2NvZGU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBjb25maWd1cmVcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgbWFyZ2luLWJvdHRvbS0yNSB2ZXJ0aWNhbC1hbGlnblwiPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJmb250LXNpemUtMjRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0R2V0IFRyYW5zYWN0aW9uPGJyLz5cclxuXHRcdFx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInJlcXVlc3RNZXRob2RcIj5HRVQ8L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwicmVxdWVzdFJvdXRlXCI+L3RyYW5zYWN0aW9uLzpyZWZlcmVuY2VUb2tlbjwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IG1hcmdpbi1ib3R0b20tMTVcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj5SZWZlcmVuY2UgVG9rZW48L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLm5hbWV9Lz5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCI+VHJ5PC9idXR0b24+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGNvZGVcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzYW1wbGVIZWFkZXIgbWFyZ2luLWJvdHRvbS0xNVwiPkhlYWRlcnM8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PHNwYW4+QXV0aG9yaXphdGlvbjoge3RoaXMuc3RhdGUuYmFzaWNUb2tlbn0gPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNhbXBsZUhlYWRlciAgbWFyZ2luLXRvcC0xNVwiPkJvZHk8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGNvZGUgY2xhc3NOYW1lPVwiY29kZVwiPlxyXG5cdFx0XHRcdFx0XHQ8L2NvZGU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsImltcG9ydCB7IFJlYWN0IH0gZnJvbSAnLi4vY2RuJ1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvRm9vdGVyLmpzJ1xyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPVwic3VwcG9ydFwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZS1oZWFkZXJcIj5TdXBwb3J0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdERPTSwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuL2NkbidcclxuaW1wb3J0IEF1dGhlbnRpY2F0ZSBmcm9tICcuL2NsYXNzZXMvQXV0aGVudGljYXRlJ1xyXG5cclxuaW1wb3J0IEFwcCBmcm9tICcuL2FwcC5qcydcclxuaW1wb3J0IEF1dGggZnJvbSAnLi92aWV3cy9hdXRoJ1xyXG5pbXBvcnQgRGFzaCBmcm9tICcuL3ZpZXdzL2Rhc2gnXHJcbmltcG9ydCBBY2NvdW50IGZyb20gJy4vdmlld3MvYWNjb3VudCdcclxuaW1wb3J0IERvY3MgZnJvbSAnLi92aWV3cy9kb2NzJ1xyXG5pbXBvcnQgU3VwcG9ydCBmcm9tICcuL3ZpZXdzL3N1cHBvcnQnXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xyXG5pbXBvcnQgVXNlciBmcm9tICcuL2NsYXNzZXMvVXNlcidcclxuXHJcbnZhciBSb3V0ZXIgPSBSZWFjdFJvdXRlci5Sb3V0ZXI7XHJcbnZhciBSb3V0ZSA9IFJlYWN0Um91dGVyLlJvdXRlO1xyXG52YXIgYnJvd3Nlckhpc3RvcnkgPSBSZWFjdFJvdXRlci5icm93c2VySGlzdG9yeTtcclxuXHJcbi8vIHZhbGlkYXRlIGF1dGhlbnRpY2F0aW9uIGZvciBwcml2YXRlIHJvdXRlc1xyXG5jb25zdCByZXF1aXJlQXV0aCA9IChuZXh0U3RhdGUsIHJlcGxhY2UpID0+IHtcclxuXHRpZiAoIUF1dGhlbnRpY2F0ZS5pc0xvZ2dlZEluKCkpIHtcclxuXHRcdGJyb3dzZXJIaXN0b3J5LnB1c2goXCJkYXNoXCIpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG5SZWFjdERPTS5yZW5kZXIoKFxyXG5cdDxSb3V0ZXIgaGlzdG9yeT17YnJvd3Nlckhpc3Rvcnl9PlxyXG5cdFx0PFJvdXRlIGNvbXBvbmVudD17QXBwfT5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJhdXRoXCIgY29tcG9uZW50PXtBdXRofS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiZG9jc1wiIGNvbXBvbmVudD17RG9jc30vPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cImRhc2hcIiBjb21wb25lbnQ9e0Rhc2h9IG9uRW50ZXI9e3JlcXVpcmVBdXRofS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiYWNjb3VudFwiIGNvbXBvbmVudD17QWNjb3VudH0gb25FbnRlcj17cmVxdWlyZUF1dGh9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzdXBwb3J0XCIgY29tcG9uZW50PXtTdXBwb3J0fS8+XHJcblx0XHQ8L1JvdXRlPlxyXG5cdDwvUm91dGVyPlxyXG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xyXG4iXX0=
