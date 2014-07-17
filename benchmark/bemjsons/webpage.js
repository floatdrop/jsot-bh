var data = require('./data.js');
var projects;

if (data.projects) {
    projects = data.projects.map(function(project) {
        return [
        {
            block: 'a',
            attrs: {
                href: project.url
            },
            content: project.name
        },
        {
            block: 'p',
            content: project.description
        }
        ];
    });
} else {
    projects = 'No projects';
}

module.exports = {
    block: 'html',
    content: [
    {
        block: 'head',
        content: [{
            block: 'title',
            content: data.title
        }]
    },
    {
        block: 'body',
        content: [
        {
            block: 'p',
            content: data.text
        },
        projects
        ]
    }
    ]
};
