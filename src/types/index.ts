export type ServerData = {
  id: number;
  serverName: string;
  rating: number;
  reviewedBy: {
    id: number;
    username: string;
    address: string;
  }[];
  description: string;
  url: string;
};
