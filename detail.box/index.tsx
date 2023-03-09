import { Box, Stack, styled, Typography, TypographyProps } from "@mui/material";
import { ReactNode } from "react";

const Root = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `solid 1px ${theme.palette.primary.main}`,
  boxSizing: "border-box",
  padding: theme.spacing(2.5, 3),
  borderRadius: theme.spacing(2),
}));
const Text = styled(Typography)({
  whiteSpace: "pre-wrap",
});

export type DetailBoxProps = {
  primary?: ReactNode;
  secondary?: ReactNode;
  primaryTypographyProps?: TypographyProps;
  secondaryTypographyProps?: TypographyProps;
};
export const DetailBox = (props: DetailBoxProps) => {
  return (
    <Root>
      <Stack spacing={1}>
      {props.primary && (
        <Text
          variant="caption"
          color="primary"
          {...props.primaryTypographyProps}
        >
          {props.primary}
        </Text>
      )}
      {props.secondary && (
        <Text variant="body1" {...props.secondaryTypographyProps}>
          {props.secondary}
        </Text>
      )}
      </Stack>
    </Root>
  );
};
