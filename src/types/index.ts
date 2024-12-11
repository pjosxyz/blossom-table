export type ServerData = {
  id: number;
  serverDetail: ServerDetail;
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

type ServerDetail = {
  serverName: string;
  isPaidServer: boolean;
};
