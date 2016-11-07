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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Landing = _cdn.React.createClass({
	displayName: 'Landing',

	getInitialState: function getInitialState() {
		return {
			transaction: null
		};
	},
	componentDidMount: function componentDidMount() {
		var _this = this;

		$.get(_config2.default.apiHost + "/v1/transaction/VJV4-MSI9Nqirw").then(function (data) {
			_this.setState({ transaction: data });
		});
	},
	render: function render() {
		if (this.state.transaction === null) return _cdn.React.createElement('div', null);
		console.log(this.state.transaction);return;
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

_cdn.ReactDOM.render(_cdn.React.createElement(
	'div',
	null,
	_cdn.React.createElement(Landing, null)
), document.getElementById('app'));

},{"../config":1,"./cdn":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcuanMiLCJzcmNcXGNkbi5qcyIsInNyY1xcbGFuZGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0NBLElBQUksY0FBYyxhQUFsQjs7a0JBRWU7QUFDZCxjQUFhLFdBREM7QUFFZCxVQUFVLFlBQVU7QUFDbkIsTUFBRyxlQUFlLFlBQWxCLEVBQWdDLE9BQU8sNkJBQVAsQ0FBaEMsS0FDSyxPQUFPLHVCQUFQO0FBQ0wsRUFIUyxFQUZJO0FBTWQsVUFBVSxZQUFVO0FBQ25CLE1BQUcsZUFBZSxZQUFsQixFQUFnQyxPQUFPLDZCQUFQLENBQWhDLEtBQ0ssT0FBTyx1QkFBUDtBQUNMLEVBSFMsRUFOSTtBQVVkLGFBQVksNkJBVkU7QUFXZCxRQUFNO0FBQ0wsWUFBVSxrQ0FETDtBQUVMLFVBQVE7QUFGSDtBQVhRLEM7Ozs7Ozs7OztBQ0ZmLElBQUksSUFBSSxPQUFPLENBQWY7QUFDQSxJQUFJLFNBQVMsQ0FBYjtBQUNBLElBQUksUUFBUSxPQUFPLEtBQW5CO0FBQ0EsSUFBSSxXQUFXLE9BQU8sUUFBdEI7QUFDQSxJQUFJLGNBQWMsT0FBTyxXQUF6QjtBQUNBLElBQUksWUFBWSxPQUFPLFNBQXZCO1FBQ1MsQyxHQUFBLEM7UUFBRyxNLEdBQUEsTTtRQUFRLEssR0FBQSxLO1FBQU8sUSxHQUFBLFE7UUFBVSxXLEdBQUEsVztRQUFhLFMsR0FBQSxTOzs7OztBQ1BsRDs7QUFDQTs7Ozs7O0FBRUEsSUFBSSxVQUFVLFdBQU0sV0FBTixDQUFrQjtBQUFBOztBQUMvQixrQkFBZ0IsMkJBQVU7QUFDekIsU0FBTztBQUNOLGdCQUFhO0FBRFAsR0FBUDtBQUdBLEVBTDhCO0FBTS9CLG9CQUFtQiw2QkFBVTtBQUFBOztBQUM1QixJQUFFLEdBQUYsQ0FBTSxpQkFBTyxPQUFQLEdBQWlCLGdDQUF2QixFQUNDLElBREQsQ0FDTSxVQUFDLElBQUQsRUFBUTtBQUNiLFNBQUssUUFBTCxDQUFjLEVBQUMsYUFBWSxJQUFiLEVBQWQ7QUFDQSxHQUhEO0FBS0EsRUFaOEI7QUFhL0IsU0FBUSxrQkFBVztBQUNsQixNQUFHLEtBQUssS0FBTCxDQUFXLFdBQVgsS0FBMkIsSUFBOUIsRUFBb0MsT0FBTyxxQ0FBUDtBQUNwQyxVQUFRLEdBQVIsQ0FBWSxLQUFLLEtBQUwsQ0FBVyxXQUF2QixFQUFxQztBQUNyQyxNQUFJLFdBQVcsS0FBSyxLQUFMLENBQVcsUUFBMUI7QUFDQSxNQUFJLE9BQU8sSUFBSSxJQUFKLENBQVMsS0FBSyxLQUFMLENBQVcsU0FBUyxPQUFULENBQWlCLFlBQTVCLENBQVQsQ0FBWDtBQUNBLE1BQUksZ0JBQWdCLEtBQUssY0FBTCxFQUFwQjtBQUNBLFNBQ087QUFBQTtBQUFBLEtBQUssSUFBRyxVQUFSO0FBQ0w7QUFBQTtBQUFBLE1BQUssV0FBVSxxQkFBZjtBQUNDO0FBQUE7QUFBQSxPQUFLLFdBQVUsVUFBZjtBQUNFO0FBREYsS0FERDtBQUlDO0FBQUE7QUFBQSxPQUFLLFdBQVUscUJBQWY7QUFDRSxjQUFTLEdBQVQsQ0FBYTtBQURmO0FBSkQsSUFESztBQVNMO0FBQUE7QUFBQSxNQUFLLElBQUcsYUFBUixFQUFzQixXQUFVLG9DQUFoQztBQUNDO0FBQUE7QUFBQSxPQUFLLFdBQVUsb0JBQWY7QUFDQztBQUFBO0FBQUEsUUFBTyxXQUFVLHFCQUFqQjtBQUF1QztBQUFBO0FBQUE7QUFDdEM7QUFBQTtBQUFBO0FBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFKO0FBQW1CO0FBQUE7QUFBQTtBQUFLLGtCQUFTLEdBQVQsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLENBQTJCLHVCQUEzQixFQUFvRCxVQUFwRDtBQUFMO0FBQW5CLFFBRHNDO0FBRXRDO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBSjtBQUFxQjtBQUFBO0FBQUE7QUFBSyxrQkFBUyxHQUFULENBQWEsS0FBbEI7QUFBd0IsNkNBQXhCO0FBQThCLGtCQUFTLEdBQVQsQ0FBYSxJQUEzQztBQUFBO0FBQW1ELGtCQUFTLEdBQVQsQ0FBYSxLQUFoRTtBQUFBO0FBQXdFLGtCQUFTLEdBQVQsQ0FBYTtBQUFyRjtBQUFyQixRQUZzQztBQUd0QztBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQUo7QUFBbUI7QUFBQTtBQUFBO0FBQUssa0JBQVMsR0FBVCxDQUFhO0FBQWxCO0FBQW5CLFFBSHNDO0FBSXRDO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBSjtBQUFxQjtBQUFBO0FBQUE7QUFBSTtBQUFBO0FBQUEsWUFBRyxNQUFNLFNBQVMsR0FBVCxDQUFhLEdBQXRCO0FBQTRCLG1CQUFTLEdBQVQsQ0FBYTtBQUF6QztBQUFKO0FBQXJCO0FBSnNDO0FBQXZDO0FBREQsS0FERDtBQVVDO0FBQUE7QUFBQSxPQUFLLFdBQVUsb0JBQWY7QUFDRztBQUFBO0FBQUEsUUFBSyxXQUFVLGVBQWY7QUFBQTtBQUE4QyxlQUFTLElBQVQsQ0FBYztBQUE1RCxNQURIO0FBRUM7QUFBQTtBQUFBLFFBQUssV0FBVSwyQ0FBZjtBQUNDO0FBQUE7QUFBQSxTQUFHLFdBQVUsMkJBQWI7QUFBQTtBQUFBLE9BREQ7QUFFQztBQUFBO0FBQUEsU0FBSSxXQUFVLFlBQWQ7QUFBQTtBQUE2QixnQkFBUyxPQUFULENBQWlCO0FBQTlDO0FBRkQ7QUFGRCxLQVZEO0FBaUJDO0FBQUE7QUFBQSxPQUFLLFdBQVUscURBQWY7QUFDQztBQUFBO0FBQUEsUUFBSyxXQUFVLGVBQWY7QUFBQTtBQUEyQyxlQUFTLElBQVQsQ0FBYztBQUF6RCxNQUREO0FBRUM7QUFBQTtBQUFBLFFBQUssV0FBVSxlQUFmO0FBQ0U7QUFBQTtBQUFBLFNBQU0sV0FBVSxpQkFBaEI7QUFBQTtBQUFBLE9BREY7QUFFRTtBQUFBO0FBQUEsU0FBTSxXQUFVLGtCQUFoQjtBQUFBO0FBQXFDLGdCQUFTLE9BQVQsQ0FBaUI7QUFBdEQ7QUFGRjtBQUZEO0FBakJELElBVEs7QUFrQ0w7QUFBQTtBQUFBLE1BQU8sV0FBVSxPQUFqQjtBQUNDO0FBQUE7QUFBQTtBQUFPO0FBQUE7QUFBQTtBQUFJO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBSjtBQUFpQjtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQWpCO0FBQWtDO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBbEM7QUFBb0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFwRDtBQUFQLEtBREQ7QUFFQztBQUFBO0FBQUE7QUFFQyxjQUFTLE9BQVQsQ0FBaUIsS0FBakIsQ0FBdUIsR0FBdkIsQ0FBMkIsVUFBQyxTQUFELEVBQVksQ0FBWixFQUFnQjtBQUMxQyxhQUFPLFVBQVUsR0FBVixDQUFjLFVBQUMsSUFBRCxFQUFPLENBQVAsRUFBVztBQUMvQixXQUFHLE9BQU8sS0FBSyxRQUFaLElBQXdCLFdBQTNCLEVBQXdDLElBQUksV0FBVyxFQUFmLENBQXhDLEtBQ0ssSUFBSSxXQUFXLE1BQU0sS0FBSyxRQUExQjtBQUNMLFdBQUcsT0FBTyxLQUFLLFFBQVosSUFBd0IsV0FBM0IsRUFBd0MsSUFBSSxXQUFXLEVBQWYsQ0FBeEMsS0FDSyxJQUFJLFdBQVcsS0FBSyxRQUFwQjtBQUNMLGNBQ0M7QUFBQTtBQUFBLFVBQUksV0FBVyxJQUFJLENBQUosSUFBUyxLQUFLLENBQWQsR0FBa0IsYUFBbEIsR0FBZ0MsRUFBL0M7QUFDQztBQUFBO0FBQUE7QUFBSyxjQUFLO0FBQVYsU0FERDtBQUVDO0FBQUE7QUFBQTtBQUFLO0FBQUwsU0FGRDtBQUdDO0FBQUE7QUFBQTtBQUFLO0FBQUwsU0FIRDtBQUlDO0FBQUE7QUFBQTtBQUFBO0FBQU0sY0FBSztBQUFYO0FBSkQsUUFERDtBQVFBLE9BYk0sQ0FBUDtBQWNBLE1BZkQ7QUFGRDtBQUZEO0FBbENLLEdBRFA7QUE0REE7QUEvRThCLENBQWxCLENBQWQ7O0FBbUZBLGNBQVMsTUFBVCxDQUNDO0FBQUE7QUFBQTtBQUNDLDBCQUFDLE9BQUQ7QUFERCxDQURELEVBSUcsU0FBUyxjQUFULENBQXdCLEtBQXhCLENBSkgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXHJcbnZhciBlbnZpcm9ubWVudCA9IFwiZGV2ZWxvcG1lbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHRlbnZpcm9ubWVudDogZW52aXJvbm1lbnQsXHJcblx0YXBpSG9zdDogKGZ1bmN0aW9uKCl7XHJcblx0XHRpZihlbnZpcm9ubWVudCA9PSBcInByb2R1Y3Rpb25cIikgcmV0dXJuIFwiaHR0cDovL2FwaXRlc3QuZmxlY3Rpbm8uY29tXCI7XHJcblx0XHRlbHNlIHJldHVybiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAxMFwiO1xyXG5cdH0oKSksXHJcblx0d2ViSG9zdDogKGZ1bmN0aW9uKCl7XHJcblx0XHRpZihlbnZpcm9ubWVudCA9PSBcInByb2R1Y3Rpb25cIikgcmV0dXJuIFwiaHR0cDovL3dlYnRlc3QuZmxlY3Rpbm8uY29tXCI7XHJcblx0XHRlbHNlIHJldHVybiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiO1xyXG5cdH0oKSksXHJcblx0Z2F0ZXdheUtleTogXCJBVUI1akNrZHEzYjdrVjlEVFRkaVFsbE9SdjVcIixcclxuXHRhdXRoMDp7XHJcblx0XHRjbGllbnRJZDogXCIwU00wZ3JCVG9DSmpXR1ViQnRsWnVIaHlsQ3EyZFZ0M1wiLFxyXG5cdFx0ZG9tYWluOiBcImZsZWN0aW5vLmF1dGgwLmNvbVwiXHJcblx0fVxyXG59XHJcbiIsIlxyXG52YXIgJCA9IHdpbmRvdy4kO1xyXG52YXIgalF1ZXJ5ID0gJDtcclxudmFyIFJlYWN0ID0gd2luZG93LlJlYWN0O1xyXG52YXIgUmVhY3RET00gPSB3aW5kb3cuUmVhY3RET007XHJcbnZhciBSZWFjdFJvdXRlciA9IHdpbmRvdy5SZWFjdFJvdXRlcjtcclxudmFyIEF1dGgwTG9jayA9IHdpbmRvdy5BdXRoMExvY2s7XHJcbmV4cG9ydCB7ICQsIGpRdWVyeSwgUmVhY3QsIFJlYWN0RE9NLCBSZWFjdFJvdXRlciwgQXV0aDBMb2NrIH1cclxuIiwiaW1wb3J0IHsgUmVhY3RET00sIFJlYWN0IH0gZnJvbSAnLi9jZG4nXHJcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJ1xyXG5cclxudmFyIExhbmRpbmcgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0Z2V0SW5pdGlhbFN0YXRlOmZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR0cmFuc2FjdGlvbjogbnVsbFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xyXG5cdFx0JC5nZXQoY29uZmlnLmFwaUhvc3QgKyBcIi92MS90cmFuc2FjdGlvbi9WSlY0LU1TSTlOcWlyd1wiKVxyXG5cdFx0LnRoZW4oKGRhdGEpPT57XHJcblx0XHRcdHRoaXMuc2V0U3RhdGUoe3RyYW5zYWN0aW9uOmRhdGF9KTtcclxuXHRcdH0pO1xyXG5cclxuXHR9LFxyXG5cdHJlbmRlcjogZnVuY3Rpb24gKCl7XHJcblx0XHRpZih0aGlzLnN0YXRlLnRyYW5zYWN0aW9uID09PSBudWxsKSByZXR1cm4oPGRpdj48L2Rpdj4pO1xyXG5cdFx0Y29uc29sZS5sb2codGhpcy5zdGF0ZS50cmFuc2FjdGlvbik7IHJldHVybjtcclxuXHRcdHZhciBhY3Rpdml0eSA9IHRoaXMuc3RhdGUuYWN0aXZpdHk7XHJcblx0XHR2YXIgZGF0ZSA9IG5ldyBEYXRlKERhdGUucGFyc2UoYWN0aXZpdHkuUmVjZWlwdC50cmFuc2FjdGVkQXQpKTtcclxuXHRcdHZhciBmb3JtYXR0ZWREYXRlID0gZGF0ZS50b0xvY2FsZVN0cmluZygpO1xyXG5cdFx0cmV0dXJuIChcclxuICAgICAgICAgPGRpdiBpZD1cImFjdGl2aXR5XCI+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJyb3cgYWN0aXZpdHktaGVhZGVyXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02XCI+XHJcblx0XHRcdFx0XHRcdHtmb3JtYXR0ZWREYXRlfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy02IHRleHQtcmlnaHRcIj5cclxuXHRcdFx0XHRcdFx0e2FjdGl2aXR5LktleS5uYW1lfVxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBpZD1cInJlY2VpcHRJbmZvXCIgY2xhc3NOYW1lPVwicm93IG1hcmdpbi10b3AtMTUgbWFyZ2luLWJvdHRvbS0xNVwiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wteHMtMTIgY29sLXNtLTdcIj5cclxuXHRcdFx0XHRcdFx0PHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIG1hcmdpbi10b3AtMTBcIj48dGJvZHk+XHJcblx0XHRcdFx0XHRcdFx0PHRyPjx0ZD5QaG9uZTo8L3RkPjx0ZD57YWN0aXZpdHkuS2V5LnBob25lLnJlcGxhY2UoLyhcXGR7M30pKFxcZHszfSkoXFxkezR9KS8sIFwiJDEtJDItJDNcIil9PC90ZD48L3RyPlxyXG5cdFx0XHRcdFx0XHRcdDx0cj48dGQ+QWRkcmVzczo8L3RkPjx0ZD57YWN0aXZpdHkuS2V5LmxpbmUxfTxici8+e2FjdGl2aXR5LktleS5jaXR5fSwge2FjdGl2aXR5LktleS5zdGF0ZX0ge2FjdGl2aXR5LktleS56aXB9PC90ZD48L3RyPlxyXG5cdFx0XHRcdFx0XHRcdDx0cj48dGQ+RW1haWw6PC90ZD48dGQ+e2FjdGl2aXR5LktleS5lbWFpbH08L3RkPjwvdHI+XHJcblx0XHRcdFx0XHRcdFx0PHRyPjx0ZD5XZWJzaXRlOjwvdGQ+PHRkPjxhIGhyZWY9e2FjdGl2aXR5LktleS51cmx9PnthY3Rpdml0eS5LZXkudXJsfTwvYT48L3RkPjwvdHI+XHJcblxyXG5cdFx0XHRcdFx0XHQ8L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuLXhzIGNvbC1zbS01XCI+XHJcblx0XHRcdFx0XHQgICA8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi10b3AtMTBcIj5DaGFyZ2VkIHRvIENDLXthY3Rpdml0eS5MaW5rLmxhc3RGb3VyfTwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNhcmQgY2FyZC1ibG9jayBtYXJnaW4tdG9wLTE1IGFsaWduLXJpZ2h0XCI+XHJcblx0XHRcdFx0XHRcdFx0PHAgY2xhc3NOYW1lPVwiY2FyZC10ZXh0IGNvbG9yLXNlY29uZGFyeVwiPlRvdGFsPC9wPlxyXG5cdFx0XHRcdFx0XHRcdDxoNCBjbGFzc05hbWU9XCJjYXJkLXRpdGxlXCI+JHthY3Rpdml0eS5SZWNlaXB0LnRvdGFsfTwvaDQ+XHJcblx0XHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbC14cy0xMiBoaWRkZW4tc20gaGlkZGVuLW1kIGhpZGRlbi1sZyB0ZXh0LWNlbnRlclwiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi10b3AtMTBcIj5DaGFyZ2VkIENDLXthY3Rpdml0eS5MaW5rLmxhc3RGb3VyfTwvZGl2PlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hcmdpbi10b3AtMTBcIj5cclxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNvbG9yLXNlY29uZGFyeVwiPlRvdGFsOiA8L3NwYW4+XHJcblx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJib2xkIGFsaWduLXJpZ2h0XCI+JHthY3Rpdml0eS5SZWNlaXB0LnRvdGFsfTwvc3Bhbj5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8dGFibGUgY2xhc3NOYW1lPVwidGFibGVcIj5cclxuXHRcdFx0XHRcdDx0aGVhZD48dHI+PHRoPkl0ZW08L3RoPjx0aD5RdWFudGl0eTwvdGg+PHRoPlVuaXQgQ29zdDwvdGg+PHRoPlRvdGFsPC90aD48L3RyPjwvdGhlYWQ+XHJcblx0XHRcdFx0XHQ8dGJvZHk+XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdGFjdGl2aXR5LlJlY2VpcHQuaXRlbXMubWFwKChpdGVtR3JvdXAsIGkpPT57XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGl0ZW1Hcm91cC5tYXAoKGl0ZW0sIGopPT57XHJcblx0XHRcdFx0XHRcdFx0XHRpZih0eXBlb2YgaXRlbS51bml0Q29zdCA9PSBcInVuZGVmaW5lZFwiKSB2YXIgdW5pdENvc3QgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB2YXIgdW5pdENvc3QgPSBcIiRcIiArIGl0ZW0udW5pdENvc3Q7XHJcblx0XHRcdFx0XHRcdFx0XHRpZih0eXBlb2YgaXRlbS5xdWFudGl0eSA9PSBcInVuZGVmaW5lZFwiKSB2YXIgcXVhbnRpdHkgPSBcIlwiO1xyXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB2YXIgcXVhbnRpdHkgPSBpdGVtLnF1YW50aXR5O1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdFx0XHRcdFx0PHRyIGNsYXNzTmFtZT17aSA+IDAgJiYgaiA9PSAwID8gXCIgbmV3U2VjdGlvblwiOlwiXCJ9PlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDx0ZD57aXRlbS5kZXNjcmlwdGlvbn08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDx0ZD57cXVhbnRpdHl9PC90ZD5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8dGQ+e3VuaXRDb3N0fTwvdGQ+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PHRkPiR7aXRlbS50b3RhbH08L3RkPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8L3RyPlxyXG5cdFx0XHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdDwvdGJvZHk+XHJcblx0XHRcdFx0PC90YWJsZT5cclxuICAgICAgICAgPC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuUmVhY3RET00ucmVuZGVyKChcclxuXHQ8ZGl2PlxyXG5cdFx0PExhbmRpbmcvPlxyXG5cdDwvZGl2PlxyXG4pLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xyXG4iXX0=
