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
						{ className: 'col-xs-6' },
						_cdn.React.createElement('i', { className: 'fa fa-share-alt', 'data-toggle': 'collapse', 'data-target': '#share' })
					),
					_cdn.React.createElement(
						'div',
						null,
						_cdn.React.createElement('i', { className: 'fa fa-bars', 'data-toggle': 'collapse', 'data-target': '#exCollapsingNavbar' })
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGNkbi5qcyIsInNyY1xcY2xhc3Nlc1xcVXRpbGl0aWVzLmpzIiwic3JjXFxjb21wb25lbnRzXFxtb2RhbC5qcyIsInNyY1xcbGFuZGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBLElBQUksY0FBYyxZQUFsQjtrQkFDZTtBQUNkLGNBQWEsV0FEQztBQUVkLFVBQVUsWUFBVTtBQUNuQixNQUFHLGVBQWUsWUFBbEIsRUFBZ0MsT0FBTyw2QkFBUCxDQUFoQyxLQUNLLE9BQU8sdUJBQVA7QUFDTCxFQUhTLEVBRkk7QUFNZCxVQUFVLFlBQVU7QUFDbkIsTUFBRyxlQUFlLFlBQWxCLEVBQWdDLE9BQU8sNkJBQVAsQ0FBaEMsS0FDSyxPQUFPLHVCQUFQO0FBQ0wsRUFIUyxFQU5JO0FBVWQsUUFBTTtBQUNMLFlBQVUsa0NBREw7QUFFTCxVQUFRO0FBRkg7QUFWUSxDOzs7Ozs7Ozs7QUNEZixJQUFJLElBQUksT0FBTyxDQUFmO0FBQ0EsSUFBSSxTQUFTLENBQWI7QUFDQSxJQUFJLFFBQVEsT0FBTyxLQUFuQjtBQUNBLElBQUksV0FBVyxPQUFPLFFBQXRCO0FBQ0EsSUFBSSxjQUFjLE9BQU8sV0FBekI7QUFDQSxJQUFJLFlBQVksT0FBTyxTQUF2QjtBQUNBLElBQUksU0FBUyxPQUFPLENBQXBCO1FBQ1MsQyxHQUFBLEM7UUFBRyxNLEdBQUEsTTtRQUFRLEssR0FBQSxLO1FBQU8sUSxHQUFBLFE7UUFBVSxXLEdBQUEsVztRQUFhLFMsR0FBQSxTO1FBQVcsTSxHQUFBLE07Ozs7Ozs7Ozs7QUNON0QsSUFBSSxtQkFBbUIsU0FBbkIsZ0JBQW1CLENBQVMsUUFBVCxFQUFtQjtBQUN6QyxLQUFJLFFBQVEsT0FBTyxRQUFQLENBQWdCLE1BQWhCLENBQXVCLFNBQXZCLENBQWlDLENBQWpDLENBQVo7QUFDQSxLQUFJLFVBQVUsTUFBTSxLQUFO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O0FBdUlMO0FBQUE7QUFBQSxNQUFPLE1BQUssYUFBWjtBQUNDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQSxRQUFLLFdBQVUsY0FBZjtBQUNDO0FBQUE7QUFBQSxTQUFLLFdBQVUsd0JBQWY7QUFBQTtBQUFBLE9BREQ7QUFFQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkQsTUFERDtBQUtDO0FBQUE7QUFBQSxRQUFLLFdBQVUsb0JBQWY7QUFDQztBQUFBO0FBQUEsU0FBUSxNQUFLLFFBQWIsRUFBc0IsV0FBVSwwQ0FBaEMsRUFBMkUsU0FBUyxLQUFLLFNBQXpGLEVBQW9HLGdCQUFhLE9BQWpIO0FBQUE7QUFBQTtBQUREO0FBTEQ7QUFERDtBQXZJSyxHQURQO0FBdUpBO0FBdE44QixDQUFsQixDQUFkOztBQTBOQSxjQUFTLE1BQVQsQ0FDQztBQUFBO0FBQUE7QUFDQywwQkFBQyxPQUFEO0FBREQsQ0FERCxFQUlHLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQUpIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG52YXIgZW52aXJvbm1lbnQgPSBcInByb2R1Y3Rpb25cIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGVudmlyb25tZW50OiBlbnZpcm9ubWVudCxcclxuXHRhcGlIb3N0OiAoZnVuY3Rpb24oKXtcclxuXHRcdGlmKGVudmlyb25tZW50ID09IFwicHJvZHVjdGlvblwiKSByZXR1cm4gXCJodHRwOi8vYXBpdGVzdC5mbGVjdGluby5jb21cIjtcclxuXHRcdGVsc2UgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDozMDEwXCI7XHJcblx0fSgpKSxcclxuXHR3ZWJIb3N0OiAoZnVuY3Rpb24oKXtcclxuXHRcdGlmKGVudmlyb25tZW50ID09IFwicHJvZHVjdGlvblwiKSByZXR1cm4gXCJodHRwOi8vd2VidGVzdC5mbGVjdGluby5jb21cIjtcclxuXHRcdGVsc2UgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcblx0fSgpKSxcclxuXHRhdXRoMDp7XHJcblx0XHRjbGllbnRJZDogXCIwU00wZ3JCVG9DSmpXR1ViQnRsWnVIaHlsQ3EyZFZ0M1wiLFxyXG5cdFx0ZG9tYWluOiBcImZsZWN0aW5vLmF1dGgwLmNvbVwiXHJcblx0fVxyXG59XHJcbiIsIlxyXG52YXIgJCA9IHdpbmRvdy4kO1xyXG52YXIgalF1ZXJ5ID0gJDtcclxudmFyIFJlYWN0ID0gd2luZG93LlJlYWN0O1xyXG52YXIgUmVhY3RET00gPSB3aW5kb3cuUmVhY3RET007XHJcbnZhciBSZWFjdFJvdXRlciA9IHdpbmRvdy5SZWFjdFJvdXRlcjtcclxudmFyIEF1dGgwTG9jayA9IHdpbmRvdy5BdXRoMExvY2s7XHJcbnZhciBMb2Rhc2ggPSB3aW5kb3cuXztcclxuZXhwb3J0IHsgJCwgalF1ZXJ5LCBSZWFjdCwgUmVhY3RET00sIFJlYWN0Um91dGVyLCBBdXRoMExvY2ssIExvZGFzaCB9XHJcbiIsIlxyXG5cclxudmFyIGdldFF1ZXJ5VmFyaWFibGUgPSBmdW5jdGlvbih2YXJpYWJsZSkge1xyXG5cdHZhciBxdWVyeSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpO1xyXG5cdHZhciBwcmVWYXJzID0gcXVlcnkuc3BsaXQoJy8nKTtcclxuXHR2YXIgdmFycyA9IHByZVZhcnNbMF0uc3BsaXQoJyYnKTtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdCgnPScpO1xyXG5cdFx0aWYgKGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKSA9PSB2YXJpYWJsZSkge1xyXG5cdFx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjb25zb2xlLmxvZygnUXVlcnkgdmFyaWFibGUgJXMgbm90IGZvdW5kJywgdmFyaWFibGUpO1xyXG59XHJcblxyXG52YXIgaXNWYWxpZCA9IHtcclxuXHRlbWFpbDogZnVuY3Rpb24oZW1haWwpIHtcclxuXHRcdHZhciByZSA9IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xyXG5cdFx0cmV0dXJuIHJlLnRlc3QoZW1haWwpO1xyXG5cdH0sXHJcblx0cGhvbmU6IGZ1bmN0aW9uKHBob25lKSB7XHJcblx0XHR2YXIgc3RyaXBQaG9uZSA9IHBob25lLnJlcGxhY2UoL1xcRC9nLCcnKTtcclxuXHRcdGlmIChzdHJpcFBob25lLmxlbmd0aCA+PSAxMCkgcmV0dXJuIHRydWU7XHJcblx0XHRlbHNlIGZhbHNlO1xyXG5cdH1cclxufVxyXG5cclxudmFyIGZvcm1hdFBob25lMTAgPSBmdW5jdGlvbihwaG9uZSl7XHJcblx0dmFyIHN0cmlwUGhvbmUgPSBwaG9uZS5yZXBsYWNlKC9cXEQvZywnJyk7XHJcblx0dmFyIGRhc2ggPSBcIlwiO1xyXG5cdHZhciBvcGVuUGFyZW4gPSBcIlwiO1xyXG5cdHZhciBjbG9zZWRQYXJlbiA9IFwiXCI7XHJcblx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID4gMCkgb3BlblBhcmVuID0gXCIoXCI7XHJcblx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID4gMykgY2xvc2VkUGFyZW4gPSBcIilcIjtcclxuXHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPiA2KSBkYXNoID0gXCItXCI7XHJcblx0dmFyIGZvcm1hdHRlZFBob25lID0gb3BlblBhcmVuICsgc3RyaXBQaG9uZS5zdWJzdHJpbmcoMCwzKSArIGNsb3NlZFBhcmVuICsgc3RyaXBQaG9uZS5zdWJzdHJpbmcoMyw2KSArIGRhc2ggKyBzdHJpcFBob25lLnN1YnN0cmluZyg2LDEwKTtcclxuXHRyZXR1cm4gZm9ybWF0dGVkUGhvbmU7XHJcbn1cclxuXHJcbnZhciBnZXRUaW1lem9uZU9mZnNldCA9IGZ1bmN0aW9uKCl7XHJcblx0ZnVuY3Rpb24gcGFkKG51bWJlciwgbGVuZ3RoKXtcclxuXHRcdCB2YXIgc3RyID0gXCJcIiArIG51bWJlclxyXG5cdFx0IHdoaWxlIChzdHIubGVuZ3RoIDwgbGVuZ3RoKSB7XHJcblx0XHRcdCAgc3RyID0gJzAnK3N0clxyXG5cdFx0IH1cclxuXHRcdCByZXR1cm4gc3RyXHJcblx0fVxyXG5cdHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuXHR2YXIgb2Zmc2V0ID0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xyXG5cdHJldHVybiAoKG9mZnNldDwwPyAnKyc6Jy0nKSArIHBhZChwYXJzZUludChNYXRoLmFicyhvZmZzZXQvNjApKSwgMikrIHBhZChNYXRoLmFicyhvZmZzZXQlNjApLCAyKSk7XHJcbn1cclxuXHJcbnZhciBjcmVhdGVUaW1lRGF0ZSA9IGZ1bmN0aW9uKGRhdGUsIHRpbWUpe1xyXG5cdHZhciBtaWxlc3RvbmVEYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcblx0dmFyIHN0clNwbGl0ID0gdGltZS5zcGxpdCgnOicpO1xyXG5cdHZhciBob3VyID0gcGFyc2VJbnQoc3RyU3BsaXRbMF0pO1xyXG5cdHZhciBtaW51dGUgPSBwYXJzZUludChzdHJTcGxpdFsxXS5zdWJzdHJpbmcoMCwyKSk7XHJcblx0dmFyIHNldCA9IHN0clNwbGl0WzFdLnN1YnN0cmluZygyLDQpO1xyXG5cdGlmIChob3VyID09PSAxMikge1xyXG5cdFx0aWYgKHNldCA9PT0gXCJhbVwiKSBob3VyID0gMDtcclxuXHRcdGVsc2UgaG91ciA9IDEyO1xyXG5cdH0gZWxzZSBpZiAoc2V0ID09PSBcInBtXCIpIGhvdXIgKz0gMTI7XHJcblx0bWlsZXN0b25lRGF0ZS5zZXRIb3Vycyhob3VyKTtcclxuXHRtaWxlc3RvbmVEYXRlLnNldE1pbnV0ZXMobWludXRlKTtcclxuXHRtaWxlc3RvbmVEYXRlLnNldE1pbnV0ZXMobWlsZXN0b25lRGF0ZS5nZXRNaW51dGVzKCkgLSAgbWlsZXN0b25lRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpKTtcclxuXHRyZXR1cm4gbWlsZXN0b25lRGF0ZS50b0lTT1N0cmluZygpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgZ2V0UXVlcnlWYXJpYWJsZSwgaXNWYWxpZCwgZm9ybWF0UGhvbmUxMCwgZ2V0VGltZXpvbmVPZmZzZXQsIGNyZWF0ZVRpbWVEYXRlIH1cclxuIiwiaW1wb3J0IHsgUmVhY3QgfSBmcm9tICcuLi9jZG4nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJtb2RhbFwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZVwiIGlkPXt0aGlzLnByb3BzLm5hbWV9PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ2ZXJ0aWNhbC1hbGlnbm1lbnQtaGVscGVyXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nIHZlcnRpY2FsLWFsaWduLWNlbnRlclwiIHJvbGU9XCJkb2N1bWVudFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWNvbnRlbnRcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMlwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxufSk7XHJcbiIsImltcG9ydCB7IFJlYWN0RE9NLCBSZWFjdCB9IGZyb20gJy4vY2RuJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZydcclxuaW1wb3J0IE1vZGFsIGZyb20gJy4vY29tcG9uZW50cy9tb2RhbCdcclxuaW1wb3J0IHsgZ2V0UXVlcnlWYXJpYWJsZSB9IGZyb20gJy4vY2xhc3Nlcy9VdGlsaXRpZXMnXHJcblxyXG52YXIgTGFuZGluZyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRnZXRJbml0aWFsU3RhdGU6ZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHRyYW5zYWN0aW9uOiBudWxsLFxyXG5cdFx0XHRzaG93RW1haWw6IGZhbHNlLFxyXG5cdFx0XHRzaG93UGhvbmU6IGZhbHNlXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0Y29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpe1xyXG5cdFx0JC5nZXQoY29uZmlnLmFwaUhvc3QgKyBcIi92MS90cmFuc2FjdGlvbi9cIiArIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdChcIi9cIilbMl0pXHJcblx0XHQudGhlbigoZGF0YSk9PntcclxuXHRcdFx0ZGF0YS5JdGVtcy5zb3J0KGZ1bmN0aW9uKGEsYil7XHJcblx0XHRcdFx0aWYoYS5zZXF1ZW5jZSA+IGIuc2VxdWVuY2UpIHJldHVybiAxO1xyXG5cdFx0XHRcdGVsc2UgcmV0dXJuIC0xO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7dHJhbnNhY3Rpb246ZGF0YX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRKc0JhcmNvZGUoXCIjY29kZTEyOFwiLCBcIjEyMzQ1Njc4OTAxMjNcIiwge2Zvcm1hdDogXCJpdGYxNFwifSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRzZW5kVHJhbnNhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRjb25zb2xlLmxvZyhcIlNlbnQhXCIpXHJcblx0fSxcclxuXHRzZW5kQ291cG9uOiBmdW5jdGlvbigpe1xyXG5cdFx0alF1ZXJ5KCcjY291cG9uTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG5cdH0sXHJcblx0cmV0dXJuUG9saWN5OiBmdW5jdGlvbigpe1xyXG5cdFx0alF1ZXJ5KCcjcmV0dXJuTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHZhciB0cmFuc2FjdGlvbiA9IHRoaXMuc3RhdGUudHJhbnNhY3Rpb247XHJcblx0XHRpZih0cmFuc2FjdGlvbiA9PT0gbnVsbCkgcmV0dXJuICg8ZGl2PkxvYWRpbmcuLi48L2Rpdj4pO1xyXG5cdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKHRyYW5zYWN0aW9uLnRyYW5zYWN0ZWRBdCkpO1xyXG5cdFx0Ly8gUmVtb3ZlIHNlY29uZHMgZnJvbSBsb2NhbGUgZGF0ZSBzdHJpbmdcclxuXHRcdHZhciBmb3JtYXR0ZWREYXRlID0gZGF0ZS50b0xvY2FsZVN0cmluZygpLnJlcGxhY2UoLyhbOl1bMS05XXsyfVtcIiBcIl0pLywgXCIgXCIpO1xyXG5cdFx0dmFyIGNvbnRhY3RJdGVtcyA9IFtdO1xyXG5cdFx0dmFyIGZhSWNvbnMgPSB7XHJcblx0XHRcdGZhY2Vib29rOlwiZmFjZWJvb2tcIixcclxuXHRcdFx0cGhvbmU6IFwicGhvbmVcIixcclxuXHRcdFx0d2ViOiBcImdsb2JlXCIsXHJcblx0XHRcdGdvb2dsZVBsdXM6IFwiZ29vZ2xlLXBsdXNcIixcclxuXHRcdFx0cGhvbmU6IFwicGhvbmVcIixcclxuXHRcdFx0ZW1haWw6IFwiZW52ZWxvcGVcIixcclxuXHRcdFx0aW5zdGFncmFtOiBcImluc3RhZ3JhbVwiLFxyXG5cdFx0XHRwaW50ZXJlc3Q6IFwicGludGVyZXN0LXBcIixcclxuXHRcdFx0dHdpdHRlcjogXCJ0d2l0dGVyXCJcclxuXHRcdH1cclxuXHJcblx0XHR0cmFuc2FjdGlvbi5jb250YWN0Lm1hcChmdW5jdGlvbihjb250YWN0LGkpe1xyXG5cdFx0XHR2YXIgcHJlVmFsdWUgPSBjb250YWN0LnZhbHVlO1xyXG5cdFx0XHRpZihjb250YWN0LnR5cGUgPT0gXCJlbWFpbFwiKSBjb250YWN0LnZhbHVlID0gXCJtYWlsdG86XCIgKyBwcmVWYWx1ZTtcclxuXHRcdFx0aWYoY29udGFjdC50eXBlID09IFwicGhvbmVcIikgY29udGFjdC52YWx1ZSA9IFwidGVsOlwiICsgcHJlVmFsdWU7XHJcblx0XHRcdGNvbnRhY3RJdGVtcy5wdXNoKFxyXG5cdFx0XHRcdDxhIGtleT17aX0gaHJlZj17Y29udGFjdC52YWx1ZX0gY2xhc3NOYW1lPVwiY29sb3Itd2hpdGVcIj5cclxuXHRcdFx0XHRcdDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW0gYmctaW52ZXJzZVwiPlxyXG5cdFx0XHRcdFx0XHR7Y29udGFjdC5kZXNjcmlwdGlvbn1cclxuXHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPXtcInZlcnRpY2FsLWFsaWduLW1pZGRsZSBmbG9hdC1yaWdodCBmYSBmYS1mdyBsaW5lLWhlaWdodC1pbmhlcml0IGZhLVwiICsgZmFJY29uc1tjb250YWN0LnR5cGVdfT48L2k+XHJcblx0XHRcdFx0XHRcdHsoY29udGFjdC50eXBlID09IFwicGhvbmVcIiB8fCBjb250YWN0LnR5cGUgPT0gXCJlbWFpbFwiKT88ZGl2IGNsYXNzTmFtZT1cInRleHQtbXV0ZWQgbm93cmFwXCI+e3ByZVZhbHVlfTwvZGl2Pjo8ZGl2PjwvZGl2Pn1cclxuXHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHQpO1xyXG5cdFx0fSlcclxuXHJcblx0XHRyZXR1cm4gKFxyXG4gICAgICAgICA8ZGl2IGlkPVwibGFuZGluZ1wiIGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sbGFwc2UgbWVudSBvdmVyZmxvdy1zY3JvbGwteSBwb3NpdGlvbi1maXhlZFwiIGlkPVwiZXhDb2xsYXBzaW5nTmF2YmFyXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhlaWdodC0xMDB2aCBiZy1pbnZlcnNlIHRleHQtd2hpdGVcIj5cclxuXHRcdFx0XHRcdFx0PGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSBiZy1pbnZlcnNlIG1lbnVIZWFkXCI+Q29ubmVjdCB3aXRoIHt0cmFuc2FjdGlvbi5LZXkubmFtZX08L2xpPlxyXG5cdFx0XHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cCBiZy1pbnZlcnNlXCI+XHJcblx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGFjdEl0ZW1zLm1hcChmdW5jdGlvbihpdGVtKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGl0ZW07XHJcblx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0PC91bD5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBtYXJnaW4tdG9wLTE1XCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTMgcGFkZGluZy1sZWZ0LTBcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aW1nIGNsYXNzTmFtZT1cImxvZ29cIiBzcmM9XCIvYXNzZXRzL2xvZ29zL2R1bmsuanBnXCIvPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtOSBwYWRkaW5nLWxlZnQtMFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWJsb2NrXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJyYW5kLXRpdGxlIHZlcnRpY2FsLWFsaWduXCI+e3RyYW5zYWN0aW9uLktleS5uYW1lfTwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhZGRyZXNzXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdHt0cmFuc2FjdGlvbi5hZGRyZXNzLmxpbmUxfXsodHlwZW9mIHRyYW5zYWN0aW9uLmFkZHJlc3MubGluZTIgPT0gXCJ1bmRlZmluZWRcIik/XCJcIjpcIiBcIiArIHRyYW5zYWN0aW9uLmFkZHJlc3MubGluZTJ9XHJcblx0XHRcdFx0XHRcdFx0XHRcdCwge3RyYW5zYWN0aW9uLmFkZHJlc3MuY2l0eX0sIHt0cmFuc2FjdGlvbi5hZGRyZXNzLnN0YXRlfSB7dHJhbnNhY3Rpb24uYWRkcmVzcy5wb3N0YWxDb2RlfVxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IGFjdGl2aXR5LWhlYWRlclwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtOCBkYXRlXCI+XHJcblx0XHRcdFx0XHRcdHtmb3JtYXR0ZWREYXRlfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00IHRvdGFsIGFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHR7LyogJHsodHJhbnNhY3Rpb24udG90YWwgLyAxMDApLnRvRml4ZWQoMil9ICovfVxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdCA8aSBjbGFzc05hbWU9XCJmYSBmYS1zaGFyZS1hbHRcIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS10YXJnZXQ9XCIjc2hhcmVcIi8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PjxkaXY+XHJcblx0XHRcdFx0XHRcdCA8aSBjbGFzc05hbWU9XCJmYSBmYS1iYXJzXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiI2V4Q29sbGFwc2luZ05hdmJhclwiLz5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBwcm9tbzEgdmVydGljYWwtYWxpZ25cIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cclxuXHRcdFx0XHRcdFx0PGEgaHJlZj1cImphdmFzY3JpcHQ6XCIgb25DbGljaz17dGhpcy5yZXR1cm5Qb2xpY3l9PlJldHVybiBQb2xpY3k8L2E+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgcHJpY2UgYWxpZ24tcmlnaHQgcGFkZGluZy1yaWdodC0wXCI+XHJcblx0XHRcdFx0XHRcdCR7KHRyYW5zYWN0aW9uLnRvdGFsIC8gMTAwKS50b0ZpeGVkKDIpfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBpZD1cInNoYXJlXCIgY2xhc3NOYW1lPVwiYmctaW52ZXJzZSByb3cgY29sbGFwc2UgdGV4dC13aGl0ZSBwYWRkaW5nLXRvcC0xMCBwYWRkaW5nLWJvdHRvbS01IG1hcmdpbi1ib3R0b20tMTVcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGFsaWduLWNlbnRlciBtYXJnaW4tYm90dG9tLTE1XCI+XHJcblx0XHRcdFx0XHRcdFNoYXJlIHlvdXIgdHJhbnNhY3Rpb25cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWUgPSBcImNvbC14cy0xMlwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpIGNsYXNzTmFtZT1cImZhIGZhLWZ3IGZhLWVudmVsb3BlIGZvbnQtc2l6ZS00MlwiIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHtzaG93VGV4dDpmYWxzZSxzaG93RW1haWw6dHJ1ZX0pfT48L2k+PGJyLz5FbWFpbFxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS1mdyBmYS1waG9uZSBmb250LXNpemUtNDJcIiBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7c2hvd1RleHQ6dHJ1ZSxzaG93RW1haWw6ZmFsc2V9KX0+PC9pPjxici8+VGV4dFxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHQodGhpcy5zdGF0ZS5zaG93RW1haWwgfHwgdGhpcy5zdGF0ZS5zaG93VGV4dCk/KFxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIG1hcmdpbi10b3AtMjAgbWFyZ2luLWJvdHRvbS0xMFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtOCBvZmZzZXQteHMtMVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0KHRoaXMuc3RhdGUuc2hvd0VtYWlsKT88aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJFbWFpbCBBZGRyZXNzXCIvPjo8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJQaG9uZSBOdW1iZXJcIi8+XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwibWFyZ2luLXRvcC01IGNvbC14cy0yIGJ0biBidG4taW5mbyBidG4tc21cIiBvbkNsaWNrPXt0aGlzLnNlbmRUcmFuc2FjdGlvbn0+U2VuZDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQpOjxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIG1hcmdpbi1ib3R0b20tMTVcIj48L2Rpdj5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHR7LyogPGRpdiBjbGFzc05hbWU9XCJyb3cgdmVydGljYWwtYWxpZ25cIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0PGEgaHJlZj1cImphdmFzY3JpcHQ6XCIgb25DbGljaz17dGhpcy5yZXR1cm5Qb2xpY3l9PlJldHVybiBQb2xpY3k8L2E+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj4gKi99XHJcblxyXG5cdFx0XHRcdDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZVwiPlxyXG5cdFx0XHRcdFx0PHRoZWFkPjx0cj48dGg+PC90aD48dGg+SXRlbTwvdGg+PHRoPlRvdGFsPC90aD48L3RyPjwvdGhlYWQ+XHJcblx0XHRcdFx0XHQ8dGJvZHk+XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHRyYW5zYWN0aW9uLkl0ZW1zLm1hcCgoaXRlbSwgaSk9PntcclxuXHRcdFx0XHRcdFx0XHRpZih0eXBlb2YgaXRlbS51bml0UHJpY2UgPT0gXCJ1bmRlZmluZWRcIikgdmFyIHVuaXRQcmljZSA9IFwiXCI7XHJcblx0XHRcdFx0XHRcdFx0ZWxzZSB2YXIgdW5pdFByaWNlID0gXCIkXCIgKyBpdGVtLnVuaXRQcmljZS8xMDA7XHJcblx0XHRcdFx0XHRcdFx0aWYodHlwZW9mIGl0ZW0ucXVhbnRpdHkgPT0gXCJ1bmRlZmluZWRcIikgdmFyIHF1YW50aXR5ID0gXCJcIjtcclxuXHRcdFx0XHRcdFx0XHRlbHNlIHZhciBxdWFudGl0eSA9IGl0ZW0ucXVhbnRpdHk7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGdyb3VwU3RhcnQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHR0cmFuc2FjdGlvbi5pdGVtR3JvdXBzLm1hcChmdW5jdGlvbihncm91cCl7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoZ3JvdXAuc3RhcnQgPT0gaXRlbS5zZXF1ZW5jZSkgZ3JvdXBTdGFydCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdFx0XHRcdDx0ciBjbGFzc05hbWU9eyhncm91cFN0YXJ0KT9cIm5ld1NlY3Rpb25cIjpcIlwifSBrZXk9e2l9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8dGQ+e3F1YW50aXR5fTwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDx0ZD57aXRlbS5kZXNjcmlwdGlvbn08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8dGQ+JHsoaXRlbS50b3RhbC8xMDApLnRvRml4ZWQoMil9PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdDwvdHI+XHJcblx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdDwvdGJvZHk+XHJcblx0XHRcdFx0PC90YWJsZT5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBwcm9tbzEgYWxpZ24tY2VudGVyXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMlwiPlxyXG5cdFx0XHRcdFx0XHRHZXQgYSBmcmVlIGRvbnV0IG9uIHlvdXIgbmV4dCB2aXNpdCEgPGJyLz5cclxuXHRcdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwicHJvbW9cIiBocmVmPVwiamF2YXNjcmlwdDpcIj5cclxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNtIGJ0bi1zZWNvbmRhcnkgbWFyZ2luLXRvcC0xMFwiIG9uQ2xpY2s9e3RoaXMuc2VuZENvdXBvbn0gZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cclxuXHRcdFx0XHRcdFx0XHRcdENsYWltIEhlcmVcclxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PC9hPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcblx0XHRcdFx0XHRcdDxzdmcgY2xhc3NOYW1lPVwibWFyZ2luLWF1dG8gZGlzcGxheS1ibG9ja1wiIGlkPVwiY29kZTEyOFwiPjwvc3ZnPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxNb2RhbCBuYW1lPVwicmV0dXJuTW9kYWxcIj5cclxuXHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYWxpZ24tY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJib2xkIHBhZGRpbmctYm90dG9tLTIwXCI+UmV0dXJuIFBvbGljeTwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdDxkaXY+UmV0dXJuIHN0dWZmIGluIDkwIGRheXMgYW5kIHlvdSBnb29kLjwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgcGFkZGluZy10b3AtMjBcIj5cclxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjb2wteHMtNiBvZmZzZXQteHMtMyBidG4gYnRuLWFwcC1wcmltYXJ5XCIgb25DbGljaz17dGhpcy5jbGVhckZvcm19IGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRHbyBCYWNrXHJcblx0XHRcdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9Nb2RhbD5cclxuXHRcdFx0XHQ8TW9kYWwgbmFtZT1cImNvdXBvbk1vZGFsXCI+XHJcblx0XHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYm9sZCBwYWRkaW5nLWJvdHRvbS0yMFwiPllvdXIgY291cG9uIGlzIG9uIGl0cyB3YXkhPC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PGRpdj5Zb3Ugc2hvdWxkIHJlY2VpdmUgeW91ciBjb3Vwb24gYnkgdGV4dCBzb29uITwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgcGFkZGluZy10b3AtMjBcIj5cclxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjb2wteHMtNiBvZmZzZXQteHMtMyBidG4gYnRuLWFwcC1wcmltYXJ5XCIgb25DbGljaz17dGhpcy5jbGVhckZvcm19IGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRHbyBCYWNrXHJcblx0XHRcdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9Nb2RhbD5cclxuICAgICAgICAgPC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuUmVhY3RET00ucmVuZGVyKChcclxuXHQ8ZGl2PlxyXG5cdFx0PExhbmRpbmcvPlxyXG5cdDwvZGl2PlxyXG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xyXG4iXX0=
