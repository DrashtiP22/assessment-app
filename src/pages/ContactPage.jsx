import React, { useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } 
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is not valid';
            valid = false;
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
            valid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) 
        {
            setSuccessMessage('Thank you for reaching out! We will get back to you soon.');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setErrors({});
        }
    };

    return (
        <div className="container mt-5">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Fill out the form below to get in touch.</p>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={formData.name}
                onChange={handleChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={formData.email}
                onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input
                type="text"
                id="subject"
                name="subject"
                className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                value={formData.subject}
                onChange={handleChange}
            />
            {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
            </div>

            <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
                id="message"
                name="message"
                className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                rows="5"
                value={formData.message}
                onChange={handleChange}
            ></textarea>
            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    );
};

export default ContactPage;
