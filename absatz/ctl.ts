import {
  ContentState,
  convertToRaw,
  EditorState,
  RawDraftContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";

let htmlToDraft:any = null;
if (typeof window === 'object') {
  htmlToDraft = require('html-to-draftjs').default;
}

export type AbsatzStateAction =
  | { type: "editor"; value: EditorState }
  | { type: "content"; value: RawDraftContentState }
  | { type: "init"; value: string }
  | { type: "html"; value: string };

export class AbsatzState {
  html: string;
  editorState: EditorState;
  contentState: RawDraftContentState;

  constructor(data?: Partial<AbsatzState>) {
    this.html = data?.html ?? "";
    this.editorState = data?.editorState ?? EditorState.createEmpty();
    this.contentState =
      data?.contentState ?? AbsatzState.createEmptyContentState();
  }

  static createEmptyContentState(): RawDraftContentState {
    const contentState = ContentState.createFromBlockArray([]);
    return convertToRaw(contentState);
  }
  static htmlToEditor(value: string): EditorState {
    if (typeof value === "string") {
      const content = htmlToDraft(value);
      const contentState = ContentState.createFromBlockArray(
        content.contentBlocks,
        content.entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      return editorState;
    }
    return EditorState.createEmpty();
  }
  static paragraphSplit(contentState: RawDraftContentState): string[] {
    const paragraphs = contentState.blocks
      .map(
        (block): RawDraftContentState => ({
          blocks: [block],
          entityMap: contentState.entityMap,
        })
      )
      .map((content) => draftToHtml(content));
    return paragraphs;
  }

  static reducer(state: AbsatzState, action: AbsatzStateAction): AbsatzState {
    switch (action.type) {
      case "editor":
        return new AbsatzState({ ...state, editorState: action.value });
      case "content":
        return new AbsatzState({
          ...state,
          contentState: action.value,
          html: draftToHtml(action.value),
        });
      case "init":
        return action.value && state.html !== action.value
          ? new AbsatzState({
              ...state,
              editorState: AbsatzState.htmlToEditor(action.value),
              html: action.value,
            })
          : state;
      case "html":
        return { ...state, html: action.value };
      default:
        return state;
    }
  }
}
