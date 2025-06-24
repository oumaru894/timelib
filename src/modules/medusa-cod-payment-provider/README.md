# Cash on Delivery Payment Provider

This project implements a Cash on Delivery (COD) payment provider for the Medusa e-commerce framework. The COD payment provider allows customers to pay for their orders in cash at the time of delivery.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [License](#license)

## Installation

To install the Cash on Delivery payment provider, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/medusa-cod-payment-provider.git
   ```

2. Navigate to the project directory:
   ```
   cd medusa-cod-payment-provider
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Build the project:
   ```
   npm run build
   ```

## Usage

To use the Cash on Delivery payment provider in your Medusa project, you need to register it in your Medusa server configuration. 

1. Import the provider in your Medusa server setup:
   ```typescript
   import { CodPaymentProvider } from "medusa-cod-payment-provider";
   ```

2. Register the provider:
   ```typescript
   const medusa = new Medusa({
     // other configurations
     paymentProviders: [
       new CodPaymentProvider(),
     ],
   });
   ```

## API

### CodPaymentProvider

- `createPayment(data: CodPaymentData): Promise<CodPaymentResponse>`
  - Initiates a cash on delivery payment.

- `confirmPayment(paymentId: string): Promise<CodPaymentResponse>`
  - Confirms a cash on delivery payment.

- `refundPayment(paymentId: string): Promise<CodPaymentResponse>`
  - Processes a refund for a cash on delivery payment.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.