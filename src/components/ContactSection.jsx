import { useState, useEffect } from 'react';

const DEFAULT_MESSAGE = "Hi Vasanth, I'm interested in building a custom web project for my business. Could we discuss the scope and project requirements?";

let swalModulePromise = null;
const loadSwal = () => {
  if (!swalModulePromise) {
    swalModulePromise = import('sweetalert2').then((m) => m.default || m);
  }
  return swalModulePromise;
};

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
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => loadSwal());
      } else {
        setTimeout(loadSwal, 2000);
      }
    }

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

    const swalPromise = loadSwal().catch(() => null);
    const postPromise = fetch('/api/contact', {
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

    try {
      const [response, Swal] = await Promise.all([postPromise, swalPromise]);
      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(responseData.error || 'Server returned an error');
      }

      if (Swal) {
        Swal.fire({
          title: 'ENQUIRY RECEIVED',
          text: 'I will reach out to you shortly.',
          icon: 'success',
          background: '#0a0a0a',
          color: '#f5f5f7',
          confirmButtonColor: '#00e5ff',
        });
      } else {
        window.alert('ENQUIRY RECEIVED: I will reach out to you shortly.');
      }

      resetForm();
    } catch (submitError) {
      const Swal = await swalPromise;
      if (Swal) {
        Swal.fire({
          title: 'SYSTEM ERROR',
          text: submitError.message || 'Please contact me directly.',
          icon: 'error',
          background: '#0a0a0a',
          color: '#f5f5f7',
          confirmButtonColor: '#00e5ff',
        });
      } else {
        window.alert(`SYSTEM ERROR: ${submitError.message || 'Please contact me directly.'}`);
      }
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
              <a href="mailto:vasanthshetty.dev@gmail.com" className="group flex items-center gap-3 sm:gap-4 hover:text-content-primary transition-colors min-h-[44px]">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-content-accent flex-shrink-0 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="break-all text-sm sm:text-base">vasanthshetty.dev@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/vasanth-shetty-dev" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 sm:gap-4 hover:text-content-primary transition-colors min-h-[44px]">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-content-accent flex-shrink-0 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46V10.9M7.84 6.88a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24" />
                </svg>
                <span className="text-sm sm:text-base">LinkedIn</span>
              </a>
              <a href="https://github.com/vasanthshettyy" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 sm:gap-4 hover:text-content-primary transition-colors min-h-[44px]">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-content-accent flex-shrink-0 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span className="text-sm sm:text-base">GitHub</span>
              </a>
              <a href="https://www.instagram.com/vasanthshetty.dev/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 sm:gap-4 hover:text-content-primary transition-colors min-h-[44px]">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-content-accent flex-shrink-0 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="text-sm sm:text-base">Instagram</span>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} onFocus={loadSwal} className="flex flex-col gap-6 sm:gap-8 lg:gap-12">
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
                className="w-full bg-transparent border-b border-canvas-border py-3 sm:py-4 lg:py-6 text-base sm:text-lg lg:text-2xl font-sans font-medium focus:outline-none placeholder:text-content-secondary/70 transition-all duration-300 hover:border-content-secondary/80 focus:border-content-accent"
              />
              <div className="absolute bottom-0 left-0 h-0.5 bg-content-accent w-0 group-focus-within:w-full transition-all duration-500 ease-out pointer-events-none" />
            </div>

            <div className="group relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="YOUR EMAIL"
                className="w-full bg-transparent border-b border-canvas-border py-3 sm:py-4 lg:py-6 text-base sm:text-lg lg:text-2xl font-sans font-medium focus:outline-none placeholder:text-content-secondary/70 transition-all duration-300 hover:border-content-secondary/80 focus:border-content-accent"
              />
              <div className="absolute bottom-0 left-0 h-0.5 bg-content-accent w-0 group-focus-within:w-full transition-all duration-500 ease-out pointer-events-none" />
            </div>

            <div className="group relative">
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows="3"
                placeholder="PROJECT DETAILS / PACKAGE INTEREST"
                className="w-full bg-transparent border-b border-canvas-border py-3 text-base sm:text-lg lg:text-xl font-sans font-medium focus:outline-none placeholder:text-content-secondary/70 transition-all duration-300 hover:border-content-secondary/80 focus:border-content-accent resize-none"
              />
              <div className="absolute bottom-0 left-0 h-0.5 bg-content-accent w-0 group-focus-within:w-full transition-all duration-500 ease-out pointer-events-none" />
            </div>

            {error && <div className="text-content-accent text-sm font-bold tracking-widest uppercase">{error}</div>}

            <div className="mt-2 lg:mt-4 flex flex-col items-start gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full sm:w-auto relative inline-flex items-center justify-center px-6 sm:px-8 lg:px-16 py-3 sm:py-4 lg:py-8 border border-content-border rounded-full overflow-hidden transition-all duration-300 hover:border-content-accent hover:shadow-[0_0_30px_rgba(0,229,255,0.25)] min-h-[48px] cursor-pointer"
              >
                <span className={`btn-fill-text text-base sm:text-xl lg:text-2xl font-bold tracking-widest text-content-primary lg:group-hover:text-canvas transition-colors duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                  SUBMIT INQUIRY
                </span>
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 border-4 border-content-accent/30 border-t-content-accent rounded-full animate-spin" />
                  </div>
                )}
                <div className="btn-fill-layer bg-content-accent" />
              </button>

              <p className="text-xs sm:text-sm text-content-secondary font-light">
                By submitting, you agree to our{' '}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-content-primary underline underline-offset-4 hover:text-content-accent transition-colors"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
