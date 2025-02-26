import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const MainPage: React.FC<MainPageProps> = ({ onCharacterSelect }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [team, setTeam] = useState<number[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<{
    character: Character;
    isSith: boolean;
    isJedi: boolean;
  } | null>(null);
  const navigate = useNavigate();
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

  const checkSithOrJedi = (character: Character) => {
    const isSith =
      character.name.toLowerCase().includes("darth") ||
      character.affiliations?.some((a) => a.toLowerCase().includes("sith"));
    const isJedi =
      !isSith &&
      (character.name.toLowerCase().includes("jedi") ||
        character.affiliations?.some((a) => a.toLowerCase().includes("jedi")));
    return { isSith, isJedi };
  };

  const handleCharacterSelect = (character: Character) => {
    const { isSith, isJedi } = checkSithOrJedi(character);
    setSelectedId(character.id.toString());
    setSelectedCharacter({ character, isSith, isJedi });

    if (onCharacterSelect) onCharacterSelect(character, isSith, isJedi);

    navigate(`/character/${character.id}`, {
      state: { character, isSith, isJedi },
    });
  };

  if (isLoading) return <p>Loading characters...</p>;
  if (error) return <p>Failed to load characters. Please try again later.</p>;

  return (
    <div className={styles.layout}>
      <GridComponent
        onAddToTeam={handleAddToTeam}
        isInTeam={isInTeam}
        onSelectCharacter={handleCharacterSelect}
      />
      <div className={styles.teamHolder}>
        <TeamComponent
          selectedId={selectedId}
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
