import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import stateChangeReducer from "../app/reducers/stateChangeReducer";
import authReducer from "../app/reducers/authReducer";
// import chatbotReducer from "../app/reducers/chatbotReducer";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  users: authReducer,
  stateChangw: stateChangeReducer,
  // chatbot: chatbotReducer
//   messages: messageReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
//  whitelist: ["messages", "users"],
whitelist: [ "users"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

let persistor = persistStore(store);

export default store;
export { persistor };
