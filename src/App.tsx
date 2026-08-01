import AuthorizationPage from "./pages/AuthorizationPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MatchingTracks from "./pages/MatchingTracksPage.tsx";
import { UsersContext } from "./contexts/User.ts";
import { type User } from "./services/spotify.ts";
import { useState } from "react";
import Layout from "./Layout.tsx";
import { getStoredUser, USER_KEYS } from "./services/storage.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <AuthorizationPage></AuthorizationPage>
      </Layout>
    ),
  },
  {
    path: "/matching_tracks",
    element: (
      <Layout>
        <MatchingTracks></MatchingTracks>
      </Layout>
    ),
  },
]);

const App = (): JSX.Element => {
  const user1S = useState<User | null>(getStoredUser(USER_KEYS.USER1));
  const user2S = useState<User | null>(getStoredUser(USER_KEYS.USER2));
  const token1S = useState<string | null>(null);
  const token2S = useState<string | null>(null);

  return (
    <>
      <UsersContext.Provider value={{ user1S, user2S, token1S, token2S }}>
        <RouterProvider router={router} />
      </UsersContext.Provider>
    </>
  );
};

export default App;
