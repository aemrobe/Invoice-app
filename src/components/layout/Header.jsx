import Image from "next/image";
import Link from "next/link";
import ThemeToggler from "@/components/ui/ThemeToggler";

function Header() {
  return (
    <header className="bg-surface-sidebar flex flex-wrap gap-x-31.75 gap-y-5 sm:gap-0 justify-center sm:justify-between">
      <Link
        href={"/"}
        aria-label="Go to home page"
        className="focusable-ring logo relative w-18 h-18 bg-brand-primary flex justify-center items-center rounded-tr-[20px] rounded-br-[20px]"
        style={{
          "--ring-color": "var(--color-purple-300)",
          "--ring-offset": "-2px",
        }}
      >
        <Image
          src="/logo.svg"
          width={28}
          height={26}
          alt=""
          className="w-7 h-auto z-10"
        />
      </Link>

      <div className="flex  items-center">
        <ThemeToggler />

        <div
          className="border border-border-divider self-stretch ml-6"
          aria-hidden="true"
        ></div>

        <div className="px-6 shrink-0">
          <Image
            src={"/image-avatar.jpg"}
            width={32}
            height={32}
            alt="User profile image"
            className="w-8 h-8 rounded-full "
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
