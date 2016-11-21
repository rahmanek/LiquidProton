(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var environment = "development";
exports.default = {
	environment: environment,
	apiHost: function () {
		if (environment == "development") return "http://apitest.flectino.com";else return "http://localhost:3010";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGNkbi5qcyIsInNyY1xcY2xhc3Nlc1xcVXRpbGl0aWVzLmpzIiwic3JjXFxjb21wb25lbnRzXFxtb2RhbC5qcyIsInNyY1xcbGFuZGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBLElBQUksY0FBYyxhQUFsQjtrQkFDZTtBQUNkLGNBQWEsV0FEQztBQUVkLFVBQVUsWUFBVTtBQUNuQixNQUFHLGVBQWUsYUFBbEIsRUFBaUMsT0FBTyw2QkFBUCxDQUFqQyxLQUNLLE9BQU8sdUJBQVA7QUFDTCxFQUhTLEVBRkk7QUFNZCxVQUFVLFlBQVU7QUFDbkIsTUFBRyxlQUFlLFlBQWxCLEVBQWdDLE9BQU8sNkJBQVAsQ0FBaEMsS0FDSyxPQUFPLHVCQUFQO0FBQ0wsRUFIUyxFQU5JO0FBVWQsUUFBTTtBQUNMLFlBQVUsa0NBREw7QUFFTCxVQUFRO0FBRkg7QUFWUSxDOzs7Ozs7Ozs7QUNEZixJQUFJLElBQUksT0FBTyxDQUFmO0FBQ0EsSUFBSSxTQUFTLENBQWI7QUFDQSxJQUFJLFFBQVEsT0FBTyxLQUFuQjtBQUNBLElBQUksV0FBVyxPQUFPLFFBQXRCO0FBQ0EsSUFBSSxjQUFjLE9BQU8sV0FBekI7QUFDQSxJQUFJLFlBQVksT0FBTyxTQUF2QjtBQUNBLElBQUksU0FBUyxPQUFPLENBQXBCO1FBQ1MsQyxHQUFBLEM7UUFBRyxNLEdBQUEsTTtRQUFRLEssR0FBQSxLO1FBQU8sUSxHQUFBLFE7UUFBVSxXLEdBQUEsVztRQUFhLFMsR0FBQSxTO1FBQVcsTSxHQUFBLE07Ozs7Ozs7Ozs7QUNON0QsSUFBSSxtQkFBbUIsU0FBbkIsZ0JBQW1CLENBQVMsUUFBVCxFQUFtQjtBQUN6QyxLQUFJLFFBQVEsT0FBTyxRQUFQLENBQWdCLE1BQWhCLENBQXVCLFNBQXZCLENBQWlDLENBQWpDLENBQVo7QUFDQSxLQUFJLFVBQVUsTUFBTSxLQUFO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dCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG52YXIgZW52aXJvbm1lbnQgPSBcImRldmVsb3BtZW50XCI7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRlbnZpcm9ubWVudDogZW52aXJvbm1lbnQsXHJcblx0YXBpSG9zdDogKGZ1bmN0aW9uKCl7XHJcblx0XHRpZihlbnZpcm9ubWVudCA9PSBcImRldmVsb3BtZW50XCIpIHJldHVybiBcImh0dHA6Ly9hcGl0ZXN0LmZsZWN0aW5vLmNvbVwiO1xyXG5cdFx0ZWxzZSByZXR1cm4gXCJodHRwOi8vbG9jYWxob3N0OjMwMTBcIjtcclxuXHR9KCkpLFxyXG5cdHdlYkhvc3Q6IChmdW5jdGlvbigpe1xyXG5cdFx0aWYoZW52aXJvbm1lbnQgPT0gXCJwcm9kdWN0aW9uXCIpIHJldHVybiBcImh0dHA6Ly93ZWJ0ZXN0LmZsZWN0aW5vLmNvbVwiO1xyXG5cdFx0ZWxzZSByZXR1cm4gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcclxuXHR9KCkpLFxyXG5cdGF1dGgwOntcclxuXHRcdGNsaWVudElkOiBcIjBTTTBnckJUb0NKaldHVWJCdGxadUhoeWxDcTJkVnQzXCIsXHJcblx0XHRkb21haW46IFwiZmxlY3Rpbm8uYXV0aDAuY29tXCJcclxuXHR9XHJcbn1cclxuIiwiXHJcbnZhciAkID0gd2luZG93LiQ7XHJcbnZhciBqUXVlcnkgPSAkO1xyXG52YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3Q7XHJcbnZhciBSZWFjdERPTSA9IHdpbmRvdy5SZWFjdERPTTtcclxudmFyIFJlYWN0Um91dGVyID0gd2luZG93LlJlYWN0Um91dGVyO1xyXG52YXIgQXV0aDBMb2NrID0gd2luZG93LkF1dGgwTG9jaztcclxudmFyIExvZGFzaCA9IHdpbmRvdy5fO1xyXG5leHBvcnQgeyAkLCBqUXVlcnksIFJlYWN0LCBSZWFjdERPTSwgUmVhY3RSb3V0ZXIsIEF1dGgwTG9jaywgTG9kYXNoIH1cclxuIiwiXHJcblxyXG52YXIgZ2V0UXVlcnlWYXJpYWJsZSA9IGZ1bmN0aW9uKHZhcmlhYmxlKSB7XHJcblx0dmFyIHF1ZXJ5ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSk7XHJcblx0dmFyIHByZVZhcnMgPSBxdWVyeS5zcGxpdCgnLycpO1xyXG5cdHZhciB2YXJzID0gcHJlVmFyc1swXS5zcGxpdCgnJicpO1xyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdmFycy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIHBhaXIgPSB2YXJzW2ldLnNwbGl0KCc9Jyk7XHJcblx0XHRpZiAoZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pID09IHZhcmlhYmxlKSB7XHJcblx0XHRcdHJldHVybiBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGNvbnNvbGUubG9nKCdRdWVyeSB2YXJpYWJsZSAlcyBub3QgZm91bmQnLCB2YXJpYWJsZSk7XHJcbn1cclxuXHJcbnZhciBpc1ZhbGlkID0ge1xyXG5cdGVtYWlsOiBmdW5jdGlvbihlbWFpbCkge1xyXG5cdFx0dmFyIHJlID0gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XHJcblx0XHRyZXR1cm4gcmUudGVzdChlbWFpbCk7XHJcblx0fSxcclxuXHRwaG9uZTogZnVuY3Rpb24ocGhvbmUpIHtcclxuXHRcdHZhciBzdHJpcFBob25lID0gcGhvbmUucmVwbGFjZSgvXFxEL2csJycpO1xyXG5cdFx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID49IDEwKSByZXR1cm4gdHJ1ZTtcclxuXHRcdGVsc2UgZmFsc2U7XHJcblx0fVxyXG59XHJcblxyXG52YXIgZm9ybWF0UGhvbmUxMCA9IGZ1bmN0aW9uKHBob25lKXtcclxuXHR2YXIgc3RyaXBQaG9uZSA9IHBob25lLnJlcGxhY2UoL1xcRC9nLCcnKTtcclxuXHR2YXIgZGFzaCA9IFwiXCI7XHJcblx0dmFyIG9wZW5QYXJlbiA9IFwiXCI7XHJcblx0dmFyIGNsb3NlZFBhcmVuID0gXCJcIjtcclxuXHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPiAwKSBvcGVuUGFyZW4gPSBcIihcIjtcclxuXHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPiAzKSBjbG9zZWRQYXJlbiA9IFwiKVwiO1xyXG5cdGlmIChzdHJpcFBob25lLmxlbmd0aCA+IDYpIGRhc2ggPSBcIi1cIjtcclxuXHR2YXIgZm9ybWF0dGVkUGhvbmUgPSBvcGVuUGFyZW4gKyBzdHJpcFBob25lLnN1YnN0cmluZygwLDMpICsgY2xvc2VkUGFyZW4gKyBzdHJpcFBob25lLnN1YnN0cmluZygzLDYpICsgZGFzaCArIHN0cmlwUGhvbmUuc3Vic3RyaW5nKDYsMTApO1xyXG5cdHJldHVybiBmb3JtYXR0ZWRQaG9uZTtcclxufVxyXG5cclxudmFyIGdldFRpbWV6b25lT2Zmc2V0ID0gZnVuY3Rpb24oKXtcclxuXHRmdW5jdGlvbiBwYWQobnVtYmVyLCBsZW5ndGgpe1xyXG5cdFx0IHZhciBzdHIgPSBcIlwiICsgbnVtYmVyXHJcblx0XHQgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHtcclxuXHRcdFx0ICBzdHIgPSAnMCcrc3RyXHJcblx0XHQgfVxyXG5cdFx0IHJldHVybiBzdHJcclxuXHR9XHJcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdHZhciBvZmZzZXQgPSBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XHJcblx0cmV0dXJuICgob2Zmc2V0PDA/ICcrJzonLScpICsgcGFkKHBhcnNlSW50KE1hdGguYWJzKG9mZnNldC82MCkpLCAyKSsgcGFkKE1hdGguYWJzKG9mZnNldCU2MCksIDIpKTtcclxufVxyXG5cclxudmFyIGNyZWF0ZVRpbWVEYXRlID0gZnVuY3Rpb24oZGF0ZSwgdGltZSl7XHJcblx0dmFyIG1pbGVzdG9uZURhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuXHR2YXIgc3RyU3BsaXQgPSB0aW1lLnNwbGl0KCc6Jyk7XHJcblx0dmFyIGhvdXIgPSBwYXJzZUludChzdHJTcGxpdFswXSk7XHJcblx0dmFyIG1pbnV0ZSA9IHBhcnNlSW50KHN0clNwbGl0WzFdLnN1YnN0cmluZygwLDIpKTtcclxuXHR2YXIgc2V0ID0gc3RyU3BsaXRbMV0uc3Vic3RyaW5nKDIsNCk7XHJcblx0aWYgKGhvdXIgPT09IDEyKSB7XHJcblx0XHRpZiAoc2V0ID09PSBcImFtXCIpIGhvdXIgPSAwO1xyXG5cdFx0ZWxzZSBob3VyID0gMTI7XHJcblx0fSBlbHNlIGlmIChzZXQgPT09IFwicG1cIikgaG91ciArPSAxMjtcclxuXHRtaWxlc3RvbmVEYXRlLnNldEhvdXJzKGhvdXIpO1xyXG5cdG1pbGVzdG9uZURhdGUuc2V0TWludXRlcyhtaW51dGUpO1xyXG5cdG1pbGVzdG9uZURhdGUuc2V0TWludXRlcyhtaWxlc3RvbmVEYXRlLmdldE1pbnV0ZXMoKSAtICBtaWxlc3RvbmVEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkpO1xyXG5cdHJldHVybiBtaWxlc3RvbmVEYXRlLnRvSVNPU3RyaW5nKCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgeyBnZXRRdWVyeVZhcmlhYmxlLCBpc1ZhbGlkLCBmb3JtYXRQaG9uZTEwLCBnZXRUaW1lem9uZU9mZnNldCwgY3JlYXRlVGltZURhdGUgfVxyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cIm1vZGFsXCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgaWQ9e3RoaXMucHJvcHMubmFtZX0+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInZlcnRpY2FsLWFsaWdubWVudC1oZWxwZXJcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgdmVydGljYWwtYWxpZ24tY2VudGVyXCIgcm9sZT1cImRvY3VtZW50XCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG59KTtcclxuIiwiaW1wb3J0IHsgUmVhY3RET00sIFJlYWN0IH0gZnJvbSAnLi9jZG4nXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xyXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi9jb21wb25lbnRzL21vZGFsJ1xyXG5pbXBvcnQgeyBnZXRRdWVyeVZhcmlhYmxlIH0gZnJvbSAnLi9jbGFzc2VzL1V0aWxpdGllcydcclxuXHJcbnZhciBMYW5kaW5nID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dHJhbnNhY3Rpb246IG51bGwsXHJcblx0XHRcdHNob3dFbWFpbDogZmFsc2UsXHJcblx0XHRcdHNob3dQaG9uZTogZmFsc2UsXHJcblx0XHRcdG5hdmJhcjogZmFsc2UsXHJcblx0XHRcdHNoYXJlOiBmYWxzZVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKXtcclxuXHRcdCQuZ2V0KGNvbmZpZy5hcGlIb3N0ICsgXCIvdjEvdHJhbnNhY3Rpb24vXCIgKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoXCIvXCIpWzJdKVxyXG5cdFx0LnRoZW4oKGRhdGEpPT57XHJcblx0XHRcdGRhdGEuSXRlbXMuc29ydChmdW5jdGlvbihhLGIpe1xyXG5cdFx0XHRcdGlmKGEuc2VxdWVuY2UgPiBiLnNlcXVlbmNlKSByZXR1cm4gMTtcclxuXHRcdFx0XHRlbHNlIHJldHVybiAtMTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3RyYW5zYWN0aW9uOmRhdGF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0SnNCYXJjb2RlKFwiI2NvZGUxMjhcIiwgXCIxMjM0NTY3ODkwMTIzXCIsIHtmb3JtYXQ6IFwiaXRmMTRcIn0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0c2VuZFRyYW5zYWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0Y29uc29sZS5sb2coXCJTZW50IVwiKVxyXG5cdH0sXHJcblx0c2VuZENvdXBvbjogZnVuY3Rpb24oKXtcclxuXHRcdGpRdWVyeSgnI2NvdXBvbk1vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuXHR9LFxyXG5cdHJldHVyblBvbGljeTogZnVuY3Rpb24oKXtcclxuXHRcdGpRdWVyeSgnI3JldHVybk1vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuXHR9LFxyXG5cdHRvZ2dsZUNvbGxhcHNlOiBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdFx0dmFyIG5ld1N0YXRlID0ge307XHJcblx0XHRuZXdTdGF0ZVt0YXJnZXRdID0gIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldCkuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5cIik7XHJcblx0XHR0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcclxuXHRcdCQoXCIjXCIgKyB0YXJnZXQpLmNvbGxhcHNlKCd0b2dnbGUnKTtcclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblx0XHR2YXIgdHJhbnNhY3Rpb24gPSB0aGlzLnN0YXRlLnRyYW5zYWN0aW9uO1xyXG5cdFx0aWYodHJhbnNhY3Rpb24gPT09IG51bGwpIHJldHVybiAoPGRpdj5Mb2FkaW5nLi4uPC9kaXY+KTtcclxuXHRcdHZhciBkYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZSh0cmFuc2FjdGlvbi50cmFuc2FjdGVkQXQpKTtcclxuXHRcdC8vIFJlbW92ZSBzZWNvbmRzIGZyb20gbG9jYWxlIGRhdGUgc3RyaW5nXHJcblx0XHR2YXIgZm9ybWF0dGVkRGF0ZSA9IGRhdGUudG9Mb2NhbGVTdHJpbmcoKS5yZXBsYWNlKC8oWzpdWzEtOV17Mn1bXCIgXCJdKS8sIFwiIFwiKTtcclxuXHRcdHZhciBjb250YWN0SXRlbXMgPSBbXTtcclxuXHRcdHZhciBmYUljb25zID0ge1xyXG5cdFx0XHRmYWNlYm9vazpcImZhY2Vib29rXCIsXHJcblx0XHRcdHBob25lOiBcInBob25lXCIsXHJcblx0XHRcdHdlYjogXCJnbG9iZVwiLFxyXG5cdFx0XHRnb29nbGVQbHVzOiBcImdvb2dsZS1wbHVzXCIsXHJcblx0XHRcdHBob25lOiBcInBob25lXCIsXHJcblx0XHRcdGVtYWlsOiBcImVudmVsb3BlXCIsXHJcblx0XHRcdGluc3RhZ3JhbTogXCJpbnN0YWdyYW1cIixcclxuXHRcdFx0cGludGVyZXN0OiBcInBpbnRlcmVzdC1wXCIsXHJcblx0XHRcdHR3aXR0ZXI6IFwidHdpdHRlclwiXHJcblx0XHR9XHJcblxyXG5cdFx0dHJhbnNhY3Rpb24uY29udGFjdC5tYXAoZnVuY3Rpb24oY29udGFjdCxpKXtcclxuXHRcdFx0dmFyIHByZVZhbHVlID0gY29udGFjdC52YWx1ZTtcclxuXHRcdFx0aWYoY29udGFjdC50eXBlID09IFwiZW1haWxcIikgY29udGFjdC52YWx1ZSA9IFwibWFpbHRvOlwiICsgcHJlVmFsdWU7XHJcblx0XHRcdGlmKGNvbnRhY3QudHlwZSA9PSBcInBob25lXCIpIGNvbnRhY3QudmFsdWUgPSBcInRlbDpcIiArIHByZVZhbHVlO1xyXG5cdFx0XHRjb250YWN0SXRlbXMucHVzaChcclxuXHRcdFx0XHQ8YSBrZXk9e2l9IGhyZWY9e2NvbnRhY3QudmFsdWV9IGNsYXNzTmFtZT1cImNvbG9yLXdoaXRlXCI+XHJcblx0XHRcdFx0XHQ8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtIGJnLWludmVyc2VcIj5cclxuXHRcdFx0XHRcdFx0e2NvbnRhY3QuZGVzY3JpcHRpb259XHJcblx0XHRcdFx0XHRcdDxpIGNsYXNzTmFtZT17XCJ2ZXJ0aWNhbC1hbGlnbi1taWRkbGUgZmxvYXQtcmlnaHQgZmEgZmEtZncgbGluZS1oZWlnaHQtaW5oZXJpdCBmYS1cIiArIGZhSWNvbnNbY29udGFjdC50eXBlXX0+PC9pPlxyXG5cdFx0XHRcdFx0XHR7KGNvbnRhY3QudHlwZSA9PSBcInBob25lXCIgfHwgY29udGFjdC50eXBlID09IFwiZW1haWxcIik/PGRpdiBjbGFzc05hbWU9XCJ0ZXh0LW11dGVkIG5vd3JhcFwiPntwcmVWYWx1ZX08L2Rpdj46PGRpdj48L2Rpdj59XHJcblx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0KTtcclxuXHRcdH0pXHJcblxyXG5cdFx0cmV0dXJuIChcclxuICAgICAgICAgPGRpdiBpZD1cImxhbmRpbmdcIiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbGxhcHNlIG1lbnUgb3ZlcmZsb3ctc2Nyb2xsLXkgcG9zaXRpb24tZml4ZWRcIiBpZD1cIm5hdmJhclwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoZWlnaHQtMTAwdmggYmctaW52ZXJzZSB0ZXh0LXdoaXRlXCI+XHJcblx0XHRcdFx0XHRcdDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW0gYmctaW52ZXJzZSBtZW51SGVhZFwiPkNvbm5lY3Qgd2l0aCB7dHJhbnNhY3Rpb24uS2V5Lm5hbWV9PC9saT5cclxuXHRcdFx0XHRcdFx0PHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAgYmctaW52ZXJzZVwiPlxyXG5cdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRhY3RJdGVtcy5tYXAoZnVuY3Rpb24oaXRlbSl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBpdGVtO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdDwvdWw+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgbWFyZ2luLXRvcC0xNVwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0zIHBhZGRpbmctbGVmdC0wXCI+XHJcblx0XHRcdFx0XHRcdFx0PGltZyBjbGFzc05hbWU9XCJsb2dvXCIgc3JjPVwiL2Fzc2V0cy9sb2dvcy9kdW5rLmpwZ1wiLz5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTkgcGFkZGluZy1sZWZ0LTBcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1ibG9ja1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJicmFuZC10aXRsZSB2ZXJ0aWNhbC1hbGlnblwiPnt0cmFuc2FjdGlvbi5LZXkubmFtZX08L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYWRkcmVzc1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7dHJhbnNhY3Rpb24uYWRkcmVzcy5saW5lMX17KHR5cGVvZiB0cmFuc2FjdGlvbi5hZGRyZXNzLmxpbmUyID09IFwidW5kZWZpbmVkXCIpP1wiXCI6XCIgXCIgKyB0cmFuc2FjdGlvbi5hZGRyZXNzLmxpbmUyfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHQsIHt0cmFuc2FjdGlvbi5hZGRyZXNzLmNpdHl9LCB7dHJhbnNhY3Rpb24uYWRkcmVzcy5zdGF0ZX0ge3RyYW5zYWN0aW9uLmFkZHJlc3MucG9zdGFsQ29kZX1cclxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBhY3Rpdml0eS1oZWFkZXJcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTggZGF0ZVwiPlxyXG5cdFx0XHRcdFx0XHR7Zm9ybWF0dGVkRGF0ZX1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNCB0b3RhbCBhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0ey8qICR7KHRyYW5zYWN0aW9uLnRvdGFsIC8gMTAwKS50b0ZpeGVkKDIpfSAqL31cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiIG9uQ2xpY2s9eygpPT50aGlzLnRvZ2dsZUNvbGxhcHNlKFwic2hhcmVcIil9PlxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0KHRoaXMuc3RhdGUuc2hhcmUpP1xyXG5cdFx0XHRcdFx0XHRcdDxpIGNsYXNzTmFtZT1cImZhIGZhLXNoYXJlLWFsdCBjb2xvci1ibGFja1wiLz46XHJcblx0XHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPVwiZmEgZmEtc2hhcmUtYWx0XCIvPlxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IFwiIG9uQ2xpY2s9eygpPT50aGlzLnRvZ2dsZUNvbGxhcHNlKFwibmF2YmFyXCIpfT5cclxuXHRcdFx0XHRcdFx0IHtcclxuXHRcdFx0XHRcdFx0XHQgKHRoaXMuc3RhdGUubmF2YmFyKT9cclxuXHRcdFx0XHRcdFx0XHQgPGkgY2xhc3NOYW1lPVwiZmEgZmEtYmFycyBjb2xvci1ibGFja1wiLz46XHJcblx0XHRcdFx0XHRcdFx0IDxpIGNsYXNzTmFtZT1cImZhIGZhLWJhcnNcIi8+XHJcblx0XHRcdFx0XHRcdCB9XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgcHJvbW8xIHZlcnRpY2FsLWFsaWduXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdDxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIG9uQ2xpY2s9e3RoaXMucmV0dXJuUG9saWN5fT5SZXR1cm4gUG9saWN5PC9hPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IHByaWNlIGFsaWduLXJpZ2h0IHBhZGRpbmctcmlnaHQtMFwiPlxyXG5cdFx0XHRcdFx0XHQkeyh0cmFuc2FjdGlvbi50b3RhbCAvIDEwMCkudG9GaXhlZCgyKX1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgaWQ9XCJzaGFyZVwiIGNsYXNzTmFtZT1cImJnLWludmVyc2Ugcm93IGNvbGxhcHNlIHRleHQtd2hpdGUgcGFkZGluZy10b3AtMTAgcGFkZGluZy1ib3R0b20tNSBtYXJnaW4tYm90dG9tLTE1XCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBhbGlnbi1jZW50ZXIgbWFyZ2luLWJvdHRvbS0xNVwiPlxyXG5cdFx0XHRcdFx0XHRTaGFyZSB5b3VyIHRyYW5zYWN0aW9uXHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lID0gXCJjb2wteHMtMTJcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS1mdyBmYS1lbnZlbG9wZSBmb250LXNpemUtNDJcIiBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7c2hvd1RleHQ6ZmFsc2Usc2hvd0VtYWlsOnRydWV9KX0+PC9pPjxici8+RW1haWxcclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgYWxpZ24tY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPVwiZmEgZmEtZncgZmEtcGhvbmUgZm9udC1zaXplLTQyXCIgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3Nob3dUZXh0OnRydWUsc2hvd0VtYWlsOmZhbHNlfSl9PjwvaT48YnIvPlRleHRcclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0KHRoaXMuc3RhdGUuc2hvd0VtYWlsIHx8IHRoaXMuc3RhdGUuc2hvd1RleHQpPyhcclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBtYXJnaW4tdG9wLTIwIG1hcmdpbi1ib3R0b20tMTBcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTggb2Zmc2V0LXhzLTFcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCh0aGlzLnN0YXRlLnNob3dFbWFpbCk/PGlucHV0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiRW1haWwgQWRkcmVzc1wiLz46PGlucHV0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiUGhvbmUgTnVtYmVyXCIvPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cIm1hcmdpbi10b3AtNSBjb2wteHMtMiBidG4gYnRuLWluZm8gYnRuLXNtXCIgb25DbGljaz17dGhpcy5zZW5kVHJhbnNhY3Rpb259PlNlbmQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0KTo8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBtYXJnaW4tYm90dG9tLTE1XCI+PC9kaXY+XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0ey8qIDxkaXYgY2xhc3NOYW1lPVwicm93IHZlcnRpY2FsLWFsaWduXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgYWxpZ24tY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdDxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIG9uQ2xpY2s9e3RoaXMucmV0dXJuUG9saWN5fT5SZXR1cm4gUG9saWN5PC9hPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+ICovfVxyXG5cclxuXHRcdFx0XHQ8dGFibGUgY2xhc3NOYW1lPVwidGFibGVcIj5cclxuXHRcdFx0XHRcdDx0aGVhZD48dHI+PHRoPjwvdGg+PHRoPkl0ZW08L3RoPjx0aD5Ub3RhbDwvdGg+PC90cj48L3RoZWFkPlxyXG5cdFx0XHRcdFx0PHRib2R5PlxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHR0cmFuc2FjdGlvbi5JdGVtcy5tYXAoKGl0ZW0sIGkpPT57XHJcblx0XHRcdFx0XHRcdFx0aWYodHlwZW9mIGl0ZW0udW5pdFByaWNlID09IFwidW5kZWZpbmVkXCIpIHZhciB1bml0UHJpY2UgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdGVsc2UgdmFyIHVuaXRQcmljZSA9IFwiJFwiICsgaXRlbS51bml0UHJpY2UvMTAwO1xyXG5cdFx0XHRcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLnF1YW50aXR5ID09IFwidW5kZWZpbmVkXCIpIHZhciBxdWFudGl0eSA9IFwiXCI7XHJcblx0XHRcdFx0XHRcdFx0ZWxzZSB2YXIgcXVhbnRpdHkgPSBpdGVtLnF1YW50aXR5O1xyXG5cdFx0XHRcdFx0XHRcdHZhciBncm91cFN0YXJ0ID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0dHJhbnNhY3Rpb24uaXRlbUdyb3Vwcy5tYXAoZnVuY3Rpb24oZ3JvdXApe1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGdyb3VwLnN0YXJ0ID09IGl0ZW0uc2VxdWVuY2UpIGdyb3VwU3RhcnQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdFx0XHQ8dHIgY2xhc3NOYW1lPXsoZ3JvdXBTdGFydCk/XCJuZXdTZWN0aW9uXCI6XCJcIn0ga2V5PXtpfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHRkPntxdWFudGl0eX08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8dGQ+e2l0ZW0uZGVzY3JpcHRpb259PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHRkPiR7KGl0ZW0udG90YWwvMTAwKS50b0ZpeGVkKDIpfTwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L3RyPlxyXG5cdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQ8L3Rib2R5PlxyXG5cdFx0XHRcdDwvdGFibGU+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgcHJvbW8xIGFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTJcIj5cclxuXHRcdFx0XHRcdFx0R2V0IGEgZnJlZSBkb251dCBvbiB5b3VyIG5leHQgdmlzaXQhIDxici8+XHJcblx0XHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cInByb21vXCIgaHJlZj1cImphdmFzY3JpcHQ6XCI+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbSBidG4tc2Vjb25kYXJ5IG1hcmdpbi10b3AtMTBcIiBvbkNsaWNrPXt0aGlzLnNlbmRDb3Vwb259IGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRDbGFpbSBIZXJlXHJcblx0XHRcdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0XHRcdDwvYT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0XHQ8c3ZnIGNsYXNzTmFtZT1cIm1hcmdpbi1hdXRvIGRpc3BsYXktYmxvY2tcIiBpZD1cImNvZGUxMjhcIj48L3N2Zz5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8TW9kYWwgbmFtZT1cInJldHVybk1vZGFsXCI+XHJcblx0XHRcdFx0XHQ8ZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYm9sZCBwYWRkaW5nLWJvdHRvbS0yMFwiPlJldHVybiBQb2xpY3k8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2PlJldHVybiBzdHVmZiBpbiA5MCBkYXlzIGFuZCB5b3UgZ29vZC48L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IHBhZGRpbmctdG9wLTIwXCI+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY29sLXhzLTYgb2Zmc2V0LXhzLTMgYnRuIGJ0bi1hcHAtcHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMuY2xlYXJGb3JtfSBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0R28gQmFja1xyXG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvTW9kYWw+XHJcblx0XHRcdFx0PE1vZGFsIG5hbWU9XCJjb3Vwb25Nb2RhbFwiPlxyXG5cdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJvbGQgcGFkZGluZy1ib3R0b20tMjBcIj5Zb3VyIGNvdXBvbiBpcyBvbiBpdHMgd2F5ITwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdDxkaXY+WW91IHNob3VsZCByZWNlaXZlIHlvdXIgY291cG9uIGJ5IHRleHQgc29vbiE8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IHBhZGRpbmctdG9wLTIwXCI+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY29sLXhzLTYgb2Zmc2V0LXhzLTMgYnRuIGJ0bi1hcHAtcHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMuY2xlYXJGb3JtfSBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0R28gQmFja1xyXG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvTW9kYWw+XHJcbiAgICAgICAgIDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcblJlYWN0RE9NLnJlbmRlcigoXHJcblx0PGRpdj5cclxuXHRcdDxMYW5kaW5nLz5cclxuXHQ8L2Rpdj5cclxuKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcclxuIl19
