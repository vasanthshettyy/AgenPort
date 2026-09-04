import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const DEFAULT_MESSAGE = "Hi Vasanth, I'm interested in building a custom web project for my business. Could we discuss the scope and project requirements?";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: DEFAULT_MESSAGE,
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submittedAt, setSubmittedAt] = useState(() => Date.now());

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
        msg += ' Could we discuss my project requirements?';
        setFormData((prev) => ({ ...prev, details: msg }));
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
      return 'Both name and email are required.';
    }

    if (formData.name.trim().length < 2) {
      return 'Please enter your full name.';
    }

    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address.';
    }

    if (formData.details.trim().length < 20) {
      return 'Please share a few more project details.';
    }

    return null;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      details: DEFAULT_MESSAGE,
      website: '',
    });
    setSubmittedAt(Date.now());
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
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          details: formData.details,
          website: formData.website,
          submittedAt,
        })
      });

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(responseData.error || 'Server returned an error');
      }

      Swal.fire({
        title: 'ENQUIRY RECEIVED',
        text: 'I will reach out to you shortly.',
        icon: 'success',
        background: '#0a0a0a',
        color: '#f5f5f7',
        confirmButtonColor: '#00e5ff',
      });

      resetForm();
    } catch (submitError) {
      Swal.fire({
        title: 'SYSTEM ERROR',
        text: submitError.message || 'Please contact me directly.',
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
    <section id="contact" className="pt-12 pb-48 sm:py-16 lg:py-64 bg-canvas px-4 sm:px-6 lg:px-20 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto">
        <h2 className="text-3xl sm:text-5xl lg:text-massive font-sans font-bold mb-6 sm:mb-8 lg:mb-32 tracking-tighter uppercase">
          Work Together.
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-32">
          <div>
            <p className="text-xl sm:text-2xl lg:text-4xl xl:text-6xl font-sans font-light text-content-secondary leading-tight mb-6 sm:mb-8 lg:mb-12">
              Let's build your new <span className="text-content-primary italic">website</span>.
            </p>
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 font-mono text-sm tracking-tight text-content-secondary">
              <a href="mailto:vasanthshetty.dev@gmail.com" className="flex items-center gap-3 sm:gap-4 hover:text-content-primary transition-colors min-h-[44px]">
                <span className="w-2 h-2 bg-content-accent rounded-full flex-shrink-0" />
                <span className="break-all text-sm sm:text-base">vasanthshetty.dev@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/vasanth-shetty-dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 sm:gap-4 hover:text-content-primary transition-colors min-h-[44px]">
                <span className="w-2 h-2 bg-content-accent rounded-full flex-shrink-0" />
                <span className="text-sm sm:text-base">LinkedIn</span>
              </a>
              <a href="https://github.com/vasanthshettyy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 sm:gap-4 hover:text-content-primary transition-colors min-h-[44px]">
                <span className="w-2 h-2 bg-content-accent rounded-full flex-shrink-0" />
                <span className="text-sm sm:text-base">GitHub</span>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8 lg:gap-12">
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="group relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="YOUR NAME"
                className="w-full bg-transparent border-b border-canvas-border py-3 sm:py-4 lg:py-6 text-base sm:text-lg lg:text-2xl font-sans font-medium focus:outline-none placeholder:text-content-secondary/20 transition-all focus:border-content-accent"
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
                className="w-full bg-transparent border-b border-canvas-border py-3 sm:py-4 lg:py-6 text-base sm:text-lg lg:text-2xl font-sans font-medium focus:outline-none placeholder:text-content-secondary/20 transition-all focus:border-content-accent"
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
                className="w-full bg-transparent border-b border-canvas-border py-3 text-base sm:text-lg lg:text-xl font-sans font-medium focus:outline-none placeholder:text-content-secondary/20 transition-all focus:border-content-accent resize-none"
              />
              <div className="absolute bottom-0 left-0 h-0.5 bg-content-accent w-0 group-focus-within:w-full transition-all duration-700" />
            </div>

            {error && <div className="text-content-accent text-sm font-bold tracking-widest uppercase">{error}</div>}

            <div className="mt-2 lg:mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center px-6 sm:px-8 lg:px-16 py-3 sm:py-4 lg:py-8 border border-content-border rounded-full overflow-hidden transition-all hover:border-content-accent min-h-[48px]"
              >
                <span className={`btn-fill-text text-base sm:text-xl lg:text-2xl font-bold tracking-widest text-content-primary group-hover:text-canvas ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  SUBMIT INQUIRY
                </span>
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 border-4 border-content-accent/30 border-t-content-accent rounded-full animate-spin" />
                  </div>
                )}
                <div className="btn-fill-layer bg-content-accent" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
