import { useStarWarsCharacters } from "./utils/api";

const App = () => {
  const { data, error, isLoading } = useStarWarsCharacters();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Star Wars Characters:</h2>
      {data ? (
        <ul>
          {data.map((character: { id: number; name: string }) => (
            <li key={character.id}>{character.name}</li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default App;