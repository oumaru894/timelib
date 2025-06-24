export interface CodPaymentData {
  orderId: string;
  amount: number;
  currency: string;
  customerName: string;
  customerAddress: string;
}

export interface CodPaymentResponse {
  success: boolean;
  message: string;
  transactionId?: string;
}