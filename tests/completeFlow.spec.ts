import { test, expect } from "../fixtures/api-fixture";
import bookingData from "../testData/post.json";

test.describe("Booking CRUD API", () => {

    test("Create, Get, Update, Patch and Delete booking", async ({
        request,
        authToken
    }) => {

        const authHeaders = {
            Cookie: `token=${authToken}`
        };

        // =========================
        // 1. CREATE BOOKING
        // =========================

        const createResponse = await request.post("/booking", {
            headers: authHeaders,
            data: bookingData
        });

        expect(createResponse.status()).toBe(200);

        const createBody = await createResponse.json();

        console.log("Create Response:", createBody);

        expect(createBody.bookingid).toBeTruthy();

        const bookingId = createBody.bookingid;

        console.log("Created Booking ID:", bookingId);


        // =========================
        // 2. GET BOOKING
        // =========================

        const getResponse = await request.get(`/booking/${bookingId}`);

        expect(getResponse.status()).toBe(200);

        const getBody = await getResponse.json();

        console.log("Get Response:", getBody);

        expect(getBody.firstname).toBe(bookingData.firstname);
        expect(getBody.lastname).toBe(bookingData.lastname);


        // =========================
        // 3. PUT BOOKING
        // =========================

        const updateData = {
            ...bookingData,
            firstname: "Sahil",
            lastname: "Sharma"
        };

        const putResponse = await request.put(
            `/booking/${bookingId}`,
            {
                headers: authHeaders,
                data: updateData
            }
        );

        expect(putResponse.status()).toBe(200);

        const putBody = await putResponse.json();

        console.log("PUT Response:", putBody);

        expect(putBody.firstname).toBe("Sahil");
        expect(putBody.lastname).toBe("Sharma");


        // =========================
        // 4. PATCH BOOKING
        // =========================

        const patchResponse = await request.patch(
            `/booking/${bookingId}`,
            {
                headers: authHeaders,
                data: {
                    firstname: "Rahul"
                }
            }
        );

        expect(patchResponse.status()).toBe(200);

        const patchBody = await patchResponse.json();

        console.log("PATCH Response:", patchBody);

        expect(patchBody.firstname).toBe("Rahul");

        // Lastname should remain unchanged
        expect(patchBody.lastname).toBe("Sharma");


        // =========================
        // 5. DELETE BOOKING
        // =========================

        const deleteResponse = await request.delete(
            `/booking/${bookingId}`,
            {
                headers: authHeaders
            }
        );

        expect(deleteResponse.status()).toBe(201);

        console.log("Booking Deleted:", bookingId);


        // =========================
        // 6. VERIFY DELETION
        // =========================

        const verifyResponse = await request.get(
            `/booking/${bookingId}`
        );

        expect(verifyResponse.status()).toBe(404);

        console.log("Booking successfully deleted");
    });
});