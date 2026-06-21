import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import logo from "@/app/assets/images/logo.jpg";
import { business } from "@/app/lib/content";

const socialLinks = [
  { label: "Facebook", href: `https://facebook.com/${business.social.profileSlug}`, Icon: FaFacebookF },
  { label: "TikTok", href: `https://tiktok.com/@${business.social.profileSlug}`, Icon: FaTiktok },
  { label: "Instagram", href: `https://instagram.com/${business.social.profileSlug}`, Icon: FaInstagram },
];

export default function Footer() {
  return (
    <footer className="bg-ink-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src={logo}
            alt="Coffee Brewtherhood logo"
            width={36}
            height={36}
            className="rounded-full transition-transform duration-300 ease-out group-hover:scale-110"
          />
          <div>
            <p className="font-display text-sm font-medium text-paper transition-colors duration-300 group-hover:text-accent">
              {business.name}
            </p>
            <p className="text-xs text-muted">{business.social.handle}</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:bg-paper/10 hover:text-paper"
            >
              <Icon aria-hidden size={18} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </nav>

        <p className="text-xs text-muted/70">
          © {new Date().getFullYear()} {business.name}. Jaro, Iloilo City.
        </p>
      </div>
    </footer>
  );
}
