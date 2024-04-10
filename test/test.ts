import "./builder.blp";
import { JSCallback, ptr } from "bun:ffi";
import type { Pointer } from "bun:ffi";
import { libGTK, Align, GTK_STYLE_PROVIDER_PRIORITY_APPLICATION, Orientation } from "./dist/lib";
import { toCString } from "./dist/utils";

Bun.spawnSync({
  cmd: ["blueprint-compiler", "compile", "builder.blp", "--output", "builder.ui"],
});

const gtk = libGTK.symbols;

const mewtwo = await fetch("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png").then(it => it.arrayBuffer());

function addImage(flowbox: Pointer, imgIndexOrBuffer: number | typeof mewtwo) {
  // const image = gtk.gtk_label_new(toCString(codepoint));
  let image: ReturnType<typeof gtk.gtk_picture_new_for_filename>;
  if(Number.isInteger(imgIndexOrBuffer)) {
    image = gtk.gtk_picture_new_for_filename(toCString(`${import.meta.dir}/assets/${imgIndexOrBuffer as number}.png`))
  } else {
    const buff = imgIndexOrBuffer as ArrayBuffer;
    const bytes = gtk.g_bytes_new(ptr(buff), buff.byteLength);
    const texture = gtk.gdk_texture_new_from_bytes(bytes, null);
    image = gtk.gtk_picture_new_for_paintable(texture);
  }

  gtk.gtk_widget_set_hexpand(image, true);
  gtk.gtk_widget_set_vexpand(image, true);
  gtk.gtk_widget_add_css_class(image, toCString("pkmn-image"));

  const box = gtk.gtk_box_new(Orientation.GTK_ORIENTATION_VERTICAL, 0);
  if((typeof imgIndexOrBuffer === "number") && imgIndexOrBuffer < 4) {
    gtk.gtk_widget_add_css_class(box, toCString("grass-type"))
  }
  const label = gtk.gtk_label_new(toCString(`Pokemon ${Number.isInteger(imgIndexOrBuffer) ? `#${imgIndexOrBuffer}` : "Mewtwo"}`));

  gtk.gtk_box_append(box, image);
  gtk.gtk_box_append(box, label);
  const aspectFrame = gtk.gtk_aspect_frame_new(0.5, 0.5, 1, false);
  gtk.gtk_aspect_frame_set_child(aspectFrame, box);
  
  gtk.gtk_flow_box_append(flowbox, aspectFrame);
}

const startupCallback = new JSCallback((app: Pointer, _) => {
  const cssProvider = gtk.gtk_css_provider_new();
  gtk.gtk_css_provider_load_from_string(cssProvider, toCString("frame { min-width: 75px; } .grass-type { background-color: @green_5; border-radius: 10px; }"));
  const display = gtk.gdk_display_get_default();
  gtk.gtk_style_context_add_provider_for_display(display, cssProvider, GTK_STYLE_PROVIDER_PRIORITY_APPLICATION);
}, { args: ["ptr", "ptr"] });

const testCallback = new JSCallback(
  (app: Pointer, _) => {
    const builder = gtk.gtk_builder_new();
    gtk.gtk_builder_add_from_file(builder, toCString("builder.ui"), null);
    const window = gtk.gtk_builder_get_object(builder, toCString("window"));
    gtk.gtk_window_set_application(window, app);

    const flowbox = gtk.gtk_builder_get_object(builder, toCString("flowbox"));
    for(let img = 1; img <= 12; img++) {
      addImage(flowbox!, img);
    }
    addImage(flowbox!, mewtwo);

    gtk.gtk_widget_set_visible(window, true);
    gtk.g_object_unref(builder);
  },
  {
    args: ["ptr", "ptr"]  
  }
);

const app = gtk.gtk_application_new(toCString("fr.minemobs.bun-gtk"), 0);
gtk.g_signal_connect_data(app, toCString("startup"), startupCallback.ptr, null, null, 0);
gtk.g_signal_connect_data(app, toCString("activate"), testCallback.ptr, null, null, 0);
const status = gtk.g_application_run(app, 0, null);
gtk.g_object_unref(app);

testCallback.close();
libGTK.close();
