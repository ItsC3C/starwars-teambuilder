import { ReactNode } from "react";
import styles from "../css/style.module.css";

type PropTypes = {
  children: ReactNode;
};

export const getFullYear = (): number => {
  return new Date().getFullYear();
};

const Layout = ({ children }: PropTypes) => {
  return (
    <>
      <main>{children}</main>
      <footer className={styles.footer}>
        <p>
          &copy; {getFullYear()} - Cédric Van Hoorebeke. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Layout;
