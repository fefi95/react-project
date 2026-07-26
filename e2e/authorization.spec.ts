import { test, expect } from "@playwright/test";
import { mockUser1, mockUser2 } from "./fixtures";

test.describe("Authorization Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });
  });

  test("shows the page heading", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Log in to Spotify" }),
    ).toBeVisible();
  });

  test("shows grant permissions buttons for both users when no one is logged in", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: "Grant permissions for user 1" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Grant permissions for user 2" }),
    ).toBeVisible();
  });

  test("does not show the matching tracks link when no users are logged in", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: "Check matching tracks" }),
    ).not.toBeVisible();
  });

  test("shows user 1 profile and still shows user 2 login when only user 1 is logged in", async ({
    page,
  }) => {
    await page.addInitScript((user) => {
      localStorage.setItem("USER1", JSON.stringify(user));
    }, mockUser1);

    await page.goto("/");

    await expect(page.getByRole("heading", { name: mockUser1.username })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Grant permissions for user 2" }),
    ).toBeVisible();
  });

  test("does not show the matching tracks link when only one user is logged in", async ({
    page,
  }) => {
    await page.addInitScript((user) => {
      localStorage.setItem("USER1", JSON.stringify(user));
    }, mockUser1);

    await page.goto("/");

    await expect(
      page.getByRole("link", { name: "Check matching tracks" }),
    ).not.toBeVisible();
  });

  test("shows both profiles when both users are logged in", async ({ page }) => {
    await page.addInitScript(
      ({ u1, u2 }) => {
        localStorage.setItem("USER1", JSON.stringify(u1));
        localStorage.setItem("USER2", JSON.stringify(u2));
      },
      { u1: mockUser1, u2: mockUser2 },
    );

    await page.goto("/");

    await expect(page.getByRole("heading", { name: mockUser1.username })).toBeVisible();
    await expect(page.getByRole("heading", { name: mockUser2.username })).toBeVisible();
  });

  test("shows the matching tracks link when both users are logged in", async ({
    page,
  }) => {
    await page.addInitScript(
      ({ u1, u2 }) => {
        localStorage.setItem("USER1", JSON.stringify(u1));
        localStorage.setItem("USER2", JSON.stringify(u2));
      },
      { u1: mockUser1, u2: mockUser2 },
    );

    await page.goto("/");

    await expect(
      page.getByRole("link", { name: "Check matching tracks" }),
    ).toBeVisible();
  });

  test("grant permissions buttons link to Spotify authorization", async ({
    page,
  }) => {
    await page.goto("/");
    const user1Link = page.getByRole("link").filter({
      has: page.getByRole("button", { name: "Grant permissions for user 1" }),
    });
    const href = await user1Link.getAttribute("href");
    expect(href).toContain("accounts.spotify.com/authorize");
    expect(href).toContain("response_type=token");
  });

  test("navigates to matching tracks page when link is clicked", async ({
    page,
  }) => {
    await page.addInitScript(
      ({ u1, u2 }) => {
        localStorage.setItem("USER1", JSON.stringify(u1));
        localStorage.setItem("USER2", JSON.stringify(u2));
      },
      { u1: mockUser1, u2: mockUser2 },
    );

    await page.goto("/");
    await page.route("**/v1/me/top/tracks**", async (route) => {
      await route.fulfill({
        json: { items: [], next: null, previous: null },
      });
    });

    await page.getByRole("link", { name: "Check matching tracks" }).click();
    await expect(page).toHaveURL(/\/matching_tracks/);
  });
});
