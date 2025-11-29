export type Role = "ADMIN" | "CUSTOMER";

export interface Transaction {
  id: number;
  cardNumber: string;
  type: string;
  amount: number;
  timestamp: string;
  status: string;
  reason: string;
}

export interface Card {
  cardNumber: string;
  balance: number;
  customerName: string;
}
