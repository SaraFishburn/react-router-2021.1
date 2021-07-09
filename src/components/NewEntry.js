import { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { stateContext } from "../stateReducer";

const NewEntry = (props) => {
  const [errorMessage, setErrorMessage] = useState("Loading");
  const [entry, setEntry] = useState("");
  const [category, setCategory] = useState(null);
  const { category_id } = useParams();
  const { categories, dispatch } = useContext(stateContext);
  const history = useHistory();

  useEffect(() => {
    const cat = categories.find(cat => cat.id == category_id);
    setCategory(cat)
    cat ? setErrorMessage(null) : setErrorMessage("Invalid category");
  }, [category_id, categories]);

  const submit = async (event) => {
    event.preventDefault();
    const newEntry = { category_id: category_id, content: entry }
    const res = await fetch("http://localhost:4000/api/v1/entries", {
      method: "POST",
      body: JSON.stringify(newEntry),
      headers: {
        "content-type": "application/json"
      }
    })
    dispatch({
      type: "addEntry",
      category: category_id,
      text: entry,
    });
    history.push("/");
  };

  return (
    <div>
      {errorMessage ? (
        <h4 style={{ color: "red" }}>{errorMessage}</h4>
      ) : (
        <>
          <h1>New Entry in Category: {category.name}</h1>
          <form onSubmit={submit}>
            <div>
              <textarea
                onChange={(e) => setEntry(e.target.value)}
                value={entry}
              />
            </div>
            <button type="submit">Create Entry</button>
          </form>
        </>
      )}
    </div>
  );
};

export default NewEntry;
