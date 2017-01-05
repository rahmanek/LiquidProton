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
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require("../cdn");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = _cdn.React.createClass({
	displayName: "contactList",

	getInitialState: function getInitialState() {
		var _faIcons;

		return {
			faIcons: (_faIcons = {
				facebook: "facebook",
				phone: "phone",
				web: "globe",
				googlePlus: "google-plus"
			}, _defineProperty(_faIcons, "phone", "phone"), _defineProperty(_faIcons, "email", "envelope"), _defineProperty(_faIcons, "instagram", "instagram"), _defineProperty(_faIcons, "pinterest", "pinterest-p"), _defineProperty(_faIcons, "twitter", "twitter"), _faIcons)
		};
	},
	render: function render() {
		var _this = this;

		if (this.props.transaction == null) return _cdn.React.createElement("div", null);else var transaction = this.props.transaction;
		var contactItems = [];
		this.props.transaction.contact.map(function (contact, i) {
			var link = contact.value;
			if (contact.type == "email") link = "mailto:" + contact.link;
			if (contact.type == "phone") link = "tel:" + contact.link;
			contactItems.push(_cdn.React.createElement(
				"a",
				{ key: i, href: link, className: "color-white" },
				_cdn.React.createElement(
					"li",
					{ className: "list-group-item bg-inverse" },
					contact.description,
					_cdn.React.createElement("i", { className: "vertical-align-middle float-right fa fa-fw line-height-inherit fa-" + _this.state.faIcons[contact.type] }),
					contact.type == "phone" || contact.type == "email" ? _cdn.React.createElement(
						"div",
						{ className: "text-muted nowrap" },
						contact.value
					) : _cdn.React.createElement("div", null)
				)
			));
		});
		return _cdn.React.createElement(
			"div",
			{ className: "collapse menu overflow-scroll-y position-fixed", id: "navbar" },
			_cdn.React.createElement(
				"div",
				{ className: "height-100vh bg-inverse text-white" },
				_cdn.React.createElement(
					"li",
					{ className: "list-group-item bg-inverse menuHead" },
					"Connect with ",
					transaction.Key.name
				),
				_cdn.React.createElement(
					"ul",
					{ className: "list-group bg-inverse" },
					contactItems.map(function (item) {
						return item;
					})
				)
			)
		);
	}
});

},{"../cdn":2}],4:[function(require,module,exports){
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

var _contactList = require('./components/contactList');

var _contactList2 = _interopRequireDefault(_contactList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Transaction = _cdn.React.createClass({
	displayName: 'Transaction',

	getInitialState: function getInitialState() {
		return {
			transaction: null,
			showEmail: false,
			showPhone: false,
			navbar: false,
			share: false
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
	toggleCollapse: function toggleCollapse(target) {
		var newState = {};
		newState[target] = !document.getElementById(target).classList.contains("in");
		this.setState(newState);
		$("#" + target).collapse('toggle');
	},
	render: function render() {
		var _this2 = this;

		var transaction = this.state.transaction;
		console.log(transaction);
		if (transaction === null) return _cdn.React.createElement(
			'div',
			null,
			'Loading...'
		);
		var date = new Date(Date.parse(transaction.transactedAt));
		// Remove seconds from locale date string
		var formattedDate = date.toLocaleString().replace(/([:][1-9]{2}[" "])/, " ");

		// var contactItems = [];
		// this.state.transaction.contact.map(function(contact,i){
		// 	contactItems.push(
		// 		<a key={i} href={contact.value} className="color-white">
		// 			<li className="list-group-item bg-inverse">
		// 				{contact.description}
		// 				<i className={"vertical-align-middle float-right fa fa-fw line-height-inherit fa-" + faIcons[contact.type]}></i>
		// 				{(contact.type == "phone" || contact.type == "email")?<div className="text-muted nowrap">{preValue}</div>:<div></div>}
		// 			</li>
		// 		</a>
		// 	);
		// });
		var logoPath = "/assets/logos/dunk.jpg";
		if (transaction.Key.name == "Shaw's") logoPath = "/assets/logos/shaws.jpg";

		return _cdn.React.createElement(
			'div',
			{ id: 'transaction', className: 'container' },
			_cdn.React.createElement(_contactList2.default, { transaction: this.state.transaction }),
			_cdn.React.createElement(
				'div',
				{ className: 'row' },
				_cdn.React.createElement(
					'div',
					{ className: 'col-xs-12 margin-top-15' },
					_cdn.React.createElement(
						'div',
						{ className: 'col-xs-3 padding-left-0' },
						_cdn.React.createElement('img', { className: 'logo', src: logoPath })
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
	_cdn.React.createElement(Transaction, null)
), document.getElementById('app'));

},{"../config":1,"./cdn":2,"./components/contactList":3,"./components/modal":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGNkbi5qcyIsInNyY1xcY29tcG9uZW50c1xcY29udGFjdExpc3QuanMiLCJzcmNcXGNvbXBvbmVudHNcXG1vZGFsLmpzIiwic3JjXFx0cmFuc2FjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBLElBQUksY0FBYyxhQUFsQjtrQkFDZTtBQUNkLGNBQWEsV0FEQztBQUVkLFVBQVUsWUFBVTtBQUNuQixNQUFHLGVBQWUsWUFBbEIsRUFBZ0MsT0FBTyw2QkFBUCxDQUFoQyxLQUNLLE9BQU8sdUJBQVA7QUFDTCxFQUhTLEVBRkk7QUFNZCxVQUFVLFlBQVU7QUFDbkIsTUFBRyxlQUFlLFlBQWxCLEVBQWdDLE9BQU8sNkJBQVAsQ0FBaEMsS0FDSyxPQUFPLHVCQUFQO0FBQ0wsRUFIUyxFQU5JO0FBVWQsUUFBTTtBQUNMLFlBQVUsa0NBREw7QUFFTCxVQUFRO0FBRkg7QUFWUSxDOzs7Ozs7Ozs7QUNEZixJQUFJLElBQUksT0FBTyxDQUFmO0FBQ0EsSUFBSSxTQUFTLENBQWI7QUFDQSxJQUFJLFFBQVEsT0FBTyxLQUFuQjtBQUNBLElBQUksV0FBVyxPQUFPLFFBQXRCO0FBQ0EsSUFBSSxjQUFjLE9BQU8sV0FBekI7QUFDQSxJQUFJLFlBQVksT0FBTyxTQUF2QjtBQUNBLElBQUksU0FBUyxPQUFPLENBQXBCO1FBQ1MsQyxHQUFBLEM7UUFBRyxNLEdBQUEsTTtRQUFRLEssR0FBQSxLO1FBQU8sUSxHQUFBLFE7UUFBVSxXLEdBQUEsVztRQUFhLFMsR0FBQSxTO1FBQVcsTSxHQUFBLE07Ozs7Ozs7OztBQ1I3RDs7OztrQkFFZSxXQUFNLFdBQU4sQ0FBa0I7QUFBQTs7QUFDaEMsa0JBQWlCLDJCQUFXO0FBQUE7O0FBQzNCLFNBQU07QUFDTDtBQUNDLGNBQVMsVUFEVjtBQUVDLFdBQU8sT0FGUjtBQUdDLFNBQUssT0FITjtBQUlDLGdC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LFdBQVUsMkJBQWYsRUFBMkMsSUFBRyxTQUE5QztBQURGLElBckhLO0FBd0hMO0FBQUE7QUFBQSxNQUFPLE1BQUssYUFBWjtBQUNDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQSxRQUFLLFdBQVUsY0FBZjtBQUNDO0FBQUE7QUFBQSxTQUFLLFdBQVUsd0JBQWY7QUFBQTtBQUFBLE9BREQ7QUFFQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkQsTUFERDtBQUtDO0FBQUE7QUFBQSxRQUFLLFdBQVUsb0JBQWY7QUFDQztBQUFBO0FBQUEsU0FBUSxNQUFLLFFBQWIsRUFBc0IsV0FBVSwwQ0FBaEMsRUFBMkUsU0FBUyxLQUFLLFNBQXpGLEVBQW9HLGdCQUFhLE9BQWpIO0FBQUE7QUFBQTtBQUREO0FBTEQ7QUFERCxJQXhISztBQXFJTDtBQUFBO0FBQUEsTUFBTyxNQUFLLGFBQVo7QUFDQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUEsUUFBSyxXQUFVLGNBQWY7QUFDQztBQUFBO0FBQUEsU0FBSyxXQUFVLHdCQUFmO0FBQUE7QUFBQSxPQUREO0FBRUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZELE1BREQ7QUFLQztBQUFBO0FBQUEsUUFBSyxXQUFVLG9CQUFmO0FBQ0M7QUFBQTtBQUFBLFNBQVEsTUFBSyxRQUFiLEVBQXNCLFdBQVUsMENBQWhDLEVBQTJFLFNBQVMsS0FBSyxTQUF6RixFQUFvRyxnQkFBYSxPQUFqSDtBQUFBO0FBQUE7QUFERDtBQUxEO0FBREQ7QUFySUssR0FEUDtBQXFKQTtBQWpOa0MsQ0FBbEIsQ0FBbEI7O0FBcU5BLGNBQVMsTUFBVCxDQUNDO0FBQUE7QUFBQTtBQUNDLDBCQUFDLFdBQUQ7QUFERCxDQURELEVBSUcsU0FBUyxjQUFULENBQXdCLEtBQXhCLENBSkgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXHJcbnZhciBlbnZpcm9ubWVudCA9IFwiZGV2ZWxvcG1lbnRcIjtcclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdGVudmlyb25tZW50OiBlbnZpcm9ubWVudCxcclxuXHRhcGlIb3N0OiAoZnVuY3Rpb24oKXtcclxuXHRcdGlmKGVudmlyb25tZW50ID09IFwicHJvZHVjdGlvblwiKSByZXR1cm4gXCJodHRwOi8vYXBpdGVzdC5mbGVjdGluby5jb21cIjtcclxuXHRcdGVsc2UgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDozMDEwXCI7XHJcblx0fSgpKSxcclxuXHR3ZWJIb3N0OiAoZnVuY3Rpb24oKXtcclxuXHRcdGlmKGVudmlyb25tZW50ID09IFwicHJvZHVjdGlvblwiKSByZXR1cm4gXCJodHRwOi8vd2VidGVzdC5mbGVjdGluby5jb21cIjtcclxuXHRcdGVsc2UgcmV0dXJuIFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XHJcblx0fSgpKSxcclxuXHRhdXRoMDp7XHJcblx0XHRjbGllbnRJZDogXCIwU00wZ3JCVG9DSmpXR1ViQnRsWnVIaHlsQ3EyZFZ0M1wiLFxyXG5cdFx0ZG9tYWluOiBcImZsZWN0aW5vLmF1dGgwLmNvbVwiXHJcblx0fVxyXG59XHJcbiIsIlxyXG52YXIgJCA9IHdpbmRvdy4kO1xyXG52YXIgalF1ZXJ5ID0gJDtcclxudmFyIFJlYWN0ID0gd2luZG93LlJlYWN0O1xyXG52YXIgUmVhY3RET00gPSB3aW5kb3cuUmVhY3RET007XHJcbnZhciBSZWFjdFJvdXRlciA9IHdpbmRvdy5SZWFjdFJvdXRlcjtcclxudmFyIEF1dGgwTG9jayA9IHdpbmRvdy5BdXRoMExvY2s7XHJcbnZhciBMb2Rhc2ggPSB3aW5kb3cuXztcclxuZXhwb3J0IHsgJCwgalF1ZXJ5LCBSZWFjdCwgUmVhY3RET00sIFJlYWN0Um91dGVyLCBBdXRoMExvY2ssIExvZGFzaCB9XHJcbiIsImltcG9ydCB7IFJlYWN0IH0gZnJvbSAnLi4vY2RuJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm57XHJcblx0XHRcdGZhSWNvbnM6IHtcclxuXHRcdFx0XHRmYWNlYm9vazpcImZhY2Vib29rXCIsXHJcblx0XHRcdFx0cGhvbmU6IFwicGhvbmVcIixcclxuXHRcdFx0XHR3ZWI6IFwiZ2xvYmVcIixcclxuXHRcdFx0XHRnb29nbGVQbHVzOiBcImdvb2dsZS1wbHVzXCIsXHJcblx0XHRcdFx0cGhvbmU6IFwicGhvbmVcIixcclxuXHRcdFx0XHRlbWFpbDogXCJlbnZlbG9wZVwiLFxyXG5cdFx0XHRcdGluc3RhZ3JhbTogXCJpbnN0YWdyYW1cIixcclxuXHRcdFx0XHRwaW50ZXJlc3Q6IFwicGludGVyZXN0LXBcIixcclxuXHRcdFx0XHR0d2l0dGVyOiBcInR3aXR0ZXJcIlxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0aWYodGhpcy5wcm9wcy50cmFuc2FjdGlvbiA9PSBudWxsKSByZXR1cm4gKDxkaXY+PC9kaXY+KTtcclxuXHRcdGVsc2UgdmFyIHRyYW5zYWN0aW9uID0gdGhpcy5wcm9wcy50cmFuc2FjdGlvbjtcclxuXHRcdHZhciBjb250YWN0SXRlbXMgPSBbXTtcclxuXHRcdHRoaXMucHJvcHMudHJhbnNhY3Rpb24uY29udGFjdC5tYXAoKGNvbnRhY3QsaSk9PntcclxuXHRcdFx0dmFyIGxpbmsgPSBjb250YWN0LnZhbHVlO1xyXG5cdFx0XHRpZihjb250YWN0LnR5cGUgPT0gXCJlbWFpbFwiKSBsaW5rID0gXCJtYWlsdG86XCIgKyBjb250YWN0Lmxpbms7XHJcblx0XHRcdGlmKGNvbnRhY3QudHlwZSA9PSBcInBob25lXCIpIGxpbmsgPSBcInRlbDpcIiArIGNvbnRhY3QubGluaztcclxuXHRcdFx0Y29udGFjdEl0ZW1zLnB1c2goXHJcblx0XHRcdFx0PGEga2V5PXtpfSBocmVmPXtsaW5rfSBjbGFzc05hbWU9XCJjb2xvci13aGl0ZVwiPlxyXG5cdFx0XHRcdFx0PGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSBiZy1pbnZlcnNlXCI+XHJcblx0XHRcdFx0XHRcdHtjb250YWN0LmRlc2NyaXB0aW9ufVxyXG5cdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9e1widmVydGljYWwtYWxpZ24tbWlkZGxlIGZsb2F0LXJpZ2h0IGZhIGZhLWZ3IGxpbmUtaGVpZ2h0LWluaGVyaXQgZmEtXCIgKyB0aGlzLnN0YXRlLmZhSWNvbnNbY29udGFjdC50eXBlXX0+PC9pPlxyXG5cdFx0XHRcdFx0XHR7KGNvbnRhY3QudHlwZSA9PSBcInBob25lXCIgfHwgY29udGFjdC50eXBlID09IFwiZW1haWxcIik/PGRpdiBjbGFzc05hbWU9XCJ0ZXh0LW11dGVkIG5vd3JhcFwiPntjb250YWN0LnZhbHVlfTwvZGl2Pjo8ZGl2PjwvZGl2Pn1cclxuXHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0PC9hPlxyXG5cdFx0XHQpO1xyXG5cdFx0fSk7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbGxhcHNlIG1lbnUgb3ZlcmZsb3ctc2Nyb2xsLXkgcG9zaXRpb24tZml4ZWRcIiBpZD1cIm5hdmJhclwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGVpZ2h0LTEwMHZoIGJnLWludmVyc2UgdGV4dC13aGl0ZVwiPlxyXG5cdFx0XHRcdFx0PGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSBiZy1pbnZlcnNlIG1lbnVIZWFkXCI+Q29ubmVjdCB3aXRoIHt0cmFuc2FjdGlvbi5LZXkubmFtZX08L2xpPlxyXG5cdFx0XHRcdFx0PHVsIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAgYmctaW52ZXJzZVwiPlxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0Y29udGFjdEl0ZW1zLm1hcChmdW5jdGlvbihpdGVtKXtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBpdGVtO1xyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdDwvdWw+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iLCJpbXBvcnQgeyBSZWFjdCB9IGZyb20gJy4uL2NkbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBpZD1cIm1vZGFsXCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbCBmYWRlXCIgaWQ9e3RoaXMucHJvcHMubmFtZX0+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInZlcnRpY2FsLWFsaWdubWVudC1oZWxwZXJcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2cgdmVydGljYWwtYWxpZ24tY2VudGVyXCIgcm9sZT1cImRvY3VtZW50XCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb250YWluZXJcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG59KTtcclxuIiwiaW1wb3J0IHsgUmVhY3RET00sIFJlYWN0IH0gZnJvbSAnLi9jZG4nXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xyXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi9jb21wb25lbnRzL21vZGFsJ1xyXG5pbXBvcnQgQ29udGFjdExpc3QgZnJvbSAnLi9jb21wb25lbnRzL2NvbnRhY3RMaXN0J1xyXG5cclxudmFyIFRyYW5zYWN0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dHJhbnNhY3Rpb246IG51bGwsXHJcblx0XHRcdHNob3dFbWFpbDogZmFsc2UsXHJcblx0XHRcdHNob3dQaG9uZTogZmFsc2UsXHJcblx0XHRcdG5hdmJhcjogZmFsc2UsXHJcblx0XHRcdHNoYXJlOiBmYWxzZVxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xyXG5cdFx0JC5nZXQoY29uZmlnLmFwaUhvc3QgKyBcIi92MS90cmFuc2FjdGlvbi9cIiArIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdChcIi9cIilbMl0pXHJcblx0XHQudGhlbigoZGF0YSk9PntcclxuXHRcdFx0ZGF0YS5JdGVtcy5zb3J0KGZ1bmN0aW9uKGEsYil7XHJcblx0XHRcdFx0aWYoYS5zZXF1ZW5jZSA+IGIuc2VxdWVuY2UpIHJldHVybiAxO1xyXG5cdFx0XHRcdGVsc2UgcmV0dXJuIC0xO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5zZXRTdGF0ZSh7dHJhbnNhY3Rpb246ZGF0YX0sZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRKc0JhcmNvZGUoXCIjY29kZTEyOFwiLCBcIjEyMzQ1Njc4OTAxMjNcIiwge2Zvcm1hdDogXCJpdGYxNFwifSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHRzZW5kVHJhbnNhY3Rpb246IGZ1bmN0aW9uKCl7XHJcblx0XHRjb25zb2xlLmxvZyhcIlNlbnQhXCIpXHJcblx0fSxcclxuXHRzZW5kQ291cG9uOiBmdW5jdGlvbigpe1xyXG5cdFx0alF1ZXJ5KCcjY291cG9uTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG5cdH0sXHJcblx0cmV0dXJuUG9saWN5OiBmdW5jdGlvbigpe1xyXG5cdFx0alF1ZXJ5KCcjcmV0dXJuTW9kYWwnKS5tb2RhbCgnc2hvdycpO1xyXG5cdH0sXHJcblx0dG9nZ2xlQ29sbGFwc2U6IGZ1bmN0aW9uKHRhcmdldCl7XHJcblx0XHR2YXIgbmV3U3RhdGUgPSB7fTtcclxuXHRcdG5ld1N0YXRlW3RhcmdldF0gPSAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KS5jbGFzc0xpc3QuY29udGFpbnMoXCJpblwiKTtcclxuXHRcdHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xyXG5cdFx0JChcIiNcIiArIHRhcmdldCkuY29sbGFwc2UoJ3RvZ2dsZScpO1xyXG5cdH0sXHJcblx0cmVuZGVyOiBmdW5jdGlvbiAoKXtcclxuXHRcdHZhciB0cmFuc2FjdGlvbiA9IHRoaXMuc3RhdGUudHJhbnNhY3Rpb247XG5cdFx0Y29uc29sZS5sb2codHJhbnNhY3Rpb24pXHJcblx0XHRpZih0cmFuc2FjdGlvbiA9PT0gbnVsbCkgcmV0dXJuICg8ZGl2PkxvYWRpbmcuLi48L2Rpdj4pO1xyXG5cdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKHRyYW5zYWN0aW9uLnRyYW5zYWN0ZWRBdCkpO1xyXG5cdFx0Ly8gUmVtb3ZlIHNlY29uZHMgZnJvbSBsb2NhbGUgZGF0ZSBzdHJpbmdcclxuXHRcdHZhciBmb3JtYXR0ZWREYXRlID0gZGF0ZS50b0xvY2FsZVN0cmluZygpLnJlcGxhY2UoLyhbOl1bMS05XXsyfVtcIiBcIl0pLywgXCIgXCIpO1xyXG5cclxuXHRcdC8vIHZhciBjb250YWN0SXRlbXMgPSBbXTtcclxuXHRcdC8vIHRoaXMuc3RhdGUudHJhbnNhY3Rpb24uY29udGFjdC5tYXAoZnVuY3Rpb24oY29udGFjdCxpKXtcclxuXHRcdC8vIFx0Y29udGFjdEl0ZW1zLnB1c2goXHJcblx0XHQvLyBcdFx0PGEga2V5PXtpfSBocmVmPXtjb250YWN0LnZhbHVlfSBjbGFzc05hbWU9XCJjb2xvci13aGl0ZVwiPlxyXG5cdFx0Ly8gXHRcdFx0PGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSBiZy1pbnZlcnNlXCI+XHJcblx0XHQvLyBcdFx0XHRcdHtjb250YWN0LmRlc2NyaXB0aW9ufVxyXG5cdFx0Ly8gXHRcdFx0XHQ8aSBjbGFzc05hbWU9e1widmVydGljYWwtYWxpZ24tbWlkZGxlIGZsb2F0LXJpZ2h0IGZhIGZhLWZ3IGxpbmUtaGVpZ2h0LWluaGVyaXQgZmEtXCIgKyBmYUljb25zW2NvbnRhY3QudHlwZV19PjwvaT5cclxuXHRcdC8vIFx0XHRcdFx0eyhjb250YWN0LnR5cGUgPT0gXCJwaG9uZVwiIHx8IGNvbnRhY3QudHlwZSA9PSBcImVtYWlsXCIpPzxkaXYgY2xhc3NOYW1lPVwidGV4dC1tdXRlZCBub3dyYXBcIj57cHJlVmFsdWV9PC9kaXY+OjxkaXY+PC9kaXY+fVxyXG5cdFx0Ly8gXHRcdFx0PC9saT5cclxuXHRcdC8vIFx0XHQ8L2E+XHJcblx0XHQvLyBcdCk7XHJcblx0XHQvLyB9KTtcclxuXHRcdHZhciBsb2dvUGF0aCA9IFwiL2Fzc2V0cy9sb2dvcy9kdW5rLmpwZ1wiXHJcblx0XHRpZih0cmFuc2FjdGlvbi5LZXkubmFtZSA9PSBcIlNoYXcnc1wiKSBsb2dvUGF0aCA9IFwiL2Fzc2V0cy9sb2dvcy9zaGF3cy5qcGdcIlxyXG5cclxuXHRcdHJldHVybiAoXHJcbiAgICAgICAgIDxkaXYgaWQ9XCJ0cmFuc2FjdGlvblwiIGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdDxDb250YWN0TGlzdCB0cmFuc2FjdGlvbj17dGhpcy5zdGF0ZS50cmFuc2FjdGlvbn0vPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBtYXJnaW4tdG9wLTE1XCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTMgcGFkZGluZy1sZWZ0LTBcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aW1nIGNsYXNzTmFtZT1cImxvZ29cIiBzcmM9e2xvZ29QYXRofS8+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy05IHBhZGRpbmctbGVmdC0wXCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtYmxvY2tcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYnJhbmQtdGl0bGUgdmVydGljYWwtYWxpZ25cIj57dHJhbnNhY3Rpb24uS2V5Lm5hbWV9PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImFkZHJlc3NcIj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0e3RyYW5zYWN0aW9uLmFkZHJlc3MubGluZTF9eyh0eXBlb2YgdHJhbnNhY3Rpb24uYWRkcmVzcy5saW5lMiA9PSBcInVuZGVmaW5lZFwiKT9cIlwiOlwiIFwiICsgdHJhbnNhY3Rpb24uYWRkcmVzcy5saW5lMn1cclxuXHRcdFx0XHRcdFx0XHRcdFx0LCB7dHJhbnNhY3Rpb24uYWRkcmVzcy5jaXR5fSwge3RyYW5zYWN0aW9uLmFkZHJlc3Muc3RhdGV9IHt0cmFuc2FjdGlvbi5hZGRyZXNzLnBvc3RhbENvZGV9XHJcblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgYWN0aXZpdHktaGVhZGVyXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy04IGRhdGVcIj5cclxuXHRcdFx0XHRcdFx0e2Zvcm1hdHRlZERhdGV9XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTQgdG90YWwgYWxpZ24tY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdHsvKiAkeyh0cmFuc2FjdGlvbi50b3RhbCAvIDEwMCkudG9GaXhlZCgyKX0gKi99XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTZcIiBvbkNsaWNrPXsoKT0+dGhpcy50b2dnbGVDb2xsYXBzZShcInNoYXJlXCIpfT5cclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdCh0aGlzLnN0YXRlLnNoYXJlKT9cclxuXHRcdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS1zaGFyZS1hbHQgY29sb3ItYmxhY2tcIi8+OlxyXG5cdFx0XHRcdFx0XHRcdDxpIGNsYXNzTmFtZT1cImZhIGZhLXNoYXJlLWFsdFwiLz5cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBcIiBvbkNsaWNrPXsoKT0+dGhpcy50b2dnbGVDb2xsYXBzZShcIm5hdmJhclwiKX0+XHJcblx0XHRcdFx0XHRcdCB7XHJcblx0XHRcdFx0XHRcdFx0ICh0aGlzLnN0YXRlLm5hdmJhcik/XHJcblx0XHRcdFx0XHRcdFx0IDxpIGNsYXNzTmFtZT1cImZhIGZhLWJhcnMgY29sb3ItYmxhY2tcIi8+OlxyXG5cdFx0XHRcdFx0XHRcdCA8aSBjbGFzc05hbWU9XCJmYSBmYS1iYXJzXCIvPlxyXG5cdFx0XHRcdFx0XHQgfVxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IHByb21vMSB2ZXJ0aWNhbC1hbGlnblwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG5cdFx0XHRcdFx0XHQ8YSBocmVmPVwiamF2YXNjcmlwdDpcIiBvbkNsaWNrPXt0aGlzLnJldHVyblBvbGljeX0+UmV0dXJuIFBvbGljeTwvYT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiBwcmljZSBhbGlnbi1yaWdodCBwYWRkaW5nLXJpZ2h0LTBcIj5cclxuXHRcdFx0XHRcdFx0JHsodHJhbnNhY3Rpb24udG90YWwgLyAxMDApLnRvRml4ZWQoMil9XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGlkPVwic2hhcmVcIiBjbGFzc05hbWU9XCJiZy1pbnZlcnNlIHJvdyBjb2xsYXBzZSB0ZXh0LXdoaXRlIHBhZGRpbmctdG9wLTEwIHBhZGRpbmctYm90dG9tLTUgbWFyZ2luLWJvdHRvbS0xNVwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgYWxpZ24tY2VudGVyIG1hcmdpbi1ib3R0b20tMTVcIj5cclxuXHRcdFx0XHRcdFx0U2hhcmUgeW91ciB0cmFuc2FjdGlvblxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZSA9IFwiY29sLXhzLTEyXCI+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTYgYWxpZ24tY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPVwiZmEgZmEtZncgZmEtZW52ZWxvcGUgZm9udC1zaXplLTQyXCIgb25DbGljaz17KCk9PnRoaXMuc2V0U3RhdGUoe3Nob3dUZXh0OmZhbHNlLHNob3dFbWFpbDp0cnVlfSl9PjwvaT48YnIvPkVtYWlsXHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHRcdDxpIGNsYXNzTmFtZT1cImZhIGZhLWZ3IGZhLXBob25lIGZvbnQtc2l6ZS00MlwiIG9uQ2xpY2s9eygpPT50aGlzLnNldFN0YXRlKHtzaG93VGV4dDp0cnVlLHNob3dFbWFpbDpmYWxzZX0pfT48L2k+PGJyLz5UZXh0XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdCh0aGlzLnN0YXRlLnNob3dFbWFpbCB8fCB0aGlzLnN0YXRlLnNob3dUZXh0KT8oXHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgbWFyZ2luLXRvcC0yMCBtYXJnaW4tYm90dG9tLTEwXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy04IG9mZnNldC14cy0xXCI+XHJcblx0XHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQodGhpcy5zdGF0ZS5zaG93RW1haWwpPzxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIkVtYWlsIEFkZHJlc3NcIi8+OjxpbnB1dCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIlBob25lIE51bWJlclwiLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJtYXJnaW4tdG9wLTUgY29sLXhzLTIgYnRuIGJ0bi1pbmZvIGJ0bi1zbVwiIG9uQ2xpY2s9e3RoaXMuc2VuZFRyYW5zYWN0aW9ufT5TZW5kPC9idXR0b24+XHJcblx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdCk6PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgbWFyZ2luLWJvdHRvbS0xNVwiPjwvZGl2PlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdHsvKiA8ZGl2IGNsYXNzTmFtZT1cInJvdyB2ZXJ0aWNhbC1hbGlnblwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IGFsaWduLWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHQ8YSBocmVmPVwiamF2YXNjcmlwdDpcIiBvbkNsaWNrPXt0aGlzLnJldHVyblBvbGljeX0+UmV0dXJuIFBvbGljeTwvYT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PiAqL31cclxuXHJcblx0XHRcdFx0PHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlXCI+XHJcblx0XHRcdFx0XHQ8dGhlYWQ+PHRyPjx0aD48L3RoPjx0aD5JdGVtPC90aD48dGg+VG90YWw8L3RoPjwvdHI+PC90aGVhZD5cclxuXHRcdFx0XHRcdDx0Ym9keT5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0dHJhbnNhY3Rpb24uSXRlbXMubWFwKChpdGVtLCBpKT0+e1xyXG5cdFx0XHRcdFx0XHRcdGlmKHR5cGVvZiBpdGVtLnVuaXRQcmljZSA9PSBcInVuZGVmaW5lZFwiKSB2YXIgdW5pdFByaWNlID0gXCJcIjtcclxuXHRcdFx0XHRcdFx0XHRlbHNlIHZhciB1bml0UHJpY2UgPSBcIiRcIiArIGl0ZW0udW5pdFByaWNlLzEwMDtcclxuXHRcdFx0XHRcdFx0XHRpZih0eXBlb2YgaXRlbS5xdWFudGl0eSA9PSBcInVuZGVmaW5lZFwiKSB2YXIgcXVhbnRpdHkgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdGVsc2UgdmFyIHF1YW50aXR5ID0gaXRlbS5xdWFudGl0eTtcclxuXHRcdFx0XHRcdFx0XHR2YXIgZ3JvdXBTdGFydCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdHRyYW5zYWN0aW9uLml0ZW1Hcm91cHMubWFwKGZ1bmN0aW9uKGdyb3VwKXtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChncm91cC5zdGFydCA9PSBpdGVtLnNlcXVlbmNlKSBncm91cFN0YXJ0ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHRcdFx0PHRyIGNsYXNzTmFtZT17KGdyb3VwU3RhcnQpP1wibmV3U2VjdGlvblwiOlwiXCJ9IGtleT17aX0+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDx0ZD57cXVhbnRpdHl9PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PHRkPntpdGVtLmRlc2NyaXB0aW9ufTwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDx0ZD4keyhpdGVtLnRvdGFsLzEwMCkudG9GaXhlZCgyKX08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0PC90Ym9keT5cclxuXHRcdFx0XHQ8L3RhYmxlPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IHByb21vMSBhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyXCI+XHJcblx0XHRcdFx0XHRcdEdldCBhIGZyZWUgZG9udXQgb24geW91ciBuZXh0IHZpc2l0ISA8YnIvPlxyXG5cdFx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJwcm9tb1wiIGhyZWY9XCJqYXZhc2NyaXB0OlwiPlxyXG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc20gYnRuLXNlY29uZGFyeSBtYXJnaW4tdG9wLTEwXCIgb25DbGljaz17dGhpcy5zZW5kQ291cG9ufSBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPlxyXG5cdFx0XHRcdFx0XHRcdFx0Q2xhaW0gSGVyZVxyXG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxyXG5cdFx0XHRcdFx0XHQ8L2E+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cclxuXHRcdFx0XHRcdFx0PHN2ZyBjbGFzc05hbWU9XCJtYXJnaW4tYXV0byBkaXNwbGF5LWJsb2NrXCIgaWQ9XCJjb2RlMTI4XCI+PC9zdmc+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PE1vZGFsIG5hbWU9XCJyZXR1cm5Nb2RhbFwiPlxyXG5cdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJhbGlnbi1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImJvbGQgcGFkZGluZy1ib3R0b20tMjBcIj5SZXR1cm4gUG9saWN5PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0PGRpdj5SZXR1cm4gc3R1ZmYgaW4gOTAgZGF5cyBhbmQgeW91IGdvb2QuPC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBwYWRkaW5nLXRvcC0yMFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNvbC14cy02IG9mZnNldC14cy0zIGJ0biBidG4tYXBwLXByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLmNsZWFyRm9ybX0gZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cclxuXHRcdFx0XHRcdFx0XHRcdEdvIEJhY2tcclxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L01vZGFsPlxyXG5cdFx0XHRcdDxNb2RhbCBuYW1lPVwiY291cG9uTW9kYWxcIj5cclxuXHRcdFx0XHRcdDxkaXY+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiYWxpZ24tY2VudGVyXCI+XHJcblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJib2xkIHBhZGRpbmctYm90dG9tLTIwXCI+WW91ciBjb3Vwb24gaXMgb24gaXRzIHdheSE8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHQ8ZGl2PllvdSBzaG91bGQgcmVjZWl2ZSB5b3VyIGNvdXBvbiBieSB0ZXh0IHNvb24hPC9kaXY+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvdyBwYWRkaW5nLXRvcC0yMFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNvbC14cy02IG9mZnNldC14cy0zIGJ0biBidG4tYXBwLXByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLmNsZWFyRm9ybX0gZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5cclxuXHRcdFx0XHRcdFx0XHRcdEdvIEJhY2tcclxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L01vZGFsPlxyXG4gICAgICAgICA8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG59KTtcclxuXHJcblxyXG5SZWFjdERPTS5yZW5kZXIoKFxyXG5cdDxkaXY+XHJcblx0XHQ8VHJhbnNhY3Rpb24vPlxyXG5cdDwvZGl2PlxyXG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xyXG4iXX0=
