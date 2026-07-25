import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handlePrefill = (e) => {
      const data = e.detail;
      if (data) {
        let msg = `Hi, I'm interested in getting a custom scope & quote for the ${data.planName} tier.`;
        if (data.customAddons) {
          msg += ` Additional selected features: [ ${data.customAddons} ].`;
        } else if (data.retainerSelected) {
          msg += ` Including the Care Retainer add-on.`;
        }
        msg += ` Could we discuss my project requirements?`;
        setFormData(prev => ({ ...prev, details: msg }));
      }
    };
    window.addEventListener('prefillContactQuote', handlePrefill);
    window.addEventListener('prefillContactQuoteNoPrice', handlePrefill);
    return () => {
      window.removeEventListener('prefillContactQuote', handlePrefill);
      window.removeEventListener('prefillContactQuoteNoPrice', handlePrefill);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name || !formData.email) {
      return "Both Name and Email are required.";
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
      // Send data to our secure Vercel Serverless backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name, 
          email: formData.email,
          details: formData.details
        })
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      Swal.fire({
        title: 'ENQUIRY RECEIVED',
        text: 'I will reach out to you shortly.',
        icon: 'success',
        background: '#0a0a0a',
        color: '#f5f5f7',
        confirmButtonColor: '#00e5ff',
      });
      
      setFormData({ name: '', email: '', details: '' });
    } catch (_err) {
      Swal.fire({
        title: 'SYSTEM ERROR',
        text: 'Please contact us directly.',
        icon: 'error',
        background: '#0a0a0a',
        color: '#f5f5f7',
        confirmButtonColor: '#00e5ff',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-64 bg-canvas px-6 lg:px-20 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto">
        <h2 className="text-massive font-sans font-bold mb-32 tracking-tighter uppercase">
          Work Together.
        </h2>

        <div className="grid lg:grid-cols-2 gap-32">
          <div>
            <p className="text-4xl lg:text-6xl font-sans font-light text-content-secondary leading-tight mb-12">
              Let's build your new <span className="text-content-primary italic">digital standard</span>.
            </p>
            <div className="flex flex-col gap-6 text-xl text-content-secondary font-mono text-sm tracking-tight">
              <a href="mailto:vasanthshetty.dev@gmail.com" className="flex items-center gap-4 hover:text-content-primary transition-colors">
                <span className="w-2 h-2 bg-content-accent rounded-full" />
                vasanthshetty.dev@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/vasanth-shetty-dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-content-primary transition-colors">
                <span className="w-2 h-2 bg-content-accent rounded-full" />
                LinkedIn
              </a>
              <a href="https://github.com/vasanthshettyy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-content-primary transition-colors">
                <span className="w-2 h-2 bg-content-accent rounded-full" />
                GitHub
              </a>
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
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows="3"
                placeholder="PROJECT DETAILS / PACKAGE INTEREST"
                className="w-full bg-transparent border-b border-canvas-border py-4 text-xl lg:text-2xl font-sans font-medium focus:outline-none placeholder:text-content-secondary/20 transition-all focus:border-content-accent resize-none"
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
                <span className={`relative z-10 text-2xl font-bold tracking-widest text-content-primary group-hover:text-canvas transition-colors duration-500 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  SUBMIT INQUIRY
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
