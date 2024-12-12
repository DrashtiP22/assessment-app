import React, { useState, useEffect } from 'react';

const HomePage = () => {
    const [featuredProjects, setfeaturedProjects] = useState([]);

    useEffect(() => {
        fetch('/data/projects.json')
        .then((response) => {
            if (!response.ok) 
            {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return response.json();
        })
        .then((data) => 
        {   
            const randomProjects = data.slice(0, 4);
            setfeaturedProjects(randomProjects);
        })
        .catch((error) => console.error('Error fetching project data:', error));
        }, []
    );

    return (
        <div className="container mt-5">
        <div className="text-center">
            <h1 className="display-4">Welcome to Innovative Studio</h1>
            <p className="lead">Crafting innovative solutions for your digital needs.</p>
            <a href="/contact" className="btn btn-primary btn-lg">Get in Touch</a>
        </div>

        <div className="mt-5">
            <h2 className="mb-4">Featured Projects</h2>
            
            <div className="row">
                {featuredProjects.map((project) => (
                <div className="col-12 col-md-4 col-lg-3 mb-4" key={project.id}>
                    <div className="card">
                    <img
                        src={project.image || 'https://via.placeholder.com/150'}
                        className="card-img-top"
                        style={{ height: '250px', objectFit: 'cover' }}
                        alt={project.title}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{project.title}</h5>
                        <p className="card-text">{project.category}</p>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default HomePage;
