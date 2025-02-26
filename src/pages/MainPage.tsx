import { useState } from "react";
import GridComponent from "../components/GridComponent";
import TeamComponent from "../components/TeamComponent";
import styles from "../css/MainPage.module.css";
import { useStarWarsCharacters } from "../utils/api";
import { Character } from "../types/StarwarsApi.types";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MainPageProps {
  onCharacterSelect?: (
    character: Character,
    isSith: boolean,
    isJedi: boolean
  ) => void;
}

const MainPage: React.FC<MainPageProps> = () => {
  const [team, setTeam] = useState<number[]>([]); // Holds the IDs of selected characters
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const { data: characters, error, isLoading } = useStarWarsCharacters();

  const handleAddToTeam = (id: number) => {
    if (team.length >= 5) {
      toast.error("Your team can only have 5 members!", { theme: "colored" });
    } else if (!team.includes(id)) {
      setTeam((prevTeam) => {
        const newTeam = [...prevTeam, id];
        // Automatically open the sidebar when 5 characters are added
        if (newTeam.length === 5) {
          setIsSidebarOpen(true);
        }
        return newTeam;
      });
    } else {
      toast.error("This character is already in your team!", {
        theme: "colored",
      });
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
      {/* GridComponent is used for character selection */}
      <GridComponent onAddToTeam={handleAddToTeam} isInTeam={isInTeam} />

      {/* Sidebar showing the selected team */}
      <div
        className={`${styles.teamHolder} ${isSidebarOpen ? styles.open : ""}`}
      >
        <TeamComponent
          team={team} // Pass the team IDs to the TeamComponent
          onRemoveFromTeam={handleRemoveFromTeam} // Pass remove handler
          isInTeam={isInTeam} // Pass function to check if a character is in the team
          characters={characters} // Pass the full list of characters
          setIsSidebarOpen={setIsSidebarOpen} // Pass the setter to open/close the sidebar
        />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default MainPage;
