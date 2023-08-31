import { RenderResult, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthorizationPage from "./AuthorizationPage";
import { vi } from "vitest";
import * as spotify from "../services/spotify";
import { UsersContext, type UserState } from "../contexts/User";

describe("AuthorizationPage", () => {
  const user1 = {
    id: "fake-id-1",
    token: "fake-token-1",
    photoUrl: "fake-photo-1",
    username: "hwilliams",
  };

  const user2 = {
    id: "fake-id-2",
    token: "fake-token-2",
    photoUrl: "fake-photo-2",
    username: "lhale",
  };

  const customRender = (
    ui: React.ReactElement,
    user1S: UserState = [null, () => null],
    user2S: UserState = [null, () => null],
  ): RenderResult => {
    return render(
      <UsersContext.Provider value={{ user1S, user2S }}>
        {ui}
      </UsersContext.Provider>,
    );
  };

  describe("when the users are not authenticated", () => {
    it("loads the buttons to get the user's authentication", () => {
      render(<AuthorizationPage></AuthorizationPage>);

      expect(screen.getByRole("heading")).toHaveTextContent(
        "Log in to Spotify",
      );
      expect(screen.getByRole("button", { name: /user 1/i })).toBeDefined();
      expect(screen.getByRole("button", { name: /user 2/i })).toBeDefined();
    });
  });

  describe("when one of the users is authenticated", () => {
    it("shows one of the profiles and one authorization button", async () => {
      vi.spyOn(spotify, "getProfile").mockResolvedValue(user1);
      customRender(<AuthorizationPage></AuthorizationPage>, [user1, () => {}]);

      await waitFor(() => {
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
          "Log in to Spotify",
        );
        expect(
          screen.getByRole("heading", { level: 2, name: user1.username }),
        ).toBeDefined();
        expect(screen.getByRole("button", { name: /user 2/i })).toBeDefined();
      });
    });
  });

  describe("when both users are authenticated", () => {
    it("shows both users", async () => {
      vi.spyOn(spotify, "getProfile").mockResolvedValue(user1);
      customRender(
        <AuthorizationPage></AuthorizationPage>,
        [user1, () => {}],
        [user2, () => {}],
      );

      await waitFor(() => {
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
          "Log in to Spotify",
        );
        expect(
          screen.getByRole("heading", { level: 2, name: user1.username }),
        ).toBeDefined();
        expect(
          screen.getByRole("heading", { level: 2, name: user2.username }),
        ).toBeDefined();
      });
    });
  });
});
