import type { Pointer } from "bun:ffi";
import { JSCallback, CString, read } from "bun:ffi";
import { ApplicationFlags, Orientation, libGTK } from "./lib";

const gtk = libGTK.symbols;

type Ptr = Pointer | null;
type FFIObject = { pointer: Ptr };

export function toCString(str: string) {
  return Buffer.from(str + "\0", "utf-8");
}

function defaultSignalConnect(ptr: Ptr, id: string, callback: (obj: Ptr, data: Ptr) => void, data: Ptr) {
  gtk.g_signal_connect_data(ptr, toCString(id), new JSCallback((obj, data) => callback(obj, data), { args: ["ptr", "ptr"] }).ptr, data, null, 0);
}

function readStringArray(array: Ptr): string[] {
  if (array == null) return [];
  const arr: string[] = [];
  let offset = 0;
  while (true) {
    const calculatedOffset = offset * BigInt64Array.BYTES_PER_ELEMENT;
    const pointer = read.ptr(array, calculatedOffset) as Pointer;
    const str = new CString(pointer);
    if (str.length === 0) break;
    arr.push(str.toString());
    offset++;
  }
  return arr;
}

export class GObject implements FFIObject {
  readonly pointer: Ptr;
  constructor(ptr: Ptr) {
    this.pointer = ptr;
  }
  signalConnect(detailedSignal: string, callback: (obj: Ptr, data: Ptr) => void, data: Ptr) {
    defaultSignalConnect(this.pointer, detailedSignal, callback, data)
  }
}

export class CssProvider extends GObject {
  constructor() {
    super(gtk.gtk_css_provider_new());
  }
  loadFromPath(path: string) { gtk.gtk_css_provider_load_from_path(this.pointer, toCString(path)) };
  load(from: string | ArrayBuffer) {
    if (typeof from === "string") return gtk.gtk_css_provider_load_from_string(this.pointer, toCString(from));
    gtk.gtk_css_provider_load_from_bytes(this.pointer, new Uint8Array(from));
  };
}

export class Application extends GObject {
  constructor(applicationID: string, flags: ApplicationFlags);
  constructor(applicationID: string, flags: ApplicationFlags, ptr: Ptr);
  constructor(applicationID: string, flags: ApplicationFlags, ptr: Ptr = null) {
    super(ptr != null ? ptr : gtk.gtk_application_new(toCString(applicationID), flags));
  }
  addWindow(window: Window) { gtk.gtk_application_add_window(this.pointer, window.pointer) };
  removeWindow(window: Window) { gtk.gtk_application_remove_window(this.pointer, window.pointer) };
  run() { return gtk.g_application_run(this.pointer, 0, null) };
  getApplicationId() { return gtk.g_application_get_application_id(this.pointer).toString() };
}

export class Widget extends GObject {
  constructor(ptr: Ptr) {
    super(ptr);
  }
  addCssClass(cssClass: string) { gtk.gtk_widget_add_css_class(this.pointer, toCString(cssClass)) };
  hasCssClass(cssClass: string) { return gtk.gtk_widget_has_css_class(this.pointer, toCString(cssClass)) };
  removeCssClass(cssClass: string) { gtk.gtk_widget_remove_css_class(this.pointer, toCString(cssClass)) };
  getCssClasses() { return readStringArray(gtk.gtk_widget_get_css_classes(this.pointer)) };
  setVExpand(flag: boolean) { gtk.gtk_widget_set_vexpand(this.pointer, flag) };
  setHExpand(flag: boolean) { gtk.gtk_widget_set_hexpand(this.pointer, flag) };
}

export class Window extends Widget {
  close() { gtk.gtk_window_close(this.pointer) };
  setTitle(title: string) { gtk.gtk_window_set_title(this.pointer, toCString(title)) };
  setDefaultSize(width: number, height: number) { gtk.gtk_window_set_default_size(this.pointer, width, height) };
  setChild(child: Widget) { gtk.gtk_window_set_child(this.pointer, child.pointer) };
  getChild() { return new Widget(gtk.gtk_window_get_child(this.pointer)) };
  destroy() { gtk.gtk_window_destroy(this.pointer) };
  getApplication() { return new Application("", ApplicationFlags.G_APPLICATION_FLAGS_NONE, gtk.gtk_window_get_application(this.pointer)) };
  present() { gtk.gtk_window_present(this.pointer) }
}

export class ApplicationWindow extends Window {
  constructor(application: Application) {
    super(gtk.gtk_application_window_new(application.pointer));
  }
  getId() { return gtk.gtk_application_window_get_id(this.pointer) };
}

export class Box extends Widget {
  constructor(orientation: Orientation);
  constructor(orientation: Orientation, spacing: number);
  constructor(orientation: Orientation, spacing: number = 0) {
    super(gtk.gtk_box_new(orientation, spacing));
  }
  append(widget: Widget): void { gtk.gtk_box_append(this.pointer, widget.pointer) };
  prepend(widget: Widget) { gtk.gtk_box_prepend(this.pointer, widget.pointer) };
  remove(widget: Widget) { gtk.gtk_box_remove(this.pointer, widget.pointer) };
  setHomogeneous(bool: boolean) { gtk.gtk_box_set_homogeneous(this.pointer, bool) };
  insertChildAfter(child: Widget, sibling: Widget) { gtk.gtk_box_insert_child_after(this.pointer, child.pointer, sibling.pointer)  };
  getSpacing() { return gtk.gtk_box_get_spacing(this.pointer) };
}

export class Label extends Widget {
  constructor(text: string) {
    super(gtk.gtk_label_new(toCString(text)));
  }
  setMarkup(markup: string) { gtk.gtk_label_set_markup(this.pointer, toCString(markup)) };
}
