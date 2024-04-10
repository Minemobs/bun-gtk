import { ApplicationFlags } from "./dist/lib";
import { newApplication, newApplicationWindow } from "./dist/utils";

const app = newApplication("fr.minemobs.bun-gtk-test", ApplicationFlags.G_APPLICATION_DEFAULT_FLAGS);
app.signalConnect("activate", () => {
  const window = newApplicationWindow(app);
  window.setTitle("Gtk Bun Test");
  window.setDefaultSize(200, 200);
  window.present();
}, null);
const status = app.run();
