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
var ReactRouter = window.ReactRouter;
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
		var formattedDate = date.toLocaleString();

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
					{ className: 'col-xs-8' },
					_cdn.React.createElement('img', { className: 'logo', src: '/assets/logos/dunkin.jpg' })
				),
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-4 align-center' },
					_cdn.React.createElement(
						'button',
						{ type: 'button', 'data-toggle': 'collapse', 'data-target': '#exCollapsingNavbar', className: 'margin-right-10 btn btn-secondary btn-sm' },
						_cdn.React.createElement('i', { className: 'fa fa-bars' })
					),
					_cdn.React.createElement(
						'button',
						{ type: 'button', 'data-toggle': 'collapse', 'data-target': '#share', className: 'margin-left-10 btn btn-secondary btn-sm' },
						_cdn.React.createElement('i', { className: 'fa fa-share-alt' })
					)
				)
			),
			_cdn.React.createElement(
				'div',
				{ id: 'share', className: 'bg-inverse row collapse text-white padding-top-10 padding-bottom-5' },
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
					transaction.total / 100
				)
			),
			_cdn.React.createElement(
				'div',
				{ className: 'row margin-top-20 vertical-align' },
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
						{ type: 'button', className: 'col-xs-6 offset-xs-3 btn btn-sm btn-info', onClick: this.sendCoupon, 'data-dismiss': 'modal' },
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
								item.total / 100
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
							{ type: 'button', className: 'col-xs-6 offset-xs-3 btn btn-primary', onClick: this.clearForm, 'data-dismiss': 'modal' },
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
							{ type: 'button', className: 'col-xs-6 offset-xs-3 btn btn-primary', onClick: this.clearForm, 'data-dismiss': 'modal' },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGNkbi5qcyIsInNyY1xcY2xhc3Nlc1xcVXRpbGl0aWVzLmpzIiwic3JjXFxjb21wb25lbnRzXFxtb2RhbC5qcyIsInNyY1xcbGFuZGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBLElBQUksY0FBYyxZQUFsQjs7a0JBRWU7QUFDZCxjQUFhLFdBREM7QUFFZCxVQUFVLFlBQVU7QUFDbkIsTUFBRyxlQUFlLFlBQWxCLEVBQWdDLE9BQU8sNkJBQVAsQ0FBaEMsS0FDSyxPQUFPLHVCQUFQO0FBQ0wsRUFIUyxFQUZJO0FBTWQsVUFBVSxZQUFVO0FBQ25CLE1BQUcsZUFBZSxZQUFsQixFQUFnQyxPQUFPLDZCQUFQLENBQWhDLEtBQ0ssT0FBTyx1QkFBUDtBQUNMLEVBSFMsRUFOSTtBQVVkLGFBQVksNkJBVkU7QUFXZCxRQUFNO0FBQ0wsWUFBVSxrQ0FETDtBQUVMLFVBQVE7QUFGSDtBQVhRLEM7Ozs7Ozs7OztBQ0ZmLElBQUksSUFBSSxPQUFPLENBQWY7QUFDQSxJQUFJLFNBQVMsQ0FBYjtBQUNBLElBQUksUUFBUSxPQUFPLEtBQW5CO0FBQ0EsSUFBSSxXQUFXLE9BQU8sUUFBdEI7QUFDQSxJQUFJLGNBQWMsT0FBTyxXQUF6QjtBQUNBLElBQUksWUFBWSxPQUFPLFNBQXZCO1FBQ1MsQyxHQUFBLEM7UUFBRyxNLEdBQUEsTTtRQUFRLEssR0FBQSxLO1FBQU8sUSxHQUFBLFE7UUFBVSxXLEdBQUEsVztRQUFhLFMsR0FBQSxTOzs7Ozs7Ozs7O0FDTGxELElBQUksbUJBQW1CLFNBQW5CLGdCQUFtQixDQUFTLFFBQVQsRUFBbUI7QUFDekMsS0FBSSxRQUFRLE9BQU8sUUFBUCxDQUFnQixNQUFoQixDQUF1QixTQUF2QixDQUFpQyxDQUFqQyxDQUFaO0FBQ0EsS0FBSSxVQUFVLE1BQU0sS0FBTixDQUFZLEdBQVosQ0FBZDtBQUNBLEtB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b0JBQWY7QUFDQztBQUFBO0FBQUEsU0FBUSxNQUFLLFFBQWIsRUFBc0IsV0FBVSxzQ0FBaEMsRUFBdUUsU0FBUyxLQUFLLFNBQXJGLEVBQWdHLGdCQUFhLE9BQTdHO0FBQUE7QUFBQTtBQUREO0FBTEQ7QUFERDtBQTFISyxHQURQO0FBMElBO0FBek04QixDQUFsQixDQUFkOztBQTZNQSxjQUFTLE1BQVQsQ0FDQztBQUFBO0FBQUE7QUFDQywwQkFBQyxPQUFEO0FBREQsQ0FERCxFQUlHLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQUpIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG52YXIgZW52aXJvbm1lbnQgPSBcInByb2R1Y3Rpb25cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRlbnZpcm9ubWVudDogZW52aXJvbm1lbnQsXHJcblx0YXBpSG9zdDogKGZ1bmN0aW9uKCl7XHJcblx0XHRpZihlbnZpcm9ubWVudCA9PSBcInByb2R1Y3Rpb25cIikgcmV0dXJuIFwiaHR0cDovL2FwaXRlc3QuZmxlY3Rpbm8uY29tXCI7XHJcblx0XHRlbHNlIHJldHVybiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAxMFwiO1xyXG5cdH0oKSksXHJcblx0d2ViSG9zdDogKGZ1bmN0aW9uKCl7XHJcblx0XHRpZihlbnZpcm9ubWVudCA9PSBcInByb2R1Y3Rpb25cIikgcmV0dXJuIFwiaHR0cDovL3dlYnRlc3QuZmxlY3Rpbm8uY29tXCI7XHJcblx0XHRlbHNlIHJldHVybiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xyXG5cdH0oKSksXHJcblx0Z2F0ZXdheUtleTogXCJBVUI1akNrZHEzYjdrVjlEVFRkaVFsbE9SdjVcIixcclxuXHRhdXRoMDp7XHJcblx0XHRjbGllbnRJZDogXCIwU00wZ3JCVG9DSmpXR1ViQnRsWnVIaHlsQ3EyZFZ0M1wiLFxyXG5cdFx0ZG9tYWluOiBcImZsZWN0aW5vLmF1dGgwLmNvbVwiXHJcblx0fVxyXG59XHJcbiIsIlxyXG52YXIgJCA9IHdpbmRvdy4kO1xyXG52YXIgalF1ZXJ5ID0gJDtcclxudmFyIFJlYWN0ID0gd2luZG93LlJlYWN0O1xyXG52YXIgUmVhY3RET00gPSB3aW5kb3cuUmVhY3RET007XHJcbnZhciBSZWFjdFJvdXRlciA9IHdpbmRvdy5SZWFjdFJvdXRlcjtcclxudmFyIEF1dGgwTG9jayA9IHdpbmRvdy5BdXRoMExvY2s7XHJcbmV4cG9ydCB7ICQsIGpRdWVyeSwgUmVhY3QsIFJlYWN0RE9NLCBSZWFjdFJvdXRlciwgQXV0aDBMb2NrIH1cclxuIiwiXHJcblxyXG52YXIgZ2V0UXVlcnlWYXJpYWJsZSA9IGZ1bmN0aW9uKHZhcmlhYmxlKSB7XHJcblx0dmFyIHF1ZXJ5ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSk7XHJcblx0dmFyIHByZVZhcnMgPSBxdWVyeS5zcGxpdCgnLycpO1xyXG5cdHZhciB2YXJzID0gcHJlVmFyc1swXS5zcGxpdCgnJicpO1xyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIHBhaXIgPSB2YXJzW2ldLnNwbGl0KCc9Jyk7XHJcblx0XHRpZiAoZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pID09IHZhcmlhYmxlKSB7XHJcblx0XHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGNvbnNvbGUubG9nKCdRdWVyeSB2YXJpYWJsZSAlcyBub3QgZm91bmQnLCB2YXJpYWJsZSk7XHJcbn1cclxuXHJcbnZhciBpc1ZhbGlkID0ge1xyXG5cdGVtYWlsOiBmdW5jdGlvbihlbWFpbCkge1xyXG5cdFx0dmFyIHJlID0gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcblx0XHRyZXR1cm4gcmUudGVzdChlbWFpbCk7XHJcblx0fSxcclxuXHRwaG9uZTogZnVuY3Rpb24ocGhvbmUpIHtcclxuXHRcdHZhciBzdHJpcFBob25lID0gcGhvbmUucmVwbGFjZSgvXFxEL2csJycpO1xyXG5cdFx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID49IDEwKSByZXR1cm4gdHJ1ZTtcclxuXHRcdGVsc2UgZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG52YXIgZm9ybWF0UGhvbmUxMCA9IGZ1bmN0aW9uKHBob25lKXtcclxuXHR2YXIgc3RyaXBQaG9uZSA9IHBob25lLnJlcGxhY2UoL1xcRC9nLCcnKTtcclxuXHR2YXIgZGFzaCA9IFwiXCI7XHJcblx0dmFyIG9wZW5QYXJlbiA9IFwiXCI7XHJcblx0dmFyIGNsb3NlZFBhcmVuID0gXCJcIjtcclxuXHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPiAwKSBvcGVuUGFyZW4gPSBcIihcIjtcclxuXHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPiAzKSBjbG9zZWRQYXJlbiA9IFwiKVwiO1xyXG5cdGlmIChzdHJpcFBob25lLmxlbmd0aCA+IDYpIGRhc2ggPSBcIi1cIjtcclxuXHR2YXIgZm9ybWF0dGVkUGhvbmUgPSBvcGVuUGFyZW4gKyBzdHJpcFBob25lLnN1YnN0cmluZygwLDMpICsgY2xvc2VkUGFyZW4gKyBzdHJpcFBob25lLnN1YnN0cmluZygzLDYpICsgZGFzaCArIHN0cmlwUGhvbmUuc3Vic3RyaW5nKDYsMTApO1xyXG5cdHJldHVybiBmb3JtYXR0ZWRQaG9uZTtcclxufVxyXG5cclxudmFyIGdldFRpbWV6b25lT2Zmc2V0ID0gZnVuY3Rpb24oKXtcclxuXHRmdW5jdGlvbiBwYWQobnVtYmVyLCBsZW5ndGgpe1xyXG5cdFx0IHZhciBzdHIgPSBcIlwiICsgbnVtYmVyXHJcblx0XHQgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHtcclxuXHRcdFx0ICBzdHIgPSAnMCcrc3RyXHJcblx0XHQgfVxyXG5cdFx0IHJldHVybiBzdHJcclxuXHR9XHJcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdHZhciBvZmZzZXQgPSBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XHJcblx0cmV0dXJuICgob2Zmc2V0PDA/ICcrJzonLScpICsgcGFkKHBhcnNlSW50KE1hdGguYWJzKG9mZnNldC82MCkpLCAyKSsgcGFkKE1hdGguYWJzKG9mZnNldCU2MCksIDIpKTtcclxufVxyXG5cclxudmFyIGNyZWF0ZVRpbWVEYXRlID0gZnVuY3Rpb24oZGF0ZSwgdGltZSl7XHJcblx0dmFyIG1pbGVzdG9uZURhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuXHR2YXIgc3RyU3BsaXQgPSB0aW1lLnNwbGl0KCc6Jyk7XHJcblx0dmFyIGhvdXIgPSBwYXJzZUludChzdHJTcGxpdFswXSk7XHJcblx0dmFyIG1pbnV0ZSA9IHBhcnNlSW50KHN0clNwbGl0WzFdLnN1YnN0cmluZygwLDIpKTtcclxuXHR2YXIgc2V0ID0gc3RyU3BsaXRbMV0uc3Vic3RyaW5nKDIsNCk7XHJcblx0aWYgKGhvdXIgPT09IDEyKSB7XHJcblx0XHRpZiAoc2V0ID09PSBcImFtXCIpIGhvdXIgPSAwO1xyXG5cdFx0ZWxzZSBob3VyID0gMTI7XHJcblx0fSBlbHNlIGlmIChzZXQgPT09IFwicG1cIikgaG91ciArPSAxMjtcclxuXHRtaWxlc3RvbmVEYXRlLnNldEhvdXJzKGhvdXIpO1xyXG5cdG1pbGVzdG9uZURhdGUuc2V0TWludXRlcyhtaW51dGUpO1xyXG5cdG1pbGVzdG9uZURhdGUuc2V0TWludXRlcyhtaWxlc3RvbmVEYXRlLmdldE1pbnV0ZXMoKSAtICBtaWxlc3RvbmVEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkpO1xyXG5cdHJldHVybiBtaWxlc3RvbmVEYXRlLnRvSVNPU3RyaW5nKCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBnZXRRdWVyeVZhcmlhYmxlLCBpc1ZhbGlkLCBmb3JtYXRQaG9uZTEwLCBnZXRUaW1lem9uZU9mZnNldCwgY3JlYXRlVGltZURhdGUgfVxyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cIm1vZGFsXCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgaWQ9e3RoaXMucHJvcHMubmFtZX0+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInZlcnRpY2FsLWFsaWdubWVudC1oZWxwZXJcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgdmVydGljYWwtYWxpZ24tY2VudGVyXCIgcm9sZT1cImRvY3VtZW50XCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMlwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdERPTSwgUmVhY3QgfSBmcm9tICcuL2NkbidcclxuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnXHJcbmltcG9ydCBNb2RhbCBmcm9tICcuL2NvbXBvbmVudHMvbW9kYWwnXHJcbmltcG9ydCB7IGdldFF1ZXJ5VmFyaWFibGUgfSBmcm9tICcuL2NsYXNzZXMvVXRpbGl0aWVzJ1xyXG5cclxudmFyIExhbmRpbmcgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR0cmFuc2FjdGlvbjogbnVsbCxcclxuXHRcdFx0c2hvd0VtYWlsOiBmYWxzZSxcclxuXHRcdFx0c2hvd1Bob25lOiBmYWxzZVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xyXG5cdFx0JC5nZXQoY29uZmlnLmFwaUhvc3QgKyBcIi92MS90cmFuc2FjdGlvbi9cIiArIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdChcIi9cIilbMl0pXHJcblx0XHQudGhlbigoZGF0YSk9PntcclxuXHRcdFx0ZGF0YS5JdGVtcy5zb3J0KGZ1bmN0aW9uKGEsYil7XHJcblx0XHRcdFx0aWYoYS5zZXF1ZW5jZSA+IGIuc2VxdWVuY2UpIHJldHVybiAxO1xyXG5cdFx0XHRcdGVsc2UgcmV0dXJuIC0xO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7dHJhbnNhY3Rpb246ZGF0YX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRKc0JhcmNvZGUoXCIjY29kZTEyOFwiLCBcIjEyMzQ1Njc4OTAxMjNcIiwge2Zvcm1hdDogXCJpdGYxNFwifSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRzZW5kVHJhbnNhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRjb25zb2xlLmxvZyhcIlNlbnQhXCIpXHJcblx0fSxcclxuXHRzZW5kQ291cG9uOiBmdW5jdGlvbigpe1xyXG5cdFx0alF1ZXJ5KCcjY291cG9uTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG5cdH0sXHJcblx0cmV0dXJuUG9saWN5OiBmdW5jdGlvbigpe1xyXG5cdFx0alF1ZXJ5KCcjcmV0dXJuTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHZhciB0cmFuc2FjdGlvbiA9IHRoaXMuc3RhdGUudHJhbnNhY3Rpb247XHJcblx0XHRpZih0cmFuc2FjdGlvbiA9PT0gbnVsbCkgcmV0dXJuICg8ZGl2PkxvYWRpbmcuLi48L2Rpdj4pO1xyXG5cdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKHRyYW5zYWN0aW9uLnRyYW5zYWN0ZWRBdCkpO1xyXG5cdFx0dmFyIGZvcm1hdHRlZERhdGUgPSBkYXRlLnRvTG9jYWxlU3RyaW5nKCk7XHJcblxyXG5cdFx0dmFyIGNvbnRhY3RJdGVtcyA9IFtdO1xyXG5cdFx0dmFyIGZhSWNvbnMgPSB7XHJcblx0XHRcdGZhY2Vib29rOlwiZmFjZWJvb2tcIixcclxuXHRcdFx0cGhvbmU6IFwicGhvbmVcIixcclxuXHRcdFx0d2ViOiBcImdsb2JlXCIsXHJcblx0XHRcdGdvb2dsZVBsdXM6IFwiZ29vZ2xlLXBsdXNcIixcclxuXHRcdFx0cGhvbmU6IFwicGhvbmVcIixcclxuXHRcdFx0ZW1haWw6IFwiZW52ZWxvcGVcIixcclxuXHRcdFx0aW5zdGFncmFtOiBcImluc3RhZ3JhbVwiLFxyXG5cdFx0XHRwaW50ZXJlc3Q6IFwicGludGVyZXN0LXBcIixcclxuXHRcdFx0dHdpdHRlcjogXCJ0d2l0dGVyXCJcclxuXHRcdH1cclxuXHJcblx0XHR0cmFuc2FjdGlvbi5jb250YWN0Lm1hcChmdW5jdGlvbihjb250YWN0LGkpe1xyXG5cdFx0XHR2YXIgcHJlVmFsdWUgPSBjb250YWN0LnZhbHVlO1xyXG5cdFx0XHRpZihjb250YWN0LnR5cGUgPT0gXCJlbWFpbFwiKSBjb250YWN0LnZhbHVlID0gXCJtYWlsdG86XCIgKyBwcmVWYWx1ZTtcclxuXHRcdFx0aWYoY29udGFjdC50eXBlID09IFwicGhvbmVcIikgY29udGFjdC52YWx1ZSA9IFwidGVsOlwiICsgcHJlVmFsdWU7XHJcblx0XHRcdGNvbnRhY3RJdGVtcy5wdXNoKFxyXG5cdFx0XHRcdDxhIGtleT17aX0gaHJlZj17Y29udGFjdC52YWx1ZX0gY2xhc3NOYW1lPVwiY29sb3Itd2hpdGVcIj5cclxuXHRcdFx0XHRcdDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW0gYmctaW52ZXJzZVwiPlxyXG5cdFx0XHRcdFx0XHR7Y29udGFjdC5kZXNjcmlwdGlvbn1cclxuXHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPXtcInZlcnRpY2FsLWFsaWduLW1pZGRsZSBmbG9hdC1yaWdodCBmYSBmYS1mdyBsaW5lLWhlaWdodC1pbmhlcml0IGZhLVwiICsgZmFJY29uc1tjb250YWN0LnR5cGVdfT48L2k+XHJcblx0XHRcdFx0XHRcdHsoY29udGFjdC50eXBlID09IFwicGhvbmVcIiB8fCBjb250YWN0LnR5cGUgPT0gXCJlbWFpbFwiKT88ZGl2IGNsYXNzTmFtZT1cInRleHQtbXV0ZWQgbm93cmFwXCI+e3ByZVZhbHVlfTwvZGl2Pjo8ZGl2PjwvZGl2Pn1cclxuXHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHQpO1xyXG5cdFx0fSlcclxuXHJcblx0XHRyZXR1cm4gKFxyXG4gICAgICAgICA8ZGl2IGlkPVwibGFuZGluZ1wiIGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sbGFwc2UgbWVudSBvdmVyZmxvdy1zY3JvbGwteSBwb3NpdGlvbi1maXhlZFwiIGlkPVwiZXhDb2xsYXBzaW5nTmF2YmFyXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhlaWdodC0xMDB2aCBiZy1pbnZlcnNlIHRleHQtd2hpdGVcIj5cclxuXHRcdFx0XHRcdFx0PGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSBiZy1pbnZlcnNlIG1lbnVIZWFkXCI+Q29ubmVjdCB3aXRoIHt0cmFuc2FjdGlvbi5LZXkubmFtZX08L2xpPlxyXG5cdFx0XHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwibGlzdC1ncm91cCBiZy1pbnZlcnNlXCI+XHJcblx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGFjdEl0ZW1zLm1hcChmdW5jdGlvbihpdGVtKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGl0ZW07XHJcblx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0PC91bD5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IHZlcnRpY2FsLWFsaWduXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy04XCI+XHJcblx0XHRcdFx0XHRcdDxpbWcgY2xhc3NOYW1lPVwibG9nb1wiIHNyYz1cIi9hc3NldHMvbG9nb3MvZHVua2luLmpwZ1wiLz5cclxuXHRcdFx0XHRcdFx0ey8qIHt0cmFuc2FjdGlvbi5LZXkubmFtZX0gKi99XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTQgYWxpZ24tY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiNleENvbGxhcHNpbmdOYXZiYXJcIiBjbGFzc05hbWU9XCJtYXJnaW4tcmlnaHQtMTAgYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtYmFyc1wiPjwvaT48L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiI3NoYXJlXCIgY2xhc3NOYW1lPVwibWFyZ2luLWxlZnQtMTAgYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtXCI+PGkgY2xhc3NOYW1lPVwiZmEgZmEtc2hhcmUtYWx0XCI+PC9pPjwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgaWQ9XCJzaGFyZVwiIGNsYXNzTmFtZT1cImJnLWludmVyc2Ugcm93IGNvbGxhcHNlIHRleHQtd2hpdGUgcGFkZGluZy10b3AtMTAgcGFkZGluZy1ib3R0b20tNVwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgYWxpZ24tY2VudGVyIG1hcmdpbi1ib3R0b20tMTVcIj5cclxuXHRcdFx0XHRcdFx0U2hhcmUgeW91ciB0cmFuc2FjdGlvblxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZSA9IFwiY29sLXhzLTEyXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgYWxpZ24tY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPVwiZmEgZmEtZncgZmEtZW52ZWxvcGUgZm9udC1zaXplLTQyXCIgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3Nob3dUZXh0OmZhbHNlLHNob3dFbWFpbDp0cnVlfSl9PjwvaT48YnIvPkVtYWlsXHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpIGNsYXNzTmFtZT1cImZhIGZhLWZ3IGZhLXBob25lIGZvbnQtc2l6ZS00MlwiIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHtzaG93VGV4dDp0cnVlLHNob3dFbWFpbDpmYWxzZX0pfT48L2k+PGJyLz5UZXh0XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdCh0aGlzLnN0YXRlLnNob3dFbWFpbCB8fCB0aGlzLnN0YXRlLnNob3dUZXh0KT8oXHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgbWFyZ2luLXRvcC0yMCBtYXJnaW4tYm90dG9tLTEwXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy04IG9mZnNldC14cy0xXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQodGhpcy5zdGF0ZS5zaG93RW1haWwpPzxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIkVtYWlsIEFkZHJlc3NcIi8+OjxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlBob25lIE51bWJlclwiLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJtYXJnaW4tdG9wLTUgY29sLXhzLTIgYnRuIGJ0bi1pbmZvIGJ0bi1zbVwiIG9uQ2xpY2s9e3RoaXMuc2VuZFRyYW5zYWN0aW9ufT5TZW5kPC9idXR0b24+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdCk6PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgbWFyZ2luLWJvdHRvbS0xNVwiPjwvZGl2PlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IGFjdGl2aXR5LWhlYWRlclwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtOCBkYXRlXCI+XHJcblx0XHRcdFx0XHRcdHtmb3JtYXR0ZWREYXRlfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00IHRvdGFsIGFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHQke3RyYW5zYWN0aW9uLnRvdGFsIC8gMTAwfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgbWFyZ2luLXRvcC0yMCB2ZXJ0aWNhbC1hbGlnblwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG5cdFx0XHRcdFx0XHR7dHJhbnNhY3Rpb24uYWRkcmVzcy5saW5lMX17KHR5cGVvZiB0cmFuc2FjdGlvbi5hZGRyZXNzLmxpbmUyID09IFwidW5kZWZpbmVkXCIpP1wiXCI6dHJhbnNhY3Rpb24uYWRkcmVzcy5saW5lMn08YnIvPlxyXG5cdFx0XHRcdFx0XHR7dHJhbnNhY3Rpb24uYWRkcmVzcy5jaXR5fSwge3RyYW5zYWN0aW9uLmFkZHJlc3Muc3RhdGV9IHt0cmFuc2FjdGlvbi5hZGRyZXNzLnBvc3RhbENvZGV9XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgYWxpZ24tcmlnaHRcIj5cclxuXHRcdFx0XHRcdFx0PGEgaHJlZj1cImphdmFzY3JpcHQ6XCIgb25DbGljaz17dGhpcy5yZXR1cm5Qb2xpY3l9PlJldHVybiBQb2xpY3k8L2E+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBwcm9tbzEgYWxpZ24tY2VudGVyIG1hcmdpbi10b3AtMTBcIj5cclxuXHRcdFx0XHRcdEdldCBhIGZyZWUgZG9udXQgb24geW91ciBuZXh0IHZpc2l0ISA8YnIvPlxyXG5cdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwicHJvbW9cIiBocmVmPVwiamF2YXNjcmlwdDpcIj5cclxuXHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY29sLXhzLTYgb2Zmc2V0LXhzLTMgYnRuIGJ0bi1zbSBidG4taW5mb1wiIG9uQ2xpY2s9e3RoaXMuc2VuZENvdXBvbn0gZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cclxuXHRcdFx0XHRcdFx0XHRDbGljayBoZXJlIHRvIGNsYWltXHJcblx0XHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0PC9hPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZVwiPlxyXG5cdFx0XHRcdFx0PHRoZWFkPjx0cj48dGg+PC90aD48dGg+SXRlbTwvdGg+PHRoPlRvdGFsPC90aD48L3RyPjwvdGhlYWQ+XHJcblx0XHRcdFx0XHQ8dGJvZHk+XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHRyYW5zYWN0aW9uLkl0ZW1zLm1hcCgoaXRlbSwgaSk9PntcclxuXHRcdFx0XHRcdFx0XHRpZih0eXBlb2YgaXRlbS51bml0UHJpY2UgPT0gXCJ1bmRlZmluZWRcIikgdmFyIHVuaXRQcmljZSA9IFwiXCI7XHJcblx0XHRcdFx0XHRcdFx0ZWxzZSB2YXIgdW5pdFByaWNlID0gXCIkXCIgKyBpdGVtLnVuaXRQcmljZS8xMDA7XHJcblx0XHRcdFx0XHRcdFx0aWYodHlwZW9mIGl0ZW0ucXVhbnRpdHkgPT0gXCJ1bmRlZmluZWRcIikgdmFyIHF1YW50aXR5ID0gXCJcIjtcclxuXHRcdFx0XHRcdFx0XHRlbHNlIHZhciBxdWFudGl0eSA9IGl0ZW0ucXVhbnRpdHk7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGdyb3VwU3RhcnQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHR0cmFuc2FjdGlvbi5pdGVtR3JvdXBzLm1hcChmdW5jdGlvbihncm91cCl7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAoZ3JvdXAuc3RhcnQgPT0gaXRlbS5zZXF1ZW5jZSkgZ3JvdXBTdGFydCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdFx0XHRcdDx0ciBjbGFzc05hbWU9eyhncm91cFN0YXJ0KT9cIm5ld1NlY3Rpb25cIjpcIlwifSBrZXk9e2l9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8dGQ+e3F1YW50aXR5fTwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDx0ZD57aXRlbS5kZXNjcmlwdGlvbn08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8dGQ+JHtpdGVtLnRvdGFsLzEwMH08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0PC90Ym9keT5cclxuXHRcdFx0XHQ8L3RhYmxlPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IGZvb3RlciBtYXJnaW4tYm90dG9tLTIwXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IHByb21vMVwiPlxyXG5cdFx0XHRcdFx0WjFcclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBwcm9tbzJcIj5cclxuXHRcdFx0XHRcdFoyXHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0XHQ8c3ZnIGNsYXNzTmFtZT1cIm1hcmdpbi1hdXRvIGRpc3BsYXktYmxvY2tcIiBpZD1cImNvZGUxMjhcIj48L3N2Zz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8TW9kYWwgbmFtZT1cInJldHVybk1vZGFsXCI+XHJcblx0XHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYm9sZCBwYWRkaW5nLWJvdHRvbS0yMFwiPlJldHVybiBQb2xpY3k8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2PlJldHVybiBzdHVmZiBpbiA5MCBkYXlzIGFuZCB5b3UgZ29vZC48L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IHBhZGRpbmctdG9wLTIwXCI+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY29sLXhzLTYgb2Zmc2V0LXhzLTMgYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17dGhpcy5jbGVhckZvcm19IGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRHbyBCYWNrXHJcblx0XHRcdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9Nb2RhbD5cclxuXHRcdFx0XHQ8TW9kYWwgbmFtZT1cImNvdXBvbk1vZGFsXCI+XHJcblx0XHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYm9sZCBwYWRkaW5nLWJvdHRvbS0yMFwiPllvdXIgY291cG9uIGlzIG9uIGl0cyB3YXkhPC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PGRpdj5Zb3Ugc2hvdWxkIHJlY2VpdmUgeW91ciBjb3Vwb24gYnkgdGV4dCBzb29uITwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgcGFkZGluZy10b3AtMjBcIj5cclxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjb2wteHMtNiBvZmZzZXQteHMtMyBidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLmNsZWFyRm9ybX0gZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cclxuXHRcdFx0XHRcdFx0XHRcdEdvIEJhY2tcclxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L01vZGFsPlxyXG4gICAgICAgICA8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuXHJcblxyXG5SZWFjdERPTS5yZW5kZXIoKFxyXG5cdDxkaXY+XHJcblx0XHQ8TGFuZGluZy8+XHJcblx0PC9kaXY+XHJcbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XHJcbiJdfQ==
