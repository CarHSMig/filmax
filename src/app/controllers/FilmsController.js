const films = [
  { id: 1, title: "Interstellar", year: 2014 },
  { id: 2, title: "Inception", year: 2010 },
  { id: 3, title: "The Matrix", year: 1999 },
];

class FilmsController {
  index(req, res) {
    return res.json(films);
  }

  show(req, res) {
    const id = parseInt(req.params.film_id);
    const film = films.find((film) => film.id === id);
    const status = film ? 200 : 404;

    console.debug("GET /films/:film_id", id, status, film);

    return res.status(status).json(film || { error: "Film not found" });
  }

  create(req, res) {
    const { title, year } = req.body;

    if (!title || !year) {
      return res.status(400).json({ error: "Title and year are required" });
    }

    const newFilm = { id: films.length + 1, title, year };
    films.push(newFilm);

    console.debug("POST /films", newFilm);

    return res.status(201).json(newFilm);
  }

  update(req, res) {
    const id = parseInt(req.params.film_id);
    const film = films.find((film) => film.id === id);

    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }

    const { title, year } = req.body;
    if (title) film.title = title;
    if (year) film.year = year;

    console.debug("PUT /films/:film_id", id, film);

    return res.json(film);
  }

  destroy(req, res) {
    const id = parseInt(req.params.film_id);
    const index = films.findIndex((film) => film.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Film not found" });
    }

    films.splice(index, 1);

    console.debug("DELETE /films/:film_id", id);

    return res.status(204).send();
  }
}

// ✅ Use `export default` em vez de `module.exports`
export default new FilmsController();
