import classNames from "classnames";
import { useEffect } from "react";
import ReactGA from "react-ga4";
// import spaceVideo from "../../assets/videos/space.mp4";
import { PercentageRing } from "../../components/PercentageRing";
import { Select } from "../../components/Select";
import { fuboData } from "../../data/fubo";
import { huluData } from "../../data/hulu";
import { philoData } from "../../data/philo";
import { slingData } from "../../data/sling";
import { youtubeData } from "../../data/youtube";
import { useChannelOptions } from "../../hooks/useChannelOptions";
import { useComparisons } from "../../hooks/useComparisons";
import { useSelectedChannels } from "../../hooks/useSelectedChannels";
import styles from "./Home.module.css";

const services = [huluData, fuboData, philoData, slingData, youtubeData];

export const Home = () => {
  const [selectedChannels, setSelectedChannels] = useSelectedChannels();
  const [channelOptions] = useChannelOptions(services);
  const [comparisons] = useComparisons(services, selectedChannels);

  const handleChangeChannels = (values: any[], { action, option }: any) => {
    setSelectedChannels(values);

    if (action === "remove-option") {
      ReactGA.event({
        category: "Channels",
        action: "Remove Channel",
        label: option.value,
      });
    } else if (action === "select-option") {
      ReactGA.event({
        category: "Channels",
        action: "Select Channel",
        label: option.value,
      });
    } else if (action === "clear") {
      ReactGA.event({
        category: "Channels",
        action: "Clear Channels",
      });
    }
  };

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/" });
  }, []);

  return (
    <>
      <header className={styles.header}>
        {/* <video autoPlay muted loop>
          <source src={spaceVideo} type="video/mp4" />
        </video> */}
        <div className="container">
          <h1>Compare Streaming TV Services</h1>
          <p>Select your desired channels to view comparisons below:</p>
          <Select
            onChange={handleChangeChannels}
            options={channelOptions}
            placeholder="Select your channels to compare services..."
            value={selectedChannels}
          />
        </div>
      </header>
      <section className={classNames("container", styles.comparisons)}>
        <ul className={styles.list}>
          {comparisons.map((comparison: any) => (
            <li className={styles.item} key={comparison.name}>
              <div className={styles.content}>
                <h2>{comparison.name}</h2>
                {comparison.features && comparison.features.length > 0 && (
                  <ul className={styles.features}>
                    {comparison.features.map(
                      (feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      )
                    )}
                  </ul>
                )}
                {comparison.missing.length > 0 && (
                  <p className={styles.missing}>
                    <strong>Missing:</strong>{" "}
                    {comparison.missing
                      .map((channel: any) => channel.label)
                      .join(", ")}
                  </p>
                )}
              </div>
              <div>
                <PercentageRing
                  color={comparison.color}
                  percentage={comparison.percentage}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
