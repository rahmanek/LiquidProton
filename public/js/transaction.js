!function e(t,a,n){function c(r,s){if(!a[r]){if(!t[r]){var o="function"==typeof require&&require;if(!s&&o)return o(r,!0);if(l)return l(r,!0);var i=new Error("Cannot find module '"+r+"'");throw i.code="MODULE_NOT_FOUND",i}var m=a[r]={exports:{}};t[r][0].call(m.exports,function(e){var a=t[r][1][e];return c(a?a:e)},m,m.exports,e,t,a,n)}return a[r].exports}for(var l="function"==typeof require&&require,r=0;r<n.length;r++)c(n[r]);return c}({1:[function(e,t,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n="development";a.default={environment:n,apiHost:function(){return"production"==n?"http://apitest.flectino.com":"http://localhost:3010"}(),webHost:function(){return"production"==n?"http://webtest.flectino.com":"http://localhost:3000"}(),auth0:{clientId:"0SM0grBToCJjWGUbBtlZuHhylCq2dVt3",domain:"flectino.auth0.com"}}},{}],2:[function(e,t,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=window.$,c=n,l=window.React,r=window.ReactDOM,s=window.ReactRouter,o=window.Auth0Lock,i=window._;a.$=n,a.jQuery=c,a.React=l,a.ReactDOM=r,a.ReactRouter=s,a.Auth0Lock=o,a.Lodash=i},{}],3:[function(e,t,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=function(e){for(var t=window.location.search.substring(1),a=t.split("/"),n=a[0].split("&"),c=0;c<n.length;c++){var l=n[c].split("=");if(decodeURIComponent(l[0])==e)return decodeURIComponent(l[1])}console.log("Query variable %s not found",e)},c={email:function(e){var t=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(e)},phone:function(e){var t=e.replace(/\D/g,"");if(t.length>=10)return!0}},l=function(e){var t=e.replace(/\D/g,""),a="",n="",c="";t.length>0&&(n="("),t.length>3&&(c=")"),t.length>6&&(a="-");var l=n+t.substring(0,3)+c+t.substring(3,6)+a+t.substring(6,10);return l},r=function(){function e(e,t){for(var a=""+e;a.length<t;)a="0"+a;return a}var t=new Date,a=t.getTimezoneOffset();return(a<0?"+":"-")+e(parseInt(Math.abs(a/60)),2)+e(Math.abs(a%60),2)},s=function(e,t){var a=new Date(e),n=t.split(":"),c=parseInt(n[0]),l=parseInt(n[1].substring(0,2)),r=n[1].substring(2,4);return 12===c?c="am"===r?0:12:"pm"===r&&(c+=12),a.setHours(c),a.setMinutes(l),a.setMinutes(a.getMinutes()-a.getTimezoneOffset()),a.toISOString()};a.getQueryVariable=n,a.isValid=c,a.formatPhone10=l,a.getTimezoneOffset=r,a.createTimeDate=s},{}],4:[function(e,t,a){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("../cdn");a.default=n.React.createClass({displayName:"modal",render:function(){return n.React.createElement("div",{id:"modal"},n.React.createElement("div",{className:"modal fade",id:this.props.name},n.React.createElement("div",{className:"vertical-alignment-helper"},n.React.createElement("div",{className:"modal-dialog vertical-align-center",role:"document"},n.React.createElement("div",{className:"container"},n.React.createElement("div",{className:"modal-content"},n.React.createElement("div",{className:"row"},n.React.createElement("div",{className:"col-xs-12"},this.props.children))))))))}})},{"../cdn":2}],5:[function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function c(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var l=e("./cdn"),r=e("../config"),s=n(r),o=e("./components/modal"),i=n(o),m=(e("./classes/Utilities"),l.React.createClass({displayName:"Transaction",getInitialState:function(){return{transaction:null,showEmail:!1,showPhone:!1,navbar:!1,share:!1}},componentWillMount:function(){var e=this;$.get(s.default.apiHost+"/v1/transaction/"+window.location.pathname.split("/")[2]).then(function(t){t.Items.sort(function(e,t){return e.sequence>t.sequence?1:-1}),e.setState({transaction:t},function(){JsBarcode("#code128","1234567890123",{format:"itf14"})})})},sendTransaction:function(){console.log("Sent!")},sendCoupon:function(){jQuery("#couponModal").modal("show")},returnPolicy:function(){jQuery("#returnModal").modal("show")},toggleCollapse:function(e){var t={};t[e]=!document.getElementById(e).classList.contains("in"),this.setState(t),$("#"+e).collapse("toggle")},render:function(){var e,t=this,a=this.state.transaction;if(null===a)return l.React.createElement("div",null,"Loading...");var n=new Date(Date.parse(a.transactedAt)),r=n.toLocaleString().replace(/([:][1-9]{2}[" "])/," "),s=[],o=(e={facebook:"facebook",phone:"phone",web:"globe",googlePlus:"google-plus"},c(e,"phone","phone"),c(e,"email","envelope"),c(e,"instagram","instagram"),c(e,"pinterest","pinterest-p"),c(e,"twitter","twitter"),e);return a.contact.map(function(e,t){var a=e.value;"email"==e.type&&(e.value="mailto:"+a),"phone"==e.type&&(e.value="tel:"+a),s.push(l.React.createElement("a",{key:t,href:e.value,className:"color-white"},l.React.createElement("li",{className:"list-group-item bg-inverse"},e.description,l.React.createElement("i",{className:"vertical-align-middle float-right fa fa-fw line-height-inherit fa-"+o[e.type]}),"phone"==e.type||"email"==e.type?l.React.createElement("div",{className:"text-muted nowrap"},a):l.React.createElement("div",null))))}),l.React.createElement("div",{id:"transaction",className:"container"},l.React.createElement("div",{className:"collapse menu overflow-scroll-y position-fixed",id:"navbar"},l.React.createElement("div",{className:"height-100vh bg-inverse text-white"},l.React.createElement("li",{className:"list-group-item bg-inverse menuHead"},"Connect with ",a.Key.name),l.React.createElement("ul",{className:"list-group bg-inverse"},s.map(function(e){return e})))),l.React.createElement("div",{className:"row"},l.React.createElement("div",{className:"col-xs-12 margin-top-15"},l.React.createElement("div",{className:"col-xs-3 padding-left-0"},l.React.createElement("img",{className:"logo",src:"/assets/logos/dunk.jpg"})),l.React.createElement("div",{className:"col-xs-9 padding-left-0"},l.React.createElement("div",{className:"inline-block"},l.React.createElement("div",{className:"brand-title vertical-align"},a.Key.name),l.React.createElement("div",{className:"address"},a.address.line1,"undefined"==typeof a.address.line2?"":" "+a.address.line2,", ",a.address.city,", ",a.address.state," ",a.address.postalCode))))),l.React.createElement("div",{className:"row activity-header"},l.React.createElement("div",{className:"col-xs-8 date"},r),l.React.createElement("div",{className:"col-xs-4 total align-center"},l.React.createElement("div",{className:"col-xs-6",onClick:function(){return t.toggleCollapse("share")}},this.state.share?l.React.createElement("i",{className:"fa fa-share-alt color-black"}):l.React.createElement("i",{className:"fa fa-share-alt"})),l.React.createElement("div",{className:"col-xs-6 ",onClick:function(){return t.toggleCollapse("navbar")}},this.state.navbar?l.React.createElement("i",{className:"fa fa-bars color-black"}):l.React.createElement("i",{className:"fa fa-bars"})))),l.React.createElement("div",{className:"row promo1 vertical-align"},l.React.createElement("div",{className:"col-xs-6"},l.React.createElement("a",{href:"javascript:",onClick:this.returnPolicy},"Return Policy")),l.React.createElement("div",{className:"col-xs-6 price align-right padding-right-0"},"$",(a.total/100).toFixed(2))),l.React.createElement("div",{id:"share",className:"bg-inverse row collapse text-white padding-top-10 padding-bottom-5 margin-bottom-15"},l.React.createElement("div",{className:"col-xs-12 align-center margin-bottom-15"},"Share your transaction"),l.React.createElement("div",{className:"col-xs-12"},l.React.createElement("div",{className:"col-xs-6 align-center"},l.React.createElement("i",{className:"fa fa-fw fa-envelope font-size-42",onClick:function(){return t.setState({showText:!1,showEmail:!0})}}),l.React.createElement("br",null),"Email"),l.React.createElement("div",{className:"col-xs-6 align-center"},l.React.createElement("i",{className:"fa fa-fw fa-phone font-size-42",onClick:function(){return t.setState({showText:!0,showEmail:!1})}}),l.React.createElement("br",null),"Text")),this.state.showEmail||this.state.showText?l.React.createElement("div",{className:"col-xs-12 margin-top-20 margin-bottom-10"},l.React.createElement("div",{className:"col-xs-8 offset-xs-1"},this.state.showEmail?l.React.createElement("input",{className:"form-control",placeholder:"Email Address"}):l.React.createElement("input",{className:"form-control",placeholder:"Phone Number"})),l.React.createElement("button",{type:"button",className:"margin-top-5 col-xs-2 btn btn-info btn-sm",onClick:this.sendTransaction},"Send")):l.React.createElement("div",{className:"col-xs-12 margin-bottom-15"})),l.React.createElement("table",{className:"table"},l.React.createElement("thead",null,l.React.createElement("tr",null,l.React.createElement("th",null),l.React.createElement("th",null,"Item"),l.React.createElement("th",null,"Total"))),l.React.createElement("tbody",null,a.Items.map(function(e,t){if("undefined"==typeof e.unitPrice);else{"$"+e.unitPrice/100}if("undefined"==typeof e.quantity)var n="";else var n=e.quantity;var c=!1;return a.itemGroups.map(function(t){t.start==e.sequence&&(c=!0)}),l.React.createElement("tr",{className:c?"newSection":"",key:t},l.React.createElement("td",null,n),l.React.createElement("td",null,e.description),l.React.createElement("td",null,"$",(e.total/100).toFixed(2)))}))),l.React.createElement("div",{className:"row promo1 align-center"},l.React.createElement("div",{className:"col-xs-12"},"Get a free donut on your next visit! ",l.React.createElement("br",null),l.React.createElement("a",{className:"promo",href:"javascript:"},l.React.createElement("button",{type:"button",className:"btn btn-sm btn-secondary margin-top-10",onClick:this.sendCoupon,"data-dismiss":"modal"},"Claim Here")))),l.React.createElement("div",{className:"row"},l.React.createElement("svg",{className:"margin-auto display-block",id:"code128"})),l.React.createElement(i.default,{name:"returnModal"},l.React.createElement("div",null,l.React.createElement("div",{className:"align-center"},l.React.createElement("div",{className:"bold padding-bottom-20"},"Return Policy"),l.React.createElement("div",null,"Return stuff in 90 days and you good.")),l.React.createElement("div",{className:"row padding-top-20"},l.React.createElement("button",{type:"button",className:"col-xs-6 offset-xs-3 btn btn-app-primary",onClick:this.clearForm,"data-dismiss":"modal"},"Go Back")))),l.React.createElement(i.default,{name:"couponModal"},l.React.createElement("div",null,l.React.createElement("div",{className:"align-center"},l.React.createElement("div",{className:"bold padding-bottom-20"},"Your coupon is on its way!"),l.React.createElement("div",null,"You should receive your coupon by text soon!")),l.React.createElement("div",{className:"row padding-top-20"},l.React.createElement("button",{type:"button",className:"col-xs-6 offset-xs-3 btn btn-app-primary",onClick:this.clearForm,"data-dismiss":"modal"},"Go Back")))))}}));l.ReactDOM.render(l.React.createElement("div",null,l.React.createElement(m,null)),document.getElementById("app"))},{"../config":1,"./cdn":2,"./classes/Utilities":3,"./components/modal":4}]},{},[5]);