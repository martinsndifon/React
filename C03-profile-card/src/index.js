import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const skills = [
  {
    skill: 'HTML+CSS',
    level: 'advanced',
    color: 'blue',
  },
  {
    skill: 'javascript',
    level: 'advanced',
    color: 'yellow',
  },
  {
    skill: 'python',
    level: 'advanced',
    color: 'purple',
  },
  {
    skill: 'django/flask',
    level: 'intermediate',
    color: 'red',
  },
  {
    skill: 'React',
    level: 'beginner',
    color: 'green',
  },
  {
    skill: 'Git and Github',
    level: 'advanced',
    color: 'orange',
  },
];

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
      {skills.map((skill) => {
        return <Skill skillObj={skill} key={skill.skill} />;
      })}
    </div>
  );
}

function Skill({ skillObj }) {
  return (
    <div className="skill" style={{ backgroundColor: `${skillObj.color}` }}>
      <p>{skillObj.skill}</p>
      <span>
        {skillObj.level === 'beginner'
          ? '👶'
          : skillObj.level === 'intermediate'
          ? '👍'
          : '💪'}
      </span>
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
