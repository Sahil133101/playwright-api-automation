import { test, expect } from "../fixtures/api-fixture";
import bookingData from "../testData/post.json";

test("Update firstname of booking", async ({ request, authToken }) => {

    // Create booking
    const createResponse = await request.post("/booking", {
        headers: {
            Cookie: `token=${authToken}`
        },
        data: bookingData
    });

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;

    // PATCH created booking
    const response = await request.patch(`/booking/${bookingId}`, {
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