import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex justify-center mt-5">
      <div className="relative size-40">
        <Image fill alt="Logo Fresh Coffee" src="/logo.svg" />
      </div>
    </div>
  );
}
