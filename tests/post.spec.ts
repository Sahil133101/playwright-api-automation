import { test, expect } from "../fixtures/api-fixture";
import bookingData from "../testData/post.json";

test.describe("POST data on the API", () => {

    test("POST booking data", async ({ request, authToken }) => {

        const response = await request.post("/booking", {

            headers: {
                Cookie: `token=${authToken}`
            },

            data: bookingData
        });

        expect(response.status()).toBe(200);

        const body = await response.json();

        console.log("Response:", body);

        expect(body.bookingid).toBeTruthy();
        expect(body.booking.firstname).toBe(bookingData.firstname);
        expect(body.booking.lastname).toBe(bookingData.lastname);
    });

    test("TC02 - Create booking without authentication", async ({ request }) => {

        const response = await request.post("/booking", {
            data: bookingData
        });

        console.log("Status:", response.status());

       
        expect(response.status()).toBe(200);
    });

 test("TC03 - Create booking with modified test data", async ({ request, authToken }) => {

        const testData = {
            ...bookingData,
            firstname: "Sahil",
            lastname: "Sharma"
        };

        const response = await request.post("/booking", {
            headers: {
                Cookie: `token=${authToken}`
            },
            data: testData
        });

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.bookingid).toBeTruthy();
        expect(body.booking.firstname).toBe("Sahil");
        expect(body.booking.lastname).toBe("Sharma");
    });

});