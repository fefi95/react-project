import { test, expect, type Page, type Route } from "@playwright/test";
import {
  mockUser1,
  mockUser2,
  mockUser1Tracks,
  mockUser2Tracks,
  mockTracks,
} from "./fixtures";

const setupUsers = async (page: Page) => {
  await page.addInitScript(
    ({ u1, u2 }: { u1: typeof mockUser1; u2: typeof mockUser2 }) => {
      localStorage.setItem("USER1", JSON.stringify(u1));
      localStorage.setItem("USER2", JSON.stringify(u2));
    },
    { u1: mockUser1, u2: mockUser2 },
  );
};

const mockTopTracks = async (
  page: Page,
  token1Tracks: typeof mockUser1Tracks,
  token2Tracks: typeof mockUser2Tracks,
) => {
  await page.route("**/v1/me/top/tracks**", async (route: Route) => {
    const request = route.request();
    const authHeader: string = request.headers()["authorization"] ?? "";
    const token = authHeader.replace("Bearer ", "");

    const tracks = token === mockUser1.token ? token1Tracks : token2Tracks;

    await route.fulfill({
      json: { items: tracks, next: null, previous: null },
    });
  });
};

test.describe("Matching Tracks Page", () => {
  test("redirects to home when no users are logged in", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });
    await page.goto("/matching_tracks");
    await expect(page).toHaveURL("/");
  });

  test("redirects to home when only user 1 is logged in", async ({ page }) => {
    await page.addInitScript((user: typeof mockUser1) => {
      localStorage.setItem("USER1", JSON.stringify(user));
    }, mockUser1);

    await page.goto("/matching_tracks");
    await expect(page).toHaveURL("/");
  });

  test("shows compatibility heading with both usernames", async ({ page }) => {
    await setupUsers(page);
    await mockTopTracks(page, mockUser1Tracks, mockUser2Tracks);

    await page.goto("/matching_tracks");

    await expect(
      page.getByRole("heading", {
        name: `Compatibility between ${mockUser1.username} and ${mockUser2.username}`,
      }),
    ).toBeVisible();
  });

  test("shows compatibility progress indicator", async ({ page }) => {
    await setupUsers(page);
    await mockTopTracks(page, mockUser1Tracks, mockUser2Tracks);

    await page.goto("/matching_tracks");

    // CircularProgress renders an svg role="progressbar"
    await expect(page.getByRole("progressbar")).toBeVisible();
  });

  test("shows compatibility percentage when tracks are loaded", async ({
    page,
  }) => {
    await setupUsers(page);
    await mockTopTracks(page, mockUser1Tracks, mockUser2Tracks);

    await page.goto("/matching_tracks");

    // 3 matching tracks out of 4 user1 tracks = 75%
    await expect(page.getByText("75%")).toBeVisible();
  });

  test("shows an indeterminate progress when tracks are still loading", async ({
    page,
  }) => {
    await setupUsers(page);

    // Delay response to observe loading state
    await page.route("**/v1/me/top/tracks**", async (route: Route) => {
      await new Promise((r) => setTimeout(r, 2000));
      await route.fulfill({
        json: { items: [], next: null, previous: null },
      });
    });

    await page.goto("/matching_tracks");

    // When stats is NaN (no tracks yet), the progress bar should be indeterminate
    // Chakra UI sets aria-valuenow only when not indeterminate
    const progressBar = page.getByRole("progressbar");
    await expect(progressBar).toBeVisible();
    await expect(progressBar).not.toHaveAttribute("aria-valuenow");
  });

  test("shows the button to reveal matching tracks", async ({ page }) => {
    await setupUsers(page);
    await mockTopTracks(page, mockUser1Tracks, mockUser2Tracks);

    await page.goto("/matching_tracks");

    await expect(
      page.getByRole("button", { name: "See the top matching tracks!" }),
    ).toBeVisible();
  });

  test("matching tracks list is hidden initially", async ({ page }) => {
    await setupUsers(page);
    await mockTopTracks(page, mockUser1Tracks, mockUser2Tracks);

    await page.goto("/matching_tracks");

    // The list is rendered with hidden attribute initially
    const list = page.getByRole("list");
    await expect(list).toBeHidden();
  });

  test("reveals matching tracks when button is clicked", async ({ page }) => {
    await setupUsers(page);
    await mockTopTracks(page, mockUser1Tracks, mockUser2Tracks);

    await page.goto("/matching_tracks");

    // Wait for % to confirm tracks loaded
    await expect(page.getByText("75%")).toBeVisible();

    await page
      .getByRole("button", { name: "See the top matching tracks!" })
      .click();

    const list = page.getByRole("list");
    await expect(list).toBeVisible();
  });

  test("hides the button after it is clicked", async ({ page }) => {
    await setupUsers(page);
    await mockTopTracks(page, mockUser1Tracks, mockUser2Tracks);

    await page.goto("/matching_tracks");

    await expect(page.getByText("75%")).toBeVisible();

    const button = page.getByRole("button", {
      name: "See the top matching tracks!",
    });
    await button.click();

    await expect(button).toBeHidden();
  });

  test("shows up to 5 matching tracks as embedded players", async ({
    page,
  }) => {
    await setupUsers(page);

    // Build 6 matching tracks to verify the cap of 5
    const manyMatchingTracks = [1, 2, 3, 4, 5, 6].map((n) => ({
      id: `shared_track_${n}`,
      name: `Shared Song ${n}`,
      artists: [{ id: `a${n}`, name: `Artist ${n}` }],
      preview_url: null,
      href: `https://api.spotify.com/v1/tracks/shared_track_${n}`,
    }));

    await page.route("**/v1/me/top/tracks**", async (route: Route) => {
      await route.fulfill({
        json: { items: manyMatchingTracks, next: null, previous: null },
      });
    });

    await page.goto("/matching_tracks");

    await expect(page.getByText("100%")).toBeVisible();

    await page
      .getByRole("button", { name: "See the top matching tracks!" })
      .click();

    const list = page.getByRole("list");
    await expect(list).toBeVisible();

    const listItems = list.getByRole("listitem");
    await expect(listItems).toHaveCount(5);
  });

  test("shows 0% compatibility when no tracks match", async ({ page }) => {
    await setupUsers(page);

    const user1Only = mockTracks.map((t) => ({ ...t, id: `u1_${t.id}` }));
    const user2Only = mockTracks.map((t) => ({ ...t, id: `u2_${t.id}` }));

    await page.route("**/v1/me/top/tracks**", async (route: Route) => {
      const authHeader: string =
        route.request().headers()["authorization"] ?? "";
      const token = authHeader.replace("Bearer ", "");

      await route.fulfill({
        json: {
          items: token === mockUser1.token ? user1Only : user2Only,
          next: null,
          previous: null,
        },
      });
    });

    await page.goto("/matching_tracks");

    await expect(page.getByText("0%")).toBeVisible();
  });
});
