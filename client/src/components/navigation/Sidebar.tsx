import { UserButton } from "@clerk/clerk-react";
import classes from "./Sidebar.module.css";
import { Button, Center } from "@mantine/core";
import { IconArrowsJoin, IconPlus } from "@tabler/icons-react";

const Sidebar = () => {
  return (
    <nav className={classes.navbar}>
      <UserButton />
      <Center>
        <Button
          variant="subtle"
          radius={100}
          className={classes.link}
          onClick={() => {}}
        >
          <IconPlus radius={100} />
        </Button>
      </Center>
      <Center>
        <Button variant="subtle" className={classes.link}>
          <IconArrowsJoin radius={100} />
        </Button>
      </Center>
    </nav>
  );
};

export default Sidebar;
