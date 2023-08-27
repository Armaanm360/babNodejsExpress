export interface ICreateAccountPayload {
  name: string;
  branch?: string | undefined;
  account_number?: string | undefined;
  details: string;
  opening_balance?: number | undefined;
}

export interface IbalanceTransfer {
  from_ac: number;
  amount: number;
  to_ac: number;
  details: string;
  remarks: string;
}
