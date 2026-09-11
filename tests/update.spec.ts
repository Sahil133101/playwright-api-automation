import { test, expect } from "../fixtures/api-fixture";
import bookingData from "../testData/post.json";

test.describe("PUT method", () => {

    test("Update data on the booking ID", async ({ request, authToken }) => {

        const response = await request.put("/booking/5", {

            headers: {
                Cookie: `token=${authToken}`
            },

            data: bookingData
        });

        expect(response.status()).toBe(200);

        const body = await response.json();

        console.log("Updated Booking:", body);

        // Validate updated response
        expect(body.firstname).toBe(bookingData.firstname);
        expect(body.lastname).toBe(bookingData.lastname);
        expect(body.totalprice).toBe(bookingData.totalprice);
        expect(body.depositpaid).toBe(bookingData.depositpaid);

        expect(body.bookingdates.checkin)
            .toBe(bookingData.bookingdates.checkin);

        expect(body.bookingdates.checkout)
            .toBe(bookingData.bookingdates.checkout);

        expect(body.additionalneeds)
            .toBe(bookingData.additionalneeds);
    });

});