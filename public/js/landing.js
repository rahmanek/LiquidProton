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

var _cdn = require('./cdn');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _activity = require('./views/activity');

var _activity2 = _interopRequireDefault(_activity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cdn.ReactDOM.render(_cdn.React.createElement(
	'div',
	null,
	_cdn.React.createElement(_activity2.default, null),
	'Hi'
), document.getElementById('app'));

},{"../config":1,"./cdn":2,"./views/activity":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _cdn = require('../cdn');

var _config = require('../../config.js');

var _config2 = _interopRequireDefault(_config);

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

		$.get(_config2.default.apiHost + "/v1/transaction/aL0ipG0QtG9kxw").then(function (data) {
			_this.setState({ activity: data });
		});
	},
	render: function render() {
		if (this.state.activity === null) return _cdn.React.createElement('div', null);
		console.log(this.state.activity);
		var activity = this.state.activity;
		var date = new Date(Date.parse(activity.Receipt.transactedAt));
		var formattedDate = date.toLocaleString();
		return _cdn.React.createElement(
			'div',
			{ id: 'activity' },
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

},{"../../config.js":1,"../cdn":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGNkbi5qcyIsInNyY1xcbGFuZGluZy5qcyIsInNyY1xcdmlld3NcXGFjdGl2aXR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQ0EsSUFBSSxjQUFjLGFBQWxCOztrQkFFZTtBQUNkLGNBQWEsV0FEQztBQUVkLFVBQVUsWUFBVTtBQUNuQixNQUFHLGVBQWUsWUFBbEIsRUFBZ0MsT0FBTyw2QkFBUCxDQUFoQyxLQUNLLE9BQU8sdUJBQVA7QUFDTCxFQUhTLEVBRkk7QUFNZCxVQUFVLFlBQVU7QUFDbkIsTUFBRyxlQUFlLFlBQWxCLEVBQWdDLE9BQU8sNkJBQVAsQ0FBaEMsS0FDSyxPQUFPLHVCQUFQO0FBQ0wsRUFIUyxFQU5JO0FBVWQsYUFBWSw2QkFWRTtBQVdkLFFBQU07QUFDTCxZQUFVLGtDQURMO0FBRUwsVUFBUTtBQUZIO0FBWFEsQzs7Ozs7Ozs7O0FDRmYsSUFBSSxJQUFJLE9BQU8sQ0FBZjtBQUNBLElBQUksU0FBUyxDQUFiO0FBQ0EsSUFBSSxRQUFRLE9BQU8sS0FBbkI7QUFDQSxJQUFJLFdBQVcsT0FBTyxRQUF0QjtBQUNBLElBQUksY0FBYyxPQUFPLFdBQXpCO0FBQ0EsSUFBSSxZQUFZLE9BQU8sU0FBdkI7UUFDUyxDLEdBQUEsQztRQUFHLE0sR0FBQSxNO1FBQVEsSyxHQUFBLEs7UUFBTyxRLEdBQUEsUTtRQUFVLFcsR0FBQSxXO1FBQWEsUyxHQUFBLFM7Ozs7O0FDUGxEOztBQUNBOzs7O0FBQ0E7Ozs7OztBQUdBLGNBQVMsTUFBVCxDQUVDO0FBQUE7QUFBQTtBQUNDLG1EQUREO0FBQUE7QUFBQSxDQUZELEVBTUcsU0FBUyxjQUFULENBQXdCLEtBQXhCLENBTkg7Ozs7Ozs7OztBQ0xBOztBQUNBOzs7Ozs7a0JBQ2UsV0FBTSxXQUFOLENBQWtCO0FBQUE7O0FBQ2hDLGtCQUFnQiwyQkFBVTtBQUN6QixTQUFPO0FB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LEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXHJcbnZhciBlbnZpcm9ubWVudCA9IFwiZGV2ZWxvcG1lbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRlbnZpcm9ubWVudDogZW52aXJvbm1lbnQsXHJcblx0YXBpSG9zdDogKGZ1bmN0aW9uKCl7XHJcblx0XHRpZihlbnZpcm9ubWVudCA9PSBcInByb2R1Y3Rpb25cIikgcmV0dXJuIFwiaHR0cDovL2FwaXRlc3QuZmxlY3Rpbm8uY29tXCI7XHJcblx0XHRlbHNlIHJldHVybiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAxMFwiO1xyXG5cdH0oKSksXHJcblx0d2ViSG9zdDogKGZ1bmN0aW9uKCl7XHJcblx0XHRpZihlbnZpcm9ubWVudCA9PSBcInByb2R1Y3Rpb25cIikgcmV0dXJuIFwiaHR0cDovL3dlYnRlc3QuZmxlY3Rpbm8uY29tXCI7XHJcblx0XHRlbHNlIHJldHVybiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xyXG5cdH0oKSksXHJcblx0Z2F0ZXdheUtleTogXCJBVUI1akNrZHEzYjdrVjlEVFRkaVFsbE9SdjVcIixcclxuXHRhdXRoMDp7XHJcblx0XHRjbGllbnRJZDogXCIwU00wZ3JCVG9DSmpXR1ViQnRsWnVIaHlsQ3EyZFZ0M1wiLFxyXG5cdFx0ZG9tYWluOiBcImZsZWN0aW5vLmF1dGgwLmNvbVwiXHJcblx0fVxyXG59XHJcbiIsIlxyXG52YXIgJCA9IHdpbmRvdy4kO1xyXG52YXIgalF1ZXJ5ID0gJDtcclxudmFyIFJlYWN0ID0gd2luZG93LlJlYWN0O1xyXG52YXIgUmVhY3RET00gPSB3aW5kb3cuUmVhY3RET007XHJcbnZhciBSZWFjdFJvdXRlciA9IHdpbmRvdy5SZWFjdFJvdXRlcjtcclxudmFyIEF1dGgwTG9jayA9IHdpbmRvdy5BdXRoMExvY2s7XHJcbmV4cG9ydCB7ICQsIGpRdWVyeSwgUmVhY3QsIFJlYWN0RE9NLCBSZWFjdFJvdXRlciwgQXV0aDBMb2NrIH1cclxuIiwiaW1wb3J0IHsgUmVhY3RET00sIFJlYWN0IH0gZnJvbSAnLi9jZG4nXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xyXG5pbXBvcnQgQWN0aXZpdHkgZnJvbSAnLi92aWV3cy9hY3Rpdml0eSdcclxuXHJcblxyXG5SZWFjdERPTS5yZW5kZXIoKFxyXG5cclxuXHQ8ZGl2PlxyXG5cdFx0PEFjdGl2aXR5Lz5cclxuXHRcdEhpXHJcblx0PC9kaXY+XHJcbiksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XHJcbiIsImltcG9ydCB7IFJlYWN0IH0gZnJvbSAnLi4vY2RuJ1xyXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZy5qcydcclxuZXhwb3J0IGRlZmF1bHQgUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTpmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YWN0aXZpdHk6IG51bGxcclxuXHRcdH07XHJcblx0fSxcclxuXHRjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcclxuXHRcdCQuZ2V0KGNvbmZpZy5hcGlIb3N0ICsgXCIvdjEvdHJhbnNhY3Rpb24vYUwwaXBHMFF0RzlreHdcIilcclxuXHRcdC50aGVuKChkYXRhKT0+e1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHthY3Rpdml0eTpkYXRhfSk7XHJcblx0XHR9KTtcclxuXHJcblx0fSxcclxuXHRyZW5kZXI6IGZ1bmN0aW9uICgpe1xyXG5cdFx0aWYodGhpcy5zdGF0ZS5hY3Rpdml0eSA9PT0gbnVsbCkgcmV0dXJuKDxkaXY+PC9kaXY+KTtcclxuXHRcdGNvbnNvbGUubG9nKHRoaXMuc3RhdGUuYWN0aXZpdHkpXHJcblx0XHR2YXIgYWN0aXZpdHkgPSB0aGlzLnN0YXRlLmFjdGl2aXR5O1xyXG5cdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZShEYXRlLnBhcnNlKGFjdGl2aXR5LlJlY2VpcHQudHJhbnNhY3RlZEF0KSk7XHJcblx0XHR2YXIgZm9ybWF0dGVkRGF0ZSA9IGRhdGUudG9Mb2NhbGVTdHJpbmcoKTtcclxuXHRcdHJldHVybiAoXHJcbiAgICAgICAgIDxkaXYgaWQ9XCJhY3Rpdml0eVwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93IGFjdGl2aXR5LWhlYWRlclwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNlwiPlxyXG5cdFx0XHRcdFx0XHR7Zm9ybWF0dGVkRGF0ZX1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtNiB0ZXh0LXJpZ2h0XCI+XHJcblx0XHRcdFx0XHRcdHthY3Rpdml0eS5LZXkubmFtZX1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgaWQ9XCJyZWNlaXB0SW5mb1wiIGNsYXNzTmFtZT1cInJvdyBtYXJnaW4tdG9wLTE1IG1hcmdpbi1ib3R0b20tMTVcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29sLXhzLTEyIGNvbC1zbS03XCI+XHJcblx0XHRcdFx0XHRcdDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSBtYXJnaW4tdG9wLTEwXCI+PHRib2R5PlxyXG5cdFx0XHRcdFx0XHRcdDx0cj48dGQ+UGhvbmU6PC90ZD48dGQ+e2FjdGl2aXR5LktleS5waG9uZS5yZXBsYWNlKC8oXFxkezN9KShcXGR7M30pKFxcZHs0fSkvLCBcIiQxLSQyLSQzXCIpfTwvdGQ+PC90cj5cclxuXHRcdFx0XHRcdFx0XHQ8dHI+PHRkPkFkZHJlc3M6PC90ZD48dGQ+e2FjdGl2aXR5LktleS5saW5lMX08YnIvPnthY3Rpdml0eS5LZXkuY2l0eX0sIHthY3Rpdml0eS5LZXkuc3RhdGV9IHthY3Rpdml0eS5LZXkuemlwfTwvdGQ+PC90cj5cclxuXHRcdFx0XHRcdFx0XHQ8dHI+PHRkPkVtYWlsOjwvdGQ+PHRkPnthY3Rpdml0eS5LZXkuZW1haWx9PC90ZD48L3RyPlxyXG5cdFx0XHRcdFx0XHRcdDx0cj48dGQ+V2Vic2l0ZTo8L3RkPjx0ZD48YSBocmVmPXthY3Rpdml0eS5LZXkudXJsfT57YWN0aXZpdHkuS2V5LnVybH08L2E+PC90ZD48L3RyPlxyXG5cclxuXHRcdFx0XHRcdFx0PC90Ym9keT48L3RhYmxlPlxyXG4gICAgIFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpZGRlbi14cyBjb2wtc20tNVwiPlxyXG5cdFx0XHRcdFx0ICAgPGRpdiBjbGFzc05hbWU9XCJtYXJnaW4tdG9wLTEwXCI+Q2hhcmdlZCB0byBDQy17YWN0aXZpdHkuTGluay5sYXN0Rm91cn08L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjYXJkIGNhcmQtYmxvY2sgbWFyZ2luLXRvcC0xNSBhbGlnbi1yaWdodFwiPlxyXG5cdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cImNhcmQtdGV4dCBjb2xvci1zZWNvbmRhcnlcIj5Ub3RhbDwvcD5cclxuXHRcdFx0XHRcdFx0XHQ8aDQgY2xhc3NOYW1lPVwiY2FyZC10aXRsZVwiPiR7YWN0aXZpdHkuUmVjZWlwdC50b3RhbH08L2g0PlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgaGlkZGVuLXNtIGhpZGRlbi1tZCBoaWRkZW4tbGcgdGV4dC1jZW50ZXJcIj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXJnaW4tdG9wLTEwXCI+Q2hhcmdlZCBDQy17YWN0aXZpdHkuTGluay5sYXN0Rm91cn08L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXJnaW4tdG9wLTEwXCI+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjb2xvci1zZWNvbmRhcnlcIj5Ub3RhbDogPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiYm9sZCBhbGlnbi1yaWdodFwiPiR7YWN0aXZpdHkuUmVjZWlwdC50b3RhbH08L3NwYW4+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlXCI+XHJcblx0XHRcdFx0XHQ8dGhlYWQ+PHRyPjx0aD5JdGVtPC90aD48dGg+UXVhbnRpdHk8L3RoPjx0aD5Vbml0IENvc3Q8L3RoPjx0aD5Ub3RhbDwvdGg+PC90cj48L3RoZWFkPlxyXG5cdFx0XHRcdFx0PHRib2R5PlxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRhY3Rpdml0eS5SZWNlaXB0Lml0ZW1zLm1hcCgoaXRlbUdyb3VwLCBpKT0+e1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBpdGVtR3JvdXAubWFwKChpdGVtLCBqKT0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYodHlwZW9mIGl0ZW0udW5pdENvc3QgPT0gXCJ1bmRlZmluZWRcIikgdmFyIHVuaXRDb3N0ID0gXCJcIjtcclxuXHRcdFx0XHRcdFx0XHRcdGVsc2UgdmFyIHVuaXRDb3N0ID0gXCIkXCIgKyBpdGVtLnVuaXRDb3N0O1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYodHlwZW9mIGl0ZW0ucXVhbnRpdHkgPT0gXCJ1bmRlZmluZWRcIikgdmFyIHF1YW50aXR5ID0gXCJcIjtcclxuXHRcdFx0XHRcdFx0XHRcdGVsc2UgdmFyIHF1YW50aXR5ID0gaXRlbS5xdWFudGl0eTtcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdFx0XHRcdDx0ciBjbGFzc05hbWU9e2kgPiAwICYmIGogPT0gMCA/IFwiIG5ld1NlY3Rpb25cIjpcIlwifT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGQ+e2l0ZW0uZGVzY3JpcHRpb259PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGQ+e3F1YW50aXR5fTwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PHRkPnt1bml0Q29zdH08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDx0ZD4ke2l0ZW0udG90YWx9PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PC90cj5cclxuXHRcdFx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQ8L3Rib2R5PlxyXG5cdFx0XHRcdDwvdGFibGU+XHJcbiAgICAgICAgIDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG4iXX0=
