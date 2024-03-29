import { Box, BoxProps, styled } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { EditorState, RawDraftContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useStore } from "../provider";
import React, {
  startTransition,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { AbsatzState } from "./ctl";
import { toolbar } from "./toolbar";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import(`react-draft-wysiwyg`).then((mod) => mod.Editor),
  { ssr: false }
);

const Root = styled(Box, {
  shouldForwardProp: (prop) =>
    !["view", "variant", "noDense"].includes(String(prop)),
})<{
  view?: boolean;
  variant?: Variant;
  noDense?: boolean;
}>(({ theme, view, variant, noDense }) => ({
  color: theme.palette.text.primary,
  backgroundColor: view ? undefined : theme.palette.background.paper,
  "& a": {
    color: theme.palette.info.main,
  },
  "& .rdw-editor-toolbar": {
    backgroundColor: theme.palette.background.paper,
    color: "#333333",
    borderColor: theme.palette.divider,
    marginBottom: 0,
  },
  "& .DraftEditor-root": {
    height: "100%",
    overflow: "auto",
  },
  "& .rdw-editor-main, .public-DraftEditor-content": {
    ...theme.typography[variant || "body2"],
    border: view ? undefined : `solid 1px ${theme.palette.divider}`,
    borderTop: "none",
  },
  '& div[data-block="true"]': {
    overflow: "hidden",
  },
  "& .public-DraftStyleDefault-block": {
    paddingTop: 4,
    paddingBottom: 4,
    margin: noDense ? theme.spacing(0.5, 0) : 0,
    textAlign: "inherit",
  },
  "& .public-DraftEditorPlaceholder-inner": {
    paddingTop: 4,
    paddingBottom: 4,
    margin: noDense ? theme.spacing(0.5, 0) : 0,
  },
  "& .rdw-center-align-block": { textAlign: "center" },
  "& .rdw-left-align-block": { textAlign: "left" },
  "& .rdw-right-align-block": { textAlign: "right" },
}));

export type AbsatzProps = Pick<BoxProps, "id" | "sx"> & {
  ref?: (ref: object) => void;
  view?: boolean;
  variant?: Variant;
  value?: string;
  onChange?: (value: string) => void;
  onEnter?: (values: string[]) => void;
  autoFocus?: boolean;
  autoHideToolbar?: boolean;
  noDense?: boolean;
  componentProps?: {
    root?: Omit<BoxProps, "children" | "sx" | "id">;
    editor?: EditorProps;
  };
};

export const Absatz = React.memo((props: AbsatzProps) => {
  const { t } = useStore();
  const editorRef = useRef<any>();
  const [focus, setFocus] = useState<boolean>(false);
  const [state, dispatch] = useReducer(AbsatzState.reducer, new AbsatzState());
  const view: boolean = props.view
    ? true
    : props.autoHideToolbar
    ? !focus
    : false;

  useEffect(() => {
    if (props.value) {
      dispatch({ type: "init", value: props.value });
    }
  }, [props.value]);

  const handleFocus = useCallback(
    (value?: boolean) => {
      if (value) {
        setTimeout(() => {
          editorRef.current?.focus?.();
        }, 500);
      }
    },
    [editorRef]
  );
  const handleEditorStateChange = (value: EditorState) =>
    dispatch({ type: "editor", value });

  const handleContentStateChange = (value: RawDraftContentState) => {
    dispatch({ type: "content", value });
    startTransition(() => {
      dispatch({ type: "html", value: draftToHtml(value) });
      props.onChange?.(draftToHtml(value));
      const paragraphs = AbsatzState.paragraphSplit(value);
      if (paragraphs.length > 1) {
        props.onEnter?.(paragraphs);
      }
    });
  };

  useEffect(() => {
    handleFocus(props.autoFocus);
  }, [props.autoFocus, handleFocus]);

  return (
    <Root
      id={props.id}
      sx={props.sx}
      view={view}
      variant={props.variant}
      noDense={props.noDense}
      className="KuiAbsatz-root"
    >
      <Editor
        editorRef={(ref) => {
          editorRef.current = ref;
          props.ref?.(ref);
        }}
        toolbar={toolbar()}
        editorState={state.editorState}
        onEditorStateChange={handleEditorStateChange}
        onContentStateChange={handleContentStateChange}
        toolbarHidden={view}
        readOnly={props.view}
        placeholder={props.view ? undefined : t("TypeHere")}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        stripPastedStyles
        {...props.componentProps?.editor}
      />
    </Root>
  );
});

export default Absatz;
