import Image, { ImageProps } from "next/image";

export function Logo(
  props: Omit<ImageProps, "src" | "alt" | "width" | "height">
) {
  return (
    <Image
      {...props}
      width={138}
      height={52}
      src="/logos/logo.svg"
      alt="logo"
      unoptimized
    />
  );
}

export function LogoSimple(
  props: Omit<ImageProps, "src" | "alt" | "width" | "height">
) {
  return (
    <Image
      {...props}
      width={138}
      height={52}
      src="/logos/simple.svg"
      alt="logo"
      unoptimized
    />
  );
}
