import React from 'react';
import { FooterLogo } from './FooterLogo';
import { FooterLinks } from './FooterLinks';

const FOOTER_SECTIONS = [
  {
    title: 'Contact',
    links: [
      { label: '+262 123 456 789', href: 'tel:+262123456789' },
      { label: 'contact@gppocean.com', href: 'mailto:contact@gppocean.com' },
    ],
  },
  {
    title: 'Informations',
    links: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Conditions générales de vente', href: '/cgv' },
      { label: 'Politique de confidentialité', href: '/confidentialite' },
    ],
  },
  {
    title: 'Nos magasins',
    links: [
      { label: 'La Réunion', href: '/stores/reunion' },
      { label: 'Martinique', href: '/stores/martinique' },
      { label: 'Guadeloupe', href: '/stores/guadeloupe' },
      { label: 'Guyane', href: '/stores/guyane' },
      { label: 'Nouvelle Calédonie', href: '/stores/nouvelle-caledonie' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-red-500 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <FooterLogo />
          <FooterLinks sections={FOOTER_SECTIONS} />
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-sm text-center text-white/60">
          <p>© {new Date().getFullYear()} GPP Ocean Inc. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}