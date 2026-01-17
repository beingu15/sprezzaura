import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image src="/logo.svg" alt="Sprezzaura Logo" width={180} height={40} priority />
    </Link>
  );
}
