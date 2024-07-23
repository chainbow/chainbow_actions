/**
 * Solana Actions Example
 */
import * as bitcoin from "bitcoinjs-lib";

import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { DEFAULT_BTC_ADDRESS, DEFAULT_BTC_AMOUNT } from "./const";

export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { address } = validatedQueryParams(requestUrl);

    const baseHref = new URL(
      `/api/actions/transfer-btc?to=${address}`,
      requestUrl.origin,
    ).toString();

    const payload: ActionGetResponse = {
      title: "Actions Example - Transfer Native BTC",
      icon: new URL("/solana_devs.jpg", requestUrl.origin).toString(),
      description: "Transfer BTC to another Solana wallet",
      label: "Transfer", // this value will be ignored since `links.actions` exists
      links: {
        actions: [
          {
            label: "Send 0.01 BTC", // button text
            href: `${baseHref}&amount=${"0.01"}`,
          },
          {
            label: "Send 0.1 BTC", // button text
            href: `${baseHref}&amount=${"0.1"}`,
          },
          {
            label: "Send 1 BTC", // button text
            href: `${baseHref}&amount=${"1"}`,
          },
          {
            label: "Send BTC", // button text
            href: `${baseHref}&amount={amount}`, // this href will have a text input
            parameters: [
              {
                name: "amount", // parameter name in the `href` above
                label: "Enter the amount of BTC to send", // placeholder of the text input
                required: true,
              },
            ],
          },
        ],
      },
    };

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    console.log(err);
    let message = "An unknown error occurred";
    if (typeof err == "string") message = err;
    return new Response(message, {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { amount, address } = validatedQueryParams(requestUrl);

    const psbt = new bitcoin.Psbt({
      network: bitcoin.networks.testnet,
    });
    // Add two outputs
    psbt.addOutput({
      address,
      value: amount * 10 ** 8,
    });

    return Response.json(
      { psbtHex: psbt.toHex(), message: `Send ${amount} BTC to ${address}` },
      {
        headers: ACTIONS_CORS_HEADERS,
      },
    );
  } catch (err) {
    console.log(err);
    let message = "An unknown error occurred";
    if (typeof err == "string") message = err;
    return new Response(message, {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};

function validatedQueryParams(requestUrl: URL) {
  let address = DEFAULT_BTC_ADDRESS;
  let amount: number = DEFAULT_BTC_AMOUNT;

  try {
    if (requestUrl.searchParams.get("to")) {
      address = requestUrl.searchParams.get("to")!;
    }
  } catch (err) {
    throw "Invalid input query parameter: to";
  }

  try {
    if (requestUrl.searchParams.get("amount")) {
      amount = parseFloat(requestUrl.searchParams.get("amount")!);
    }

    if (amount <= 0) throw "amount is too small";
  } catch (err) {
    throw "Invalid input query parameter: amount";
  }

  return {
    address,
    amount,
  };
}
