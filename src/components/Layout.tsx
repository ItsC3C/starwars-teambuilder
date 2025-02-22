import GridComponent from "./GridComponent"
import TeamComponent from "./TeamComponent"
import styles from "../css/Layout.module.css"
const Layout = () => {
  return (
    <div className={styles.layout}>
        <GridComponent />
        {/* <TeamComponent /> */}
    </div>
  )
}
export default Layout