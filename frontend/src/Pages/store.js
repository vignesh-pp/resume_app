import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage by default
import { PersistGate } from "redux-persist/integration/react";

// Define initial state and reducer
const initialState = {
  user: null, // The user data (e.g., username)
  user_template_details: null,
};

const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action?.formData };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        all_templates: null,
        my_resumes: null,
        user_template_details: null,
      };
    // case "ALL_TEMPLATES":
    //   return { ...state, all_templates: action };
    // case "MY_RESUMES":
    //   return { ...state, my_resumes: action };
    // case "USER_TEMPLATES":
    //   return { ...state, all_templates: action };
    case "SELECTED_USER_NAME":
      return {
        ...state,
        username: action.username
      };
    
    case "USER_TEMPLATE_DETAILS":
      return {
        ...state,
        user_template_details: action?.data ? action?.data : action, // <== not action.payload
      };

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
