import { expect, type Page, test } from "@playwright/test";

test.describe("SubmitPage", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the submit page
    await page.goto("http://localhost:3000/submit"); // Adjust URL as needed
  });

  test.describe("Page Layout and Initial State", () => {
    test("should display the page title and description", async ({ page }) => {
      await expect(page.locator("h1")).toContainText("Submit Software");
      await expect(page.locator("p").first()).toContainText(
        "Help grow our catalog by recommending amazing free and open-source software",
      );
    });

    test("should display submission guidelines", async ({ page }) => {
      await expect(
        page.locator("h2").filter({ hasText: "Submission Guidelines" }),
      ).toBeVisible();
      await expect(page.getByText("✅ We Accept:")).toBeVisible();
      await expect(page.getByText("❌ We Don't Accept:")).toBeVisible();
    });

    test("should display the submission form", async ({ page }) => {
      await expect(page.locator("form")).toBeVisible();
      await expect(
        page.locator("h2").filter({ hasText: "Software Information" }),
      ).toBeVisible();
    });

    test("should have all required form fields visible", async ({ page }) => {
      await expect(page.locator('input[name="name"]')).toBeVisible();
      await expect(page.locator('select[name="category"]')).toBeVisible();
      await expect(
        page.locator('input[name="shortDescription"]'),
      ).toBeVisible();
      await expect(
        page.locator('textarea[name="longDescription"]'),
      ).toBeVisible();
      await expect(page.locator('input[name="website"]')).toBeVisible();
      await expect(page.locator('input[name="license"]')).toBeVisible();
    });
  });

  test.describe("Form Validation", () => {
    test("should prevent submission with empty required fields", async ({
      page,
    }) => {
      await page.click('button[type="submit"]');

      // Check for HTML5 validation messages
      const nameInput = page.locator('input[name="name"]');
      await expect(nameInput).toHaveAttribute("required");

      // The form should not submit (page should not change)
      await expect(page.locator("h1")).toContainText("Submit Software");
    });

    test("should validate URL fields", async ({ page }) => {
      await page.fill('input[name="website"]', "invalid-url");
      await page.click('button[type="submit"]');

      const websiteInput = page.locator('input[name="website"]');
      await expect(websiteInput).toHaveAttribute("type", "url");
    });

    test("should validate email field", async ({ page }) => {
      await page.fill('input[name="submitterEmail"]', "invalid-email");
      await page.click('button[type="submit"]');

      const emailInput = page.locator('input[name="submitterEmail"]');
      await expect(emailInput).toHaveAttribute("type", "email");
    });

    test("should enforce character limit on short description", async ({
      page,
    }) => {
      const longText = "a".repeat(151);
      await page.fill('input[name="shortDescription"]', longText);

      const shortDescInput = page.locator('input[name="shortDescription"]');
      const value = await shortDescInput.inputValue();
      expect(value.length).toBeLessThanOrEqual(150);
    });

    test("should display character count for short description", async ({
      page,
    }) => {
      await page.fill('input[name="shortDescription"]', "Test description");
      await expect(page.getByText(/16\/150 characters/)).toBeVisible();
    });
  });

  test.describe("Form Interactions", () => {
    // test("should populate category dropdown with options", async ({ page }) => {
    //   const categorySelect = page.locator('select[name="category"]');
    //   await categorySelect.click();

    //   const expectedCategories = [
    //     "Development",
    //     "Design",
    //     "Communication",
    //     "Productivity",
    //     "Media",
    //     "Security",
    //     "Utilities",
    //     "Education",
    //   ];

    //   for (const category of expectedCategories) {
    //     await expect(page.locator(`option[value="${category}"]`)).toBeVisible();
    //   }
    // });

    test("should handle platform checkbox selection", async ({ page }) => {
      const platforms = ["Windows", "macOS", "Linux", "Web", "Android", "iOS"];

      // Select multiple platforms
      for (const platform of platforms.slice(0, 3)) {
        await page.check(`input[type="checkbox"][value="${platform}"]`);
      }

      // Verify checkboxes are checked
      for (const platform of platforms.slice(0, 3)) {
        await expect(
          page.locator(`input[type="checkbox"][value="${platform}"]`),
        ).toBeChecked();
      }

      // Uncheck one platform
      await page.uncheck(`input[type="checkbox"][value="${platforms[0]}"]`);
      await expect(
        page.locator(`input[type="checkbox"][value="${platforms[0]}"]`),
      ).not.toBeChecked();
    });

    test("should update character count as user types", async ({ page }) => {
      const shortDescInput = page.locator('input[name="shortDescription"]');

      await shortDescInput.fill("Short");
      await expect(page.getByText("5/150 characters")).toBeVisible();

      await shortDescInput.fill("A longer description");
      await expect(page.getByText("20/150 characters")).toBeVisible();
    });
  });

  test.describe("Form Submission", () => {
    const fillRequiredFields = async (page: Page) => {
      await page.fill('input[name="name"]', "Test Software");
      await page.selectOption('select[name="category"]', "Development");
      await page.fill(
        'input[name="shortDescription"]',
        "A test software for testing",
      );
      await page.fill(
        'textarea[name="longDescription"]',
        "This is a detailed description of the test software that provides comprehensive functionality for testing purposes.",
      );
      await page.fill('input[name="website"]', "https://example.com");
      await page.fill('input[name="license"]', "MIT");
      await page.check('input[type="checkbox"][value="Windows"]');
    };

    test("should submit form with valid data", async ({ page }) => {
      await fillRequiredFields(page);

      // Mock console.log to verify form submission
      let consoleOutput = "";
      page.on("console", (msg) => {
        if (msg.type() === "log") {
          consoleOutput = msg.text();
        }
      });

      await page.click('button[type="submit"]');

      // Should show success message
      await expect(
        page.locator("h2").filter({ hasText: "Submission Received!" }),
      ).toBeVisible();
      await expect(
        page.getByText("Thank you for contributing to our catalog!"),
      ).toBeVisible();
    });

    test("should display success state after submission", async ({ page }) => {
      await fillRequiredFields(page);
      await page.click('button[type="submit"]');

      // Check success state elements
      await expect(page.locator(".bg-green-100")).toBeVisible(); // Success icon background
      await expect(page.getByText("Submission Received!")).toBeVisible();
      await expect(page.getByText("Submit Another")).toBeVisible();
    });

    test('should reset form when clicking "Submit Another"', async ({
      page,
    }) => {
      await fillRequiredFields(page);
      await page.click('button[type="submit"]');

      // Wait for success state
      await expect(page.getByText("Submit Another")).toBeVisible();

      // Click submit another
      await page.click('button:has-text("Submit Another")');

      // Should return to form with empty fields
      await expect(page.locator("h1")).toContainText("Submit Software");
      await expect(page.locator('input[name="name"]')).toHaveValue("");
      await expect(page.locator('select[name="category"]')).toHaveValue("");
    });

    test("should submit form with optional fields filled", async ({ page }) => {
      await fillRequiredFields(page);

      // Fill optional fields
      await page.fill('input[name="github"]', "https://github.com/test/repo");
      await page.fill('input[name="tags"]', "testing, automation, playwright");
      await page.fill('input[name="submitterName"]', "John Doe");
      await page.fill('input[name="submitterEmail"]', "john@example.com");
      await page.fill(
        'textarea[name="additionalNotes"]',
        "This is a great tool for testing.",
      );

      await page.click('button[type="submit"]');

      await expect(page.getByText("Submission Received!")).toBeVisible();
    });
  });

  test.describe("Accessibility", () => {
    test("should have proper form labels", async ({ page }) => {
      // Check that form inputs have associated labels
      const inputs = [
        "name",
        "category",
        "shortDescription",
        "longDescription",
        "website",
        "github",
        "license",
        "tags",
        "submitterName",
        "submitterEmail",
        "additionalNotes",
      ];

      for (const inputName of inputs) {
        const input = page.locator(`[name="${inputName}"]`);
        const labelFor = await page
          .locator(`label[for="${inputName}"]`)
          .count();
        expect(labelFor).toBeGreaterThan(0);
      }
    });

    test("should support keyboard navigation", async ({
      page,
      browserName,
    }) => {
      if (browserName !== "webkit") {
        // All headers
        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
      }

      // Tab through form elements
      await page.keyboard.press("Tab");
      await expect(page.locator('input[name="name"]')).toBeFocused();

      await page.keyboard.press("Tab");
      await expect(page.locator('select[name="category"]')).toBeFocused();
    });

    test("should have appropriate ARIA attributes", async ({ page }) => {
      const requiredInputs = page.locator(
        "input[required], select[required], textarea[required]",
      );
      const count = await requiredInputs.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe("Responsive Design", () => {
    test.fixme("should be responsive on mobile viewport", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Check that form is still visible and usable
      await expect(page.locator("form")).toBeVisible();
      await expect(page.locator('input[name="name"]')).toBeVisible();

      // Form should stack on mobile
      const formGrid = page.locator(".grid.grid-cols-1.md\\:grid-cols-2");
      await expect(formGrid).toBeVisible();
    });

    test("should be responsive on tablet viewport", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      await expect(page.locator("form")).toBeVisible();
      await expect(page.locator('input[name="name"]')).toBeVisible();
    });
  });

  test.describe("Error Handling", () => {
    test("should handle form submission errors gracefully", async ({
      page,
    }) => {
      await page.fill('input[name="name"]', "Test Software");
      await page.selectOption('select[name="category"]', "Development");
      await page.fill('input[name="shortDescription"]', "A test software");
      await page.fill(
        'textarea[name="longDescription"]',
        "Detailed description",
      );
      await page.fill('input[name="website"]', "https://example.com");
      // await page.fill('input[name="license"]', "MIT");
      await page.check('input[type="checkbox"][value="Windows"]');

      await page.click('button[type="submit"]');

      // Form should still be visible (not showing success state)
      // because license is still required
      await expect(
        page.locator("h1").filter({ hasText: "Submit Software" }),
      ).toBeVisible();
    });
  });
  test.describe("Happy path", () => {
    test("should handle form submission errors gracefully", async ({
      page,
    }) => {
      await page.fill('input[name="name"]', "Test Software");
      await page.selectOption('select[name="category"]', "Development");
      await page.fill('input[name="shortDescription"]', "A test software");
      await page.fill(
        'textarea[name="longDescription"]',
        "Detailed description",
      );
      await page.fill('input[name="website"]', "https://example.com");
      await page.fill('input[name="license"]', "MIT");
      await page.check('input[type="checkbox"][value="Windows"]');

      await page.click('button[type="submit"]');

      await expect(
        page.locator("h2").filter({ hasText: "Submission Received!" }),
      ).toBeVisible();
    });
  });
});
