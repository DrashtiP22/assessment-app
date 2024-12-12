import React, { useState, useEffect } from 'react';

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('/data/projects.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data);

        // Extract unique categories from project data
        const uniqueCategories = ['All', ...new Set(data.map((project) => project.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error('Error fetching project data:', error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === 'All') 
    {
      setFilteredProjects(projects);
    } 
    else 
    {
      setFilteredProjects(projects.filter((project) => project.category === category));
    }
  };

  return (
    <div className="container mt-5">
      <h1>Our Portfolio</h1>

      <div className="mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn btn-${selectedCategory === category ? 'primary' : 'outline-primary'} me-2`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="row">
        {filteredProjects.map((project) => (
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
  );
};

export default PortfolioPage;