import { useState, useEffect } from "react";
import GridComponent from "./GridComponent";
import TeamComponent from "./TeamComponent";
import styles from "../css/Layout.module.css";
import { useStarWarsCharacters } from "../utils/api"; // Use the SWR hook

const Layout = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [team, setTeam] = useState<number[]>([]); // Manage team of selected characters

  const { data: characters, error, isLoading } = useStarWarsCharacters(); // Fetch characters using SWR

  const handleAddToTeam = (id: number) => {
    if (team.length < 5) {
      if (team.includes(id)) {
        alert("This character is already in your team!"); // ✅ Show error if character is already in the team
      } else {
        setTeam((prevTeam) => [...prevTeam, id]);
      }
    } else {
      alert("Your team can only have 5 members!");
    }
  };

  const handleRemoveFromTeam = (id: number) => {
    setTeam((prevTeam) => prevTeam.filter((memberId) => memberId !== id));
  };

  const isInTeam = (id: number) => team.includes(id); // Function to check if character is in the team

  useEffect(() => {
    console.log("Current team:", team);
  }, [team]);

  // ✅ Handle loading and error states
  if (isLoading) return <p>Loading characters...</p>;
  if (error) return <p>Failed to load characters</p>;

  return (
    <div className={styles.layout}>
      <GridComponent onAddToTeam={handleAddToTeam} isInTeam={isInTeam} />
      <div className={styles.teamHolder}>
        <TeamComponent
          selectedId={selectedId}
          team={team}
          onRemoveFromTeam={handleRemoveFromTeam}
          isInTeam={isInTeam}
          characters={characters} // ✅ Pass characters directly
        />
      </div>
      <footer className={styles.footer}>
        <p>
          &copy; {new Date().getFullYear()}Cédric Van Hoorebeke. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
