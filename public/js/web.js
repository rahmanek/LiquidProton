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
			},
			user: this.props.route.user
		};
		return _cdn.React.createElement(
			'div',
			null,
			_cdn.React.createElement(_notifications2.default, { notification: pass.notification }),
			_cdn.React.createElement(_header2.default, { notification: pass.notification, user: this.props.route.user, nav: view.nav }),
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

},{"../config.js":1,"./cdn":3,"./classes/User.js":4,"./classes/Utilities":5,"./components/header.js":7,"./components/nav":8,"./components/notifications.js":9}],3:[function(require,module,exports){
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
exports.$ = $;
exports.jQuery = jQuery;
exports.React = React;
exports.ReactDOM = ReactDOM;
exports.ReactRouter = ReactRouter;
exports.Auth0Lock = Auth0Lock;

},{}],4:[function(require,module,exports){
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

var browserHistory = _cdn.ReactRouter.browserHistory;

var User = function () {
	function User(clientId, domain, isClosable) {
		_classCallCheck(this, User);

		// Configure Auth0
		this.lock = new _cdn.Auth0Lock(clientId, domain, {
			allowedConnections: ['flectino-dev', 'github', 'google-oauth2'],
			socialButtonStyle: 'small',
			languageDictionary: {
				title: "Hi"
			},
			theme: {
				logo: 'http://img06.deviantart.net/ce86/i/2013/027/1/5/batman_logo_only_by_deathonabun-d5swf2u.png',
				primaryColor: '#31324F'
			}
		});
		// Add callback for lock `authenticated` event
		this.lock.on('authenticated', this.onAuthentication.bind(this));
		// binds login functions to keep this context
		this.login = this.login.bind(this);
	}

	_createClass(User, [{
		key: 'onAuthentication',
		value: function onAuthentication(authResult) {
			var _this = this;

			// Saves the user token
			this.setToken(authResult.idToken);
			this.lock.getProfile(authResult.idToken, function (error, profile) {
				if (error) {
					console.log('Error loading the Profile', error);
				} else {
					console.log(profile);
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
		key: 'getProfile',
		value: function getProfile() {
			// Retrieves the profile data from localStorage
			var profile = localStorage.getItem('profile');
			return profile ? JSON.parse(localStorage.profile) : {};
		}
	}, {
		key: 'getSecureProfile',
		value: function getSecureProfile() {
			return $.ajax({
				url: _config2.default.apiHost + "/user",
				type: "get",
				headers: {
					Authorization: "Bearer " + this.getToken()
				}
			});
		}
	}, {
		key: 'login',
		value: function login() {
			// Call the show method to display the widget.
			this.lock.show();
		}
	}, {
		key: 'isLoggedIn',
		value: function isLoggedIn() {
			// Checks if there is a saved token and it's still valid
			return !!this.getToken();
		}
	}, {
		key: 'setToken',
		value: function setToken(idToken) {
			// Saves user token to localStorage
			localStorage.setItem('id_token', idToken);
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
			return this.getSecureProfile().then(function (profile) {
				return Promise.resolve("Basic " + window.btoa(profile.user_id + ":" + profile.keys[0].token));
			});
		}
	}, {
		key: 'logout',
		value: function logout() {
			// Clear user token and profile data from localStorage
			localStorage.removeItem('id_token');
			localStorage.removeItem('profile');
			browserHistory.push('auth');
			return;
		}
	}, {
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
	}]);

	return User;
}();

exports.default = User;

},{"../../config.js":1,"../cdn":3}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{"../../config.js":1,"../cdn":3,"../classes/User.js":4}],7:[function(require,module,exports){
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
	displayName: 'header',

	getInitialState: function getInitialState() {
		return {
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

	render: function render() {
		var _this = this;

		var user = this.props.user;

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
						{ className: 'nav navbar-nav hidden-sm-down float-xs-right' },
						this.state.nav.map(function (item, i) {
							if (user.isLoggedIn() && item.private) return _cdn.React.createElement(
								'li',
								{ key: i, className: 'nav-item' },
								item.name == "Logout" ? _cdn.React.createElement(
									'a',
									{ href: 'javascript:', className: 'nav-link', onClick: _this.props.user.logout },
									item.name
								) : _cdn.React.createElement(
									Link,
									{ to: item.link, className: 'nav-link' },
									item.name
								)
							);else if (!user.isLoggedIn() && !item.private) return _cdn.React.createElement(
								'li',
								{ key: i, className: 'nav-item' },
								_cdn.React.createElement(
									'a',
									{ href: 'javascript:', className: 'nav-link', onClick: _this.props.user.login },
									item.name
								)
							);
						})
					),
					_cdn.React.createElement(
						'a',
						{ href: 'javascript:', className: 'navbar-toggler float-xs-right hidden-md-up', 'data-toggle': 'collapse', 'data-target': '#exCollapsingNavbar' },
						_cdn.React.createElement('i', { className: 'fa fa-bars' })
					)
				)
			)
		);
	}
});

},{"../../config.js":1,"../cdn":3,"../classes/User.js":4}],8:[function(require,module,exports){
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

},{"../cdn":3,"../classes/User.js":4}],9:[function(require,module,exports){
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

},{"../cdn":3}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require("../cdn");

exports.default = _cdn.React.createClass({
	displayName: "account",

	getInitialState: function getInitialState() {
		return {
			apiKey: "Your secret API Key",
			keyPulled: false,
			profile: this.props.user.getProfile()
		};
	},
	presentKey: function presentKey() {
		var _this = this;

		if (!this.state.keyPulled) this.props.user.getSecureProfile().then(function (user) {
			_this.setState({ apiKey: user.app_metadata.key, keyPulled: true });
		});
	},

	render: function render() {
		return _cdn.React.createElement(
			"div",
			{ id: "account" },
			_cdn.React.createElement(
				"div",
				{ className: "page-header" },
				"Account"
			),
			_cdn.React.createElement(
				"div",
				{ className: "col-xs-12 infoBox" },
				_cdn.React.createElement(
					"div",
					{ className: "row" },
					_cdn.React.createElement(
						"div",
						{ className: "col-xs-6" },
						_cdn.React.createElement(
							"h5",
							null,
							"Email"
						),
						_cdn.React.createElement(
							"span",
							null,
							this.state.profile.email
						)
					),
					_cdn.React.createElement(
						"div",
						{ className: "col-xs-6" },
						_cdn.React.createElement(
							"h5",
							null,
							"Subscription"
						),
						_cdn.React.createElement(
							"span",
							null,
							"Free Unlimited"
						)
					)
				),
				_cdn.React.createElement(
					"div",
					{ className: "row margin-top-35" },
					_cdn.React.createElement(
						"div",
						{ className: "col-xs-6" },
						_cdn.React.createElement(
							"h5",
							null,
							"User ID"
						),
						_cdn.React.createElement(
							"span",
							null,
							this.state.profile.user_id
						)
					),
					_cdn.React.createElement(
						"div",
						{ className: "col-xs-6" },
						_cdn.React.createElement(
							"h5",
							null,
							"Api Key\xA0\xA0",
							_cdn.React.createElement(
								"a",
								{ href: "javascript:", className: "font-size-12", onClick: this.presentKey },
								"Show"
							)
						),
						this.state.keyPulled ? _cdn.React.createElement("input", { id: "keyBox", type: "text", className: "form-control", value: this.state.apiKey, readOnly: true }) : _cdn.React.createElement("input", { id: "keyBox", type: "password", className: "form-control", value: this.state.apiKey, readOnly: true })
					)
				)
			)
		);
	}
});

// <div className="row light-border">
// 	<div className="col-xs-4">
// 		First Name:
// 	</div>
// 	<div className="col-xs-4">
// 		{this.props.user.givenName}
// 	</div>
// </div>
// <div className="row light-border">
// 	<div className="col-xs-4">
// 		Last Name:
// 	</div>
// 	<div className="col-xs-4">
// 		{this.props.user.surName}
// 	</div>
// </div>
// <div className="row light-border">
// 	<div className="col-xs-4">
// 		Email:
// 	</div>
// 	<div className="col-xs-4">
// 		{this.props.user.email}
// 	</div>
// 	<div className="col-xs-4">
// 		{(this.props.user.isEmailVerified)?<span></span>:<span>Verify Email</span>}
// 	</div>
// </div>
// <div className="row light-border">
// 	<div className="col-xs-4">
// 		Notification Preference:
// 	</div>
// 	<div className="col-xs-4">
// 		{(this.props.user.emailPreference == 0) ? "Immediately":"Never"}
// 	</div>
// </div>
// <div className="margin-top-50 row">
// 	{
// 		(this.state.editMode) ? (
// 			<div>
// 				<div className="col-xs-6">
// 					<button type="button" onClick={this.toggleEditMode} className="col-xs-6 col-xs-offset-3 btn btn-secondary marginTop15" data-dismiss="modal">
// 						Save
// 					</button>
// 				</div>
// 				<div className="col-xs-6">
// 					<button type="button" onClick={this.toggleEditMode} className="col-xs-6 col-xs-offset-3 btn marginTop15" data-dismiss="modal">
// 						Cancel
// 					</button>
// 				</div>
// 			</div>
// 		):(
// 			<div className="col-xs-6">
// 				<button type="button" onClick={this.toggleEditMode} className="col-xs-6 col-xs-offset-3 btn btn-primary marginTop15" data-dismiss="modal">
// 					Edit
// 				</button>
// 			</div>
// 		)
// 	}
// </div>

},{"../cdn":3}],12:[function(require,module,exports){
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
				'A'
			)
		);
	}
});

},{"../cdn":3,"../components/Footer.js":6}],13:[function(require,module,exports){
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

},{"../cdn":3,"../components/Footer.js":6}],14:[function(require,module,exports){
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

},{"../../config.js":1,"../cdn":3,"../classes/User":4,"../data/transactionSample":10}],15:[function(require,module,exports){
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

},{"../cdn":3,"../components/Footer.js":6}],16:[function(require,module,exports){
'use strict';

var _cdn = require('./cdn');

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
// import ApiKey from './views/apiKey'

var Route = _cdn.ReactRouter.Route;
var browserHistory = _cdn.ReactRouter.browserHistory;

var user = new _User2.default(_config2.default.auth0.clientId, _config2.default.auth0.domain);

// validate authentication for private routes
var requireAuth = function requireAuth(nextState, replace) {
	if (!user.isLoggedIn()) {
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
		{ component: _app2.default, user: user },
		React.createElement(Route, { path: 'auth', component: _auth2.default, nav: false }),
		React.createElement(Route, { path: 'docs', component: _docs2.default, nav: false }),
		React.createElement(Route, { path: 'dash', component: _dash2.default, onEnter: requireAuth, nav: true }),
		React.createElement(Route, { path: 'account', component: _account2.default, onEnter: requireAuth, nav: true }),
		React.createElement(Route, { path: 'support', component: _support2.default, nav: true })
	)
), document.getElementById('app'));

},{"../config":1,"./app.js":2,"./cdn":3,"./classes/User":4,"./views/account":11,"./views/auth":12,"./views/dash":13,"./views/docs":14,"./views/support":15}]},{},[16])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcY2RuLmpzIiwic3JjXFxjbGFzc2VzXFxVc2VyLmpzIiwic3JjXFxjbGFzc2VzXFxVdGlsaXRpZXMuanMiLCJzcmNcXGNvbXBvbmVudHNcXEZvb3Rlci5qcyIsInNyY1xcY29tcG9uZW50c1xcaGVhZGVyLmpzIiwic3JjXFxjb21wb25lbnRzXFxuYXYuanMiLCJzcmNcXGNvbXBvbmVudHNcXG5vdGlmaWNhdGlvbnMuanMiLCJzcmNcXGRhdGFcXHRyYW5zYWN0aW9uU2FtcGxlLmpzIiwic3JjXFx2aWV3c1xcYWNjb3VudC5qcyIsInNyY1xcdmlld3NcXGF1dGguanMiLCJzcmNcXHZpZXdzXFxkYXNoLmpzIiwic3JjXFx2aWV3c1xcZG9jcy5qcyIsInNyY1xcdmlld3NcXHN1cHBvcnQuanMiLCJzcmNcXHdlYi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBLElBQUksY0FBYyxhQUFsQjs7a0JBRWU7QUFDZCxjQUFhLFdBREM7QUFFZCxVQUFVLFlBQVU7QUFDbkIsTUFBRyxlQUFlLFlBQWxCLEVBQWdDLE9BQU8sNkJBQVAsQ0FBaEMsS0FDSyxPQUFPLHVCQUFQO0FBQ0wsRUFIUyxFQUZJO0FBTWQsVUFBVSxZQUFVO0FBQ25CLE1BQUcsZUFBZSxZQUFsQixFQUFnQyxPQUFPLDZCQUFQLENBQWhDLEtBQ0ssT0FBTyx1QkFBUDtBQUNMLEVBSFMsRUFOSTtBQVVkLGFBQVksNkJBVkU7QUFXZCxRQUFNO0FBQ0wsWUFBVSxrQ0FETDtBQUVMLFVBQVE7QUFGSDtBQVhRLEM7Ozs7Ozs7OztBQ0hmOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUksaUJBQWlCLGlCQUFZLGNBQWpDOztrQkFFZSxXQUFNLFdBQU4sQ0FBa0I7QUFBQTs7QUFDaEMsa0JBQWlCLDJC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QUEwQyxTQUFTLFdBQW5ELEVBQWdFLEtBQUssSUFBckUsR0FMRDtBQU1DLHNCQUFDLEtBQUQsSUFBTyxNQUFLLFNBQVosRUFBc0IsNEJBQXRCLEVBQTBDLEtBQUssSUFBL0M7QUFORDtBQURELENBREQsRUFXRyxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FYSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxudmFyIGVudmlyb25tZW50ID0gXCJkZXZlbG9wbWVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGVudmlyb25tZW50OiBlbnZpcm9ubWVudCxcclxuXHRhcGlIb3N0OiAoZnVuY3Rpb24oKXtcclxuXHRcdGlmKGVudmlyb25tZW50ID09IFwicHJvZHVjdGlvblwiKSByZXR1cm4gXCJodHRwOi8vYXBpdGVzdC5mbGVjdGluby5jb21cIjtcclxuXHRcdGVsc2UgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDozMDEwXCI7XHJcblx0fSgpKSxcclxuXHR3ZWJIb3N0OiAoZnVuY3Rpb24oKXtcclxuXHRcdGlmKGVudmlyb25tZW50ID09IFwicHJvZHVjdGlvblwiKSByZXR1cm4gXCJodHRwOi8vd2VidGVzdC5mbGVjdGluby5jb21cIjtcclxuXHRcdGVsc2UgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcblx0fSgpKSxcclxuXHRnYXRld2F5S2V5OiBcIkFVQjVqQ2tkcTNiN2tWOURUVGRpUWxsT1J2NVwiLFxyXG5cdGF1dGgwOntcclxuXHRcdGNsaWVudElkOiBcIjBTTTBnckJUb0NKaldHVWJCdGxadUhoeWxDcTJkVnQzXCIsXHJcblx0XHRkb21haW46IFwiZmxlY3Rpbm8uYXV0aDAuY29tXCJcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVhY3QsIFJlYWN0Um91dGVyfSBmcm9tICcuL2NkbidcclxuaW1wb3J0IEhlYWRlciBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyLmpzJ1xyXG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuL2NvbXBvbmVudHMvbm90aWZpY2F0aW9ucy5qcydcclxuaW1wb3J0IE5hdiBmcm9tICcuL2NvbXBvbmVudHMvbmF2J1xyXG5pbXBvcnQgeyBnZXRRdWVyeVZhcmlhYmxlIH0gZnJvbSAnLi9jbGFzc2VzL1V0aWxpdGllcydcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi9jbGFzc2VzL1VzZXIuanMnXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnLmpzJ1xyXG5cclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybntcclxuXHRcdFx0bm90aWZpY2F0aW9uczpbXVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y3JlYXRlTm90aWZpY2F0aW9uOiBmdW5jdGlvbihub3RpZmljYXRpb24pe1xyXG5cdFx0dmFyIG5vdGlmaWNhdGlvbnMgPSB0aGlzLnN0YXRlLm5vdGlmaWNhdGlvbnM7XHJcblx0XHRub3RpZmljYXRpb25zLnB1c2gobm90aWZpY2F0aW9uKTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbnM6bm90aWZpY2F0aW9uc30pO1xyXG5cclxuXHRcdHJldHVybjtcclxuXHR9LFxyXG5cdHJlbW92ZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obkluZGV4KXtcclxuXHRcdHZhciBub3RpZmljYXRpb25zID0gdGhpcy5zdGF0ZS5ub3RpZmljYXRpb25zO1xyXG5cdFx0bm90aWZpY2F0aW9ucy5zcGxpY2UobkluZGV4LDEpO1xyXG5cdFx0cmV0dXJuIHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbnM6bm90aWZpY2F0aW9uc30pO1xyXG5cdH0sXHJcblx0cmV0cmlldmVOb3RpZmljYXRpb25zOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUubm90aWZpY2F0aW9ucztcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6ZnVuY3Rpb24obmV4dFByb3BzKXtcclxuXHRcdC8vIFJlbW92ZSBub3RpZmljYXRpb25zIHdoZW4gdmlldyBjaGFuZ2VzXHJcblx0XHRpZih0aGlzLnByb3BzLmxvY2F0aW9uLnBhdGhuYW1lICE9IG5leHRQcm9wcy5sb2NhdGlvbi5wYXRobmFtZSl7XHJcblx0XHRcdHZhciBub3RpZmljYXRpb25zID0gW107XHJcblx0XHRcdGlmICh0eXBlb2YgbmV4dFByb3BzLmxvY2F0aW9uLnF1ZXJ5Lm1lc3NhZ2UgIT0gXCJ1bmRlZmluZWRcIikgbm90aWZpY2F0aW9ucy5wdXNoKHttZXNzYWdlOm5leHRQcm9wcy5sb2NhdGlvbi5xdWVyeS5tZXNzYWdlfSk7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbnM6bm90aWZpY2F0aW9uc30pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0dmFyIG5vdGlmaWNhdGlvbnMgPSB0aGlzLnN0YXRlLm5vdGlmaWNhdGlvbnM7XHJcblx0XHRpZiAodHlwZW9mIGdldFF1ZXJ5VmFyaWFibGUoXCJtZXNzYWdlXCIpICE9IFwidW5kZWZpbmVkXCIpIG5vdGlmaWNhdGlvbnMucHVzaCh7bWVzc2FnZTpnZXRRdWVyeVZhcmlhYmxlKFwibWVzc2FnZVwiKS5zcGxpdChcIitcIikuam9pbihcIiBcIil9KTtcclxuXHJcblx0XHRyZXR1cm47XHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0dmFyIHZpZXcgPSB0aGlzLnByb3BzLnJvdXRlc1sxXTtcclxuXHRcdHZhciBwYXNzID0ge1xyXG5cdFx0XHRub3RpZmljYXRpb246e1xyXG5cdFx0XHRcdGNyZWF0ZTogdGhpcy5jcmVhdGVOb3RpZmljYXRpb24sXHJcblx0XHRcdFx0cmVtb3ZlOiB0aGlzLnJlbW92ZU5vdGlmaWNhdGlvbixcclxuXHRcdFx0XHRyZXRyaWV2ZTogdGhpcy5yZXRyaWV2ZU5vdGlmaWNhdGlvbnNcclxuXHRcdFx0fSxcclxuXHRcdFx0dXNlcjogdGhpcy5wcm9wcy5yb3V0ZS51c2VyXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG4gICAgICAgICA8ZGl2PlxyXG5cdFx0XHRcdDxOb3RpZmljYXRpb25zIG5vdGlmaWNhdGlvbj17cGFzcy5ub3RpZmljYXRpb259Lz5cclxuICAgICAgICAgICAgPEhlYWRlciBub3RpZmljYXRpb249e3Bhc3Mubm90aWZpY2F0aW9ufSB1c2VyPXt0aGlzLnByb3BzLnJvdXRlLnVzZXJ9IG5hdj17dmlldy5uYXZ9Lz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtYm9keVwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgZml4LXdpZHRoXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IHZpZXdcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMlwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0e1JlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLmNoaWxkcmVuLCBwYXNzKX1cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuICAgICAgICAgPC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsIlxyXG52YXIgJCA9IHdpbmRvdy4kO1xyXG52YXIgalF1ZXJ5ID0gJDtcclxudmFyIFJlYWN0ID0gd2luZG93LlJlYWN0O1xyXG52YXIgUmVhY3RET00gPSB3aW5kb3cuUmVhY3RET007XHJcbnZhciBSZWFjdFJvdXRlciA9IHdpbmRvdy5SZWFjdFJvdXRlcjtcclxudmFyIEF1dGgwTG9jayA9IHdpbmRvdy5BdXRoMExvY2s7XHJcbmV4cG9ydCB7ICQsIGpRdWVyeSwgUmVhY3QsIFJlYWN0RE9NLCBSZWFjdFJvdXRlciwgQXV0aDBMb2NrIH1cclxuIiwiaW1wb3J0IHsgQXV0aDBMb2NrLCBSZWFjdFJvdXRlciB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcuanMnXHJcbnZhciBicm93c2VySGlzdG9yeSA9IFJlYWN0Um91dGVyLmJyb3dzZXJIaXN0b3J5O1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIHtcclxuXHJcblx0Y29uc3RydWN0b3IoY2xpZW50SWQsZG9tYWluLGlzQ2xvc2FibGUpIHtcclxuXHRcdC8vIENvbmZpZ3VyZSBBdXRoMFxyXG5cdFx0dGhpcy5sb2NrID0gbmV3IEF1dGgwTG9jayhjbGllbnRJZCwgZG9tYWluLCB7XHJcblx0XHRcdGFsbG93ZWRDb25uZWN0aW9uczogWydmbGVjdGluby1kZXYnLCAnZ2l0aHViJywgJ2dvb2dsZS1vYXV0aDInXSxcclxuXHRcdFx0c29jaWFsQnV0dG9uU3R5bGU6ICdzbWFsbCcsXHJcblx0XHRcdGxhbmd1YWdlRGljdGlvbmFyeToge1xyXG5cdFx0XHRcdHRpdGxlOiBcIkhpXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0dGhlbWU6e1xyXG5cdFx0XHRcdGxvZ286ICdodHRwOi8vaW1nMDYuZGV2aWFudGFydC5uZXQvY2U4Ni9pLzIwMTMvMDI3LzEvNS9iYXRtYW5fbG9nb19vbmx5X2J5X2RlYXRob25hYnVuLWQ1c3dmMnUucG5nJyxcclxuXHRcdFx0XHRwcmltYXJ5Q29sb3I6ICcjMzEzMjRGJ1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdC8vIEFkZCBjYWxsYmFjayBmb3IgbG9jayBgYXV0aGVudGljYXRlZGAgZXZlbnRcclxuXHRcdHRoaXMubG9jay5vbignYXV0aGVudGljYXRlZCcsIHRoaXMub25BdXRoZW50aWNhdGlvbi5iaW5kKHRoaXMpKVxyXG5cdFx0Ly8gYmluZHMgbG9naW4gZnVuY3Rpb25zIHRvIGtlZXAgdGhpcyBjb250ZXh0XHJcblx0XHR0aGlzLmxvZ2luID0gdGhpcy5sb2dpbi5iaW5kKHRoaXMpXHJcblx0fVxyXG5cclxuXHRvbkF1dGhlbnRpY2F0aW9uKGF1dGhSZXN1bHQpe1xyXG5cdCAgIC8vIFNhdmVzIHRoZSB1c2VyIHRva2VuXHJcblx0XHR0aGlzLnNldFRva2VuKGF1dGhSZXN1bHQuaWRUb2tlbik7XHJcblx0XHR0aGlzLmxvY2suZ2V0UHJvZmlsZShhdXRoUmVzdWx0LmlkVG9rZW4sIChlcnJvciwgcHJvZmlsZSkgPT4ge1xyXG5cdFx0XHRpZiAoZXJyb3IpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnRXJyb3IgbG9hZGluZyB0aGUgUHJvZmlsZScsIGVycm9yKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHByb2ZpbGUpXHJcblx0XHRcdFx0dGhpcy5zZXRQcm9maWxlKHByb2ZpbGUpO1xyXG5cdFx0XHRcdGJyb3dzZXJIaXN0b3J5LnB1c2goXCJkYXNoXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0c2V0UHJvZmlsZShwcm9maWxlKXtcclxuXHRcdC8vIFNhdmVzIHByb2ZpbGUgZGF0YSB0byBsb2NhbFN0b3JhZ2VcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9maWxlJywgSlNPTi5zdHJpbmdpZnkocHJvZmlsZSkpXHJcblx0fVxyXG5cclxuXHRnZXRQcm9maWxlKCl7XHJcblx0XHQvLyBSZXRyaWV2ZXMgdGhlIHByb2ZpbGUgZGF0YSBmcm9tIGxvY2FsU3RvcmFnZVxyXG5cdFx0Y29uc3QgcHJvZmlsZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9maWxlJylcclxuXHRcdHJldHVybiBwcm9maWxlID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UucHJvZmlsZSkgOiB7fVxyXG5cdH1cclxuXHJcblx0Z2V0U2VjdXJlUHJvZmlsZSgpe1xyXG5cdFx0cmV0dXJuICQuYWpheCh7XHJcblx0XHRcdHVybDogY29uZmlnLmFwaUhvc3QgKyBcIi91c2VyXCIsXHJcblx0XHRcdHR5cGU6IFwiZ2V0XCIsXHJcblx0XHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0XHRBdXRob3JpemF0aW9uOiBcIkJlYXJlciBcIiArIHRoaXMuZ2V0VG9rZW4oKVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGxvZ2luKCkge1xyXG5cdFx0Ly8gQ2FsbCB0aGUgc2hvdyBtZXRob2QgdG8gZGlzcGxheSB0aGUgd2lkZ2V0LlxyXG5cdFx0dGhpcy5sb2NrLnNob3coKVxyXG5cdH1cclxuXHJcblx0aXNMb2dnZWRJbigpe1xyXG5cdFx0Ly8gQ2hlY2tzIGlmIHRoZXJlIGlzIGEgc2F2ZWQgdG9rZW4gYW5kIGl0J3Mgc3RpbGwgdmFsaWRcclxuXHRcdHJldHVybiAhIXRoaXMuZ2V0VG9rZW4oKVxyXG5cdH1cclxuXHJcblx0c2V0VG9rZW4oaWRUb2tlbil7XHJcblx0XHQvLyBTYXZlcyB1c2VyIHRva2VuIHRvIGxvY2FsU3RvcmFnZVxyXG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgaWRUb2tlbik7XHJcblx0fVxyXG5cclxuXHRnZXRUb2tlbigpe1xyXG5cdFx0Ly8gUmV0cmlldmVzIHRoZSB1c2VyIHRva2VuIGZyb20gbG9jYWxTdG9yYWdlXHJcblx0XHRyZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJyk7XHJcblx0fVxyXG5cclxuXHRnZXRCYXNpY1Rva2VuKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5nZXRTZWN1cmVQcm9maWxlKCkudGhlbihmdW5jdGlvbihwcm9maWxlKXtcclxuXHRcdCBcdHJldHVybiBQcm9taXNlLnJlc29sdmUoXCJCYXNpYyBcIiArIHdpbmRvdy5idG9hKHByb2ZpbGUudXNlcl9pZCArIFwiOlwiICsgcHJvZmlsZS5rZXlzWzBdLnRva2VuKSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGxvZ291dCgpe1xyXG5cdFx0Ly8gQ2xlYXIgdXNlciB0b2tlbiBhbmQgcHJvZmlsZSBkYXRhIGZyb20gbG9jYWxTdG9yYWdlXHJcblx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnaWRfdG9rZW4nKTtcclxuXHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdwcm9maWxlJyk7XHJcblx0XHRicm93c2VySGlzdG9yeS5wdXNoKCdhdXRoJyk7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHVwZGF0ZShwb3N0RGF0YSl7XHJcblx0XHRyZXR1cm4gJC5hamF4KHtcclxuXHRcdFx0dXJsOiBjb25maWcuYXBpSG9zdCArIFwiL3VzZXJzL1wiICsgdGhpcy5nZXRQcm9maWxlKCkudXNlcl9pZCxcclxuXHRcdFx0dHlwZTogXCJwYXRjaFwiLFxyXG5cdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0QXV0aG9yaXphdGlvbjogXCJCZWFyZXIgXCIgKyB0aGlzLmdldFRva2VuKCksXHJcblx0XHRcdH0sXHJcblx0XHRcdGRhdGE6cG9zdERhdGFcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG4iLCJcclxuXHJcbnZhciBnZXRRdWVyeVZhcmlhYmxlID0gZnVuY3Rpb24odmFyaWFibGUpIHtcclxuXHR2YXIgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcclxuXHR2YXIgcHJlVmFycyA9IHF1ZXJ5LnNwbGl0KCcvJyk7XHJcblx0dmFyIHZhcnMgPSBwcmVWYXJzWzBdLnNwbGl0KCcmJyk7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoJz0nKTtcclxuXHRcdGlmIChkZWNvZGVVUklDb21wb25lbnQocGFpclswXSkgPT0gdmFyaWFibGUpIHtcclxuXHRcdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y29uc29sZS5sb2coJ1F1ZXJ5IHZhcmlhYmxlICVzIG5vdCBmb3VuZCcsIHZhcmlhYmxlKTtcclxufVxyXG5cclxudmFyIGlzVmFsaWQgPSB7XHJcblx0ZW1haWw6IGZ1bmN0aW9uKGVtYWlsKSB7XHJcblx0XHR2YXIgcmUgPSAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcclxuXHRcdHJldHVybiByZS50ZXN0KGVtYWlsKTtcclxuXHR9LFxyXG5cdHBob25lOiBmdW5jdGlvbihwaG9uZSkge1xyXG5cdFx0dmFyIHN0cmlwUGhvbmUgPSBwaG9uZS5yZXBsYWNlKC9cXEQvZywnJyk7XHJcblx0XHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPj0gMTApIHJldHVybiB0cnVlO1xyXG5cdFx0ZWxzZSBmYWxzZTtcclxuXHR9XHJcbn1cclxuXHJcbnZhciBmb3JtYXRQaG9uZTEwID0gZnVuY3Rpb24ocGhvbmUpe1xyXG5cdHZhciBzdHJpcFBob25lID0gcGhvbmUucmVwbGFjZSgvXFxEL2csJycpO1xyXG5cdHZhciBkYXNoID0gXCJcIjtcclxuXHR2YXIgb3BlblBhcmVuID0gXCJcIjtcclxuXHR2YXIgY2xvc2VkUGFyZW4gPSBcIlwiO1xyXG5cdGlmIChzdHJpcFBob25lLmxlbmd0aCA+IDApIG9wZW5QYXJlbiA9IFwiKFwiO1xyXG5cdGlmIChzdHJpcFBob25lLmxlbmd0aCA+IDMpIGNsb3NlZFBhcmVuID0gXCIpXCI7XHJcblx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID4gNikgZGFzaCA9IFwiLVwiO1xyXG5cdHZhciBmb3JtYXR0ZWRQaG9uZSA9IG9wZW5QYXJlbiArIHN0cmlwUGhvbmUuc3Vic3RyaW5nKDAsMykgKyBjbG9zZWRQYXJlbiArIHN0cmlwUGhvbmUuc3Vic3RyaW5nKDMsNikgKyBkYXNoICsgc3RyaXBQaG9uZS5zdWJzdHJpbmcoNiwxMCk7XHJcblx0cmV0dXJuIGZvcm1hdHRlZFBob25lO1xyXG59XHJcblxyXG52YXIgZ2V0VGltZXpvbmVPZmZzZXQgPSBmdW5jdGlvbigpe1xyXG5cdGZ1bmN0aW9uIHBhZChudW1iZXIsIGxlbmd0aCl7XHJcblx0XHQgdmFyIHN0ciA9IFwiXCIgKyBudW1iZXJcclxuXHRcdCB3aGlsZSAoc3RyLmxlbmd0aCA8IGxlbmd0aCkge1xyXG5cdFx0XHQgIHN0ciA9ICcwJytzdHJcclxuXHRcdCB9XHJcblx0XHQgcmV0dXJuIHN0clxyXG5cdH1cclxuXHR2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0dmFyIG9mZnNldCA9IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcclxuXHRyZXR1cm4gKChvZmZzZXQ8MD8gJysnOictJykgKyBwYWQocGFyc2VJbnQoTWF0aC5hYnMob2Zmc2V0LzYwKSksIDIpKyBwYWQoTWF0aC5hYnMob2Zmc2V0JTYwKSwgMikpO1xyXG59XHJcblxyXG52YXIgY3JlYXRlVGltZURhdGUgPSBmdW5jdGlvbihkYXRlLCB0aW1lKXtcclxuXHR2YXIgbWlsZXN0b25lRGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG5cdHZhciBzdHJTcGxpdCA9IHRpbWUuc3BsaXQoJzonKTtcclxuXHR2YXIgaG91ciA9IHBhcnNlSW50KHN0clNwbGl0WzBdKTtcclxuXHR2YXIgbWludXRlID0gcGFyc2VJbnQoc3RyU3BsaXRbMV0uc3Vic3RyaW5nKDAsMikpO1xyXG5cdHZhciBzZXQgPSBzdHJTcGxpdFsxXS5zdWJzdHJpbmcoMiw0KTtcclxuXHRpZiAoaG91ciA9PT0gMTIpIHtcclxuXHRcdGlmIChzZXQgPT09IFwiYW1cIikgaG91ciA9IDA7XHJcblx0XHRlbHNlIGhvdXIgPSAxMjtcclxuXHR9IGVsc2UgaWYgKHNldCA9PT0gXCJwbVwiKSBob3VyICs9IDEyO1xyXG5cdG1pbGVzdG9uZURhdGUuc2V0SG91cnMoaG91cik7XHJcblx0bWlsZXN0b25lRGF0ZS5zZXRNaW51dGVzKG1pbnV0ZSk7XHJcblx0bWlsZXN0b25lRGF0ZS5zZXRNaW51dGVzKG1pbGVzdG9uZURhdGUuZ2V0TWludXRlcygpIC0gIG1pbGVzdG9uZURhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSk7XHJcblx0cmV0dXJuIG1pbGVzdG9uZURhdGUudG9JU09TdHJpbmcoKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IGdldFF1ZXJ5VmFyaWFibGUsIGlzVmFsaWQsIGZvcm1hdFBob25lMTAsIGdldFRpbWV6b25lT2Zmc2V0LCBjcmVhdGVUaW1lRGF0ZSB9XHJcbiIsImltcG9ydCB7IFJlYWN0LCBSZWFjdFJvdXRlciB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcuanMnXHJcbmltcG9ydCBVc2VyIGZyb20gJy4uL2NsYXNzZXMvVXNlci5qcydcclxuXHJcbnZhciBMaW5rID0gUmVhY3RSb3V0ZXIuTGluaztcclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPVwiZm9vdGVyXCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXJnaW4tYm90dG9tLTEwXCI+UmVzb3VyY2VzPC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXY+Rm9yIEN1c3RvbWVyczwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2PkZvciBSZXRhaWxlcnM8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdj5Gb3IgRGV2ZWxvcGVyczwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi1ib3R0b20tMTBcIj5IZWxwPC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdFx0ey8qIDxkaXYgY2xhc3NOYW1lPVwibWFyZ2luLWJvdHRvbS0xMFwiPlJlc291cmNlczwvZGl2PiAqL31cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXJnaW4tYm90dG9tLTEwXCI+QWJvdXQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi1ib3R0b20tMTBcIj5Db250YWN0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXY+Q2FsbDogKDg4OCk5MzAtMjkzODwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2PkVtYWlsOiBpbmZvQGhpLmNvbTwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuLi9jZG4nXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnLmpzJ1xyXG5pbXBvcnQgVXNlciBmcm9tICcuLi9jbGFzc2VzL1VzZXIuanMnXHJcblxyXG52YXIgTGluayA9IFJlYWN0Um91dGVyLkxpbms7XHJcbnZhciBicm93c2VySGlzdG9yeSA9IFJlYWN0Um91dGVyLmJyb3dzZXJIaXN0b3J5O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm57XHJcblx0XHRcdG5hdjpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bmFtZTogXCJEYXNoYm9hcmRcIixcclxuXHRcdFx0XHRcdGxpbms6IFwiZGFzaFwiLFxyXG5cdFx0XHRcdFx0cHJpdmF0ZTogdHJ1ZVxyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0bmFtZTpcIkFjY291bnRcIixcclxuXHRcdFx0XHRcdGxpbms6XCJhY2NvdW50XCIsXHJcblx0XHRcdFx0XHRwcml2YXRlOiB0cnVlXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOiBcIlN1cHBvcnRcIixcclxuXHRcdFx0XHRcdGxpbms6IFwic3VwcG9ydFwiLFxyXG5cdFx0XHRcdFx0cHJpdmF0ZTogdHJ1ZVxyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0bmFtZTogXCJEb2N1bWVudGF0aW9uXCIsXHJcblx0XHRcdFx0XHRsaW5rOiBcImRvY3NcIixcclxuXHRcdFx0XHRcdHByaXZhdGU6IHRydWVcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiTG9nb3V0XCIsXHJcblx0XHRcdFx0XHRsaW5rOlwibG9nb3V0XCIsXHJcblx0XHRcdFx0XHRwcml2YXRlOiB0cnVlXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOiBcIkxvZ2luXCIsXHJcblx0XHRcdFx0XHRsaW5rOlwibG9naW5cIixcclxuXHRcdFx0XHRcdHByaXZhdGU6IGZhbHNlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHZhciB1c2VyID0gdGhpcy5wcm9wcy51c2VyO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJoZWFkZXJcIj5cclxuXHRcdFx0XHQ8bmF2IGNsYXNzTmFtZT1cIm5hdmJhciBuYXZiYXItZml4ZWQtdG9wXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBmaXgtd2lkdGhcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIjXCI+RmxlY3Rpbm88L3NwYW4+XHJcblx0XHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwibmF2IG5hdmJhci1uYXYgaGlkZGVuLXNtLWRvd24gZmxvYXQteHMtcmlnaHRcIj5cclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMuc3RhdGUubmF2Lm1hcCgoaXRlbSwgaSk9PntcclxuXHRcdFx0XHRcdFx0XHRcdGlmKHVzZXIuaXNMb2dnZWRJbigpICYmIGl0ZW0ucHJpdmF0ZSkgcmV0dXJuKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGkga2V5PXtpfSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdChpdGVtLm5hbWUgPT0gXCJMb2dvdXRcIik/XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiamF2YXNjcmlwdDpcIiBjbGFzc05hbWU9XCJuYXYtbGlua1wiIG9uQ2xpY2s9e3RoaXMucHJvcHMudXNlci5sb2dvdXR9PntpdGVtLm5hbWV9PC9hPjpcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxMaW5rIHRvPXtpdGVtLmxpbmt9IGNsYXNzTmFtZT1cIm5hdi1saW5rXCI+e2l0ZW0ubmFtZX08L0xpbms+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYoIXVzZXIuaXNMb2dnZWRJbigpICYmICFpdGVtLnByaXZhdGUpIHJldHVybihcclxuXHRcdFx0XHRcdFx0XHRcdFx0PGxpIGtleT17aX0gY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiamF2YXNjcmlwdDpcIiBjbGFzc05hbWU9XCJuYXYtbGlua1wiIG9uQ2xpY2s9e3RoaXMucHJvcHMudXNlci5sb2dpbn0+e2l0ZW0ubmFtZX08L2E+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0PC91bD5cclxuXHRcdFx0XHRcdDxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIGNsYXNzTmFtZT1cIm5hdmJhci10b2dnbGVyIGZsb2F0LXhzLXJpZ2h0IGhpZGRlbi1tZC11cFwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiNleENvbGxhcHNpbmdOYXZiYXJcIj5cclxuXHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPVwiZmEgZmEtYmFyc1wiPjwvaT5cclxuXHRcdFx0XHRcdDwvYT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvbmF2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuIiwiaW1wb3J0IHsgUmVhY3QsIFJlYWN0Um91dGVyIH0gZnJvbSAnLi4vY2RuJ1xyXG5pbXBvcnQgVXNlciBmcm9tICcuLi9jbGFzc2VzL1VzZXIuanMnXHJcblxyXG52YXIgTGluayA9IFJlYWN0Um91dGVyLkxpbms7XHJcbnZhciBicm93c2VySGlzdG9yeSA9IFJlYWN0Um91dGVyLmJyb3dzZXJIaXN0b3J5O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm57XHJcblx0XHRcdG5hdjpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bmFtZTogXCJEYXNoYm9hcmRcIixcclxuXHRcdFx0XHRcdGxpbms6IFwiZGFzaFwiLFxyXG5cdFx0XHRcdFx0aWNvbjogXCJmYS1iYXItY2hhcnRcIlxyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0bmFtZTpcIkFjY291bnRcIixcclxuXHRcdFx0XHRcdGxpbms6XCJhY2NvdW50XCIsXHJcblx0XHRcdFx0XHRpY29uOiBcImZhLXVzZXItb1wiXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOiBcIlN1cHBvcnRcIixcclxuXHRcdFx0XHRcdGxpbms6IFwic3VwcG9ydFwiLFxyXG5cdFx0XHRcdFx0aWNvbjogXCJmYS1jb21tZW50LW9cIlxyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0bmFtZTogXCJEb2N1bWVudGF0aW9uXCIsXHJcblx0XHRcdFx0XHRsaW5rOiBcImRvY3NcIixcclxuXHRcdFx0XHRcdGljb246IFwiZmEtYm9va1wiXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOiBcIkxvZ291dFwiLFxyXG5cdFx0XHRcdFx0bGluazpcImxvZ291dFwiLFxyXG5cdFx0XHRcdFx0aWNvbjogXCJmYS1zaWduLW91dFwiXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHJcblx0XHR9XHJcblx0fSxcclxuXHRsb2dvdXQ6IGZ1bmN0aW9uKCl7XHJcblx0XHRVc2VyLmRlbGV0ZUF1dGhvcml6YXRpb24oKTtcclxuXHRcdGJyb3dzZXJIaXN0b3J5LnB1c2goXCJsb2dpblwiKTtcclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblx0XHR2YXIgZnJhZyA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNwbGl0KFwiP1wiKVswXTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJuYXZcIj5cclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aGlzLnN0YXRlLm5hdi5tYXAoKGl0ZW0sIGkpPT57XHJcblx0XHRcdFx0XHRcdGlmIChpdGVtLm5hbWUgPT0gXCJMb2dvdXRcIikgcmV0dXJuKFxyXG5cdFx0XHRcdFx0XHRcdDxkaXYga2V5PXtpfSBjbGFzc05hbWU9XCJsaW5rQm94XCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiamF2YXNjcmlwdDpcIiBvbkNsaWNrPXt0aGlzLnByb3BzLnVzZXIubG9nb3V0fT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPXtcImZhIGZhLWZ3IGNvbG9yLXByaW1hcnktbXV0ZWQgXCIgKyBpdGVtLmljb259PjwvaT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4+Jm5ic3A7Jm5ic3A7e2l0ZW0ubmFtZX08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2E+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdGVsc2UgcmV0dXJuKFxyXG5cdFx0XHRcdFx0XHRcdDxkaXYga2V5PXtpfSBjbGFzc05hbWU9XCJsaW5rQm94XCI+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0PExpbmsgdG89e2l0ZW0ubGlua30+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxpIGNsYXNzTmFtZT17XCJmYSBmYS1mdyBjb2xvci1ibGFjayBjb2xvci1wcmltYXJ5LW11dGVkIFwiICsgaXRlbS5pY29ufT48L2k+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuPiZuYnNwOyZuYnNwO3tpdGVtLm5hbWV9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9MaW5rPlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0dmFyIG5vdGlmaWNhdGlvbnMgPSB0aGlzLnByb3BzLm5vdGlmaWNhdGlvbi5yZXRyaWV2ZSgpO1xyXG5cdFx0dmFyIG5vdGlmaWNhdGlvblZpZXcgPSAoPGRpdj48L2Rpdj4pO1xyXG5cdFx0aWYgKG5vdGlmaWNhdGlvbnMubGVuZ3RoID4gMCl7XHJcblx0XHRcdG5vdGlmaWNhdGlvblZpZXcgPSAoXHJcblx0XHRcdFx0PGRpdiBpZD1cIm5vdGlmaWNhdGlvbnNcIj5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0bm90aWZpY2F0aW9ucy5tYXAoKG5vdGlmaWNhdGlvbiwgaSk9PntcclxuXHRcdFx0XHRcdFx0XHRpZiAobm90aWZpY2F0aW9uLnR5cGUgPT0gdW5kZWZpbmVkKSBub3RpZmljYXRpb24udHlwZSA9IFwic3VjY2Vzc1wiO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybihcclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtcImFsZXJ0IGFsZXJ0LVwiICsgbm90aWZpY2F0aW9uLnR5cGV9IGtleT17aX0gZGF0YS1uSW5kZXg9e2l9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7bm90aWZpY2F0aW9uLm1lc3NhZ2V9XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNsb3NlXCIgb25DbGljaz17ICgpID0+IHRoaXMucHJvcHMubm90aWZpY2F0aW9uLnJlbW92ZShpKSB9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuPiZ0aW1lczs8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH1cclxuICAgIFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbm90aWZpY2F0aW9uVmlldztcclxuXHR9XHJcbn0pO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIFwibGlua1wiOntcclxuICAgICAgICBcInBob25lXCI6XCIrMTYwMzg2MDI4NTRcIlxyXG4gICAgfSxcclxuICAgIFwidHJhbnNhY3Rpb25cIjp7XHJcbiAgICAgICAgXCJkYXRlXCI6XCIyMDE2LTExLTExVDIwOjA3OjEyLjg2OFpcIixcclxuICAgICAgICBcInRvdGFsXCI6NTAyMTAsXHJcbiAgICAgICAgXCJpdGVtc1wiOltcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiU2FsYWQgTWl4LCBUZW5kZXIgUnVieSBSZWRzXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6OCxcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6ODAzLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjY0MjRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiQmVldHMsIEJhYnkgR29sZGVuXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6NSxcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6OTc0LFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjQ4NzBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiQ2Fycm90cywgR29sZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjIsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjQ5NCxcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjo5ODhcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiQ2FiYmFnZSwgUmV0YWlsZXIgQXNzaWduZWRcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjo1LFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjo3MDQsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6MzUyMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJFZ2dwbGFudCAoQXViZXJnaW5lKSBSZXRcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjo1LFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjo3NzIsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6Mzg2MFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJDYXJyb3RzLCBHb2xkXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6NSxcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6MzgzLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjE5MTVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiQnJ1c3NlbHMgU3Byb3V0cywgU3RhbGtcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjozLFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjoxNTEsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6NDUzXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkxldHR1Y2UsIEJhYnlcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjo2LFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjoyMjYsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6MTM1NlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJTcXVhc2gsIEF1c3RyYWxpYW4gQmx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjgsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjE3NSxcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjoxNDAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkdyZWVucywgUG9sayBHcmVlbnNcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjoxMCxcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6Mjc2LFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjI3NjBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiTGV0dHVjZSwgVHJhdmlzc2lvXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6OSxcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6NDQzLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjM5ODdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiQ3JlYW15IEhvdCBXaGVhdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFudGl0eVwiOjgsXHJcbiAgICAgICAgICAgICAgICBcInVuaXRQcmljZVwiOjI3NixcclxuICAgICAgICAgICAgICAgIFwidG90YWxcIjoyMjA4XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkNhdWxpZmxvd2VyLCBQdXJwbGVcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjo2LFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjo0MzIsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6MjU5MlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJTcXVhc2gsIEdvbGRlbiBEZWxpY2lvdXNcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjoxLFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjo1NTYsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6NTU2XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIk9uaW9ucywgWWVsbG93XCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YW50aXR5XCI6MixcclxuICAgICAgICAgICAgICAgIFwidW5pdFByaWNlXCI6ODAzLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjE2MDZcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiTXVzaHJvb21zLCBPeXN0ZXJcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjozLFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjo4NzMsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6MjYxOVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJDdWN1bWJlciwgTGVtb25cIixcclxuICAgICAgICAgICAgICAgIFwicXVhbnRpdHlcIjoyLFxyXG4gICAgICAgICAgICAgICAgXCJ1bml0UHJpY2VcIjoxMDYsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsXCI6MjEyXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaXRlbXNcIjpbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJTdWJ0b3RhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsXCI6NDEzMjZcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiTUEgU3RhdGUgVGF4IEAgNi4yNSVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjI2ODZcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiR3JhdHVpdHlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjYxOThcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiR3JhbmQgVG90YWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbFwiOjUwMjEwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImNvbnRhY3RcIjpbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiZmFjZWJvb2tcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkZhY2Vib29rXCIsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJodHRwczovL3d3d3cuZmFjZWJvb2suY29tL0JKJ3NXaG9sZXNhbGVDbHViXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJ0d2l0dGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJUd2l0dGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJodHRwczovL3d3dy50d2l0dGVyLmNvbS9CSidzV2hvbGVzYWxlQ2x1YlwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOlwiaW5zdGFncmFtXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJJbnN0YWdyYW1cIixcclxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImh0dHBzOi8vd3d3Lmluc3RhZ3JhbS5jb20vQkonc1dob2xlc2FsZUNsdWJcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjpcImdvb2dsZVBsdXNcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIkdvb2dsZSBQbHVzXCIsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9CSidzV2hvbGVzYWxlQ2x1YlwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidHlwZVwiOlwidHdpdHRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiVHdpdHRlclwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiaHR0cHM6Ly93d3cudHdpdHRlci5jb20vQkonc1dob2xlc2FsZUNsdWJcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjpcInBpbnRlcmVzdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiUGludGVyZXN0XCIsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCJodHRwczovL3d3dy5waW50ZXJlc3QuY29tL0JKJ3NXaG9sZXNhbGVDbHViXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJ3ZWJcIixcclxuICAgICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjpcIldlYnNpdGVcIixcclxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjpcImh0dHBzOi8vd3d3LkJKJ3NXaG9sZXNhbGVDbHViLmNvbS9cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjpcImVtYWlsXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJFbWFpbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiQkonc1dob2xlc2FsZUNsdWJAZmxlY3Rpbm8uY29tXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBlXCI6XCJwaG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOlwiQ29ycG9yYXRlIFBob25lXCIsXHJcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6XCIrMTMxODQ0OTYzODdcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInR5cGVcIjpcInBob25lXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6XCJTdG9yZSBQaG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOlwiKzExNzczNjM0NjU3XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJhZ2VudFRva2VuXCI6XCJPRUlWa3ZSc3VmZnRtXzR5WHlVSFwiLFxyXG4gICAgICAgIFwiYWRkcmVzc1wiOntcclxuICAgICAgICAgICAgXCJsaW5lMVwiOlwiMjU2IE1jZmVycmVuIFN0XCIsXHJcbiAgICAgICAgICAgIFwiY2l0eVwiOlwiTGl2ZXpleVwiLFxyXG4gICAgICAgICAgICBcInN0YXRlXCI6XCJSSVwiLFxyXG4gICAgICAgICAgICBcInBvc3RhbENvZGVcIjoxMzQwMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdCAgIFx0cmV0dXJuIHtcclxuXHRcdFx0XHRhcGlLZXk6XCJZb3VyIHNlY3JldCBBUEkgS2V5XCIsXHJcblx0XHRcdFx0a2V5UHVsbGVkOiBmYWxzZSxcclxuXHRcdFx0XHRwcm9maWxlOiB0aGlzLnByb3BzLnVzZXIuZ2V0UHJvZmlsZSgpXHJcblx0XHQgXHR9O1xyXG5cdH0sXHJcblx0cHJlc2VudEtleTogZnVuY3Rpb24oKSB7XHJcblx0XHRpZighdGhpcy5zdGF0ZS5rZXlQdWxsZWQpIHRoaXMucHJvcHMudXNlci5nZXRTZWN1cmVQcm9maWxlKCkudGhlbigodXNlcik9PntcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7YXBpS2V5OnVzZXIuYXBwX21ldGFkYXRhLmtleSxrZXlQdWxsZWQ6dHJ1ZX0pO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJhY2NvdW50XCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlLWhlYWRlclwiPkFjY291bnQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBpbmZvQm94XCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdFx0PGg1PkVtYWlsPC9oNT5cclxuXHRcdFx0XHRcdFx0XHQ8c3Bhbj57dGhpcy5zdGF0ZS5wcm9maWxlLmVtYWlsfTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aDU+U3Vic2NyaXB0aW9uPC9oNT5cclxuXHRcdFx0XHRcdFx0XHQ8c3Bhbj5GcmVlIFVubGltaXRlZDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IG1hcmdpbi10b3AtMzVcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG5cdFx0XHRcdFx0XHRcdDxoNT5Vc2VyIElEPC9oNT5cclxuXHRcdFx0XHRcdFx0XHQ8c3Bhbj57dGhpcy5zdGF0ZS5wcm9maWxlLnVzZXJfaWR9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG5cdFx0XHRcdFx0XHRcdDxoNT5BcGkgS2V5Jm5ic3A7Jm5ic3A7PGEgaHJlZj1cImphdmFzY3JpcHQ6XCIgY2xhc3NOYW1lPVwiZm9udC1zaXplLTEyXCIgb25DbGljaz17dGhpcy5wcmVzZW50S2V5fT5TaG93PC9hPjwvaDU+XHJcblx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0KHRoaXMuc3RhdGUua2V5UHVsbGVkKT9cclxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBpZD1cImtleUJveFwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3RoaXMuc3RhdGUuYXBpS2V5fSByZWFkT25seS8+OlxyXG5cdFx0XHRcdFx0XHRcdFx0PGlucHV0IGlkPVwia2V5Qm94XCIgdHlwZT1cInBhc3N3b3JkXCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3RoaXMuc3RhdGUuYXBpS2V5fSByZWFkT25seS8+XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8vIDxkaXYgY2xhc3NOYW1lPVwicm93IGxpZ2h0LWJvcmRlclwiPlxyXG4vLyBcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTRcIj5cclxuLy8gXHRcdEZpcnN0IE5hbWU6XHJcbi8vIFx0PC9kaXY+XHJcbi8vIFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNFwiPlxyXG4vLyBcdFx0e3RoaXMucHJvcHMudXNlci5naXZlbk5hbWV9XHJcbi8vIFx0PC9kaXY+XHJcbi8vIDwvZGl2PlxyXG4vLyA8ZGl2IGNsYXNzTmFtZT1cInJvdyBsaWdodC1ib3JkZXJcIj5cclxuLy8gXHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00XCI+XHJcbi8vIFx0XHRMYXN0IE5hbWU6XHJcbi8vIFx0PC9kaXY+XHJcbi8vIFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNFwiPlxyXG4vLyBcdFx0e3RoaXMucHJvcHMudXNlci5zdXJOYW1lfVxyXG4vLyBcdDwvZGl2PlxyXG4vLyA8L2Rpdj5cclxuLy8gPGRpdiBjbGFzc05hbWU9XCJyb3cgbGlnaHQtYm9yZGVyXCI+XHJcbi8vIFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNFwiPlxyXG4vLyBcdFx0RW1haWw6XHJcbi8vIFx0PC9kaXY+XHJcbi8vIFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNFwiPlxyXG4vLyBcdFx0e3RoaXMucHJvcHMudXNlci5lbWFpbH1cclxuLy8gXHQ8L2Rpdj5cclxuLy8gXHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00XCI+XHJcbi8vIFx0XHR7KHRoaXMucHJvcHMudXNlci5pc0VtYWlsVmVyaWZpZWQpPzxzcGFuPjwvc3Bhbj46PHNwYW4+VmVyaWZ5IEVtYWlsPC9zcGFuPn1cclxuLy8gXHQ8L2Rpdj5cclxuLy8gPC9kaXY+XHJcbi8vIDxkaXYgY2xhc3NOYW1lPVwicm93IGxpZ2h0LWJvcmRlclwiPlxyXG4vLyBcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTRcIj5cclxuLy8gXHRcdE5vdGlmaWNhdGlvbiBQcmVmZXJlbmNlOlxyXG4vLyBcdDwvZGl2PlxyXG4vLyBcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTRcIj5cclxuLy8gXHRcdHsodGhpcy5wcm9wcy51c2VyLmVtYWlsUHJlZmVyZW5jZSA9PSAwKSA/IFwiSW1tZWRpYXRlbHlcIjpcIk5ldmVyXCJ9XHJcbi8vIFx0PC9kaXY+XHJcbi8vIDwvZGl2PlxyXG4vLyA8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi10b3AtNTAgcm93XCI+XHJcbi8vIFx0e1xyXG4vLyBcdFx0KHRoaXMuc3RhdGUuZWRpdE1vZGUpID8gKFxyXG4vLyBcdFx0XHQ8ZGl2PlxyXG4vLyBcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cclxuLy8gXHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlRWRpdE1vZGV9IGNsYXNzTmFtZT1cImNvbC14cy02IGNvbC14cy1vZmZzZXQtMyBidG4gYnRuLXNlY29uZGFyeSBtYXJnaW5Ub3AxNVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XHJcbi8vIFx0XHRcdFx0XHRcdFNhdmVcclxuLy8gXHRcdFx0XHRcdDwvYnV0dG9uPlxyXG4vLyBcdFx0XHRcdDwvZGl2PlxyXG4vLyBcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cclxuLy8gXHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlRWRpdE1vZGV9IGNsYXNzTmFtZT1cImNvbC14cy02IGNvbC14cy1vZmZzZXQtMyBidG4gbWFyZ2luVG9wMTVcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxyXG4vLyBcdFx0XHRcdFx0XHRDYW5jZWxcclxuLy8gXHRcdFx0XHRcdDwvYnV0dG9uPlxyXG4vLyBcdFx0XHRcdDwvZGl2PlxyXG4vLyBcdFx0XHQ8L2Rpdj5cclxuLy8gXHRcdCk6KFxyXG4vLyBcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcbi8vIFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17dGhpcy50b2dnbGVFZGl0TW9kZX0gY2xhc3NOYW1lPVwiY29sLXhzLTYgY29sLXhzLW9mZnNldC0zIGJ0biBidG4tcHJpbWFyeSBtYXJnaW5Ub3AxNVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XHJcbi8vIFx0XHRcdFx0XHRFZGl0XHJcbi8vIFx0XHRcdFx0PC9idXR0b24+XHJcbi8vIFx0XHRcdDwvZGl2PlxyXG4vLyBcdFx0KVxyXG4vLyBcdH1cclxuLy8gPC9kaXY+XHJcbiIsImltcG9ydCB7IFJlYWN0IH0gZnJvbSAnLi4vY2RuJ1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvRm9vdGVyLmpzJ1xyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPVwiYXV0aFwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZS1oZWFkZXJcIj5BPC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL0Zvb3Rlci5qcydcclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImRhc2hcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtaGVhZGVyXCI+RGFzaGJvYXJkPC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi4vY2xhc3Nlcy9Vc2VyJ1xyXG5pbXBvcnQgc2FtcGxlIGZyb20gJy4uL2RhdGEvdHJhbnNhY3Rpb25TYW1wbGUnXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnLmpzJ1xyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgXHRyZXR1cm4ge307XHJcblx0fSxcclxuXHRzZW5kUmVjZWlwdDpmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5wcm9wcy51c2VyLmdldEJhc2ljVG9rZW4oKS50aGVuKGZ1bmN0aW9uKHRva2VuKXtcclxuXHRcdFx0JC5hamF4KHtcclxuXHRcdFx0XHR1cmw6IGNvbmZpZy5hcGlIb3N0ICsgXCIvdjEvdHJhbnNhY3Rpb25cIixcclxuXHRcdFx0XHR0eXBlOiBcInBvc3RcIixcclxuXHRcdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XHRBdXRob3JpemF0aW9uOiB0b2tlblxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZGF0YTogc2FtcGxlXHJcblx0XHRcdH0pLnRoZW4oZnVuY3Rpb24oc3R1ZmYpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHN0dWZmKTtcclxuXHRcdFx0fSkuY2F0Y2goIChlcnIpID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIpO1xyXG5cdFx0XHRcdHRoaXMucHJvcHMubm90aWZpY2F0aW9uLmNyZWF0ZSh7bWVzc2FnZTpcIlRoZXJlIHdhcyBhbiBlcnJvciBnZXR0aW5nIHlvdXIga2V5cy5cIiwgdHlwZTpcImRhbmdlclwifSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJkb2NzXCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlLWhlYWRlclwiPkRvY3VtZW50YXRpb248L2Rpdj5cclxuXHRcdFx0XHQ8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuc2VuZFJlY2VpcHR9PlNlbmQgU2FtcGxlIFJlY2VpcHQ8L2J1dHRvbj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsImltcG9ydCB7IFJlYWN0IH0gZnJvbSAnLi4vY2RuJ1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvRm9vdGVyLmpzJ1xyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPVwic3VwcG9ydFwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZS1oZWFkZXJcIj5TdXBwb3J0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdERPTSwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuL2NkbidcclxuXHJcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAuanMnXHJcbmltcG9ydCBBdXRoIGZyb20gJy4vdmlld3MvYXV0aCdcclxuaW1wb3J0IERhc2ggZnJvbSAnLi92aWV3cy9kYXNoJ1xyXG4vLyBpbXBvcnQgQXBpS2V5IGZyb20gJy4vdmlld3MvYXBpS2V5J1xyXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuL3ZpZXdzL2FjY291bnQnXHJcbmltcG9ydCBEb2NzIGZyb20gJy4vdmlld3MvZG9jcydcclxuaW1wb3J0IFN1cHBvcnQgZnJvbSAnLi92aWV3cy9zdXBwb3J0J1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi9jbGFzc2VzL1VzZXInXHJcblxyXG52YXIgUm91dGVyID0gUmVhY3RSb3V0ZXIuUm91dGVyO1xyXG52YXIgUm91dGUgPSBSZWFjdFJvdXRlci5Sb3V0ZTtcclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5jb25zdCB1c2VyID0gbmV3IFVzZXIoY29uZmlnLmF1dGgwLmNsaWVudElkLCBjb25maWcuYXV0aDAuZG9tYWluKTtcclxuXHJcbi8vIHZhbGlkYXRlIGF1dGhlbnRpY2F0aW9uIGZvciBwcml2YXRlIHJvdXRlc1xyXG5jb25zdCByZXF1aXJlQXV0aCA9IChuZXh0U3RhdGUsIHJlcGxhY2UpID0+IHtcclxuXHRpZiAoIXVzZXIuaXNMb2dnZWRJbigpKSB7XHJcblx0XHRicm93c2VySGlzdG9yeS5wdXNoKFwiZGFzaFwiKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG59XHJcblxyXG5cclxuUmVhY3RET00ucmVuZGVyKChcclxuXHQ8Um91dGVyIGhpc3Rvcnk9e2Jyb3dzZXJIaXN0b3J5fT5cclxuXHRcdDxSb3V0ZSBjb21wb25lbnQ9e0FwcH0gdXNlcj17dXNlcn0+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiYXV0aFwiIGNvbXBvbmVudD17QXV0aH0gbmF2PXtmYWxzZX0vPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cImRvY3NcIiBjb21wb25lbnQ9e0RvY3N9IG5hdj17ZmFsc2V9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJkYXNoXCIgY29tcG9uZW50PXtEYXNofSBvbkVudGVyPXtyZXF1aXJlQXV0aH0gbmF2PXt0cnVlfS8+XHJcblx0XHRcdHsvKiA8Um91dGUgcGF0aD1cImFwaUtleVwiIGNvbXBvbmVudD17QXBpS2V5fSBvbkVudGVyPXtyZXF1aXJlQXV0aH0gbmF2PXt0cnVlfS8+ICovfVxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cImFjY291bnRcIiBjb21wb25lbnQ9e0FjY291bnR9IG9uRW50ZXI9e3JlcXVpcmVBdXRofSBuYXY9e3RydWV9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzdXBwb3J0XCIgY29tcG9uZW50PXtTdXBwb3J0fSBuYXY9e3RydWV9Lz5cclxuXHRcdDwvUm91dGU+XHJcblx0PC9Sb3V0ZXI+XHJcbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XHJcbiJdfQ==
