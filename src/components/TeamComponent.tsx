import styles from "../css/Layout.module.css"
import CardComponent from "./CardComponent"

const TeamComponent = () => {
  return (
    <div className={styles["team-component"]}>
        <CardComponent/>
        <CardComponent/>
        <CardComponent/>
        <CardComponent/>
        <CardComponent/>
    </div>
  )
}
export default TeamComponent