# Mobile Money Payment Provider for Medusa

This project implements a Mobile Money payment provider for the Medusa e-commerce platform. It allows merchants to accept payments via mobile money services, providing a convenient option for customers.

## Installation

To install the Mobile Money payment provider, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   cd medusa-mobile-money-payment-provider
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Build the project:
   ```
   npm run build
   ```

4. Add the provider to your Medusa configuration. In your `medusa-config.js` or `medusa-config.ts`, include the following:
   ```javascript
   const MobileMoneyPaymentProvider = require('medusa-mobile-money-payment-provider').default;

   module.exports = {
     // other configurations...
     paymentProviders: [
       MobileMoneyPaymentProvider,
       // other providers...
     ],
   };
   ```

## Usage

Once the provider is configured, it will appear in the admin panel under payment options. You can configure the provider settings according to your requirements.

## Development

To contribute to the development of this provider, you can run the following commands:

- To start the development server:
  ```
  npm run dev
  ```

- To run tests:
  ```
  npm test
  ```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.