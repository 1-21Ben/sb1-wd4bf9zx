import React from 'react';
import { Shield, Droplet, PaintBucket, Scale } from 'lucide-react';

interface PaintProductInfoProps {
  coverage: string;
  application: string[];
  finish: string;
  dryingTime: string;
  recoatTime: string;
  dilution: string;
  cleaning: string;
  environment: string[];
}

export function PaintProductInfo({
  coverage,
  application,
  finish,
  dryingTime,
  recoatTime,
  dilution,
  cleaning,
  environment,
}: PaintProductInfoProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Caractéristiques techniques</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Scale className="h-5 w-5 text-primary-500 mt-1" />
            <div>
              <span className="block font-medium">Rendement</span>
              <span className="text-gray-600">{coverage}</span>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <PaintBucket className="h-5 w-5 text-primary-500 mt-1" />
            <div>
              <span className="block font-medium">Application</span>
              <ul className="text-gray-600 list-disc list-inside">
                {application.map((method, index) => (
                  <li key={index}>{method}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-primary-500 mt-1" />
            <div>
              <span className="block font-medium">Aspect</span>
              <span className="text-gray-600">{finish}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Droplet className="h-5 w-5 text-primary-500 mt-1" />
            <div>
              <span className="block font-medium">Temps de séchage</span>
              <span className="text-gray-600">{dryingTime}</span>
              <span className="block text-sm text-gray-500">
                Recouvrable après {recoatTime}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Dilution</h4>
            <p className="text-gray-600">{dilution}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Nettoyage du matériel</h4>
            <p className="text-gray-600">{cleaning}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Environnement</h4>
            <ul className="text-gray-600 list-disc list-inside">
              {environment.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}