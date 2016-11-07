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
					_this.setProfile(profile);
					if (typeof profile.group != "undefined" && profile.group == "agent") browserHistory.push("dash");else browserHistory.push("dash");
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
		key: 'logout',
		value: function logout() {
			browserHistory.push('landing');
			// Clear user token and profile data from localStorage
			localStorage.removeItem('id_token');
			localStorage.removeItem('profile');
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
	logout: function logout() {
		_User2.default.deleteAuthorization();
		browserHistory.push("login");
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
							console.log(user.isLoggedIn(), item.private);
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
				"h3",
				{ className: "margin-bottom-25" },
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

},{"../cdn":3}],11:[function(require,module,exports){
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
				'h3',
				{ className: 'view-title margin-bottom-25' },
				'Dashboard'
			)
		);
	}
});

},{"../cdn":3,"../components/Footer.js":6}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require('../cdn');

var _Footer = require('../components/Footer.js');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _cdn.React.createClass({
	displayName: 'docs',


	render: function render() {
		return _cdn.React.createElement(
			'div',
			{ id: 'docs' },
			_cdn.React.createElement(
				'h3',
				{ className: 'margin-bottom-25' },
				'Documentation'
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
	displayName: 'landing',


	render: function render() {
		return _cdn.React.createElement(
			'div',
			{ id: 'landing' },
			_cdn.React.createElement(
				'h3',
				{ className: 'margin-bottom-25' },
				'Landing'
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
				'h3',
				{ className: 'margin-bottom-25' },
				'Support'
			)
		);
	}
});

},{"../cdn":3,"../components/Footer.js":6}],15:[function(require,module,exports){
'use strict';

var _cdn = require('./cdn');

var _app = require('./app.js');

var _app2 = _interopRequireDefault(_app);

var _landing = require('./views/landing');

var _landing2 = _interopRequireDefault(_landing);

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
		browserHistory.push("landing");
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
		React.createElement(Route, { path: 'landing', component: _landing2.default, nav: false }),
		React.createElement(Route, { path: 'docs', component: _docs2.default, nav: false }),
		React.createElement(Route, { path: 'dash', component: _dash2.default, onEnter: requireAuth, nav: true }),
		React.createElement(Route, { path: 'account', component: _account2.default, onEnter: requireAuth, nav: true }),
		React.createElement(Route, { path: 'support', component: _support2.default, nav: true })
	)
), document.getElementById('app'));

},{"../config":1,"./app.js":2,"./cdn":3,"./classes/User":4,"./views/account":10,"./views/dash":11,"./views/docs":12,"./views/landing":13,"./views/support":14}]},{},[15])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcY2RuLmpzIiwic3JjXFxjbGFzc2VzXFxVc2VyLmpzIiwic3JjXFxjbGFzc2VzXFxVdGlsaXRpZXMuanMiLCJzcmNcXGNvbXBvbmVudHNcXEZvb3Rlci5qcyIsInNyY1xcY29tcG9uZW50c1xcaGVhZGVyLmpzIiwic3JjXFxjb21wb25lbnRzXFxuYXYuanMiLCJzcmNcXGNvbXBvbmVudHNcXG5vdGlmaWNhdGlvbnMuanMiLCJzcmNcXHZpZXdzXFxhY2NvdW50LmpzIiwic3JjXFx2aWV3c1xcZGFzaC5qcyIsInNyY1xcdmlld3NcXGRvY3MuanMiLCJzcmNcXHZpZXdzXFxsYW5kaW5nLmpzIiwic3JjXFx2aWV3c1xcc3VwcG9ydC5qcyIsInNyY1xcd2ViLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQ0EsSUFBSSxjQUFjLGFBQWxCOztrQkFFZTtBQUNkLGNBQWEsV0FEQztBQUVkLFVBQVUsWUFBVTtBQUNuQixNQUFHLGVBQWUsWUFBbEIsRUFBZ0MsT0FBTyw2QkFBUCxDQUFoQyxLQUNLLE9BQU8sdUJBQVA7QUFDTCxFQUhTLEVBRkk7QUFNZCxVQUFVLFlBQVU7QUFDbkIsTUFBRyxlQUFlLFlBQWxCLEVBQWdDLE9BQU8sNkJBQVAsQ0FBaEMsS0FDSyxPQUFPLHVCQUFQO0FBQ0wsRUFIUyxFQU5JO0FBVWQsYUFBWSw2QkFWRTtBQVdkLFFBQU07QUFDTCxZQUFVLGtDQURMO0FBRUwsVUFBUTtBQUZIO0FBWFEsQzs7Ozs7Ozs7O0FDSGY7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxpQkFBaUIsaUJBQVksY0FBakM7O2tCQUVlLFdBQU0sV0FBTixDQUFrQjtBQUFBOztBQUNoQyxrQkFBaUIsMkJBQVc7QUFDM0IsU0FBTTtBQUNMLGtCQUFjO0FBRFQs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QUksaUJBQWlCLGlCQUFZLGNBQWpDOztBQUVBLElBQU0sT0FBTyxtQkFBUyxpQkFBTyxLQUFQLENBQWEsUUFBdEIsRUFBZ0MsaUJBQU8sS0FBUCxDQUFhLE1BQTdDLENBQWI7O0FBRUE7QUFDQSxJQUFNLGNBQWMsU0FBZCxXQUFjLENBQUMsU0FBRCxFQUFZLE9BQVosRUFBd0I7QUFDM0MsS0FBSSxDQUFDLEtBQUssVUFBTCxFQUFMLEVBQXdCO0FBQ3ZCLGlCQUFlLElBQWYsQ0FBb0IsU0FBcEI7QUFDQSxFQUZELE1BRU87QUFDTixTQUFPLElBQVA7QUFDQTtBQUNELENBTkQ7O0FBU0EsY0FBUyxNQUFULENBQ0M7QUFBQyxPQUFEO0FBQUEsR0FBUSxTQUFTLGNBQWpCO0FBQ0M7QUFBQyxPQUFEO0FBQUEsSUFBTyx3QkFBUCxFQUF1QixNQUFNLElBQTdCO0FBQ0Msc0JBQUMsS0FBRCxJQUFPLE1BQUssU0FBWixFQUFzQiw0QkFBdEIsRUFBMEMsS0FBSyxLQUEvQyxHQUREO0FBRUMsc0JBQUMsS0FBRCxJQUFPLE1BQUssTUFBWixFQUFtQix5QkFBbkIsRUFBb0MsS0FBSyxLQUF6QyxHQUZEO0FBR0Msc0JBQUMsS0FBRCxJQUFPLE1BQUssTUFBWixFQUFtQix5QkFBbkIsRUFBb0MsU0FBUyxXQUE3QyxFQUEwRCxLQUFLLElBQS9ELEdBSEQ7QUFLQyxzQkFBQyxLQUFELElBQU8sTUFBSyxTQUFaLEVBQXNCLDRCQUF0QixFQUEwQyxTQUFTLFdBQW5ELEVBQWdFLEtBQUssSUFBckUsR0FMRDtBQU1DLHNCQUFDLEtBQUQsSUFBTyxNQUFLLFNBQVosRUFBc0IsNEJBQXRCLEVBQTBDLEtBQUssSUFBL0M7QUFORDtBQURELENBREQsRUFXRyxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FYSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxudmFyIGVudmlyb25tZW50ID0gXCJkZXZlbG9wbWVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGVudmlyb25tZW50OiBlbnZpcm9ubWVudCxcclxuXHRhcGlIb3N0OiAoZnVuY3Rpb24oKXtcclxuXHRcdGlmKGVudmlyb25tZW50ID09IFwicHJvZHVjdGlvblwiKSByZXR1cm4gXCJodHRwOi8vYXBpdGVzdC5mbGVjdGluby5jb21cIjtcclxuXHRcdGVsc2UgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDozMDEwXCI7XHJcblx0fSgpKSxcclxuXHR3ZWJIb3N0OiAoZnVuY3Rpb24oKXtcclxuXHRcdGlmKGVudmlyb25tZW50ID09IFwicHJvZHVjdGlvblwiKSByZXR1cm4gXCJodHRwOi8vd2VidGVzdC5mbGVjdGluby5jb21cIjtcclxuXHRcdGVsc2UgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcblx0fSgpKSxcclxuXHRnYXRld2F5S2V5OiBcIkFVQjVqQ2tkcTNiN2tWOURUVGRpUWxsT1J2NVwiLFxyXG5cdGF1dGgwOntcclxuXHRcdGNsaWVudElkOiBcIjBTTTBnckJUb0NKaldHVWJCdGxadUhoeWxDcTJkVnQzXCIsXHJcblx0XHRkb21haW46IFwiZmxlY3Rpbm8uYXV0aDAuY29tXCJcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IHsgUmVhY3QsIFJlYWN0Um91dGVyfSBmcm9tICcuL2NkbidcclxuaW1wb3J0IEhlYWRlciBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyLmpzJ1xyXG5pbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICcuL2NvbXBvbmVudHMvbm90aWZpY2F0aW9ucy5qcydcclxuaW1wb3J0IE5hdiBmcm9tICcuL2NvbXBvbmVudHMvbmF2J1xyXG5pbXBvcnQgeyBnZXRRdWVyeVZhcmlhYmxlIH0gZnJvbSAnLi9jbGFzc2VzL1V0aWxpdGllcydcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi9jbGFzc2VzL1VzZXIuanMnXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnLmpzJ1xyXG5cclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybntcclxuXHRcdFx0bm90aWZpY2F0aW9uczpbXVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0Y3JlYXRlTm90aWZpY2F0aW9uOiBmdW5jdGlvbihub3RpZmljYXRpb24pe1xyXG5cdFx0dmFyIG5vdGlmaWNhdGlvbnMgPSB0aGlzLnN0YXRlLm5vdGlmaWNhdGlvbnM7XHJcblx0XHRub3RpZmljYXRpb25zLnB1c2gobm90aWZpY2F0aW9uKTtcclxuXHRcdHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbnM6bm90aWZpY2F0aW9uc30pO1xyXG5cclxuXHRcdHJldHVybjtcclxuXHR9LFxyXG5cdHJlbW92ZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obkluZGV4KXtcclxuXHRcdHZhciBub3RpZmljYXRpb25zID0gdGhpcy5zdGF0ZS5ub3RpZmljYXRpb25zO1xyXG5cdFx0bm90aWZpY2F0aW9ucy5zcGxpY2UobkluZGV4LDEpO1xyXG5cdFx0cmV0dXJuIHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbnM6bm90aWZpY2F0aW9uc30pO1xyXG5cdH0sXHJcblx0cmV0cmlldmVOb3RpZmljYXRpb25zOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuc3RhdGUubm90aWZpY2F0aW9ucztcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6ZnVuY3Rpb24obmV4dFByb3BzKXtcclxuXHRcdC8vIFJlbW92ZSBub3RpZmljYXRpb25zIHdoZW4gdmlldyBjaGFuZ2VzXHJcblx0XHRpZih0aGlzLnByb3BzLmxvY2F0aW9uLnBhdGhuYW1lICE9IG5leHRQcm9wcy5sb2NhdGlvbi5wYXRobmFtZSl7XHJcblx0XHRcdHZhciBub3RpZmljYXRpb25zID0gW107XHJcblx0XHRcdGlmICh0eXBlb2YgbmV4dFByb3BzLmxvY2F0aW9uLnF1ZXJ5Lm1lc3NhZ2UgIT0gXCJ1bmRlZmluZWRcIikgbm90aWZpY2F0aW9ucy5wdXNoKHttZXNzYWdlOm5leHRQcm9wcy5sb2NhdGlvbi5xdWVyeS5tZXNzYWdlfSk7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbnM6bm90aWZpY2F0aW9uc30pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0dmFyIG5vdGlmaWNhdGlvbnMgPSB0aGlzLnN0YXRlLm5vdGlmaWNhdGlvbnM7XHJcblx0XHRpZiAodHlwZW9mIGdldFF1ZXJ5VmFyaWFibGUoXCJtZXNzYWdlXCIpICE9IFwidW5kZWZpbmVkXCIpIG5vdGlmaWNhdGlvbnMucHVzaCh7bWVzc2FnZTpnZXRRdWVyeVZhcmlhYmxlKFwibWVzc2FnZVwiKS5zcGxpdChcIitcIikuam9pbihcIiBcIil9KTtcclxuXHJcblx0XHRyZXR1cm47XHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0dmFyIHZpZXcgPSB0aGlzLnByb3BzLnJvdXRlc1sxXTtcclxuXHRcdHZhciBwYXNzID0ge1xyXG5cdFx0XHRub3RpZmljYXRpb246e1xyXG5cdFx0XHRcdGNyZWF0ZTogdGhpcy5jcmVhdGVOb3RpZmljYXRpb24sXHJcblx0XHRcdFx0cmVtb3ZlOiB0aGlzLnJlbW92ZU5vdGlmaWNhdGlvbixcclxuXHRcdFx0XHRyZXRyaWV2ZTogdGhpcy5yZXRyaWV2ZU5vdGlmaWNhdGlvbnNcclxuXHRcdFx0fSxcclxuXHRcdFx0dXNlcjogdGhpcy5wcm9wcy5yb3V0ZS51c2VyXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKFxyXG4gICAgICAgICA8ZGl2PlxyXG5cdFx0XHRcdDxOb3RpZmljYXRpb25zIG5vdGlmaWNhdGlvbj17cGFzcy5ub3RpZmljYXRpb259Lz5cclxuICAgICAgICAgICAgPEhlYWRlciBub3RpZmljYXRpb249e3Bhc3Mubm90aWZpY2F0aW9ufSB1c2VyPXt0aGlzLnByb3BzLnJvdXRlLnVzZXJ9IG5hdj17dmlldy5uYXZ9Lz5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtYm9keVwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgZml4LXdpZHRoXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IHZpZXdcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMlwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0e1JlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLmNoaWxkcmVuLCBwYXNzKX1cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuICAgICAgICAgPC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsIlxyXG52YXIgJCA9IHdpbmRvdy4kO1xyXG52YXIgalF1ZXJ5ID0gJDtcclxudmFyIFJlYWN0ID0gd2luZG93LlJlYWN0O1xyXG52YXIgUmVhY3RET00gPSB3aW5kb3cuUmVhY3RET007XHJcbnZhciBSZWFjdFJvdXRlciA9IHdpbmRvdy5SZWFjdFJvdXRlcjtcclxudmFyIEF1dGgwTG9jayA9IHdpbmRvdy5BdXRoMExvY2s7XHJcbmV4cG9ydCB7ICQsIGpRdWVyeSwgUmVhY3QsIFJlYWN0RE9NLCBSZWFjdFJvdXRlciwgQXV0aDBMb2NrIH1cclxuIiwiaW1wb3J0IHsgQXV0aDBMb2NrLCBSZWFjdFJvdXRlciB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcuanMnXHJcbnZhciBicm93c2VySGlzdG9yeSA9IFJlYWN0Um91dGVyLmJyb3dzZXJIaXN0b3J5O1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIHtcclxuXHJcblx0Y29uc3RydWN0b3IoY2xpZW50SWQsZG9tYWluLGlzQ2xvc2FibGUpIHtcclxuXHRcdC8vIENvbmZpZ3VyZSBBdXRoMFxyXG5cdFx0dGhpcy5sb2NrID0gbmV3IEF1dGgwTG9jayhjbGllbnRJZCwgZG9tYWluLCB7XHJcblx0XHRcdGFsbG93ZWRDb25uZWN0aW9uczogWydmbGVjdGluby1kZXYnLCAnZ2l0aHViJywgJ2dvb2dsZS1vYXV0aDInXSxcclxuXHRcdFx0c29jaWFsQnV0dG9uU3R5bGU6ICdzbWFsbCcsXHJcblx0XHRcdGxhbmd1YWdlRGljdGlvbmFyeToge1xyXG5cdFx0XHRcdHRpdGxlOiBcIkhpXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0dGhlbWU6e1xyXG5cdFx0XHRcdGxvZ286ICdodHRwOi8vaW1nMDYuZGV2aWFudGFydC5uZXQvY2U4Ni9pLzIwMTMvMDI3LzEvNS9iYXRtYW5fbG9nb19vbmx5X2J5X2RlYXRob25hYnVuLWQ1c3dmMnUucG5nJyxcclxuXHRcdFx0XHRwcmltYXJ5Q29sb3I6ICcjMzEzMjRGJ1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdC8vIEFkZCBjYWxsYmFjayBmb3IgbG9jayBgYXV0aGVudGljYXRlZGAgZXZlbnRcclxuXHRcdHRoaXMubG9jay5vbignYXV0aGVudGljYXRlZCcsIHRoaXMub25BdXRoZW50aWNhdGlvbi5iaW5kKHRoaXMpKVxyXG5cdFx0Ly8gYmluZHMgbG9naW4gZnVuY3Rpb25zIHRvIGtlZXAgdGhpcyBjb250ZXh0XHJcblx0XHR0aGlzLmxvZ2luID0gdGhpcy5sb2dpbi5iaW5kKHRoaXMpXHJcblx0fVxyXG5cclxuXHRvbkF1dGhlbnRpY2F0aW9uKGF1dGhSZXN1bHQpe1xyXG5cdCAgIC8vIFNhdmVzIHRoZSB1c2VyIHRva2VuXHJcblx0XHR0aGlzLnNldFRva2VuKGF1dGhSZXN1bHQuaWRUb2tlbik7XHJcblx0XHR0aGlzLmxvY2suZ2V0UHJvZmlsZShhdXRoUmVzdWx0LmlkVG9rZW4sIChlcnJvciwgcHJvZmlsZSkgPT4ge1xyXG5cdFx0XHRpZiAoZXJyb3IpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnRXJyb3IgbG9hZGluZyB0aGUgUHJvZmlsZScsIGVycm9yKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2V0UHJvZmlsZShwcm9maWxlKTtcclxuXHRcdFx0XHRpZiAodHlwZW9mIHByb2ZpbGUuZ3JvdXAgIT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9maWxlLmdyb3VwID09IFwiYWdlbnRcIikgYnJvd3Nlckhpc3RvcnkucHVzaChcImRhc2hcIik7XHJcblx0XHRcdFx0ZWxzZSBicm93c2VySGlzdG9yeS5wdXNoKFwiZGFzaFwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHNldFByb2ZpbGUocHJvZmlsZSl7XHJcblx0XHQvLyBTYXZlcyBwcm9maWxlIGRhdGEgdG8gbG9jYWxTdG9yYWdlXHJcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvZmlsZScsIEpTT04uc3RyaW5naWZ5KHByb2ZpbGUpKVxyXG5cdH1cclxuXHJcblx0Z2V0UHJvZmlsZSgpe1xyXG5cdFx0Ly8gUmV0cmlldmVzIHRoZSBwcm9maWxlIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcclxuXHRcdGNvbnN0IHByb2ZpbGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZmlsZScpXHJcblx0XHRyZXR1cm4gcHJvZmlsZSA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLnByb2ZpbGUpIDoge31cclxuXHR9XHJcblxyXG5cdGdldFNlY3VyZVByb2ZpbGUoKXtcclxuXHRcdHJldHVybiAkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IGNvbmZpZy5hcGlIb3N0ICsgXCIvdXNlclwiLFxyXG5cdFx0XHR0eXBlOiBcImdldFwiLFxyXG5cdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0QXV0aG9yaXphdGlvbjogXCJCZWFyZXIgXCIgKyB0aGlzLmdldFRva2VuKClcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRsb2dpbigpIHtcclxuXHRcdC8vIENhbGwgdGhlIHNob3cgbWV0aG9kIHRvIGRpc3BsYXkgdGhlIHdpZGdldC5cclxuXHRcdHRoaXMubG9jay5zaG93KClcclxuXHR9XHJcblxyXG5cdGlzTG9nZ2VkSW4oKXtcclxuXHRcdC8vIENoZWNrcyBpZiB0aGVyZSBpcyBhIHNhdmVkIHRva2VuIGFuZCBpdCdzIHN0aWxsIHZhbGlkXHJcblx0XHRyZXR1cm4gISF0aGlzLmdldFRva2VuKClcclxuXHR9XHJcblxyXG5cdHNldFRva2VuKGlkVG9rZW4pe1xyXG5cdFx0Ly8gU2F2ZXMgdXNlciB0b2tlbiB0byBsb2NhbFN0b3JhZ2VcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZF90b2tlbicsIGlkVG9rZW4pXHJcblx0fVxyXG5cclxuXHRnZXRUb2tlbigpe1xyXG5cdFx0Ly8gUmV0cmlldmVzIHRoZSB1c2VyIHRva2VuIGZyb20gbG9jYWxTdG9yYWdlXHJcblx0XHRyZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJylcclxuXHR9XHJcblxyXG5cdGxvZ291dCgpe1xyXG5cdFx0YnJvd3Nlckhpc3RvcnkucHVzaCgnbGFuZGluZycpO1xyXG5cdFx0Ly8gQ2xlYXIgdXNlciB0b2tlbiBhbmQgcHJvZmlsZSBkYXRhIGZyb20gbG9jYWxTdG9yYWdlXHJcblx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnaWRfdG9rZW4nKTtcclxuXHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdwcm9maWxlJyk7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHVwZGF0ZShwb3N0RGF0YSl7XHJcblx0XHRyZXR1cm4gJC5hamF4KHtcclxuXHRcdFx0dXJsOiBjb25maWcuYXBpSG9zdCArIFwiL3VzZXJzL1wiICsgdGhpcy5nZXRQcm9maWxlKCkudXNlcl9pZCxcclxuXHRcdFx0dHlwZTogXCJwYXRjaFwiLFxyXG5cdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0QXV0aG9yaXphdGlvbjogXCJCZWFyZXIgXCIgKyB0aGlzLmdldFRva2VuKCksXHJcblx0XHRcdH0sXHJcblx0XHRcdGRhdGE6cG9zdERhdGFcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG4iLCJcclxuXHJcbnZhciBnZXRRdWVyeVZhcmlhYmxlID0gZnVuY3Rpb24odmFyaWFibGUpIHtcclxuXHR2YXIgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcclxuXHR2YXIgcHJlVmFycyA9IHF1ZXJ5LnNwbGl0KCcvJyk7XHJcblx0dmFyIHZhcnMgPSBwcmVWYXJzWzBdLnNwbGl0KCcmJyk7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoJz0nKTtcclxuXHRcdGlmIChkZWNvZGVVUklDb21wb25lbnQocGFpclswXSkgPT0gdmFyaWFibGUpIHtcclxuXHRcdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y29uc29sZS5sb2coJ1F1ZXJ5IHZhcmlhYmxlICVzIG5vdCBmb3VuZCcsIHZhcmlhYmxlKTtcclxufVxyXG5cclxudmFyIGlzVmFsaWQgPSB7XHJcblx0ZW1haWw6IGZ1bmN0aW9uKGVtYWlsKSB7XHJcblx0XHR2YXIgcmUgPSAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcclxuXHRcdHJldHVybiByZS50ZXN0KGVtYWlsKTtcclxuXHR9LFxyXG5cdHBob25lOiBmdW5jdGlvbihwaG9uZSkge1xyXG5cdFx0dmFyIHN0cmlwUGhvbmUgPSBwaG9uZS5yZXBsYWNlKC9cXEQvZywnJyk7XHJcblx0XHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPj0gMTApIHJldHVybiB0cnVlO1xyXG5cdFx0ZWxzZSBmYWxzZTtcclxuXHR9XHJcbn1cclxuXHJcbnZhciBmb3JtYXRQaG9uZTEwID0gZnVuY3Rpb24ocGhvbmUpe1xyXG5cdHZhciBzdHJpcFBob25lID0gcGhvbmUucmVwbGFjZSgvXFxEL2csJycpO1xyXG5cdHZhciBkYXNoID0gXCJcIjtcclxuXHR2YXIgb3BlblBhcmVuID0gXCJcIjtcclxuXHR2YXIgY2xvc2VkUGFyZW4gPSBcIlwiO1xyXG5cdGlmIChzdHJpcFBob25lLmxlbmd0aCA+IDApIG9wZW5QYXJlbiA9IFwiKFwiO1xyXG5cdGlmIChzdHJpcFBob25lLmxlbmd0aCA+IDMpIGNsb3NlZFBhcmVuID0gXCIpXCI7XHJcblx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID4gNikgZGFzaCA9IFwiLVwiO1xyXG5cdHZhciBmb3JtYXR0ZWRQaG9uZSA9IG9wZW5QYXJlbiArIHN0cmlwUGhvbmUuc3Vic3RyaW5nKDAsMykgKyBjbG9zZWRQYXJlbiArIHN0cmlwUGhvbmUuc3Vic3RyaW5nKDMsNikgKyBkYXNoICsgc3RyaXBQaG9uZS5zdWJzdHJpbmcoNiwxMCk7XHJcblx0cmV0dXJuIGZvcm1hdHRlZFBob25lO1xyXG59XHJcblxyXG52YXIgZ2V0VGltZXpvbmVPZmZzZXQgPSBmdW5jdGlvbigpe1xyXG5cdGZ1bmN0aW9uIHBhZChudW1iZXIsIGxlbmd0aCl7XHJcblx0XHQgdmFyIHN0ciA9IFwiXCIgKyBudW1iZXJcclxuXHRcdCB3aGlsZSAoc3RyLmxlbmd0aCA8IGxlbmd0aCkge1xyXG5cdFx0XHQgIHN0ciA9ICcwJytzdHJcclxuXHRcdCB9XHJcblx0XHQgcmV0dXJuIHN0clxyXG5cdH1cclxuXHR2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0dmFyIG9mZnNldCA9IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcclxuXHRyZXR1cm4gKChvZmZzZXQ8MD8gJysnOictJykgKyBwYWQocGFyc2VJbnQoTWF0aC5hYnMob2Zmc2V0LzYwKSksIDIpKyBwYWQoTWF0aC5hYnMob2Zmc2V0JTYwKSwgMikpO1xyXG59XHJcblxyXG52YXIgY3JlYXRlVGltZURhdGUgPSBmdW5jdGlvbihkYXRlLCB0aW1lKXtcclxuXHR2YXIgbWlsZXN0b25lRGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG5cdHZhciBzdHJTcGxpdCA9IHRpbWUuc3BsaXQoJzonKTtcclxuXHR2YXIgaG91ciA9IHBhcnNlSW50KHN0clNwbGl0WzBdKTtcclxuXHR2YXIgbWludXRlID0gcGFyc2VJbnQoc3RyU3BsaXRbMV0uc3Vic3RyaW5nKDAsMikpO1xyXG5cdHZhciBzZXQgPSBzdHJTcGxpdFsxXS5zdWJzdHJpbmcoMiw0KTtcclxuXHRpZiAoaG91ciA9PT0gMTIpIHtcclxuXHRcdGlmIChzZXQgPT09IFwiYW1cIikgaG91ciA9IDA7XHJcblx0XHRlbHNlIGhvdXIgPSAxMjtcclxuXHR9IGVsc2UgaWYgKHNldCA9PT0gXCJwbVwiKSBob3VyICs9IDEyO1xyXG5cdG1pbGVzdG9uZURhdGUuc2V0SG91cnMoaG91cik7XHJcblx0bWlsZXN0b25lRGF0ZS5zZXRNaW51dGVzKG1pbnV0ZSk7XHJcblx0bWlsZXN0b25lRGF0ZS5zZXRNaW51dGVzKG1pbGVzdG9uZURhdGUuZ2V0TWludXRlcygpIC0gIG1pbGVzdG9uZURhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSk7XHJcblx0cmV0dXJuIG1pbGVzdG9uZURhdGUudG9JU09TdHJpbmcoKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IGdldFF1ZXJ5VmFyaWFibGUsIGlzVmFsaWQsIGZvcm1hdFBob25lMTAsIGdldFRpbWV6b25lT2Zmc2V0LCBjcmVhdGVUaW1lRGF0ZSB9XHJcbiIsImltcG9ydCB7IFJlYWN0LCBSZWFjdFJvdXRlciB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcuanMnXHJcbmltcG9ydCBVc2VyIGZyb20gJy4uL2NsYXNzZXMvVXNlci5qcydcclxuXHJcbnZhciBMaW5rID0gUmVhY3RSb3V0ZXIuTGluaztcclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPVwiZm9vdGVyXCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXJnaW4tYm90dG9tLTEwXCI+UmVzb3VyY2VzPC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXY+Rm9yIEN1c3RvbWVyczwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2PkZvciBSZXRhaWxlcnM8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdj5Gb3IgRGV2ZWxvcGVyczwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi1ib3R0b20tMTBcIj5IZWxwPC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdFx0ey8qIDxkaXYgY2xhc3NOYW1lPVwibWFyZ2luLWJvdHRvbS0xMFwiPlJlc291cmNlczwvZGl2PiAqL31cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXJnaW4tYm90dG9tLTEwXCI+QWJvdXQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi1ib3R0b20tMTBcIj5Db250YWN0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXY+Q2FsbDogKDg4OCk5MzAtMjkzODwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2PkVtYWlsOiBpbmZvQGhpLmNvbTwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuLi9jZG4nXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnLmpzJ1xyXG5pbXBvcnQgVXNlciBmcm9tICcuLi9jbGFzc2VzL1VzZXIuanMnXHJcblxyXG52YXIgTGluayA9IFJlYWN0Um91dGVyLkxpbms7XHJcbnZhciBicm93c2VySGlzdG9yeSA9IFJlYWN0Um91dGVyLmJyb3dzZXJIaXN0b3J5O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm57XHJcblx0XHRcdG5hdjpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bmFtZTogXCJEYXNoYm9hcmRcIixcclxuXHRcdFx0XHRcdGxpbms6IFwiZGFzaFwiLFxyXG5cdFx0XHRcdFx0cHJpdmF0ZTogdHJ1ZVxyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0bmFtZTpcIkFjY291bnRcIixcclxuXHRcdFx0XHRcdGxpbms6XCJhY2NvdW50XCIsXHJcblx0XHRcdFx0XHRwcml2YXRlOiB0cnVlXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOiBcIlN1cHBvcnRcIixcclxuXHRcdFx0XHRcdGxpbms6IFwic3VwcG9ydFwiLFxyXG5cdFx0XHRcdFx0cHJpdmF0ZTogdHJ1ZVxyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0bmFtZTogXCJEb2N1bWVudGF0aW9uXCIsXHJcblx0XHRcdFx0XHRsaW5rOiBcImRvY3NcIixcclxuXHRcdFx0XHRcdHByaXZhdGU6IHRydWVcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiTG9nb3V0XCIsXHJcblx0XHRcdFx0XHRsaW5rOlwibG9nb3V0XCIsXHJcblx0XHRcdFx0XHRwcml2YXRlOiB0cnVlXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOiBcIkxvZ2luXCIsXHJcblx0XHRcdFx0XHRsaW5rOlwibG9naW5cIixcclxuXHRcdFx0XHRcdHByaXZhdGU6IGZhbHNlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHJcblx0XHR9XHJcblx0fSxcclxuXHRsb2dvdXQ6IGZ1bmN0aW9uKCl7XHJcblx0XHRVc2VyLmRlbGV0ZUF1dGhvcml6YXRpb24oKTtcclxuXHRcdGJyb3dzZXJIaXN0b3J5LnB1c2goXCJsb2dpblwiKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0dmFyIHVzZXIgPSB0aGlzLnByb3BzLnVzZXI7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImhlYWRlclwiPlxyXG5cdFx0XHRcdDxuYXYgY2xhc3NOYW1lPVwibmF2YmFyIG5hdmJhci1maXhlZC10b3BcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGZpeC13aWR0aFwiPlxyXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwibmF2YmFyLWJyYW5kXCIgaHJlZj1cIiNcIj5GbGVjdGlubzwvc3Bhbj5cclxuXHRcdFx0XHRcdDx1bCBjbGFzc05hbWU9XCJuYXYgbmF2YmFyLW5hdiBoaWRkZW4tc20tZG93biBmbG9hdC14cy1yaWdodFwiPlxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5zdGF0ZS5uYXYubWFwKChpdGVtLCBpKT0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc29sZS5sb2codXNlci5pc0xvZ2dlZEluKCksaXRlbS5wcml2YXRlKVxyXG5cdFx0XHRcdFx0XHRcdFx0aWYodXNlci5pc0xvZ2dlZEluKCkgJiYgaXRlbS5wcml2YXRlKSByZXR1cm4oXHJcblx0XHRcdFx0XHRcdFx0XHRcdDxsaSBrZXk9e2l9IGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0KGl0ZW0ubmFtZSA9PSBcIkxvZ291dFwiKT9cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgb25DbGljaz17dGhpcy5wcm9wcy51c2VyLmxvZ291dH0+e2l0ZW0ubmFtZX08L2E+OlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PExpbmsgdG89e2l0ZW0ubGlua30gY2xhc3NOYW1lPVwibmF2LWxpbmtcIj57aXRlbS5uYW1lfTwvTGluaz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZighdXNlci5pc0xvZ2dlZEluKCkgJiYgIWl0ZW0ucHJpdmF0ZSkgcmV0dXJuKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8bGkga2V5PXtpfSBjbGFzc05hbWU9XCJuYXYtaXRlbVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIGNsYXNzTmFtZT1cIm5hdi1saW5rXCIgb25DbGljaz17dGhpcy5wcm9wcy51c2VyLmxvZ2lufT57aXRlbS5uYW1lfTwvYT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQ8L3VsPlxyXG5cdFx0XHRcdFx0PGEgaHJlZj1cImphdmFzY3JpcHQ6XCIgY2xhc3NOYW1lPVwibmF2YmFyLXRvZ2dsZXIgZmxvYXQteHMtcmlnaHQgaGlkZGVuLW1kLXVwXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiI2V4Q29sbGFwc2luZ05hdmJhclwiPlxyXG5cdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS1iYXJzXCI+PC9pPlxyXG5cdFx0XHRcdFx0PC9hPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9uYXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuLi9jZG4nXHJcbmltcG9ydCBVc2VyIGZyb20gJy4uL2NsYXNzZXMvVXNlci5qcydcclxuXHJcbnZhciBMaW5rID0gUmVhY3RSb3V0ZXIuTGluaztcclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybntcclxuXHRcdFx0bmF2OltcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRuYW1lOiBcIkRhc2hib2FyZFwiLFxyXG5cdFx0XHRcdFx0bGluazogXCJkYXNoXCIsXHJcblx0XHRcdFx0XHRpY29uOiBcImZhLWJhci1jaGFydFwiXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOlwiQWNjb3VudFwiLFxyXG5cdFx0XHRcdFx0bGluazpcImFjY291bnRcIixcclxuXHRcdFx0XHRcdGljb246IFwiZmEtdXNlci1vXCJcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiU3VwcG9ydFwiLFxyXG5cdFx0XHRcdFx0bGluazogXCJzdXBwb3J0XCIsXHJcblx0XHRcdFx0XHRpY29uOiBcImZhLWNvbW1lbnQtb1wiXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOiBcIkRvY3VtZW50YXRpb25cIixcclxuXHRcdFx0XHRcdGxpbms6IFwiZG9jc1wiLFxyXG5cdFx0XHRcdFx0aWNvbjogXCJmYS1ib29rXCJcclxuXHRcdFx0XHR9LHtcclxuXHRcdFx0XHRcdG5hbWU6IFwiTG9nb3V0XCIsXHJcblx0XHRcdFx0XHRsaW5rOlwibG9nb3V0XCIsXHJcblx0XHRcdFx0XHRpY29uOiBcImZhLXNpZ24tb3V0XCJcclxuXHRcdFx0XHR9XHJcblx0XHRcdF1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGxvZ291dDogZnVuY3Rpb24oKXtcclxuXHRcdFVzZXIuZGVsZXRlQXV0aG9yaXphdGlvbigpO1xyXG5cdFx0YnJvd3Nlckhpc3RvcnkucHVzaChcImxvZ2luXCIpO1xyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHZhciBmcmFnID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3BsaXQoXCI/XCIpWzBdO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cIm5hdlwiPlxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHRoaXMuc3RhdGUubmF2Lm1hcCgoaXRlbSwgaSk9PntcclxuXHRcdFx0XHRcdFx0aWYgKGl0ZW0ubmFtZSA9PSBcIkxvZ291dFwiKSByZXR1cm4oXHJcblx0XHRcdFx0XHRcdFx0PGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cImxpbmtCb3hcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIG9uQ2xpY2s9e3RoaXMucHJvcHMudXNlci5sb2dvdXR9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9e1wiZmEgZmEtZncgY29sb3ItcHJpbWFyeS1tdXRlZCBcIiArIGl0ZW0uaWNvbn0+PC9pPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8c3Bhbj4mbmJzcDsmbmJzcDt7aXRlbS5uYW1lfTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdDwvYT5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0ZWxzZSByZXR1cm4oXHJcblx0XHRcdFx0XHRcdFx0PGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cImxpbmtCb3hcIj5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHQ8TGluayB0bz17aXRlbS5saW5rfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPXtcImZhIGZhLWZ3IGNvbG9yLWJsYWNrIGNvbG9yLXByaW1hcnktbXV0ZWQgXCIgKyBpdGVtLmljb259PjwvaT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4+Jm5ic3A7Jm5ic3A7e2l0ZW0ubmFtZX08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L0xpbms+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsImltcG9ydCB7IFJlYWN0IH0gZnJvbSAnLi4vY2RuJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblx0XHR2YXIgbm90aWZpY2F0aW9ucyA9IHRoaXMucHJvcHMubm90aWZpY2F0aW9uLnJldHJpZXZlKCk7XHJcblx0XHR2YXIgbm90aWZpY2F0aW9uVmlldyA9ICg8ZGl2PjwvZGl2Pik7XHJcblx0XHRpZiAobm90aWZpY2F0aW9ucy5sZW5ndGggPiAwKXtcclxuXHRcdFx0bm90aWZpY2F0aW9uVmlldyA9IChcclxuXHRcdFx0XHQ8ZGl2IGlkPVwibm90aWZpY2F0aW9uc1wiPlxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRub3RpZmljYXRpb25zLm1hcCgobm90aWZpY2F0aW9uLCBpKT0+e1xyXG5cdFx0XHRcdFx0XHRcdGlmIChub3RpZmljYXRpb24udHlwZSA9PSB1bmRlZmluZWQpIG5vdGlmaWNhdGlvbi50eXBlID0gXCJzdWNjZXNzXCI7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuKFxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9e1wiYWxlcnQgYWxlcnQtXCIgKyBub3RpZmljYXRpb24udHlwZX0ga2V5PXtpfSBkYXRhLW5JbmRleD17aX0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdHtub3RpZmljYXRpb24ubWVzc2FnZX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2xvc2VcIiBvbkNsaWNrPXsgKCkgPT4gdGhpcy5wcm9wcy5ub3RpZmljYXRpb24ucmVtb3ZlKGkpIH0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4+JnRpbWVzOzwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG4gICAgXHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHRcdHJldHVybiBub3RpZmljYXRpb25WaWV3O1xyXG5cdH1cclxufSk7XHJcbiIsImltcG9ydCB7IFJlYWN0IH0gZnJvbSAnLi4vY2RuJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcblx0ICAgXHRyZXR1cm4ge1xyXG5cdFx0XHRcdGFwaUtleTpcIllvdXIgc2VjcmV0IEFQSSBLZXlcIixcclxuXHRcdFx0XHRrZXlQdWxsZWQ6IGZhbHNlLFxyXG5cdFx0XHRcdHByb2ZpbGU6IHRoaXMucHJvcHMudXNlci5nZXRQcm9maWxlKClcclxuXHRcdCBcdH07XHJcblx0fSxcclxuXHRwcmVzZW50S2V5OiBmdW5jdGlvbigpIHtcclxuXHRcdGlmKCF0aGlzLnN0YXRlLmtleVB1bGxlZCkgdGhpcy5wcm9wcy51c2VyLmdldFNlY3VyZVByb2ZpbGUoKS50aGVuKCh1c2VyKT0+e1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHthcGlLZXk6dXNlci5hcHBfbWV0YWRhdGEua2V5LGtleVB1bGxlZDp0cnVlfSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImFjY291bnRcIj5cclxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwibWFyZ2luLWJvdHRvbS0yNVwiPkFjY291bnQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGluZm9Cb3hcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aDU+RW1haWw8L2g1PlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuPnt0aGlzLnN0YXRlLnByb2ZpbGUuZW1haWx9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG5cdFx0XHRcdFx0XHRcdDxoNT5TdWJzY3JpcHRpb248L2g1PlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuPkZyZWUgVW5saW1pdGVkPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgbWFyZ2luLXRvcC0zNVwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdFx0PGg1PlVzZXIgSUQ8L2g1PlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuPnt0aGlzLnN0YXRlLnByb2ZpbGUudXNlcl9pZH08L3NwYW4+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdFx0PGg1PkFwaSBLZXkmbmJzcDsmbmJzcDs8YSBocmVmPVwiamF2YXNjcmlwdDpcIiBjbGFzc05hbWU9XCJmb250LXNpemUtMTJcIiBvbkNsaWNrPXt0aGlzLnByZXNlbnRLZXl9PlNob3c8L2E+PC9oNT5cclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHQodGhpcy5zdGF0ZS5rZXlQdWxsZWQpP1xyXG5cdFx0XHRcdFx0XHRcdFx0PGlucHV0IGlkPVwia2V5Qm94XCIgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17dGhpcy5zdGF0ZS5hcGlLZXl9IHJlYWRPbmx5Lz46XHJcblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJrZXlCb3hcIiB0eXBlPVwicGFzc3dvcmRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17dGhpcy5zdGF0ZS5hcGlLZXl9IHJlYWRPbmx5Lz5cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG5cclxuLy8gPGRpdiBjbGFzc05hbWU9XCJyb3cgbGlnaHQtYm9yZGVyXCI+XHJcbi8vIFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNFwiPlxyXG4vLyBcdFx0Rmlyc3QgTmFtZTpcclxuLy8gXHQ8L2Rpdj5cclxuLy8gXHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00XCI+XHJcbi8vIFx0XHR7dGhpcy5wcm9wcy51c2VyLmdpdmVuTmFtZX1cclxuLy8gXHQ8L2Rpdj5cclxuLy8gPC9kaXY+XHJcbi8vIDxkaXYgY2xhc3NOYW1lPVwicm93IGxpZ2h0LWJvcmRlclwiPlxyXG4vLyBcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTRcIj5cclxuLy8gXHRcdExhc3QgTmFtZTpcclxuLy8gXHQ8L2Rpdj5cclxuLy8gXHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00XCI+XHJcbi8vIFx0XHR7dGhpcy5wcm9wcy51c2VyLnN1ck5hbWV9XHJcbi8vIFx0PC9kaXY+XHJcbi8vIDwvZGl2PlxyXG4vLyA8ZGl2IGNsYXNzTmFtZT1cInJvdyBsaWdodC1ib3JkZXJcIj5cclxuLy8gXHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00XCI+XHJcbi8vIFx0XHRFbWFpbDpcclxuLy8gXHQ8L2Rpdj5cclxuLy8gXHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00XCI+XHJcbi8vIFx0XHR7dGhpcy5wcm9wcy51c2VyLmVtYWlsfVxyXG4vLyBcdDwvZGl2PlxyXG4vLyBcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTRcIj5cclxuLy8gXHRcdHsodGhpcy5wcm9wcy51c2VyLmlzRW1haWxWZXJpZmllZCk/PHNwYW4+PC9zcGFuPjo8c3Bhbj5WZXJpZnkgRW1haWw8L3NwYW4+fVxyXG4vLyBcdDwvZGl2PlxyXG4vLyA8L2Rpdj5cclxuLy8gPGRpdiBjbGFzc05hbWU9XCJyb3cgbGlnaHQtYm9yZGVyXCI+XHJcbi8vIFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNFwiPlxyXG4vLyBcdFx0Tm90aWZpY2F0aW9uIFByZWZlcmVuY2U6XHJcbi8vIFx0PC9kaXY+XHJcbi8vIFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNFwiPlxyXG4vLyBcdFx0eyh0aGlzLnByb3BzLnVzZXIuZW1haWxQcmVmZXJlbmNlID09IDApID8gXCJJbW1lZGlhdGVseVwiOlwiTmV2ZXJcIn1cclxuLy8gXHQ8L2Rpdj5cclxuLy8gPC9kaXY+XHJcbi8vIDxkaXYgY2xhc3NOYW1lPVwibWFyZ2luLXRvcC01MCByb3dcIj5cclxuLy8gXHR7XHJcbi8vIFx0XHQodGhpcy5zdGF0ZS5lZGl0TW9kZSkgPyAoXHJcbi8vIFx0XHRcdDxkaXY+XHJcbi8vIFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG4vLyBcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17dGhpcy50b2dnbGVFZGl0TW9kZX0gY2xhc3NOYW1lPVwiY29sLXhzLTYgY29sLXhzLW9mZnNldC0zIGJ0biBidG4tc2Vjb25kYXJ5IG1hcmdpblRvcDE1XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cclxuLy8gXHRcdFx0XHRcdFx0U2F2ZVxyXG4vLyBcdFx0XHRcdFx0PC9idXR0b24+XHJcbi8vIFx0XHRcdFx0PC9kaXY+XHJcbi8vIFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG4vLyBcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17dGhpcy50b2dnbGVFZGl0TW9kZX0gY2xhc3NOYW1lPVwiY29sLXhzLTYgY29sLXhzLW9mZnNldC0zIGJ0biBtYXJnaW5Ub3AxNVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XHJcbi8vIFx0XHRcdFx0XHRcdENhbmNlbFxyXG4vLyBcdFx0XHRcdFx0PC9idXR0b24+XHJcbi8vIFx0XHRcdFx0PC9kaXY+XHJcbi8vIFx0XHRcdDwvZGl2PlxyXG4vLyBcdFx0KTooXHJcbi8vIFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cclxuLy8gXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZUVkaXRNb2RlfSBjbGFzc05hbWU9XCJjb2wteHMtNiBjb2wteHMtb2Zmc2V0LTMgYnRuIGJ0bi1wcmltYXJ5IG1hcmdpblRvcDE1XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cclxuLy8gXHRcdFx0XHRcdEVkaXRcclxuLy8gXHRcdFx0XHQ8L2J1dHRvbj5cclxuLy8gXHRcdFx0PC9kaXY+XHJcbi8vIFx0XHQpXHJcbi8vIFx0fVxyXG4vLyA8L2Rpdj5cclxuIiwiaW1wb3J0IHsgUmVhY3QgfSBmcm9tICcuLi9jZG4nXHJcbmltcG9ydCBGb290ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Gb290ZXIuanMnXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJkYXNoXCI+XHJcblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInZpZXctdGl0bGUgbWFyZ2luLWJvdHRvbS0yNVwiPkRhc2hib2FyZDwvaDM+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL0Zvb3Rlci5qcydcclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImRvY3NcIj5cclxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwibWFyZ2luLWJvdHRvbS0yNVwiPkRvY3VtZW50YXRpb248L2gzPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuIiwiaW1wb3J0IHsgUmVhY3QgfSBmcm9tICcuLi9jZG4nXHJcbmltcG9ydCBGb290ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Gb290ZXIuanMnXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJsYW5kaW5nXCI+XHJcblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cIm1hcmdpbi1ib3R0b20tMjVcIj5MYW5kaW5nPC9oMz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiIsImltcG9ydCB7IFJlYWN0IH0gZnJvbSAnLi4vY2RuJ1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uL2NvbXBvbmVudHMvRm9vdGVyLmpzJ1xyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPVwic3VwcG9ydFwiPlxyXG5cdFx0XHRcdDxoMyBjbGFzc05hbWU9XCJtYXJnaW4tYm90dG9tLTI1XCI+U3VwcG9ydDwvaDM+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdERPTSwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuL2NkbidcclxuXHJcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAuanMnXHJcbmltcG9ydCBMYW5kaW5nIGZyb20gJy4vdmlld3MvbGFuZGluZydcclxuaW1wb3J0IERhc2ggZnJvbSAnLi92aWV3cy9kYXNoJ1xyXG4vLyBpbXBvcnQgQXBpS2V5IGZyb20gJy4vdmlld3MvYXBpS2V5J1xyXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuL3ZpZXdzL2FjY291bnQnXHJcbmltcG9ydCBEb2NzIGZyb20gJy4vdmlld3MvZG9jcydcclxuaW1wb3J0IFN1cHBvcnQgZnJvbSAnLi92aWV3cy9zdXBwb3J0J1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi9jbGFzc2VzL1VzZXInXHJcblxyXG52YXIgUm91dGVyID0gUmVhY3RSb3V0ZXIuUm91dGVyO1xyXG52YXIgUm91dGUgPSBSZWFjdFJvdXRlci5Sb3V0ZTtcclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5jb25zdCB1c2VyID0gbmV3IFVzZXIoY29uZmlnLmF1dGgwLmNsaWVudElkLCBjb25maWcuYXV0aDAuZG9tYWluKTtcclxuXHJcbi8vIHZhbGlkYXRlIGF1dGhlbnRpY2F0aW9uIGZvciBwcml2YXRlIHJvdXRlc1xyXG5jb25zdCByZXF1aXJlQXV0aCA9IChuZXh0U3RhdGUsIHJlcGxhY2UpID0+IHtcclxuXHRpZiAoIXVzZXIuaXNMb2dnZWRJbigpKSB7XHJcblx0XHRicm93c2VySGlzdG9yeS5wdXNoKFwibGFuZGluZ1wiKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG59XHJcblxyXG5cclxuUmVhY3RET00ucmVuZGVyKChcclxuXHQ8Um91dGVyIGhpc3Rvcnk9e2Jyb3dzZXJIaXN0b3J5fT5cclxuXHRcdDxSb3V0ZSBjb21wb25lbnQ9e0FwcH0gdXNlcj17dXNlcn0+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwibGFuZGluZ1wiIGNvbXBvbmVudD17TGFuZGluZ30gbmF2PXtmYWxzZX0vPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cImRvY3NcIiBjb21wb25lbnQ9e0RvY3N9IG5hdj17ZmFsc2V9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJkYXNoXCIgY29tcG9uZW50PXtEYXNofSBvbkVudGVyPXtyZXF1aXJlQXV0aH0gbmF2PXt0cnVlfS8+XHJcblx0XHRcdHsvKiA8Um91dGUgcGF0aD1cImFwaUtleVwiIGNvbXBvbmVudD17QXBpS2V5fSBvbkVudGVyPXtyZXF1aXJlQXV0aH0gbmF2PXt0cnVlfS8+ICovfVxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cImFjY291bnRcIiBjb21wb25lbnQ9e0FjY291bnR9IG9uRW50ZXI9e3JlcXVpcmVBdXRofSBuYXY9e3RydWV9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzdXBwb3J0XCIgY29tcG9uZW50PXtTdXBwb3J0fSBuYXY9e3RydWV9Lz5cclxuXHRcdDwvUm91dGU+XHJcblx0PC9Sb3V0ZXI+XHJcbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XHJcbiJdfQ==
