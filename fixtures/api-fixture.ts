import { test as base, expect } from "@playwright/test";
import { getAuthToken } from "../api/auth";

type ApiFixtures = {
    authToken: string;
};

export const test = base.extend<ApiFixtures>({

    authToken: async ({ request }, use) => {

        const token = await getAuthToken(request);

        // console.log("Auth Token:", token);

        await use(token);
    }

});

export { expect };