import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="\digitalnest2.svg"
      alt="DigitalNest Logo"
      width={480}
      height={160}
      className={className}
      priority
    />
  );
}
