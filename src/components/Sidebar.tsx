// components/Sidebar.tsx
import { FC } from "react";
import TeamComponent from "./main-page-components/TeamComponent";
import styles from "../css/main-page-css/MainPage.module.css";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onRemoveFromTeam: (id: number) => void;
  isInTeam: (id: number) => boolean;
  characters: any;
}

const Sidebar: FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  onRemoveFromTeam,
  isInTeam,
  characters,
}) => (
  <div className={`${styles.teamHolder} ${isSidebarOpen ? styles.open : ""}`}>
    <TeamComponent
      onRemoveFromTeam={onRemoveFromTeam}
      isInTeam={isInTeam}
      characters={characters}
      setIsSidebarOpen={setIsSidebarOpen}
    />
  </div>
);

export default Sidebar;
