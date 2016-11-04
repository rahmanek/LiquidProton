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

},{}],3:[function(require,module,exports){
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

},{"../../config.js":1,"../cdn":2}],4:[function(require,module,exports){
'use strict';

var _cdn = require('./cdn');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _activity = require('./views/activity');

var _activity2 = _interopRequireDefault(_activity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cdn.ReactDOM.render(_cdn.React.createElement(_activity2.default, null), document.getElementById('app'));

},{"../config":1,"./cdn":2,"./views/activity":5}],5:[function(require,module,exports){
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

exports.default = _cdn.React.createClass({
	displayName: 'activity',

	getInitialState: function getInitialState() {
		return {
			activity: null
		};
	},
	componentDidMount: function componentDidMount() {
		var _this = this;

		var postData = {
			authorization: _User2.default.getAuthorization(),
			id: this.props.location.query.id,
			activity: {}
		};

		$.post(_config2.default.apiHost + "/activity/receipt/retrieve", postData).then(function (data) {
			_this.setState({ activity: data });
		});
	},
	render: function render() {
		if (this.state.activity === null) return _cdn.React.createElement('div', null);
		var activity = this.state.activity;
		var date = new Date(Date.parse(activity.Receipt.createdAt));
		var formattedDate = date.toLocaleString();
		return _cdn.React.createElement(
			'div',
			{ id: 'activity', className: 'views' },
			_cdn.React.createElement(
				'div',
				{ className: 'row activity-header' },
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-6' },
					formattedDate
				),
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-6 text-right' },
					activity.Key.name
				)
			),
			_cdn.React.createElement(
				'div',
				{ id: 'receiptInfo', className: 'row margin-top-15 margin-bottom-15' },
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-12 col-sm-7' },
					_cdn.React.createElement(
						'table',
						{ className: 'table margin-top-10' },
						_cdn.React.createElement(
							'tbody',
							null,
							_cdn.React.createElement(
								'tr',
								null,
								_cdn.React.createElement(
									'td',
									null,
									'Phone:'
								),
								_cdn.React.createElement(
									'td',
									null,
									activity.Key.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
								)
							),
							_cdn.React.createElement(
								'tr',
								null,
								_cdn.React.createElement(
									'td',
									null,
									'Address:'
								),
								_cdn.React.createElement(
									'td',
									null,
									activity.Key.line1,
									_cdn.React.createElement('br', null),
									activity.Key.city,
									', ',
									activity.Key.state,
									' ',
									activity.Key.zip
								)
							),
							_cdn.React.createElement(
								'tr',
								null,
								_cdn.React.createElement(
									'td',
									null,
									'Email:'
								),
								_cdn.React.createElement(
									'td',
									null,
									activity.Key.email
								)
							),
							_cdn.React.createElement(
								'tr',
								null,
								_cdn.React.createElement(
									'td',
									null,
									'Website:'
								),
								_cdn.React.createElement(
									'td',
									null,
									_cdn.React.createElement(
										'a',
										{ href: activity.Key.url },
										activity.Key.url
									)
								)
							)
						)
					)
				),
				_cdn.React.createElement(
					'div',
					{ className: 'hidden-xs col-sm-5' },
					_cdn.React.createElement(
						'div',
						{ className: 'margin-top-10' },
						'Charged to CC-',
						activity.Link.lastFour
					),
					_cdn.React.createElement(
						'div',
						{ className: 'card card-block margin-top-15 align-right' },
						_cdn.React.createElement(
							'p',
							{ className: 'card-text color-secondary' },
							'Total'
						),
						_cdn.React.createElement(
							'h4',
							{ className: 'card-title' },
							'$',
							activity.Receipt.total
						)
					)
				),
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-12 hidden-sm hidden-md hidden-lg text-center' },
					_cdn.React.createElement(
						'div',
						{ className: 'margin-top-10' },
						'Charged CC-',
						activity.Link.lastFour
					),
					_cdn.React.createElement(
						'div',
						{ className: 'margin-top-10' },
						_cdn.React.createElement(
							'span',
							{ className: 'color-secondary' },
							'Total: '
						),
						_cdn.React.createElement(
							'span',
							{ className: 'bold align-right' },
							'$',
							activity.Receipt.total
						)
					)
				)
			),
			_cdn.React.createElement(
				'table',
				{ className: 'table' },
				_cdn.React.createElement(
					'thead',
					null,
					_cdn.React.createElement(
						'tr',
						null,
						_cdn.React.createElement(
							'th',
							null,
							'Item'
						),
						_cdn.React.createElement(
							'th',
							null,
							'Quantity'
						),
						_cdn.React.createElement(
							'th',
							null,
							'Unit Cost'
						),
						_cdn.React.createElement(
							'th',
							null,
							'Total'
						)
					)
				),
				_cdn.React.createElement(
					'tbody',
					null,
					activity.Receipt.items.map(function (itemGroup, i) {
						return itemGroup.map(function (item, j) {
							if (typeof item.unitCost == "undefined") var unitCost = "";else var unitCost = "$" + item.unitCost;
							if (typeof item.quantity == "undefined") var quantity = "";else var quantity = item.quantity;
							return _cdn.React.createElement(
								'tr',
								{ className: i > 0 && j == 0 ? " newSection" : "" },
								_cdn.React.createElement(
									'td',
									null,
									item.description
								),
								_cdn.React.createElement(
									'td',
									null,
									quantity
								),
								_cdn.React.createElement(
									'td',
									null,
									unitCost
								),
								_cdn.React.createElement(
									'td',
									null,
									'$',
									item.total
								)
							);
						});
					})
				)
			)
		);
	}
});

},{"../../config.js":1,"../cdn":2,"../classes/User.js":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGNkbi5qcyIsInNyY1xcY2xhc3Nlc1xcVXNlci5qcyIsInNyY1xcbGFuZGluZy5qcyIsInNyY1xcdmlld3NcXGFjdGl2aXR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQ0EsSUFBSSxjQUFjLGFBQWxCOztrQkFFZTtBQUNkLGNBQWEsV0FEQztBQUVkLFVBQVUsWUFBVTtBQUNuQixNQUFHLGVBQWUsWUFBbEIsRUFBZ0MsT0FBTyw2QkFBUCxDQUFoQyxLQUNLLE9BQU8sdUJBQVA7QUFDTCxFQUhTLEVBRkk7QUFNZCxVQUFVLFlBQVU7QUFDbkIsTUFBRyxlQUFlLFlBQWxCLEVBQWdDLE9BQU8sNkJBQVAsQ0FBaEMsS0FDSyxPQUFPLHVCQUFQO0FBQ0wsRUFIUyxFQU5JO0FBVWQsYUFBWSw2QkFWRTtBQVdkLFFBQU07QUFDTCxZQUFVLGtDQURMO0FBRUwsVUFBUTtBQUZIO0FBWFEsQzs7Ozs7Ozs7O0FDRmYsSUFBSSxJQUFJLE9BQU8sQ0FBZjtBQUNBLElBQUksU0FBUyxDQUFiO0FBQ0EsSUFBSSxRQUFRLE9BQU8sS0FBbkI7QUFDQSxJQUFJLFdBQVcsT0FBTyxRQUF0QjtBQUNBLElBQUksU0FBUyxPQUFPLFdBQXBCO0FBQ0EsSUFBSSxZQUFZLE9BQU8sU0FBdkI7UUFDUyxDLEdBQUEsQztRQUFHLE0sR0FBQSxNO1FBQVEsSyxHQUFBLEs7UUFBTyxRLEdBQUEsUTtRQUFVLFcsR0FBQSxXO1FBQWEsUyxHQUFBLFM7Ozs7Ozs7Ozs7O0FDUGxEOztBQUNBOzs7Ozs7OztBQUNBLElBQUksaUJBQWlCLGlCQUFZLGNBQWpDOztJQUNxQixJO0FBRXBCLGVBQVksUUFBWixFQUFxQixNQUFyQixFQUE0QixVQUE1QixFQUF3QztBQUFBOztBQUN2QztBQUNBLE9BQUssSUFBTCxHQUFZLG1CQUFjLFFBQWQsRUFBd0IsTUFBeEIsRUFBZ0M7QUFDM0MsdUJBQW9CLENBQUMsY0FBRCxFQUFpQixRQUFqQixFQUEyQixlQUEzQixDQUR1QjtBQUUzQyxzQkFBbUIsT0FGd0I7QUFHM0MsdUJBQW9CO0FBQ25CLFdBQU87QUFEWSxJQUh1QjtBQU0zQyxVQUFNO0FBQ0wsVUFBTSw2RkFERDtBQUVMLGtCQUFjO0FBRlQ7QUFOcUMsR0FBaEMsQ0FBWjtBQVdBO0FBQ0EsT0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLGVBQWIsRUFBOEIsS0FBSyxnQkFBTCxDQUFzQixJQUF0QixDQUEyQixJQUEzQixDQUE5QjtBQUNBO0FBQ0EsT0FBSyxLQUFMLEdBQWEsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFiO0FBQ0E7Ozs7bUNBRWdCLFUsRUFBVztBQUFBOztBQUN6QjtBQUNGLFFBQUssUUFBTCxDQUFjLFdBQVcsT0FBekI7QUFDQSxRQUFLLElBQUwsQ0FBVSxVQUFWLENBQXFCLFdBQVcsT0FBaEMsRUFBeUMsVUFBQyxLQUFELEVBQVEsT0FBUixFQUFvQjtBQUM1RCxRQUFJLEtBQUosRUFBVztBQUNWLGFBQVEsR0FBUixDQUFZLDJCQUFaLEVBQXlDLEtBQXpDO0FBQ0EsS0FGRCxNQUVPO0FBQ04sV0FBSyxVQUFMLENBQWdCLE9BQWhCO0FBQ0EsU0FBSSxPQUFPLFFBQVEsS0FBZixJQUF3QixXQUF4QixJQUF1QyxRQUFRLEtBQVIsSUFBaUIsT0FBNUQsRUFBcUUsZUFBZSxJQUFmLENBQW9CLE1BQXBCLEVBQXJFLEtBQ0ssZUFBZSxJQUFmLENBQW9CLE1BQXBCO0FBQ0w7QUFDRCxJQVJEO0FBU0E7Ozs2QkFFVSxPLEVBQVE7QUFDbEI7QUFDQSxnQkFBYSxPQUFiLENBQXFCLFNBQXJCLEVBQWdDLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBaEM7QUFDQTs7OytCQUVXO0FBQ1g7QUFDQSxPQUFNLFVBQVUsYUFBYSxPQUFiLENBQXFCLFNBQXJCLENBQWhCO0FBQ0EsVUFBTyxVQUFVLEtBQUssS0FBTCxDQUFXLGFBQWEsT0FBeEIsQ0FBVixHQUE2QyxFQUFwRDtBQUNBOzs7cUNBRWlCO0FBQ2pCLFVBQU8sRUFBRSxJQUFGLENBQU87QUFDYixTQUFLLGlCQUFPLE9BQVAsR0FBaUIsT0FEVDtBQUViLFVBQU0sS0FGTztBQUdiLGFBQVM7QUFDUixvQkFBZSxZQUFZLEtBQUssUUFBTDtBQURuQjtBQUhJLElBQVAsQ0FBUDtBQU9BOzs7MEJBRU87QUFDUDtBQUNBLFFBQUssSUFBTCxDQUFVLElBQVY7QUFDQTs7OytCQUVXO0FBQ1g7QUFDQSxVQUFPLENBQUMsQ0FBQyxLQUFLLFFBQUwsRUFBVDtBQUNBOzs7MkJBRVEsTyxFQUFRO0FBQ2hCO0FBQ0EsZ0JBQWEsT0FBYixDQUFxQixVQUFyQixFQUFpQyxPQUFqQztBQUNBOzs7NkJBRVM7QUFDVDtBQUNBLFVBQU8sYUFBYSxPQUFiLENBQXFCLFVBQXJCLENBQVA7QUFDQTs7OzJCQUVPO0FBQ1Asa0JBQWUsSUFBZixDQUFvQixTQUFwQjtBQUNBO0FBQ0EsZ0JBQWEsVUFBYixDQUF3QixVQUF4QjtBQUNBLGdCQUFhLFVBQWIsQ0FBd0IsU0FBeEI7QUFDQTtBQUVBOzs7Ozs7a0JBbkZtQixJOzs7OztBQ0hyQjs7QUFDQTs7OztBQUNBOzs7Ozs7QUFHQSxjQUFTLE1BQVQsQ0FDQyxrREFERCxFQUVHLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQUZIOzs7Ozs7Ozs7QUNMQTs7QUFDQTs7OztBQUNBOzs7Ozs7a0JBRWUsV0FBTSxXQUFOLENBQWtCO0FBQUE7O0FBQ2hDLGtCQUFnQiwyQkFBVTtBQUN6QixTQUFPO0FBQ04sYUFBVTtBQURKLEdBQVA7QUFHQSxFQUwrQjtBQU1oQyxvQkFBbUIsNkJBQVU7QUFBQTs7QUFFNUIsTUFBSSxXQUFXO0FBQ2Qsa0JBQWMsZUFBSyxnQkFBTCxFQURBO0FBRWQsT0FBRyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQW9CLEtBQXBCLENBQTBCLEVBRmY7QUFHZCxhQUFTO0FBSEssR0FBZjs7QUFNQSxJQUFFLElBQUYsQ0FBTyxpQkFBTyxPQUFQLEdBQWlCLDRCQUF4QixFQUFzRCxRQUF0RCxFQUNDLElBREQsQ0FDTSxVQUFDLElBQUQsRUFBUTtBQUNiLFNBQUssUUFBTCxDQUFjLEVBQUMsVUFBUyxJQUFWLEVBQWQ7QUFDQSxHQUhEO0FBS0EsRUFuQitCO0FBb0JoQyxTQUFRLGtCQUFXO0FBQ2xCLE1BQUcsS0FBSyxLQUFMLENBQVcsUUFBWCxLQUF3QixJQUEzQixFQUFpQyxPQUFPLHFDQUFQO0FBQ2pDLE1BQUksV0FBVyxLQUFLLEtBQUwsQ0FBVyxRQUExQjtBQUNBLE1BQUksT0FBTyxJQUFJLElBQUosQ0FBUyxLQUFLLEtBQUwsQ0FBVyxTQUFTLE9BQVQsQ0FBaUIsU0FBNUIsQ0FBVCxDQUFYO0FBQ0EsTUFBSSxnQkFBZ0IsS0FBSyxjQUFMLEVBQXBCO0FBQ0EsU0FDTztBQUFBO0FBQUEsS0FBSyxJQUFHLFVBQVIsRUFBbUIsV0FBVSxPQUE3QjtBQUNMO0FBQUE7QUFBQSxNQUFLLFdBQVUscUJBQWY7QUFDQztBQUFBO0FBQUEsT0FBSyxXQUFVLFVBQWY7QUFDRTtBQURGLEtBREQ7QUFJQztBQUFBO0FBQUEsT0FBSyxXQUFVLHFCQUFmO0FBQ0UsY0FBUyxHQUFULENBQWE7QUFEZjtBQUpELElBREs7QUFTTDtBQUFBO0FBQUEsTUFBSyxJQUFHLGFBQVIsRUFBc0IsV0FBVSxvQ0FBaEM7QUFDQztBQUFBO0FBQUEsT0FBSyxXQUFVLG9CQUFmO0FBQ0M7QUFBQTtBQUFBLFFBQU8sV0FBVSxxQkFBakI7QUFBdUM7QUFBQTtBQUFBO0FBQ3RDO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBSjtBQUFtQjtBQUFBO0FBQUE7QUFBSyxrQkFBUyxHQUFULENBQWEsS0FBYixDQUFtQixPQUFuQixDQUEyQix1QkFBM0IsRUFBb0QsVUFBcEQ7QUFBTDtBQUFuQixRQURzQztBQUV0QztBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQUo7QUFBcUI7QUFBQTtBQUFBO0FBQUssa0JBQVMsR0FBVCxDQUFhLEtBQWxCO0FBQXdCLDZDQUF4QjtBQUE4QixrQkFBUyxHQUFULENBQWEsSUFBM0M7QUFBQTtBQUFtRCxrQkFBUyxHQUFULENBQWEsS0FBaEU7QUFBQTtBQUF3RSxrQkFBUyxHQUFULENBQWE7QUFBckY7QUFBckIsUUFGc0M7QUFHdEM7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFKO0FBQW1CO0FBQUE7QUFBQTtBQUFLLGtCQUFTLEdBQVQsQ0FBYTtBQUFsQjtBQUFuQixRQUhzQztBQUl0QztBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQUo7QUFBcUI7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBLFlBQUcsTUFBTSxTQUFTLEdBQVQsQ0FBYSxHQUF0QjtBQUE0QixtQkFBUyxHQUFULENBQWE7QUFBekM7QUFBSjtBQUFyQjtBQUpzQztBQUF2QztBQURELEtBREQ7QUFVQztBQUFBO0FBQUEsT0FBSyxXQUFVLG9CQUFmO0FBQ0c7QUFBQTtBQUFBLFFBQUssV0FBVSxlQUFmO0FBQUE7QUFBOEMsZUFBUyxJQUFULENBQWM7QUFBNUQsTUFESDtBQUVDO0FBQUE7QUFBQSxRQUFLLFdBQVUsMkNBQWY7QUFDQztBQUFBO0FBQUEsU0FBRyxXQUFVLDJCQUFiO0FBQUE7QUFBQSxPQUREO0FBRUM7QUFBQTtBQUFBLFNBQUksV0FBVSxZQUFkO0FBQUE7QUFBNkIsZ0JBQVMsT0FBVCxDQUFpQjtBQUE5QztBQUZEO0FBRkQsS0FWRDtBQWlCQztBQUFBO0FBQUEsT0FBSyxXQUFVLHFEQUFmO0FBQ0M7QUFBQTtBQUFBLFFBQUssV0FBVSxlQUFmO0FBQUE7QUFBMkMsZUFBUyxJQUFULENBQWM7QUFBekQsTUFERDtBQUVDO0FBQUE7QUFBQSxRQUFLLFdBQVUsZUFBZjtBQUNFO0FBQUE7QUFBQSxTQUFNLFdBQVUsaUJBQWhCO0FBQUE7QUFBQSxPQURGO0FBRUU7QUFBQTtBQUFBLFNBQU0sV0FBVSxrQkFBaEI7QUFBQTtBQUFxQyxnQkFBUyxPQUFULENBQWlCO0FBQXREO0FBRkY7QUFGRDtBQWpCRCxJQVRLO0FBa0NMO0FBQUE7QUFBQSxNQUFPLFdBQVUsT0FBakI7QUFDQztBQUFBO0FBQUE7QUFBTztBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQUo7QUFBaUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFqQjtBQUFrQztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQWxDO0FBQW9EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBcEQ7QUFBUCxLQUREO0FBRUM7QUFBQTtBQUFBO0FBRUMsY0FBUyxPQUFULENBQWlCLEtBQWpCLENBQXVCLEdBQXZCLENBQTJCLFVBQUMsU0FBRCxFQUFZLENBQVosRUFBZ0I7QUFDMUMsYUFBTyxVQUFVLEdBQVYsQ0FBYyxVQUFDLElBQUQsRUFBTyxDQUFQLEVBQVc7QUFDL0IsV0FBRyxPQUFPLEtBQUssUUFBWixJQUF3QixXQUEzQixFQUF3QyxJQUFJLFdBQVcsRUFBZixDQUF4QyxLQUNLLElBQUksV0FBVyxNQUFNLEtBQUssUUFBMUI7QUFDTCxXQUFHLE9BQU8sS0FBSyxRQUFaLElBQXdCLFdBQTNCLEVBQXdDLElBQUksV0FBVyxFQUFmLENBQXhDLEtBQ0ssSUFBSSxXQUFXLEtBQUssUUFBcEI7QUFDTCxjQUNDO0FBQUE7QUFBQSxVQUFJLFdBQVcsSUFBSSxDQUFKLElBQVMsS0FBSyxDQUFkLEdBQWtCLGFBQWxCLEdBQWdDLEVBQS9DO0FBQ0M7QUFBQTtBQUFBO0FBQUssY0FBSztBQUFWLFNBREQ7QUFFQztBQUFBO0FBQUE7QUFBSztBQUFMLFNBRkQ7QUFHQztBQUFBO0FBQUE7QUFBSztBQUFMLFNBSEQ7QUFJQztBQUFBO0FBQUE7QUFBQTtBQUFNLGNBQUs7QUFBWDtBQUpELFFBREQ7QUFRQSxPQWJNLENBQVA7QUFjQSxNQWZEO0FBRkQ7QUFGRDtBQWxDSyxHQURQO0FBNERBO0FBckYrQixDQUFsQixDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG52YXIgZW52aXJvbm1lbnQgPSBcImRldmVsb3BtZW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0ZW52aXJvbm1lbnQ6IGVudmlyb25tZW50LFxyXG5cdGFwaUhvc3Q6IChmdW5jdGlvbigpe1xyXG5cdFx0aWYoZW52aXJvbm1lbnQgPT0gXCJwcm9kdWN0aW9uXCIpIHJldHVybiBcImh0dHA6Ly9hcGl0ZXN0LmZsZWN0aW5vLmNvbVwiO1xyXG5cdFx0ZWxzZSByZXR1cm4gXCJodHRwOi8vbG9jYWxob3N0OjMwMTBcIjtcclxuXHR9KCkpLFxyXG5cdHdlYkhvc3Q6IChmdW5jdGlvbigpe1xyXG5cdFx0aWYoZW52aXJvbm1lbnQgPT0gXCJwcm9kdWN0aW9uXCIpIHJldHVybiBcImh0dHA6Ly93ZWJ0ZXN0LmZsZWN0aW5vLmNvbVwiO1xyXG5cdFx0ZWxzZSByZXR1cm4gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcclxuXHR9KCkpLFxyXG5cdGdhdGV3YXlLZXk6IFwiQVVCNWpDa2RxM2I3a1Y5RFRUZGlRbGxPUnY1XCIsXHJcblx0YXV0aDA6e1xyXG5cdFx0Y2xpZW50SWQ6IFwiMFNNMGdyQlRvQ0pqV0dVYkJ0bFp1SGh5bENxMmRWdDNcIixcclxuXHRcdGRvbWFpbjogXCJmbGVjdGluby5hdXRoMC5jb21cIlxyXG5cdH1cclxufVxyXG4iLCJcclxudmFyICQgPSB3aW5kb3cuJDtcclxudmFyIGpRdWVyeSA9ICQ7XHJcbnZhciBSZWFjdCA9IHdpbmRvdy5SZWFjdDtcclxudmFyIFJlYWN0RE9NID0gd2luZG93LlJlYWN0RE9NO1xyXG52YXIgUm91dGVyID0gd2luZG93LlJlYWN0Um91dGVyO1xyXG52YXIgQXV0aDBMb2NrID0gd2luZG93LkF1dGgwTG9jaztcclxuZXhwb3J0IHsgJCwgalF1ZXJ5LCBSZWFjdCwgUmVhY3RET00sIFJlYWN0Um91dGVyLCBBdXRoMExvY2sgfVxyXG4iLCJpbXBvcnQgeyBBdXRoMExvY2ssIFJlYWN0Um91dGVyIH0gZnJvbSAnLi4vY2RuJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZy5qcydcclxudmFyIGJyb3dzZXJIaXN0b3J5ID0gUmVhY3RSb3V0ZXIuYnJvd3Nlckhpc3Rvcnk7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXIge1xyXG5cclxuXHRjb25zdHJ1Y3RvcihjbGllbnRJZCxkb21haW4saXNDbG9zYWJsZSkge1xyXG5cdFx0Ly8gQ29uZmlndXJlIEF1dGgwXHJcblx0XHR0aGlzLmxvY2sgPSBuZXcgQXV0aDBMb2NrKGNsaWVudElkLCBkb21haW4sIHtcclxuXHRcdFx0YWxsb3dlZENvbm5lY3Rpb25zOiBbJ2ZsZWN0aW5vLWRldicsICdnaXRodWInLCAnZ29vZ2xlLW9hdXRoMiddLFxyXG5cdFx0XHRzb2NpYWxCdXR0b25TdHlsZTogJ3NtYWxsJyxcclxuXHRcdFx0bGFuZ3VhZ2VEaWN0aW9uYXJ5OiB7XHJcblx0XHRcdFx0dGl0bGU6IFwiSGlcIlxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0aGVtZTp7XHJcblx0XHRcdFx0bG9nbzogJ2h0dHA6Ly9pbWcwNi5kZXZpYW50YXJ0Lm5ldC9jZTg2L2kvMjAxMy8wMjcvMS81L2JhdG1hbl9sb2dvX29ubHlfYnlfZGVhdGhvbmFidW4tZDVzd2YydS5wbmcnLFxyXG5cdFx0XHRcdHByaW1hcnlDb2xvcjogJyMzMTMyNEYnXHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0Ly8gQWRkIGNhbGxiYWNrIGZvciBsb2NrIGBhdXRoZW50aWNhdGVkYCBldmVudFxyXG5cdFx0dGhpcy5sb2NrLm9uKCdhdXRoZW50aWNhdGVkJywgdGhpcy5vbkF1dGhlbnRpY2F0aW9uLmJpbmQodGhpcykpXHJcblx0XHQvLyBiaW5kcyBsb2dpbiBmdW5jdGlvbnMgdG8ga2VlcCB0aGlzIGNvbnRleHRcclxuXHRcdHRoaXMubG9naW4gPSB0aGlzLmxvZ2luLmJpbmQodGhpcylcclxuXHR9XHJcblxyXG5cdG9uQXV0aGVudGljYXRpb24oYXV0aFJlc3VsdCl7XHJcblx0ICAgLy8gU2F2ZXMgdGhlIHVzZXIgdG9rZW5cclxuXHRcdHRoaXMuc2V0VG9rZW4oYXV0aFJlc3VsdC5pZFRva2VuKTtcclxuXHRcdHRoaXMubG9jay5nZXRQcm9maWxlKGF1dGhSZXN1bHQuaWRUb2tlbiwgKGVycm9yLCBwcm9maWxlKSA9PiB7XHJcblx0XHRcdGlmIChlcnJvcikge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdFcnJvciBsb2FkaW5nIHRoZSBQcm9maWxlJywgZXJyb3IpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zZXRQcm9maWxlKHByb2ZpbGUpO1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgcHJvZmlsZS5ncm91cCAhPSBcInVuZGVmaW5lZFwiICYmIHByb2ZpbGUuZ3JvdXAgPT0gXCJhZ2VudFwiKSBicm93c2VySGlzdG9yeS5wdXNoKFwiZGFzaFwiKTtcclxuXHRcdFx0XHRlbHNlIGJyb3dzZXJIaXN0b3J5LnB1c2goXCJkYXNoXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0c2V0UHJvZmlsZShwcm9maWxlKXtcclxuXHRcdC8vIFNhdmVzIHByb2ZpbGUgZGF0YSB0byBsb2NhbFN0b3JhZ2VcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9maWxlJywgSlNPTi5zdHJpbmdpZnkocHJvZmlsZSkpXHJcblx0fVxyXG5cclxuXHRnZXRQcm9maWxlKCl7XHJcblx0XHQvLyBSZXRyaWV2ZXMgdGhlIHByb2ZpbGUgZGF0YSBmcm9tIGxvY2FsU3RvcmFnZVxyXG5cdFx0Y29uc3QgcHJvZmlsZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9maWxlJylcclxuXHRcdHJldHVybiBwcm9maWxlID8gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UucHJvZmlsZSkgOiB7fVxyXG5cdH1cclxuXHJcblx0Z2V0U2VjdXJlUHJvZmlsZSgpe1xyXG5cdFx0cmV0dXJuICQuYWpheCh7XHJcblx0XHRcdHVybDogY29uZmlnLmFwaUhvc3QgKyBcIi91c2VyXCIsXHJcblx0XHRcdHR5cGU6IFwiZ2V0XCIsXHJcblx0XHRcdGhlYWRlcnM6IHtcclxuXHRcdFx0XHRBdXRob3JpemF0aW9uOiBcIkJlYXJlciBcIiArIHRoaXMuZ2V0VG9rZW4oKVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGxvZ2luKCkge1xyXG5cdFx0Ly8gQ2FsbCB0aGUgc2hvdyBtZXRob2QgdG8gZGlzcGxheSB0aGUgd2lkZ2V0LlxyXG5cdFx0dGhpcy5sb2NrLnNob3coKVxyXG5cdH1cclxuXHJcblx0aXNMb2dnZWRJbigpe1xyXG5cdFx0Ly8gQ2hlY2tzIGlmIHRoZXJlIGlzIGEgc2F2ZWQgdG9rZW4gYW5kIGl0J3Mgc3RpbGwgdmFsaWRcclxuXHRcdHJldHVybiAhIXRoaXMuZ2V0VG9rZW4oKVxyXG5cdH1cclxuXHJcblx0c2V0VG9rZW4oaWRUb2tlbil7XHJcblx0XHQvLyBTYXZlcyB1c2VyIHRva2VuIHRvIGxvY2FsU3RvcmFnZVxyXG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lkX3Rva2VuJywgaWRUb2tlbilcclxuXHR9XHJcblxyXG5cdGdldFRva2VuKCl7XHJcblx0XHQvLyBSZXRyaWV2ZXMgdGhlIHVzZXIgdG9rZW4gZnJvbSBsb2NhbFN0b3JhZ2VcclxuXHRcdHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaWRfdG9rZW4nKVxyXG5cdH1cclxuXHJcblx0bG9nb3V0KCl7XHJcblx0XHRicm93c2VySGlzdG9yeS5wdXNoKCdsYW5kaW5nJyk7XHJcblx0XHQvLyBDbGVhciB1c2VyIHRva2VuIGFuZCBwcm9maWxlIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcclxuXHRcdGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdpZF90b2tlbicpO1xyXG5cdFx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Byb2ZpbGUnKTtcclxuXHRcdHJldHVybjtcclxuXHJcblx0fVxyXG59XHJcbiIsImltcG9ydCB7IFJlYWN0RE9NLCBSZWFjdCB9IGZyb20gJy4vY2RuJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcclxuaW1wb3J0IEFjdGl2aXR5IGZyb20gJy4vdmlld3MvYWN0aXZpdHknXHJcblxyXG5cclxuUmVhY3RET00ucmVuZGVyKChcclxuXHQ8QWN0aXZpdHkvPlxyXG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi9jb25maWcuanMnXHJcbmltcG9ydCBVc2VyIGZyb20gJy4uL2NsYXNzZXMvVXNlci5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGFjdGl2aXR5OiBudWxsXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0dmFyIHBvc3REYXRhID0ge1xyXG5cdFx0XHRhdXRob3JpemF0aW9uOlVzZXIuZ2V0QXV0aG9yaXphdGlvbigpLFxyXG5cdFx0XHRpZDp0aGlzLnByb3BzLmxvY2F0aW9uLnF1ZXJ5LmlkLFxyXG5cdFx0XHRhY3Rpdml0eTp7fVxyXG5cdFx0fVxyXG5cclxuXHRcdCQucG9zdChjb25maWcuYXBpSG9zdCArIFwiL2FjdGl2aXR5L3JlY2VpcHQvcmV0cmlldmVcIiwgcG9zdERhdGEpXHJcblx0XHQudGhlbigoZGF0YSk9PntcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7YWN0aXZpdHk6ZGF0YX0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdGlmKHRoaXMuc3RhdGUuYWN0aXZpdHkgPT09IG51bGwpIHJldHVybig8ZGl2PjwvZGl2Pik7XHJcblx0XHR2YXIgYWN0aXZpdHkgPSB0aGlzLnN0YXRlLmFjdGl2aXR5O1xyXG5cdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKGFjdGl2aXR5LlJlY2VpcHQuY3JlYXRlZEF0KSk7XHJcblx0XHR2YXIgZm9ybWF0dGVkRGF0ZSA9IGRhdGUudG9Mb2NhbGVTdHJpbmcoKTtcclxuXHRcdHJldHVybiAoXHJcbiAgICAgICAgIDxkaXYgaWQ9XCJhY3Rpdml0eVwiIGNsYXNzTmFtZT1cInZpZXdzXCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgYWN0aXZpdHktaGVhZGVyXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdHtmb3JtYXR0ZWREYXRlfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IHRleHQtcmlnaHRcIj5cclxuXHRcdFx0XHRcdFx0e2FjdGl2aXR5LktleS5uYW1lfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBpZD1cInJlY2VpcHRJbmZvXCIgY2xhc3NOYW1lPVwicm93IG1hcmdpbi10b3AtMTUgbWFyZ2luLWJvdHRvbS0xNVwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgY29sLXNtLTdcIj5cclxuXHRcdFx0XHRcdFx0PHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIG1hcmdpbi10b3AtMTBcIj48dGJvZHk+XHJcblx0XHRcdFx0XHRcdFx0PHRyPjx0ZD5QaG9uZTo8L3RkPjx0ZD57YWN0aXZpdHkuS2V5LnBob25lLnJlcGxhY2UoLyhcXGR7M30pKFxcZHszfSkoXFxkezR9KS8sIFwiJDEtJDItJDNcIil9PC90ZD48L3RyPlxyXG5cdFx0XHRcdFx0XHRcdDx0cj48dGQ+QWRkcmVzczo8L3RkPjx0ZD57YWN0aXZpdHkuS2V5LmxpbmUxfTxici8+e2FjdGl2aXR5LktleS5jaXR5fSwge2FjdGl2aXR5LktleS5zdGF0ZX0ge2FjdGl2aXR5LktleS56aXB9PC90ZD48L3RyPlxyXG5cdFx0XHRcdFx0XHRcdDx0cj48dGQ+RW1haWw6PC90ZD48dGQ+e2FjdGl2aXR5LktleS5lbWFpbH08L3RkPjwvdHI+XHJcblx0XHRcdFx0XHRcdFx0PHRyPjx0ZD5XZWJzaXRlOjwvdGQ+PHRkPjxhIGhyZWY9e2FjdGl2aXR5LktleS51cmx9PnthY3Rpdml0eS5LZXkudXJsfTwvYT48L3RkPjwvdHI+XHJcblxyXG5cdFx0XHRcdFx0XHQ8L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuLXhzIGNvbC1zbS01XCI+XHJcblx0XHRcdFx0XHQgICA8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi10b3AtMTBcIj5DaGFyZ2VkIHRvIENDLXthY3Rpdml0eS5MaW5rLmxhc3RGb3VyfTwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNhcmQgY2FyZC1ibG9jayBtYXJnaW4tdG9wLTE1IGFsaWduLXJpZ2h0XCI+XHJcblx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwiY2FyZC10ZXh0IGNvbG9yLXNlY29uZGFyeVwiPlRvdGFsPC9wPlxyXG5cdFx0XHRcdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJjYXJkLXRpdGxlXCI+JHthY3Rpdml0eS5SZWNlaXB0LnRvdGFsfTwvaDQ+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBoaWRkZW4tc20gaGlkZGVuLW1kIGhpZGRlbi1sZyB0ZXh0LWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi10b3AtMTBcIj5DaGFyZ2VkIENDLXthY3Rpdml0eS5MaW5rLmxhc3RGb3VyfTwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi10b3AtMTBcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNvbG9yLXNlY29uZGFyeVwiPlRvdGFsOiA8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJib2xkIGFsaWduLXJpZ2h0XCI+JHthY3Rpdml0eS5SZWNlaXB0LnRvdGFsfTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8dGFibGUgY2xhc3NOYW1lPVwidGFibGVcIj5cclxuXHRcdFx0XHRcdDx0aGVhZD48dHI+PHRoPkl0ZW08L3RoPjx0aD5RdWFudGl0eTwvdGg+PHRoPlVuaXQgQ29zdDwvdGg+PHRoPlRvdGFsPC90aD48L3RyPjwvdGhlYWQ+XHJcblx0XHRcdFx0XHQ8dGJvZHk+XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdGFjdGl2aXR5LlJlY2VpcHQuaXRlbXMubWFwKChpdGVtR3JvdXAsIGkpPT57XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGl0ZW1Hcm91cC5tYXAoKGl0ZW0sIGopPT57XHJcblx0XHRcdFx0XHRcdFx0XHRpZih0eXBlb2YgaXRlbS51bml0Q29zdCA9PSBcInVuZGVmaW5lZFwiKSB2YXIgdW5pdENvc3QgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB2YXIgdW5pdENvc3QgPSBcIiRcIiArIGl0ZW0udW5pdENvc3Q7XHJcblx0XHRcdFx0XHRcdFx0XHRpZih0eXBlb2YgaXRlbS5xdWFudGl0eSA9PSBcInVuZGVmaW5lZFwiKSB2YXIgcXVhbnRpdHkgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB2YXIgcXVhbnRpdHkgPSBpdGVtLnF1YW50aXR5O1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdFx0XHRcdFx0PHRyIGNsYXNzTmFtZT17aSA+IDAgJiYgaiA9PSAwID8gXCIgbmV3U2VjdGlvblwiOlwiXCJ9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDx0ZD57aXRlbS5kZXNjcmlwdGlvbn08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDx0ZD57cXVhbnRpdHl9PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGQ+e3VuaXRDb3N0fTwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PHRkPiR7aXRlbS50b3RhbH08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3RyPlxyXG5cdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdDwvdGJvZHk+XHJcblx0XHRcdFx0PC90YWJsZT5cclxuICAgICAgICAgPC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcbiJdfQ==
