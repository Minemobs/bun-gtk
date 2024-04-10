import { ApplicationFlags, Orientation } from "../dist/lib";
import { newApplication, newApplicationWindow, newBox, newLabel } from "../dist/utils";

const app = newApplication("fr.minemobs.bun-gtk-test", ApplicationFlags.G_APPLICATION_DEFAULT_FLAGS);
app.signalConnect("activate", () => {
  const window = newApplicationWindow(app);
  window.setTitle("Gtk Bun Test");
  window.setDefaultSize(200, 200);

  const box = newBox(Orientation.GTK_ORIENTATION_VERTICAL);
  window.setChild(box);
  const label = newLabel("Hello World");
  label.addCssClass("test");
  label.addCssClass("stuff");
  label.getCssClasses().forEach(it => console.log(`Css Class: ${it}`));
  box.append(label);
  
  window.present();
}, null);
const status = app.run();
