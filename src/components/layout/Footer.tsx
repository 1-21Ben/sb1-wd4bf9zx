import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-red-500 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-white" />
              <span className="font-bold text-xl text-white">
                GPP Ocean
              </span>
            </div>
            <p className="text-sm text-white/80">
              Votre partenaire en peinture professionnelle depuis 1970
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+262 123 456 789</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@gppocean.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">
              Informations
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link to="/mentions-legales" className="hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="hover:text-white transition-colors">
                  Conditions générales de vente
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">
              Nos magasins
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>La Réunion</li>
              <li>Martinique</li>
              <li>Guadeloupe</li>
              <li>Guyane</li>
              <li>Nouvelle Calédonie</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-sm text-center text-white/60">
          <p>© {new Date().getFullYear()} GPP Ocean Inc. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}