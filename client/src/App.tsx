import "@mantine/core/styles.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { MantineProvider, Text } from "@mantine/core";

export default function App() {
  return (
    <MantineProvider>
      <Text fw={700}>Testing</Text>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </MantineProvider>
  );
}
