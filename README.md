# Playwright API Automation Framework

A scalable **API Test Automation Framework** built using **Playwright and TypeScript**, designed with practical SDET principles such as reusable fixtures, external test data, API chaining, validations, and CI/CD integration.

## Tech Stack

* Playwright
* TypeScript
* Node.js
* REST API
* Git & GitHub
* GitHub Actions

## Framework Structure

```text
playwright-api-automation/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── api/
│   └── auth.ts
│
├── fixtures/
│   └── api-fixture.ts
│
├── testData/
│   └── post.json
│
├── tests/
│   ├── auth.spec.ts
│   ├── booking.spec.ts
│   ├── completeFlow.spec.ts
│   ├── delete.spec.ts
│   ├── patch.spec.ts
│   ├── post.spec.ts
│   └── update.spec.ts
│
├── .gitignore
├── package.json
├── playwright.config.ts
└── README.md
```

## Key Features

### API Authentication

Implemented API authentication using the `/auth` endpoint and token-based authentication for secured API operations.

### Custom Playwright Fixtures

Created reusable Playwright fixtures to manage authentication and avoid repeating authentication logic across test cases.

### External Test Data

Test data is maintained separately in JSON files to improve readability, maintainability, and reusability.

### CRUD API Automation

Automated the complete CRUD lifecycle:

* **POST** – Create booking
* **GET** – Retrieve booking
* **PUT** – Update complete booking
* **PATCH** – Update specific booking fields
* **DELETE** – Delete booking

### API Chaining

Implemented dynamic request chaining where the booking ID generated from the POST request is reused in subsequent API requests.

```text
POST /booking
      ↓
Capture booking ID
      ↓
GET /booking/{id}
      ↓
PUT /booking/{id}
      ↓
PATCH /booking/{id}
      ↓
DELETE /booking/{id}
      ↓
Verify deletion
```

### API Validations

The framework validates:

* HTTP response status codes
* Response payload
* Created booking ID
* Updated field values
* Nested response data
* Successful deletion

## Example

```typescript
const createResponse = await request.post("/booking", {
    headers: {
        Cookie: `token=${authToken}`
    },
    data: bookingData
});

expect(createResponse.status()).toBe(200);

const createBody = await createResponse.json();
const bookingId = createBody.bookingid;

const updateResponse = await request.put(`/booking/${bookingId}`, {
    headers: {
        Cookie: `token=${authToken}`
    },
    data: bookingData
});

expect(updateResponse.status()).toBe(200);
```

## Environment Configuration

Sensitive credentials are stored using environment variables and are **not committed to GitHub**.

Example:

```env
BASE_URL=https://restful-booker.herokuapp.com
API_USERNAME=admin
API_PASSWORD=your_password
```

The `.env` file is excluded through `.gitignore`.

## Running the Tests

Install dependencies:

```bash
npm install
```

Run all tests:

```bash
npx playwright test
```

Run a specific test:

```bash
npx playwright test tests/completeFlow.spec.ts
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

View the HTML report:

```bash
npx playwright show-report
```

## CI/CD

The project is integrated with **GitHub Actions** to execute automated API tests as part of the CI workflow.

This provides automated test execution whenever changes are pushed to the repository.

## SDET Practices Demonstrated

* API automation
* TypeScript
* Playwright
* Reusable fixtures
* Authentication handling
* Test data management
* API chaining
* CRUD testing
* Response validation
* Environment configuration
* Git & GitHub
* CI/CD with GitHub Actions
* Maintainable test framework structure

## Future Improvements

* Add API request wrapper/service layer
* Improve fixture-based authentication
* Add schema validation
* Add negative API test scenarios
* Add request/response logging
* Add test tagging and execution strategies
* Improve CI reporting
* Integrate API tests with a larger UI automation framework

## Repository

**GitHub:**
https://github.com/Sahil133101/playwright-api-automation

```

### One important SDET improvement

Since you're positioning this as an **SDET project**, I would next improve your framework from:

`test → request → authToken`

to:

`test → apiRequest fixture → API`

That removes authentication headers from every test and makes your framework more reusable and professional.
```
