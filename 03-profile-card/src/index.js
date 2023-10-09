import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <img
      className="avatar"
      src="profile_image.jpg"
      alt="profile card pic"
    ></img>
  );
}

function Intro() {
  return (
    <div>
      <h1>Martins Ndifon</h1>
      <p>
        Full-stack software engineer, passionate about creating and maintaining
        robust software. Other than coding, I have a pretty interesting lif,
        playing football, chess, swimming and hanging out with friends and
        family.
      </p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      <Skill skill="HTML+CSS" emoji="💪" backgroundColor="blue" />
      <Skill skill="javascript" emoji="👌" backgroundColor="yellow" />
      <Skill skill="python" emoji="❤️" backgroundColor="purple" />
      <Skill skill="django/flask" emoji="😊" backgroundColor="red" />
      <Skill skill="React" emoji="🤞" backgroundColor="green" />
      <Skill skill="Git and Github" emoji="👍" backgroundColor="orange" />
    </div>
  );
}

function Skill(props) {
  return (
    <div
      className="skill"
      style={{ backgroundColor: `${props.backgroundColor}` }}
    >
      <p>{props.skill}</p>
      <span>{props.emoji}</span>
    </div>
  );
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
