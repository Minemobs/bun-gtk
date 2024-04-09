import { ApplicationFlags } from "./lib";
import { newApplication, newApplicationWindow } from "./utils";

const app = newApplication("fr.minemobs.bun-gtk-test", ApplicationFlags.G_APPLICATION_DEFAULT_FLAGS);
app.signalConnect("activate", () => {
  const window = newApplicationWindow(app);
  window.setTitle("Gtk Bun Test");
  window.setDefaultSize(200, 200);
  window.present();
}, null);
const status = app.run();
