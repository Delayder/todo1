export interface AccountDocument extends Document {
  ownerId: string;
  nickname: string;
  entity: string;
  accountType: number;
  description: string;
  accountNumber: number;
  userCredential: number;
  money: { currency: string; balance: number };
}
