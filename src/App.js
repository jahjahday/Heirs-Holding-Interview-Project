import { useEffect, useState } from "react";
import "./App.css";
import data from "./data.json";
import Language from "./Language";

const truncate = (str, length, ending) => {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

const App = () => {
  const [grants, setGrants] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [popUp, setPopUp] = useState("");

  useEffect(() => {
    setGrants(data);
  }, []);

  const search = (e) => {
    setFilter(e.target.value);
    const result = data.filter((a) => {
      return a.title.includes(e.target.value);
    });
    console.log(result);
    setGrants(result);
  };

  const file = (e) => {
    setPopUp(e.target.value);
  };

  const pop = () => {
    alert(popUp);
  };

  return (
    <div className="App">
      <form>
        <input type="search" onChange={search} placeholder="search" />
      </form>
      {grants.map((grant, index) => (
        <div>
          <div className=" contain">
            <h1 onClick={() => setOpenModal(index + 1)} key={Math.round()}>
              {grant.title}
            </h1>
            <p> {truncate(grant.description, 100)}</p>
          </div>
          {openModal && (
            <div className="modalBackground">
              <div className="modalContainer">
                <h2>{grants[openModal - 1].title}</h2>{" "}
                {grants[openModal - 1].description} <br />{" "}
                <textarea onChange={file}></textarea>
                <div className="butt">
                  <button className="btnSuccess" onClick={pop}>
                    SEND
                  </button>
                  <button
                    className="btnDanger"
                    onClick={() => setOpenModal(false)}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
