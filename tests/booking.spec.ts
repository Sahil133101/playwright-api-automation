import { test, expect } from "../fixtures/api-fixture";

test.describe("Get method of API testing", () => {

    test("Get booking data", async ({ request, authToken }) => {

        const response = await request.get("/booking", {
            headers: {
                Cookie: `token=${authToken}`
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();

        console.log("Booking Data:", body);

        expect(Array.isArray(body)).toBeTruthy();
    });

    test("particulr product", async({request,authToken})=>{

      const  response = await request.get("/booking/10",{
        headers : {
          Cookies : `token=${authToken}`

        }

      })
      expect(response.status()).toBe(200);
      const body = await response.json();
      console.log("Booking Data:", body);

    })

});