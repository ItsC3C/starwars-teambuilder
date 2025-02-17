import CardComponent from "./CardComponent"
import styles from "../css/grid.module.css"

const GridComponent = () => {
  return (
    <div className={styles["main-grid"]}>
      <CardComponent/>
    </div>
  )
}
export default GridComponent