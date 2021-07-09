import { createContext } from "react";

export default function stateReducer(currentState, action) {
  switch (action.type) {
    case "addEntry": {
      return {
        ...currentState,
        entries: [
          ...currentState.entries,
          { category: action.category, text: action.text },
        ],
      }
    }
    case "setCategories": {
      return {
        ...currentState,
        categories: action.categories
      }
    }

    case "setEntries": {
      return {
        ...currentState,
        categories: action.entries
      }
    }
    
    case "setToken": {
      localStorage.setItem("token", action.data.token)
      return {
        ...currentState,
        categories: action.data.token
      }
    }

    default:
      return currentState;
  }
}

export const stateContext = createContext();
