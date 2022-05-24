import styles from "./Footer.module.css";

export const Footer = () => (
  <footer className={styles.footer}>
    <div className="container">
      <strong>
        Copyright &copy; {new Date().getFullYear()} CompareStreaming.fyi
      </strong>
      <p>
        For bugs, issues, questions, or comments,{" "}
        <a
          href="https://www.github.com/coreyleelarson/comparestreaming/issues"
          target="_blank"
          rel="noreferrer"
        >
          file an issue
        </a>{" "}
        or <a href="mailto:coreyleelarson@gmail.com">email me</a>!
      </p>
      <p>Thank you!</p>
    </div>
  </footer>
);
