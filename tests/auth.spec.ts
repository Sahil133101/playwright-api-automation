import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ override: true });

test("Create auth token", async ({ request }) => {

    console.log("BASE_URL:", process.env.API_BASE_URL);
    console.log("USERNAME:", process.env.API_USERNAME);
    console.log("PASSWORD:", process.env.API_PASSWORD);

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
});