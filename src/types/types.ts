export type WorkforceReportType = {
  role: string;
  workshift: number;
};

export type MaterialReportType = {
  material: string;
  quantity: number;
  unit: string;
};

export type SupplyType = {
  description: string;
  unit: string;
  quantity: number;
  unitCost: number;
  partialCost: number;
  profit: number;
  profitAmount: number;
  totalValue: number;
};

export type LaborType = {
  role: string;
  workers: number;
  shiftType: string;
  rate: number;
  shiftCount: number;
  partialCost: number;
  profit: number;
  profitAmount: number;
  totalValue: number;
};

export type OtherExpenses = {
  description: string;
  shiftType: string;
  unit: string;
  amount: number;
  unitCost: number;
  partialCost: number;
  profit: number;
  profitAmount: number;
  totalValue: number;
};

export type OfferSummary = {
  materials: number;
  preparation: number;
  day: number;
  night: number;
  total: number;
};

export type CommentsTypes = {
  author: string;
  comment: string;
};

export type Tendertype = {
  name: string;
  customerName: string;
  contactName: string;
  email: string;
  phoneNumber: string;
  customerCity: string;
  date: string | null;
  // reviewedBy: string;
  reportId: number;
  ref: string;
  workforces: LaborType[];
  materials: SupplyType[];
  otherExpenses: OtherExpenses[];
  comments?: CommentsTypes[];
  userId: number
};

export type UserTokenType = {
  id?: number;
  user: string;
  name: string;
  lastName: string;
  active: boolean;
  role: string;
  profilePicture: string;
};
