import { Router } from "express";
import films from "./app/controllers/FilmsController.js";

const routes = Router();

routes.get("/films", films.index);
routes.get("/films/:film_id", films.show);
routes.post("/films", films.create);
routes.put("/films/:film_id", films.update);
routes.delete("/films/:film_id", films.destroy);

export default routes;
