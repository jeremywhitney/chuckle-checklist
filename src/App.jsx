import { useEffect, useState } from "react";
import "./App.css";
import { deleteJoke, getJokes, updateToldStatus, useJokeService } from "./services/jokeService.jsx";
import stevePic from "./assets/steve.png";

export const App = () => {
  const { jokeState, setText, setTold, postJoke } = useJokeService();
  const [allJokes, setAllJokes] = useState([]);
  const [showToldJokes, setShowToldJokes] = useState([]);
  const [showUntoldJokes, setShowUntoldJokes] = useState([]);

  // Get all jokes from database
  useEffect(() => {
    getJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
      console.log("All Jokes:", jokesArray);
    });
  }, []);

  // Filter jokes by told and untold status
  useEffect(() => {
    const toldJokes = allJokes.filter((joke) => joke.told === true);
    setShowToldJokes(toldJokes);
    console.log("Told Jokes:", toldJokes);
    const untoldJokes = allJokes.filter((joke) => joke.told === false);
    setShowUntoldJokes(untoldJokes);
    console.log("Untold Jokes:", untoldJokes);
  }, [allJokes]);

  // Variables to get each list length
  const toldJokesCount = showToldJokes.length;
  const untoldJokesCount = showUntoldJokes.length;

  // Function to toggle the told status of a joke
  const handleToggleToldStatus = async (joke) => {
    const editedJoke = { ...joke, told: !joke.told }
    await updateToldStatus(editedJoke)

    // Refresh the list of jokes
    const updatedJokes = await getJokes()
    setAllJokes(updatedJokes)
  }

  // Function to delete a joke from the list
  const handleDelete = async (id) => {
    await deleteJoke(id)
    const updatedJokes = await getJokes()
    setAllJokes(updatedJokes)
  }

  // TO DO: modularize all of this
  return (
    <div className="app-container">
      <header className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </header>
      <h2>Add Joke</h2>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          value={jokeState.text}
          placeholder="New One Liner"
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
        <button
          className="joke-input-submit"
          onClick={async () => {
            await postJoke();
            getJokes().then((jokesArray) => {
              setAllJokes(jokesArray);
            });
          }}
        >
          Add
        </button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            Untold <span className="untold-count">{untoldJokesCount}</span>
          </h2>
          <div>
            <ul>
              {showUntoldJokes.map((joke) => (
                <li className="joke-list-item" key={joke.id}>
                  <p className="joke-list-item-text">{joke.text}</p>
                  <button onClick={() => handleDelete(joke.id)}>Delete</button>
                  <button onClick={() => handleToggleToldStatus(joke)}>Told</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="joke-list-container">
          <h2>
            Told <span className="told-count">{toldJokesCount}</span>
          </h2>
          <div>
            <ul>
              {showToldJokes.map((joke) => (
                <li className="joke-list-item" key={joke.id}>
                  <p className="joke-list-item-text">{joke.text}</p>
                  <button onClick={() => handleDelete(joke.id)}>Delete</button>
                  <button onClick={() => handleToggleToldStatus(joke)}>Untold</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
