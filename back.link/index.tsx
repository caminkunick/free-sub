import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, List, ListItem } from "@mui/material";
import { useStore } from "free-sub/provider";
import Link from "next/link";
import React from "react";

export interface BackLinkProps {
  to: string;
  target?: string;
  divider?: boolean;
}
export const BackLink = React.memo(({ divider, to, target }: BackLinkProps) => {
  const { t } = useStore();

  return (
    <List>
      <ListItem divider={Boolean(divider)}>
        <Button
          component={Link}
          href={to}
          startIcon={<FontAwesomeIcon icon={faChevronLeft} />}
          target={target || "_self"}
          color="neutral"
        >
          {t("Back")}
        </Button>
      </ListItem>
    </List>
  );
});
