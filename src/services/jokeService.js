import { useState } from "react";

// Function to store ALL jokes from database
export const AllJokes = async () => {
  const response = await fetch("http://localhost:8088/jokes");
  const data = await response.json();
  return data;
};

// Function for posting a new joke to the database
export const useJokeService = () => {
  const [jokeState, setJokeState] = useState({
    text: "",
    told: false,
  });

  const setText = (newText) => {
    setJokeState((prevState) => ({
      ...prevState,
      text: newText,
    }));
  };

  const setTold = (newTold) => {
    setJokeState((prevState) => ({
      ...prevState,
      told: newTold,
    }));
  };

  const postJoke = () => {
    fetch("http://localhost:8088/jokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jokeState),
    });
    setText("");
  };

  return { jokeState, setText, setTold, postJoke };
};
