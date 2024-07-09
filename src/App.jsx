import { useState } from "react";
import "./App.css";
import { useJokeService } from "./services/jokeService.js";
import stevePic from "./assets/steve.png";

export const App = () => {
  const { jokeState, setText, setTold, postJoke } = useJokeService();

  return (
    <div className="app-container">
      <header className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </header>
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
        <button className="joke-input-submit" onClick={postJoke}>
          Add
        </button>
      </div>
    </div>
  );
};
