import Image from "next/image";
import Link from "next/link";
import ThemeToggler from "@/components/ui/ThemeToggler";

function Header() {
  return (
    <header className="bg-surface-sidebar flex justify-between h-18 fixed inset-x-0 top-0 z-40">
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
