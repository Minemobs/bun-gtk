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
  },
  gtk_css_provider_new: {
    returns: "ptr"
  },
  gtk_css_provider_load_from_bytes: {
    args: ["ptr", "ptr"] as const
  },
  gtk_css_provider_load_from_string: {
    args: ["ptr", "cstring"] as const
  },
  gdk_display_get_default: {
    returns: "ptr"
  },
  gtk_style_context_add_provider_for_display: {
    args: ["ptr", "ptr", "uint32_t"] as const
  },
  gtk_widget_add_css_class: {
    args: ["ptr", "cstring"] as const
  },
  gtk_widget_remove_css_class: {
    args: ["ptr", "cstring"] as const
  },
  gtk_widget_get_css_classes: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_aspect_frame_new: {
    args: ["f32", "f32", "f32", "bool"] as const,
    returns: "ptr"
  },
  gtk_aspect_frame_set_child: {
    args: ["ptr", "ptr"] as const
  },
  gtk_aspect_frame_get_child: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_aspect_frame_get_ratio: {
    args: ["ptr"] as const,
    returns: "f32"
  },
  gtk_aspect_frame_get_xalign: {
    args: ["ptr"] as const,
    returns: "f32"
  },
  gtk_aspect_frame_get_yalign: {
    args: ["ptr"] as const,
    returns: "f32"
  },
  gtk_aspect_frame_set_obey_child: {
    args: ["ptr", "bool"] as const,
    returns: "void"
  },
  gtk_aspect_frame_set_ratio: {
    args: ["ptr", "f32"] as const,
    returns: "void"
  },
  gtk_aspect_frame_get_obey_child: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_label_new_with_mnemonic: {
    args: ["cstring"] as const,
    returns: "ptr"
  },
  gtk_label_get_attributes: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_label_get_current_uri: {
    args: ["ptr"] as const,
    returns: "cstring"
  },
  gtk_label_get_ellipsize: {
    args: ["ptr"] as const,
    returns: "u32"
  },
  gtk_label_get_extra_menu: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_label_get_justify: {
    args: ["ptr"] as const,
    returns: "u32"
  },
  gtk_label_get_label: {
    args: ["ptr"] as const,
    returns: "cstring"
  },
  gtk_label_get_layout: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_label_get_layout_offsets: {
    args: ["ptr", "ptr", "ptr"] as const,
    returns: "u32"
  },
  gtk_label_get_lines: {
    args: ["ptr"] as const,
    returns: "u32"
  },
  gtk_label_get_max_width_chars: {
    args: ["ptr"] as const,
    returns: "u32"
  },
  gtk_label_get_mnemonic_keyval: {
    args: ["ptr"] as const,
    returns: "u32"
  },
  gtk_label_get_mnemonic_widget: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_label_get_natural_wrap_mode: {
    args: ["ptr"] as const,
    returns: "u32"
  },
  gtk_label_get_selectable: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_label_get_selection_bounds: {
    args: ["ptr", "ptr", "ptr"] as const,
    returns: "bool"
  },
  gtk_label_get_single_line_mode: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_label_get_tabs: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_label_get_text: {
    args: ["ptr"] as const,
    returns: "cstring"
  },
  gtk_label_get_use_markup: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_label_get_use_underline: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_label_get_width_chars: {
    args: ["ptr"] as const,
    returns: "u32"
  },
  gtk_label_get_wrap: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_label_get_wrap_mode: {
    args: ["ptr"] as const,
    returns: "u32"
  },
  gtk_label_get_xalign: {
    args: ["ptr"] as const,
    returns: "f32"
  },
  gtk_label_get_yalign: {
    args: ["ptr"] as const,
    returns: "f32"
  },
  gtk_label_select_region: {
    args: ["ptr", "u32", "u32"] as const,
    returns: "u32"
  },
  gtk_label_set_attributes: {
    args: ["ptr", "ptr"] as const,
    returns: "u32"
  },
  gtk_label_set_ellipsize: {
    args: ["ptr", "u32"] as const,
    returns: "u32"
  },
  gtk_label_set_extra_menu: {
    args: ["ptr", "ptr"] as const,
    returns: "u32"
  },
  gtk_label_set_justify: {
    args: ["ptr", "u32"] as const,
    returns: "u32"
  },
  gtk_label_set_label: {
    args: ["ptr", "cstring"] as const,
    returns: "u32"
  },
  gtk_label_set_lines: {
    args: ["ptr", "u32"] as const,
    returns: "u32"
  },
  gtk_label_set_markup: {
    args: ["ptr", "cstring"] as const,
    returns: "u32"
  },
  gtk_label_set_markup_with_mnemonic: {
    args: ["ptr", "cstring"] as const,
    returns: "u32"
  },
  gtk_label_set_max_width_chars: {
    args: ["ptr", "u32"] as const,
    returns: "u32"
  },
  gtk_label_set_mnemonic_widget: {
    args: ["ptr", "ptr"] as const,
    returns: "u32"
  },
  gtk_label_set_natural_wrap_mode: {
    args: ["ptr", "u32"] as const,
    returns: "u32"
  },
  gtk_label_set_selectable: {
    args: ["ptr", "bool"] as const,
    returns: "u32"
  },
  gtk_label_set_single_line_mode: {
    args: ["ptr", "bool"] as const,
    returns: "u32"
  },
  gtk_label_set_tabs: {
    args: ["ptr", "ptr"] as const,
    returns: "u32"
  },
  gtk_label_set_text: {
    args: ["ptr", "cstring"] as const,
    returns: "u32"
  },
  gtk_label_set_text_with_mnemonic: {
    args: ["ptr", "cstring"] as const,
    returns: "u32"
  },
  gtk_label_set_use_markup: {
    args: ["ptr", "bool"] as const,
    returns: "u32"
  },
  gtk_label_set_use_underline: {
    args: ["ptr", "bool"] as const,
    returns: "u32"
  },
  gtk_label_set_width_chars: {
    args: ["ptr", "u32"] as const,
    returns: "u32"
  },
  gtk_label_set_wrap: {
    args: ["ptr", "bool"] as const,
    returns: "u32"
  },
  gtk_label_set_wrap_mode: {
    args: ["ptr", "u32"] as const,
    returns: "u32"
  },
  gtk_label_set_xalign: {
    args: ["ptr", "f32"] as const,
    returns: "u32"
  },
  gtk_label_set_yalign: {
    args: ["ptr", "f32"] as const,
    returns: "u32"
  },
  gtk_box_get_baseline_child: {
    args: ["ptr"] as const,
    returns: "u32"
  },
  gtk_box_get_baseline_position: {
    args: ["ptr"] as const,
    returns: "u32"
  },
  gtk_box_get_homogeneous: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_box_get_spacing: {
    args: ["ptr"] as const,
    returns: "u32"
  },
  gtk_box_insert_child_after: {
    args: ["ptr", "ptr", "ptr"] as const,
    returns: "void"
  },
  gtk_box_prepend: {
    args: ["ptr", "ptr"] as const,
    returns: "void"
  },
  gtk_box_remove: {
    args: ["ptr", "ptr"] as const,
    returns: "void"
  },
  gtk_box_reorder_child_after: {
    args: ["ptr", "ptr", "ptr"] as const,
    returns: "void"
  },
  gtk_box_set_baseline_child: {
    args: ["ptr", "u32"] as const,
    returns: "void"
  },
  gtk_box_set_baseline_position: {
    args: ["ptr", "u32"] as const,
    returns: "void"
  },
  gtk_box_set_homogeneous: {
    args: ["ptr", "bool"] as const,
    returns: "void"
  },
  gtk_application_add_window: {
    args: ["ptr", "ptr"] as const,
    returns: "void"
  },
  gtk_application_get_accels_for_action: {
    args: ["ptr", "cstring"] as const,
    returns: "ptr"
  },
  gtk_application_get_actions_for_accel: {
    args: ["ptr", "cstring"] as const,
    returns: "ptr"
  },
  gtk_application_get_active_window: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_application_get_menu_by_id: {
    args: ["ptr", "cstring"] as const,
    returns: "ptr"
  },
  gtk_application_get_menubar: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_application_get_window_by_id: {
    args: ["ptr", "u32"] as const,
    returns: "ptr"
  },
  gtk_application_get_windows: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_application_inhibit: {
    args: ["ptr", "ptr", "u32", "cstring"] as const,
    returns: "void"
  },
  gtk_application_list_action_descriptions: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_application_remove_window: {
    args: ["ptr", "ptr"] as const,
    returns: "void"
  },
  gtk_application_set_accels_for_action: {
    args: ["ptr", "cstring", "ptr"] as const,
    returns: "void"
  },
  gtk_application_set_menubar: {
    args: ["ptr", "ptr"] as const,
    returns: "void"
  },
  gtk_application_uninhibit: {
    args: ["ptr", "u32"] as const,
    returns: "void"
  },
  gtk_window_new: {
    args: [] as const,
    returns: "ptr"
  },
  gtk_window_close: {
    args: ["ptr"] as const,
    returns: "void"
  },
  gtk_window_destroy: {
    args: ["ptr"] as const,
    returns: "void"
  },
  gtk_window_fullscreen: {
    args: ["ptr"] as const,
    returns: "void"
  },
  gtk_window_fullscreen_on_monitor: {
    args: ["ptr", "ptr"] as const,
    returns: "u32"
  },
  gtk_window_get_application: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_window_get_child: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_window_get_decorated: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_window_get_default_size: {
    args: ["ptr", "ptr", "ptr"] as const,
    returns: "u32"
  },
  gtk_window_get_default_widget: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_window_get_deletable: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_window_get_destroy_with_parent: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_window_get_focus: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_window_get_focus_visible: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_window_get_group: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_window_get_handle_menubar_accel: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_window_get_hide_on_close: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_window_get_icon_name: {
    args: ["ptr"] as const,
    returns: "cstring"
  },
  gtk_window_get_mnemonics_visible: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_window_get_modal: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_window_get_resizable: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_window_get_title: {
    args: ["ptr"] as const,
    returns: "cstring"
  },
  gtk_window_get_titlebar: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_window_get_transient_for: {
    args: ["ptr"] as const,
    returns: "ptr"
  },
  gtk_window_has_group: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_window_is_active: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_window_is_fullscreen: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_window_is_maximized: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_window_is_suspended: {
    args: ["ptr"] as const,
    returns: "bool"
  },
  gtk_window_maximize: {
    args: ["ptr"] as const,
    returns: "void"
  },
  gtk_window_minimize: {
    args: ["ptr"] as const,
    returns: "void"
  },
  gtk_window_present_with_time: {
    args: ["ptr", "u32"] as const,
    returns: "void"
  },
  gtk_window_set_decorated: {
    args: ["ptr", "bool"] as const,
    returns: "void"
  },
  gtk_window_set_default_widget: {
    args: ["ptr", "ptr"] as const,
    returns: "void"
  },
  gtk_window_set_deletable: {
    args: ["ptr", "bool"] as const,
    returns: "void"
  },
  gtk_window_set_destroy_with_parent: {
    args: ["ptr", "bool"] as const,
    returns: "void"
  },
  gtk_window_set_display: {
    args: ["ptr", "ptr"] as const,
    returns: "void"
  },
  gtk_window_set_focus: {
    args: ["ptr", "ptr"] as const,
    returns: "void"
  },
  gtk_window_set_focus_visible: {
    args: ["ptr", "bool"] as const,
    returns: "void"
  },
  gtk_window_set_handle_menubar_accel: {
    args: ["ptr", "bool"] as const,
    returns: "void"
  },
  gtk_window_set_hide_on_close: {
    args: ["ptr", "bool"] as const,
    returns: "void"
  },
  gtk_window_set_icon_name: {
    args: ["ptr", "cstring"] as const,
    returns: "void"
  },
  gtk_window_set_mnemonics_visible: {
    args: ["ptr", "bool"] as const,
    returns: "void"
  },
  gtk_window_set_modal: {
    args: ["ptr", "bool"] as const,
    returns: "void"
  },
  gtk_window_set_resizable: {
    args: ["ptr", "bool"] as const,
    returns: "void"
  },
  gtk_window_set_startup_id: {
    args: ["ptr", "cstring"] as const,
    returns: "void"
  },
  gtk_window_set_titlebar: {
    args: ["ptr", "ptr"] as const,
    returns: "void"
  },
  gtk_window_set_transient_for: {
    args: ["ptr", "ptr"] as const,
    returns: "void"
  },
  gtk_window_unfullscreen: {
    args: ["ptr"] as const,
    returns: "void"
  },
  gtk_window_unmaximize: {
    args: ["ptr"] as const,
    returns: "void"
  },
  gtk_window_unminimize: {
    args: ["ptr"] as const,
    returns: "void"
  },
  g_application_get_application_id: {
    args: ["ptr"] as const,
    returns: "cstring"
  },
  g_application_get_flags: {
    args: ["ptr"] as const,
    returns: "u32",
  },
  gtk_application_window_get_id: {
    args: ["ptr"] as const,
    returns: "u32"
  }
});

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

