import { ReactComponent as GithubIcon } from "../../assets/icons/github.svg";
import styles from "./UtilityHeader.module.css";

export const UtilityHeader = () => (
  <header className={styles["utility-header"]}>
    <div className="container">
      <ul>
        <li>
          <a href="https://www.github.com/coreyleelarson/comparestreaming">
            <GithubIcon />
          </a>
        </li>
      </ul>
    </div>
  </header>
);
