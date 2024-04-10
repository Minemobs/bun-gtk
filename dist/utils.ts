import type { Pointer } from "bun:ffi";
import { JSCallback, ptr, CString, read } from "bun:ffi";
import { ApplicationFlags, Orientation, libGTK } from "./lib";

const gtk = libGTK.symbols;

type Ptr = Pointer | null;
type FFIObject = { pointer: Ptr };
type UnExtends<T, Z = Widget> = Omit<T, keyof Z> & FFIObject;

function readStringArray(array: Pointer | null): string[] {
  if(array == null) return [];
  const arr: string[] = [];
  let offset = 0;
  while(true) {
    const calculatedOffset = offset * BigInt64Array.BYTES_PER_ELEMENT;
    const pointer = read.ptr(array, calculatedOffset) as Pointer;
    const str = new CString(pointer);
    if(str.length === 0) break;
    arr.push(str.toString());
    offset++;
  }
  return arr;
}

export interface GObject extends FFIObject {
  signalConnect(detailedSignal: string, callback: (obj: Ptr, data: Ptr) => void, data: Ptr): void;
  // signalConnectData<T>(detailedSignal: string, callback: (obj: GObject, data: T) => void, data: T, destroyData: null, connectFlags: number): void;
}

export interface Application extends GObject {
  addWindow(window: Window): void;
  removeWindow(window: Window): void;
  run(): number;
  getApplicationId(): string;
}

export interface Window extends Widget {
  setTitle(title: string): void;
  setDefaultSize(width: number, height: number): void;
  present(): void;
  close(): void;
  destroy(): void;
  getApplication(): Application;
  getChild(): Widget;
  setChild(child: Widget): void;
}

export interface ApplicationWindow extends Window {
  getId(): number;
}

export interface Widget extends GObject {
  setVExpand(expand: boolean): void;
  setHExpand(expand: boolean): void;
  addCssClass(cssClass: string): void;
  hasCssClass(cssClass: string): boolean;
  getCssClasses(): string[];
  removeCssClass(cssClass: string): void;
}

export interface Box extends Widget {
  append(child: Widget): void;
  prepend(child: Widget): void;
  remove(child: Widget): void;
  setHomogeneous(homogeneous: boolean): void;
  insertChildAfter(child: Widget, sibling: Widget): void;
  getSpacing(): number;
};

export interface CssProvider extends GObject {
  load(from: string | ArrayBuffer): void;
  loadFromPath(path: string): void;
}

export interface Label extends Widget {
  setMarkup(markup: string): void;
}

function defaultSignalConnect(ptr: Ptr, id: string, callback: (obj: Ptr, data: Ptr) => void, data: Ptr) {
  gtk.g_signal_connect_data(ptr, toCString(id), new JSCallback((obj, data) => callback(obj, data), { args: ["ptr", "ptr"] }).ptr, data, null, 0);
}

export function newCssProvider(): CssProvider {
  return {
    signalConnect(id, callback, data) { return defaultSignalConnect(this.pointer, id, callback, data) },
    pointer: gtk.gtk_css_provider_new(),
    loadFromPath(path) { gtk.gtk_css_provider_load_from_path(this.pointer, toCString(path)) },
    load(from) {
      if(typeof from === "string") return gtk.gtk_css_provider_load_from_string(this.pointer, toCString(from));
      gtk.gtk_css_provider_load_from_bytes(this.pointer, new Uint8Array(from));
    },
  }
}

function newWidget(pointer: Ptr): Widget {
  return {
    pointer,
    addCssClass(cssClass) { gtk.gtk_widget_add_css_class(this.pointer, toCString(cssClass)) },
    hasCssClass(cssClass) { return gtk.gtk_widget_has_css_class(this.pointer, toCString(cssClass)) },
    removeCssClass(cssClass) { gtk.gtk_widget_remove_css_class(this.pointer, toCString(cssClass)) },
    getCssClasses() { return readStringArray(gtk.gtk_widget_get_css_classes(this.pointer)) },
    //TODO: Add support for data param
    signalConnect(id, callback, data) { return defaultSignalConnect(this.pointer, id, callback, data) },
    setVExpand(b) { gtk.gtk_widget_set_vexpand(this.pointer, b) },
    setHExpand(b) { gtk.gtk_widget_set_hexpand(this.pointer, b) },
  }
}

