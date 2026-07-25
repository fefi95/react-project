import AuthorizationPage from "./pages/AuthorizationPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MatchingTracks from "./pages/MatchingTracksPage.tsx";
import { UsersContext } from "./contexts/User.ts";
import { User } from "./services/spotify.ts";
import { useState } from "react";
import Layout from "./Layout.tsx";

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
  const USER1 = "USER1";
  const USER2 = "USER2";

  const getUser = (user: string): User | null => {
    const u1 = localStorage.getItem(user);
    return u1 !== null ? JSON.parse(u1) : null;
  };

  const user1S = useState<User | null>(getUser(USER1) || null);
  const user2S = useState<User | null>(getUser(USER2) || null);

  return (
    <>
      <UsersContext.Provider value={{ user1S, user2S }}>
        <RouterProvider router={router} />
      </UsersContext.Provider>
    </>
  );
};

export default App;
