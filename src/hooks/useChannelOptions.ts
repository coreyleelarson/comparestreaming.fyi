import { useMemo } from "react";

export const useChannelOptions = (services: any[]): [any[]] => {
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
  }, [services]);

  return [sortedChannelOptions];
};
