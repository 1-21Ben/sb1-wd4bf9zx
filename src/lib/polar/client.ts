import { PolarClient } from '@polar-sh/sdk';

const POLAR_API_KEY = import.meta.env.VITE_POLAR_API_KEY;

if (!POLAR_API_KEY) {
  throw new Error('Missing Polar API key');
}

export const polarClient = new PolarClient({
  apiKey: POLAR_API_KEY
});