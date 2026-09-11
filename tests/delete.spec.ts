import { test, expect } from "../fixtures/api-fixture";

test.describe("DELETE method", () => {

    test("Delete booking", async ({ request, authToken }) => {

        const response = await request.delete("/booking/5", {

            headers: {
                Cookie: `token=${authToken}`
            }
        });

        expect(response.status()).toBe(201);

        console.log("Delete Status:", response.status());
    });

});