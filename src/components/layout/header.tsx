"use client";

import Link from "next/link";
import { ChevronDown, MapPin, Info, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLinkItem,
} from "@/components/ui/dropdown-menu";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { BoroughSelector } from "@/components/layout/BoroughSelector";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import type { Locale } from "@/lib/locale";

const TOPIC_LINKS = [
  { href: "/travaux", key: "travaux" as const },
  { href: "/securite", key: "securite" as const },
  { href: "/permis", key: "permis" as const },
  { href: "/311", key: "311" as const },
  { href: "/entraves", key: "entraves" as const },
  { href: "/pompiers", key: "pompiers" as const },
  { href: "/nids-de-poule", key: "nids-de-poule" as const },
  { href: "/remorquages", key: "remorquages" as const },
  { href: "/punaises", key: "punaises" as const },
  { href: "/air", key: "air" as const },
  { href: "/velo", key: "velo" as const },
  { href: "/eau", key: "eau" as const },
  { href: "/contrats", key: "contrats" as const },
  { href: "/politique", key: "politique" as const },
  { href: "/routes", key: "routes" as const },
  { href: "/pannes", key: "pannes" as const },
  { href: "/winter", key: "winter" as const },
  { href: "/trends", key: "trends" as const },
];

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations("header");
  const tCommon = useTranslations("common");
  const tTopics = useTranslations("topicsDropdown");

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <span className="text-xl text-navy dark:text-white">
              MTL<span className="text-orange">Pulse</span>
            </span>
            <span className="hidden text-sm text-muted-foreground sm:inline">
              — {t("tagline")}
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:hidden">
            <LanguageToggle locale={locale} />
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                {t("topics")}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {TOPIC_LINKS.map((item) => (
                <DropdownMenuLinkItem key={item.href} href={item.href}>
                  {tTopics(item.key)}
                </DropdownMenuLinkItem>
              ))}
              <div className="my-1 h-px bg-border" />
              <DropdownMenuLinkItem href="/borough">
                <Building2 className="mr-2 h-4 w-4" />
                {tCommon("boroughs")}
              </DropdownMenuLinkItem>
              <DropdownMenuLinkItem href="/map">
                <MapPin className="mr-2 h-4 w-4" />
                {t("map")}
              </DropdownMenuLinkItem>
              <DropdownMenuLinkItem href="/about">
                <Info className="mr-2 h-4 w-4" />
                {t("about")}
              </DropdownMenuLinkItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/borough"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
          >
            {tCommon("boroughs")}
          </Link>
          <Link
            href="/map"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
          >
            {t("map")}
          </Link>
          <Link
            href="/about"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-block"
          >
            {t("about")}
          </Link>

          <div className="hidden items-center gap-1 sm:flex">
            <LanguageToggle locale={locale} />
            <ThemeToggle />
          </div>

          <BoroughSelector locale={locale} />
        </div>
      </div>
    </header>
  );
}
