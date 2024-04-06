import { dlopen, ptr, read, JSCallback } from "bun:ffi";
import type { Pointer } from "bun:ffi";

const libGTK = dlopen("libgtk-4.so", {
  gtk_get_major_version: {
    returns: "uint32_t"
  },
  gtk_application_new: {
    args: ["cstring", "int"],
    returns: "ptr"
  },
  g_application_run: {
    returns: "int",
    args: ["ptr", "int", "ptr"]
  },
  gtk_application_window_new: {
    returns: "ptr",
    args: ["ptr"]
  },
  g_object_unref: {
    args: ["ptr"]
  },
  gtk_window_set_default_size: {
    args: ["ptr", "uint32_t", "uint32_t"]
  },
  gtk_window_present: {
    args: ["ptr"]
  },
  gtk_window_set_title: {
    args: ["ptr", "cstring"]
  },
  g_signal_connect_data: {
    args: ["ptr", "cstring", "callback", "ptr", "ptr", "int8_t"],
  },
});

// const toCString = (str: string) => new TextEncoder().encode(str + "\0");
const toCString = (str: string) => Buffer.from(str + "\0", "utf-8");

const testCallback = new JSCallback(
  (app: Pointer, _) => {
    const window = libGTK.symbols.gtk_application_window_new(app);
    libGTK.symbols.gtk_window_set_title(window, toCString("Bun GTK"));
    libGTK.symbols.gtk_window_set_default_size(window, 800, 450);
    libGTK.symbols.gtk_window_present(window);
  },
  {
    args: ["ptr", "ptr"]  
  }
);

// console.log(libGTK.symbols.gtk_get_major_version());
const app = libGTK.symbols.gtk_application_new(toCString("fr.minemobs.bun-gtk"), 0);
libGTK.symbols.g_signal_connect_data(app, toCString("activate"), testCallback.ptr, null, null, 0);
const status = libGTK.symbols.g_application_run(app, 0, null);
libGTK.symbols.g_object_unref(app);
libGTK.close();
