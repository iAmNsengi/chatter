import classes from "./Sidebar.module.css";
import { Button, Center } from "@mantine/core";
import { IconArrowsJoin, IconPlus } from "@tabler/icons-react";

const Sidebar = () => {
  return (
    <nav className={classes.navbar}>
      <Center>
        <Button
          variant="subtle"
          radius={100}
          className={classes.link}
          onClick={() => {}}
        >
          <IconPlus radius={100} />
        </Button>
        <Button variant="subtle" className={classes.link}>
          <IconArrowsJoin radius={100} />
        </Button>
      </Center>
    </nav>
  );
};

export default Sidebar;
