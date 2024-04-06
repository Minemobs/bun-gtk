import { dlopen, suffix } from "bun:ffi";

console.log(`libgtk-4.${suffix}`);

export const libGTK = dlopen(`libgtk-4.${suffix}`, {
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
  gtk_box_new: {
    args: ["uint8_t", "uint32_t"],
    returns: "ptr"
  },
  gtk_widget_set_halign: {
    args: ["ptr", "uint8_t"]
  },
  gtk_widget_set_valign: {
    args: ["ptr", "uint8_t"]
  },
  gtk_window_set_child: {
    args: ["ptr", "ptr"]
  },
  gtk_box_append: {
    args: ["ptr", "ptr"]
  },
  gtk_label_new: {
    args: ["cstring"],
    returns: "ptr"
  },
  gtk_button_new_with_label: {
    args: ["cstring"],
    returns: "ptr"
  },
  gtk_box_set_spacing: {
    args: ["ptr", "int8_t"]
  },
});
