//take all the slices that we are creating (combined all the reducers)
import { combineReducers } from "redux"; 
import storage from "redux-persist/lib/storage";
import appReducer from './slices/app'
import authReducer from './slices/authSlice'
import messageReducer from './slices/messageSlice'
import usersReducer from './slices/usersSlice'
import chatReducer from './slices/chatSlice'


//slices

//create root configuration (how data store and how read out data from store)
const rootPersistConfig = {
    key:'root',
    storage,
    keyPrefix: 'redux-'
    // whitelist:[],
    // blacklist:[]
}

//create combine reducer
const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    messages: messageReducer,
    users: usersReducer,
    chats: chatReducer,
});

export {rootPersistConfig, rootReducer}