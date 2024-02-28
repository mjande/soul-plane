/* SETUP */
import express, { Express, Request, Response } from "express";
const app: Express = express();
const port = 9124;

/* Routes */
app.get("/", (req: Request, res: Response) => {
  res.send("Root route");
});

/* LISTENER */
app.listen(port, () => {
  console.log(
    "Express started on http://localhost:" +
      port +
      "; press Ctrl-C to terminate."
  );
});
