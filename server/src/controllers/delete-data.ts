import * as express from "express";
import crypto from "crypto";

function base64decode(data: string) {
  while (data.length % 4 !== 0) {
    data += "=";
  }
  data = data.replace(/-/g, "+").replace(/_/g, "/");

  return Buffer.from(data, "base64").toString("utf-8");
}

export const deleteDataController = async (
  req: express.Request,
  res: express.Response
) => {
  const { signed_request } = req.body;
  const secret = process.env.FACEBOOK_APP_SECRET;

  try {
    const encodedData = signed_request.split(".", 2);
    // decode the data
    const sig = encodedData[0];
    const json = base64decode(encodedData[1]);
    const data = JSON.parse(json);

    if (secret === undefined) {
      throw Error("FB app secret is missing");
    }

    if (!data.algorithm || data.algorithm.toUpperCase() != "HMAC-SHA256") {
      secret;
      throw Error(
        "Unknown algorithm: " + data.algorithm + ". Expected HMAC-SHA256"
      );
    }

    const expected_sig = crypto
      .createHmac("sha256", secret)
      .update(encodedData[1])
      .digest("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace("=", "");

    if (sig !== expected_sig) {
      throw Error("Invalid signature: " + sig + ". Expected " + expected_sig);
    }

    const url = `https://musicserver.izmus.cz/delete-data/check?id=${data.user_id}`;
    const confirmationCode = data.user_id;

    console.log(`{ url: '${url}', confirmation_code: '${confirmationCode}' }`);

    res.send(`{ url: '${url}', confirmation_code: '${confirmationCode}' }`);
  } catch (err) {
    res.status(400).json({ error: "Something went wrong..." });
  }
};
