import { test } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ override: true });

test("Create auth token", async ({ request }) => {

    console.log("BASE_URL:", process.env.BASE_URL);
    console.log("API_USERNAME:", process.env.API_USERNAME);
    console.log(
        "API_PASSWORD:",
        process.env.API_PASSWORD ? "set" : "undefined"
    );

    const response = await request.post(
        `${process.env.BASE_URL}/auth`,
        {
            data: {
                username: process.env.API_USERNAME,
                password: process.env.API_PASSWORD
            }
        }
    );

    const body = await response.json();

    console.log("Status:", response.status());
    console.log("Response:", body);

    test.expect(response.status()).toBe(200);
    test.expect(body.token).toBeTruthy();
});