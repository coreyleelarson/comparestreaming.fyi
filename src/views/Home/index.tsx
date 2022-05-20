import { useMemo, useState } from "react";
import { Select } from "../../components/Select";
import { useServices } from "../../hooks/query/useServices";

interface Channel {
  id: string;
  name: string;
}

export const Home = () => {
  const [selectedChannels, setSelectedChannels] = useState<any[]>([]);

  const { data: services } = useServices();

  const sortedChannelOptions = useMemo(() => {
    if (!services) return [];
    
    const channelMap = new Map();

    for (const service of services) {
      for (const channel of service.channels) {
        if (!channelMap.has(channel.id)) {
          channelMap.set(channel.id, channel);
        }
      }
    }

    return Array.from(channelMap.values())
      .sort((a: any, b: any) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0)
      .map((channel: any) => ({ label: channel.name, value: channel.id }));
  }, [services]);

  const sortedSelectedChannels = useMemo(() => selectedChannels
    ?.slice()
    ?.sort((a: any, b: any) => a.label.toLowerCase() < b.label.toLowerCase() ? -1 : 1)
  , [selectedChannels]);

  const sortedServices = useMemo(() =>
    services
      ?.slice()
      ?.sort((a: Channel, b: Channel) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
    ?? []
  , [services]);

  const handleChangeChannels = (values: any) => setSelectedChannels(values);

  const comparisons = useMemo(() => {
    let result = [];

    if (selectedChannels.length) {
      for (const service of sortedServices) {
        let count = 0;
        let missing = [];
        
        for (const channel of selectedChannels) {
          if (service.channels.some((instance: any) => instance.id === channel.value)) {
            count++;
          } else {
            missing.push(channel);
          }
        }
  
        result.push({
          id: service.id,
          name: service.name,
          missing,
          percentage: Math.round((count / selectedChannels.length) * 100) || 0,
        });
  
      }
  
      result.sort((a: any, b: any) => a.percentage < b.percentage ? 1 : a.percentage > b.percentage ? -1 : 0);
    }

    return result;
  }, [selectedChannels, sortedServices]);

  return (
    <>
      <Select
        onChange={handleChangeChannels}
        options={sortedChannelOptions}
        placeholder="Select your channels..."
        value={sortedSelectedChannels}
      />
      {comparisons.length > 0 && (
        <section>
          <h2>Comparison</h2>
            {comparisons.map((comparison: any, index: number) => (
              <section key={comparison.id}>
                <h2>{comparison.name}{index === 0 && <span> - Best Match</span>}</h2>
                <p><strong>Percentage Match:</strong> {comparison.percentage}%</p>
                {comparison.missing.length > 0 && (
                  <p><strong>Missing channels:</strong> {comparison.missing.map((channel: any) => channel.label).join(', ')}</p>
                )}
            </section>
            ))}
        </section>
      )}
    </>
  );
}