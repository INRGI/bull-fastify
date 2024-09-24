const Character = ({ character }) => (
  <div>
    <h2>{character.name}</h2>
    <p>Level: {character.level}</p>
    <p>Health: {character.health}</p>
    <p>Attack: {character.attack}</p>
  </div>
);

export default Character;
