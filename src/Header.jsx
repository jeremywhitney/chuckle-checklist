import stevePic from "./assets/steve.png";

export const Header = () => (
  <header className="app-heading">
    <div className="app-heading-circle">
      <img className="app-logo" src={stevePic} alt="Good job Steve" />
    </div>
    <h1 className="app-heading-text">Chuckle Checklist</h1>
  </header>
);
