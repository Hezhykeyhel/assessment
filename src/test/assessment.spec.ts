/* eslint-disable @typescript-eslint/no-explicit-any */
// tests/knowledge-capture.spec.ts
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

    // Click delete on first entry
    await page.hover('[data-testid="entry-card"]');
    await page.click('[data-testid="delete-button"]');

    // Confirm deletion
    page.on("dialog", (dialog: { accept: () => any }) => dialog.accept());

    // Verify count decreased
    const finalCount = await page.locator('[data-testid="entry-card"]').count();
    expect(finalCount).toBe(initialCount - 1);
  });

  test("should search entries", async ({ page }) => {
    await page.goto("http://localhost:5173");

    // Wait for entries to load
    await page.waitForSelector('[data-testid="entry-card"]');

    // Perform search
    await page.fill('[data-testid="search-input"]', "qui");

    // Verify filtered results
    const entries = await page.locator('[data-testid="entry-card"]').all();
    expect(entries.length).toBeGreaterThan(0);
  });
});
