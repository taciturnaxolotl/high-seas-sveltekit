import Airtable from "airtable";
import { AIRTABLE_API_KEY, AIRTABLE_API_URL, AIRTABLE_BASE_ID } from "$env/static/private";

const client = new Airtable({ endpointUrl: AIRTABLE_API_URL, apiKey: AIRTABLE_API_KEY });
export default client.base(AIRTABLE_BASE_ID);