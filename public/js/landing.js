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
			showPhone: false
		};
	},
	componentDidMount: function componentDidMount() {
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
				{ className: 'collapse menu overflow-scroll-y position-fixed', id: 'exCollapsingNavbar' },
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
				{ className: 'row vertical-align' },
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-12' },
					_cdn.React.createElement('img', { className: 'logo', src: '/assets/logos/dunkin.jpg' })
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
					'$',
					(transaction.total / 100).toFixed(2)
				)
			),
			_cdn.React.createElement(
				'div',
				{ className: 'row margin-top-20 vertical-align margin-bottom-15 ' },
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-6 align-center' },
					_cdn.React.createElement(
						'button',
						{ type: 'button', 'data-toggle': 'collapse', 'data-target': '#share', className: 'margin-left-25 btn btn-secondary btn-sm' },
						'Share ',
						_cdn.React.createElement('i', { className: 'fa fa-share-alt' })
					)
				),
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-6 align-center' },
					_cdn.React.createElement(
						'button',
						{ type: 'button', 'data-toggle': 'collapse', 'data-target': '#exCollapsingNavbar', className: 'margin-right-25 btn btn-secondary btn-sm' },
						'Connect ',
						_cdn.React.createElement('i', { className: 'fa fa-arrows-h' })
					)
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
				'div',
				{ className: 'row vertical-align' },
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-6' },
					transaction.address.line1,
					typeof transaction.address.line2 == "undefined" ? "" : transaction.address.line2,
					_cdn.React.createElement('br', null),
					transaction.address.city,
					', ',
					transaction.address.state,
					' ',
					transaction.address.postalCode
				),
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-6 align-right' },
					_cdn.React.createElement(
						'a',
						{ href: 'javascript:', onClick: this.returnPolicy },
						'Return Policy'
					)
				)
			),
			_cdn.React.createElement(
				'div',
				{ className: 'row promo1 align-center margin-top-10' },
				'Get a free donut on your next visit! ',
				_cdn.React.createElement('br', null),
				_cdn.React.createElement(
					'a',
					{ className: 'promo', href: 'javascript:' },
					_cdn.React.createElement(
						'button',
						{ type: 'button', className: 'col-xs-6 offset-xs-3 btn btn-sm btn-app-secondary margin-top-10', onClick: this.sendCoupon, 'data-dismiss': 'modal' },
						'Click here to claim'
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
				{ className: 'row footer margin-bottom-20' },
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-6 promo1' },
					'Z1'
				),
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-6 promo2' },
					'Z2'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGNkbi5qcyIsInNyY1xcY2xhc3Nlc1xcVXRpbGl0aWVzLmpzIiwic3JjXFxjb21wb25lbnRzXFxtb2RhbC5qcyIsInNyY1xcbGFuZGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBLElBQUksY0FBYyxZQUFsQjtrQkFDZTtBQUNkLGNBQWEsV0FEQztBQUVkLFVBQVUsWUFBVTtBQUNuQixNQUFHLGVBQWUsWUFBbEIsRUFBZ0MsT0FBTyw2QkFBUCxDQUFoQyxLQUNLLE9BQU8sdUJBQVA7QUFDTCxFQUhTLEVBRkk7QUFNZCxVQUFVLFlBQVU7QUFDbkIsTUFBRyxlQUFlLFlBQWxCLEVBQWdDLE9BQU8sNkJBQVAsQ0FBaEMsS0FDSyxPQUFPLHVCQUFQO0FBQ0wsRUFIUyxFQU5JO0FBVWQsUUFBTTtBQUNMLFlBQVUsa0NBREw7QUFFTCxVQUFRO0FBRkg7QUFWUSxDOzs7Ozs7Ozs7QUNEZixJQUFJLElBQUksT0FBTyxDQUFmO0FBQ0EsSUFBSSxTQUFTLENBQWI7QUFDQSxJQUFJLFFBQVEsT0FBTyxLQUFuQjtBQUNBLElBQUksV0FBVyxPQUFPLFFBQXRCO0FBQ0EsSUFBSSxjQUFjLE9BQU8sV0FBekI7QUFDQSxJQUFJLFlBQVksT0FBTyxTQUF2QjtBQUNBLElBQUksU0FBUyxPQUFPLENBQXBCO1FBQ1MsQyxHQUFBLEM7UUFBRyxNLEdBQUEsTTtRQUFRLEssR0FBQSxLO1FBQU8sUSxHQUFBLFE7UUFBVSxXLEdBQUEsVztRQUFhLFMsR0FBQSxTO1FBQVcsTSxHQUFBLE07Ozs7Ozs7Ozs7QUNON0QsSUFBSSxtQkFBbUIsU0FBbkIsZ0JBQW1CLENBQVMsUUFBVCxFQUFtQjtBQUN6QyxLQUFJLFFBQVEsT0FBTyxRQUFQLENBQWdCLE1BQWhCLENBQXVCLFNBQXZCLENBQWlDLENBQWpDLENBQVo7QUFDQSxLQUFJLFVBQVUsTUFBTSxLQUFO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MkUsU0FBUyxLQUFLLFNBQXpGLEVBQW9HLGdCQUFhLE9BQWpIO0FBQUE7QUFBQTtBQUREO0FBTEQ7QUFERCxJQWpISztBQThITDtBQUFBO0FBQUEsTUFBTyxNQUFLLGFBQVo7QUFDQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUEsUUFBSyxXQUFVLGNBQWY7QUFDQztBQUFBO0FBQUEsU0FBSyxXQUFVLHdCQUFmO0FBQUE7QUFBQSxPQUREO0FBRUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZELE1BREQ7QUFLQztBQUFBO0FBQUEsUUFBSyxXQUFVLG9CQUFmO0FBQ0M7QUFBQTtBQUFBLFNBQVEsTUFBSyxRQUFiLEVBQXNCLFdBQVUsMENBQWhDLEVBQTJFLFNBQVMsS0FBSyxTQUF6RixFQUFvRyxnQkFBYSxPQUFqSDtBQUFBO0FBQUE7QUFERDtBQUxEO0FBREQ7QUE5SEssR0FEUDtBQThJQTtBQTdNOEIsQ0FBbEIsQ0FBZDs7QUFpTkEsY0FBUyxNQUFULENBQ0M7QUFBQTtBQUFBO0FBQ0MsMEJBQUMsT0FBRDtBQURELENBREQsRUFJRyxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FKSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxudmFyIGVudmlyb25tZW50ID0gXCJwcm9kdWN0aW9uXCI7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRlbnZpcm9ubWVudDogZW52aXJvbm1lbnQsXHJcblx0YXBpSG9zdDogKGZ1bmN0aW9uKCl7XHJcblx0XHRpZihlbnZpcm9ubWVudCA9PSBcInByb2R1Y3Rpb25cIikgcmV0dXJuIFwiaHR0cDovL2FwaXRlc3QuZmxlY3Rpbm8uY29tXCI7XHJcblx0XHRlbHNlIHJldHVybiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAxMFwiO1xyXG5cdH0oKSksXHJcblx0d2ViSG9zdDogKGZ1bmN0aW9uKCl7XHJcblx0XHRpZihlbnZpcm9ubWVudCA9PSBcInByb2R1Y3Rpb25cIikgcmV0dXJuIFwiaHR0cDovL3dlYnRlc3QuZmxlY3Rpbm8uY29tXCI7XHJcblx0XHRlbHNlIHJldHVybiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xyXG5cdH0oKSksXHJcblx0YXV0aDA6e1xyXG5cdFx0Y2xpZW50SWQ6IFwiMFNNMGdyQlRvQ0pqV0dVYkJ0bFp1SGh5bENxMmRWdDNcIixcclxuXHRcdGRvbWFpbjogXCJmbGVjdGluby5hdXRoMC5jb21cIlxyXG5cdH1cclxufVxyXG4iLCJcclxudmFyICQgPSB3aW5kb3cuJDtcclxudmFyIGpRdWVyeSA9ICQ7XHJcbnZhciBSZWFjdCA9IHdpbmRvdy5SZWFjdDtcclxudmFyIFJlYWN0RE9NID0gd2luZG93LlJlYWN0RE9NO1xyXG52YXIgUmVhY3RSb3V0ZXIgPSB3aW5kb3cuUmVhY3RSb3V0ZXI7XHJcbnZhciBBdXRoMExvY2sgPSB3aW5kb3cuQXV0aDBMb2NrO1xyXG52YXIgTG9kYXNoID0gd2luZG93Ll87XHJcbmV4cG9ydCB7ICQsIGpRdWVyeSwgUmVhY3QsIFJlYWN0RE9NLCBSZWFjdFJvdXRlciwgQXV0aDBMb2NrLCBMb2Rhc2ggfVxyXG4iLCJcclxuXHJcbnZhciBnZXRRdWVyeVZhcmlhYmxlID0gZnVuY3Rpb24odmFyaWFibGUpIHtcclxuXHR2YXIgcXVlcnkgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcclxuXHR2YXIgcHJlVmFycyA9IHF1ZXJ5LnNwbGl0KCcvJyk7XHJcblx0dmFyIHZhcnMgPSBwcmVWYXJzWzBdLnNwbGl0KCcmJyk7XHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoJz0nKTtcclxuXHRcdGlmIChkZWNvZGVVUklDb21wb25lbnQocGFpclswXSkgPT0gdmFyaWFibGUpIHtcclxuXHRcdFx0cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcclxuXHRcdH1cclxuXHR9XHJcblx0Y29uc29sZS5sb2coJ1F1ZXJ5IHZhcmlhYmxlICVzIG5vdCBmb3VuZCcsIHZhcmlhYmxlKTtcclxufVxyXG5cclxudmFyIGlzVmFsaWQgPSB7XHJcblx0ZW1haWw6IGZ1bmN0aW9uKGVtYWlsKSB7XHJcblx0XHR2YXIgcmUgPSAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcclxuXHRcdHJldHVybiByZS50ZXN0KGVtYWlsKTtcclxuXHR9LFxyXG5cdHBob25lOiBmdW5jdGlvbihwaG9uZSkge1xyXG5cdFx0dmFyIHN0cmlwUGhvbmUgPSBwaG9uZS5yZXBsYWNlKC9cXEQvZywnJyk7XHJcblx0XHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPj0gMTApIHJldHVybiB0cnVlO1xyXG5cdFx0ZWxzZSBmYWxzZTtcclxuXHR9XHJcbn1cclxuXHJcbnZhciBmb3JtYXRQaG9uZTEwID0gZnVuY3Rpb24ocGhvbmUpe1xyXG5cdHZhciBzdHJpcFBob25lID0gcGhvbmUucmVwbGFjZSgvXFxEL2csJycpO1xyXG5cdHZhciBkYXNoID0gXCJcIjtcclxuXHR2YXIgb3BlblBhcmVuID0gXCJcIjtcclxuXHR2YXIgY2xvc2VkUGFyZW4gPSBcIlwiO1xyXG5cdGlmIChzdHJpcFBob25lLmxlbmd0aCA+IDApIG9wZW5QYXJlbiA9IFwiKFwiO1xyXG5cdGlmIChzdHJpcFBob25lLmxlbmd0aCA+IDMpIGNsb3NlZFBhcmVuID0gXCIpXCI7XHJcblx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID4gNikgZGFzaCA9IFwiLVwiO1xyXG5cdHZhciBmb3JtYXR0ZWRQaG9uZSA9IG9wZW5QYXJlbiArIHN0cmlwUGhvbmUuc3Vic3RyaW5nKDAsMykgKyBjbG9zZWRQYXJlbiArIHN0cmlwUGhvbmUuc3Vic3RyaW5nKDMsNikgKyBkYXNoICsgc3RyaXBQaG9uZS5zdWJzdHJpbmcoNiwxMCk7XHJcblx0cmV0dXJuIGZvcm1hdHRlZFBob25lO1xyXG59XHJcblxyXG52YXIgZ2V0VGltZXpvbmVPZmZzZXQgPSBmdW5jdGlvbigpe1xyXG5cdGZ1bmN0aW9uIHBhZChudW1iZXIsIGxlbmd0aCl7XHJcblx0XHQgdmFyIHN0ciA9IFwiXCIgKyBudW1iZXJcclxuXHRcdCB3aGlsZSAoc3RyLmxlbmd0aCA8IGxlbmd0aCkge1xyXG5cdFx0XHQgIHN0ciA9ICcwJytzdHJcclxuXHRcdCB9XHJcblx0XHQgcmV0dXJuIHN0clxyXG5cdH1cclxuXHR2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0dmFyIG9mZnNldCA9IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcclxuXHRyZXR1cm4gKChvZmZzZXQ8MD8gJysnOictJykgKyBwYWQocGFyc2VJbnQoTWF0aC5hYnMob2Zmc2V0LzYwKSksIDIpKyBwYWQoTWF0aC5hYnMob2Zmc2V0JTYwKSwgMikpO1xyXG59XHJcblxyXG52YXIgY3JlYXRlVGltZURhdGUgPSBmdW5jdGlvbihkYXRlLCB0aW1lKXtcclxuXHR2YXIgbWlsZXN0b25lRGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG5cdHZhciBzdHJTcGxpdCA9IHRpbWUuc3BsaXQoJzonKTtcclxuXHR2YXIgaG91ciA9IHBhcnNlSW50KHN0clNwbGl0WzBdKTtcclxuXHR2YXIgbWludXRlID0gcGFyc2VJbnQoc3RyU3BsaXRbMV0uc3Vic3RyaW5nKDAsMikpO1xyXG5cdHZhciBzZXQgPSBzdHJTcGxpdFsxXS5zdWJzdHJpbmcoMiw0KTtcclxuXHRpZiAoaG91ciA9PT0gMTIpIHtcclxuXHRcdGlmIChzZXQgPT09IFwiYW1cIikgaG91ciA9IDA7XHJcblx0XHRlbHNlIGhvdXIgPSAxMjtcclxuXHR9IGVsc2UgaWYgKHNldCA9PT0gXCJwbVwiKSBob3VyICs9IDEyO1xyXG5cdG1pbGVzdG9uZURhdGUuc2V0SG91cnMoaG91cik7XHJcblx0bWlsZXN0b25lRGF0ZS5zZXRNaW51dGVzKG1pbnV0ZSk7XHJcblx0bWlsZXN0b25lRGF0ZS5zZXRNaW51dGVzKG1pbGVzdG9uZURhdGUuZ2V0TWludXRlcygpIC0gIG1pbGVzdG9uZURhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSk7XHJcblx0cmV0dXJuIG1pbGVzdG9uZURhdGUudG9JU09TdHJpbmcoKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7IGdldFF1ZXJ5VmFyaWFibGUsIGlzVmFsaWQsIGZvcm1hdFBob25lMTAsIGdldFRpbWV6b25lT2Zmc2V0LCBjcmVhdGVUaW1lRGF0ZSB9XHJcbiIsImltcG9ydCB7IFJlYWN0IH0gZnJvbSAnLi4vY2RuJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGlkPVwibW9kYWxcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsIGZhZGVcIiBpZD17dGhpcy5wcm9wcy5uYW1lfT5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidmVydGljYWwtYWxpZ25tZW50LWhlbHBlclwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZyB2ZXJ0aWNhbC1hbGlnbi1jZW50ZXJcIiByb2xlPVwiZG9jdW1lbnRcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTJcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdERPTSwgUmVhY3QgfSBmcm9tICcuL2NkbidcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXHJcbmltcG9ydCBNb2RhbCBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwnXHJcbmltcG9ydCB7IGdldFF1ZXJ5VmFyaWFibGUgfSBmcm9tICcuL2NsYXNzZXMvVXRpbGl0aWVzJ1xyXG5cclxudmFyIExhbmRpbmcgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR0cmFuc2FjdGlvbjogbnVsbCxcclxuXHRcdFx0c2hvd0VtYWlsOiBmYWxzZSxcclxuXHRcdFx0c2hvd1Bob25lOiBmYWxzZVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xyXG5cdFx0JC5nZXQoY29uZmlnLmFwaUhvc3QgKyBcIi92MS90cmFuc2FjdGlvbi9cIiArIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdChcIi9cIilbMl0pXHJcblx0XHQudGhlbigoZGF0YSk9PntcclxuXHRcdFx0ZGF0YS5JdGVtcy5zb3J0KGZ1bmN0aW9uKGEsYil7XHJcblx0XHRcdFx0aWYoYS5zZXF1ZW5jZSA+IGIuc2VxdWVuY2UpIHJldHVybiAxO1xyXG5cdFx0XHRcdGVsc2UgcmV0dXJuIC0xO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7dHJhbnNhY3Rpb246ZGF0YX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRKc0JhcmNvZGUoXCIjY29kZTEyOFwiLCBcIjEyMzQ1Njc4OTAxMjNcIiwge2Zvcm1hdDogXCJpdGYxNFwifSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRzZW5kVHJhbnNhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRjb25zb2xlLmxvZyhcIlNlbnQhXCIpXHJcblx0fSxcclxuXHRzZW5kQ291cG9uOiBmdW5jdGlvbigpe1xyXG5cdFx0alF1ZXJ5KCcjY291cG9uTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG5cdH0sXHJcblx0cmV0dXJuUG9saWN5OiBmdW5jdGlvbigpe1xyXG5cdFx0alF1ZXJ5KCcjcmV0dXJuTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHZhciB0cmFuc2FjdGlvbiA9IHRoaXMuc3RhdGUudHJhbnNhY3Rpb247XHJcblx0XHRpZih0cmFuc2FjdGlvbiA9PT0gbnVsbCkgcmV0dXJuICg8ZGl2PkxvYWRpbmcuLi48L2Rpdj4pO1xyXG5cdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKHRyYW5zYWN0aW9uLnRyYW5zYWN0ZWRBdCkpO1xyXG5cdFx0Ly8gUmVtb3ZlIHNlY29uZHMgZnJvbSBsb2NhbGUgZGF0ZSBzdHJpbmdcclxuXHRcdHZhciBmb3JtYXR0ZWREYXRlID0gZGF0ZS50b0xvY2FsZVN0cmluZygpLnJlcGxhY2UoLyhbOl1bMS05XXsyfVtcIiBcIl0pLywgXCIgXCIpO1xyXG5cdFx0dmFyIGNvbnRhY3RJdGVtcyA9IFtdO1xyXG5cdFx0dmFyIGZhSWNvbnMgPSB7XHJcblx0XHRcdGZhY2Vib29rOlwiZmFjZWJvb2tcIixcclxuXHRcdFx0cGhvbmU6IFwicGhvbmVcIixcclxuXHRcdFx0d2ViOiBcImdsb2JlXCIsXHJcblx0XHRcdGdvb2dsZVBsdXM6IFwiZ29vZ2xlLXBsdXNcIixcclxuXHRcdFx0cGhvbmU6IFwicGhvbmVcIixcclxuXHRcdFx0ZW1haWw6IFwiZW52ZWxvcGVcIixcclxuXHRcdFx0aW5zdGFncmFtOiBcImluc3RhZ3JhbVwiLFxyXG5cdFx0XHRwaW50ZXJlc3Q6IFwicGludGVyZXN0LXBcIixcclxuXHRcdFx0dHdpdHRlcjogXCJ0d2l0dGVyXCJcclxuXHRcdH1cclxuXHJcblx0XHR0cmFuc2FjdGlvbi5jb250YWN0Lm1hcChmdW5jdGlvbihjb250YWN0LGkpe1xyXG5cdFx0XHR2YXIgcHJlVmFsdWUgPSBjb250YWN0LnZhbHVlO1xyXG5cdFx0XHRpZihjb250YWN0LnR5cGUgPT0gXCJlbWFpbFwiKSBjb250YWN0LnZhbHVlID0gXCJtYWlsdG86XCIgKyBwcmVWYWx1ZTtcclxuXHRcdFx0aWYoY29udGFjdC50eXBlID09IFwicGhvbmVcIikgY29udGFjdC52YWx1ZSA9IFwidGVsOlwiICsgcHJlVmFsdWU7XHJcblx0XHRcdGNvbnRhY3RJdGVtcy5wdXNoKFxyXG5cdFx0XHRcdDxhIGtleT17aX0gaHJlZj17Y29udGFjdC52YWx1ZX0gY2xhc3NOYW1lPVwiY29sb3Itd2hpdGVcIj5cclxuXHRcdFx0XHRcdDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW0gYmctaW52ZXJzZVwiPlxyXG5cdFx0XHRcdFx0XHR7Y29udGFjdC5kZXNjcmlwdGlvbn1cclxuXHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPXtcInZlcnRpY2FsLWFsaWduLW1pZGRsZSBmbG9hdC1yaWdodCBmYSBmYS1mdyBsaW5lLWhlaWdodC1pbmhlcml0IGZhLVwiICsgZmFJY29uc1tjb250YWN0LnR5cGVdfT48L2k+XHJcblx0XHRcdFx0XHRcdHsoY29udGFjdC50eXBlID09IFwicGhvbmVcIiB8fCBjb250YWN0LnR5cGUgPT0gXCJlbWFpbFwiKT88ZGl2IGNsYXNzTmFtZT1cInRleHQtbXV0ZWQgbm93cmFwXCI+e3ByZVZhbHVlfTwvZGl2Pjo8ZGl2PjwvZGl2Pn1cclxuXHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHQpO1xyXG5cdFx0fSlcclxuXHJcblx0XHRyZXR1cm4gKFxyXG4gICAgICAgICA8ZGl2IGlkPVwibGFuZGluZ1wiIGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sbGFwc2UgbWVudSBvdmVyZmxvdy1zY3JvbGwteSBwb3NpdGlvbi1maXhlZFwiIGlkPVwiZXhDb2xsYXBzaW5nTmF2YmFyXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhlaWdodC0xMDB2aCBiZy1pbnZlcnNlIHRleHQtd2hpdGVcIj5cclxuXHRcdFx0XHRcdFx0PGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSBiZy1pbnZlcnNlIG1lbnVIZWFkXCI+Q29ubmVjdCB3aXRoIHt0cmFuc2FjdGlvbi5LZXkubmFtZX08L2xpPlxyXG5cdFx0XHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cCBiZy1pbnZlcnNlXCI+XHJcblx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGFjdEl0ZW1zLm1hcChmdW5jdGlvbihpdGVtKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGl0ZW07XHJcblx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0PC91bD5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IHZlcnRpY2FsLWFsaWduXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMlwiPlxyXG5cdFx0XHRcdFx0XHQ8aW1nIGNsYXNzTmFtZT1cImxvZ29cIiBzcmM9XCIvYXNzZXRzL2xvZ29zL2R1bmtpbi5qcGdcIi8+XHJcblx0XHRcdFx0XHRcdHsvKiB7dHJhbnNhY3Rpb24uS2V5Lm5hbWV9ICovfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IGFjdGl2aXR5LWhlYWRlclwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtOCBkYXRlXCI+XHJcblx0XHRcdFx0XHRcdHtmb3JtYXR0ZWREYXRlfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00IHRvdGFsIGFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHQkeyh0cmFuc2FjdGlvbi50b3RhbCAvIDEwMCkudG9GaXhlZCgyKX1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IG1hcmdpbi10b3AtMjAgdmVydGljYWwtYWxpZ24gbWFyZ2luLWJvdHRvbS0xNSBcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgYWxpZ24tY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiNzaGFyZVwiIGNsYXNzTmFtZT1cIm1hcmdpbi1sZWZ0LTI1IGJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiPlNoYXJlIDxpIGNsYXNzTmFtZT1cImZhIGZhLXNoYXJlLWFsdFwiPjwvaT48L2J1dHRvbj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiI2V4Q29sbGFwc2luZ05hdmJhclwiIGNsYXNzTmFtZT1cIm1hcmdpbi1yaWdodC0yNSBidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIj5Db25uZWN0IDxpIGNsYXNzTmFtZT1cImZhIGZhLWFycm93cy1oXCI+PC9pPjwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBpZD1cInNoYXJlXCIgY2xhc3NOYW1lPVwiYmctaW52ZXJzZSByb3cgY29sbGFwc2UgdGV4dC13aGl0ZSBwYWRkaW5nLXRvcC0xMCBwYWRkaW5nLWJvdHRvbS01IG1hcmdpbi1ib3R0b20tMTVcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGFsaWduLWNlbnRlciBtYXJnaW4tYm90dG9tLTE1XCI+XHJcblx0XHRcdFx0XHRcdFNoYXJlIHlvdXIgdHJhbnNhY3Rpb25cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWUgPSBcImNvbC14cy0xMlwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpIGNsYXNzTmFtZT1cImZhIGZhLWZ3IGZhLWVudmVsb3BlIGZvbnQtc2l6ZS00MlwiIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHtzaG93VGV4dDpmYWxzZSxzaG93RW1haWw6dHJ1ZX0pfT48L2k+PGJyLz5FbWFpbFxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS1mdyBmYS1waG9uZSBmb250LXNpemUtNDJcIiBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7c2hvd1RleHQ6dHJ1ZSxzaG93RW1haWw6ZmFsc2V9KX0+PC9pPjxici8+VGV4dFxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHQodGhpcy5zdGF0ZS5zaG93RW1haWwgfHwgdGhpcy5zdGF0ZS5zaG93VGV4dCk/KFxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIG1hcmdpbi10b3AtMjAgbWFyZ2luLWJvdHRvbS0xMFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtOCBvZmZzZXQteHMtMVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0KHRoaXMuc3RhdGUuc2hvd0VtYWlsKT88aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJFbWFpbCBBZGRyZXNzXCIvPjo8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJQaG9uZSBOdW1iZXJcIi8+XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwibWFyZ2luLXRvcC01IGNvbC14cy0yIGJ0biBidG4taW5mbyBidG4tc21cIiBvbkNsaWNrPXt0aGlzLnNlbmRUcmFuc2FjdGlvbn0+U2VuZDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQpOjxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIG1hcmdpbi1ib3R0b20tMTVcIj48L2Rpdj5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyB2ZXJ0aWNhbC1hbGlnblwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG5cdFx0XHRcdFx0XHR7dHJhbnNhY3Rpb24uYWRkcmVzcy5saW5lMX17KHR5cGVvZiB0cmFuc2FjdGlvbi5hZGRyZXNzLmxpbmUyID09IFwidW5kZWZpbmVkXCIpP1wiXCI6dHJhbnNhY3Rpb24uYWRkcmVzcy5saW5lMn08YnIvPlxyXG5cdFx0XHRcdFx0XHR7dHJhbnNhY3Rpb24uYWRkcmVzcy5jaXR5fSwge3RyYW5zYWN0aW9uLmFkZHJlc3Muc3RhdGV9IHt0cmFuc2FjdGlvbi5hZGRyZXNzLnBvc3RhbENvZGV9XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgYWxpZ24tcmlnaHRcIj5cclxuXHRcdFx0XHRcdFx0PGEgaHJlZj1cImphdmFzY3JpcHQ6XCIgb25DbGljaz17dGhpcy5yZXR1cm5Qb2xpY3l9PlJldHVybiBQb2xpY3k8L2E+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBwcm9tbzEgYWxpZ24tY2VudGVyIG1hcmdpbi10b3AtMTBcIj5cclxuXHRcdFx0XHRcdEdldCBhIGZyZWUgZG9udXQgb24geW91ciBuZXh0IHZpc2l0ISA8YnIvPlxyXG5cdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwicHJvbW9cIiBocmVmPVwiamF2YXNjcmlwdDpcIj5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY29sLXhzLTYgb2Zmc2V0LXhzLTMgYnRuIGJ0bi1zbSBidG4tYXBwLXNlY29uZGFyeSBtYXJnaW4tdG9wLTEwXCIgb25DbGljaz17dGhpcy5zZW5kQ291cG9ufSBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxyXG5cdFx0XHRcdFx0XHRcdENsaWNrIGhlcmUgdG8gY2xhaW1cclxuXHRcdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0XHQ8L2E+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlXCI+XHJcblx0XHRcdFx0XHQ8dGhlYWQ+PHRyPjx0aD48L3RoPjx0aD5JdGVtPC90aD48dGg+VG90YWw8L3RoPjwvdHI+PC90aGVhZD5cclxuXHRcdFx0XHRcdDx0Ym9keT5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0dHJhbnNhY3Rpb24uSXRlbXMubWFwKChpdGVtLCBpKT0+e1xyXG5cdFx0XHRcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLnVuaXRQcmljZSA9PSBcInVuZGVmaW5lZFwiKSB2YXIgdW5pdFByaWNlID0gXCJcIjtcclxuXHRcdFx0XHRcdFx0XHRlbHNlIHZhciB1bml0UHJpY2UgPSBcIiRcIiArIGl0ZW0udW5pdFByaWNlLzEwMDtcclxuXHRcdFx0XHRcdFx0XHRpZih0eXBlb2YgaXRlbS5xdWFudGl0eSA9PSBcInVuZGVmaW5lZFwiKSB2YXIgcXVhbnRpdHkgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdGVsc2UgdmFyIHF1YW50aXR5ID0gaXRlbS5xdWFudGl0eTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgZ3JvdXBTdGFydCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdHRyYW5zYWN0aW9uLml0ZW1Hcm91cHMubWFwKGZ1bmN0aW9uKGdyb3VwKXtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChncm91cC5zdGFydCA9PSBpdGVtLnNlcXVlbmNlKSBncm91cFN0YXJ0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHRcdFx0PHRyIGNsYXNzTmFtZT17KGdyb3VwU3RhcnQpP1wibmV3U2VjdGlvblwiOlwiXCJ9IGtleT17aX0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDx0ZD57cXVhbnRpdHl9PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHRkPntpdGVtLmRlc2NyaXB0aW9ufTwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDx0ZD4keyhpdGVtLnRvdGFsLzEwMCkudG9GaXhlZCgyKX08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0PC90Ym9keT5cclxuXHRcdFx0XHQ8L3RhYmxlPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IGZvb3RlciBtYXJnaW4tYm90dG9tLTIwXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IHByb21vMVwiPlxyXG5cdFx0XHRcdFx0WjFcclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBwcm9tbzJcIj5cclxuXHRcdFx0XHRcdFoyXHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0XHQ8c3ZnIGNsYXNzTmFtZT1cIm1hcmdpbi1hdXRvIGRpc3BsYXktYmxvY2tcIiBpZD1cImNvZGUxMjhcIj48L3N2Zz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8TW9kYWwgbmFtZT1cInJldHVybk1vZGFsXCI+XHJcblx0XHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYm9sZCBwYWRkaW5nLWJvdHRvbS0yMFwiPlJldHVybiBQb2xpY3k8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2PlJldHVybiBzdHVmZiBpbiA5MCBkYXlzIGFuZCB5b3UgZ29vZC48L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IHBhZGRpbmctdG9wLTIwXCI+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY29sLXhzLTYgb2Zmc2V0LXhzLTMgYnRuIGJ0bi1hcHAtcHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMuY2xlYXJGb3JtfSBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0R28gQmFja1xyXG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvTW9kYWw+XHJcblx0XHRcdFx0PE1vZGFsIG5hbWU9XCJjb3Vwb25Nb2RhbFwiPlxyXG5cdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJvbGQgcGFkZGluZy1ib3R0b20tMjBcIj5Zb3VyIGNvdXBvbiBpcyBvbiBpdHMgd2F5ITwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdDxkaXY+WW91IHNob3VsZCByZWNlaXZlIHlvdXIgY291cG9uIGJ5IHRleHQgc29vbiE8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IHBhZGRpbmctdG9wLTIwXCI+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY29sLXhzLTYgb2Zmc2V0LXhzLTMgYnRuIGJ0bi1hcHAtcHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMuY2xlYXJGb3JtfSBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0R28gQmFja1xyXG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvTW9kYWw+XHJcbiAgICAgICAgIDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcblJlYWN0RE9NLnJlbmRlcigoXHJcblx0PGRpdj5cclxuXHRcdDxMYW5kaW5nLz5cclxuXHQ8L2Rpdj5cclxuKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcclxuIl19
