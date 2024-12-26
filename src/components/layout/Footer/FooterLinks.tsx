import React from 'react';
import { Link } from 'react-router-dom';

interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

interface FooterLinksProps {
  sections: FooterSection[];
}

export function FooterLinks({ sections }: FooterLinksProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="font-semibold mb-4 text-white">
            {section.title}
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}