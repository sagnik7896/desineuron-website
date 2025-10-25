
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CommunitySection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    try {
      const CONTACT_API_URL = (import.meta as any).env?.VITE_CONTACT_API_URL || '/api/contact';
      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message: reason }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success) {
        setStatus('success');
        setEmail('');
        setReason('');
      } else {
        setStatus('error');
      }
    } catch (_err) {
      setStatus('error');
    }
  };

  return (
    <section id="community" className="bg-brand-dark text-brand-light py-24">
      <div className="container mx-auto px-8 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Join the Alpha Fleet.</h2>
          <p className="text-lg md:text-xl leading-relaxed mb-12">
            While incumbents build closed systems in secret, we are building a public park. Our strategy is to build our tribe before we build our product... We are looking for the makers, the developers, the researchers, and the rebels to join our 'Alpha Fleet' and help us build the future.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence>
            {status !== 'success' ? (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg mx-auto"
              >
                <h3 className="text-3xl font-bold mb-8">Become a Co-Creator.</h3>
                <div className="space-y-6">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="neo-inset-form-field w-full px-6 py-4 bg-brand-dark text-brand-light rounded-lg placeholder-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand-red-hot transition-all duration-300"
                  />
                  <textarea
                    placeholder="Why are you here? What do you want to build?"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                    rows={4}
                    className="neo-inset-form-field w-full px-6 py-4 bg-brand-dark text-brand-light rounded-lg placeholder-brand-light/50 focus:outline-none focus:ring-2 focus:ring-brand-red-hot transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="animated-glow-button mt-8 w-full px-8 py-4 text-lg font-semibold text-brand-light bg-brand-dark rounded-lg shadow-[8px_8px_16px_#1a1a1a,-8px_-8px_16px_#3e3e3e] hover:shadow-[inset_8px_8px_16px_#1a1a1a,inset_-8px_-8px_16px_#3e3e3e] hover:bg-brand-red-hot hover:text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed red-glow"
                >
                  {status === 'loading' ? 'Submitting...' : "I'm In."}
                </button>
                {status === 'error' && (
                  <p className="mt-3 text-sm text-red-400">Something went wrong. Please try again.</p>
                )}
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h3 className="text-3xl font-bold text-brand-light">Welcome to the mission.</h3>
                <p className="text-lg text-brand-light/80 mt-2">We'll be in touch.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
