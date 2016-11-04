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
							{ className: view.nav ? "col-xs-3" : "hidden-xs-up" },
							_cdn.React.createElement(_nav2.default, { user: pass.user })
						),
						_cdn.React.createElement(
							'div',
							{ className: view.nav ? "col-xs-9" : "col-xs-12" },
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
var Router = window.ReactRouter;
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


	render: function render() {
		var user = this.props.user;
		var headerAddition = _cdn.React.createElement('li', { className: 'nav-item' });
		if (!user.isLoggedIn()) headerAddition = _cdn.React.createElement(
			'li',
			{ className: 'nav-item' },
			_cdn.React.createElement(
				'a',
				{ href: 'javascript:', className: 'nav-link', onClick: function onClick() {
						return user.login();
					} },
				'Login'
			)
		);else if (user.isLoggedIn() && !this.props.nav) headerAddition = _cdn.React.createElement(
			'li',
			{ className: 'nav-item' },
			_cdn.React.createElement(
				Link,
				{ to: 'dash', className: 'nav-link' },
				'Dashboard'
			)
		);

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
						'Hi'
					),
					_cdn.React.createElement(
						'ul',
						{ className: 'nav navbar-nav hidden-sm-down float-xs-right' },
						headerAddition
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
				null,
				"Account"
			),
			_cdn.React.createElement(
				"div",
				{ className: "col-xs-12 infoBox margin-top-15" },
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
			'Dash'
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
			'Docs'
		);
	}
});

},{"../cdn":3,"../components/Footer.js":6}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require('../cdn');

var _header = require('../components/header.js');

var _header2 = _interopRequireDefault(_header);

var _config = require('../../config.js');

var _config2 = _interopRequireDefault(_config);

var _User = require('../classes/User.js');

var _User2 = _interopRequireDefault(_User);

var _Footer = require('../components/Footer.js');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = _cdn.ReactRouter.Link;
var browserHistory = _cdn.ReactRouter.browserHistory;

