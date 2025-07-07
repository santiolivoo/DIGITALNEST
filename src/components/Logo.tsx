import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/digitalnest.svg"
      alt="DigitalNest Logo"
      width={160}
      height={40}
      className={className}
      priority
    />
  );
}
