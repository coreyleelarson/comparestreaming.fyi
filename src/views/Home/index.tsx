import classNames from "classnames";
import { useMemo, useState } from "react";
import { PercentageRing } from "../../components/PercentageRing";
import { Select } from "../../components/Select";
import { huluData } from "../../data/hulu";
import { slingData } from "../../data/sling";
import { youtubeData } from "../../data/youtube";
import { Service } from "../../types";
import styles from "./Home.module.css";

const services = [huluData, slingData, youtubeData];

export const Home = () => {
  const [selectedChannels, setSelectedChannels] = useState<any[]>([]);

  const sortedChannelOptions = useMemo(() => {
    if (!services) return [];

    const channelMap = new Map();

    for (const service of services) {
      for (const channel of service.channels) {
        if (!channelMap.has(channel.name)) {
          channelMap.set(channel.name, channel);
        }
      }
    }

    return Array.from(channelMap.values())
      .sort((a: any, b: any) =>
        a.name.toLowerCase() < b.name.toLowerCase()
          ? -1
          : a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : 0
      )
      .map((channel: any) => ({ label: channel.name, value: channel.name }));
  }, []);

  const sortedSelectedChannels = useMemo(
    () =>
      selectedChannels
        ?.slice()
        ?.sort((a: any, b: any) =>
          a.label.toLowerCase() < b.label.toLowerCase() ? -1 : 1
        ),
    [selectedChannels]
  );

  const sortedServices = useMemo(
    () =>
      services
        ?.slice()
        ?.sort((a: Service, b: Service) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
        ) ?? [],
    []
  );

  const handleChangeChannels = (values: any) => setSelectedChannels(values);

  const comparisons = useMemo(() => {
    let result = [];

    for (const service of sortedServices) {
      let count = 0;
      let missing = [];

      for (const channel of selectedChannels) {
        if (
          service.channels.some(
            (instance: any) => instance.name === channel.value
          )
        ) {
          count++;
        } else {
          missing.push(channel);
        }
      }

      result.push({
        name: service.name,
        missing,
        color: service.color,
        percentage: Math.round((count / selectedChannels.length) * 100) || 0,
      });

      result.sort((a: any, b: any) =>
        a.percentage < b.percentage ? 1 : a.percentage > b.percentage ? -1 : 0
      );
    }

    return result;
  }, [selectedChannels, sortedServices]);

  return (
    <>
      <section className={classNames("container", styles.header)}>
        <h1>Compare Streaming TV Services</h1>
        <p>Select your channels to view comparisons below:</p>
        <Select
          onChange={handleChangeChannels}
          options={sortedChannelOptions}
          placeholder="Select your channels to compare services..."
          value={sortedSelectedChannels}
        />
      </section>
      <section className={classNames("container", styles.comparisons)}>
        <ul className={styles.list}>
          {comparisons.map((comparison: any, index: number) => (
            <li className={styles.item} key={comparison.id}>
              <h2>{comparison.name}</h2>
              <PercentageRing
                color={comparison.color}
                percentage={comparison.percentage}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
