import {
  FormControl,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import { VisibilityValue } from "free-sub/visibility.tab";
import { useCallback } from "react";

const ListItemStyled = styled(ListItem)({
  paddingTop: 16,
});

export type VisibilityEditorProps = {
  value?: Exclude<VisibilityValue, "trash">;
  onChange?: (value: "public" | "private") => void;
};

const VisibilityList: Record<"label" | "value", string>[] = [
  { label: "Public", value: "public" },
  { label: "Private", value: "private" },
];

export const VisibilityEditor = (props: VisibilityEditorProps) => {
  const getValue = useCallback((): Exclude<VisibilityValue, "trash"> => {
    return props.value && ["public", "private"].includes(props.value)
      ? props.value
      : "private";
  }, [props.value]);

  const handleChange = ({
    target: { value },
  }: SelectChangeEvent<Exclude<VisibilityValue, "trash">>) =>
    props.onChange?.(
      ["public", "private"].includes(value)
        ? (value as Exclude<VisibilityValue, "trash">)
        : "private"
    );

  return (
    <ListItemStyled divider>
      <FormControl size="small" fullWidth>
        <InputLabel>Visibility</InputLabel>
        <Select label="Visibility" value={getValue()} onChange={handleChange}>
          {VisibilityList.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ListItemStyled>
  );
};
