import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { MainContainer } from "../main.container";

type RootProps = { icon: IconDefinition; label: string; back?: string };
const Root = (props: RootProps) => {
  return (
    <MainContainer>
      <Container maxWidth="xs">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography sx={{ color: "warning.main" }}>
            <FontAwesomeIcon size="6x" icon={props.icon} />
          </Typography>
          <Typography
            variant="h3"
            fontWeight={"bold"}
            sx={{ mt: 3 }}
            color="textSecondary"
          >
            {props.label}
          </Typography>
          <Button
            variant="outlined"
            size="large"
            color="warning"
            sx={{ mt: 3 }}
            startIcon={<FontAwesomeIcon icon={faChevronLeft} />}
            LinkComponent={Link}
            href={props.back ?? "/"}
          >
            Back
          </Button>
        </Box>
      </Container>
    </MainContainer>
  );
};

export const Restrict = {
  AccessDenied: (props: Partial<RootProps>) => (
    <Root icon={faUserSlash} label="Access Denied" {...props} />
  ),
};
