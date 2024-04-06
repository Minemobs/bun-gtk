import { JSCallback } from "bun:ffi";
import type { Pointer } from "bun:ffi";
import { libGTK } from "./dist/lib";
import { Align, Orientation, toCString } from "./dist/utils";

const testCallback = new JSCallback(
  (app: Pointer, _) => {
    const gtk = libGTK.symbols;
    const window = gtk.gtk_application_window_new(app);
    gtk.gtk_window_set_title(window, toCString("Bun GTK"));
    gtk.gtk_window_set_default_size(window, 800, 450);

    const box = gtk.gtk_box_new(Orientation.GTK_ORIENTATION_VERTICAL);
    gtk.gtk_box_set_spacing(box, 30);
    gtk.gtk_widget_set_halign(box, Align.GTK_ALIGN_CENTER);
    gtk.gtk_widget_set_valign(box, Align.GTK_ALIGN_CENTER);

    gtk.gtk_window_set_child(window, box);
    const label = gtk.gtk_label_new(toCString("Hello World"));
    gtk.gtk_box_append(box, label);

    const button = gtk.gtk_button_new_with_label(toCString("Goodbye World"));
    gtk.gtk_box_append(box, button);

    gtk.gtk_window_present(window);
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
testCallback.close();
libGTK.close();

