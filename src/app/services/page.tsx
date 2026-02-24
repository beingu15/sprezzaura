
import { Metadata } from 'next';
import ServicesClient from '@/components/services/ServicesClient';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Sprezzaura offers premium commercial and residential cleaning, property staging, and event management services in Melbourne.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