function setWidgetProperties<T extends Widget>(extendedWidget: UnExtends<T>, widget: Widget) {
  Object.keys(widget).forEach(it => (extendedWidget as Record<string, unknown>)[it] = widget[it as keyof typeof widget]);  
}

export function newLabel(text: string): Label {
  const label: UnExtends<Label> = {
    pointer: gtk.gtk_label_new(toCString(text)),
    setMarkup(markup) { gtk.gtk_label_set_markup(this.pointer, toCString(markup)) },
  };
  setWidgetProperties(label, newWidget(label.pointer));
  return label as Label;
}

function newApplicationFromPointer(app: Ptr) {
  return newApplication(gtk.g_application_get_application_id(app).toString(), gtk.g_application_get_flags(app) as ApplicationFlags, app);
}

export function newApplication(applicationID: string, flags: ApplicationFlags, ptr: Ptr = null): Application {
  return {
    signalConnect(id, callback, data) { return defaultSignalConnect(this.pointer, id, callback, data) },
    pointer: ptr === null ? gtk.gtk_application_new(toCString(applicationID), flags) : ptr,
    addWindow(window: Window) { gtk.gtk_application_add_window(this.pointer, window.pointer) },
    removeWindow(window: Window) { gtk.gtk_application_remove_window(this.pointer, window.pointer) },
    run() { return gtk.g_application_run(this.pointer, 0, null) },
    getApplicationId() { return gtk.g_application_get_application_id(this.pointer).toString() }
  };
}

export function newWindow(): Window {
  const window: UnExtends<Window> = {
    pointer: gtk.gtk_window_new(),
    close() { gtk.gtk_window_close(this.pointer)  },
    setTitle(title) { gtk.gtk_window_set_title(this.pointer, toCString(title))  },
    setDefaultSize(w, h) { gtk.gtk_window_set_default_size(this.pointer, w, h)  },
    setChild(child) { gtk.gtk_window_set_child(this.pointer, child.pointer)  },
    getChild() { return newWidget(gtk.gtk_window_get_child(this.pointer))  },
    destroy() { gtk.gtk_window_destroy(this.pointer) },
    getApplication() { return newApplicationFromPointer(gtk.gtk_window_get_application(this.pointer)) },
    present() { gtk.gtk_window_present(this.pointer) }
  };
  setWidgetProperties(window, newWidget(window.pointer));
  return window as Window;
}

export function newApplicationWindow(application: Application): ApplicationWindow {
  const appWindow: UnExtends<UnExtends<ApplicationWindow>, Window> = {
    pointer: gtk.gtk_application_window_new(application.pointer),
    getId() { return gtk.gtk_application_window_get_id(this.pointer) },
  }
  setWidgetProperties(appWindow, newWindow());
  return appWindow as ApplicationWindow;
}

export function newBox(orientation: Orientation, spacing: number = 0): Box {
  const pointer = gtk.gtk_box_new(orientation, spacing);
  const widget = newWidget(pointer);
  const box: UnExtends<Box> = {
    pointer,
    append(widget: Widget) { gtk.gtk_box_append(this.pointer, widget.pointer) },
    prepend(widget: Widget) { gtk.gtk_box_prepend(this.pointer, widget.pointer) },
    remove(widget: Widget) { gtk.gtk_box_remove(this.pointer, widget.pointer) },
    setHomogeneous(bool: boolean) { gtk.gtk_box_set_homogeneous(this.pointer, bool) },
    insertChildAfter(child: Widget, sibling: Widget) { gtk.gtk_box_insert_child_after(this.pointer, child.pointer, sibling.pointer)  },
    getSpacing() { return gtk.gtk_box_get_spacing(this.pointer) },
  };
  setWidgetProperties(box, widget);
  return box as Box;
}

export function toCString(str: string) {
  return Buffer.from(str + "\0", "utf-8");
}
