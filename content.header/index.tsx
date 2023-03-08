import {
  BoxProps,
  Breadcrumbs,
  Typography,
  Link as MLink,
  styled,
  Box,
} from "@mui/material";
import Link from "next/link";
import { ReactNode, useCallback } from "react";

const BreadcrumbsStyled = styled(Breadcrumbs)(({ theme }) => ({
  ...theme.typography.caption,
  marginBottom: theme.spacing(1),
}));

export type Breadcrumb = { label: string; to?: string };

export type ContentHeaderProps = Pick<BoxProps, "children"> & {
  label?: ReactNode;
  breadcrumbs?: Breadcrumb[];
  secondary?: ReactNode;
  actions?: ReactNode;
};

export const ContentHeader = (props: ContentHeaderProps) => {
  const EnhanceBreadcrumb = useCallback(
    (item: Breadcrumb, index: number) =>
      item.to ? (
        <MLink variant="inherit" component={Link} href={item.to} key={index}>
          {item.label}
        </MLink>
      ) : (
        <Typography variant="inherit" color="textSecondary" key={index}>
          {item.label}
        </Typography>
      ),
    []
  );

  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" flexDirection="column" flex={1}>
        {Array.isArray(props.breadcrumbs) && props.breadcrumbs.length && (
          <BreadcrumbsStyled>
            {props.breadcrumbs.map((item, index) =>
              EnhanceBreadcrumb(item, index)
            )}
          </BreadcrumbsStyled>
        )}
        <Typography variant="h4" fontWeight="bold">
          {props.label ?? props.children}
        </Typography>
        {props.secondary && (
          <Typography
            variant="caption"
            color="textSecondary"
            component="div"
            sx={{ mt: 1 }}
          >
            {props.secondary}
          </Typography>
        )}
      </Box>
      {props.actions && <Box>{props.actions}</Box>}
    </Box>
  );
};
