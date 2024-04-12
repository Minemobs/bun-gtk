import { ApplicationFlags, Orientation } from "../dist/lib";
import { Application, ApplicationWindow, Box, Label } from "../dist/utils";

const app = new Application("fr.minemobs.bun-gtk-test", ApplicationFlags.G_APPLICATION_DEFAULT_FLAGS);
app.signalConnect("activate", () => {
  const window = new ApplicationWindow(app);
  window.setTitle("GTK Bun Test");
  window.setDefaultSize(200, 200);

  const box = new Box(Orientation.GTK_ORIENTATION_VERTICAL);
  window.setChild(box);
  const label = new Label("Hello World");
  label.addCssClass("test");
  label.addCssClass("stuff");
  label.getCssClasses().forEach(it => console.log(`Css Class: ${it}`));
  box.append(label);
  
  window.present();
}, null);
const status = app.run();
