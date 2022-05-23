import styles from "./PercentageRing.module.css";

interface PercentageRingProps {
  color?: string;
  percentage?: number;
}

export const PercentageRing = (props: PercentageRingProps) => {
  const { color = "black", percentage = 0 } = props;

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `conic-gradient(${color} ${percentage}%, transparent 0)`,
        color,
      }}
    >
      <span className={styles.label}>{percentage}%</span>
    </div>
  );
};
