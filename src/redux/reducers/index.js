import { combineReducers } from 'redux';
import getUser from './get';
import createUser from './create';
import editUser from './edit';
import deleteUser from './delete';

const reducers = combineReducers({
  getUser,
  createUser,
  editUser,
  deleteUser
});

export default reducers;