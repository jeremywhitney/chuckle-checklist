import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./Header.jsx";
import { JokeForm } from "./JokeForm.jsx";
import { JokeList } from "./JokeList.jsx";
import {
  deleteJoke,
  getJokes,
  updateToldStatus,
  useJokeService,
} from "./services/jokeService.jsx";

export const App = () => {
  const { jokeState, setText, postJoke } = useJokeService();
  const [allJokes, setAllJokes] = useState([]);
  const [showToldJokes, setShowToldJokes] = useState([]);
  const [showUntoldJokes, setShowUntoldJokes] = useState([]);

  // Function to fetch and set all jokes
  const fetchAndSetJokes = async () => {
    const jokesArray = await getJokes();
    setAllJokes(jokesArray);
  };
  // Get all jokes from database
  useEffect(() => {
    fetchAndSetJokes();
  }, []);

  // Function handle adding a joke
  const handlePostJoke = async () => {
    await postJoke();
    await fetchAndSetJokes();
  };

  // Filter jokes by told and untold status
  useEffect(() => {
    const toldJokes = allJokes.filter((joke) => joke.told === true);
    setShowToldJokes(toldJokes);
    const untoldJokes = allJokes.filter((joke) => joke.told === false);
    setShowUntoldJokes(untoldJokes);
  }, [allJokes]);

  // Function to toggle the told status of a joke
  const handleToggleToldStatus = async (joke) => {
    const editedJoke = { ...joke, told: !joke.told };
    await updateToldStatus(editedJoke);
    await fetchAndSetJokes();
  };

  // Function to delete a joke from the list
  const handleDelete = async (id) => {
    await deleteJoke(id);
    await fetchAndSetJokes();
  };

  return (
    <div className="app-container">
      <Header />
      <h2>Add Joke</h2>
      <JokeForm
        jokeState={jokeState}
        setText={setText}
        handlePostJoke={handlePostJoke}
      />
      <div className="joke-lists-container">
        <JokeList
          jokes={showUntoldJokes}
          jokesCount={{
            title: "Untold",
            className: "untold-count",
            count: showUntoldJokes.length,
            buttonLabel: "Told",
          }}
          handleDelete={handleDelete}
          handleToggleToldStatus={handleToggleToldStatus}
        />
        <JokeList
          jokes={showToldJokes}
          jokesCount={{
            title: "Told",
            className: "told-count",
            count: showToldJokes.length,
            buttonLabel: "Untold",
          }}
          handleDelete={handleDelete}
          handleToggleToldStatus={handleToggleToldStatus}
        />
      </div>
    </div>
  );
};
