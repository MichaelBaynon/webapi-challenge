const express = require("express");
const Projects = require("./data/helpers/projectModel");
const Actions = require("./data/helpers/actionModel");
const server = express();
server.use(express.json());
// const server = require('./server')

// PROJECTS END POINTS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.get("/api/projects", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error getting projects" });
    });
});

server.post("/api/projects", (req, res) => {
  const projectData = req.body;

  if (!projectData.name || !projectData.description) {
    res.status(400).json({ message: "name and description required" });
  } else {
    Projects.insert(projectData)
      .then(project => {
        res.json(project);
      })
      .catch(error => {
        res.status(500).json({ error: "post failed" });
      });
  }
});

server.put("/api/projects/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const projectData = req.body;

  if (!projectData.name || !projectData.description) {
    res.status(400).json({ message: "name and description required" });
  } else {
    Projects.update(id, changes)
      .then(hub => {
        res.json(hub);
      })
      .catch(error => {
        res.json({ message: "the project info couldnt be retrieved" });
      });
  }
});

server.delete("/api/projects/:id", (req, res) => {
  const id = req.params.id;

  Projects.remove(id)
    .then(project => {
      res.json(project);
    })
    .catch(error => {
      res.status(200).json({ message: "the project could not be removed" });
    });
});

// ACTIONS END POINTS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.get("/api/projects/:id/actions",  actionExists, (req, res) => {
  const id = req.params.id;

  Projects.getProjectActions(id)
    .then(actions => {
      res.send(actions);
    })
    .catch(error => {
      res.status(500).json({ error: "the action info couldnt be retrieved" });
    });
});

server.post("/api/projects/:id/actions", actionExists, (req, res) => {
  const id = req.params.id;
  const projectData = req.body;

  if (
    !projectData.project_id ||
    !projectData.description ||
    !projectData.notes
  ) {
    res
      .status(400)
      .json({ message: "notes, desc, and project id are all required" });
  }

  Actions.insert(projectData)
    .then(project => {
      res.json(project);
    })
    .catch(error => {
      res.status(500).json({ error: "error posting acion" });
    });
});

function actionExists(req, res,next ) {
  const postId = req.params.id
  Projects.get(postId)
  .then(p => p ? next() : res.json({message: 'id doesnt exist'}))
}

server.listen(5000, () => console.log("server listening on port 5000"));
