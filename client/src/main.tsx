import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import CreateServerModal from "./components/modals/CreateServerModal.tsx";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient.ts";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children} </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ApolloProvider client={client}>
        <MantineProvider>
          <ProtectedRoute>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<RootLayout />}>
                  <Route
                    index
                    element={
                      <>
                        <CreateServerModal />
                        <HomePage />
                      </>
                    }
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </ProtectedRoute>
        </MantineProvider>
      </ApolloProvider>
    </ClerkProvider>
  </React.StrictMode>
);
