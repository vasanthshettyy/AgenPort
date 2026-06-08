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
    // Block common free email providers to enforce "corporate" email
    const freeProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const domain = formData.email.split('@')[1];
    if (freeProviders.includes(domain?.toLowerCase())) {
      return "Please use your corporate email address.";
    }
    if (formData.scope.length < 20) {
      return "Please provide more detail about your project scope (min 20 chars).";
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
        title: 'Application Received',
        text: 'Our technical director will review your scope and follow up within 24 hours.',
        icon: 'success',
        background: '#0A0D14',
        color: '#fff',
        confirmButtonColor: '#00D4FF',
      });
      
      setFormData({ name: '', email: '', scope: '', budget: '$10k - $25k' });
    } catch (err) {
      Swal.fire({
        title: 'System Error',
        text: 'We could not process your request at this time. Please email us directly.',
        icon: 'error',
        background: '#0A0D14',
        color: '#fff',
        confirmButtonColor: '#7C3AED',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-canvas relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent-primary/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: Copy */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Build Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Core Advantage?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md">
            We operate as a fractional CTO and dedicated engineering team for high-growth companies. 
            Tell us about your architectural bottlenecks.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-accent-primary">🛡️</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Signed NDA</div>
                <div className="text-xs text-gray-500">Confidentiality guaranteed</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-accent-secondary">⚡</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Rapid Discovery</div>
                <div className="text-xs text-gray-500">Architecture mapped in 48 hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-canvas-light/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-canvas border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Corporate Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-canvas border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary transition-colors"
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Project Scope & Bottlenecks</label>
              <textarea 
                name="scope"
                value={formData.scope}
                onChange={handleChange}
                rows="4"
                className="w-full bg-canvas border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary transition-colors resize-none"
                placeholder="We need to migrate off our legacy monolithic CRM and build a scalable API layer..."
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Estimated Budget Tier</label>
              <select 
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-canvas border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-primary transition-colors appearance-none"
              >
                <option value="$10k - $25k">$10k - $25k (MVP / Tooling)</option>
                <option value="$25k - $50k">$25k - $50k (Core Platform)</option>
                <option value="$50k+">$50k+ (Enterprise Infrastructure)</option>
              </select>
            </div>

            {error && <div className="text-red-400 text-sm">{error}</div>}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl text-canvas font-bold bg-accent-primary hover:bg-white transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-canvas" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : "Submit Project Scope"}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
