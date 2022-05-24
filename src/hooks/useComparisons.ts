import { useMemo } from "react";

export const useComparisons = (services: any[], selectedChannels: any[]) => {
  const comparisons = useMemo(() => {
    let result = [];

    for (const service of services) {
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
        ...service,
        missing,
        percentage: Math.round((count / selectedChannels.length) * 100) || 0,
      });

      result.sort((a: any, b: any) =>
        a.percentage < b.percentage ? 1 : a.percentage > b.percentage ? -1 : 0
      );
    }

    return result;
  }, [services, selectedChannels]);

  return [comparisons];
};
