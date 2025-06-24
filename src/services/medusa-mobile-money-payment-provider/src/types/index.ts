export interface MobileMoneyPaymentProviderOptions {
  providerName: string;
  apiKey: string;
  secretKey: string;
  currency: string;
  paymentUrl: string;
}

export interface MobileMoneyPayment {
  amount: number;
  currency: string;
  transactionId: string;
  status: 'pending' | 'completed' | 'failed';
}