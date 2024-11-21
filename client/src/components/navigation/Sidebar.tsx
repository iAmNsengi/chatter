import { UserButton } from "@clerk/clerk-react";
import classes from "./Sidebar.module.css";
import { Button, Center, Stack, useMantineColorScheme } from "@mantine/core";
import {
  IconArrowsJoin,
  IconMoon,
  IconPlus,
  IconSun,
} from "@tabler/icons-react";
import useModal from "../../hooks/useModal";

const Sidebar = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const createServerModal = useModal("CreateServer");

  return (
    <nav className={classes.navbar}>
      <Center>
        <UserButton />
      </Center>
      <Center>
        <Button
          variant="subtle"
          radius={100}
          className={classes.link}
          onClick={createServerModal.openModal}
        >
          <IconPlus radius={100} />
        </Button>
      </Center>
      <Center>
        <Button
          variant="subtle"
          radius={100}
          className={classes.link}
          onClick={() => {}}
        >
          <IconArrowsJoin radius={100} />
        </Button>
      </Center>
      <Stack justify="center" align="center">
        <Button
          className={classes.link}
          variant="subtle"
          onClick={toggleColorScheme}
          radius={100}
        >
          {colorScheme === "dark" ? <IconMoon radius={100} /> : <IconSun />}
        </Button>
      </Stack>
    </nav>
  );
};

export default Sidebar;
