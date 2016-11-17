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

},{"../config.js":1,"./cdn":3,"./classes/User.js":6,"./classes/Utilities":7,"./components/header.js":8,"./components/nav":9,"./components/notifications.js":10}],3:[function(require,module,exports){
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

},{"../../config.js":1,"../cdn":3,"../classes/Authenticate.js":4}],9:[function(require,module,exports){
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

},{"../cdn":3,"../classes/User.js":6}],10:[function(require,module,exports){
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

},{"../cdn":3}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"../cdn":3,"../classes/Authenticate":4,"../classes/Key":5,"../classes/User":6}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require('../cdn');

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

},{"../cdn":3,"../classes/Authenticate":4}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require("../cdn");

exports.default = _cdn.React.createClass({
	displayName: "dash",


	render: function render() {
		return _cdn.React.createElement(
			"div",
			{ id: "dash" },
			_cdn.React.createElement(
				"div",
				{ className: "page-header" },
				"Dashboard"
			)
		);
	}
});

},{"../cdn":3}],15:[function(require,module,exports){
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

console.log(_config2.default);

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

},{"../../config.js":1,"../cdn":3,"../classes/User":6,"../data/transactionSample":11}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require("../cdn");

exports.default = _cdn.React.createClass({
	displayName: "support",


	render: function render() {
		return _cdn.React.createElement(
			"div",
			{ id: "support" },
			_cdn.React.createElement(
				"div",
				{ className: "page-header" },
				"Support"
			)
		);
	}
});

},{"../cdn":3}],17:[function(require,module,exports){
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

},{"../config":1,"./app.js":2,"./cdn":3,"./classes/Authenticate":4,"./classes/User":6,"./views/account":12,"./views/auth":13,"./views/dash":14,"./views/docs":15,"./views/support":16}]},{},[17])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcY2RuLmpzIiwic3JjXFxjbGFzc2VzXFxBdXRoZW50aWNhdGUuanMiLCJzcmNcXGNsYXNzZXNcXEtleS5qcyIsInNyY1xcY2xhc3Nlc1xcVXNlci5qcyIsInNyY1xcY2xhc3Nlc1xcVXRpbGl0aWVzLmpzIiwic3JjXFxjb21wb25lbnRzXFxoZWFkZXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXG5hdi5qcyIsInNyY1xcY29tcG9uZW50c1xcbm90aWZpY2F0aW9ucy5qcyIsInNyY1xcZGF0YVxcdHJhbnNhY3Rpb25TYW1wbGUuanMiLCJzcmNcXHZpZXdzXFxhY2NvdW50LmpzIiwic3JjXFx2aWV3c1xcYXV0aC5qcyIsInNyY1xcdmlld3NcXGRhc2guanMiLCJzcmNcXHZpZXdzXFxkb2NzLmpzIiwic3JjXFx2aWV3c1xcc3VwcG9ydC5qcyIsInNyY1xcd2ViLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQ0EsSUFBSSxjQUFjLGFBQWxCO2tCQUNlO0FBQ2QsY0FBYSxXQURDO0FBRWQsVUFBVSxZQUFVO0FBQ25CLE1BQUcsZUFBZSxZQUFsQixFQUFnQyxPQUFPLDZCQUFQLENBQWhDLEtBQ0ssT0FBTyx1QkFBUDtBQUNMLEVBSFMsRUFGSTtBQU1kLFVBQVUsWUFBVTtBQUNuQixNQUFHLGVBQWUsWUFBbEIsRUFBZ0MsT0FBTyw2QkFBUCxDQUFoQyxLQUNLLE9BQU8sdUJBQVA7QUFDTCxFQUhTLEVBTkk7QUFVZCxRQUFNO0FBQ0wsWUFBVSxrQ0FETDtBQUVMLFVBQVE7QUFGSDtBQVZRLEM7Ozs7Ozs7OztBQ0ZmOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUksaUJBQWlCLGlCQUFZLGNBQWpDOztrQkFFZSxXQUFNLFdBQU4sQ0FBa0I7QUFBQTs7QUFDaEMs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c0JBQUMsS0FBRCxJQUFPLE1BQUssTUFBWixFQUFtQix5QkFBbkIsRUFBb0MsU0FBUyxXQUE3QyxHQUhEO0FBSUMsc0JBQUMsS0FBRCxJQUFPLE1BQUssU0FBWixFQUFzQiw0QkFBdEIsRUFBMEMsU0FBUyxXQUFuRCxHQUpEO0FBS0Msc0JBQUMsS0FBRCxJQUFPLE1BQUssU0FBWixFQUFzQiw0QkFBdEI7QUFMRDtBQURELENBREQsRUFVRyxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FWSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxudmFyIGVudmlyb25tZW50ID0gXCJkZXZlbG9wbWVudFwiO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0ZW52aXJvbm1lbnQ6IGVudmlyb25tZW50LFxyXG5cdGFwaUhvc3Q6IChmdW5jdGlvbigpe1xyXG5cdFx0aWYoZW52aXJvbm1lbnQgPT0gXCJwcm9kdWN0aW9uXCIpIHJldHVybiBcImh0dHA6Ly9hcGl0ZXN0LmZsZWN0aW5vLmNvbVwiO1xyXG5cdFx0ZWxzZSByZXR1cm4gXCJodHRwOi8vbG9jYWxob3N0OjMwMTBcIjtcclxuXHR9KCkpLFxyXG5cdHdlYkhvc3Q6IChmdW5jdGlvbigpe1xyXG5cdFx0aWYoZW52aXJvbm1lbnQgPT0gXCJwcm9kdWN0aW9uXCIpIHJldHVybiBcImh0dHA6Ly93ZWJ0ZXN0LmZsZWN0aW5vLmNvbVwiO1xyXG5cdFx0ZWxzZSByZXR1cm4gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcclxuXHR9KCkpLFxyXG5cdGF1dGgwOntcclxuXHRcdGNsaWVudElkOiBcIjBTTTBnckJUb0NKaldHVWJCdGxadUhoeWxDcTJkVnQzXCIsXHJcblx0XHRkb21haW46IFwiZmxlY3Rpbm8uYXV0aDAuY29tXCJcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVhY3QsIFJlYWN0Um91dGVyfSBmcm9tICcuL2NkbidcclxuaW1wb3J0IEhlYWRlciBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyLmpzJ1xyXG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuL2NvbXBvbmVudHMvbm90aWZpY2F0aW9ucy5qcydcclxuaW1wb3J0IE5hdiBmcm9tICcuL2NvbXBvbmVudHMvbmF2J1xyXG5pbXBvcnQgeyBnZXRRdWVyeVZhcmlhYmxlIH0gZnJvbSAnLi9jbGFzc2VzL1V0aWxpdGllcydcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi9jbGFzc2VzL1VzZXIuanMnXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnLmpzJ1xyXG5cclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybntcclxuXHRcdFx0bm90aWZpY2F0aW9uczpbXVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y3JlYXRlTm90aWZpY2F0aW9uOiBmdW5jdGlvbihub3RpZmljYXRpb24pe1xyXG5cdFx0dmFyIG5vdGlmaWNhdGlvbnMgPSB0aGlzLnN0YXRlLm5vdGlmaWNhdGlvbnM7XHJcblx0XHRub3RpZmljYXRpb25zLnB1c2gobm90aWZpY2F0aW9uKTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbnM6bm90aWZpY2F0aW9uc30pO1xyXG5cclxuXHRcdHJldHVybjtcclxuXHR9LFxyXG5cdHJlbW92ZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obkluZGV4KXtcclxuXHRcdHZhciBub3RpZmljYXRpb25zID0gdGhpcy5zdGF0ZS5ub3RpZmljYXRpb25zO1xyXG5cdFx0bm90aWZpY2F0aW9ucy5zcGxpY2UobkluZGV4LDEpO1xyXG5cdFx0cmV0dXJuIHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbnM6bm90aWZpY2F0aW9uc30pO1xyXG5cdH0sXHJcblx0cmV0cmlldmVOb3RpZmljYXRpb25zOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUubm90aWZpY2F0aW9ucztcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6ZnVuY3Rpb24obmV4dFByb3BzKXtcclxuXHRcdC8vIFJlbW92ZSBub3RpZmljYXRpb25zIHdoZW4gdmlldyBjaGFuZ2VzXHJcblx0XHRpZih0aGlzLnByb3BzLmxvY2F0aW9uLnBhdGhuYW1lICE9IG5leHRQcm9wcy5sb2NhdGlvbi5wYXRobmFtZSl7XHJcblx0XHRcdHZhciBub3RpZmljYXRpb25zID0gW107XHJcblx0XHRcdGlmICh0eXBlb2YgbmV4dFByb3BzLmxvY2F0aW9uLnF1ZXJ5Lm1lc3NhZ2UgIT0gXCJ1bmRlZmluZWRcIikgbm90aWZpY2F0aW9ucy5wdXNoKHttZXNzYWdlOm5leHRQcm9wcy5sb2NhdGlvbi5xdWVyeS5tZXNzYWdlfSk7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbnM6bm90aWZpY2F0aW9uc30pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0dmFyIG5vdGlmaWNhdGlvbnMgPSB0aGlzLnN0YXRlLm5vdGlmaWNhdGlvbnM7XHJcblx0XHRpZiAodHlwZW9mIGdldFF1ZXJ5VmFyaWFibGUoXCJtZXNzYWdlXCIpICE9IFwidW5kZWZpbmVkXCIpIG5vdGlmaWNhdGlvbnMucHVzaCh7bWVzc2FnZTpnZXRRdWVyeVZhcmlhYmxlKFwibWVzc2FnZVwiKS5zcGxpdChcIitcIikuam9pbihcIiBcIil9KTtcclxuXHJcblx0XHRyZXR1cm47XHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0dmFyIHZpZXcgPSB0aGlzLnByb3BzLnJvdXRlc1sxXTtcclxuXHRcdHZhciBwYXNzID0ge1xyXG5cdFx0XHRub3RpZmljYXRpb246e1xyXG5cdFx0XHRcdGNyZWF0ZTogdGhpcy5jcmVhdGVOb3RpZmljYXRpb24sXHJcblx0XHRcdFx0cmVtb3ZlOiB0aGlzLnJlbW92ZU5vdGlmaWNhdGlvbixcclxuXHRcdFx0XHRyZXRyaWV2ZTogdGhpcy5yZXRyaWV2ZU5vdGlmaWNhdGlvbnNcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuICAgICAgICAgPGRpdj5cclxuXHRcdFx0XHQ8Tm90aWZpY2F0aW9ucyBub3RpZmljYXRpb249e3Bhc3Mubm90aWZpY2F0aW9ufS8+XHJcbiAgICAgICAgICAgIDxIZWFkZXIgbm90aWZpY2F0aW9uPXtwYXNzLm5vdGlmaWNhdGlvbn0vPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZS1ib2R5XCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBmaXgtd2lkdGhcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgdmlld1wiPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyXCI+XHJcblx0XHRcdFx0XHRcdFx0XHR7UmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2hpbGRyZW4sIHBhc3MpfVxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG4gICAgICAgICA8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuIiwiXHJcbnZhciAkID0gd2luZG93LiQ7XHJcbnZhciBqUXVlcnkgPSAkO1xyXG52YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3Q7XHJcbnZhciBSZWFjdERPTSA9IHdpbmRvdy5SZWFjdERPTTtcclxudmFyIFJlYWN0Um91dGVyID0gd2luZG93LlJlYWN0Um91dGVyO1xyXG52YXIgQXV0aDBMb2NrID0gd2luZG93LkF1dGgwTG9jaztcclxudmFyIExvZGFzaCA9IHdpbmRvdy5fO1xyXG5leHBvcnQgeyAkLCBqUXVlcnksIFJlYWN0LCBSZWFjdERPTSwgUmVhY3RSb3V0ZXIsIEF1dGgwTG9jaywgTG9kYXNoIH1cclxuIiwiaW1wb3J0IHsgQXV0aDBMb2NrLCBSZWFjdFJvdXRlciB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi9Vc2VyJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZydcclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRoZW50aWNhdGV7XHJcblxyXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnM9e30pIHtcclxuXHRcdHZhciBsb2NrU2V0dGluZ3MgPSB7XHJcblx0XHRcdGFsbG93ZWRDb25uZWN0aW9uczogWydmbGVjdGluby1kZXYnLCAnZ2l0aHViJywgJ2dvb2dsZS1vYXV0aDInXSxcclxuXHRcdFx0c29jaWFsQnV0dG9uU3R5bGU6ICdzbWFsbCcsXHJcblx0XHRcdGxhbmd1YWdlRGljdGlvbmFyeToge1xyXG5cdFx0XHRcdHRpdGxlOiBcIkhpXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0dGhlbWU6e1xyXG5cdFx0XHRcdGxvZ286ICdodHRwOi8vaW1nMDYuZGV2aWFudGFydC5uZXQvY2U4Ni9pLzIwMTMvMDI3LzEvNS9iYXRtYW5fbG9nb19vbmx5X2J5X2RlYXRob25hYnVuLWQ1c3dmMnUucG5nJyxcclxuXHRcdFx0XHRwcmltYXJ5Q29sb3I6ICcjMDBhMDhhJ1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0aWYgKHR5cGVvZiBvcHRpb25zLmluaXRpYWxTY3JlZW4gIT1cInVuZGVmaW5lZFwiKSBsb2NrU2V0dGluZ3MuaW5pdGlhbFNjcmVlbiA9IG9wdGlvbnMuaW5pdGlhbFNjcmVlbjtcclxuXHRcdGlmICh0eXBlb2Ygb3B0aW9ucy5hbGxvd0xvZ2luICE9XCJ1bmRlZmluZWRcIikgbG9ja1NldHRpbmdzLmFsbG93TG9naW4gPSBvcHRpb25zLmFsbG93TG9naW47XHJcblx0XHRpZiAodHlwZW9mIG9wdGlvbnMuY29udGFpbmVyICE9XCJ1bmRlZmluZWRcIikgbG9ja1NldHRpbmdzLmNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyO1xyXG5cdFx0Ly8gQ29uZmlndXJlIEF1dGgwXHJcblx0XHR0aGlzLmxvY2sgPSBuZXcgQXV0aDBMb2NrKGNvbmZpZy5hdXRoMC5jbGllbnRJZCwgY29uZmlnLmF1dGgwLmRvbWFpbiwgbG9ja1NldHRpbmdzKTtcclxuXHRcdC8vIEFkZCBjYWxsYmFjayBmb3IgbG9jayBgYXV0aGVudGljYXRlZGAgZXZlbnRcclxuXHRcdHRoaXMubG9jay5vbignYXV0aGVudGljYXRlZCcsIHRoaXMub25BdXRoZW50aWNhdGlvbi5iaW5kKHRoaXMpKVxyXG5cdFx0Ly8gYmluZHMgbG9naW4gZnVuY3Rpb25zIHRvIGtlZXAgdGhpcyBjb250ZXh0XHJcblx0XHR0aGlzLmxvZ2luID0gdGhpcy5sb2dpbi5iaW5kKHRoaXMpXHJcblx0fVxyXG5cclxuXHRvbkF1dGhlbnRpY2F0aW9uKGF1dGhSZXN1bHQpe1xyXG5cdCAgIC8vIFNhdmVzIHRoZSB1c2VyIHRva2VuXHJcblx0XHR0aGlzLnNldFRva2VuKGF1dGhSZXN1bHQuaWRUb2tlbik7XHJcblx0XHR3aW5kb3cubG9jYXRpb24gPSBcIi9kYXNoXCI7XHJcblx0fVxyXG5cclxuXHRzZXRQcm9maWxlKHByb2ZpbGUpe1xyXG5cdFx0Ly8gU2F2ZXMgcHJvZmlsZSBkYXRhIHRvIGxvY2FsU3RvcmFnZVxyXG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2ZpbGUnLCBKU09OLnN0cmluZ2lmeShwcm9maWxlKSlcclxuXHR9XHJcblxyXG5cdGxvZ2luKCkge1xyXG5cdFx0Ly8gQ2FsbCB0aGUgc2hvdyBtZXRob2QgdG8gZGlzcGxheSB0aGUgd2lkZ2V0LlxyXG5cdFx0dGhpcy5sb2NrLnNob3coKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGlzTG9nZ2VkSW4oKXtcclxuXHRcdC8vIENoZWNrcyBpZiB0aGVyZSBpcyBhIHNhdmVkIHRva2VuIGFuZCBpdCdzIHN0aWxsIHZhbGlkXHJcblx0XHRyZXR1cm4gISFVc2VyLmdldFRva2VuKClcclxuXHR9XHJcblxyXG5cdHNldFRva2VuKGlkVG9rZW4pe1xyXG5cdFx0Ly8gU2F2ZXMgdXNlciB0b2tlbiB0byBsb2NhbFN0b3JhZ2VcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZF90b2tlbicsIGlkVG9rZW4pO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGxvZ291dCgpe1xyXG5cdFx0Ly8gQ2xlYXIgdXNlciB0b2tlbiBhbmQgcHJvZmlsZSBkYXRhIGZyb20gbG9jYWxTdG9yYWdlXHJcblx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnaWRfdG9rZW4nKTtcclxuXHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdwcm9maWxlJyk7XHJcblx0XHR3aW5kb3cubG9jYXRpb24gPSBcIi9cIjtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCB7IEF1dGgwTG9jaywgUmVhY3RSb3V0ZXIgfSBmcm9tICcuLi9jZG4nXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnLmpzJ1xyXG5pbXBvcnQgVXNlciBmcm9tICcuL1VzZXInO1xyXG52YXIgYnJvd3Nlckhpc3RvcnkgPSBSZWFjdFJvdXRlci5icm93c2VySGlzdG9yeTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2V5IHtcclxuXHJcblx0c3RhdGljIHVwZGF0ZShwb3N0RGF0YSwgdXNlcil7XHJcblx0XHRyZXR1cm4gVXNlci5nZXRCYXNpY1Rva2VuKCkudGhlbihmdW5jdGlvbihiYXNpYyl7XHJcblx0XHRcdHJldHVybiAkLmFqYXgoe1xyXG5cdFx0XHRcdHVybDogY29uZmlnLmFwaUhvc3QgKyBcIi92MS9rZXlcIixcclxuXHRcdFx0XHR0eXBlOiBcInBvc3RcIixcclxuXHRcdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XHRBdXRob3JpemF0aW9uOiBiYXNpYyxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGRhdGE6cG9zdERhdGFcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgTG9kYXNoIH0gZnJvbSAnLi4vY2RuJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZy5qcydcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlciB7XHJcblxyXG5cdHN0YXRpYyBnZXRQcm9maWxlKCl7XHJcblx0XHQvLyBSZXRyaWV2ZXMgdGhlIHByb2ZpbGUgZGF0YSBmcm9tIGxvY2FsU3RvcmFnZVxyXG5cdFx0Y29uc3QgcHJvZmlsZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9maWxlJylcclxuXHRcdHJldHVybiBwcm9maWxlID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UucHJvZmlsZSkgOiB7fTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXRGdWxsUHJvZmlsZSgpe1xyXG5cdFx0cmV0dXJuICQuYWpheCh7XHJcblx0XHRcdHVybDogY29uZmlnLmFwaUhvc3QgKyBcIi91c2VyXCIsXHJcblx0XHRcdHR5cGU6IFwiZ2V0XCIsXHJcblx0XHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0XHRBdXRob3JpemF0aW9uOiBcIkJlYXJlciBcIiArIFVzZXIuZ2V0VG9rZW4oKVxyXG5cdFx0XHR9XHJcblx0XHR9KS5jYXRjaCgoZXJyKT0+e1xyXG5cdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHRpZiAoZXJyLnN0YXR1cyA9PSA0MDMpIHRoaXMubG9nb3V0KCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXRUb2tlbigpe1xyXG5cdFx0Ly8gUmV0cmlldmVzIHRoZSB1c2VyIHRva2VuIGZyb20gbG9jYWxTdG9yYWdlXHJcblx0XHRyZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJyk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0QmFzaWNUb2tlbigpe1xyXG5cdFx0cmV0dXJuIFVzZXIuZ2V0RnVsbFByb2ZpbGUoKS50aGVuKGZ1bmN0aW9uKHByb2ZpbGUpe1xyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFwiQmFzaWMgXCIgKyB3aW5kb3cuYnRvYShwcm9maWxlLnVzZXJfaWQgKyBcIjpcIiArIHByb2ZpbGUua2V5c1swXS50b2tlbikpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHR1cGRhdGUocG9zdERhdGEpe1xyXG5cdFx0cmV0dXJuICQuYWpheCh7XHJcblx0XHRcdHVybDogY29uZmlnLmFwaUhvc3QgKyBcIi91c2Vycy9cIiArIHRoaXMuZ2V0UHJvZmlsZSgpLnVzZXJfaWQsXHJcblx0XHRcdHR5cGU6IFwicGF0Y2hcIixcclxuXHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdEF1dGhvcml6YXRpb246IFwiQmVhcmVyIFwiICsgdGhpcy5nZXRUb2tlbigpLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRkYXRhOnBvc3REYXRhXHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuIiwiXHJcblxyXG52YXIgZ2V0UXVlcnlWYXJpYWJsZSA9IGZ1bmN0aW9uKHZhcmlhYmxlKSB7XHJcblx0dmFyIHF1ZXJ5ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSk7XHJcblx0dmFyIHByZVZhcnMgPSBxdWVyeS5zcGxpdCgnLycpO1xyXG5cdHZhciB2YXJzID0gcHJlVmFyc1swXS5zcGxpdCgnJicpO1xyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIHBhaXIgPSB2YXJzW2ldLnNwbGl0KCc9Jyk7XHJcblx0XHRpZiAoZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pID09IHZhcmlhYmxlKSB7XHJcblx0XHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGNvbnNvbGUubG9nKCdRdWVyeSB2YXJpYWJsZSAlcyBub3QgZm91bmQnLCB2YXJpYWJsZSk7XHJcbn1cclxuXHJcbnZhciBpc1ZhbGlkID0ge1xyXG5cdGVtYWlsOiBmdW5jdGlvbihlbWFpbCkge1xyXG5cdFx0dmFyIHJlID0gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcblx0XHRyZXR1cm4gcmUudGVzdChlbWFpbCk7XHJcblx0fSxcclxuXHRwaG9uZTogZnVuY3Rpb24ocGhvbmUpIHtcclxuXHRcdHZhciBzdHJpcFBob25lID0gcGhvbmUucmVwbGFjZSgvXFxEL2csJycpO1xyXG5cdFx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID49IDEwKSByZXR1cm4gdHJ1ZTtcclxuXHRcdGVsc2UgZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG52YXIgZm9ybWF0UGhvbmUxMCA9IGZ1bmN0aW9uKHBob25lKXtcclxuXHR2YXIgc3RyaXBQaG9uZSA9IHBob25lLnJlcGxhY2UoL1xcRC9nLCcnKTtcclxuXHR2YXIgZGFzaCA9IFwiXCI7XHJcblx0dmFyIG9wZW5QYXJlbiA9IFwiXCI7XHJcblx0dmFyIGNsb3NlZFBhcmVuID0gXCJcIjtcclxuXHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPiAwKSBvcGVuUGFyZW4gPSBcIihcIjtcclxuXHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPiAzKSBjbG9zZWRQYXJlbiA9IFwiKVwiO1xyXG5cdGlmIChzdHJpcFBob25lLmxlbmd0aCA+IDYpIGRhc2ggPSBcIi1cIjtcclxuXHR2YXIgZm9ybWF0dGVkUGhvbmUgPSBvcGVuUGFyZW4gKyBzdHJpcFBob25lLnN1YnN0cmluZygwLDMpICsgY2xvc2VkUGFyZW4gKyBzdHJpcFBob25lLnN1YnN0cmluZygzLDYpICsgZGFzaCArIHN0cmlwUGhvbmUuc3Vic3RyaW5nKDYsMTApO1xyXG5cdHJldHVybiBmb3JtYXR0ZWRQaG9uZTtcclxufVxyXG5cclxudmFyIGdldFRpbWV6b25lT2Zmc2V0ID0gZnVuY3Rpb24oKXtcclxuXHRmdW5jdGlvbiBwYWQobnVtYmVyLCBsZW5ndGgpe1xyXG5cdFx0IHZhciBzdHIgPSBcIlwiICsgbnVtYmVyXHJcblx0XHQgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHtcclxuXHRcdFx0ICBzdHIgPSAnMCcrc3RyXHJcblx0XHQgfVxyXG5cdFx0IHJldHVybiBzdHJcclxuXHR9XHJcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdHZhciBvZmZzZXQgPSBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XHJcblx0cmV0dXJuICgob2Zmc2V0PDA/ICcrJzonLScpICsgcGFkKHBhcnNlSW50KE1hdGguYWJzKG9mZnNldC82MCkpLCAyKSsgcGFkKE1hdGguYWJzKG9mZnNldCU2MCksIDIpKTtcclxufVxyXG5cclxudmFyIGNyZWF0ZVRpbWVEYXRlID0gZnVuY3Rpb24oZGF0ZSwgdGltZSl7XHJcblx0dmFyIG1pbGVzdG9uZURhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuXHR2YXIgc3RyU3BsaXQgPSB0aW1lLnNwbGl0KCc6Jyk7XHJcblx0dmFyIGhvdXIgPSBwYXJzZUludChzdHJTcGxpdFswXSk7XHJcblx0dmFyIG1pbnV0ZSA9IHBhcnNlSW50KHN0clNwbGl0WzFdLnN1YnN0cmluZygwLDIpKTtcclxuXHR2YXIgc2V0ID0gc3RyU3BsaXRbMV0uc3Vic3RyaW5nKDIsNCk7XHJcblx0aWYgKGhvdXIgPT09IDEyKSB7XHJcblx0XHRpZiAoc2V0ID09PSBcImFtXCIpIGhvdXIgPSAwO1xyXG5cdFx0ZWxzZSBob3VyID0gMTI7XHJcblx0fSBlbHNlIGlmIChzZXQgPT09IFwicG1cIikgaG91ciArPSAxMjtcclxuXHRtaWxlc3RvbmVEYXRlLnNldEhvdXJzKGhvdXIpO1xyXG5cdG1pbGVzdG9uZURhdGUuc2V0TWludXRlcyhtaW51dGUpO1xyXG5cdG1pbGVzdG9uZURhdGUuc2V0TWludXRlcyhtaWxlc3RvbmVEYXRlLmdldE1pbnV0ZXMoKSAtICBtaWxlc3RvbmVEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkpO1xyXG5cdHJldHVybiBtaWxlc3RvbmVEYXRlLnRvSVNPU3RyaW5nKCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBnZXRRdWVyeVZhcmlhYmxlLCBpc1ZhbGlkLCBmb3JtYXRQaG9uZTEwLCBnZXRUaW1lem9uZU9mZnNldCwgY3JlYXRlVGltZURhdGUgfVxyXG4iLCJpbXBvcnQgeyBSZWFjdCwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuLi9jZG4nXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnLmpzJ1xyXG5pbXBvcnQgQXV0aGVudGljYXRlIGZyb20gJy4uL2NsYXNzZXMvQXV0aGVudGljYXRlLmpzJ1xyXG5cclxudmFyIExpbmsgPSBSZWFjdFJvdXRlci5MaW5rO1xyXG52YXIgYnJvd3Nlckhpc3RvcnkgPSBSZWFjdFJvdXRlci5icm93c2VySGlzdG9yeTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJue1xyXG5cdFx0XHRhdXRoZW50aWNhdGU6e30sXHJcblx0XHRcdG5hdjpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bmFtZTogXCJEYXNoYm9hcmRcIixcclxuXHRcdFx0XHRcdGxpbms6IFwiZGFzaFwiLFxyXG5cdFx0XHRcdFx0cHJpdmF0ZTogdHJ1ZVxyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0bmFtZTpcIkFjY291bnRcIixcclxuXHRcdFx0XHRcdGxpbms6XCJhY2NvdW50XCIsXHJcblx0XHRcdFx0XHRwcml2YXRlOiB0cnVlXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOiBcIlN1cHBvcnRcIixcclxuXHRcdFx0XHRcdGxpbms6IFwic3VwcG9ydFwiLFxyXG5cdFx0XHRcdFx0cHJpdmF0ZTogdHJ1ZVxyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0bmFtZTogXCJEb2N1bWVudGF0aW9uXCIsXHJcblx0XHRcdFx0XHRsaW5rOiBcImRvY3NcIixcclxuXHRcdFx0XHRcdHByaXZhdGU6IHRydWVcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiTG9nb3V0XCIsXHJcblx0XHRcdFx0XHRsaW5rOlwibG9nb3V0XCIsXHJcblx0XHRcdFx0XHRwcml2YXRlOiB0cnVlXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOiBcIkxvZ2luXCIsXHJcblx0XHRcdFx0XHRsaW5rOlwibG9naW5cIixcclxuXHRcdFx0XHRcdHByaXZhdGU6IGZhbHNlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHJcblx0XHR9XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcclxuXHRcdHZhciBhdXRoZW50aWNhdGUgPSBuZXcgQXV0aGVudGljYXRlKCk7XHJcblx0XHR0aGlzLnNldFN0YXRlKHthdXRoZW50aWNhdGU6YXV0aGVudGljYXRlfSlcclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImhlYWRlclwiPlxyXG5cdFx0XHRcdDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1maXhlZC10b3BcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGZpeC13aWR0aFwiPlxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiI1wiPkZsZWN0aW5vPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwibmF2IG5hdmJhci1uYXYgZmxvYXQteHMtcmlnaHRcIj5cclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnN0YXRlLm5hdi5tYXAoKGl0ZW0sIGkpPT57XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmKEF1dGhlbnRpY2F0ZS5pc0xvZ2dlZEluKCkgJiYgaXRlbS5wcml2YXRlKSByZXR1cm4oXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGxpIGtleT17aX0gY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KGl0ZW0ubmFtZSA9PSBcIkxvZ291dFwiKT9cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGEgaHJlZj1cImphdmFzY3JpcHQ6XCIgY2xhc3NOYW1lPVwibmF2LWxpbmtcIiBvbkNsaWNrPXtBdXRoZW50aWNhdGUubG9nb3V0fT57aXRlbS5uYW1lfTwvYT46XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxMaW5rIHRvPXtpdGVtLmxpbmt9IGNsYXNzTmFtZT1cIm5hdi1saW5rXCI+e2l0ZW0ubmFtZX08L0xpbms+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZighQXV0aGVudGljYXRlLmlzTG9nZ2VkSW4oKSAmJiAhaXRlbS5wcml2YXRlKSByZXR1cm4oXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGxpIGtleT17aX0gY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgb25DbGljaz17dGhpcy5zdGF0ZS5hdXRoZW50aWNhdGUubG9naW59PntpdGVtLm5hbWV9PC9hPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQ8L3VsPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9uYXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuLi9jZG4nXHJcbmltcG9ydCBVc2VyIGZyb20gJy4uL2NsYXNzZXMvVXNlci5qcydcclxuXHJcbnZhciBMaW5rID0gUmVhY3RSb3V0ZXIuTGluaztcclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybntcclxuXHRcdFx0bmF2OltcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRuYW1lOiBcIkRhc2hib2FyZFwiLFxyXG5cdFx0XHRcdFx0bGluazogXCJkYXNoXCIsXHJcblx0XHRcdFx0XHRpY29uOiBcImZhLWJhci1jaGFydFwiXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOlwiQWNjb3VudFwiLFxyXG5cdFx0XHRcdFx0bGluazpcImFjY291bnRcIixcclxuXHRcdFx0XHRcdGljb246IFwiZmEtdXNlci1vXCJcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiU3VwcG9ydFwiLFxyXG5cdFx0XHRcdFx0bGluazogXCJzdXBwb3J0XCIsXHJcblx0XHRcdFx0XHRpY29uOiBcImZhLWNvbW1lbnQtb1wiXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOiBcIkRvY3VtZW50YXRpb25cIixcclxuXHRcdFx0XHRcdGxpbms6IFwiZG9jc1wiLFxyXG5cdFx0XHRcdFx0aWNvbjogXCJmYS1ib29rXCJcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiTG9nb3V0XCIsXHJcblx0XHRcdFx0XHRsaW5rOlwibG9nb3V0XCIsXHJcblx0XHRcdFx0XHRpY29uOiBcImZhLXNpZ24tb3V0XCJcclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGxvZ291dDogZnVuY3Rpb24oKXtcclxuXHRcdFVzZXIuZGVsZXRlQXV0aG9yaXphdGlvbigpO1xyXG5cdFx0YnJvd3Nlckhpc3RvcnkucHVzaChcImxvZ2luXCIpO1xyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHZhciBmcmFnID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3BsaXQoXCI/XCIpWzBdO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cIm5hdlwiPlxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRoaXMuc3RhdGUubmF2Lm1hcCgoaXRlbSwgaSk9PntcclxuXHRcdFx0XHRcdFx0aWYgKGl0ZW0ubmFtZSA9PSBcIkxvZ291dFwiKSByZXR1cm4oXHJcblx0XHRcdFx0XHRcdFx0PGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cImxpbmtCb3hcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIG9uQ2xpY2s9e3RoaXMucHJvcHMudXNlci5sb2dvdXR9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9e1wiZmEgZmEtZncgY29sb3ItcHJpbWFyeS1tdXRlZCBcIiArIGl0ZW0uaWNvbn0+PC9pPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj4mbmJzcDsmbmJzcDt7aXRlbS5uYW1lfTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdDwvYT5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0ZWxzZSByZXR1cm4oXHJcblx0XHRcdFx0XHRcdFx0PGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cImxpbmtCb3hcIj5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHQ8TGluayB0bz17aXRlbS5saW5rfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPXtcImZhIGZhLWZ3IGNvbG9yLWJsYWNrIGNvbG9yLXByaW1hcnktbXV0ZWQgXCIgKyBpdGVtLmljb259PjwvaT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4+Jm5ic3A7Jm5ic3A7e2l0ZW0ubmFtZX08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L0xpbms+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsImltcG9ydCB7IFJlYWN0IH0gZnJvbSAnLi4vY2RuJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblx0XHR2YXIgbm90aWZpY2F0aW9ucyA9IHRoaXMucHJvcHMubm90aWZpY2F0aW9uLnJldHJpZXZlKCk7XHJcblx0XHR2YXIgbm90aWZpY2F0aW9uVmlldyA9ICg8ZGl2PjwvZGl2Pik7XHJcblx0XHRpZiAobm90aWZpY2F0aW9ucy5sZW5ndGggPiAwKXtcclxuXHRcdFx0bm90aWZpY2F0aW9uVmlldyA9IChcclxuXHRcdFx0XHQ8ZGl2IGlkPVwibm90aWZpY2F0aW9uc1wiPlxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRub3RpZmljYXRpb25zLm1hcCgobm90aWZpY2F0aW9uLCBpKT0+e1xyXG5cdFx0XHRcdFx0XHRcdGlmIChub3RpZmljYXRpb24udHlwZSA9PSB1bmRlZmluZWQpIG5vdGlmaWNhdGlvbi50eXBlID0gXCJzdWNjZXNzXCI7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuKFxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e1wiYWxlcnQgYWxlcnQtXCIgKyBub3RpZmljYXRpb24udHlwZX0ga2V5PXtpfSBkYXRhLW5JbmRleD17aX0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdHtub3RpZmljYXRpb24ubWVzc2FnZX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2xvc2VcIiBvbkNsaWNrPXsgKCkgPT4gdGhpcy5wcm9wcy5ub3RpZmljYXRpb24ucmVtb3ZlKGkpIH0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4+JnRpbWVzOzwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG4gICAgXHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHRcdHJldHVybiBub3RpZmljYXRpb25WaWV3O1xyXG5cdH1cclxufSk7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgXCJsaW5rXCI6e1xyXG4gICAgICAgIFwicGhvbmVcIjpcIlwiXHJcbiAgICB9LFxyXG4gICAgXCJ0cmFuc2FjdGlvblwiOntcclxuICAgICAgICBcImRhdGVcIjpcIjIwMTYtMTEtMTFUMjA6MDc6MTIuODY4WlwiLFxyXG4gICAgICAgIFwidG90YWxcIjo1MDIxMCxcclxuICAgICAgICBcIml0ZW1zXCI6W1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJEb251dHNcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjo4LFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjo4MDMsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6NjQyNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJDb29raWVzXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6NSxcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6OTc0LFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjQ4NzBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiTWlsa1wiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjIsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjQ5NCxcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjo5ODhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiSWNlIENyZWFtXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6NSxcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6NzA0LFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjM1MjBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiRnJvWW9cIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjo1LFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjo3NzIsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6Mzg2MFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJDaG9jb2xhdGVcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjo1LFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjozODMsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6MTkxNVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJCdXJnZXJcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjozLFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjoxNTEsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6NDUzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIlN0ZWFrXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6NixcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6MjI2LFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjEzNTZcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiTXVzaHJvb20gUmF2aW9saVwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjgsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjE3NSxcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjoxNDAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIk1hYyAmIENoZWVzZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjEwLFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjoyNzYsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6Mjc2MFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJBZHZpbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjksXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjQ0MyxcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjozOTg3XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkJvc3RvbiBHbG9iZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjgsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjI3NixcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjoyMjA4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIk95c3RlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjYsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjQzMixcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjoyNTkyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIk11bmNoa2luc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjEsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjU1NixcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjo1NTZcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiUGVuY2lsc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjIsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjgwMyxcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjoxNjA2XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkJhdHRlcmllc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjMsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjg3MyxcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjoyNjE5XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkxlbW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6MixcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6MTA2LFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjIxMlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIml0ZW1zXCI6W1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiU3VidG90YWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjQxMzI2XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIk1BIFN0YXRlIFRheCBAIDYuMjUlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxcIjoyNjg2XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkdyYXR1aXR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxcIjo2MTk4XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkdyYW5kIFRvdGFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxcIjo1MDIxMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJjb250YWN0XCI6W1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjpcImZhY2Vib29rXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJGYWNlYm9va1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiaHR0cHM6Ly93d3d3LmZhY2Vib29rLmNvbS9BY21lXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJ0d2l0dGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJUd2l0dGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJodHRwczovL3d3dy50d2l0dGVyLmNvbS9BY21lXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJpbnN0YWdyYW1cIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkluc3RhZ3JhbVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiaHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS9BY21lXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJnb29nbGVQbHVzXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJHb29nbGUgUGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vQWNtZVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOlwidHdpdHRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiVHdpdHRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiaHR0cHM6Ly93d3cudHdpdHRlci5jb20vQWNtZVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOlwicGludGVyZXN0XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJQaW50ZXJlc3RcIixcclxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImh0dHBzOi8vd3d3LnBpbnRlcmVzdC5jb20vQWNtZVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOlwid2ViXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJXZWJzaXRlXCIsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJodHRwczovL3d3dy5BY21lLmNvbS9cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjpcImVtYWlsXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJFbWFpbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiQWNtZUBmbGVjdGluby5jb21cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjpcInBob25lXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJDb3Jwb3JhdGUgUGhvbmVcIixcclxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcIisxMzE4NDQ5NjM4N1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOlwicGhvbmVcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIlN0b3JlIFBob25lXCIsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCIrMTE3NzM2MzQ2NTdcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImFkZHJlc3NcIjp7XHJcbiAgICAgICAgICAgIFwibGluZTFcIjpcIjI1NiBNY2ZlcnJlbiBTdFwiLFxyXG4gICAgICAgICAgICBcImNpdHlcIjpcIkxpdmV6ZXlcIixcclxuICAgICAgICAgICAgXCJzdGF0ZVwiOlwiUklcIixcclxuICAgICAgICAgICAgXCJwb3N0YWxDb2RlXCI6MTM0MDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVhY3QsIFJlYWN0Um91dGVyIH0gZnJvbSAnLi4vY2RuJ1xyXG5pbXBvcnQgS2V5IGZyb20gJy4uL2NsYXNzZXMvS2V5J1xyXG5pbXBvcnQgVXNlciBmcm9tICcuLi9jbGFzc2VzL1VzZXInXHJcbmltcG9ydCBBdXRoZW50aWNhdGUgZnJvbSAnLi4vY2xhc3Nlcy9BdXRoZW50aWNhdGUnO1xyXG5cclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuXHQgICBcdHJldHVybiB7XHJcblx0XHRcdFx0a2V5OntcclxuXHRcdFx0XHRcdHRva2VuOlwiXCIsXHJcblx0XHRcdFx0XHRuYW1lOlwiXCJcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHNob3dLZXk6IGZhbHNlLFxyXG5cdFx0XHRcdHByb2ZpbGU6IFVzZXIuZ2V0UHJvZmlsZSgpLFxyXG5cdFx0XHRcdHNlY3VyZVByb2ZpbGU6IHt9LFxyXG5cdFx0XHRcdGNvbm5lY3Rpb246IFwiXCIsXHJcblx0XHRcdFx0YXV0aGVudGljYXRlOiB7fVxyXG5cdFx0IFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xyXG5cdFx0VXNlci5nZXRGdWxsUHJvZmlsZSgpLnRoZW4oKHNlY3VyZVByb2ZpbGUpPT57XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe1xyXG5cdFx0XHRcdHNlY3VyZVByb2ZpbGU6c2VjdXJlUHJvZmlsZSxcclxuXHRcdFx0XHRrZXk6c2VjdXJlUHJvZmlsZS5rZXlzWzBdLFxyXG5cdFx0XHRcdG5hbWU6c2VjdXJlUHJvZmlsZS5rZXlzWzBdLm5hbWUsXHJcblx0XHRcdFx0Y29ubmVjdGlvbjogc2VjdXJlUHJvZmlsZS5pZGVudGl0aWVzWzBdLmNvbm5lY3Rpb25cclxuXHRcdFx0fSk7XHJcblx0XHR9KS5jYXRjaChmdW5jdGlvbihlcnIpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0fSk7XHJcblx0XHR2YXIgYXV0aGVudGljYXRlID0gbmV3IEF1dGhlbnRpY2F0ZSh7XHJcblx0XHRcdGluaXRpYWxTY3JlZW46IFwiZm9yZ290UGFzc3dvcmRcIixcclxuXHRcdFx0YWxsb3dMb2dpbjogZmFsc2VcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7YXV0aGVudGljYXRlOmF1dGhlbnRpY2F0ZX0pO1xyXG5cdH0sXHJcblx0Y2hhbmdlUGFzc3dvcmQ6IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLnN0YXRlLmF1dGhlbnRpY2F0ZS5sb2dpbigpO1xyXG5cdH0sXHJcblx0c2F2ZUNoYW5nZXM6IGZ1bmN0aW9uKCl7XHJcblx0XHRLZXkudXBkYXRlKHtcclxuXHRcdFx0bmFtZTogdGhpcy5zdGF0ZS5uYW1lXHJcblx0XHR9LCB0aGlzLnByb3BzLnVzZXIpO1xyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJhY2NvdW50XCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlLWhlYWRlclwiPkFjY291bnQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBpbmZvQm94XCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdFx0PGg1PkVtYWlsPC9oNT5cclxuXHRcdFx0XHRcdFx0XHQ8c3Bhbj57dGhpcy5zdGF0ZS5zZWN1cmVQcm9maWxlLmVtYWlsfTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aDU+U3Vic2NyaXB0aW9uPC9oNT5cclxuXHRcdFx0XHRcdFx0XHQ8c3Bhbj5GcmVlIFVubGltaXRlZDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IG1hcmdpbi10b3AtMzVcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG5cdFx0XHRcdFx0XHRcdDxoNT5Vc2VyIElEPC9oNT5cclxuXHRcdFx0XHRcdFx0XHQ8c3Bhbj57dGhpcy5zdGF0ZS5zZWN1cmVQcm9maWxlLnVzZXJfaWR9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG5cdFx0XHRcdFx0XHRcdDxoNT5QYXNzd29yZDwvaDU+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBwYWRkaW5nLWxlZnQtMFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGEgaHJlZj1cImphdmFzY3JpcHQ6XCIgb25DbGljaz17dGhpcy5jaGFuZ2VQYXNzd29yZH0+Q2hhbmdlIFBhc3N3b3JkPC9hPlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIHNldHRpbmdzQm94XCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBrZXlCb3hcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG5cdFx0XHRcdFx0XHRcdDxoNT5BcGkgS2V5Jm5ic3A7Jm5ic3A7PGEgaHJlZj1cImphdmFzY3JpcHQ6XCIgY2xhc3NOYW1lPVwiZm9udC1zaXplLTEyXCIgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3Nob3dLZXk6IXRoaXMuc3RhdGUuc2hvd0tleX0pfT57KHRoaXMuc3RhdGUuc2hvd0tleSk/PHNwYW4+SGlkZTwvc3Bhbj46PHNwYW4+U2hvdzwvc3Bhbj59PC9hPjwvaDU+XHJcblx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0KHRoaXMuc3RhdGUuc2hvd0tleSk/XHJcblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJrZXlCb3hcIiB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXt0aGlzLnN0YXRlLmtleS50b2tlbn0gcmVhZE9ubHkvPjpcclxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBpZD1cImtleUJveFwiIHR5cGU9XCJwYXNzd29yZFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXt0aGlzLnN0YXRlLmtleS50b2tlbn0gcmVhZE9ubHkvPlxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgbWFyZ2luLXRvcC0zNVwiPlxyXG5cdFx0XHRcdFx0XHRcdDxoNT5CdXNpbmVzcyBOYW1lPC9oNT5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IHBhZGRpbmctbGVmdC0wXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJuYW1lXCIgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgY29sLXhzLTZcIiBvbkNoYW5nZT17KGUpPT57dGhpcy5zZXRTdGF0ZSh7bmFtZTplLnRhcmdldC52YWx1ZX0pfX0gdmFsdWU9e3RoaXMuc3RhdGUubmFtZX0vPlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBvZmZzZXQteHMtNiBtYXJnaW4tdG9wLTI1XCI+XHJcblx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4td2FybmluZyBtYXJnaW4tbGVmdC00NVwiIG9uQ2xpY2s9e3RoaXMuc2F2ZUNoYW5nZXN9PlNhdmU8L2J1dHRvbj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuIiwiaW1wb3J0IHsgUmVhY3QsIFJlYWN0Um91dGVyIH0gZnJvbSAnLi4vY2RuJ1xyXG5pbXBvcnQgQXV0aGVudGljYXRlIGZyb20gJy4uL2NsYXNzZXMvQXV0aGVudGljYXRlJztcclxuXHJcbnZhciBicm93c2VySGlzdG9yeSA9IFJlYWN0Um91dGVyLmJyb3dzZXJIaXN0b3J5O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcblx0ICAgXHRyZXR1cm4ge1xyXG5cdFx0XHRcdGxvZ2dpbmdJbjogZmFsc2VcclxuXHRcdCBcdH07XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcclxuXHRcdGlmKEF1dGhlbnRpY2F0ZS5pc0xvZ2dlZEluKCkpIGJyb3dzZXJIaXN0b3J5LnB1c2goJy9kYXNoJyk7XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dmFyIGF1dGggPSBuZXcgQXV0aGVudGljYXRlKCk7XHJcblx0XHRcdGF1dGgubG9naW4oKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJhdXRoXCI+XHJcblx0XHRcdFx0PGRpdiBpZD1cImF1dGhDb250YWluZXJcIj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG59KTtcclxuIiwiaW1wb3J0IHsgUmVhY3QgfSBmcm9tICcuLi9jZG4nXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJkYXNoXCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlLWhlYWRlclwiPkRhc2hib2FyZDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuIiwiaW1wb3J0IHsgUmVhY3QgfSBmcm9tICcuLi9jZG4nXHJcbmltcG9ydCBVc2VyIGZyb20gJy4uL2NsYXNzZXMvVXNlcidcclxuaW1wb3J0IHNhbXBsZSBmcm9tICcuLi9kYXRhL3RyYW5zYWN0aW9uU2FtcGxlJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZy5qcydcclxuXHJcbmNvbnNvbGUubG9nKGNvbmZpZyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgXHRyZXR1cm4ge1xyXG5cdFx0XHRwaG9uZTpcIlwiLFxyXG5cdFx0XHRzYW1wbGU6c2FtcGxlLFxyXG5cdFx0XHRiYXNpY1Rva2VuOiBcIlwiLFxyXG5cdFx0XHRyZWZlcmVuY2VJZDogXCJcIlxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xyXG5cdFx0VXNlci5nZXRCYXNpY1Rva2VuKCkudGhlbigodG9rZW4pPT57XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe2Jhc2ljVG9rZW46dG9rZW59KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0c2VuZFJlY2VpcHQ6ZnVuY3Rpb24oKXtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogY29uZmlnLmFwaUhvc3QgKyBcIi92MS90cmFuc2FjdGlvblwiLFxyXG5cdFx0XHR0eXBlOiBcInBvc3RcIixcclxuXHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdEF1dGhvcml6YXRpb246IHRoaXMuc3RhdGUuYmFzaWNUb2tlblxyXG5cdFx0XHR9LFxyXG5cdFx0XHRkYXRhOiB0aGlzLnN0YXRlLnNhbXBsZVxyXG5cdFx0fSkudGhlbigoZGF0YSk9PntcclxuXHRcdFx0dGhpcy5wcm9wcy5ub3RpZmljYXRpb24uY3JlYXRlKHttZXNzYWdlOlwiWW91ciByZXF1ZXN0IHdhcyBtYWRlIHN1Y2Nlc3NmdWxseS5cIn0pO1xyXG5cdFx0fSkuY2F0Y2goIChlcnIpID0+IHtcclxuXHRcdFx0Y29uc29sZS5sb2coZXJyKTtcclxuXHRcdFx0dGhpcy5wcm9wcy5ub3RpZmljYXRpb24uY3JlYXRlKHttZXNzYWdlOlwiVGhlcmUgd2FzIGFuIGVycm9yIGdldHRpbmcgeW91ciBrZXlzLlwiLCB0eXBlOlwiZGFuZ2VyXCJ9KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0aGFuZGxlQ2hhbmdlOiBmdW5jdGlvbihlKXtcclxuXHRcdHZhciBudW1iZXIgPSBlLnRhcmdldC52YWx1ZTtcclxuXHRcdHNhbXBsZS5saW5rLnBob25lID0gbnVtYmVyO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZSh7cGhvbmU6bnVtYmVyfSk7XHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImRvY3NcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtaGVhZGVyXCI+RG9jdW1lbnRhdGlvbjwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGNvbmZpZ3VyZVwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBtYXJnaW4tYm90dG9tLTI1IHZlcnRpY2FsLWFsaWduXCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTJcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2l6ZS0yNFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRTZW5kIFRyYW5zYWN0aW9uPGJyLz5cclxuXHRcdFx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInJlcXVlc3RNZXRob2RcIj5QT1NUPC9zcGFuPjxzcGFuIGNsYXNzTmFtZT1cInJlcXVlc3RSb3V0ZVwiPi90cmFuc2FjdGlvbjwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IG1hcmdpbi1ib3R0b20tMTVcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj5QaG9uZSBOdW1iZXI8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLm5hbWV9Lz5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17dGhpcy5zZW5kUmVjZWlwdH0+VHJ5PC9idXR0b24+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGNvZGVcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzYW1wbGVIZWFkZXIgbWFyZ2luLWJvdHRvbS0xNVwiPkhlYWRlcnM8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PHNwYW4+QXV0aG9yaXphdGlvbjoge3RoaXMuc3RhdGUuYmFzaWNUb2tlbn0gPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNhbXBsZUhlYWRlciAgbWFyZ2luLXRvcC0xNVwiPkJvZHk8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGNvZGUgY2xhc3NOYW1lPVwiY29kZVwiPlxyXG5cdFx0XHRcdFx0XHRcdHtKU09OLnN0cmluZ2lmeShzYW1wbGUsIG51bGwsIDIpfVxyXG5cdFx0XHRcdFx0XHQ8L2NvZGU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBjb25maWd1cmVcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgbWFyZ2luLWJvdHRvbS0yNSB2ZXJ0aWNhbC1hbGlnblwiPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJmb250LXNpemUtMjRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0R2V0IFRyYW5zYWN0aW9uPGJyLz5cclxuXHRcdFx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInJlcXVlc3RNZXRob2RcIj5HRVQ8L3NwYW4+PHNwYW4gY2xhc3NOYW1lPVwicmVxdWVzdFJvdXRlXCI+L3RyYW5zYWN0aW9uLzpyZWZlcmVuY2VUb2tlbjwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IG1hcmdpbi1ib3R0b20tMTVcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj5SZWZlcmVuY2UgVG9rZW48L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9IHZhbHVlPXt0aGlzLnN0YXRlLm5hbWV9Lz5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCI+VHJ5PC9idXR0b24+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGNvZGVcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzYW1wbGVIZWFkZXIgbWFyZ2luLWJvdHRvbS0xNVwiPkhlYWRlcnM8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PHNwYW4+QXV0aG9yaXphdGlvbjoge3RoaXMuc3RhdGUuYmFzaWNUb2tlbn0gPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNhbXBsZUhlYWRlciAgbWFyZ2luLXRvcC0xNVwiPkJvZHk8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGNvZGUgY2xhc3NOYW1lPVwiY29kZVwiPlxyXG5cdFx0XHRcdFx0XHQ8L2NvZGU+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsImltcG9ydCB7IFJlYWN0IH0gZnJvbSAnLi4vY2RuJ1xyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPVwic3VwcG9ydFwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZS1oZWFkZXJcIj5TdXBwb3J0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdERPTSwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuL2NkbidcclxuaW1wb3J0IEF1dGhlbnRpY2F0ZSBmcm9tICcuL2NsYXNzZXMvQXV0aGVudGljYXRlJ1xyXG5cclxuaW1wb3J0IEFwcCBmcm9tICcuL2FwcC5qcydcclxuaW1wb3J0IEF1dGggZnJvbSAnLi92aWV3cy9hdXRoJ1xyXG5pbXBvcnQgRGFzaCBmcm9tICcuL3ZpZXdzL2Rhc2gnXHJcbmltcG9ydCBBY2NvdW50IGZyb20gJy4vdmlld3MvYWNjb3VudCdcclxuaW1wb3J0IERvY3MgZnJvbSAnLi92aWV3cy9kb2NzJ1xyXG5pbXBvcnQgU3VwcG9ydCBmcm9tICcuL3ZpZXdzL3N1cHBvcnQnXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xyXG5pbXBvcnQgVXNlciBmcm9tICcuL2NsYXNzZXMvVXNlcidcclxuXHJcbnZhciBSb3V0ZXIgPSBSZWFjdFJvdXRlci5Sb3V0ZXI7XHJcbnZhciBSb3V0ZSA9IFJlYWN0Um91dGVyLlJvdXRlO1xyXG52YXIgYnJvd3Nlckhpc3RvcnkgPSBSZWFjdFJvdXRlci5icm93c2VySGlzdG9yeTtcclxuXHJcbi8vIHZhbGlkYXRlIGF1dGhlbnRpY2F0aW9uIGZvciBwcml2YXRlIHJvdXRlc1xyXG5jb25zdCByZXF1aXJlQXV0aCA9IChuZXh0U3RhdGUsIHJlcGxhY2UpID0+IHtcclxuXHRpZiAoIUF1dGhlbnRpY2F0ZS5pc0xvZ2dlZEluKCkpIHtcclxuXHRcdGJyb3dzZXJIaXN0b3J5LnB1c2goXCJkYXNoXCIpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG5SZWFjdERPTS5yZW5kZXIoKFxyXG5cdDxSb3V0ZXIgaGlzdG9yeT17YnJvd3Nlckhpc3Rvcnl9PlxyXG5cdFx0PFJvdXRlIGNvbXBvbmVudD17QXBwfT5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJhdXRoXCIgY29tcG9uZW50PXtBdXRofS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiZG9jc1wiIGNvbXBvbmVudD17RG9jc30vPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cImRhc2hcIiBjb21wb25lbnQ9e0Rhc2h9IG9uRW50ZXI9e3JlcXVpcmVBdXRofS8+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiYWNjb3VudFwiIGNvbXBvbmVudD17QWNjb3VudH0gb25FbnRlcj17cmVxdWlyZUF1dGh9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzdXBwb3J0XCIgY29tcG9uZW50PXtTdXBwb3J0fS8+XHJcblx0XHQ8L1JvdXRlPlxyXG5cdDwvUm91dGVyPlxyXG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xyXG4iXX0=
