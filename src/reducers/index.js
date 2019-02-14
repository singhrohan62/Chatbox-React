import { ADD_USER } from '../constants/action-types'

const initialState = {
  isLoggedIn: false,
  username: '',
  users: [],
  socketID:'',
  messageSent:'',
  usermsgs:[],
}

function rootReducer(state = initialState, action) {
	//return state;
	if (action.type === ADD_USER)
	{
		return Object.assign( {}, state, {
			users: state.users.concat(action.payload),
			username: action.payload
		});
	}
	return state;
}

export default rootReducer;