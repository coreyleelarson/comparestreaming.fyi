import { ReactComponent as GithubIcon } from "../../assets/icons/github.svg";
import styles from "./UtilityHeader.module.css";

export const UtilityHeader = () => (
  <header className={styles["utility-header"]}>
    <div className="container">
      <ul>
        <li>
          <a
            aria-label="GitHub"
            href="https://www.github.com/coreyleelarson/comparestreaming"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
          </a>
        </li>
      </ul>
    </div>
  </header>
);
