import { Auth0Lock, ReactRouter } from '../cdn'
import config from '../../config.js'
import User from './User';
var browserHistory = ReactRouter.browserHistory;
export default class Key {

	static update(postData, user){
		return User.getBasicToken().then(function(basic){
			return $.ajax({
				url: config.apiHost + "/v1/key",
				type: "post",
				headers: {
					Authorization: basic,
				},
				data:postData
			});
		});
	}
}
