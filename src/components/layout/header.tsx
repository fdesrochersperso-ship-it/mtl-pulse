import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Aujourd'hui" },
  { href: "/weekly", label: "Tendances" },
  { href: "/borough/VMA", label: "Arrondissements" },
  { href: "/efficiency", label: "Efficacité" },
];

export function Header() {
  return (
    <header className="bg-navy text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">
            MTL<span className="text-orange">Pulse</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
