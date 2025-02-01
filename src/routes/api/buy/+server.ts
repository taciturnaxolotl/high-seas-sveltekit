import { error, redirect } from "@sveltejs/kit";
import { getShopItem } from "$lib/server/shop";
import airtable from "$lib/server/airtable";

export async function GET({ url, locals }) {
  const searchParams = url.searchParams;
  const itemId = searchParams.get("itemId");
  if (!itemId) {
    return error(400, { message: "Missing item ID" });
  }

  if (!locals.person) {
    return error(401, { message: "Not logged in" });
  }

  const item = await getShopItem(itemId);
  if (!item) {
    return error(418, { message: "Item not found" });
  }

  if (
    item.priceUs > locals.person.doubloonsBalance &&
    item.priceGlobal > locals.person.doubloonsBalance
  ) {
    return error(402, { message: "Not enough doubloons" });
  }

  const otp = Math.random().toString(16).slice(2);
  const otpExpiry = new Date(
    new Date().getTime() + 60 * 60 * 1000
  ).toISOString();

  await airtable("people").update(locals.person.recordId, {
    shop_otp: otp,
    shop_otp_expires_at: otpExpiry,
  });

  throw redirect(
    303,
    `${item.filloutBaseUrl.replace("shop-order", "hs-order")}${otp}`
  );
}
