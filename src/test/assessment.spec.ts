import { test, expect } from "@playwright/test";

test.describe("Knowledge Capture App", () => {
  test("should add a new entry", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Click FAB to open form
    await page.click('[data-testid="add-button"]');

    // Fill in the form
    await page.fill('[data-testid="title-input"]', "Test Entry");
    await page.fill(
      '[data-testid="description-input"]',
      "This is a test description"
    );

    // Submit
    await page.click('[data-testid="submit-button"]');

    // Wait for the modal to close and entry to appear
    await page.waitForTimeout(1000);

    // Verify entry appears
    await expect(
      page.locator('[data-testid="entry-card"]').first()
    ).toContainText("Test Entry");
  });

  test("should delete an entry", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Wait for entries to load
    await page.waitForSelector('[data-testid="entry-card"]');

    // Get initial count
    const initialCount = await page
      .locator('[data-testid="entry-card"]')
      .count();

    // Hover over first entry to show actions
    await page.hover('[data-testid="entry-card"]');

    // Click delete button on first entry
    await page.locator('[data-testid="delete-button"]').first().click();

    // Wait for delete modal to appear and click confirm
    await page.waitForSelector('[data-testid="confirm-delete-button"]');
    await page.click('[data-testid="confirm-delete-button"]');

    // Wait for deletion to complete
    await page.waitForTimeout(1000);

    // Verify count decreased
    const finalCount = await page.locator('[data-testid="entry-card"]').count();
    expect(finalCount).toBe(initialCount - 1);
  });

  test("should search entries", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Wait for entries to load
    await page.waitForSelector('[data-testid="entry-card"]');

    // Get initial count
    const initialCount = await page
      .locator('[data-testid="entry-card"]')
      .count();

    // Perform search
    await page.fill('[data-testid="search-input"]', "qui");

    // Wait for search to filter
    await page.waitForTimeout(500);

    // Verify filtered results exist
    const filteredCount = await page
      .locator('[data-testid="entry-card"]')
      .count();

    // Should have results and possibly fewer than before
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test("should edit an entry", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Wait for entries to load
    await page.waitForSelector('[data-testid="entry-card"]');

    // Get the first entry's original title
    const originalTitle = await page
      .locator('[data-testid="entry-title"]')
      .first()
      .textContent();

    // Hover and click edit button
    await page.hover('[data-testid="entry-card"]');
    await page.locator('[data-testid="edit-button"]').first().click();

    // Wait for modal to open
    await page.waitForSelector('[data-testid="entry-form"]');

    // Update the title
    await page.fill('[data-testid="title-input"]', "Updated Entry Title");

    // Submit
    await page.click('[data-testid="submit-button"]');

    // Wait for update to complete
    await page.waitForTimeout(1000);

    // Verify the title was updated
    const updatedTitle = await page
      .locator('[data-testid="entry-title"]')
      .first()
      .textContent();
    expect(updatedTitle).toContain("Updated Entry Title");
    expect(updatedTitle).not.toBe(originalTitle);
  });

  test("should cancel entry creation", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Wait for page to load
    await page.waitForSelector('[data-testid="add-button"]');

    // Click FAB to open form
    await page.click('[data-testid="add-button"]');

    // Fill in the form
    await page.fill('[data-testid="title-input"]', "Cancelled Entry");

    // Click cancel instead of submit
    await page.locator('button:has-text("Cancel")').click();

    // Wait a moment
    await page.waitForTimeout(500);
  });
});
