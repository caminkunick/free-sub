import { Box, ListItem, styled, Typography } from "@mui/material";
import { ImageDisplay } from "../image.display";
import { FSButton } from "../fs.button";
import { FSAction } from "free-sub/fs.action";
import { FSImage } from "free-sub/ctrl/image";
import { useState } from "react";

const Root = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 8,
  "& .MuiButton-root": {
    flex: "1 0 80px",
  },
});

const Actions = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  flex: "1 0 160px",
  gap: 2,
});

export type FeatureEditorProps = {
  value?: FSImage | null;
  onChange?: (image: FSImage | null) => void;
};

export const FeatureEditor = (props: FeatureEditorProps) => {
  const [state, setState] = useState<{
    pc: boolean;
  }>({
    pc: true,
  });

  const handleTogglePC = () => setState((s) => ({ ...s, pc: !s.pc }));
  const handleRemove = () => props.value && props.onChange?.(null);

  return (
    <ListItem divider>
      <Root>
        <Typography variant="caption" color="textSecondary">
          Feature
        </Typography>
        <Actions>
          <FSAction.ToggleMobilePC pc={state.pc} onClick={handleTogglePC} />
          <FSAction.Position />
        </Actions>
        {props.value && (
          <ImageDisplay
            src={props.value?.url}
            pos={props.value.pos}
            aspectRatio={state.pc ? "4 / 1" : "1 / 1"}
          />
        )}
        <FSButton.ChangeImage />
        {props.value && <FSButton.Remove onClick={handleRemove} />}
      </Root>
    </ListItem>
  );
};
