import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { SGLogo } from '../../icons/SGLogo';

interface HeaderLogoProps {
  onMenuOpen: () => void;
}

export function HeaderLogo({ onMenuOpen }: HeaderLogoProps) {
  return (
    <div className="flex-shrink-0 flex items-center space-x-4">
      <button
        onClick={onMenuOpen}
        className="p-2 rounded-lg transition-colors hover:bg-white/10"
        aria-label="Menu principal"
      >
        <Menu className="h-6 w-6 text-white" />
      </button>

      <Link 
        to="/"
        className="group flex items-center space-x-2 p-2 rounded-lg transition-colors hover:bg-white/10"
      >
        <SGLogo className="h-8 w-8" />
        <span className="font-bold text-xl text-white">
          Océan
        </span>
      </Link>
    </div>
  );
}