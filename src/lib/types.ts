export type Event = {
  id: string;
  slug: string;
  title: string;
  description: string;
  startDatetime: string;
  endDatetime: string;
  seats: number;
  amount: number;
  image: string | any;
  visibility: "PUBLIC" | "PRIVATE";
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
};

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  password: string;
  role: "USER" | "ADMIN";
  dateOfJoin: string;
  image: string | null;
  walletBalance: string | null;
};
