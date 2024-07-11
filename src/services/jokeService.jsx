import { useState } from "react";

// Function to store ALL jokes from database
export const getJokes = async () => {
  const response = await fetch("http://localhost:8088/jokes");
  const data = await response.json();
  return data;
};

// Function for posting a new joke
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

  // Don't think I need this. Save for now and delete later.
  // const setTold = (newTold) => {
  //   setJokeState((prevState) => ({
  //     ...prevState,
  //     told: newTold,
  //   }));
  // };

  // Function for posting a new joke to the database
  const postJoke = async () => {
    await fetch("http://localhost:8088/jokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jokeState),
    });
    setText("");
  };

  return { jokeState, setText, postJoke };
};

// Function for editing a joke's told/untold status
export const updateToldStatus = async (joke) => {
  await fetch(`http://localhost:8088/jokes/${joke.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(joke),
  });
};

// Function to delete a joke from the database
export const deleteJoke = async (id) => {
  await fetch(`http://localhost:8088/jokes/${id}`, {
    method: "DELETE",
  });
};
