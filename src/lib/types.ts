export type Event = {
  id: string;
  slug: string;
  title: string;
  description: string;
  startDatetime: string;
  endDatetime: string;
  seats: number;
  amount: number;
  image: string| any;
  visibility: "PUBLIC" | "PRIVATE";
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
};
