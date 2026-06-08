import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: '',
    budget: '$10k - $25k'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name || !formData.email || !formData.scope) {
      return "All fields are required.";
    }
    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      Swal.fire({
        title: 'INQUIRY RECEIVED',
        text: 'We will follow up within 24 hours.',
        icon: 'success',
        background: '#0a0a0a',
        color: '#f5f5f7',
        confirmButtonColor: '#d4af37',
      });
      
      setFormData({ name: '', email: '', scope: '', budget: '$10k - $25k' });
    } catch (err) {
      Swal.fire({
        title: 'SYSTEM ERROR',
        text: 'Please contact us directly.',
        icon: 'error',
        background: '#0a0a0a',
        color: '#f5f5f7',
        confirmButtonColor: '#d4af37',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-64 bg-canvas px-6 lg:px-20 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto">
        <h2 className="text-massive font-sans font-bold mb-32 tracking-tighter">
          CONTACT
        </h2>

        <div className="grid lg:grid-cols-2 gap-32">
          <div>
            <p className="text-4xl lg:text-6xl font-sans font-light text-content-secondary leading-tight mb-12">
              Ready to build something <span className="text-content-primary italic">extraordinary</span>?
            </p>
            <div className="flex flex-col gap-6 text-xl text-content-secondary">
              <span className="flex items-center gap-4">
                <span className="w-2 h-2 bg-content-accent rounded-full" />
                GLOBAL AVAILABILITY
              </span>
              <span className="flex items-center gap-4">
                <span className="w-2 h-2 bg-content-accent rounded-full" />
                ENTERPRISE GRADE
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-12">
            <div className="group relative">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="YOUR NAME"
                className="w-full bg-transparent border-b border-canvas-border py-6 text-3xl lg:text-4xl font-sans font-medium focus:outline-none placeholder:text-content-secondary/20 transition-all focus:border-content-accent"
              />
              <div className="absolute bottom-0 left-0 h-0.5 bg-content-accent w-0 group-focus-within:w-full transition-all duration-700" />
            </div>

            <div className="group relative">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="YOUR EMAIL"
                className="w-full bg-transparent border-b border-canvas-border py-6 text-3xl lg:text-4xl font-sans font-medium focus:outline-none placeholder:text-content-secondary/20 transition-all focus:border-content-accent"
              />
              <div className="absolute bottom-0 left-0 h-0.5 bg-content-accent w-0 group-focus-within:w-full transition-all duration-700" />
            </div>

            <div className="group relative">
              <textarea 
                name="scope"
                value={formData.scope}
                onChange={handleChange}
                placeholder="PROJECT DESCRIPTION"
                rows="3"
                className="w-full bg-transparent border-b border-canvas-border py-6 text-3xl lg:text-4xl font-sans font-medium focus:outline-none placeholder:text-content-secondary/20 transition-all focus:border-content-accent resize-none"
              />
              <div className="absolute bottom-0 left-0 h-0.5 bg-content-accent w-0 group-focus-within:w-full transition-all duration-700" />
            </div>

            {error && <div className="text-content-accent text-sm font-bold tracking-widest uppercase">{error}</div>}

            <div className="mt-8">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="group relative inline-flex items-center justify-center px-16 py-8 border border-content-border rounded-full overflow-hidden transition-all hover:border-content-accent"
              >
                <span className={`relative z-10 text-2xl font-bold tracking-widest ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  SEND INQUIRY
                </span>
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-content-accent/30 border-t-content-accent rounded-full animate-spin" />
                  </div>
                )}
                <div className="absolute inset-0 bg-content-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
