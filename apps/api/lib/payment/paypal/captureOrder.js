import getAccessToken from './getAccessToken';
import config from './config';

export default async function CaptureOrder(orderID) {
  const accessToken = await getAccessToken();

  const res = await fetch(`https://api.${config.environment === 'sandbox' ? 'sandbox.' : ''}paypal.com/v2/checkout/orders/${orderID}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
      'return': 'representation',
      'PayPal-Partner-Attribution-Id': 'PP-DemoPortal-Checkout-NodeJS-SDK'
    }
  });

  return res.json();
};
