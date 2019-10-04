// const express = require("express");

// const Projects = require("../data/helpers/projectModel");
// const router = express.Router();

// router.get("/", (req, res) => {
//   Projects.get()
//     .then(projects => {
//       res.status(200).json(projects);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: "error getting projects" });
//     });
// });

// router.post("/", (req, res) => {
//   const projectData = req.body;

//   Projects.insert(projectData)
//     .then(project => {
//       res.json(project);
//     })
//     .catch(error => {
//       res.status(500).json({ error: "post failed" });
//     });
// });

// router.put('/:id', (req, res) => {
//     const id = req.params.id
//     const changes = req.body
//     const projectData = req.body

//     Projects.update(id, changes)
//     .then(hub => {
//         res.json(hub)
//     })
//     .catch(error => {
//         res.json({message: 'the project info couldnt be retrieved'})
//     })
// })

// module.exports = router;
