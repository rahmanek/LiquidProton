(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var environment = "production";
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require("../cdn");

exports.default = _cdn.React.createClass({
	displayName: "modal",

	render: function render() {
		return _cdn.React.createElement(
			"div",
			{ id: "modal" },
			_cdn.React.createElement(
				"div",
				{ className: "modal fade", id: this.props.name },
				_cdn.React.createElement(
					"div",
					{ className: "vertical-alignment-helper" },
					_cdn.React.createElement(
						"div",
						{ className: "modal-dialog vertical-align-center", role: "document" },
						_cdn.React.createElement(
							"div",
							{ className: "container" },
							_cdn.React.createElement(
								"div",
								{ className: "modal-content" },
								_cdn.React.createElement(
									"div",
									{ className: "row" },
									_cdn.React.createElement(
										"div",
										{ className: "col-xs-12" },
										this.props.children
									)
								)
							)
						)
					)
				)
			)
		);
	}
});

},{"../cdn":2}],5:[function(require,module,exports){
'use strict';

var _cdn = require('./cdn');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _modal = require('./components/modal');

var _modal2 = _interopRequireDefault(_modal);

var _Utilities = require('./classes/Utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Landing = _cdn.React.createClass({
	displayName: 'Landing',

	getInitialState: function getInitialState() {
		return {
			transaction: null,
			showEmail: false,
			showPhone: false,
			navbar: false,
			share: false
		};
	},
	componentWillMount: function componentWillMount() {
		var _this = this;

		$.get(_config2.default.apiHost + "/v1/transaction/" + window.location.pathname.split("/")[2]).then(function (data) {
			data.Items.sort(function (a, b) {
				if (a.sequence > b.sequence) return 1;else return -1;
			});
			_this.setState({ transaction: data }, function () {
				JsBarcode("#code128", "1234567890123", { format: "itf14" });
			});
		});
	},
	sendTransaction: function sendTransaction() {
		console.log("Sent!");
	},
	sendCoupon: function sendCoupon() {
		jQuery('#couponModal').modal('show');
	},
	returnPolicy: function returnPolicy() {
		jQuery('#returnModal').modal('show');
	},
	toggleCollapse: function toggleCollapse(target) {
		var newState = {};
		newState[target] = !document.getElementById(target).classList.contains("in");
		this.setState(newState);
		$("#" + target).collapse('toggle');
	},
	render: function render() {
		var _faIcons,
		    _this2 = this;

		var transaction = this.state.transaction;
		if (transaction === null) return _cdn.React.createElement(
			'div',
			null,
			'Loading...'
		);
		var date = new Date(Date.parse(transaction.transactedAt));
		// Remove seconds from locale date string
		var formattedDate = date.toLocaleString().replace(/([:][1-9]{2}[" "])/, " ");
		var contactItems = [];
		var faIcons = (_faIcons = {
			facebook: "facebook",
			phone: "phone",
			web: "globe",
			googlePlus: "google-plus"
		}, _defineProperty(_faIcons, 'phone', "phone"), _defineProperty(_faIcons, 'email', "envelope"), _defineProperty(_faIcons, 'instagram', "instagram"), _defineProperty(_faIcons, 'pinterest', "pinterest-p"), _defineProperty(_faIcons, 'twitter', "twitter"), _faIcons);

		transaction.contact.map(function (contact, i) {
			var preValue = contact.value;
			if (contact.type == "email") contact.value = "mailto:" + preValue;
			if (contact.type == "phone") contact.value = "tel:" + preValue;
			contactItems.push(_cdn.React.createElement(
				'a',
				{ key: i, href: contact.value, className: 'color-white' },
				_cdn.React.createElement(
					'li',
					{ className: 'list-group-item bg-inverse' },
					contact.description,
					_cdn.React.createElement('i', { className: "vertical-align-middle float-right fa fa-fw line-height-inherit fa-" + faIcons[contact.type] }),
					contact.type == "phone" || contact.type == "email" ? _cdn.React.createElement(
						'div',
						{ className: 'text-muted nowrap' },
						preValue
					) : _cdn.React.createElement('div', null)
				)
			));
		});

		return _cdn.React.createElement(
			'div',
			{ id: 'landing', className: 'container' },
			_cdn.React.createElement(
				'div',
				{ className: 'collapse menu overflow-scroll-y position-fixed', id: 'navbar' },
				_cdn.React.createElement(
					'div',
					{ className: 'height-100vh bg-inverse text-white' },
					_cdn.React.createElement(
						'li',
						{ className: 'list-group-item bg-inverse menuHead' },
						'Connect with ',
						transaction.Key.name
					),
					_cdn.React.createElement(
						'ul',
						{ className: 'list-group bg-inverse' },
						contactItems.map(function (item) {
							return item;
						})
					)
				)
			),
			_cdn.React.createElement(
				'div',
				{ className: 'row' },
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-12 margin-top-15' },
					_cdn.React.createElement(
						'div',
						{ className: 'col-xs-3 padding-left-0' },
						_cdn.React.createElement('img', { className: 'logo', src: '/assets/logos/dunk.jpg' })
					),
					_cdn.React.createElement(
						'div',
						{ className: 'col-xs-9 padding-left-0' },
						_cdn.React.createElement(
							'div',
							{ className: 'inline-block' },
							_cdn.React.createElement(
								'div',
								{ className: 'brand-title vertical-align' },
								transaction.Key.name
							),
							_cdn.React.createElement(
								'div',
								{ className: 'address' },
								transaction.address.line1,
								typeof transaction.address.line2 == "undefined" ? "" : " " + transaction.address.line2,
								', ',
								transaction.address.city,
								', ',
								transaction.address.state,
								' ',
								transaction.address.postalCode
							)
						)
					)
				)
			),
			_cdn.React.createElement(
				'div',
				{ className: 'row activity-header' },
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-8 date' },
					formattedDate
				),
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-4 total align-center' },
					_cdn.React.createElement(
						'div',
						{ className: 'col-xs-6', onClick: function onClick() {
								return _this2.toggleCollapse("share");
							} },
						this.state.share ? _cdn.React.createElement('i', { className: 'fa fa-share-alt color-black' }) : _cdn.React.createElement('i', { className: 'fa fa-share-alt' })
					),
					_cdn.React.createElement(
						'div',
						{ className: 'col-xs-6 ', onClick: function onClick() {
								return _this2.toggleCollapse("navbar");
							} },
						this.state.navbar ? _cdn.React.createElement('i', { className: 'fa fa-bars color-black' }) : _cdn.React.createElement('i', { className: 'fa fa-bars' })
					)
				)
			),
			_cdn.React.createElement(
				'div',
				{ className: 'row promo1 vertical-align' },
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-6' },
					_cdn.React.createElement(
						'a',
						{ href: 'javascript:', onClick: this.returnPolicy },
						'Return Policy'
					)
				),
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-6 price align-right padding-right-0' },
					'$',
					(transaction.total / 100).toFixed(2)
				)
			),
			_cdn.React.createElement(
				'div',
				{ id: 'share', className: 'bg-inverse row collapse text-white padding-top-10 padding-bottom-5 margin-bottom-15' },
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-12 align-center margin-bottom-15' },
					'Share your transaction'
				),
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-12' },
					_cdn.React.createElement(
						'div',
						{ className: 'col-xs-6 align-center' },
						_cdn.React.createElement('i', { className: 'fa fa-fw fa-envelope font-size-42', onClick: function onClick() {
								return _this2.setState({ showText: false, showEmail: true });
							} }),
						_cdn.React.createElement('br', null),
						'Email'
					),
					_cdn.React.createElement(
						'div',
						{ className: 'col-xs-6 align-center' },
						_cdn.React.createElement('i', { className: 'fa fa-fw fa-phone font-size-42', onClick: function onClick() {
								return _this2.setState({ showText: true, showEmail: false });
							} }),
						_cdn.React.createElement('br', null),
						'Text'
					)
				),
				this.state.showEmail || this.state.showText ? _cdn.React.createElement(
					'div',
					{ className: 'col-xs-12 margin-top-20 margin-bottom-10' },
					_cdn.React.createElement(
						'div',
						{ className: 'col-xs-8 offset-xs-1' },
						this.state.showEmail ? _cdn.React.createElement('input', { className: 'form-control', placeholder: 'Email Address' }) : _cdn.React.createElement('input', { className: 'form-control', placeholder: 'Phone Number' })
					),
					_cdn.React.createElement(
						'button',
						{ type: 'button', className: 'margin-top-5 col-xs-2 btn btn-info btn-sm', onClick: this.sendTransaction },
						'Send'
					)
				) : _cdn.React.createElement('div', { className: 'col-xs-12 margin-bottom-15' })
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
						_cdn.React.createElement('th', null),
						_cdn.React.createElement(
							'th',
							null,
							'Item'
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
					transaction.Items.map(function (item, i) {
						if (typeof item.unitPrice == "undefined") var unitPrice = "";else var unitPrice = "$" + item.unitPrice / 100;
						if (typeof item.quantity == "undefined") var quantity = "";else var quantity = item.quantity;
						var groupStart = false;
						transaction.itemGroups.map(function (group) {
							if (group.start == item.sequence) groupStart = true;
						});
						return _cdn.React.createElement(
							'tr',
							{ className: groupStart ? "newSection" : "", key: i },
							_cdn.React.createElement(
								'td',
								null,
								quantity
							),
							_cdn.React.createElement(
								'td',
								null,
								item.description
							),
							_cdn.React.createElement(
								'td',
								null,
								'$',
								(item.total / 100).toFixed(2)
							)
						);
					})
				)
			),
			_cdn.React.createElement(
				'div',
				{ className: 'row promo1 align-center' },
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-12' },
					'Get a free donut on your next visit! ',
					_cdn.React.createElement('br', null),
					_cdn.React.createElement(
						'a',
						{ className: 'promo', href: 'javascript:' },
						_cdn.React.createElement(
							'button',
							{ type: 'button', className: 'btn btn-sm btn-secondary margin-top-10', onClick: this.sendCoupon, 'data-dismiss': 'modal' },
							'Claim Here'
						)
					)
				)
			),
			_cdn.React.createElement(
				'div',
				{ className: 'row' },
				_cdn.React.createElement('svg', { className: 'margin-auto display-block', id: 'code128' })
			),
			_cdn.React.createElement(
				_modal2.default,
				{ name: 'returnModal' },
				_cdn.React.createElement(
					'div',
					null,
					_cdn.React.createElement(
						'div',
						{ className: 'align-center' },
						_cdn.React.createElement(
							'div',
							{ className: 'bold padding-bottom-20' },
							'Return Policy'
						),
						_cdn.React.createElement(
							'div',
							null,
							'Return stuff in 90 days and you good.'
						)
					),
					_cdn.React.createElement(
						'div',
						{ className: 'row padding-top-20' },
						_cdn.React.createElement(
							'button',
							{ type: 'button', className: 'col-xs-6 offset-xs-3 btn btn-app-primary', onClick: this.clearForm, 'data-dismiss': 'modal' },
							'Go Back'
						)
					)
				)
			),
			_cdn.React.createElement(
				_modal2.default,
				{ name: 'couponModal' },
				_cdn.React.createElement(
					'div',
					null,
					_cdn.React.createElement(
						'div',
						{ className: 'align-center' },
						_cdn.React.createElement(
							'div',
							{ className: 'bold padding-bottom-20' },
							'Your coupon is on its way!'
						),
						_cdn.React.createElement(
							'div',
							null,
							'You should receive your coupon by text soon!'
						)
					),
					_cdn.React.createElement(
						'div',
						{ className: 'row padding-top-20' },
						_cdn.React.createElement(
							'button',
							{ type: 'button', className: 'col-xs-6 offset-xs-3 btn btn-app-primary', onClick: this.clearForm, 'data-dismiss': 'modal' },
							'Go Back'
						)
					)
				)
			)
		);
	}
});

