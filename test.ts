import "./builder.blp";
import { $ } from "bun";
import { JSCallback } from "bun:ffi";
import type { Pointer } from "bun:ffi";
import { libGTK } from "./dist/lib";
import { Align, Orientation, toCString } from "./dist/utils";

await $`blueprint-compiler compile builder.blp --output builder.ui`

const testCallback = new JSCallback(
  (app: Pointer, _) => {
    const gtk = libGTK.symbols;

    const builder = gtk.gtk_builder_new();
    gtk.gtk_builder_add_from_file(builder, toCString("builder.ui"), null);
    const window = gtk.gtk_builder_get_object(builder, toCString("window"));
    gtk.gtk_window_set_application(window, app);

    gtk.gtk_widget_set_visible(window, true);
    gtk.g_object_unref(builder);
  },
  {
    args: ["ptr", "ptr"]  
  }
);

const app = libGTK.symbols.gtk_application_new(toCString("fr.minemobs.bun-gtk"), 0);
libGTK.symbols.g_signal_connect_data(app, toCString("activate"), testCallback.ptr, null, null, 0);
const status = libGTK.symbols.g_application_run(app, 0, null);
libGTK.symbols.g_object_unref(app);

testCallback.close();
libGTK.close();
