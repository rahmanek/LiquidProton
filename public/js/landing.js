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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGNkbi5qcyIsInNyY1xcY2xhc3Nlc1xcVXRpbGl0aWVzLmpzIiwic3JjXFxjb21wb25lbnRzXFxtb2RhbC5qcyIsInNyY1xcbGFuZGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBLElBQUksY0FBYyxhQUFsQjs7a0JBRWU7QUFDZCxjQUFhLFdBREM7QUFFZCxVQUFVLFlBQVU7QUFDbkIsTUFBRyxlQUFlLFlBQWxCLEVBQWdDLE9BQU8sNkJBQVAsQ0FBaEMsS0FDSyxPQUFPLHVCQUFQO0FBQ0wsRUFIUyxFQUZJO0FBTWQsVUFBVSxZQUFVO0FBQ25CLE1BQUcsZUFBZSxZQUFsQixFQUFnQyxPQUFPLDZCQUFQLENBQWhDLEtBQ0ssT0FBTyx1QkFBUDtBQUNMLEVBSFMsRUFOSTtBQVVkLGFBQVksNkJBVkU7QUFXZCxRQUFNO0FBQ0wsWUFBVSxrQ0FETDtBQUVMLFVBQVE7QUFGSDtBQVhRLEM7Ozs7Ozs7OztBQ0ZmLElBQUksSUFBSSxPQUFPLENBQWY7QUFDQSxJQUFJLFNBQVMsQ0FBYjtBQUNBLElBQUksUUFBUSxPQUFPLEtBQW5CO0FBQ0EsSUFBSSxXQUFXLE9BQU8sUUFBdEI7QUFDQSxJQUFJLGNBQWMsT0FBTyxXQUF6QjtBQUNBLElBQUksWUFBWSxPQUFPLFNBQXZCO1FBQ1MsQyxHQUFBLEM7UUFBRyxNLEdBQUEsTTtRQUFRLEssR0FBQSxLO1FBQU8sUSxHQUFBLFE7UUFBVSxXLEdBQUEsVztRQUFhLFMsR0FBQSxTOzs7Ozs7Ozs7O0FDTGxELElBQUksbUJBQW1CLFNBQW5CLGdCQUFtQixDQUFTLFFBQVQsRUFBbUI7QUFDekMsS0FBSSxRQUFRLE9BQU8sUUFBUCxDQUFnQixNQUFoQixDQUF1QixTQUF2QixDQUFpQyxDQUFqQyxDQUFaO0FBQ0EsS0FBSSxVQUFVLE1BQU0sS0FBTixDQUFZLEdBQVosQ0FBZDtBQUNBLEtB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b0JBQWY7QUFDQztBQUFBO0FBQUEsU0FBUSxNQUFLLFFBQWIsRUFBc0IsV0FBVSxzQ0FBaEMsRUFBdUUsU0FBUyxLQUFLLFNBQXJGLEVBQWdHLGdCQUFhLE9BQTdHO0FBQUE7QUFBQTtBQUREO0FBTEQ7QUFERDtBQTFISyxHQURQO0FBMElBO0FBek04QixDQUFsQixDQUFkOztBQTZNQSxjQUFTLE1BQVQsQ0FDQztBQUFBO0FBQUE7QUFDQywwQkFBQyxPQUFEO0FBREQsQ0FERCxFQUlHLFNBQVMsY0FBVCxDQUF3QixLQUF4QixDQUpIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG52YXIgZW52aXJvbm1lbnQgPSBcImRldmVsb3BtZW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0ZW52aXJvbm1lbnQ6IGVudmlyb25tZW50LFxyXG5cdGFwaUhvc3Q6IChmdW5jdGlvbigpe1xyXG5cdFx0aWYoZW52aXJvbm1lbnQgPT0gXCJwcm9kdWN0aW9uXCIpIHJldHVybiBcImh0dHA6Ly9hcGl0ZXN0LmZsZWN0aW5vLmNvbVwiO1xyXG5cdFx0ZWxzZSByZXR1cm4gXCJodHRwOi8vbG9jYWxob3N0OjMwMTBcIjtcclxuXHR9KCkpLFxyXG5cdHdlYkhvc3Q6IChmdW5jdGlvbigpe1xyXG5cdFx0aWYoZW52aXJvbm1lbnQgPT0gXCJwcm9kdWN0aW9uXCIpIHJldHVybiBcImh0dHA6Ly93ZWJ0ZXN0LmZsZWN0aW5vLmNvbVwiO1xyXG5cdFx0ZWxzZSByZXR1cm4gXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIjtcclxuXHR9KCkpLFxyXG5cdGdhdGV3YXlLZXk6IFwiQVVCNWpDa2RxM2I3a1Y5RFRUZGlRbGxPUnY1XCIsXHJcblx0YXV0aDA6e1xyXG5cdFx0Y2xpZW50SWQ6IFwiMFNNMGdyQlRvQ0pqV0dVYkJ0bFp1SGh5bENxMmRWdDNcIixcclxuXHRcdGRvbWFpbjogXCJmbGVjdGluby5hdXRoMC5jb21cIlxyXG5cdH1cclxufVxyXG4iLCJcclxudmFyICQgPSB3aW5kb3cuJDtcclxudmFyIGpRdWVyeSA9ICQ7XHJcbnZhciBSZWFjdCA9IHdpbmRvdy5SZWFjdDtcclxudmFyIFJlYWN0RE9NID0gd2luZG93LlJlYWN0RE9NO1xyXG52YXIgUmVhY3RSb3V0ZXIgPSB3aW5kb3cuUmVhY3RSb3V0ZXI7XHJcbnZhciBBdXRoMExvY2sgPSB3aW5kb3cuQXV0aDBMb2NrO1xyXG5leHBvcnQgeyAkLCBqUXVlcnksIFJlYWN0LCBSZWFjdERPTSwgUmVhY3RSb3V0ZXIsIEF1dGgwTG9jayB9XHJcbiIsIlxyXG5cclxudmFyIGdldFF1ZXJ5VmFyaWFibGUgPSBmdW5jdGlvbih2YXJpYWJsZSkge1xyXG5cdHZhciBxdWVyeSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpO1xyXG5cdHZhciBwcmVWYXJzID0gcXVlcnkuc3BsaXQoJy8nKTtcclxuXHR2YXIgdmFycyA9IHByZVZhcnNbMF0uc3BsaXQoJyYnKTtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdCgnPScpO1xyXG5cdFx0aWYgKGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKSA9PSB2YXJpYWJsZSkge1xyXG5cdFx0XHRyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRjb25zb2xlLmxvZygnUXVlcnkgdmFyaWFibGUgJXMgbm90IGZvdW5kJywgdmFyaWFibGUpO1xyXG59XHJcblxyXG52YXIgaXNWYWxpZCA9IHtcclxuXHRlbWFpbDogZnVuY3Rpb24oZW1haWwpIHtcclxuXHRcdHZhciByZSA9IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xyXG5cdFx0cmV0dXJuIHJlLnRlc3QoZW1haWwpO1xyXG5cdH0sXHJcblx0cGhvbmU6IGZ1bmN0aW9uKHBob25lKSB7XHJcblx0XHR2YXIgc3RyaXBQaG9uZSA9IHBob25lLnJlcGxhY2UoL1xcRC9nLCcnKTtcclxuXHRcdGlmIChzdHJpcFBob25lLmxlbmd0aCA+PSAxMCkgcmV0dXJuIHRydWU7XHJcblx0XHRlbHNlIGZhbHNlO1xyXG5cdH1cclxufVxyXG5cclxudmFyIGZvcm1hdFBob25lMTAgPSBmdW5jdGlvbihwaG9uZSl7XHJcblx0dmFyIHN0cmlwUGhvbmUgPSBwaG9uZS5yZXBsYWNlKC9cXEQvZywnJyk7XHJcblx0dmFyIGRhc2ggPSBcIlwiO1xyXG5cdHZhciBvcGVuUGFyZW4gPSBcIlwiO1xyXG5cdHZhciBjbG9zZWRQYXJlbiA9IFwiXCI7XHJcblx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID4gMCkgb3BlblBhcmVuID0gXCIoXCI7XHJcblx0aWYgKHN0cmlwUGhvbmUubGVuZ3RoID4gMykgY2xvc2VkUGFyZW4gPSBcIilcIjtcclxuXHRpZiAoc3RyaXBQaG9uZS5sZW5ndGggPiA2KSBkYXNoID0gXCItXCI7XHJcblx0dmFyIGZvcm1hdHRlZFBob25lID0gb3BlblBhcmVuICsgc3RyaXBQaG9uZS5zdWJzdHJpbmcoMCwzKSArIGNsb3NlZFBhcmVuICsgc3RyaXBQaG9uZS5zdWJzdHJpbmcoMyw2KSArIGRhc2ggKyBzdHJpcFBob25lLnN1YnN0cmluZyg2LDEwKTtcclxuXHRyZXR1cm4gZm9ybWF0dGVkUGhvbmU7XHJcbn1cclxuXHJcbnZhciBnZXRUaW1lem9uZU9mZnNldCA9IGZ1bmN0aW9uKCl7XHJcblx0ZnVuY3Rpb24gcGFkKG51bWJlciwgbGVuZ3RoKXtcclxuXHRcdCB2YXIgc3RyID0gXCJcIiArIG51bWJlclxyXG5cdFx0IHdoaWxlIChzdHIubGVuZ3RoIDwgbGVuZ3RoKSB7XHJcblx0XHRcdCAgc3RyID0gJzAnK3N0clxyXG5cdFx0IH1cclxuXHRcdCByZXR1cm4gc3RyXHJcblx0fVxyXG5cdHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuXHR2YXIgb2Zmc2V0ID0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xyXG5cdHJldHVybiAoKG9mZnNldDwwPyAnKyc6Jy0nKSArIHBhZChwYXJzZUludChNYXRoLmFicyhvZmZzZXQvNjApKSwgMikrIHBhZChNYXRoLmFicyhvZmZzZXQlNjApLCAyKSk7XHJcbn1cclxuXHJcbnZhciBjcmVhdGVUaW1lRGF0ZSA9IGZ1bmN0aW9uKGRhdGUsIHRpbWUpe1xyXG5cdHZhciBtaWxlc3RvbmVEYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcblx0dmFyIHN0clNwbGl0ID0gdGltZS5zcGxpdCgnOicpO1xyXG5cdHZhciBob3VyID0gcGFyc2VJbnQoc3RyU3BsaXRbMF0pO1xyXG5cdHZhciBtaW51dGUgPSBwYXJzZUludChzdHJTcGxpdFsxXS5zdWJzdHJpbmcoMCwyKSk7XHJcblx0dmFyIHNldCA9IHN0clNwbGl0WzFdLnN1YnN0cmluZygyLDQpO1xyXG5cdGlmIChob3VyID09PSAxMikge1xyXG5cdFx0aWYgKHNldCA9PT0gXCJhbVwiKSBob3VyID0gMDtcclxuXHRcdGVsc2UgaG91ciA9IDEyO1xyXG5cdH0gZWxzZSBpZiAoc2V0ID09PSBcInBtXCIpIGhvdXIgKz0gMTI7XHJcblx0bWlsZXN0b25lRGF0ZS5zZXRIb3Vycyhob3VyKTtcclxuXHRtaWxlc3RvbmVEYXRlLnNldE1pbnV0ZXMobWludXRlKTtcclxuXHRtaWxlc3RvbmVEYXRlLnNldE1pbnV0ZXMobWlsZXN0b25lRGF0ZS5nZXRNaW51dGVzKCkgLSAgbWlsZXN0b25lRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpKTtcclxuXHRyZXR1cm4gbWlsZXN0b25lRGF0ZS50b0lTT1N0cmluZygpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IHsgZ2V0UXVlcnlWYXJpYWJsZSwgaXNWYWxpZCwgZm9ybWF0UGhvbmUxMCwgZ2V0VGltZXpvbmVPZmZzZXQsIGNyZWF0ZVRpbWVEYXRlIH1cclxuIiwiaW1wb3J0IHsgUmVhY3QgfSBmcm9tICcuLi9jZG4nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgaWQ9XCJtb2RhbFwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwgZmFkZVwiIGlkPXt0aGlzLnByb3BzLm5hbWV9PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ2ZXJ0aWNhbC1hbGlnbm1lbnQtaGVscGVyXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nIHZlcnRpY2FsLWFsaWduLWNlbnRlclwiIHJvbGU9XCJkb2N1bWVudFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTJcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG59KTtcclxuIiwiaW1wb3J0IHsgUmVhY3RET00sIFJlYWN0IH0gZnJvbSAnLi9jZG4nXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xyXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi9jb21wb25lbnRzL21vZGFsJ1xyXG5pbXBvcnQgeyBnZXRRdWVyeVZhcmlhYmxlIH0gZnJvbSAnLi9jbGFzc2VzL1V0aWxpdGllcydcclxuXHJcbnZhciBMYW5kaW5nID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dHJhbnNhY3Rpb246IG51bGwsXHJcblx0XHRcdHNob3dFbWFpbDogZmFsc2UsXHJcblx0XHRcdHNob3dQaG9uZTogZmFsc2VcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcclxuXHRcdCQuZ2V0KGNvbmZpZy5hcGlIb3N0ICsgXCIvdjEvdHJhbnNhY3Rpb24vXCIgKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoXCIvXCIpWzJdKVxyXG5cdFx0LnRoZW4oKGRhdGEpPT57XHJcblx0XHRcdGRhdGEuSXRlbXMuc29ydChmdW5jdGlvbihhLGIpe1xyXG5cdFx0XHRcdGlmKGEuc2VxdWVuY2UgPiBiLnNlcXVlbmNlKSByZXR1cm4gMTtcclxuXHRcdFx0XHRlbHNlIHJldHVybiAtMTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3RyYW5zYWN0aW9uOmRhdGF9LGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0SnNCYXJjb2RlKFwiI2NvZGUxMjhcIiwgXCIxMjM0NTY3ODkwMTIzXCIsIHtmb3JtYXQ6IFwiaXRmMTRcIn0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblx0c2VuZFRyYW5zYWN0aW9uOiBmdW5jdGlvbigpe1xyXG5cdFx0Y29uc29sZS5sb2coXCJTZW50IVwiKVxyXG5cdH0sXHJcblx0c2VuZENvdXBvbjogZnVuY3Rpb24oKXtcclxuXHRcdGpRdWVyeSgnI2NvdXBvbk1vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuXHR9LFxyXG5cdHJldHVyblBvbGljeTogZnVuY3Rpb24oKXtcclxuXHRcdGpRdWVyeSgnI3JldHVybk1vZGFsJykubW9kYWwoJ3Nob3cnKTtcclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblx0XHR2YXIgdHJhbnNhY3Rpb24gPSB0aGlzLnN0YXRlLnRyYW5zYWN0aW9uO1xyXG5cdFx0aWYodHJhbnNhY3Rpb24gPT09IG51bGwpIHJldHVybiAoPGRpdj5Mb2FkaW5nLi4uPC9kaXY+KTtcclxuXHRcdHZhciBkYXRlID0gbmV3IERhdGUoRGF0ZS5wYXJzZSh0cmFuc2FjdGlvbi50cmFuc2FjdGVkQXQpKTtcclxuXHRcdHZhciBmb3JtYXR0ZWREYXRlID0gZGF0ZS50b0xvY2FsZVN0cmluZygpO1xyXG5cclxuXHRcdHZhciBjb250YWN0SXRlbXMgPSBbXTtcclxuXHRcdHZhciBmYUljb25zID0ge1xyXG5cdFx0XHRmYWNlYm9vazpcImZhY2Vib29rXCIsXHJcblx0XHRcdHBob25lOiBcInBob25lXCIsXHJcblx0XHRcdHdlYjogXCJnbG9iZVwiLFxyXG5cdFx0XHRnb29nbGVQbHVzOiBcImdvb2dsZS1wbHVzXCIsXHJcblx0XHRcdHBob25lOiBcInBob25lXCIsXHJcblx0XHRcdGVtYWlsOiBcImVudmVsb3BlXCIsXHJcblx0XHRcdGluc3RhZ3JhbTogXCJpbnN0YWdyYW1cIixcclxuXHRcdFx0cGludGVyZXN0OiBcInBpbnRlcmVzdC1wXCIsXHJcblx0XHRcdHR3aXR0ZXI6IFwidHdpdHRlclwiXHJcblx0XHR9XHJcblxyXG5cdFx0dHJhbnNhY3Rpb24uY29udGFjdC5tYXAoZnVuY3Rpb24oY29udGFjdCxpKXtcclxuXHRcdFx0dmFyIHByZVZhbHVlID0gY29udGFjdC52YWx1ZTtcclxuXHRcdFx0aWYoY29udGFjdC50eXBlID09IFwiZW1haWxcIikgY29udGFjdC52YWx1ZSA9IFwibWFpbHRvOlwiICsgcHJlVmFsdWU7XHJcblx0XHRcdGlmKGNvbnRhY3QudHlwZSA9PSBcInBob25lXCIpIGNvbnRhY3QudmFsdWUgPSBcInRlbDpcIiArIHByZVZhbHVlO1xyXG5cdFx0XHRjb250YWN0SXRlbXMucHVzaChcclxuXHRcdFx0XHQ8YSBrZXk9e2l9IGhyZWY9e2NvbnRhY3QudmFsdWV9IGNsYXNzTmFtZT1cImNvbG9yLXdoaXRlXCI+XHJcblx0XHRcdFx0XHQ8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtIGJnLWludmVyc2VcIj5cclxuXHRcdFx0XHRcdFx0e2NvbnRhY3QuZGVzY3JpcHRpb259XHJcblx0XHRcdFx0XHRcdDxpIGNsYXNzTmFtZT17XCJ2ZXJ0aWNhbC1hbGlnbi1taWRkbGUgZmxvYXQtcmlnaHQgZmEgZmEtZncgbGluZS1oZWlnaHQtaW5oZXJpdCBmYS1cIiArIGZhSWNvbnNbY29udGFjdC50eXBlXX0+PC9pPlxyXG5cdFx0XHRcdFx0XHR7KGNvbnRhY3QudHlwZSA9PSBcInBob25lXCIgfHwgY29udGFjdC50eXBlID09IFwiZW1haWxcIik/PGRpdiBjbGFzc05hbWU9XCJ0ZXh0LW11dGVkIG5vd3JhcFwiPntwcmVWYWx1ZX08L2Rpdj46PGRpdj48L2Rpdj59XHJcblx0XHRcdFx0XHQ8L2xpPlxyXG5cdFx0XHRcdDwvYT5cclxuXHRcdFx0KTtcclxuXHRcdH0pXHJcblxyXG5cdFx0cmV0dXJuIChcclxuICAgICAgICAgPGRpdiBpZD1cImxhbmRpbmdcIiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbGxhcHNlIG1lbnUgb3ZlcmZsb3ctc2Nyb2xsLXkgcG9zaXRpb24tZml4ZWRcIiBpZD1cImV4Q29sbGFwc2luZ05hdmJhclwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoZWlnaHQtMTAwdmggYmctaW52ZXJzZSB0ZXh0LXdoaXRlXCI+XHJcblx0XHRcdFx0XHRcdDxsaSBjbGFzc05hbWU9XCJsaXN0LWdyb3VwLWl0ZW0gYmctaW52ZXJzZSBtZW51SGVhZFwiPkNvbm5lY3Qgd2l0aCB7dHJhbnNhY3Rpb24uS2V5Lm5hbWV9PC9saT5cclxuXHRcdFx0XHRcdFx0PHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAgYmctaW52ZXJzZVwiPlxyXG5cdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRhY3RJdGVtcy5tYXAoZnVuY3Rpb24oaXRlbSl7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBpdGVtO1xyXG5cdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdDwvdWw+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyB2ZXJ0aWNhbC1hbGlnblwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtOFwiPlxyXG5cdFx0XHRcdFx0XHQ8aW1nIGNsYXNzTmFtZT1cImxvZ29cIiBzcmM9XCIvYXNzZXRzL2xvZ29zL2R1bmtpbi5qcGdcIi8+XHJcblx0XHRcdFx0XHRcdHsvKiB7dHJhbnNhY3Rpb24uS2V5Lm5hbWV9ICovfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy00IGFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCIgZGF0YS10YXJnZXQ9XCIjZXhDb2xsYXBzaW5nTmF2YmFyXCIgY2xhc3NOYW1lPVwibWFyZ2luLXJpZ2h0LTEwIGJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLWJhcnNcIj48L2k+PC9idXR0b24+XHJcblx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiNzaGFyZVwiIGNsYXNzTmFtZT1cIm1hcmdpbi1sZWZ0LTEwIGJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXNoYXJlLWFsdFwiPjwvaT48L2J1dHRvbj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGlkPVwic2hhcmVcIiBjbGFzc05hbWU9XCJiZy1pbnZlcnNlIHJvdyBjb2xsYXBzZSB0ZXh0LXdoaXRlIHBhZGRpbmctdG9wLTEwIHBhZGRpbmctYm90dG9tLTVcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGFsaWduLWNlbnRlciBtYXJnaW4tYm90dG9tLTE1XCI+XHJcblx0XHRcdFx0XHRcdFNoYXJlIHlvdXIgdHJhbnNhY3Rpb25cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWUgPSBcImNvbC14cy0xMlwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpIGNsYXNzTmFtZT1cImZhIGZhLWZ3IGZhLWVudmVsb3BlIGZvbnQtc2l6ZS00MlwiIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHtzaG93VGV4dDpmYWxzZSxzaG93RW1haWw6dHJ1ZX0pfT48L2k+PGJyLz5FbWFpbFxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS1mdyBmYS1waG9uZSBmb250LXNpemUtNDJcIiBvbkNsaWNrPXsoKT0+dGhpcy5zZXRTdGF0ZSh7c2hvd1RleHQ6dHJ1ZSxzaG93RW1haWw6ZmFsc2V9KX0+PC9pPjxici8+VGV4dFxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHQodGhpcy5zdGF0ZS5zaG93RW1haWwgfHwgdGhpcy5zdGF0ZS5zaG93VGV4dCk/KFxyXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIG1hcmdpbi10b3AtMjAgbWFyZ2luLWJvdHRvbS0xMFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtOCBvZmZzZXQteHMtMVwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0KHRoaXMuc3RhdGUuc2hvd0VtYWlsKT88aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJFbWFpbCBBZGRyZXNzXCIvPjo8aW5wdXQgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCJQaG9uZSBOdW1iZXJcIi8+XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwibWFyZ2luLXRvcC01IGNvbC14cy0yIGJ0biBidG4taW5mbyBidG4tc21cIiBvbkNsaWNrPXt0aGlzLnNlbmRUcmFuc2FjdGlvbn0+U2VuZDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQpOjxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIG1hcmdpbi1ib3R0b20tMTVcIj48L2Rpdj5cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBhY3Rpdml0eS1oZWFkZXJcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTggZGF0ZVwiPlxyXG5cdFx0XHRcdFx0XHR7Zm9ybWF0dGVkRGF0ZX1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNCB0b3RhbCBhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0JHt0cmFuc2FjdGlvbi50b3RhbCAvIDEwMH1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IG1hcmdpbi10b3AtMjAgdmVydGljYWwtYWxpZ25cIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIj5cclxuXHRcdFx0XHRcdFx0e3RyYW5zYWN0aW9uLmFkZHJlc3MubGluZTF9eyh0eXBlb2YgdHJhbnNhY3Rpb24uYWRkcmVzcy5saW5lMiA9PSBcInVuZGVmaW5lZFwiKT9cIlwiOnRyYW5zYWN0aW9uLmFkZHJlc3MubGluZTJ9PGJyLz5cclxuXHRcdFx0XHRcdFx0e3RyYW5zYWN0aW9uLmFkZHJlc3MuY2l0eX0sIHt0cmFuc2FjdGlvbi5hZGRyZXNzLnN0YXRlfSB7dHJhbnNhY3Rpb24uYWRkcmVzcy5wb3N0YWxDb2RlfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGFsaWduLXJpZ2h0XCI+XHJcblx0XHRcdFx0XHRcdDxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIG9uQ2xpY2s9e3RoaXMucmV0dXJuUG9saWN5fT5SZXR1cm4gUG9saWN5PC9hPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgcHJvbW8xIGFsaWduLWNlbnRlciBtYXJnaW4tdG9wLTEwXCI+XHJcblx0XHRcdFx0XHRHZXQgYSBmcmVlIGRvbnV0IG9uIHlvdXIgbmV4dCB2aXNpdCEgPGJyLz5cclxuXHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cInByb21vXCIgaHJlZj1cImphdmFzY3JpcHQ6XCI+XHJcblx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNvbC14cy02IG9mZnNldC14cy0zIGJ0biBidG4tc20gYnRuLWluZm9cIiBvbkNsaWNrPXt0aGlzLnNlbmRDb3Vwb259IGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XHJcblx0XHRcdFx0XHRcdFx0Q2xpY2sgaGVyZSB0byBjbGFpbVxyXG5cdFx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdDwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8dGFibGUgY2xhc3NOYW1lPVwidGFibGVcIj5cclxuXHRcdFx0XHRcdDx0aGVhZD48dHI+PHRoPjwvdGg+PHRoPkl0ZW08L3RoPjx0aD5Ub3RhbDwvdGg+PC90cj48L3RoZWFkPlxyXG5cdFx0XHRcdFx0PHRib2R5PlxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHR0cmFuc2FjdGlvbi5JdGVtcy5tYXAoKGl0ZW0sIGkpPT57XHJcblx0XHRcdFx0XHRcdFx0aWYodHlwZW9mIGl0ZW0udW5pdFByaWNlID09IFwidW5kZWZpbmVkXCIpIHZhciB1bml0UHJpY2UgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdGVsc2UgdmFyIHVuaXRQcmljZSA9IFwiJFwiICsgaXRlbS51bml0UHJpY2UvMTAwO1xyXG5cdFx0XHRcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLnF1YW50aXR5ID09IFwidW5kZWZpbmVkXCIpIHZhciBxdWFudGl0eSA9IFwiXCI7XHJcblx0XHRcdFx0XHRcdFx0ZWxzZSB2YXIgcXVhbnRpdHkgPSBpdGVtLnF1YW50aXR5O1xyXG5cdFx0XHRcdFx0XHRcdHZhciBncm91cFN0YXJ0ID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0dHJhbnNhY3Rpb24uaXRlbUdyb3Vwcy5tYXAoZnVuY3Rpb24oZ3JvdXApe1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKGdyb3VwLnN0YXJ0ID09IGl0ZW0uc2VxdWVuY2UpIGdyb3VwU3RhcnQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdFx0XHQ8dHIgY2xhc3NOYW1lPXsoZ3JvdXBTdGFydCk/XCJuZXdTZWN0aW9uXCI6XCJcIn0ga2V5PXtpfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHRkPntxdWFudGl0eX08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8dGQ+e2l0ZW0uZGVzY3JpcHRpb259PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHRkPiR7aXRlbS50b3RhbC8xMDB9PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdDwvdHI+XHJcblx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdDwvdGJvZHk+XHJcblx0XHRcdFx0PC90YWJsZT5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBmb290ZXIgbWFyZ2luLWJvdHRvbS0yMFwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBwcm9tbzFcIj5cclxuXHRcdFx0XHRcdFoxXHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgcHJvbW8yXCI+XHJcblx0XHRcdFx0XHRaMlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdFx0XHRcdFx0PHN2ZyBjbGFzc05hbWU9XCJtYXJnaW4tYXV0byBkaXNwbGF5LWJsb2NrXCIgaWQ9XCJjb2RlMTI4XCI+PC9zdmc+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PE1vZGFsIG5hbWU9XCJyZXR1cm5Nb2RhbFwiPlxyXG5cdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJvbGQgcGFkZGluZy1ib3R0b20tMjBcIj5SZXR1cm4gUG9saWN5PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PGRpdj5SZXR1cm4gc3R1ZmYgaW4gOTAgZGF5cyBhbmQgeW91IGdvb2QuPC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBwYWRkaW5nLXRvcC0yMFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNvbC14cy02IG9mZnNldC14cy0zIGJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMuY2xlYXJGb3JtfSBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0R28gQmFja1xyXG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvTW9kYWw+XHJcblx0XHRcdFx0PE1vZGFsIG5hbWU9XCJjb3Vwb25Nb2RhbFwiPlxyXG5cdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJvbGQgcGFkZGluZy1ib3R0b20tMjBcIj5Zb3VyIGNvdXBvbiBpcyBvbiBpdHMgd2F5ITwvZGl2PlxyXG5cdFx0XHRcdFx0XHRcdDxkaXY+WW91IHNob3VsZCByZWNlaXZlIHlvdXIgY291cG9uIGJ5IHRleHQgc29vbiE8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IHBhZGRpbmctdG9wLTIwXCI+XHJcblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY29sLXhzLTYgb2Zmc2V0LXhzLTMgYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17dGhpcy5jbGVhckZvcm19IGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRHbyBCYWNrXHJcblx0XHRcdFx0XHRcdFx0PC9idXR0b24+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9Nb2RhbD5cclxuICAgICAgICAgPC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuUmVhY3RET00ucmVuZGVyKChcclxuXHQ8ZGl2PlxyXG5cdFx0PExhbmRpbmcvPlxyXG5cdDwvZGl2PlxyXG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xyXG4iXX0=
