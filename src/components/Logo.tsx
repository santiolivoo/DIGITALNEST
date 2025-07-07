import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/digitalnest.svg"
      alt="DigitalNest logo"
      width={160}
      height={40}
      className={className}
      priority
    />
  );
}
