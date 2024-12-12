import React, { useState, useEffect } from 'react';

const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  // Fetch team data from mock JSON
  useEffect(() => {
    fetch('/data/team.json')
      .then((response) => response.json())
      .then((data) => setTeamMembers(data))
      .catch((error) => console.error('Error fetching team data:', error));
  }, []);

  return (
    <div className="container mt-5">
      <section className="mb-5">
        <h1>About Us</h1>
        <p>
          At Innovate Studio, our mission is to craft innovative solutions that empower businesses
          in the digital landscape. Our vision is to be a trusted partner in driving digital
          success for our clients.
        </p>
        <p>
          <strong>Our Services:</strong> Website Development, Graphic Design, Digital Marketing,
          and more!
        </p>
      </section>

      <section>
        <h2>Meet Our Team</h2>
        <div className="row mt-4">
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <div className="col-12 col-md-4 col-lg-3 mb-4" key={member.id}>
                <div className="card text-center">
                  <img
                    src={member.image || 'https://via.placeholder.com/150'}
                    className="card-img-top"
                    style={{ height: '250px', objectFit: 'cover' }}
                    alt={member.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{member.name}</h5>
                    <p className="card-text">{member.role}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading team members...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
