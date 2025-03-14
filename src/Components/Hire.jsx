import { useState } from 'react';

const Hire = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    details: ''
  });

  const services = [
    'Web Development',
    'UI/UX Design',
    'Mobile App Development',
    'Custom Software Development',
    
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFields = () => {
    setFormData({
      name: '',
      email: '',
      service: '',
      details: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mail =  'prarthan1121@gmail.com'
    const subject = `Service Request: ${formData.service}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\nProject Details: ${formData.details}`;
    window.location.href = `mailto:${mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    clearFields();
  
};

  return (
    <div className="min-h-screen w-full bg-primary py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-4xl font-kanit font-bold text-primary mb-8 text-center">Hire Me</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service</label>
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
            <textarea
              id="details"
              name="details"
              required
              value={formData.details}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors duration-300"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hire;