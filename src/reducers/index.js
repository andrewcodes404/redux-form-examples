import { combineReducers } from 'redux';
import DataReducer from './reducerData';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    data: DataReducer,
    form: formReducer
});

export default rootReducer;