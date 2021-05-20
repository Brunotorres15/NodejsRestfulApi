////////// IMPORTS
const express = require('express');
const {v4: uuidv4} = require('uuid');

const app = express();

app.use(express.json());
////////// END IMPORTS


const projects = [];

/////////// GET
app.get('/projects', (request, response) => {

    return response.json(projects);
});
/////////// END GET

////////// POST
app.post('/projects', (request, response) => {

    const {title, owner} = request.body;

    const id = uuidv4();

    const project = {
        id,
        title,
        owner
    };

    projects.push(project);

    return response.json(project);
});

/////////// END POST


///////// PUT
app.put('/projects/:id', (request, response) => {
    const { id } = request.params;

    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if (projectIndex < 0) {
        return response.status(400).json({Error: 'Project not found'});
    }

    const project = {
        id,
        title,
        owner
    };

    projects[projectIndex] = project;

    return response.json(project);
});
///////// END PUT

//////// DELETE
app.delete('/projects/:id', (request, response) => {

    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id)

    if (projectIndex < 0) {
        return response.status(400).json({Error: 'Project not found'});
    }

    projects.splice(projectIndex, 1);

    // OKAY, NO CONTENT
    return response.status(204).json([]);
});
//////// END DELETE

app.listen(3333, () => console.log('Backend has started!')); 