exports.default = _cdn.React.createClass({
	displayName: 'landing',

	getInitialState: function getInitialState() {
		return {
			email: "",
			password: ""
		};
	},

	render: function render() {
		return _cdn.React.createElement('div', { id: 'landing' });
	}
});

},{"../../config.js":1,"../cdn":3,"../classes/User.js":4,"../components/Footer.js":6,"../components/header.js":7}],14:[function(require,module,exports){
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
			'Support'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcY2RuLmpzIiwic3JjXFxjbGFzc2VzXFxVc2VyLmpzIiwic3JjXFxjbGFzc2VzXFxVdGlsaXRpZXMuanMiLCJzcmNcXGNvbXBvbmVudHNcXEZvb3Rlci5qcyIsInNyY1xcY29tcG9uZW50c1xcaGVhZGVyLmpzIiwic3JjXFxjb21wb25lbnRzXFxuYXYuanMiLCJzcmNcXGNvbXBvbmVudHNcXG5vdGlmaWNhdGlvbnMuanMiLCJzcmNcXHZpZXdzXFxhY2NvdW50LmpzIiwic3JjXFx2aWV3c1xcZGFzaC5qcyIsInNyY1xcdmlld3NcXGRvY3MuanMiLCJzcmNcXHZpZXdzXFxsYW5kaW5nLmpzIiwic3JjXFx2aWV3c1xcc3VwcG9ydC5qcyIsInNyY1xcd2ViLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQ0EsSUFBSSxjQUFjLGFBQWxCOztrQkFFZTtBQUNkLGNBQWEsV0FEQztBQUVkLFVBQVUsWUFBVTtBQUNuQixNQUFHLGVBQWUsWUFBbEIsRUFBZ0MsT0FBTyw2QkFBUCxDQUFoQyxLQUNLLE9BQU8sdUJBQVA7QUFDTCxFQUhTLEVBRkk7QUFNZCxVQUFVLFlBQVU7QUFDbkIsTUFBRyxlQUFlLFlBQWxCLEVBQWdDLE9BQU8sNkJBQVAsQ0FBaEMsS0FDSyxPQUFPLHVCQUFQO0FBQ0wsRUFIUyxFQU5JO0FBVWQsYUFBWSw2QkFWRTtBQVdkLFFBQU07QUFDTCxZQUFVLGtDQURMO0FBRUwsVUFBUTtBQUZIO0FBWFEsQzs7Ozs7Ozs7O0FDSGY7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxpQkFBaUIsaUJBQVksY0FBakM7O2tCQUVlLFdBQU0sV0FBTixDQUFrQjtBQUFBOztBQUNoQyxrQkFBaUIsMkJBQVc7QUFDM0IsU0FBTTtBQUNMLGtCQUFjO0FBRFQsR0FBTjtBQUdBLEVBTCtCO0FBTWhDLHFCQUFvQiw0QkFBUyxZQUFULEVBQXNCO0FBQ3pDLE1BQUksZ0JBQWdCLEtBQUssS0FBTCxDQUFXLGFBQS9CO0FBQ0EsZ0JBQWMsSUFBZCxDQUFtQixZQUFuQjtBQUNBLE9BQUssUUFBTCxDQUFjLEVBQUMsZUFBYyxhQUFmLEVBQWQ7O0FBRUE7QUFDQSxFQVorQjtBQWFoQyxxQkFBb0IsNEJBQVMsTUFBVCxFQUFnQjtBQUNuQyxNQUFJLGdCQUFnQixLQUFLLEtBQUwsQ0FBVyxhQUEvQjtBQUNBLGdCQUFjLE1BQWQsQ0FBcUIsTUFBckIsRUFBNEIsQ0FBNUI7QUFDQSxTQUFPLEtBQUssUUFBTCxDQUFjLEVBQUMsZUFBYyxhQUFmLEVBQWQsQ0FBUDtBQUNBLEVBakIrQjtBQWtCaEMsd0JBQXVCLGlDQUFVO0FBQ2hDLFNBQU8sS0FBSyxLQUFMLENBQVcsYUFBbEI7QUFDQSxFQXBCK0I7QUFxQmhDLDRCQUEwQixtQ0FBUyxTQUFULEVBQW1CO0FBQzVDO0FBQ0EsTUFBRyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLFFBQXBCLElBQWdDLFVBQVUsUUFBVixDQUFtQixRQUF0RCxFQUErRDtBQUM5RCxPQUFJLGdCQUFnQixFQUFwQjtBQUNBLE9BQUksT0FBTyxVQUFVLFFBQVYsQ0FBbUIsS0FBbkIsQ0FBeUIsT0FBaEMsSUFBMkMsV0FBL0MsRUFBNEQsY0FBYyxJQUFkLENBQW1CLEVBQUMsU0FBUSxVQUFVLFFBQVYsQ0FBbUIsS0FBbkIsQ0FBeUIsT0FBbEMsRUFBbkI7QUFDNUQsUUFBSyxRQUFMLENBQWMsRUFBQyxlQUFjLGFBQWYsRUFBZDtBQUNBO0FBQ0Q7QUFDQSxFQTdCK0I7QUE4QmhDLG9CQUFtQiw2QkFBVTs7QUFFNUIsTUFBSSxnQkFBZ0IsS0FBSyxLQUFMLENBQVcsYUFBL0I7QUFDQSxNQUFJLE9BQU8saUNBQWlCLFNBQWpCLENBQVAsSUFBc0MsV0FBMUMsRUFBdUQsY0FBYyxJQUFkLENBQW1CLEVBQUMsU0FBUSxpQ0FBaUIsU0FBakIsRUFBNEIsS0FBNUIsQ0FBa0MsR0FBbEMsRUFBdUMsSUFBdkMsQ0FBNEMsR0FBNUMsQ0FBVCxFQUFuQjs7QUFFdkQ7QUFDQSxFQXBDK0I7QUFxQ2hDLFNBQVEsa0JBQVc7QUFDbEIsTUFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBa0IsQ0FBbEIsQ0FBWDtBQUNBLE1BQUksT0FBTztBQUNWLGlCQUFhO0FBQ1osWUFBUSxLQUFLLGtCQUREO0FBRVosWUFBUSxLQUFLLGtCQUZEO0FBR1osY0FBVSxLQUFLO0FBSEgsSUFESDtBQU1WLFNBQU0sS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQjtBQU5iLEdBQVg7QUFRQSxTQUNPO0FBQUE7QUFBQTtBQUNMLHVEQUFlLGNBQWMsS0FBSyxZQUFsQyxHQURLO0FBRUcsZ0RBQVEsY0FBYyxLQUFLLFlBQTNCLEVBQXlDLE1BQU0sS0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixJQUFoRSxFQUFzRSxLQUFLLEtBQUssR0FBaEYsR0FGSDtBQUdMO0FBQUE7QUFBQSxNQUFLLFdBQVUsV0FBZjtBQUNDO0FBQUE7QUFBQSxPQUFLLFdBQVUscUJBQWY7QUFDQztBQUFBO0FBQUEsUUFBSyxXQUFVLFVBQWY7QUFDQztBQUFBO0FBQUEsU0FBSyxXQUFZLEtBQUssR0FBTixHQUFXLFVBQVgsR0FBc0IsY0FBdEM7QUFDQyxpREFBSyxNQUFNLEtBQUssSUFBaEI7QUFERCxPQUREO0FBSUM7QUFBQTtBQUFBLFNBQUssV0FBWSxLQUFLLEdBQU4sR0FBVyxVQUFYLEdBQXNCLFdBQXRDO0FBQ0Usa0JBQU0sWUFBTixDQUFtQixLQUFLLEtBQUwsQ0FBVyxRQUE5QixFQUF3QyxJQUF4QztBQURGO0FBSkQ7QUFERDtBQUREO0FBSEssR0FEUDtBQWtCQTtBQWpFK0IsQ0FBbEIsQzs7Ozs7Ozs7O0FDVGYsSUFBSSxJQUFJLE9BQU8sQ0FBZjtBQUNBLElBQUksU0FBUyxDQUFiO0FBQ0EsSUFBSSxRQUFRLE9BQU8sS0FBbkI7QUFDQSxJQUFJLFdBQVcsT0FBTyxRQUF0QjtBQUNBLElBQUksU0FBUyxPQUFPLFdBQXBCO0FBQ0EsSUFBSSxZQUFZLE9BQU8sU0FBdkI7UUFDUyxDLEdBQUEsQztRQUFHLE0sR0FBQSxNO1FBQVEsSyxHQUFBLEs7UUFBTyxRLEdBQUEsUTtRQUFVLFcsR0FBQSxXO1FBQWEsUyxHQUFBLFM7Ozs7Ozs7Ozs7O0FDUGxEOztBQUNBOzs7Ozs7OztBQUNBLElBQUksaUJBQWlCLGlCQUFZLGNBQWpDOztJQUNxQixJO0FBRXBCLGVBQVksUUFBWixFQUFxQixNQUFyQixFQUE0QixVQUE1QixFQUF3QztBQUFBOztBQUN2QztBQUNBLE9BQUssSUFBTCxHQUFZLG1CQUFjLFFBQWQsRUFBd0IsTUFBeEIsRUFBZ0M7QUFDM0MsdUJBQW9CLENBQUMsY0FBRCxFQUFpQixRQUFqQixFQUEyQixlQUEzQixDQUR1QjtBQUUzQyxzQkFBbUIsT0FGd0I7QUFHM0MsdUJBQW9CO0FBQ25CLFdBQU87QUFEWSxJQUh1QjtBQU0zQyxVQUFNO0FBQ0wsVUFBTSw2RkFERDtBQUVMLGtCQUFjO0FBRlQ7QUFOcUMsR0FBaEMsQ0FBWjtBQVdBO0FBQ0EsT0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLGVBQWIsRUFBOEIsS0FBSyxnQkFBTCxDQUFzQixJQUF0QixDQUEyQixJQUEzQixDQUE5QjtBQUNBO0FBQ0EsT0FBSyxLQUFMLEdBQWEsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFiO0FBQ0E7Ozs7bUNBRWdCLFUsRUFBVztBQUFBOztBQUN6QjtBQUNGLFFBQUssUUFBTCxDQUFjLFdBQVcsT0FBekI7QUFDQSxRQUFLLElBQUwsQ0FBVSxVQUFWLENBQXFCLFdBQVcsT0FBaEMsRUFBeUMsVUFBQyxLQUFELEVBQVEsT0FBUixFQUFvQjtBQUM1RCxRQUFJLEtBQUosRUFBVztBQUNWLGFBQVEsR0FBUixDQUFZLDJCQUFaLEVBQXlDLEtBQXpDO0FBQ0EsS0FGRCxNQUVPO0FBQ04sV0FBSyxVQUFMLENBQWdCLE9BQWhCO0FBQ0EsU0FBSSxPQUFPLFFBQVEsS0FBZixJQUF3QixXQUF4QixJQUF1QyxRQUFRLEtBQVIsSUFBaUIsT0FBNUQsRUFBcUUsZUFBZSxJQUFmLENBQW9CLE1BQXBCLEVBQXJFLEtBQ0ssZUFBZSxJQUFmLENBQW9CLE1BQXBCO0FBQ0w7QUFDRCxJQVJEO0FBU0E7Ozs2QkFFVSxPLEVBQVE7QUFDbEI7QUFDQSxnQkFBYSxPQUFiLENBQXFCLFNBQXJCLEVBQWdDLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBaEM7QUFDQTs7OytCQUVXO0FBQ1g7QUFDQSxPQUFNLFVBQVUsYUFBYSxPQUFiLENBQXFCLFNBQXJCLENBQWhCO0FBQ0EsVUFBTyxVQUFVLEtBQUssS0FBTCxDQUFXLGFBQWEsT0FBeEIsQ0FBVixHQUE2QyxFQUFwRDtBQUNBOzs7cUNBRWlCO0FBQ2pCLFVBQU8sRUFBRSxJQUFGLENBQU87QUFDYixTQUFLLGlCQUFPLE9BQVAsR0FBaUIsT0FEVDtBQUViLFVBQU0sS0FGTztBQUdiLGFBQVM7QUFDUixvQkFBZSxZQUFZLEtBQUssUUFBTDtBQURuQjtBQUhJLElBQVAsQ0FBUDtBQU9BOzs7MEJBRU87QUFDUDtBQUNBLFFBQUssSUFBTCxDQUFVLElBQVY7QUFDQTs7OytCQUVXO0FBQ1g7QUFDQSxVQUFPLENBQUMsQ0FBQyxLQUFLLFFBQUwsRUFBVDtBQUNBOzs7MkJBRVEsTyxFQUFRO0FBQ2hCO0FBQ0EsZ0JBQWEsT0FBYixDQUFxQixVQUFyQixFQUFpQyxPQUFqQztBQUNBOzs7NkJBRVM7QUFDVDtBQUNBLFVBQU8sYUFBYSxPQUFiLENBQXFCLFVBQXJCLENBQVA7QUFDQTs7OzJCQUVPO0FBQ1Asa0JBQWUsSUFBZixDQUFvQixTQUFwQjtBQUNBO0FBQ0EsZ0JBQWEsVUFBYixDQUF3QixVQUF4QjtBQUNBLGdCQUFhLFVBQWIsQ0FBd0IsU0FBeEI7QUFDQTtBQUVBOzs7Ozs7a0JBbkZtQixJOzs7Ozs7Ozs7O0FDRHJCLElBQUksbUJBQW1CLFNBQW5CLGdCQUFtQixDQUFTLFFBQVQsRUFBbUI7QUFDekMsS0FBSSxRQUFRLE9BQU8sUUFBUCxDQUFnQixNQUFoQixDQUF1QixTQUF2QixDQUFpQyxDQUFqQyxDQUFaO0FBQ0EsS0FBSSxVQUFVLE1BQU0sS0FBTixDQUFZLEdBQVosQ0FBZDtBQUNBLEtBQUksT0FBTyxRQUFRLENBQVIsRUFBVyxLQUFYLENBQWlCLEdBQWpCLENBQVg7QUFDQSxNQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksS0FBSyxNQUF6QixFQUFpQyxHQUFqQyxFQUFzQztBQUNyQyxNQUFJLE9BQU8sS0FBSyxDQUFMLEVBQVEsS0FBUixDQUFjLEdBQWQsQ0FBWDtBQUNBLE1BQUksbUJBQW1CLEtBQUssQ0FBTCxDQUFuQixLQUErQixRQUFuQyxFQUE2QztBQUM1QyxVQUFPLG1CQUFtQixLQUFLLENBQUwsQ0FBbkIsQ0FBUDtBQUNBO0FBQ0Q7QUFDRCxTQUFRLEdBQVIsQ0FBWSw2QkFBWixFQUEyQyxRQUEzQztBQUNBLENBWEQ7O0FBYUEsSUFBSSxVQUFVO0FBQ2IsUUFBTyxlQUFTLE1BQVQsRUFBZ0I7QUFDdEIsTUFBSSxLQUFLLHdKQUFUO0FBQ0EsU0FBTyxHQUFHLElBQUgsQ0FBUSxNQUFSLENBQVA7QUFDQSxFQUpZO0FBS2IsUUFBTyxlQUFTLE1BQVQsRUFBZ0I7QUFDdEIsTUFBSSxhQUFhLE9BQU0sT0FBTixDQUFjLEtBQWQsRUFBb0IsRUFBcEIsQ0FBakI7QUFDQSxNQUFJLFdBQVcsTUFBWCxJQUFxQixFQUF6QixFQUE2QixPQUFPLElBQVAsQ0FBN0IsS0FDSztBQUNMO0FBVFksQ0FBZDs7QUFZQSxJQUFJLGdCQUFnQixTQUFoQixhQUFnQixDQUFTLEtBQVQsRUFBZTtBQUNsQyxLQUFJLGFBQWEsTUFBTSxPQUFOLENBQWMsS0FBZCxFQUFvQixFQUFwQixDQUFqQjtBQUNBLEtBQUksT0FBTyxFQUFYO0FBQ0EsS0FBSSxZQUFZLEVBQWhCO0FBQ0EsS0FBSSxjQUFjLEVBQWxCO0FBQ0EsS0FBSSxXQUFXLE1BQVgsR0FBb0IsQ0FBeEIsRUFBMkIsWUFBWSxHQUFaO0FBQzNCLEtBQUksV0FBVyxNQUFYLEdBQW9CLENBQXhCLEVBQTJCLGNBQWMsR0FBZDtBQUMzQixLQUFJLFdBQVcsTUFBWCxHQUFvQixDQUF4QixFQUEyQixPQUFPLEdBQVA7QUFDM0IsS0FBSSxpQkFBaUIsWUFBWSxXQUFXLFNBQVgsQ0FBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsQ0FBWixHQUF3QyxXQUF4QyxHQUFzRCxXQUFXLFNBQVgsQ0FBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsQ0FBdEQsR0FBa0YsSUFBbEYsR0FBeUYsV0FBVyxTQUFYLENBQXFCLENBQXJCLEVBQXVCLEVBQXZCLENBQTlHO0FBQ0EsUUFBTyxjQUFQO0FBQ0EsQ0FWRDs7QUFZQSxJQUFJLG9CQUFvQixTQUFwQixpQkFBb0IsR0FBVTtBQUNqQyxVQUFTLEdBQVQsQ0FBYSxNQUFiLEVBQXFCLE1BQXJCLEVBQTRCO0FBQzFCLE1BQUksTUFBTSxLQUFLLE1BQWY7QUFDQSxTQUFPLElBQUksTUFBSixHQUFhLE1BQXBCLEVBQTRCO0FBQzFCLFNBQU0sTUFBSSxHQUFWO0FBQ0Q7QUFDRCxTQUFPLEdBQVA7QUFDRDtBQUNELEtBQUksT0FBTyxJQUFJLElBQUosRUFBWDtBQUNBLEtBQUksU0FBUyxLQUFLLGlCQUFMLEVBQWI7QUFDQSxRQUFRLENBQUMsU0FBTyxDQUFQLEdBQVUsR0FBVixHQUFjLEdBQWYsSUFBc0IsSUFBSSxTQUFTLEtBQUssR0FBTCxDQUFTLFNBQU8sRUFBaEIsQ0FBVCxDQUFKLEVBQW1DLENBQW5DLENBQXRCLEdBQTZELElBQUksS0FBSyxHQUFMLENBQVMsU0FBTyxFQUFoQixDQUFKLEVBQXlCLENBQXpCLENBQXJFO0FBQ0EsQ0FYRDs7QUFhQSxJQUFJLGlCQUFpQixTQUFqQixjQUFpQixDQUFTLElBQVQsRUFBZSxJQUFmLEVBQW9CO0FBQ3hDLEtBQUksZ0JBQWdCLElBQUksSUFBSixDQUFTLElBQVQsQ0FBcEI7QUFDQSxLQUFJLFdBQVcsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFmO0FBQ0EsS0FBSSxPQUFPLFNBQVMsU0FBUyxDQUFULENBQVQsQ0FBWDtBQUNBLEtBQUksU0FBUyxTQUFTLFNBQVMsQ0FBVCxFQUFZLFNBQVosQ0FBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsQ0FBVCxDQUFiO0FBQ0EsS0FBSSxNQUFNLFNBQVMsQ0FBVCxFQUFZLFNBQVosQ0FBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsQ0FBVjtBQUNBLEtBQUksU0FBUyxFQUFiLEVBQWlCO0FBQ2hCLE1BQUksUUFBUSxJQUFaLEVBQWtCLE9BQU8sQ0FBUCxDQUFsQixLQUNLLE9BQU8sRUFBUDtBQUNMLEVBSEQsTUFHTyxJQUFJLFFBQVEsSUFBWixFQUFrQixRQUFRLEVBQVI7QUFDekIsZUFBYyxRQUFkLENBQXVCLElBQXZCO0FBQ0EsZUFBYyxVQUFkLENBQXlCLE1BQXpCO0FBQ0EsZUFBYyxVQUFkLENBQXlCLGNBQWMsVUFBZCxLQUE4QixjQUFjLGlCQUFkLEVBQXZEO0FBQ0EsUUFBTyxjQUFjLFdBQWQsRUFBUDtBQUNBLENBZEQ7O1FBaUJTLGdCLEdBQUEsZ0I7UUFBa0IsTyxHQUFBLE87UUFBUyxhLEdBQUEsYTtRQUFlLGlCLEdBQUEsaUI7UUFBbUIsYyxHQUFBLGM7Ozs7Ozs7OztBQ3JFdEU7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxPQUFPLGlCQUFZLElBQXZCO0FBQ0EsSUFBSSxpQkFBaUIsaUJBQVksY0FBakM7O2tCQUVlLFdBQU0sV0FBTixDQUFrQjtBQUFBOztBQUNoQyxTQUFRLGtCQUFXOztBQUVsQixTQUNDO0FBQUE7QUFBQSxLQUFLLElBQUcsUUFBUjtBQUNDO0FBQUE7QUFBQSxNQUFLLFdBQVUsV0FBZjtBQUNDO0FBQUE7QUFBQSxPQUFLLFdBQVUsVUFBZjtBQUNDO0FBQUE7QUFBQSxRQUFLLFdBQVUsa0JBQWY7QUFBQTtBQUFBLE1BREQ7QUFFQztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BRkQ7QUFHQztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSEQ7QUFJQztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSkQ7QUFLQztBQUFBO0FBQUEsUUFBSyxXQUFVLGtCQUFmO0FBQUE7QUFBQTtBQUxELEtBREQ7QUFRQztBQUFBO0FBQUEsT0FBSyxXQUFVLFVBQWY7QUFFQztBQUFBO0FBQUEsUUFBSyxXQUFVLGtCQUFmO0FBQUE7QUFBQTtBQUZELEtBUkQ7QUFZQztBQUFBO0FBQUEsT0FBSyxXQUFVLFVBQWY7QUFDQztBQUFBO0FBQUEsUUFBSyxXQUFVLGtCQUFmO0FBQUE7QUFBQSxNQUREO0FBRUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUZEO0FBR0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUhEO0FBWkQ7QUFERCxHQUREO0FBc0JBO0FBekIrQixDQUFsQixDOzs7Ozs7Ozs7QUNQZjs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLE9BQU8saUJBQVksSUFBdkI7QUFDQSxJQUFJLGlCQUFpQixpQkFBWSxjQUFqQzs7a0JBRWUsV0FBTSxXQUFOLENBQWtCO0FBQUE7OztBQUVoQyxTQUFRLGtCQUFXO0FBQ2xCLE1BQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxJQUF0QjtBQUNBLE1BQUksaUJBQWtCLGlDQUFJLFdBQVUsVUFBZCxHQUF0QjtBQUNBLE1BQUcsQ0FBQyxLQUFLLFVBQUwsRUFBSixFQUF1QixpQkFDdEI7QUFBQTtBQUFBLEtBQUksV0FBVSxVQUFkO0FBQ0M7QUFBQTtBQUFBLE1BQUcsTUFBSyxhQUFSLEVBQXNCLFdBQVUsVUFBaEMsRUFBMkMsU0FBUztBQUFBLGFBQUksS0FBSyxLQUFMLEVBQUo7QUFBQSxNQUFwRDtBQUFBO0FBQUE7QUFERCxHQURzQixDQUF2QixLQUtLLElBQUcsS0FBSyxVQUFMLE1BQXFCLENBQUMsS0FBSyxLQUFMLENBQVcsR0FBcEMsRUFBeUMsaUJBQzdDO0FBQUE7QUFBQSxLQUFJLFdBQVUsVUFBZDtBQUNDO0FBQUMsUUFBRDtBQUFBLE1BQU0sSUFBRyxNQUFULEVBQWdCLFdBQVUsVUFBMUI7QUFBQTtBQUFBO0FBREQsR0FENkM7O0FBTTlDLFNBQ0M7QUFBQTtBQUFBLEtBQUssSUFBRyxRQUFSO0FBQ0M7QUFBQTtBQUFBLE1BQUssV0FBVSx5QkFBZjtBQUNDO0FBQUE7QUFBQSxPQUFLLFdBQVUscUJBQWY7QUFDQTtBQUFBO0FBQUEsUUFBTSxXQUFVLGNBQWhCLEVBQStCLE1BQUssR0FBcEM7QUFBQTtBQUFBLE1BREE7QUFFQTtBQUFBO0FBQUEsUUFBSSxXQUFVLDhDQUFkO0FBQ0U7QUFERixNQUZBO0FBS0E7QUFBQTtBQUFBLFFBQUcsTUFBSyxhQUFSLEVBQXNCLFdBQVUsNENBQWhDLEVBQTZFLGVBQVksVUFBekYsRUFBb0csZUFBWSxxQkFBaEg7QUFDQyxzQ0FBRyxXQUFVLFlBQWI7QUFERDtBQUxBO0FBREQ7QUFERCxHQUREO0FBZUE7QUEvQitCLENBQWxCLEM7Ozs7Ozs7OztBQ1BmOztBQUNBOzs7Ozs7QUFFQSxJQUFJLE9BQU8saUJBQVksSUFBdkI7QUFDQSxJQUFJLGlCQUFpQixpQkFBWSxjQUFqQzs7a0JBRWUsV0FBTSxXQUFOLENBQWtCO0FBQUE7O0FBQ2hDLGtCQUFpQiwyQkFBVztBQUMzQixTQUFNO0FBQ0wsUUFBSSxDQUNIO0FBQ0MsVUFBTSxXQURQO0FBRUMsVUFBTSxNQUZQO0FBR0MsVUFBTTtBQUhQLElBREcsRUFLRDtBQUNELFVBQUssU0FESjtBQUVELFVBQUssU0FGSjtBQUdELFVBQU07QUFITCxJQUxDLEVBU0Q7QUFDRCxVQUFNLFNBREw7QUFFRCxVQUFNLFNBRkw7QUFHRCxVQUFNO0FBSEwsSUFUQyxFQWFEO0FBQ0QsVUFBTSxlQURMO0FBRUQsVUFBTSxNQUZMO0FBR0QsVUFBTTtBQUhMLElBYkMsRUFpQkQ7QUFDRCxVQUFNLFFBREw7QUFFRCxVQUFLLFFBRko7QUFHRCxVQUFNO0FBSEwsSUFqQkM7QUFEQyxHQUFOO0FBeUJBLEVBM0IrQjtBQTRCaEMsU0FBUSxrQkFBVTtBQUNqQixpQkFBSyxtQkFBTDtBQUNBLGlCQUFlLElBQWYsQ0FBb0IsT0FBcEI7QUFDQSxFQS9CK0I7QUFnQ2hDLFNBQVEsa0JBQVc7QUFBQTs7QUFDbEIsTUFBSSxPQUFPLE9BQU8sUUFBUCxDQUFnQixJQUFoQixDQUFxQixLQUFyQixDQUEyQixHQUEzQixFQUFnQyxDQUFoQyxDQUFYO0FBQ0EsU0FDQztBQUFBO0FBQUEsS0FBSyxJQUFHLEtBQVI7QUFFRSxRQUFLLEtBQUwsQ0FBVyxHQUFYLENBQWUsR0FBZixDQUFtQixVQUFDLElBQUQsRUFBTyxDQUFQLEVBQVc7QUFDN0IsUUFBSSxLQUFLLElBQUwsSUFBYSxRQUFqQixFQUEyQixPQUMxQjtBQUFBO0FBQUEsT0FBSyxLQUFLLENBQVYsRUFBYSxXQUFVLFNBQXZCO0FBQ0M7QUFBQTtBQUFBLFFBQUcsTUFBSyxhQUFSLEVBQXNCLFNBQVMsTUFBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixNQUEvQztBQUNDLHNDQUFHLFdBQVcsa0NBQWtDLEtBQUssSUFBckQsR0FERDtBQUVDO0FBQUE7QUFBQTtBQUFBO0FBQW1CLFlBQUs7QUFBeEI7QUFGRDtBQURELEtBRDBCLENBQTNCLEtBUUssT0FDSjtBQUFBO0FBQUEsT0FBSyxLQUFLLENBQVYsRUFBYSxXQUFVLFNBQXZCO0FBRUM7QUFBQyxVQUFEO0FBQUEsUUFBTSxJQUFJLEtBQUssSUFBZjtBQUNDLHNDQUFHLFdBQVcsOENBQThDLEtBQUssSUFBakUsR0FERDtBQUVDO0FBQUE7QUFBQTtBQUFBO0FBQW1CLFlBQUs7QUFBeEI7QUFGRDtBQUZELEtBREk7QUFTTCxJQWxCRDtBQUZGLEdBREQ7QUF5QkE7QUEzRCtCLENBQWxCLEM7Ozs7Ozs7OztBQ05mOztrQkFFZSxXQUFNLFdBQU4sQ0FBa0I7QUFBQTs7QUFDaEMsU0FBUSxrQkFBVztBQUFBOztBQUNsQixNQUFJLGdCQUFnQixLQUFLLEtBQUwsQ0FBVyxZQUFYLENBQXdCLFFBQXhCLEVBQXBCO0FBQ0EsTUFBSSxtQkFBb0IscUNBQXhCO0FBQ0EsTUFBSSxjQUFjLE1BQWQsR0FBdUIsQ0FBM0IsRUFBNkI7QUFDNUIsc0JBQ0M7QUFBQTtBQUFBLE1BQUssSUFBRyxlQUFSO0FBRUUsa0JBQWMsR0FBZCxDQUFrQixVQUFDLFlBQUQsRUFBZSxDQUFmLEVBQW1CO0FBQ3BDLFNBQUksYUFBYSxJQUFiLElBQXFCLFNBQXpCLEVBQW9DLGFBQWEsSUFBYixHQUFvQixTQUFwQjtBQUNwQyxZQUNDO0FBQUE7QUFBQSxRQUFLLFdBQVcsaUJBQWlCLGFBQWEsSUFBOUMsRUFBb0QsS0FBSyxDQUF6RCxFQUE0RCxlQUFhLENBQXpFO0FBQ0UsbUJBQWEsT0FEZjtBQUVDO0FBQUE7QUFBQSxTQUFNLFdBQVUsT0FBaEIsRUFBd0IsU0FBVTtBQUFBLGdCQUFNLE1BQUssS0FBTCxDQUFXLFlBQVgsQ0FBd0IsTUFBeEIsQ0FBK0IsQ0FBL0IsQ0FBTjtBQUFBLFNBQWxDO0FBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUREO0FBRkQsTUFERDtBQVFBLEtBVkQ7QUFGRixJQUREO0FBaUJBO0FBQ0QsU0FBTyxnQkFBUDtBQUNBO0FBeEIrQixDQUFsQixDOzs7Ozs7Ozs7QUNGZjs7a0JBRWUsV0FBTSxXQUFOLENBQWtCO0FBQUE7O0FBQ2hDLGtCQUFpQiwyQkFBVztBQUN4QixTQUFPO0FBQ1IsV0FBTyxxQkFEQztBQUVSLGNBQVcsS0FGSDtBQUdSLFlBQVMsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixVQUFoQjtBQUhELEdBQVA7QUFLSCxFQVArQjtBQVFoQyxhQUFZLHNCQUFXO0FBQUE7O0FBQ3RCLE1BQUcsQ0FBQyxLQUFLLEtBQUwsQ0FBVyxTQUFmLEVBQTBCLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsZ0JBQWhCLEdBQW1DLElBQW5DLENBQXdDLFVBQUMsSUFBRCxFQUFRO0FBQ3pFLFNBQUssUUFBTCxDQUFjLEVBQUMsUUFBTyxLQUFLLFlBQUwsQ0FBa0IsR0FBMUIsRUFBOEIsV0FBVSxJQUF4QyxFQUFkO0FBQ0EsR0FGeUI7QUFHMUIsRUFaK0I7O0FBY2hDLFNBQVEsa0JBQVc7QUFDbEIsU0FDQztBQUFBO0FBQUEsS0FBSyxJQUFHLFNBQVI7QUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBLElBREQ7QUFFQztBQUFBO0FBQUEsTUFBSyxXQUFVLGlDQUFmO0FBQ0M7QUFBQTtBQUFBLE9BQUssV0FBVSxLQUFmO0FBQ0M7QUFBQTtBQUFBLFFBQUssV0FBVSxVQUFmO0FBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUREO0FBRUM7QUFBQTtBQUFBO0FBQU8sWUFBSyxLQUFMLENBQVcsT0FBWCxDQUFtQjtBQUExQjtBQUZELE1BREQ7QUFLQztBQUFBO0FBQUEsUUFBSyxXQUFVLFVBQWY7QUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BREQ7QUFFQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkQ7QUFMRCxLQUREO0FBV0M7QUFBQTtBQUFBLE9BQUssV0FBVSxtQkFBZjtBQUNDO0FBQUE7QUFBQSxRQUFLLFdBQVUsVUFBZjtBQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FERDtBQUVDO0FBQUE7QUFBQTtBQUFPLFlBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUI7QUFBMUI7QUFGRCxNQUREO0FBS0M7QUFBQTtBQUFBLFFBQUssV0FBVSxVQUFmO0FBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBdUI7QUFBQTtBQUFBLFVBQUcsTUFBSyxhQUFSLEVBQXNCLFdBQVUsY0FBaEMsRUFBK0MsU0FBUyxLQUFLLFVBQTdEO0FBQUE7QUFBQTtBQUF2QixPQUREO0FBR0csV0FBSyxLQUFMLENBQVcsU0FBWixHQUNBLG9DQUFPLElBQUcsUUFBVixFQUFtQixNQUFLLE1BQXhCLEVBQStCLFdBQVUsY0FBekMsRUFBd0QsT0FBTyxLQUFLLEtBQUwsQ0FBVyxNQUExRSxFQUFrRixjQUFsRixHQURBLEdBRUEsb0NBQU8sSUFBRyxRQUFWLEVBQW1CLE1BQUssVUFBeEIsRUFBbUMsV0FBVSxjQUE3QyxFQUE0RCxPQUFPLEtBQUssS0FBTCxDQUFXLE1BQTlFLEVBQXNGLGNBQXRGO0FBTEY7QUFMRDtBQVhEO0FBRkQsR0FERDtBQStCQTtBQTlDK0IsQ0FBbEIsQzs7QUFpRGY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDN0dBOztBQUNBOzs7Ozs7a0JBQ2UsV0FBTSxXQUFOLENBQWtCO0FBQUE7OztBQUVoQyxTQUFRLGtCQUFXO0FBQ2xCLFNBQ0M7QUFBQTtBQUFBLEtBQUssSUFBRyxNQUFSO0FBQUE7QUFBQSxHQUREO0FBS0E7QUFSK0IsQ0FBbEIsQzs7Ozs7Ozs7O0FDRmY7O0FBQ0E7Ozs7OztrQkFDZSxXQUFNLFdBQU4sQ0FBa0I7QUFBQTs7O0FBRWhDLFNBQVEsa0JBQVc7QUFDbEIsU0FDQztBQUFBO0FBQUEsS0FBSyxJQUFHLE1BQVI7QUFBQTtBQUFBLEdBREQ7QUFLQTtBQVIrQixDQUFsQixDOzs7Ozs7Ozs7QUNGZjs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxPQUFPLGlCQUFZLElBQXZCO0FBQ0EsSUFBSSxpQkFBaUIsaUJBQVksY0FBakM7O2tCQUVlLFdBQU0sV0FBTixDQUFrQjtBQUFBOztBQUNoQyxrQkFBaUIsMkJBQVc7QUFDekIsU0FBTztBQUNSLFVBQU8sRUFEQztBQUVSLGFBQVU7QUFGRixHQUFQO0FBSUYsRUFOK0I7O0FBUWhDLFNBQVEsa0JBQVc7QUFDbEIsU0FDQyxrQ0FBSyxJQUFHLFNBQVIsR0FERDtBQUtBO0FBZCtCLENBQWxCLEM7Ozs7Ozs7OztBQ1RmOztBQUNBOzs7Ozs7a0JBQ2UsV0FBTSxXQUFOLENBQWtCO0FBQUE7OztBQUVoQyxTQUFRLGtCQUFXO0FBQ2xCLFNBQ0M7QUFBQTtBQUFBLEtBQUssSUFBRyxTQUFSO0FBQUE7QUFBQSxHQUREO0FBS0E7QUFSK0IsQ0FBbEIsQzs7Ozs7QUNGZjs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLFNBQVMsaUJBQVksTUFBekI7QUFQQTs7QUFRQSxJQUFJLFFBQVEsaUJBQVksS0FBeEI7QUFDQSxJQUFJLGlCQUFpQixpQkFBWSxjQUFqQzs7QUFFQSxJQUFNLE9BQU8sbUJBQVMsaUJBQU8sS0FBUCxDQUFhLFFBQXRCLEVBQWdDLGlCQUFPLEtBQVAsQ0FBYSxNQUE3QyxDQUFiOztBQUVBO0FBQ0EsSUFBTSxjQUFjLFNBQWQsV0FBYyxDQUFDLFNBQUQsRUFBWSxPQUFaLEVBQXdCO0FBQzNDLEtBQUksQ0FBQyxLQUFLLFVBQUwsRUFBTCxFQUF3QjtBQUN2QixpQkFBZSxJQUFmLENBQW9CLFNBQXBCO0FBQ0EsRUFGRCxNQUVPO0FBQ04sU0FBTyxJQUFQO0FBQ0E7QUFDRCxDQU5EOztBQVNBLGNBQVMsTUFBVCxDQUNDO0FBQUMsT0FBRDtBQUFBLEdBQVEsU0FBUyxjQUFqQjtBQUNDO0FBQUMsT0FBRDtBQUFBLElBQU8sd0JBQVAsRUFBdUIsTUFBTSxJQUE3QjtBQUNDLHNCQUFDLEtBQUQsSUFBTyxNQUFLLFNBQVosRUFBc0IsNEJBQXRCLEVBQTBDLEtBQUssS0FBL0MsR0FERDtBQUVDLHNCQUFDLEtBQUQsSUFBTyxNQUFLLE1BQVosRUFBbUIseUJBQW5CLEVBQW9DLEtBQUssS0FBekMsR0FGRDtBQUdDLHNCQUFDLEtBQUQsSUFBTyxNQUFLLE1BQVosRUFBbUIseUJBQW5CLEVBQW9DLFNBQVMsV0FBN0MsRUFBMEQsS0FBSyxJQUEvRCxHQUhEO0FBS0Msc0JBQUMsS0FBRCxJQUFPLE1BQUssU0FBWixFQUFzQiw0QkFBdEIsRUFBMEMsU0FBUyxXQUFuRCxFQUFnRSxLQUFLLElBQXJFLEdBTEQ7QUFNQyxzQkFBQyxLQUFELElBQU8sTUFBSyxTQUFaLEVBQXNCLDRCQUF0QixFQUEwQyxLQUFLLElBQS9DO0FBTkQ7QUFERCxDQURELEVBV0csU0FBUyxjQUFULENBQXdCLEtBQXhCLENBWEgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXHJcbnZhciBlbnZpcm9ubWVudCA9IFwiZGV2ZWxvcG1lbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRlbnZpcm9ubWVudDogZW52aXJvbm1lbnQsXHJcblx0YXBpSG9zdDogKGZ1bmN0aW9uKCl7XHJcblx0XHRpZihlbnZpcm9ubWVudCA9PSBcInByb2R1Y3Rpb25cIikgcmV0dXJuIFwiaHR0cDovL2FwaXRlc3QuZmxlY3Rpbm8uY29tXCI7XHJcblx0XHRlbHNlIHJldHVybiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAxMFwiO1xyXG5cdH0oKSksXHJcblx0d2ViSG9zdDogKGZ1bmN0aW9uKCl7XHJcblx0XHRpZihlbnZpcm9ubWVudCA9PSBcInByb2R1Y3Rpb25cIikgcmV0dXJuIFwiaHR0cDovL3dlYnRlc3QuZmxlY3Rpbm8uY29tXCI7XHJcblx0XHRlbHNlIHJldHVybiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xyXG5cdH0oKSksXHJcblx0Z2F0ZXdheUtleTogXCJBVUI1akNrZHEzYjdrVjlEVFRkaVFsbE9SdjVcIixcclxuXHRhdXRoMDp7XHJcblx0XHRjbGllbnRJZDogXCIwU00wZ3JCVG9DSmpXR1ViQnRsWnVIaHlsQ3EyZFZ0M1wiLFxyXG5cdFx0ZG9tYWluOiBcImZsZWN0aW5vLmF1dGgwLmNvbVwiXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IFJlYWN0LCBSZWFjdFJvdXRlcn0gZnJvbSAnLi9jZG4nXHJcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9jb21wb25lbnRzL2hlYWRlci5qcydcclxuaW1wb3J0IE5vdGlmaWNhdGlvbnMgZnJvbSAnLi9jb21wb25lbnRzL25vdGlmaWNhdGlvbnMuanMnXHJcbmltcG9ydCBOYXYgZnJvbSAnLi9jb21wb25lbnRzL25hdidcclxuaW1wb3J0IHsgZ2V0UXVlcnlWYXJpYWJsZSB9IGZyb20gJy4vY2xhc3Nlcy9VdGlsaXRpZXMnXHJcbmltcG9ydCBVc2VyIGZyb20gJy4vY2xhc3Nlcy9Vc2VyLmpzJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZy5qcydcclxuXHJcbnZhciBicm93c2VySGlzdG9yeSA9IFJlYWN0Um91dGVyLmJyb3dzZXJIaXN0b3J5O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm57XHJcblx0XHRcdG5vdGlmaWNhdGlvbnM6W11cclxuXHRcdH1cclxuXHR9LFxyXG5cdGNyZWF0ZU5vdGlmaWNhdGlvbjogZnVuY3Rpb24obm90aWZpY2F0aW9uKXtcclxuXHRcdHZhciBub3RpZmljYXRpb25zID0gdGhpcy5zdGF0ZS5ub3RpZmljYXRpb25zO1xyXG5cdFx0bm90aWZpY2F0aW9ucy5wdXNoKG5vdGlmaWNhdGlvbik7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtub3RpZmljYXRpb25zOm5vdGlmaWNhdGlvbnN9KTtcclxuXHJcblx0XHRyZXR1cm47XHJcblx0fSxcclxuXHRyZW1vdmVOb3RpZmljYXRpb246IGZ1bmN0aW9uKG5JbmRleCl7XHJcblx0XHR2YXIgbm90aWZpY2F0aW9ucyA9IHRoaXMuc3RhdGUubm90aWZpY2F0aW9ucztcclxuXHRcdG5vdGlmaWNhdGlvbnMuc3BsaWNlKG5JbmRleCwxKTtcclxuXHRcdHJldHVybiB0aGlzLnNldFN0YXRlKHtub3RpZmljYXRpb25zOm5vdGlmaWNhdGlvbnN9KTtcclxuXHR9LFxyXG5cdHJldHJpZXZlTm90aWZpY2F0aW9uczogZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB0aGlzLnN0YXRlLm5vdGlmaWNhdGlvbnM7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOmZ1bmN0aW9uKG5leHRQcm9wcyl7XHJcblx0XHQvLyBSZW1vdmUgbm90aWZpY2F0aW9ucyB3aGVuIHZpZXcgY2hhbmdlc1xyXG5cdFx0aWYodGhpcy5wcm9wcy5sb2NhdGlvbi5wYXRobmFtZSAhPSBuZXh0UHJvcHMubG9jYXRpb24ucGF0aG5hbWUpe1xyXG5cdFx0XHR2YXIgbm90aWZpY2F0aW9ucyA9IFtdO1xyXG5cdFx0XHRpZiAodHlwZW9mIG5leHRQcm9wcy5sb2NhdGlvbi5xdWVyeS5tZXNzYWdlICE9IFwidW5kZWZpbmVkXCIpIG5vdGlmaWNhdGlvbnMucHVzaCh7bWVzc2FnZTpuZXh0UHJvcHMubG9jYXRpb24ucXVlcnkubWVzc2FnZX0pO1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHtub3RpZmljYXRpb25zOm5vdGlmaWNhdGlvbnN9KTtcclxuXHRcdH1cclxuXHRcdHJldHVybjtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xyXG5cclxuXHRcdHZhciBub3RpZmljYXRpb25zID0gdGhpcy5zdGF0ZS5ub3RpZmljYXRpb25zO1xyXG5cdFx0aWYgKHR5cGVvZiBnZXRRdWVyeVZhcmlhYmxlKFwibWVzc2FnZVwiKSAhPSBcInVuZGVmaW5lZFwiKSBub3RpZmljYXRpb25zLnB1c2goe21lc3NhZ2U6Z2V0UXVlcnlWYXJpYWJsZShcIm1lc3NhZ2VcIikuc3BsaXQoXCIrXCIpLmpvaW4oXCIgXCIpfSk7XHJcblxyXG5cdFx0cmV0dXJuO1xyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHZhciB2aWV3ID0gdGhpcy5wcm9wcy5yb3V0ZXNbMV07XHJcblx0XHR2YXIgcGFzcyA9IHtcclxuXHRcdFx0bm90aWZpY2F0aW9uOntcclxuXHRcdFx0XHRjcmVhdGU6IHRoaXMuY3JlYXRlTm90aWZpY2F0aW9uLFxyXG5cdFx0XHRcdHJlbW92ZTogdGhpcy5yZW1vdmVOb3RpZmljYXRpb24sXHJcblx0XHRcdFx0cmV0cmlldmU6IHRoaXMucmV0cmlldmVOb3RpZmljYXRpb25zXHJcblx0XHRcdH0sXHJcblx0XHRcdHVzZXI6IHRoaXMucHJvcHMucm91dGUudXNlclxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIChcclxuICAgICAgICAgPGRpdj5cclxuXHRcdFx0XHQ8Tm90aWZpY2F0aW9ucyBub3RpZmljYXRpb249e3Bhc3Mubm90aWZpY2F0aW9ufS8+XHJcbiAgICAgICAgICAgIDxIZWFkZXIgbm90aWZpY2F0aW9uPXtwYXNzLm5vdGlmaWNhdGlvbn0gdXNlcj17dGhpcy5wcm9wcy5yb3V0ZS51c2VyfSBuYXY9e3ZpZXcubmF2fS8+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlLWJvZHlcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGZpeC13aWR0aFwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyB2aWV3XCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9eyh2aWV3Lm5hdik/XCJjb2wteHMtM1wiOlwiaGlkZGVuLXhzLXVwXCJ9PlxyXG5cdFx0XHRcdFx0XHRcdFx0PE5hdiB1c2VyPXtwYXNzLnVzZXJ9Lz5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT17KHZpZXcubmF2KT9cImNvbC14cy05XCI6XCJjb2wteHMtMTJcIn0+XHJcblx0XHRcdFx0XHRcdFx0XHR7UmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2hpbGRyZW4sIHBhc3MpfVxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG4gICAgICAgICA8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuIiwiXHJcbnZhciAkID0gd2luZG93LiQ7XHJcbnZhciBqUXVlcnkgPSAkO1xyXG52YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3Q7XHJcbnZhciBSZWFjdERPTSA9IHdpbmRvdy5SZWFjdERPTTtcclxudmFyIFJvdXRlciA9IHdpbmRvdy5SZWFjdFJvdXRlcjtcclxudmFyIEF1dGgwTG9jayA9IHdpbmRvdy5BdXRoMExvY2s7XHJcbmV4cG9ydCB7ICQsIGpRdWVyeSwgUmVhY3QsIFJlYWN0RE9NLCBSZWFjdFJvdXRlciwgQXV0aDBMb2NrIH1cclxuIiwiaW1wb3J0IHsgQXV0aDBMb2NrLCBSZWFjdFJvdXRlciB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcuanMnXHJcbnZhciBicm93c2VySGlzdG9yeSA9IFJlYWN0Um91dGVyLmJyb3dzZXJIaXN0b3J5O1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyIHtcclxuXHJcblx0Y29uc3RydWN0b3IoY2xpZW50SWQsZG9tYWluLGlzQ2xvc2FibGUpIHtcclxuXHRcdC8vIENvbmZpZ3VyZSBBdXRoMFxyXG5cdFx0dGhpcy5sb2NrID0gbmV3IEF1dGgwTG9jayhjbGllbnRJZCwgZG9tYWluLCB7XHJcblx0XHRcdGFsbG93ZWRDb25uZWN0aW9uczogWydmbGVjdGluby1kZXYnLCAnZ2l0aHViJywgJ2dvb2dsZS1vYXV0aDInXSxcclxuXHRcdFx0c29jaWFsQnV0dG9uU3R5bGU6ICdzbWFsbCcsXHJcblx0XHRcdGxhbmd1YWdlRGljdGlvbmFyeToge1xyXG5cdFx0XHRcdHRpdGxlOiBcIkhpXCJcclxuXHRcdFx0fSxcclxuXHRcdFx0dGhlbWU6e1xyXG5cdFx0XHRcdGxvZ286ICdodHRwOi8vaW1nMDYuZGV2aWFudGFydC5uZXQvY2U4Ni9pLzIwMTMvMDI3LzEvNS9iYXRtYW5fbG9nb19vbmx5X2J5X2RlYXRob25hYnVuLWQ1c3dmMnUucG5nJyxcclxuXHRcdFx0XHRwcmltYXJ5Q29sb3I6ICcjMzEzMjRGJ1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdC8vIEFkZCBjYWxsYmFjayBmb3IgbG9jayBgYXV0aGVudGljYXRlZGAgZXZlbnRcclxuXHRcdHRoaXMubG9jay5vbignYXV0aGVudGljYXRlZCcsIHRoaXMub25BdXRoZW50aWNhdGlvbi5iaW5kKHRoaXMpKVxyXG5cdFx0Ly8gYmluZHMgbG9naW4gZnVuY3Rpb25zIHRvIGtlZXAgdGhpcyBjb250ZXh0XHJcblx0XHR0aGlzLmxvZ2luID0gdGhpcy5sb2dpbi5iaW5kKHRoaXMpXHJcblx0fVxyXG5cclxuXHRvbkF1dGhlbnRpY2F0aW9uKGF1dGhSZXN1bHQpe1xyXG5cdCAgIC8vIFNhdmVzIHRoZSB1c2VyIHRva2VuXHJcblx0XHR0aGlzLnNldFRva2VuKGF1dGhSZXN1bHQuaWRUb2tlbik7XHJcblx0XHR0aGlzLmxvY2suZ2V0UHJvZmlsZShhdXRoUmVzdWx0LmlkVG9rZW4sIChlcnJvciwgcHJvZmlsZSkgPT4ge1xyXG5cdFx0XHRpZiAoZXJyb3IpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnRXJyb3IgbG9hZGluZyB0aGUgUHJvZmlsZScsIGVycm9yKVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2V0UHJvZmlsZShwcm9maWxlKTtcclxuXHRcdFx0XHRpZiAodHlwZW9mIHByb2ZpbGUuZ3JvdXAgIT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9maWxlLmdyb3VwID09IFwiYWdlbnRcIikgYnJvd3Nlckhpc3RvcnkucHVzaChcImRhc2hcIik7XHJcblx0XHRcdFx0ZWxzZSBicm93c2VySGlzdG9yeS5wdXNoKFwiZGFzaFwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHNldFByb2ZpbGUocHJvZmlsZSl7XHJcblx0XHQvLyBTYXZlcyBwcm9maWxlIGRhdGEgdG8gbG9jYWxTdG9yYWdlXHJcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvZmlsZScsIEpTT04uc3RyaW5naWZ5KHByb2ZpbGUpKVxyXG5cdH1cclxuXHJcblx0Z2V0UHJvZmlsZSgpe1xyXG5cdFx0Ly8gUmV0cmlldmVzIHRoZSBwcm9maWxlIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcclxuXHRcdGNvbnN0IHByb2ZpbGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvZmlsZScpXHJcblx0XHRyZXR1cm4gcHJvZmlsZSA/IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLnByb2ZpbGUpIDoge31cclxuXHR9XHJcblxyXG5cdGdldFNlY3VyZVByb2ZpbGUoKXtcclxuXHRcdHJldHVybiAkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IGNvbmZpZy5hcGlIb3N0ICsgXCIvdXNlclwiLFxyXG5cdFx0XHR0eXBlOiBcImdldFwiLFxyXG5cdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0QXV0aG9yaXphdGlvbjogXCJCZWFyZXIgXCIgKyB0aGlzLmdldFRva2VuKClcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRsb2dpbigpIHtcclxuXHRcdC8vIENhbGwgdGhlIHNob3cgbWV0aG9kIHRvIGRpc3BsYXkgdGhlIHdpZGdldC5cclxuXHRcdHRoaXMubG9jay5zaG93KClcclxuXHR9XHJcblxyXG5cdGlzTG9nZ2VkSW4oKXtcclxuXHRcdC8vIENoZWNrcyBpZiB0aGVyZSBpcyBhIHNhdmVkIHRva2VuIGFuZCBpdCdzIHN0aWxsIHZhbGlkXHJcblx0XHRyZXR1cm4gISF0aGlzLmdldFRva2VuKClcclxuXHR9XHJcblxyXG5cdHNldFRva2VuKGlkVG9rZW4pe1xyXG5cdFx0Ly8gU2F2ZXMgdXNlciB0b2tlbiB0byBsb2NhbFN0b3JhZ2VcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpZF90b2tlbicsIGlkVG9rZW4pXHJcblx0fVxyXG5cclxuXHRnZXRUb2tlbigpe1xyXG5cdFx0Ly8gUmV0cmlldmVzIHRoZSB1c2VyIHRva2VuIGZyb20gbG9jYWxTdG9yYWdlXHJcblx0XHRyZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lkX3Rva2VuJylcclxuXHR9XHJcblxyXG5cdGxvZ291dCgpe1xyXG5cdFx0YnJvd3Nlckhpc3RvcnkucHVzaCgnbGFuZGluZycpO1xyXG5cdFx0Ly8gQ2xlYXIgdXNlciB0b2tlbiBhbmQgcHJvZmlsZSBkYXRhIGZyb20gbG9jYWxTdG9yYWdlXHJcblx0XHRsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnaWRfdG9rZW4nKTtcclxuXHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdwcm9maWxlJyk7XHJcblx0XHRyZXR1cm47XHJcblxyXG5cdH1cclxufVxyXG4iLCJcclxuXHJcbnZhciBnZXRRdWVyeVZhcmlhYmxlID0gZnVuY3Rpb24odmFyaWFibGUpIHtcclxuXHR2YXIgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcclxuXHR2YXIgcHJlVmFycyA9IHF1ZXJ5LnNwbGl0KCcvJyk7XHJcblx0dmFyIHZhcnMgPSBwcmVWYXJzWzBdLnNwbGl0KCcmJyk7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoJz0nKTtcclxuXHRcdGlmIChkZWNvZGVVUklDb21wb25lbnQocGFpclswXSkgPT0gdmFyaWFibGUpIHtcclxuXHRcdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y29uc29sZS5sb2coJ1F1ZXJ5IHZhcmlhYmxlICVzIG5vdCBmb3VuZCcsIHZhcmlhYmxlKTtcclxufVxyXG5cclxudmFyIGlzVmFsaWQgPSB7XHJcblx0ZW1haWw6IGZ1bmN0aW9uKGVtYWlsKSB7XHJcblx0XHR2YXIgcmUgPSAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcclxuXHRcdHJldHVybiByZS50ZXN0KGVtYWlsKTtcclxuXHR9LFxyXG5cdHBob25lOiBmdW5jdGlvbihwaG9uZSkge1xyXG5cdFx0dmFyIHN0cmlwUGhvbmUgPSBwaG9uZS5yZXBsYWNlKC9cXEQvZywnJyk7XHJcblx0XHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPj0gMTApIHJldHVybiB0cnVlO1xyXG5cdFx0ZWxzZSBmYWxzZTtcclxuXHR9XHJcbn1cclxuXHJcbnZhciBmb3JtYXRQaG9uZTEwID0gZnVuY3Rpb24ocGhvbmUpe1xyXG5cdHZhciBzdHJpcFBob25lID0gcGhvbmUucmVwbGFjZSgvXFxEL2csJycpO1xyXG5cdHZhciBkYXNoID0gXCJcIjtcclxuXHR2YXIgb3BlblBhcmVuID0gXCJcIjtcclxuXHR2YXIgY2xvc2VkUGFyZW4gPSBcIlwiO1xyXG5cdGlmIChzdHJpcFBob25lLmxlbmd0aCA+IDApIG9wZW5QYXJlbiA9IFwiKFwiO1xyXG5cdGlmIChzdHJpcFBob25lLmxlbmd0aCA+IDMpIGNsb3NlZFBhcmVuID0gXCIpXCI7XHJcblx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID4gNikgZGFzaCA9IFwiLVwiO1xyXG5cdHZhciBmb3JtYXR0ZWRQaG9uZSA9IG9wZW5QYXJlbiArIHN0cmlwUGhvbmUuc3Vic3RyaW5nKDAsMykgKyBjbG9zZWRQYXJlbiArIHN0cmlwUGhvbmUuc3Vic3RyaW5nKDMsNikgKyBkYXNoICsgc3RyaXBQaG9uZS5zdWJzdHJpbmcoNiwxMCk7XHJcblx0cmV0dXJuIGZvcm1hdHRlZFBob25lO1xyXG59XHJcblxyXG52YXIgZ2V0VGltZXpvbmVPZmZzZXQgPSBmdW5jdGlvbigpe1xyXG5cdGZ1bmN0aW9uIHBhZChudW1iZXIsIGxlbmd0aCl7XHJcblx0XHQgdmFyIHN0ciA9IFwiXCIgKyBudW1iZXJcclxuXHRcdCB3aGlsZSAoc3RyLmxlbmd0aCA8IGxlbmd0aCkge1xyXG5cdFx0XHQgIHN0ciA9ICcwJytzdHJcclxuXHRcdCB9XHJcblx0XHQgcmV0dXJuIHN0clxyXG5cdH1cclxuXHR2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0dmFyIG9mZnNldCA9IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcclxuXHRyZXR1cm4gKChvZmZzZXQ8MD8gJysnOictJykgKyBwYWQocGFyc2VJbnQoTWF0aC5hYnMob2Zmc2V0LzYwKSksIDIpKyBwYWQoTWF0aC5hYnMob2Zmc2V0JTYwKSwgMikpO1xyXG59XHJcblxyXG52YXIgY3JlYXRlVGltZURhdGUgPSBmdW5jdGlvbihkYXRlLCB0aW1lKXtcclxuXHR2YXIgbWlsZXN0b25lRGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG5cdHZhciBzdHJTcGxpdCA9IHRpbWUuc3BsaXQoJzonKTtcclxuXHR2YXIgaG91ciA9IHBhcnNlSW50KHN0clNwbGl0WzBdKTtcclxuXHR2YXIgbWludXRlID0gcGFyc2VJbnQoc3RyU3BsaXRbMV0uc3Vic3RyaW5nKDAsMikpO1xyXG5cdHZhciBzZXQgPSBzdHJTcGxpdFsxXS5zdWJzdHJpbmcoMiw0KTtcclxuXHRpZiAoaG91ciA9PT0gMTIpIHtcclxuXHRcdGlmIChzZXQgPT09IFwiYW1cIikgaG91ciA9IDA7XHJcblx0XHRlbHNlIGhvdXIgPSAxMjtcclxuXHR9IGVsc2UgaWYgKHNldCA9PT0gXCJwbVwiKSBob3VyICs9IDEyO1xyXG5cdG1pbGVzdG9uZURhdGUuc2V0SG91cnMoaG91cik7XHJcblx0bWlsZXN0b25lRGF0ZS5zZXRNaW51dGVzKG1pbnV0ZSk7XHJcblx0bWlsZXN0b25lRGF0ZS5zZXRNaW51dGVzKG1pbGVzdG9uZURhdGUuZ2V0TWludXRlcygpIC0gIG1pbGVzdG9uZURhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSk7XHJcblx0cmV0dXJuIG1pbGVzdG9uZURhdGUudG9JU09TdHJpbmcoKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IGdldFF1ZXJ5VmFyaWFibGUsIGlzVmFsaWQsIGZvcm1hdFBob25lMTAsIGdldFRpbWV6b25lT2Zmc2V0LCBjcmVhdGVUaW1lRGF0ZSB9XHJcbiIsImltcG9ydCB7IFJlYWN0LCBSZWFjdFJvdXRlciB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcuanMnXHJcbmltcG9ydCBVc2VyIGZyb20gJy4uL2NsYXNzZXMvVXNlci5qcydcclxuXHJcbnZhciBMaW5rID0gUmVhY3RSb3V0ZXIuTGluaztcclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPVwiZm9vdGVyXCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXJnaW4tYm90dG9tLTEwXCI+UmVzb3VyY2VzPC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXY+Rm9yIEN1c3RvbWVyczwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2PkZvciBSZXRhaWxlcnM8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdj5Gb3IgRGV2ZWxvcGVyczwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi1ib3R0b20tMTBcIj5IZWxwPC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cclxuXHRcdFx0XHRcdFx0ey8qIDxkaXYgY2xhc3NOYW1lPVwibWFyZ2luLWJvdHRvbS0xMFwiPlJlc291cmNlczwvZGl2PiAqL31cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXJnaW4tYm90dG9tLTEwXCI+QWJvdXQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi1ib3R0b20tMTBcIj5Db250YWN0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXY+Q2FsbDogKDg4OCk5MzAtMjkzODwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2PkVtYWlsOiBpbmZvQGhpLmNvbTwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuLi9jZG4nXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnLmpzJ1xyXG5pbXBvcnQgVXNlciBmcm9tICcuLi9jbGFzc2VzL1VzZXIuanMnXHJcblxyXG52YXIgTGluayA9IFJlYWN0Um91dGVyLkxpbms7XHJcbnZhciBicm93c2VySGlzdG9yeSA9IFJlYWN0Um91dGVyLmJyb3dzZXJIaXN0b3J5O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0dmFyIHVzZXIgPSB0aGlzLnByb3BzLnVzZXI7XHJcblx0XHR2YXIgaGVhZGVyQWRkaXRpb24gPSAoPGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+PC9saT4pXHJcblx0XHRpZighdXNlci5pc0xvZ2dlZEluKCkpIGhlYWRlckFkZGl0aW9uID0gKFxyXG5cdFx0XHQ8bGkgY2xhc3NOYW1lPVwibmF2LWl0ZW1cIj5cclxuXHRcdFx0XHQ8YSBocmVmPVwiamF2YXNjcmlwdDpcIiBjbGFzc05hbWU9XCJuYXYtbGlua1wiIG9uQ2xpY2s9eygpPT51c2VyLmxvZ2luKCl9PkxvZ2luPC9hPlxyXG5cdFx0XHQ8L2xpPlxyXG5cdFx0KTtcclxuXHRcdGVsc2UgaWYodXNlci5pc0xvZ2dlZEluKCkgJiYgIXRoaXMucHJvcHMubmF2KSBoZWFkZXJBZGRpdGlvbiA9IChcclxuXHRcdFx0PGxpIGNsYXNzTmFtZT1cIm5hdi1pdGVtXCI+XHJcblx0XHRcdFx0PExpbmsgdG89XCJkYXNoXCIgY2xhc3NOYW1lPVwibmF2LWxpbmtcIj5EYXNoYm9hcmQ8L0xpbms+XHJcblx0XHRcdDwvbGk+XHJcblx0XHQpO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJoZWFkZXJcIj5cclxuXHRcdFx0XHQ8bmF2IGNsYXNzTmFtZT1cIm5hdmJhciBuYXZiYXItZml4ZWQtdG9wXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBmaXgtd2lkdGhcIj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIjXCI+SGk8L3NwYW4+XHJcblx0XHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwibmF2IG5hdmJhci1uYXYgaGlkZGVuLXNtLWRvd24gZmxvYXQteHMtcmlnaHRcIj5cclxuXHRcdFx0XHRcdFx0e2hlYWRlckFkZGl0aW9ufVxyXG5cdFx0XHRcdFx0PC91bD5cclxuXHRcdFx0XHRcdDxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIGNsYXNzTmFtZT1cIm5hdmJhci10b2dnbGVyIGZsb2F0LXhzLXJpZ2h0IGhpZGRlbi1tZC11cFwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiNleENvbGxhcHNpbmdOYXZiYXJcIj5cclxuXHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPVwiZmEgZmEtYmFyc1wiPjwvaT5cclxuXHRcdFx0XHRcdDwvYT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvbmF2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuIiwiaW1wb3J0IHsgUmVhY3QsIFJlYWN0Um91dGVyIH0gZnJvbSAnLi4vY2RuJ1xyXG5pbXBvcnQgVXNlciBmcm9tICcuLi9jbGFzc2VzL1VzZXIuanMnXHJcblxyXG52YXIgTGluayA9IFJlYWN0Um91dGVyLkxpbms7XHJcbnZhciBicm93c2VySGlzdG9yeSA9IFJlYWN0Um91dGVyLmJyb3dzZXJIaXN0b3J5O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm57XHJcblx0XHRcdG5hdjpbXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bmFtZTogXCJEYXNoYm9hcmRcIixcclxuXHRcdFx0XHRcdGxpbms6IFwiZGFzaFwiLFxyXG5cdFx0XHRcdFx0aWNvbjogXCJmYS1iYXItY2hhcnRcIlxyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0bmFtZTpcIkFjY291bnRcIixcclxuXHRcdFx0XHRcdGxpbms6XCJhY2NvdW50XCIsXHJcblx0XHRcdFx0XHRpY29uOiBcImZhLXVzZXItb1wiXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOiBcIlN1cHBvcnRcIixcclxuXHRcdFx0XHRcdGxpbms6IFwic3VwcG9ydFwiLFxyXG5cdFx0XHRcdFx0aWNvbjogXCJmYS1jb21tZW50LW9cIlxyXG5cdFx0XHRcdH0se1xyXG5cdFx0XHRcdFx0bmFtZTogXCJEb2N1bWVudGF0aW9uXCIsXHJcblx0XHRcdFx0XHRsaW5rOiBcImRvY3NcIixcclxuXHRcdFx0XHRcdGljb246IFwiZmEtYm9va1wiXHJcblx0XHRcdFx0fSx7XHJcblx0XHRcdFx0XHRuYW1lOiBcIkxvZ291dFwiLFxyXG5cdFx0XHRcdFx0bGluazpcImxvZ291dFwiLFxyXG5cdFx0XHRcdFx0aWNvbjogXCJmYS1zaWduLW91dFwiXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRdXHJcblx0XHR9XHJcblx0fSxcclxuXHRsb2dvdXQ6IGZ1bmN0aW9uKCl7XHJcblx0XHRVc2VyLmRlbGV0ZUF1dGhvcml6YXRpb24oKTtcclxuXHRcdGJyb3dzZXJIaXN0b3J5LnB1c2goXCJsb2dpblwiKTtcclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblx0XHR2YXIgZnJhZyA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNwbGl0KFwiP1wiKVswXTtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJuYXZcIj5cclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHR0aGlzLnN0YXRlLm5hdi5tYXAoKGl0ZW0sIGkpPT57XHJcblx0XHRcdFx0XHRcdGlmIChpdGVtLm5hbWUgPT0gXCJMb2dvdXRcIikgcmV0dXJuKFxyXG5cdFx0XHRcdFx0XHRcdDxkaXYga2V5PXtpfSBjbGFzc05hbWU9XCJsaW5rQm94XCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiamF2YXNjcmlwdDpcIiBvbkNsaWNrPXt0aGlzLnByb3BzLnVzZXIubG9nb3V0fT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPXtcImZhIGZhLWZ3IGNvbG9yLXByaW1hcnktbXV0ZWQgXCIgKyBpdGVtLmljb259PjwvaT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4+Jm5ic3A7Jm5ic3A7e2l0ZW0ubmFtZX08L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2E+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdGVsc2UgcmV0dXJuKFxyXG5cdFx0XHRcdFx0XHRcdDxkaXYga2V5PXtpfSBjbGFzc05hbWU9XCJsaW5rQm94XCI+XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0PExpbmsgdG89e2l0ZW0ubGlua30+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxpIGNsYXNzTmFtZT17XCJmYSBmYS1mdyBjb2xvci1ibGFjayBjb2xvci1wcmltYXJ5LW11dGVkIFwiICsgaXRlbS5pY29ufT48L2k+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuPiZuYnNwOyZuYnNwO3tpdGVtLm5hbWV9PC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9MaW5rPlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0dmFyIG5vdGlmaWNhdGlvbnMgPSB0aGlzLnByb3BzLm5vdGlmaWNhdGlvbi5yZXRyaWV2ZSgpO1xyXG5cdFx0dmFyIG5vdGlmaWNhdGlvblZpZXcgPSAoPGRpdj48L2Rpdj4pO1xyXG5cdFx0aWYgKG5vdGlmaWNhdGlvbnMubGVuZ3RoID4gMCl7XHJcblx0XHRcdG5vdGlmaWNhdGlvblZpZXcgPSAoXHJcblx0XHRcdFx0PGRpdiBpZD1cIm5vdGlmaWNhdGlvbnNcIj5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0bm90aWZpY2F0aW9ucy5tYXAoKG5vdGlmaWNhdGlvbiwgaSk9PntcclxuXHRcdFx0XHRcdFx0XHRpZiAobm90aWZpY2F0aW9uLnR5cGUgPT0gdW5kZWZpbmVkKSBub3RpZmljYXRpb24udHlwZSA9IFwic3VjY2Vzc1wiO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybihcclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPXtcImFsZXJ0IGFsZXJ0LVwiICsgbm90aWZpY2F0aW9uLnR5cGV9IGtleT17aX0gZGF0YS1uSW5kZXg9e2l9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7bm90aWZpY2F0aW9uLm1lc3NhZ2V9XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNsb3NlXCIgb25DbGljaz17ICgpID0+IHRoaXMucHJvcHMubm90aWZpY2F0aW9uLnJlbW92ZShpKSB9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuPiZ0aW1lczs8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH1cclxuICAgIFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbm90aWZpY2F0aW9uVmlldztcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdCAgIFx0cmV0dXJuIHtcclxuXHRcdFx0XHRhcGlLZXk6XCJZb3VyIHNlY3JldCBBUEkgS2V5XCIsXHJcblx0XHRcdFx0a2V5UHVsbGVkOiBmYWxzZSxcclxuXHRcdFx0XHRwcm9maWxlOiB0aGlzLnByb3BzLnVzZXIuZ2V0UHJvZmlsZSgpXHJcblx0XHQgXHR9O1xyXG5cdH0sXHJcblx0cHJlc2VudEtleTogZnVuY3Rpb24oKSB7XHJcblx0XHRpZighdGhpcy5zdGF0ZS5rZXlQdWxsZWQpIHRoaXMucHJvcHMudXNlci5nZXRTZWN1cmVQcm9maWxlKCkudGhlbigodXNlcik9PntcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7YXBpS2V5OnVzZXIuYXBwX21ldGFkYXRhLmtleSxrZXlQdWxsZWQ6dHJ1ZX0pO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJhY2NvdW50XCI+XHJcblx0XHRcdFx0PGgzPkFjY291bnQ8L2gzPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGluZm9Cb3ggbWFyZ2luLXRvcC0xNVwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG5cdFx0XHRcdFx0XHRcdDxoNT5FbWFpbDwvaDU+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4+e3RoaXMuc3RhdGUucHJvZmlsZS5lbWFpbH08L3NwYW4+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdFx0PGg1PlN1YnNjcmlwdGlvbjwvaDU+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4+RnJlZSBVbmxpbWl0ZWQ8L3NwYW4+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBtYXJnaW4tdG9wLTM1XCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aDU+VXNlciBJRDwvaDU+XHJcblx0XHRcdFx0XHRcdFx0PHNwYW4+e3RoaXMuc3RhdGUucHJvZmlsZS51c2VyX2lkfTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aDU+QXBpIEtleSZuYnNwOyZuYnNwOzxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIGNsYXNzTmFtZT1cImZvbnQtc2l6ZS0xMlwiIG9uQ2xpY2s9e3RoaXMucHJlc2VudEtleX0+U2hvdzwvYT48L2g1PlxyXG5cdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdCh0aGlzLnN0YXRlLmtleVB1bGxlZCk/XHJcblx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgaWQ9XCJrZXlCb3hcIiB0eXBlPVwidGV4dFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXt0aGlzLnN0YXRlLmFwaUtleX0gcmVhZE9ubHkvPjpcclxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dCBpZD1cImtleUJveFwiIHR5cGU9XCJwYXNzd29yZFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXt0aGlzLnN0YXRlLmFwaUtleX0gcmVhZE9ubHkvPlxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcblxyXG4vLyA8ZGl2IGNsYXNzTmFtZT1cInJvdyBsaWdodC1ib3JkZXJcIj5cclxuLy8gXHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00XCI+XHJcbi8vIFx0XHRGaXJzdCBOYW1lOlxyXG4vLyBcdDwvZGl2PlxyXG4vLyBcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTRcIj5cclxuLy8gXHRcdHt0aGlzLnByb3BzLnVzZXIuZ2l2ZW5OYW1lfVxyXG4vLyBcdDwvZGl2PlxyXG4vLyA8L2Rpdj5cclxuLy8gPGRpdiBjbGFzc05hbWU9XCJyb3cgbGlnaHQtYm9yZGVyXCI+XHJcbi8vIFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNFwiPlxyXG4vLyBcdFx0TGFzdCBOYW1lOlxyXG4vLyBcdDwvZGl2PlxyXG4vLyBcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTRcIj5cclxuLy8gXHRcdHt0aGlzLnByb3BzLnVzZXIuc3VyTmFtZX1cclxuLy8gXHQ8L2Rpdj5cclxuLy8gPC9kaXY+XHJcbi8vIDxkaXYgY2xhc3NOYW1lPVwicm93IGxpZ2h0LWJvcmRlclwiPlxyXG4vLyBcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTRcIj5cclxuLy8gXHRcdEVtYWlsOlxyXG4vLyBcdDwvZGl2PlxyXG4vLyBcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTRcIj5cclxuLy8gXHRcdHt0aGlzLnByb3BzLnVzZXIuZW1haWx9XHJcbi8vIFx0PC9kaXY+XHJcbi8vIFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNFwiPlxyXG4vLyBcdFx0eyh0aGlzLnByb3BzLnVzZXIuaXNFbWFpbFZlcmlmaWVkKT88c3Bhbj48L3NwYW4+OjxzcGFuPlZlcmlmeSBFbWFpbDwvc3Bhbj59XHJcbi8vIFx0PC9kaXY+XHJcbi8vIDwvZGl2PlxyXG4vLyA8ZGl2IGNsYXNzTmFtZT1cInJvdyBsaWdodC1ib3JkZXJcIj5cclxuLy8gXHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00XCI+XHJcbi8vIFx0XHROb3RpZmljYXRpb24gUHJlZmVyZW5jZTpcclxuLy8gXHQ8L2Rpdj5cclxuLy8gXHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00XCI+XHJcbi8vIFx0XHR7KHRoaXMucHJvcHMudXNlci5lbWFpbFByZWZlcmVuY2UgPT0gMCkgPyBcIkltbWVkaWF0ZWx5XCI6XCJOZXZlclwifVxyXG4vLyBcdDwvZGl2PlxyXG4vLyA8L2Rpdj5cclxuLy8gPGRpdiBjbGFzc05hbWU9XCJtYXJnaW4tdG9wLTUwIHJvd1wiPlxyXG4vLyBcdHtcclxuLy8gXHRcdCh0aGlzLnN0YXRlLmVkaXRNb2RlKSA/IChcclxuLy8gXHRcdFx0PGRpdj5cclxuLy8gXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcbi8vIFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZUVkaXRNb2RlfSBjbGFzc05hbWU9XCJjb2wteHMtNiBjb2wteHMtb2Zmc2V0LTMgYnRuIGJ0bi1zZWNvbmRhcnkgbWFyZ2luVG9wMTVcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxyXG4vLyBcdFx0XHRcdFx0XHRTYXZlXHJcbi8vIFx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuLy8gXHRcdFx0XHQ8L2Rpdj5cclxuLy8gXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcbi8vIFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZUVkaXRNb2RlfSBjbGFzc05hbWU9XCJjb2wteHMtNiBjb2wteHMtb2Zmc2V0LTMgYnRuIG1hcmdpblRvcDE1XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cclxuLy8gXHRcdFx0XHRcdFx0Q2FuY2VsXHJcbi8vIFx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuLy8gXHRcdFx0XHQ8L2Rpdj5cclxuLy8gXHRcdFx0PC9kaXY+XHJcbi8vIFx0XHQpOihcclxuLy8gXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG4vLyBcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlRWRpdE1vZGV9IGNsYXNzTmFtZT1cImNvbC14cy02IGNvbC14cy1vZmZzZXQtMyBidG4gYnRuLXByaW1hcnkgbWFyZ2luVG9wMTVcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxyXG4vLyBcdFx0XHRcdFx0RWRpdFxyXG4vLyBcdFx0XHRcdDwvYnV0dG9uPlxyXG4vLyBcdFx0XHQ8L2Rpdj5cclxuLy8gXHRcdClcclxuLy8gXHR9XHJcbi8vIDwvZGl2PlxyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL0Zvb3Rlci5qcydcclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImRhc2hcIj5cclxuXHRcdFx0XHREYXNoXHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL0Zvb3Rlci5qcydcclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImRvY3NcIj5cclxuXHRcdFx0XHREb2NzXHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuLi9jZG4nXHJcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi4vY29tcG9uZW50cy9oZWFkZXIuanMnXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vY29uZmlnLmpzJ1xyXG5pbXBvcnQgVXNlciBmcm9tICcuLi9jbGFzc2VzL1VzZXIuanMnXHJcbmltcG9ydCBGb290ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Gb290ZXIuanMnXHJcblxyXG52YXIgTGluayA9IFJlYWN0Um91dGVyLkxpbms7XHJcbnZhciBicm93c2VySGlzdG9yeSA9IFJlYWN0Um91dGVyLmJyb3dzZXJIaXN0b3J5O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgIFx0cmV0dXJuIHtcclxuXHRcdFx0ZW1haWw6IFwiXCIsXHJcblx0XHRcdHBhc3N3b3JkOiBcIlwiXHJcblx0IFx0fTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cImxhbmRpbmdcIj5cclxuXHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL0Zvb3Rlci5qcydcclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cInN1cHBvcnRcIj5cclxuXHRcdFx0XHRTdXBwb3J0XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdERPTSwgUmVhY3RSb3V0ZXIgfSBmcm9tICcuL2NkbidcclxuXHJcbmltcG9ydCBBcHAgZnJvbSAnLi9hcHAuanMnXHJcbmltcG9ydCBMYW5kaW5nIGZyb20gJy4vdmlld3MvbGFuZGluZydcclxuaW1wb3J0IERhc2ggZnJvbSAnLi92aWV3cy9kYXNoJ1xyXG4vLyBpbXBvcnQgQXBpS2V5IGZyb20gJy4vdmlld3MvYXBpS2V5J1xyXG5pbXBvcnQgQWNjb3VudCBmcm9tICcuL3ZpZXdzL2FjY291bnQnXHJcbmltcG9ydCBEb2NzIGZyb20gJy4vdmlld3MvZG9jcydcclxuaW1wb3J0IFN1cHBvcnQgZnJvbSAnLi92aWV3cy9zdXBwb3J0J1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcclxuaW1wb3J0IFVzZXIgZnJvbSAnLi9jbGFzc2VzL1VzZXInXHJcblxyXG52YXIgUm91dGVyID0gUmVhY3RSb3V0ZXIuUm91dGVyO1xyXG52YXIgUm91dGUgPSBSZWFjdFJvdXRlci5Sb3V0ZTtcclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcblxyXG5jb25zdCB1c2VyID0gbmV3IFVzZXIoY29uZmlnLmF1dGgwLmNsaWVudElkLCBjb25maWcuYXV0aDAuZG9tYWluKTtcclxuXHJcbi8vIHZhbGlkYXRlIGF1dGhlbnRpY2F0aW9uIGZvciBwcml2YXRlIHJvdXRlc1xyXG5jb25zdCByZXF1aXJlQXV0aCA9IChuZXh0U3RhdGUsIHJlcGxhY2UpID0+IHtcclxuXHRpZiAoIXVzZXIuaXNMb2dnZWRJbigpKSB7XHJcblx0XHRicm93c2VySGlzdG9yeS5wdXNoKFwibGFuZGluZ1wiKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG59XHJcblxyXG5cclxuUmVhY3RET00ucmVuZGVyKChcclxuXHQ8Um91dGVyIGhpc3Rvcnk9e2Jyb3dzZXJIaXN0b3J5fT5cclxuXHRcdDxSb3V0ZSBjb21wb25lbnQ9e0FwcH0gdXNlcj17dXNlcn0+XHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwibGFuZGluZ1wiIGNvbXBvbmVudD17TGFuZGluZ30gbmF2PXtmYWxzZX0vPlxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cImRvY3NcIiBjb21wb25lbnQ9e0RvY3N9IG5hdj17ZmFsc2V9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJkYXNoXCIgY29tcG9uZW50PXtEYXNofSBvbkVudGVyPXtyZXF1aXJlQXV0aH0gbmF2PXt0cnVlfS8+XHJcblx0XHRcdHsvKiA8Um91dGUgcGF0aD1cImFwaUtleVwiIGNvbXBvbmVudD17QXBpS2V5fSBvbkVudGVyPXtyZXF1aXJlQXV0aH0gbmF2PXt0cnVlfS8+ICovfVxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cImFjY291bnRcIiBjb21wb25lbnQ9e0FjY291bnR9IG9uRW50ZXI9e3JlcXVpcmVBdXRofSBuYXY9e3RydWV9Lz5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzdXBwb3J0XCIgY29tcG9uZW50PXtTdXBwb3J0fSBuYXY9e3RydWV9Lz5cclxuXHRcdDwvUm91dGU+XHJcblx0PC9Sb3V0ZXI+XHJcbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XHJcbiJdfQ==