_cdn.ReactDOM.render(_cdn.React.createElement(
	'div',
	null,
	_cdn.React.createElement(Landing, null)
), document.getElementById('app'));

},{"../config":1,"./cdn":2,"./classes/Utilities":3,"./components/modal":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGNkbi5qcyIsInNyY1xcY2xhc3Nlc1xcVXRpbGl0aWVzLmpzIiwic3JjXFxjb21wb25lbnRzXFxtb2RhbC5qcyIsInNyY1xcbGFuZGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBLElBQUksY0FBYyxZQUFsQjtrQkFDZTtBQUNkLGNBQWEsV0FEQztBQUVkLFVBQVUsWUFBVTtBQUNuQixNQUFHLGVBQWUsWUFBbEIsRUFBZ0MsT0FBTyw2QkFBUCxDQUFoQyxLQUNLLE9BQU8sdUJBQVA7QUFDTCxFQUhTLEVBRkk7QUFNZCxVQUFVLFlBQVU7QUFDbkIsTUFBRyxlQUFlLFlBQWxCLEVBQWdDLE9BQU8sNkJBQVAsQ0FBaEMsS0FDSyxPQUFPLHVCQUFQO0FBQ0wsRUFIUyxFQU5JO0FBVWQsUUFBTTtBQUNMLFlBQVUsa0NBREw7QUFFTCxVQUFRO0FBRkg7QUFWUSxDOzs7Ozs7Ozs7QUNEZixJQUFJLElBQUksT0FBTyxDQUFmO0FBQ0EsSUFBSSxTQUFTLENBQWI7QUFDQSxJQUFJLFFBQVEsT0FBTyxLQUFuQjtBQUNBLElBQUksV0FBVyxPQUFPLFFBQXRCO0FBQ0EsSUFBSSxjQUFjLE9BQU8sV0FBekI7QUFDQSxJQUFJLFlBQVksT0FBTyxTQUF2QjtBQUNBLElBQUksU0FBUyxPQUFPLENBQXBCO1FBQ1MsQyxHQUFBLEM7UUFBRyxNLEdBQUEsTTtRQUFRLEssR0FBQSxLO1FBQU8sUSxHQUFBLFE7UUFBVSxXLEdBQUEsVztRQUFhLFMsR0FBQSxTO1FBQVcsTSxHQUFBLE07Ozs7Ozs7Ozs7QUNON0QsSUFBSSxtQkFBbUIsU0FBbkIsZ0JBQW1CLENBQVMsUUFBVCxFQUFtQjtBQUN6QyxLQUFJLFFBQVEsT0FBTyxRQUFQLENBQWdCLE1BQWhCLENBQXVCLFNBQXZCLENBQWlDLENBQWpDLENBQVo7QUFDQSxLQUFJLFVBQVUsTUFBTSxLQUFO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dCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG52YXIgZW52aXJvbm1lbnQgPSBcInByb2R1Y3Rpb25cIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGVudmlyb25tZW50OiBlbnZpcm9ubWVudCxcclxuXHRhcGlIb3N0OiAoZnVuY3Rpb24oKXtcclxuXHRcdGlmKGVudmlyb25tZW50ID09IFwicHJvZHVjdGlvblwiKSByZXR1cm4gXCJodHRwOi8vYXBpdGVzdC5mbGVjdGluby5jb21cIjtcclxuXHRcdGVsc2UgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDozMDEwXCI7XHJcblx0fSgpKSxcclxuXHR3ZWJIb3N0OiAoZnVuY3Rpb24oKXtcclxuXHRcdGlmKGVudmlyb25tZW50ID09IFwicHJvZHVjdGlvblwiKSByZXR1cm4gXCJodHRwOi8vd2VidGVzdC5mbGVjdGluby5jb21cIjtcclxuXHRcdGVsc2UgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcblx0fSgpKSxcclxuXHRhdXRoMDp7XHJcblx0XHRjbGllbnRJZDogXCIwU00wZ3JCVG9DSmpXR1ViQnRsWnVIaHlsQ3EyZFZ0M1wiLFxyXG5cdFx0ZG9tYWluOiBcImZsZWN0aW5vLmF1dGgwLmNvbVwiXHJcblx0fVxyXG59XHJcbiIsIlxyXG52YXIgJCA9IHdpbmRvdy4kO1xyXG52YXIgalF1ZXJ5ID0gJDtcclxudmFyIFJlYWN0ID0gd2luZG93LlJlYWN0O1xyXG52YXIgUmVhY3RET00gPSB3aW5kb3cuUmVhY3RET007XHJcbnZhciBSZWFjdFJvdXRlciA9IHdpbmRvdy5SZWFjdFJvdXRlcjtcclxudmFyIEF1dGgwTG9jayA9IHdpbmRvdy5BdXRoMExvY2s7XHJcbnZhciBMb2Rhc2ggPSB3aW5kb3cuXztcclxuZXhwb3J0IHsgJCwgalF1ZXJ5LCBSZWFjdCwgUmVhY3RET00sIFJlYWN0Um91dGVyLCBBdXRoMExvY2ssIExvZGFzaCB9XHJcbiIsIlxyXG5cclxudmFyIGdldFF1ZXJ5VmFyaWFibGUgPSBmdW5jdGlvbih2YXJpYWJsZSkge1xyXG5cdHZhciBxdWVyeSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpO1xyXG5cdHZhciBwcmVWYXJzID0gcXVlcnkuc3BsaXQoJy8nKTtcclxuXHR2YXIgdmFycyA9IHByZVZhcnNbMF0uc3BsaXQoJyYnKTtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdCgnPScpO1xyXG5cdFx0aWYgKGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKSA9PSB2YXJpYWJsZSkge1xyXG5cdFx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjb25zb2xlLmxvZygnUXVlcnkgdmFyaWFibGUgJXMgbm90IGZvdW5kJywgdmFyaWFibGUpO1xyXG59XHJcblxyXG52YXIgaXNWYWxpZCA9IHtcclxuXHRlbWFpbDogZnVuY3Rpb24oZW1haWwpIHtcclxuXHRcdHZhciByZSA9IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xyXG5cdFx0cmV0dXJuIHJlLnRlc3QoZW1haWwpO1xyXG5cdH0sXHJcblx0cGhvbmU6IGZ1bmN0aW9uKHBob25lKSB7XHJcblx0XHR2YXIgc3RyaXBQaG9uZSA9IHBob25lLnJlcGxhY2UoL1xcRC9nLCcnKTtcclxuXHRcdGlmIChzdHJpcFBob25lLmxlbmd0aCA+PSAxMCkgcmV0dXJuIHRydWU7XHJcblx0XHRlbHNlIGZhbHNlO1xyXG5cdH1cclxufVxyXG5cclxudmFyIGZvcm1hdFBob25lMTAgPSBmdW5jdGlvbihwaG9uZSl7XHJcblx0dmFyIHN0cmlwUGhvbmUgPSBwaG9uZS5yZXBsYWNlKC9cXEQvZywnJyk7XHJcblx0dmFyIGRhc2ggPSBcIlwiO1xyXG5cdHZhciBvcGVuUGFyZW4gPSBcIlwiO1xyXG5cdHZhciBjbG9zZWRQYXJlbiA9IFwiXCI7XHJcblx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID4gMCkgb3BlblBhcmVuID0gXCIoXCI7XHJcblx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID4gMykgY2xvc2VkUGFyZW4gPSBcIilcIjtcclxuXHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPiA2KSBkYXNoID0gXCItXCI7XHJcblx0dmFyIGZvcm1hdHRlZFBob25lID0gb3BlblBhcmVuICsgc3RyaXBQaG9uZS5zdWJzdHJpbmcoMCwzKSArIGNsb3NlZFBhcmVuICsgc3RyaXBQaG9uZS5zdWJzdHJpbmcoMyw2KSArIGRhc2ggKyBzdHJpcFBob25lLnN1YnN0cmluZyg2LDEwKTtcclxuXHRyZXR1cm4gZm9ybWF0dGVkUGhvbmU7XHJcbn1cclxuXHJcbnZhciBnZXRUaW1lem9uZU9mZnNldCA9IGZ1bmN0aW9uKCl7XHJcblx0ZnVuY3Rpb24gcGFkKG51bWJlciwgbGVuZ3RoKXtcclxuXHRcdCB2YXIgc3RyID0gXCJcIiArIG51bWJlclxyXG5cdFx0IHdoaWxlIChzdHIubGVuZ3RoIDwgbGVuZ3RoKSB7XHJcblx0XHRcdCAgc3RyID0gJzAnK3N0clxyXG5cdFx0IH1cclxuXHRcdCByZXR1cm4gc3RyXHJcblx0fVxyXG5cdHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuXHR2YXIgb2Zmc2V0ID0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xyXG5cdHJldHVybiAoKG9mZnNldDwwPyAnKyc6Jy0nKSArIHBhZChwYXJzZUludChNYXRoLmFicyhvZmZzZXQvNjApKSwgMikrIHBhZChNYXRoLmFicyhvZmZzZXQlNjApLCAyKSk7XHJcbn1cclxuXHJcbnZhciBjcmVhdGVUaW1lRGF0ZSA9IGZ1bmN0aW9uKGRhdGUsIHRpbWUpe1xyXG5cdHZhciBtaWxlc3RvbmVEYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcblx0dmFyIHN0clNwbGl0ID0gdGltZS5zcGxpdCgnOicpO1xyXG5cdHZhciBob3VyID0gcGFyc2VJbnQoc3RyU3BsaXRbMF0pO1xyXG5cdHZhciBtaW51dGUgPSBwYXJzZUludChzdHJTcGxpdFsxXS5zdWJzdHJpbmcoMCwyKSk7XHJcblx0dmFyIHNldCA9IHN0clNwbGl0WzFdLnN1YnN0cmluZygyLDQpO1xyXG5cdGlmIChob3VyID09PSAxMikge1xyXG5cdFx0aWYgKHNldCA9PT0gXCJhbVwiKSBob3VyID0gMDtcclxuXHRcdGVsc2UgaG91ciA9IDEyO1xyXG5cdH0gZWxzZSBpZiAoc2V0ID09PSBcInBtXCIpIGhvdXIgKz0gMTI7XHJcblx0bWlsZXN0b25lRGF0ZS5zZXRIb3Vycyhob3VyKTtcclxuXHRtaWxlc3RvbmVEYXRlLnNldE1pbnV0ZXMobWludXRlKTtcclxuXHRtaWxlc3RvbmVEYXRlLnNldE1pbnV0ZXMobWlsZXN0b25lRGF0ZS5nZXRNaW51dGVzKCkgLSAgbWlsZXN0b25lRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpKTtcclxuXHRyZXR1cm4gbWlsZXN0b25lRGF0ZS50b0lTT1N0cmluZygpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgZ2V0UXVlcnlWYXJpYWJsZSwgaXNWYWxpZCwgZm9ybWF0UGhvbmUxMCwgZ2V0VGltZXpvbmVPZmZzZXQsIGNyZWF0ZVRpbWVEYXRlIH1cclxuIiwiaW1wb3J0IHsgUmVhY3QgfSBmcm9tICcuLi9jZG4nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJtb2RhbFwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZVwiIGlkPXt0aGlzLnByb3BzLm5hbWV9PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ2ZXJ0aWNhbC1hbGlnbm1lbnQtaGVscGVyXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nIHZlcnRpY2FsLWFsaWduLWNlbnRlclwiIHJvbGU9XCJkb2N1bWVudFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMlwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxufSk7XHJcbiIsImltcG9ydCB7IFJlYWN0RE9NLCBSZWFjdCB9IGZyb20gJy4vY2RuJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcclxuaW1wb3J0IE1vZGFsIGZyb20gJy4vY29tcG9uZW50cy9tb2RhbCdcclxuaW1wb3J0IHsgZ2V0UXVlcnlWYXJpYWJsZSB9IGZyb20gJy4vY2xhc3Nlcy9VdGlsaXRpZXMnXHJcblxyXG52YXIgTGFuZGluZyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHRyYW5zYWN0aW9uOiBudWxsLFxyXG5cdFx0XHRzaG93RW1haWw6IGZhbHNlLFxyXG5cdFx0XHRzaG93UGhvbmU6IGZhbHNlLFxyXG5cdFx0XHRuYXZiYXI6IGZhbHNlLFxyXG5cdFx0XHRzaGFyZTogZmFsc2VcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCl7XHJcblx0XHQkLmdldChjb25maWcuYXBpSG9zdCArIFwiL3YxL3RyYW5zYWN0aW9uL1wiICsgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KFwiL1wiKVsyXSlcclxuXHRcdC50aGVuKChkYXRhKT0+e1xyXG5cdFx0XHRkYXRhLkl0ZW1zLnNvcnQoZnVuY3Rpb24oYSxiKXtcclxuXHRcdFx0XHRpZihhLnNlcXVlbmNlID4gYi5zZXF1ZW5jZSkgcmV0dXJuIDE7XHJcblx0XHRcdFx0ZWxzZSByZXR1cm4gLTE7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHt0cmFuc2FjdGlvbjpkYXRhfSxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdEpzQmFyY29kZShcIiNjb2RlMTI4XCIsIFwiMTIzNDU2Nzg5MDEyM1wiLCB7Zm9ybWF0OiBcIml0ZjE0XCJ9KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHNlbmRUcmFuc2FjdGlvbjogZnVuY3Rpb24oKXtcclxuXHRcdGNvbnNvbGUubG9nKFwiU2VudCFcIilcclxuXHR9LFxyXG5cdHNlbmRDb3Vwb246IGZ1bmN0aW9uKCl7XHJcblx0XHRqUXVlcnkoJyNjb3Vwb25Nb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcblx0fSxcclxuXHRyZXR1cm5Qb2xpY3k6IGZ1bmN0aW9uKCl7XHJcblx0XHRqUXVlcnkoJyNyZXR1cm5Nb2RhbCcpLm1vZGFsKCdzaG93Jyk7XHJcblx0fSxcclxuXHR0b2dnbGVDb2xsYXBzZTogZnVuY3Rpb24odGFyZ2V0KXtcclxuXHRcdHZhciBuZXdTdGF0ZSA9IHt9O1xyXG5cdFx0bmV3U3RhdGVbdGFyZ2V0XSA9ICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXQpLmNsYXNzTGlzdC5jb250YWlucyhcImluXCIpO1xyXG5cdFx0dGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcblx0XHQkKFwiI1wiICsgdGFyZ2V0KS5jb2xsYXBzZSgndG9nZ2xlJyk7XHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0dmFyIHRyYW5zYWN0aW9uID0gdGhpcy5zdGF0ZS50cmFuc2FjdGlvbjtcclxuXHRcdGlmKHRyYW5zYWN0aW9uID09PSBudWxsKSByZXR1cm4gKDxkaXY+TG9hZGluZy4uLjwvZGl2Pik7XHJcblx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2UodHJhbnNhY3Rpb24udHJhbnNhY3RlZEF0KSk7XHJcblx0XHQvLyBSZW1vdmUgc2Vjb25kcyBmcm9tIGxvY2FsZSBkYXRlIHN0cmluZ1xyXG5cdFx0dmFyIGZvcm1hdHRlZERhdGUgPSBkYXRlLnRvTG9jYWxlU3RyaW5nKCkucmVwbGFjZSgvKFs6XVsxLTldezJ9W1wiIFwiXSkvLCBcIiBcIik7XHJcblx0XHR2YXIgY29udGFjdEl0ZW1zID0gW107XHJcblx0XHR2YXIgZmFJY29ucyA9IHtcclxuXHRcdFx0ZmFjZWJvb2s6XCJmYWNlYm9va1wiLFxyXG5cdFx0XHRwaG9uZTogXCJwaG9uZVwiLFxyXG5cdFx0XHR3ZWI6IFwiZ2xvYmVcIixcclxuXHRcdFx0Z29vZ2xlUGx1czogXCJnb29nbGUtcGx1c1wiLFxyXG5cdFx0XHRwaG9uZTogXCJwaG9uZVwiLFxyXG5cdFx0XHRlbWFpbDogXCJlbnZlbG9wZVwiLFxyXG5cdFx0XHRpbnN0YWdyYW06IFwiaW5zdGFncmFtXCIsXHJcblx0XHRcdHBpbnRlcmVzdDogXCJwaW50ZXJlc3QtcFwiLFxyXG5cdFx0XHR0d2l0dGVyOiBcInR3aXR0ZXJcIlxyXG5cdFx0fVxyXG5cclxuXHRcdHRyYW5zYWN0aW9uLmNvbnRhY3QubWFwKGZ1bmN0aW9uKGNvbnRhY3QsaSl7XHJcblx0XHRcdHZhciBwcmVWYWx1ZSA9IGNvbnRhY3QudmFsdWU7XHJcblx0XHRcdGlmKGNvbnRhY3QudHlwZSA9PSBcImVtYWlsXCIpIGNvbnRhY3QudmFsdWUgPSBcIm1haWx0bzpcIiArIHByZVZhbHVlO1xyXG5cdFx0XHRpZihjb250YWN0LnR5cGUgPT0gXCJwaG9uZVwiKSBjb250YWN0LnZhbHVlID0gXCJ0ZWw6XCIgKyBwcmVWYWx1ZTtcclxuXHRcdFx0Y29udGFjdEl0ZW1zLnB1c2goXHJcblx0XHRcdFx0PGEga2V5PXtpfSBocmVmPXtjb250YWN0LnZhbHVlfSBjbGFzc05hbWU9XCJjb2xvci13aGl0ZVwiPlxyXG5cdFx0XHRcdFx0PGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSBiZy1pbnZlcnNlXCI+XHJcblx0XHRcdFx0XHRcdHtjb250YWN0LmRlc2NyaXB0aW9ufVxyXG5cdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9e1widmVydGljYWwtYWxpZ24tbWlkZGxlIGZsb2F0LXJpZ2h0IGZhIGZhLWZ3IGxpbmUtaGVpZ2h0LWluaGVyaXQgZmEtXCIgKyBmYUljb25zW2NvbnRhY3QudHlwZV19PjwvaT5cclxuXHRcdFx0XHRcdFx0eyhjb250YWN0LnR5cGUgPT0gXCJwaG9uZVwiIHx8IGNvbnRhY3QudHlwZSA9PSBcImVtYWlsXCIpPzxkaXYgY2xhc3NOYW1lPVwidGV4dC1tdXRlZCBub3dyYXBcIj57cHJlVmFsdWV9PC9kaXY+OjxkaXY+PC9kaXY+fVxyXG5cdFx0XHRcdFx0PC9saT5cclxuXHRcdFx0XHQ8L2E+XHJcblx0XHRcdCk7XHJcblx0XHR9KVxyXG5cclxuXHRcdHJldHVybiAoXHJcbiAgICAgICAgIDxkaXYgaWQ9XCJsYW5kaW5nXCIgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2xsYXBzZSBtZW51IG92ZXJmbG93LXNjcm9sbC15IHBvc2l0aW9uLWZpeGVkXCIgaWQ9XCJuYXZiYXJcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGVpZ2h0LTEwMHZoIGJnLWludmVyc2UgdGV4dC13aGl0ZVwiPlxyXG5cdFx0XHRcdFx0XHQ8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtIGJnLWludmVyc2UgbWVudUhlYWRcIj5Db25uZWN0IHdpdGgge3RyYW5zYWN0aW9uLktleS5uYW1lfTwvbGk+XHJcblx0XHRcdFx0XHRcdDx1bCBjbGFzc05hbWU9XCJsaXN0LWdyb3VwIGJnLWludmVyc2VcIj5cclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRjb250YWN0SXRlbXMubWFwKGZ1bmN0aW9uKGl0ZW0pe1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gaXRlbTtcclxuXHRcdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQ8L3VsPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIG1hcmdpbi10b3AtMTVcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMyBwYWRkaW5nLWxlZnQtMFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpbWcgY2xhc3NOYW1lPVwibG9nb1wiIHNyYz1cIi9hc3NldHMvbG9nb3MvZHVuay5qcGdcIi8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy05IHBhZGRpbmctbGVmdC0wXCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtYmxvY2tcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYnJhbmQtdGl0bGUgdmVydGljYWwtYWxpZ25cIj57dHJhbnNhY3Rpb24uS2V5Lm5hbWV9PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFkZHJlc3NcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0e3RyYW5zYWN0aW9uLmFkZHJlc3MubGluZTF9eyh0eXBlb2YgdHJhbnNhY3Rpb24uYWRkcmVzcy5saW5lMiA9PSBcInVuZGVmaW5lZFwiKT9cIlwiOlwiIFwiICsgdHJhbnNhY3Rpb24uYWRkcmVzcy5saW5lMn1cclxuXHRcdFx0XHRcdFx0XHRcdFx0LCB7dHJhbnNhY3Rpb24uYWRkcmVzcy5jaXR5fSwge3RyYW5zYWN0aW9uLmFkZHJlc3Muc3RhdGV9IHt0cmFuc2FjdGlvbi5hZGRyZXNzLnBvc3RhbENvZGV9XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgYWN0aXZpdHktaGVhZGVyXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy04IGRhdGVcIj5cclxuXHRcdFx0XHRcdFx0e2Zvcm1hdHRlZERhdGV9XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTQgdG90YWwgYWxpZ24tY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdHsvKiAkeyh0cmFuc2FjdGlvbi50b3RhbCAvIDEwMCkudG9GaXhlZCgyKX0gKi99XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIiBvbkNsaWNrPXsoKT0+dGhpcy50b2dnbGVDb2xsYXBzZShcInNoYXJlXCIpfT5cclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCh0aGlzLnN0YXRlLnNoYXJlKT9cclxuXHRcdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS1zaGFyZS1hbHQgY29sb3ItYmxhY2tcIi8+OlxyXG5cdFx0XHRcdFx0XHRcdDxpIGNsYXNzTmFtZT1cImZhIGZhLXNoYXJlLWFsdFwiLz5cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBcIiBvbkNsaWNrPXsoKT0+dGhpcy50b2dnbGVDb2xsYXBzZShcIm5hdmJhclwiKX0+XHJcblx0XHRcdFx0XHRcdCB7XHJcblx0XHRcdFx0XHRcdFx0ICh0aGlzLnN0YXRlLm5hdmJhcik/XHJcblx0XHRcdFx0XHRcdFx0IDxpIGNsYXNzTmFtZT1cImZhIGZhLWJhcnMgY29sb3ItYmxhY2tcIi8+OlxyXG5cdFx0XHRcdFx0XHRcdCA8aSBjbGFzc05hbWU9XCJmYSBmYS1iYXJzXCIvPlxyXG5cdFx0XHRcdFx0XHQgfVxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IHByb21vMSB2ZXJ0aWNhbC1hbGlnblwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG5cdFx0XHRcdFx0XHQ8YSBocmVmPVwiamF2YXNjcmlwdDpcIiBvbkNsaWNrPXt0aGlzLnJldHVyblBvbGljeX0+UmV0dXJuIFBvbGljeTwvYT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBwcmljZSBhbGlnbi1yaWdodCBwYWRkaW5nLXJpZ2h0LTBcIj5cclxuXHRcdFx0XHRcdFx0JHsodHJhbnNhY3Rpb24udG90YWwgLyAxMDApLnRvRml4ZWQoMil9XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGlkPVwic2hhcmVcIiBjbGFzc05hbWU9XCJiZy1pbnZlcnNlIHJvdyBjb2xsYXBzZSB0ZXh0LXdoaXRlIHBhZGRpbmctdG9wLTEwIHBhZGRpbmctYm90dG9tLTUgbWFyZ2luLWJvdHRvbS0xNVwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgYWxpZ24tY2VudGVyIG1hcmdpbi1ib3R0b20tMTVcIj5cclxuXHRcdFx0XHRcdFx0U2hhcmUgeW91ciB0cmFuc2FjdGlvblxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZSA9IFwiY29sLXhzLTEyXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgYWxpZ24tY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPVwiZmEgZmEtZncgZmEtZW52ZWxvcGUgZm9udC1zaXplLTQyXCIgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3Nob3dUZXh0OmZhbHNlLHNob3dFbWFpbDp0cnVlfSl9PjwvaT48YnIvPkVtYWlsXHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpIGNsYXNzTmFtZT1cImZhIGZhLWZ3IGZhLXBob25lIGZvbnQtc2l6ZS00MlwiIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHtzaG93VGV4dDp0cnVlLHNob3dFbWFpbDpmYWxzZX0pfT48L2k+PGJyLz5UZXh0XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdCh0aGlzLnN0YXRlLnNob3dFbWFpbCB8fCB0aGlzLnN0YXRlLnNob3dUZXh0KT8oXHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgbWFyZ2luLXRvcC0yMCBtYXJnaW4tYm90dG9tLTEwXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy04IG9mZnNldC14cy0xXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQodGhpcy5zdGF0ZS5zaG93RW1haWwpPzxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIkVtYWlsIEFkZHJlc3NcIi8+OjxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlBob25lIE51bWJlclwiLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJtYXJnaW4tdG9wLTUgY29sLXhzLTIgYnRuIGJ0bi1pbmZvIGJ0bi1zbVwiIG9uQ2xpY2s9e3RoaXMuc2VuZFRyYW5zYWN0aW9ufT5TZW5kPC9idXR0b24+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdCk6PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgbWFyZ2luLWJvdHRvbS0xNVwiPjwvZGl2PlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdHsvKiA8ZGl2IGNsYXNzTmFtZT1cInJvdyB2ZXJ0aWNhbC1hbGlnblwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHQ8YSBocmVmPVwiamF2YXNjcmlwdDpcIiBvbkNsaWNrPXt0aGlzLnJldHVyblBvbGljeX0+UmV0dXJuIFBvbGljeTwvYT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PiAqL31cclxuXHJcblx0XHRcdFx0PHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlXCI+XHJcblx0XHRcdFx0XHQ8dGhlYWQ+PHRyPjx0aD48L3RoPjx0aD5JdGVtPC90aD48dGg+VG90YWw8L3RoPjwvdHI+PC90aGVhZD5cclxuXHRcdFx0XHRcdDx0Ym9keT5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0dHJhbnNhY3Rpb24uSXRlbXMubWFwKChpdGVtLCBpKT0+e1xyXG5cdFx0XHRcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLnVuaXRQcmljZSA9PSBcInVuZGVmaW5lZFwiKSB2YXIgdW5pdFByaWNlID0gXCJcIjtcclxuXHRcdFx0XHRcdFx0XHRlbHNlIHZhciB1bml0UHJpY2UgPSBcIiRcIiArIGl0ZW0udW5pdFByaWNlLzEwMDtcclxuXHRcdFx0XHRcdFx0XHRpZih0eXBlb2YgaXRlbS5xdWFudGl0eSA9PSBcInVuZGVmaW5lZFwiKSB2YXIgcXVhbnRpdHkgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdGVsc2UgdmFyIHF1YW50aXR5ID0gaXRlbS5xdWFudGl0eTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgZ3JvdXBTdGFydCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdHRyYW5zYWN0aW9uLml0ZW1Hcm91cHMubWFwKGZ1bmN0aW9uKGdyb3VwKXtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChncm91cC5zdGFydCA9PSBpdGVtLnNlcXVlbmNlKSBncm91cFN0YXJ0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHRcdFx0PHRyIGNsYXNzTmFtZT17KGdyb3VwU3RhcnQpP1wibmV3U2VjdGlvblwiOlwiXCJ9IGtleT17aX0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDx0ZD57cXVhbnRpdHl9PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHRkPntpdGVtLmRlc2NyaXB0aW9ufTwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDx0ZD4keyhpdGVtLnRvdGFsLzEwMCkudG9GaXhlZCgyKX08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0PC90Ym9keT5cclxuXHRcdFx0XHQ8L3RhYmxlPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IHByb21vMSBhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyXCI+XHJcblx0XHRcdFx0XHRcdEdldCBhIGZyZWUgZG9udXQgb24geW91ciBuZXh0IHZpc2l0ISA8YnIvPlxyXG5cdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJwcm9tb1wiIGhyZWY9XCJqYXZhc2NyaXB0OlwiPlxyXG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc20gYnRuLXNlY29uZGFyeSBtYXJnaW4tdG9wLTEwXCIgb25DbGljaz17dGhpcy5zZW5kQ291cG9ufSBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0Q2xhaW0gSGVyZVxyXG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHQ8L2E+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdFx0XHRcdFx0PHN2ZyBjbGFzc05hbWU9XCJtYXJnaW4tYXV0byBkaXNwbGF5LWJsb2NrXCIgaWQ9XCJjb2RlMTI4XCI+PC9zdmc+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PE1vZGFsIG5hbWU9XCJyZXR1cm5Nb2RhbFwiPlxyXG5cdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJvbGQgcGFkZGluZy1ib3R0b20tMjBcIj5SZXR1cm4gUG9saWN5PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PGRpdj5SZXR1cm4gc3R1ZmYgaW4gOTAgZGF5cyBhbmQgeW91IGdvb2QuPC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBwYWRkaW5nLXRvcC0yMFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNvbC14cy02IG9mZnNldC14cy0zIGJ0biBidG4tYXBwLXByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLmNsZWFyRm9ybX0gZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cclxuXHRcdFx0XHRcdFx0XHRcdEdvIEJhY2tcclxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L01vZGFsPlxyXG5cdFx0XHRcdDxNb2RhbCBuYW1lPVwiY291cG9uTW9kYWxcIj5cclxuXHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYWxpZ24tY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJib2xkIHBhZGRpbmctYm90dG9tLTIwXCI+WW91ciBjb3Vwb24gaXMgb24gaXRzIHdheSE8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2PllvdSBzaG91bGQgcmVjZWl2ZSB5b3VyIGNvdXBvbiBieSB0ZXh0IHNvb24hPC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBwYWRkaW5nLXRvcC0yMFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNvbC14cy02IG9mZnNldC14cy0zIGJ0biBidG4tYXBwLXByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLmNsZWFyRm9ybX0gZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cclxuXHRcdFx0XHRcdFx0XHRcdEdvIEJhY2tcclxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L01vZGFsPlxyXG4gICAgICAgICA8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuXHJcblxyXG5SZWFjdERPTS5yZW5kZXIoKFxyXG5cdDxkaXY+XHJcblx0XHQ8TGFuZGluZy8+XHJcblx0PC9kaXY+XHJcbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XHJcbiJdfQ==
