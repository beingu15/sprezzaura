
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Breadcrumbs = ({ className, ...props }: React.ComponentProps<'nav'>) => {
  const pathname = usePathname();
  if (!pathname) {
    return null;
  }

  const pathSegments = pathname.split('/').filter(segment => segment);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const isLast = index === pathSegments.length - 1;
    // Replace hyphens with spaces and capitalize for display
    const label = segment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

    return (
      <React.Fragment key={href}>
        <li>
          <div className="flex items-center">
            <Link
              href={href}
              className={cn(
                'text-sm font-medium transition-colors',
                isLast ? 'text-foreground pointer-events-none' : 'text-muted-foreground hover:text-primary'
              )}
              aria-current={isLast ? 'page' : undefined}
            >
              {label}
            </Link>
          </div>
        </li>
        {!isLast && (
          <li className="flex items-center">
            <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
          </li>
        )}
      </React.Fragment>
    );
  });

  if (breadcrumbItems.length === 0) {
      return null;
  }

  return (
    <nav className={cn('w-full', className)} aria-label="Breadcrumb" {...props}>
      <ol className="flex items-center space-x-2">
        <li>
          <div>
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Home
            </Link>
          </div>
        </li>
        {breadcrumbItems.length > 0 && (
            <li className="flex items-center">
                <ChevronRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
            </li>
        )}
        {breadcrumbItems}
      </ol>
    </nav>
  );
};

export { Breadcrumbs };
