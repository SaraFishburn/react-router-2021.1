import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { stateContext } from "../stateReducer";

const Login = (props) => {
  const [errorMessage, setErrorMessage] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const history = useHistory();
  const { dispatch } = useContext(stateContext);

  const submit = async (event) => {
    event.preventDefault();
    const user = { email, password }
    // const newEntry = { category_id: category_id, content: entry }
    const res = await fetch("http://localhost:4000/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await res.json()

    if (res.status === 200) {
      dispatch({
        type: "setToken",
        data
      });
      history.push("/");
    } 
    else {
      setErrorMessage(data.error)

    }
  };

  return (
    <div>
      {errorMessage ? (
        <h4 style={{ color: "red" }}>{errorMessage}</h4>
      ) : (
        <>
          <h1>Login</h1>
          <form onSubmit={submit}>
            <div>
              <label htmlFor="">Email: </label>
              <input onchange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div>
              <label htmlFor="">Password: </label>
              <input type="password" onchange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </div>
  );

}

export default Login
