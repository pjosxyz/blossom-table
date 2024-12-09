export type ServerData = {
  id: number;
  serverName: string;
  rating: number;
  reviewedBy: ReviewedBy[];
  description: string;
  url: string;
};

export type ReviewedBy = {
  id: number;
  username: string;
  address: string;
};
