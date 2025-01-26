import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage by default
import { PersistGate } from "redux-persist/integration/react";

// Define initial state and reducer
const initialState = {
  user: null, // The user data (e.g., username)
};

const authReducer = (state = initialState, action) => {
  console.log("====================================");
  console.log(state, action);
  console.log("====================================");
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action?.formData };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

// Persist config to store the user data
const persistConfig = {
  key: "root",
  storage, // This uses localStorage by default
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
