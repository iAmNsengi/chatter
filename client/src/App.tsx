import "@mantine/core/styles.css";

import { MantineProvider, Text } from "@mantine/core";

export default function App() {
  return (
    <MantineProvider>
      <Text fw={700}>Testing</Text>
    </MantineProvider>
  );
}
