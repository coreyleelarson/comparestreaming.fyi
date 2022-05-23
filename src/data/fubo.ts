import { Channels, Service, Services } from "../types";

export const fuboData: Service = {
  color: "#FF9900",
  name: Services.Fubu,
  channels: [
    { name: Channels.ESPN },
    { name: Channels.ESPN2 },
    { name: Channels.ESPN3 },
    { name: Channels.ESPNU },
  ],
};
