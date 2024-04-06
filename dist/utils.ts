import { libGTK } from "./lib";

export const enum Orientation {
  GTK_ORIENTATION_HORIZONTAL,
  GTK_ORIENTATION_VERTICAL
}

export const enum Align {
  GTK_ALIGN_FILL,
  GTK_ALIGN_START,
  GTK_ALIGN_END,
  GTK_ALIGN_CENTER,
  GTK_ALIGN_BASELINE_FILL,
  GTK_ALIGN_BASELINE = 4,
  GTK_ALIGN_BASELINE_CENTER
}

export function toCString(str: string) {
    return Buffer.from(str + "\0", "utf-8");
}
