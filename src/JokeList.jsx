export const JokeList = ({
  jokes,
  jokesCount,
  handleDelete,
  handleToggleToldStatus,
}) => (
  <div className="joke-list-container">
    <h2>
      {jokesCount.title}{" "}
      <span className="jokesCount.className">{jokesCount.count}</span>
    </h2>
    <div>
      <ul>
        {jokes.map((joke) => (
          <li className="joke-list-item" key={joke.id}>
            <p className="joke-list-item-text">{joke.text}</p>
            <button onClick={() => handleDelete(joke.id)}>Delete</button>
            <button onClick={() => handleToggleToldStatus(joke)}>
              {jokesCount.buttonLabel}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
