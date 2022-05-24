import { useEffect, useMemo, useState } from "react";

export const useSelectedChannels = (): [any[], (values: any[]) => void] => {
  const [selectedChannels, setSelectedChannels] = useState<any[]>([]);
  const sortedSelectedChannels = useMemo(
    () =>
      selectedChannels
        ?.slice()
        ?.sort((a: any, b: any) =>
          a.label.toLowerCase() < b.label.toLowerCase() ? -1 : 1
        ),
    [selectedChannels]
  );

  const handleSetSelectedChannels = (values: any[]) => {
    setSelectedChannels(values);
    localStorage.setItem("selectedChannels", JSON.stringify(values));
  };

  useEffect(() => {
    const cachedChannels = localStorage.getItem("selectedChannels");

    if (cachedChannels) {
      setSelectedChannels(JSON.parse(cachedChannels));
    }
  }, []);

  return [sortedSelectedChannels, handleSetSelectedChannels];
};
