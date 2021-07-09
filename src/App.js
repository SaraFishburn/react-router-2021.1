import React, { useReducer, useEffect } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/Home";
import CategorySelection from "./components/CategorySelection";
import NewEntry from "./components/NewEntry";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Nav from "./components/Nav";
import stateReducer, { stateContext } from "./stateReducer";

function App() {
  const [store, dispatch] = useReducer(stateReducer, {
    categories: [],
    entries: [],
    token: localStorage.getItem("token")
  });

  useEffect(() => {
    if (!store.token) return
    fetch("http://localhost:4000/api/v1/categories")
    .then(res => res.json())
    .then(data => dispatch({
      type: "setCategories",
      categories: data
    }))

    fetch("http://localhost:4000/api/v1/entries")
    .then(res => res.json())
    .then(data => dispatch({
      type: "setEntries",
      entries: data
    }))
  }, [store.token])

  return (
    <stateContext.Provider value={{ ...store, dispatch }}>
      {store.token ? (
        <Login />
      ) : (
        <>
          <h1>Journal</h1>
          <BrowserRouter>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/entry/new/:category_id" component={NewEntry} />
              <Route exact path="/category" component={CategorySelection} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
          </>
      )}
    </stateContext.Provider>
  );
}

export default App;
