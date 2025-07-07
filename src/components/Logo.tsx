import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/20250707_1303_Logo de DigitalNest_simple_compose_01jzjsyeqefqgt6pys3gew7nn2.png"
      alt="DigitalNest Logo"
      width={480}
      height={160}
      className={className}
      priority
    />
  );
}
