import { APIRequestContext, expect } from "@playwright/test";

export async function getAuthToken(
    request: APIRequestContext
): Promise<string> {

    const response = await request.post("/auth", {
        data: {
            username: process.env.API_USERNAME,
            password: process.env.API_PASSWORD
        }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.token).toBeTruthy();

    return body.token;
}