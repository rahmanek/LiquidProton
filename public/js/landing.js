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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGNkbi5qcyIsInNyY1xcY2xhc3Nlc1xcVXRpbGl0aWVzLmpzIiwic3JjXFxjb21wb25lbnRzXFxtb2RhbC5qcyIsInNyY1xcbGFuZGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBLElBQUksY0FBYyxhQUFsQjtrQkFDZTtBQUNkLGNBQWEsV0FEQztBQUVkLFVBQVUsWUFBVTtBQUNuQixNQUFHLGVBQWUsWUFBbEIsRUFBZ0MsT0FBTyw2QkFBUCxDQUFoQyxLQUNLLE9BQU8sdUJBQVA7QUFDTCxFQUhTLEVBRkk7QUFNZCxVQUFVLFlBQVU7QUFDbkIsTUFBRyxlQUFlLFlBQWxCLEVBQWdDLE9BQU8sNkJBQVAsQ0FBaEMsS0FDSyxPQUFPLHVCQUFQO0FBQ0wsRUFIUyxFQU5JO0FBVWQsUUFBTTtBQUNMLFlBQVUsa0NBREw7QUFFTCxVQUFRO0FBRkg7QUFWUSxDOzs7Ozs7Ozs7QUNEZixJQUFJLElBQUksT0FBTyxDQUFmO0FBQ0EsSUFBSSxTQUFTLENBQWI7QUFDQSxJQUFJLFFBQVEsT0FBTyxLQUFuQjtBQUNBLElBQUksV0FBVyxPQUFPLFFBQXRCO0FBQ0EsSUFBSSxjQUFjLE9BQU8sV0FBekI7QUFDQSxJQUFJLFlBQVksT0FBTyxTQUF2QjtBQUNBLElBQUksU0FBUyxPQUFPLENBQXBCO1FBQ1MsQyxHQUFBLEM7UUFBRyxNLEdBQUEsTTtRQUFRLEssR0FBQSxLO1FBQU8sUSxHQUFBLFE7UUFBVSxXLEdBQUEsVztRQUFhLFMsR0FBQSxTO1FBQVcsTSxHQUFBLE07Ozs7Ozs7Ozs7QUNON0QsSUFBSSxtQkFBbUIsU0FBbkIsZ0JBQW1CLENBQVMsUUFBVCxFQUFtQjtBQUN6QyxLQUFJLFFBQVEsT0FBTyxRQUFQLENBQWdCLE1BQWhCLENBQXVCLFNBQXZCLENBQWlDLENBQWpDLENBQVo7QUFDQSxLQUFJLFVBQVUsTUFBTSxLQUFO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MkUsU0FBUyxLQUFLLFNBQXpGLEVBQW9HLGdCQUFhLE9BQWpIO0FBQUE7QUFBQTtBQUREO0FBTEQ7QUFERCxJQWpISztBQThITDtBQUFBO0FBQUEsTUFBTyxNQUFLLGFBQVo7QUFDQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUEsUUFBSyxXQUFVLGNBQWY7QUFDQztBQUFBO0FBQUEsU0FBSyxXQUFVLHdCQUFmO0FBQUE7QUFBQSxPQUREO0FBRUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZELE1BREQ7QUFLQztBQUFBO0FBQUEsUUFBSyxXQUFVLG9CQUFmO0FBQ0M7QUFBQTtBQUFBLFNBQVEsTUFBSyxRQUFiLEVBQXNCLFdBQVUsMENBQWhDLEVBQTJFLFNBQVMsS0FBSyxTQUF6RixFQUFvRyxnQkFBYSxPQUFqSDtBQUFBO0FBQUE7QUFERDtBQUxEO0FBREQ7QUE5SEssR0FEUDtBQThJQTtBQTdNOEIsQ0FBbEIsQ0FBZDs7QUFpTkEsY0FBUyxNQUFULENBQ0M7QUFBQTtBQUFBO0FBQ0MsMEJBQUMsT0FBRDtBQURELENBREQsRUFJRyxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FKSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxudmFyIGVudmlyb25tZW50ID0gXCJkZXZlbG9wbWVudFwiO1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0ZW52aXJvbm1lbnQ6IGVudmlyb25tZW50LFxyXG5cdGFwaUhvc3Q6IChmdW5jdGlvbigpe1xyXG5cdFx0aWYoZW52aXJvbm1lbnQgPT0gXCJwcm9kdWN0aW9uXCIpIHJldHVybiBcImh0dHA6Ly9hcGl0ZXN0LmZsZWN0aW5vLmNvbVwiO1xyXG5cdFx0ZWxzZSByZXR1cm4gXCJodHRwOi8vbG9jYWxob3N0OjMwMTBcIjtcclxuXHR9KCkpLFxyXG5cdHdlYkhvc3Q6IChmdW5jdGlvbigpe1xyXG5cdFx0aWYoZW52aXJvbm1lbnQgPT0gXCJwcm9kdWN0aW9uXCIpIHJldHVybiBcImh0dHA6Ly93ZWJ0ZXN0LmZsZWN0aW5vLmNvbVwiO1xyXG5cdFx0ZWxzZSByZXR1cm4gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcclxuXHR9KCkpLFxyXG5cdGF1dGgwOntcclxuXHRcdGNsaWVudElkOiBcIjBTTTBnckJUb0NKaldHVWJCdGxadUhoeWxDcTJkVnQzXCIsXHJcblx0XHRkb21haW46IFwiZmxlY3Rpbm8uYXV0aDAuY29tXCJcclxuXHR9XHJcbn1cclxuIiwiXHJcbnZhciAkID0gd2luZG93LiQ7XHJcbnZhciBqUXVlcnkgPSAkO1xyXG52YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3Q7XHJcbnZhciBSZWFjdERPTSA9IHdpbmRvdy5SZWFjdERPTTtcclxudmFyIFJlYWN0Um91dGVyID0gd2luZG93LlJlYWN0Um91dGVyO1xyXG52YXIgQXV0aDBMb2NrID0gd2luZG93LkF1dGgwTG9jaztcclxudmFyIExvZGFzaCA9IHdpbmRvdy5fO1xyXG5leHBvcnQgeyAkLCBqUXVlcnksIFJlYWN0LCBSZWFjdERPTSwgUmVhY3RSb3V0ZXIsIEF1dGgwTG9jaywgTG9kYXNoIH1cclxuIiwiXHJcblxyXG52YXIgZ2V0UXVlcnlWYXJpYWJsZSA9IGZ1bmN0aW9uKHZhcmlhYmxlKSB7XHJcblx0dmFyIHF1ZXJ5ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSk7XHJcblx0dmFyIHByZVZhcnMgPSBxdWVyeS5zcGxpdCgnLycpO1xyXG5cdHZhciB2YXJzID0gcHJlVmFyc1swXS5zcGxpdCgnJicpO1xyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIHBhaXIgPSB2YXJzW2ldLnNwbGl0KCc9Jyk7XHJcblx0XHRpZiAoZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pID09IHZhcmlhYmxlKSB7XHJcblx0XHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGNvbnNvbGUubG9nKCdRdWVyeSB2YXJpYWJsZSAlcyBub3QgZm91bmQnLCB2YXJpYWJsZSk7XHJcbn1cclxuXHJcbnZhciBpc1ZhbGlkID0ge1xyXG5cdGVtYWlsOiBmdW5jdGlvbihlbWFpbCkge1xyXG5cdFx0dmFyIHJlID0gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcblx0XHRyZXR1cm4gcmUudGVzdChlbWFpbCk7XHJcblx0fSxcclxuXHRwaG9uZTogZnVuY3Rpb24ocGhvbmUpIHtcclxuXHRcdHZhciBzdHJpcFBob25lID0gcGhvbmUucmVwbGFjZSgvXFxEL2csJycpO1xyXG5cdFx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID49IDEwKSByZXR1cm4gdHJ1ZTtcclxuXHRcdGVsc2UgZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG52YXIgZm9ybWF0UGhvbmUxMCA9IGZ1bmN0aW9uKHBob25lKXtcclxuXHR2YXIgc3RyaXBQaG9uZSA9IHBob25lLnJlcGxhY2UoL1xcRC9nLCcnKTtcclxuXHR2YXIgZGFzaCA9IFwiXCI7XHJcblx0dmFyIG9wZW5QYXJlbiA9IFwiXCI7XHJcblx0dmFyIGNsb3NlZFBhcmVuID0gXCJcIjtcclxuXHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPiAwKSBvcGVuUGFyZW4gPSBcIihcIjtcclxuXHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPiAzKSBjbG9zZWRQYXJlbiA9IFwiKVwiO1xyXG5cdGlmIChzdHJpcFBob25lLmxlbmd0aCA+IDYpIGRhc2ggPSBcIi1cIjtcclxuXHR2YXIgZm9ybWF0dGVkUGhvbmUgPSBvcGVuUGFyZW4gKyBzdHJpcFBob25lLnN1YnN0cmluZygwLDMpICsgY2xvc2VkUGFyZW4gKyBzdHJpcFBob25lLnN1YnN0cmluZygzLDYpICsgZGFzaCArIHN0cmlwUGhvbmUuc3Vic3RyaW5nKDYsMTApO1xyXG5cdHJldHVybiBmb3JtYXR0ZWRQaG9uZTtcclxufVxyXG5cclxudmFyIGdldFRpbWV6b25lT2Zmc2V0ID0gZnVuY3Rpb24oKXtcclxuXHRmdW5jdGlvbiBwYWQobnVtYmVyLCBsZW5ndGgpe1xyXG5cdFx0IHZhciBzdHIgPSBcIlwiICsgbnVtYmVyXHJcblx0XHQgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHtcclxuXHRcdFx0ICBzdHIgPSAnMCcrc3RyXHJcblx0XHQgfVxyXG5cdFx0IHJldHVybiBzdHJcclxuXHR9XHJcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdHZhciBvZmZzZXQgPSBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XHJcblx0cmV0dXJuICgob2Zmc2V0PDA/ICcrJzonLScpICsgcGFkKHBhcnNlSW50KE1hdGguYWJzKG9mZnNldC82MCkpLCAyKSsgcGFkKE1hdGguYWJzKG9mZnNldCU2MCksIDIpKTtcclxufVxyXG5cclxudmFyIGNyZWF0ZVRpbWVEYXRlID0gZnVuY3Rpb24oZGF0ZSwgdGltZSl7XHJcblx0dmFyIG1pbGVzdG9uZURhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuXHR2YXIgc3RyU3BsaXQgPSB0aW1lLnNwbGl0KCc6Jyk7XHJcblx0dmFyIGhvdXIgPSBwYXJzZUludChzdHJTcGxpdFswXSk7XHJcblx0dmFyIG1pbnV0ZSA9IHBhcnNlSW50KHN0clNwbGl0WzFdLnN1YnN0cmluZygwLDIpKTtcclxuXHR2YXIgc2V0ID0gc3RyU3BsaXRbMV0uc3Vic3RyaW5nKDIsNCk7XHJcblx0aWYgKGhvdXIgPT09IDEyKSB7XHJcblx0XHRpZiAoc2V0ID09PSBcImFtXCIpIGhvdXIgPSAwO1xyXG5cdFx0ZWxzZSBob3VyID0gMTI7XHJcblx0fSBlbHNlIGlmIChzZXQgPT09IFwicG1cIikgaG91ciArPSAxMjtcclxuXHRtaWxlc3RvbmVEYXRlLnNldEhvdXJzKGhvdXIpO1xyXG5cdG1pbGVzdG9uZURhdGUuc2V0TWludXRlcyhtaW51dGUpO1xyXG5cdG1pbGVzdG9uZURhdGUuc2V0TWludXRlcyhtaWxlc3RvbmVEYXRlLmdldE1pbnV0ZXMoKSAtICBtaWxlc3RvbmVEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkpO1xyXG5cdHJldHVybiBtaWxlc3RvbmVEYXRlLnRvSVNPU3RyaW5nKCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBnZXRRdWVyeVZhcmlhYmxlLCBpc1ZhbGlkLCBmb3JtYXRQaG9uZTEwLCBnZXRUaW1lem9uZU9mZnNldCwgY3JlYXRlVGltZURhdGUgfVxyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cIm1vZGFsXCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgaWQ9e3RoaXMucHJvcHMubmFtZX0+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInZlcnRpY2FsLWFsaWdubWVudC1oZWxwZXJcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgdmVydGljYWwtYWxpZ24tY2VudGVyXCIgcm9sZT1cImRvY3VtZW50XCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG59KTtcclxuIiwiaW1wb3J0IHsgUmVhY3RET00sIFJlYWN0IH0gZnJvbSAnLi9jZG4nXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xyXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi9jb21wb25lbnRzL21vZGFsJ1xyXG5pbXBvcnQgeyBnZXRRdWVyeVZhcmlhYmxlIH0gZnJvbSAnLi9jbGFzc2VzL1V0aWxpdGllcydcclxuXHJcbnZhciBMYW5kaW5nID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dHJhbnNhY3Rpb246IG51bGwsXHJcblx0XHRcdHNob3dFbWFpbDogZmFsc2UsXHJcblx0XHRcdHNob3dQaG9uZTogZmFsc2VcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcclxuXHRcdCQuZ2V0KGNvbmZpZy5hcGlIb3N0ICsgXCIvdjEvdHJhbnNhY3Rpb24vXCIgKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoXCIvXCIpWzJdKVxyXG5cdFx0LnRoZW4oKGRhdGEpPT57XHJcblx0XHRcdGRhdGEuSXRlbXMuc29ydChmdW5jdGlvbihhLGIpe1xyXG5cdFx0XHRcdGlmKGEuc2VxdWVuY2UgPiBiLnNlcXVlbmNlKSByZXR1cm4gMTtcclxuXHRcdFx0XHRlbHNlIHJldHVybiAtMTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3RyYW5zYWN0aW9uOmRhdGF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0SnNCYXJjb2RlKFwiI2NvZGUxMjhcIiwgXCIxMjM0NTY3ODkwMTIzXCIsIHtmb3JtYXQ6IFwiaXRmMTRcIn0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0c2VuZFRyYW5zYWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0Y29uc29sZS5sb2coXCJTZW50IVwiKVxyXG5cdH0sXHJcblx0c2VuZENvdXBvbjogZnVuY3Rpb24oKXtcclxuXHRcdGpRdWVyeSgnI2NvdXBvbk1vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuXHR9LFxyXG5cdHJldHVyblBvbGljeTogZnVuY3Rpb24oKXtcclxuXHRcdGpRdWVyeSgnI3JldHVybk1vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblx0XHR2YXIgdHJhbnNhY3Rpb24gPSB0aGlzLnN0YXRlLnRyYW5zYWN0aW9uO1xyXG5cdFx0aWYodHJhbnNhY3Rpb24gPT09IG51bGwpIHJldHVybiAoPGRpdj5Mb2FkaW5nLi4uPC9kaXY+KTtcclxuXHRcdHZhciBkYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZSh0cmFuc2FjdGlvbi50cmFuc2FjdGVkQXQpKTtcclxuXHRcdC8vIFJlbW92ZSBzZWNvbmRzIGZyb20gbG9jYWxlIGRhdGUgc3RyaW5nXHJcblx0XHR2YXIgZm9ybWF0dGVkRGF0ZSA9IGRhdGUudG9Mb2NhbGVTdHJpbmcoKS5yZXBsYWNlKC8oWzpdWzEtOV17Mn1bXCIgXCJdKS8sIFwiIFwiKTtcclxuXHRcdHZhciBjb250YWN0SXRlbXMgPSBbXTtcclxuXHRcdHZhciBmYUljb25zID0ge1xyXG5cdFx0XHRmYWNlYm9vazpcImZhY2Vib29rXCIsXHJcblx0XHRcdHBob25lOiBcInBob25lXCIsXHJcblx0XHRcdHdlYjogXCJnbG9iZVwiLFxyXG5cdFx0XHRnb29nbGVQbHVzOiBcImdvb2dsZS1wbHVzXCIsXHJcblx0XHRcdHBob25lOiBcInBob25lXCIsXHJcblx0XHRcdGVtYWlsOiBcImVudmVsb3BlXCIsXHJcblx0XHRcdGluc3RhZ3JhbTogXCJpbnN0YWdyYW1cIixcclxuXHRcdFx0cGludGVyZXN0OiBcInBpbnRlcmVzdC1wXCIsXHJcblx0XHRcdHR3aXR0ZXI6IFwidHdpdHRlclwiXHJcblx0XHR9XHJcblxyXG5cdFx0dHJhbnNhY3Rpb24uY29udGFjdC5tYXAoZnVuY3Rpb24oY29udGFjdCxpKXtcclxuXHRcdFx0dmFyIHByZVZhbHVlID0gY29udGFjdC52YWx1ZTtcclxuXHRcdFx0aWYoY29udGFjdC50eXBlID09IFwiZW1haWxcIikgY29udGFjdC52YWx1ZSA9IFwibWFpbHRvOlwiICsgcHJlVmFsdWU7XHJcblx0XHRcdGlmKGNvbnRhY3QudHlwZSA9PSBcInBob25lXCIpIGNvbnRhY3QudmFsdWUgPSBcInRlbDpcIiArIHByZVZhbHVlO1xyXG5cdFx0XHRjb250YWN0SXRlbXMucHVzaChcclxuXHRcdFx0XHQ8YSBrZXk9e2l9IGhyZWY9e2NvbnRhY3QudmFsdWV9IGNsYXNzTmFtZT1cImNvbG9yLXdoaXRlXCI+XHJcblx0XHRcdFx0XHQ8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtIGJnLWludmVyc2VcIj5cclxuXHRcdFx0XHRcdFx0e2NvbnRhY3QuZGVzY3JpcHRpb259XHJcblx0XHRcdFx0XHRcdDxpIGNsYXNzTmFtZT17XCJ2ZXJ0aWNhbC1hbGlnbi1taWRkbGUgZmxvYXQtcmlnaHQgZmEgZmEtZncgbGluZS1oZWlnaHQtaW5oZXJpdCBmYS1cIiArIGZhSWNvbnNbY29udGFjdC50eXBlXX0+PC9pPlxyXG5cdFx0XHRcdFx0XHR7KGNvbnRhY3QudHlwZSA9PSBcInBob25lXCIgfHwgY29udGFjdC50eXBlID09IFwiZW1haWxcIik/PGRpdiBjbGFzc05hbWU9XCJ0ZXh0LW11dGVkIG5vd3JhcFwiPntwcmVWYWx1ZX08L2Rpdj46PGRpdj48L2Rpdj59XHJcblx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0KTtcclxuXHRcdH0pXHJcblxyXG5cdFx0cmV0dXJuIChcclxuICAgICAgICAgPGRpdiBpZD1cImxhbmRpbmdcIiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbGxhcHNlIG1lbnUgb3ZlcmZsb3ctc2Nyb2xsLXkgcG9zaXRpb24tZml4ZWRcIiBpZD1cImV4Q29sbGFwc2luZ05hdmJhclwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoZWlnaHQtMTAwdmggYmctaW52ZXJzZSB0ZXh0LXdoaXRlXCI+XHJcblx0XHRcdFx0XHRcdDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW0gYmctaW52ZXJzZSBtZW51SGVhZFwiPkNvbm5lY3Qgd2l0aCB7dHJhbnNhY3Rpb24uS2V5Lm5hbWV9PC9saT5cclxuXHRcdFx0XHRcdFx0PHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAgYmctaW52ZXJzZVwiPlxyXG5cdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRhY3RJdGVtcy5tYXAoZnVuY3Rpb24oaXRlbSl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBpdGVtO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdDwvdWw+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyB2ZXJ0aWNhbC1hbGlnblwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTJcIj5cclxuXHRcdFx0XHRcdFx0PGltZyBjbGFzc05hbWU9XCJsb2dvXCIgc3JjPVwiL2Fzc2V0cy9sb2dvcy9kdW5raW4uanBnXCIvPlxyXG5cdFx0XHRcdFx0XHR7Lyoge3RyYW5zYWN0aW9uLktleS5uYW1lfSAqL31cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBhY3Rpdml0eS1oZWFkZXJcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTggZGF0ZVwiPlxyXG5cdFx0XHRcdFx0XHR7Zm9ybWF0dGVkRGF0ZX1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNCB0b3RhbCBhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0JHsodHJhbnNhY3Rpb24udG90YWwgLyAxMDApLnRvRml4ZWQoMil9XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBtYXJnaW4tdG9wLTIwIHZlcnRpY2FsLWFsaWduIG1hcmdpbi1ib3R0b20tMTUgXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS10YXJnZXQ9XCIjc2hhcmVcIiBjbGFzc05hbWU9XCJtYXJnaW4tbGVmdC0yNSBidG4gYnRuLXNlY29uZGFyeSBidG4tc21cIj5TaGFyZSA8aSBjbGFzc05hbWU9XCJmYSBmYS1zaGFyZS1hbHRcIj48L2k+PC9idXR0b24+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgYWxpZ24tY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiNleENvbGxhcHNpbmdOYXZiYXJcIiBjbGFzc05hbWU9XCJtYXJnaW4tcmlnaHQtMjUgYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCI+Q29ubmVjdCA8aSBjbGFzc05hbWU9XCJmYSBmYS1hcnJvd3MtaFwiPjwvaT48L2J1dHRvbj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgaWQ9XCJzaGFyZVwiIGNsYXNzTmFtZT1cImJnLWludmVyc2Ugcm93IGNvbGxhcHNlIHRleHQtd2hpdGUgcGFkZGluZy10b3AtMTAgcGFkZGluZy1ib3R0b20tNSBtYXJnaW4tYm90dG9tLTE1XCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBhbGlnbi1jZW50ZXIgbWFyZ2luLWJvdHRvbS0xNVwiPlxyXG5cdFx0XHRcdFx0XHRTaGFyZSB5b3VyIHRyYW5zYWN0aW9uXHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lID0gXCJjb2wteHMtMTJcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS1mdyBmYS1lbnZlbG9wZSBmb250LXNpemUtNDJcIiBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7c2hvd1RleHQ6ZmFsc2Usc2hvd0VtYWlsOnRydWV9KX0+PC9pPjxici8+RW1haWxcclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgYWxpZ24tY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPVwiZmEgZmEtZncgZmEtcGhvbmUgZm9udC1zaXplLTQyXCIgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3Nob3dUZXh0OnRydWUsc2hvd0VtYWlsOmZhbHNlfSl9PjwvaT48YnIvPlRleHRcclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0KHRoaXMuc3RhdGUuc2hvd0VtYWlsIHx8IHRoaXMuc3RhdGUuc2hvd1RleHQpPyhcclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBtYXJnaW4tdG9wLTIwIG1hcmdpbi1ib3R0b20tMTBcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTggb2Zmc2V0LXhzLTFcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCh0aGlzLnN0YXRlLnNob3dFbWFpbCk/PGlucHV0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwgQWRkcmVzc1wiLz46PGlucHV0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiUGhvbmUgTnVtYmVyXCIvPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cIm1hcmdpbi10b3AtNSBjb2wteHMtMiBidG4gYnRuLWluZm8gYnRuLXNtXCIgb25DbGljaz17dGhpcy5zZW5kVHJhbnNhY3Rpb259PlNlbmQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0KTo8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBtYXJnaW4tYm90dG9tLTE1XCI+PC9kaXY+XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgdmVydGljYWwtYWxpZ25cIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cclxuXHRcdFx0XHRcdFx0e3RyYW5zYWN0aW9uLmFkZHJlc3MubGluZTF9eyh0eXBlb2YgdHJhbnNhY3Rpb24uYWRkcmVzcy5saW5lMiA9PSBcInVuZGVmaW5lZFwiKT9cIlwiOnRyYW5zYWN0aW9uLmFkZHJlc3MubGluZTJ9PGJyLz5cclxuXHRcdFx0XHRcdFx0e3RyYW5zYWN0aW9uLmFkZHJlc3MuY2l0eX0sIHt0cmFuc2FjdGlvbi5hZGRyZXNzLnN0YXRlfSB7dHJhbnNhY3Rpb24uYWRkcmVzcy5wb3N0YWxDb2RlfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGFsaWduLXJpZ2h0XCI+XHJcblx0XHRcdFx0XHRcdDxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIG9uQ2xpY2s9e3RoaXMucmV0dXJuUG9saWN5fT5SZXR1cm4gUG9saWN5PC9hPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgcHJvbW8xIGFsaWduLWNlbnRlciBtYXJnaW4tdG9wLTEwXCI+XHJcblx0XHRcdFx0XHRHZXQgYSBmcmVlIGRvbnV0IG9uIHlvdXIgbmV4dCB2aXNpdCEgPGJyLz5cclxuXHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cInByb21vXCIgaHJlZj1cImphdmFzY3JpcHQ6XCI+XHJcblx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNvbC14cy02IG9mZnNldC14cy0zIGJ0biBidG4tc20gYnRuLWFwcC1zZWNvbmRhcnkgbWFyZ2luLXRvcC0xMFwiIG9uQ2xpY2s9e3RoaXMuc2VuZENvdXBvbn0gZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cclxuXHRcdFx0XHRcdFx0XHRDbGljayBoZXJlIHRvIGNsYWltXHJcblx0XHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PC9hPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZVwiPlxyXG5cdFx0XHRcdFx0PHRoZWFkPjx0cj48dGg+PC90aD48dGg+SXRlbTwvdGg+PHRoPlRvdGFsPC90aD48L3RyPjwvdGhlYWQ+XHJcblx0XHRcdFx0XHQ8dGJvZHk+XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHRyYW5zYWN0aW9uLkl0ZW1zLm1hcCgoaXRlbSwgaSk9PntcclxuXHRcdFx0XHRcdFx0XHRpZih0eXBlb2YgaXRlbS51bml0UHJpY2UgPT0gXCJ1bmRlZmluZWRcIikgdmFyIHVuaXRQcmljZSA9IFwiXCI7XHJcblx0XHRcdFx0XHRcdFx0ZWxzZSB2YXIgdW5pdFByaWNlID0gXCIkXCIgKyBpdGVtLnVuaXRQcmljZS8xMDA7XHJcblx0XHRcdFx0XHRcdFx0aWYodHlwZW9mIGl0ZW0ucXVhbnRpdHkgPT0gXCJ1bmRlZmluZWRcIikgdmFyIHF1YW50aXR5ID0gXCJcIjtcclxuXHRcdFx0XHRcdFx0XHRlbHNlIHZhciBxdWFudGl0eSA9IGl0ZW0ucXVhbnRpdHk7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGdyb3VwU3RhcnQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHR0cmFuc2FjdGlvbi5pdGVtR3JvdXBzLm1hcChmdW5jdGlvbihncm91cCl7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoZ3JvdXAuc3RhcnQgPT0gaXRlbS5zZXF1ZW5jZSkgZ3JvdXBTdGFydCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdFx0XHRcdDx0ciBjbGFzc05hbWU9eyhncm91cFN0YXJ0KT9cIm5ld1NlY3Rpb25cIjpcIlwifSBrZXk9e2l9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8dGQ+e3F1YW50aXR5fTwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDx0ZD57aXRlbS5kZXNjcmlwdGlvbn08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8dGQ+JHsoaXRlbS50b3RhbC8xMDApLnRvRml4ZWQoMil9PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdDwvdHI+XHJcblx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdDwvdGJvZHk+XHJcblx0XHRcdFx0PC90YWJsZT5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBmb290ZXIgbWFyZ2luLWJvdHRvbS0yMFwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBwcm9tbzFcIj5cclxuXHRcdFx0XHRcdFoxXHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgcHJvbW8yXCI+XHJcblx0XHRcdFx0XHRaMlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdFx0XHRcdFx0PHN2ZyBjbGFzc05hbWU9XCJtYXJnaW4tYXV0byBkaXNwbGF5LWJsb2NrXCIgaWQ9XCJjb2RlMTI4XCI+PC9zdmc+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PE1vZGFsIG5hbWU9XCJyZXR1cm5Nb2RhbFwiPlxyXG5cdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJvbGQgcGFkZGluZy1ib3R0b20tMjBcIj5SZXR1cm4gUG9saWN5PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PGRpdj5SZXR1cm4gc3R1ZmYgaW4gOTAgZGF5cyBhbmQgeW91IGdvb2QuPC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBwYWRkaW5nLXRvcC0yMFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNvbC14cy02IG9mZnNldC14cy0zIGJ0biBidG4tYXBwLXByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLmNsZWFyRm9ybX0gZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cclxuXHRcdFx0XHRcdFx0XHRcdEdvIEJhY2tcclxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L01vZGFsPlxyXG5cdFx0XHRcdDxNb2RhbCBuYW1lPVwiY291cG9uTW9kYWxcIj5cclxuXHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYWxpZ24tY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJib2xkIHBhZGRpbmctYm90dG9tLTIwXCI+WW91ciBjb3Vwb24gaXMgb24gaXRzIHdheSE8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2PllvdSBzaG91bGQgcmVjZWl2ZSB5b3VyIGNvdXBvbiBieSB0ZXh0IHNvb24hPC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBwYWRkaW5nLXRvcC0yMFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNvbC14cy02IG9mZnNldC14cy0zIGJ0biBidG4tYXBwLXByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLmNsZWFyRm9ybX0gZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cclxuXHRcdFx0XHRcdFx0XHRcdEdvIEJhY2tcclxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L01vZGFsPlxyXG4gICAgICAgICA8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuXHJcblxyXG5SZWFjdERPTS5yZW5kZXIoKFxyXG5cdDxkaXY+XHJcblx0XHQ8TGFuZGluZy8+XHJcblx0PC9kaXY+XHJcbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XHJcbiJdfQ==
