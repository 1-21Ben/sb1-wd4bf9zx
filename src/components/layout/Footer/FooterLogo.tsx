import React from 'react';
import { SGLogo } from '../../icons/SGLogo';

export function FooterLogo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <OceanLogo className="h-8 w-8" />
        <span className="font-bold text-xl text-white">
          Océan
        </span>
      </div>
      <p className="text-sm text-white/80">
        Votre partenaire en peinture professionnelle depuis 1970
      </p>
    </div>
  );
}