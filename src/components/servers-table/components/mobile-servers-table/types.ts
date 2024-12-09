export type BodyProps = {
  reviewedBy: {
    id: number;
    username: string;
    address: string;
  }[];
  description: string;
  url: string;
};

export type CellProps = {
  label: string;
};

export type ReviewersProps = {
  reviewedBy: {
    id: number;
    username: string;
    address: string;
  }[];
};