import { test, expect } from "../fixtures/api-fixture";

test.describe("PATCH method", () => {

    test("Update firstname of booking", async ({ request, authToken }) => {

        const response = await request.patch("/booking/5", {

            headers: {
                Cookie: `token=${authToken}`
            },

            data: {
                firstname: "Sahil"
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();

        console.log("PATCH Response:", body);

        expect(body.firstname).toBe("Sahil");
    });

});