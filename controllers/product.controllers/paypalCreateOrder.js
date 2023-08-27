// For a fully working example, please see:

// https://github.com/paypal-examples/docs-examples/tree/main/standard-integration

const baseURL = {
  sandbox: "https://api-m.sandbox.paypal.com",

  production: "https://api-m.paypal.com",
};

// create a new order

const paypalCreateOrder = async (req, res) => {
  const { total } = req.body;
  const order = await createOrder(total);

  res.json(order);
};
// use the orders api to create an order

async function createOrder(total) {
  const accessToken = await generateAccessToken();

  const url = `${baseURL.sandbox}/v2/checkout/orders`;

  const response = await fetch(url, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${accessToken}`,
    },

    body: JSON.stringify({
      intent: "CAPTURE",

      purchase_units: [
        {
          amount: {
            currency_code: "USD",

            value: total,
          },
        },
      ],
    }),
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
export default paypalCreateOrder;
