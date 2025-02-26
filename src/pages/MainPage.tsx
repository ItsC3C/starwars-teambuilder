import { useState } from "react";
import GridComponent from "../components/GridComponent";
import TeamComponent from "../components/TeamComponent";
import styles from "../css/MainPage.module.css";
import { useStarWarsCharacters } from "../utils/api";
import { Character } from "../types/StarwarsApi.types";

interface MainPageProps {
  onCharacterSelect?: (
    character: Character,
    isSith: boolean,
    isJedi: boolean
  ) => void;
}

const MainPage: React.FC<MainPageProps> = () => {
  const [team, setTeam] = useState<number[]>([]);
  const { data: characters, error, isLoading } = useStarWarsCharacters();

  const handleAddToTeam = (id: number) => {
    if (team.length >= 5) {
      alert("Your team can only have 5 members!");
    } else if (!team.includes(id)) {
      setTeam((prevTeam) => [...prevTeam, id]);
    } else {
      alert("This character is already in your team!");
    }
  };

  const handleRemoveFromTeam = (id: number) => {
    setTeam((prevTeam) => prevTeam.filter((memberId) => memberId !== id));
  };

  const isInTeam = (id: number) => team.includes(id);

  if (isLoading) return <p>Loading characters...</p>;
  if (error) return <p>Failed to load characters. Please try again later.</p>;

  return (
    <div className={styles.layout}>
      <GridComponent onAddToTeam={handleAddToTeam} isInTeam={isInTeam} />
      <div className={styles.teamHolder}>
        <TeamComponent
          team={team}
          onRemoveFromTeam={handleRemoveFromTeam}
          isInTeam={isInTeam}
          characters={characters}
        />
      </div>
    </div>
  );
};

export default MainPage;
