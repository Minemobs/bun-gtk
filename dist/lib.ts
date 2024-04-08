import { dlopen, suffix } from "bun:ffi";

export const libGTK = dlopen(`libgtk-4.${suffix}`, {
  gtk_get_major_version: {
    returns: "uint32_t"
  },
  gtk_application_new: {
    args: ["cstring", "int"] as const,
    returns: "ptr"
  },
  g_application_run: {
    returns: "int",
    args: ["ptr", "int", "ptr"] as const
  },
  gtk_application_window_new: {
    returns: "ptr",
    args: ["ptr"] as const
  },
  g_object_unref: {
    args: ["ptr"] as const
  },
  gtk_window_set_default_size: {
    args: ["ptr", "uint32_t", "uint32_t"] as const
  },
  gtk_window_present: {
    args: ["ptr"] as const
  },
  gtk_window_set_title: {
    args: ["ptr", "cstring"] as const
  },
  g_signal_connect_data: {
    args: ["ptr", "cstring", "callback", "ptr", "ptr", "int8_t"] as const,
  },
  gtk_box_new: {
    args: ["uint8_t", "uint32_t"] as const,
    returns: "ptr"
  },
  gtk_widget_set_halign: {
    args: ["ptr", "uint8_t"] as const
  },
  gtk_widget_set_valign: {
    args: ["ptr", "uint8_t"] as const
  },
  gtk_window_set_child: {
    args: ["ptr", "ptr"] as const
  },
  gtk_box_append: {
    args: ["ptr", "ptr"] as const
  },
  gtk_label_new: {
    args: ["cstring"] as const,
    returns: "ptr"
  },
  gtk_button_new_with_label: {
    args: ["cstring"] as const,
    returns: "ptr"
  },
  gtk_box_set_spacing: {
    args: ["ptr", "int8_t"] as const
  },
  gtk_builder_new: {
    returns: "ptr"
  },
  gtk_builder_add_from_file: {
    args: ["ptr", "cstring", "ptr"] as const
  },
  gtk_builder_get_object: {
    args: ["ptr", "cstring"] as const,
    returns: "ptr"
  },
  gtk_window_set_application: {
    args: ["ptr", "ptr"] as const
  },
  gtk_widget_set_visible: {
    args: ["ptr", "bool"] as const
  },
  gtk_flow_box_append: {
    args: ["ptr", "ptr"] as const
  },
  gtk_widget_set_hexpand: {
    args: ["ptr", "bool"] as const
  },
  gtk_widget_set_vexpand: {
    args: ["ptr", "bool"] as const
  },
  gtk_picture_new_for_filename: {
    args: ["cstring"] as const,
    returns: "ptr"
  },
  gtk_picture_set_content_fit: {
    args: ["ptr", "uint8_t"] as const
  },
  gdk_texture_new_from_bytes: {
    args: ["ptr", "ptr"] as const,
    returns: "ptr"
  },
  gtk_picture_new_for_paintable: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  g_bytes_new: {
    args: ["ptr", "usize"] as const,
    returns: "ptr"
  }
});
