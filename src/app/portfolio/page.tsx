
import { Metadata } from 'next';
import PortfolioClient from '@/components/portfolio/PortfolioClient';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore the transformations we have created for our clients in Melbourne, from spotless office cleans to elegant wedding decors.',
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
