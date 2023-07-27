import AuthorizationPage from "./pages/AuthorizationPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MatchingTracks from "./pages/MatchingTracksPage.tsx";
import { User1Context, User2Context } from "./contexts/User.ts";
import { User } from "./services/spotify.ts";
import { useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthorizationPage></AuthorizationPage>,
  },
  {
    path: "/matching_tracks",
    element: <MatchingTracks></MatchingTracks>,
  },
]);

const App = (): JSX.Element => {
  const USER1 = "USER1";
  const USER2 = "USER2";

  const getUser = (user: string): User | null => {
    const u1 = localStorage.getItem(user);
    return u1 !== null ? JSON.parse(u1) : null;
  };

  const user1State = useState<User | null>(getUser(USER1) || null);
  const user2State = useState<User | null>(getUser(USER2) || null);

  return (
    <>
      <User1Context.Provider value={user1State}>
        <User2Context.Provider value={user2State}>
          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </User2Context.Provider>
      </User1Context.Provider>
    </>
  );
};

export default App;
