import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faEdit,
  faPlusCircle,
  faTrash,
} from "@fortawesome/pro-regular-svg-icons";
import { ReactNode } from "react";

export type PopupValueType = "alert" | "confirm" | "prompt" | "remove";

export class PopupValue {
  title: ReactNode;
  text: ReactNode;
  icon: IconDefinition;
  type: PopupValueType;
  defaultValue: string | null;
  onConfirm: (value?: string) => void;

  constructor(data?: Partial<PopupValue>) {
    this.title = data?.title ?? "No Title";
    this.text = data?.text ?? "No Description";
    this.icon = data?.icon ?? faCheckCircle;
    this.type = data?.type ?? "alert";
    this.defaultValue = data?.defaultValue ?? null;
    this.onConfirm = data?.onConfirm ?? (() => {});
  }

  static create(
    name: string,
    onConfirm: (value?: string) => void,
    defaultValue?: string
  ): PopupValue {
    return new PopupValue({
      title: `Add ${name}`,
      text: "Title",
      icon: faPlusCircle,
      type: "prompt",
      defaultValue: defaultValue ?? null,
      onConfirm,
    });
  }

  static edit(name: string, onConfirm: (title?: string) => void): PopupValue {
    return new PopupValue({
      title: "Edit",
      text: "Title",
      icon: faEdit,
      type: "prompt",
      defaultValue: name,
      onConfirm,
    });
  }

  static remove(name: string, onConfirm: () => void): PopupValue {
    return new PopupValue({
      title: `Remove`,
      text: `Do you want to remove "${name}"?`,
      icon: faTrash,
      type: "remove",
      onConfirm,
    });
  }
}