export const enum ContentFit {
  GTK_CONTENT_FIT_FILL,
  GTK_CONTENT_FIT_CONTAIN,
  GTK_CONTENT_FIT_COVER,
  GTK_CONTENT_FIT_SCALE_DOWN,
}

export const enum EllipsizeMode {
  PANGO_ELLIPSIZE_NONE = 0,
  PANGO_ELLIPSIZE_START = 1,
  PANGO_ELLIPSIZE_MIDDLE = 2,
  PANGO_ELLIPSIZE_END = 3
}

export const enum NaturalWrapMode {
  GTK_NATURAL_WRAP_INHERIT = 0,
  GTK_NATURAL_WRAP_NONE = 1,
  GTK_NATURAL_WRAP_WORD = 2
}

export const enum Justification {
  GTK_JUSTIFY_LEFT = 0,
  GTK_JUSTIFY_RIGHT = 1,
  GTK_JUSTIFY_CENTER = 2,
  GTK_JUSTIFY_FILL = 3
}

export const enum ApplicationFlags {
  G_APPLICATION_FLAGS_NONE = 0,
  G_APPLICATION_DEFAULT_FLAGS = 0,
  G_APPLICATION_IS_SERVICE = 1,
  G_APPLICATION_IS_LAUNCHER = 2,
  G_APPLICATION_HANDLES_OPEN = 4,
  G_APPLICATION_HANDLES_COMMAND_LINE = 8,
  G_APPLICATION_SEND_ENVIRONMENT = 16,
  G_APPLICATION_NON_UNIQUE = 32,
  G_APPLICATION_CAN_OVERRIDE_APP_ID = 64,
  G_APPLICATION_ALLOW_REPLACEMENT = 128,
  G_APPLICATION_REPLACE = 256,
}

export const GTK_STYLE_PROVIDER_PRIORITY_FALLBACK = 1;
export const GTK_STYLE_PROVIDER_PRIORITY_THEME = 200;
export const GTK_STYLE_PROVIDER_PRIORITY_SETTINGS = 400;
export const GTK_STYLE_PROVIDER_PRIORITY_APPLICATION = 600;
export const GTK_STYLE_PROVIDER_PRIORITY_USER = 800;
