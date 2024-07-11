export const JokeForm = ({ jokeState, handlePostJoke }) => (
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
    <button className="joke-input-submit" onClick={handlePostJoke}>
      Add
    </button>
  </div>
);
