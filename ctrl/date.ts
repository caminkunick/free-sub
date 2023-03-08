import { Timestamp } from "firebase/firestore";
import moment from "moment";

export type FSDateValue = Timestamp | Date | string | number | undefined;
export class FSDate {
  value: number;

  constructor(value?: FSDateValue) {
    this.value = this.init(value);
  }

  init(value?: FSDateValue): number {
    if (value instanceof Timestamp) {
      return value.toMillis();
    } else if (value instanceof Date) {
      return value.getTime();
    } else if (typeof value === "number") {
      return value;
    } else if (
      typeof value === "string" &&
      /(\d){4}-(\d){2}-(\d){2}T(\d){2}:(\d){2}:(\d){2}/.test(value)
    ) {
      return new Date(value).getTime();
    } else {
      return Date.now();
    }
  }

  toString(): string {
    return moment(this.value).format("YYYY-MM-DD HH:mm");
  }
}
