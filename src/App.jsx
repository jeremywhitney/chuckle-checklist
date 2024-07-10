import { useEffect, useState } from "react";
import "./App.css";
import { getJokes, useJokeService } from "./services/jokeService.js";
import stevePic from "./assets/steve.png";

export const App = () => {
  const { jokeState, setText, setTold, postJoke } = useJokeService();
  const [allJokes, setAllJokes] = useState([]);
  const [showToldJokes, setShowToldJokes] = useState([]);
  const [showUntoldJokes, setShowUntoldJokes] = useState([]);

  useEffect(() => {
    getJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
      console.log("All Jokes:", jokesArray);
    });
  }, []);

  useEffect(() => {
    const toldJokes = allJokes.filter((joke) => joke.told === true);
    setShowToldJokes(toldJokes);
    console.log("Told Jokes:", toldJokes);
    const untoldJokes = allJokes.filter((joke) => joke.told === false);
    setShowUntoldJokes(untoldJokes);
    console.log("Untold Jokes:", untoldJokes);
  }, [allJokes]);

  const toldJokesCount = showToldJokes.length;
  const untoldJokesCount = showUntoldJokes.length;

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
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
