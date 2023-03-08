import { Box, BoxProps, Toolbar } from "@mui/material";
import { useState } from "react";
import { useStore } from "../provider";
import { MainAppBar, UserButton } from "./components";
import { SignedMenu } from "./signed.menu";

export type MainContainerProps = Pick<BoxProps, "children"> & {
  dense?: boolean;
};

export const MainContainer = (props: MainContainerProps) => {
  const { store } = useStore();
  const [opens, setOpens] = useState<Record<string, HTMLElement | null>>({});

  return (
    <>
      <MainAppBar>
        <Toolbar>
          <Box flex={1} />
          {store.userloading ? (
            <UserButton.Loading />
          ) : store.user ? (
            <UserButton.Signed
              src={store.user.photoURL ?? undefined}
              onClick={({ currentTarget }) =>
                setOpens((s) => ({ ...s, signed: currentTarget }))
              }
            />
          ) : (
            <UserButton.Unsigned href={process.env.DISCORD_URI} />
          )}
        </Toolbar>
      </MainAppBar>
      <Box pt={props.dense ? 0 : 6} pb={6}>
        {props.children}
      </Box>
      <SignedMenu
        anchorEl={opens.signed}
        onClose={() => setOpens((s) => ({ ...s, signed: null }))}
      />
    </>
  );
};
