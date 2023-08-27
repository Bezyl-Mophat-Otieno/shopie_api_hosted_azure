// For a fully working example, please see:

// https://github.com/paypal-examples/docs-examples/tree/main/standard-integration

const baseURL = {
  sandbox: "https://api-m.sandbox.paypal.com",

  production: "https://api-m.paypal.com",
};

// capture payment & store order information or fullfill order

const paypalCaptureOrder = async (req, res) => {
  const { orderID } = req.body;

  const captureData = await capturePayment(orderID);

  // TODO: store payment information such as the transaction ID

  res.json(captureData);
};

// use the orders api to capture payment for an order

async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();

  const url = `${baseURL.sandbox}/v2/checkout/orders/${orderId}/capture`;

  const response = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  return data;
}

// generate an access token using client id and app secret

async function generateAccessToken() {
  const auth = Buffer.from(
    process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_SECRET
  ).toString("base64");

  const response = await fetch(`${baseURL.sandbox}/v1/oauth2/token`, {
    method: "POST",

    body: "grant_type=client_credentials",

    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const data = await response.json();

  return data.access_token;
}

export default paypalCaptureOrder;
