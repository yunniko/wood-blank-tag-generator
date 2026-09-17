import { expect, test } from "@playwright/test";

test("home page links to all three tools", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Wood Blank Tag Generator" })).toBeVisible();
  await expect(page.getByTestId("tool-card-blank-tag")).toBeVisible();
  await expect(page.getByTestId("tool-card-batch-tags")).toBeVisible();
  await expect(page.getByTestId("tool-card-drying-log")).toBeVisible();
});

test("blank tag: species prefixes the headline", async ({ page }) => {
  await page.goto("/blank-tag");
  await page.getByTestId("blank-species").fill("Black Walnut");
  await expect(page.getByTestId("blank-tag-preview")).toContainText("Black Walnut — Bowl blank");
});

test("blank tag: rough-turned state reveals wall thickness and a drying estimate", async ({ page }) => {
  await page.goto("/blank-tag");
  await expect(page.getByTestId("blank-wall-thickness")).toHaveCount(0);
  await page.getByTestId("blank-dry-state").selectOption("rough-turned");
  await expect(page.getByTestId("blank-wall-thickness")).toBeVisible();
  await expect(page.getByTestId("blank-tag-preview")).toContainText("Estimated ready to finish-turn");
});

test("blank tag: switching back to green hides the drying estimate", async ({ page }) => {
  await page.goto("/blank-tag");
  await page.getByTestId("blank-dry-state").selectOption("rough-turned");
  await expect(page.getByTestId("blank-tag-preview")).toContainText("Estimated ready to finish-turn");
  await page.getByTestId("blank-dry-state").selectOption("green");
  await expect(page.getByTestId("blank-tag-preview")).not.toContainText("Estimated ready to finish-turn");
});

test("batch tags: adding a row grows the preview, removing shrinks it", async ({ page }) => {
  await page.goto("/batch-tags");
  const rowsBefore = await page.getByTestId("batch-row").count();
  await page.getByTestId("batch-add-row").click();
  await expect(page.getByTestId("batch-row")).toHaveCount(rowsBefore + 1);
  await page.getByTestId(`batch-remove-${rowsBefore}`).click();
  await expect(page.getByTestId("batch-row")).toHaveCount(rowsBefore);
});

test("batch tags: per-row species shows up in the corresponding preview card", async ({ page }) => {
  await page.goto("/batch-tags");
  await page.getByTestId("batch-species-0").fill("Shagbark Hickory");
  await expect(page.getByTestId("batch-preview")).toContainText("Shagbark Hickory");
});

test("drying log: default row count renders 12 empty rows", async ({ page }) => {
  await page.goto("/drying-log");
  await expect(page.getByTestId("log-preview").locator("tbody tr")).toHaveCount(12);
});

test("drying log: changing row count updates the printable table", async ({ page }) => {
  await page.goto("/drying-log");
  await page.getByTestId("log-row-count").selectOption("8");
  await expect(page.getByTestId("log-preview").locator("tbody tr")).toHaveCount(8);
});
