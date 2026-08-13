'use client';

import Link from 'next/link';
import { TwitterIcon, LinkedinIcon, InstagramIcon, YoutubeIcon } from '@/components/icons/SocialIcons';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { addSubscriber } from '@/lib/firestore';
import toast from 'react-hot-toast';

const footerLinks = {
  Explore: [
    { href: '/blog', label: 'Blog' },
    { href: '/categories', label: 'Categories' },
    { href: '/authors', label: 'Authors' },
    { href: '/about', label: 'About' },
  ],
  Resources: [
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

const social = [
  { href: 'https://twitter.com', icon: TwitterIcon, label: 'X / Twitter' },
  { href: 'https://linkedin.com', icon: LinkedinIcon, label: 'LinkedIn' },
  { href: 'https://instagram.com', icon: InstagramIcon, label: 'Instagram' },
  { href: 'https://youtube.com', icon: YoutubeIcon, label: 'YouTube' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await addSubscriber(email, '', 'footer');
      toast.success('Thanks for subscribing!');
      setEmail('');
    } catch {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer style={{
      background: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border)',
      marginTop: 'auto',
    }}>
      <div className="container" style={{ padding: '4rem 1.5rem 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '1rem' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.1rem' }}>P</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-text)' }}>ProBlog</span>
            </Link>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', lineHeight: 1.6, maxWidth: '320px', marginBottom: '1.5rem' }}>
              High-quality articles on technology, design, and modern web development.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {social.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    padding: '0.5rem', borderRadius: 'var(--radius-md)',
                    background: 'var(--color-background)', border: '1px solid var(--color-border)',
                    color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 150ms ease-out',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', color: 'var(--color-text)' }}>
                {title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} style={{ color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 150ms ease-out' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)'}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', color: 'var(--color-text)' }}>
              Newsletter
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.5 }}>
              Get our best stories sent directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  style={{
                    width: '100%', padding: '0.625rem 0.75rem 0.625rem 2.25rem',
                    borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)',
                    background: 'var(--color-background)', color: 'var(--color-text)',
                    fontSize: '0.875rem', fontFamily: 'var(--font-ui)', outline: 'none',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '0.625rem 1rem', background: 'var(--color-accent)', color: '#fff',
                  borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer',
                  fontSize: '0.875rem', fontWeight: 600, transition: 'opacity 150ms ease-out',
                }}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: '2rem', borderTop: '1px solid var(--color-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
          fontSize: '0.8125rem', color: 'var(--color-text-muted)',
        }}>
          <p>© {new Date().getFullYear()} ProBlog. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/privacy" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Privacy</Link>
            <Link href="/terms" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
