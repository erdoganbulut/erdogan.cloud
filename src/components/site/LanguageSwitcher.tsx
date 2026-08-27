import { ChevronDownIcon, LanguagesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
  locale: "en" | "tr"
  currentHref: string
  alternateHref: string
}

export function LanguageSwitcher({ locale, currentHref, alternateHref }: Props) {
  const isEnglish = locale === "en"
  const currentLabel = isEnglish ? "EN" : "TR"
  const changeLanguageLabel = isEnglish
    ? "Change language, currently English"
    : "Dili değiştir, şu an Türkçe"
  const englishHref = isEnglish ? currentHref : alternateHref
  const turkishHref = isEnglish ? alternateHref : currentHref

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            aria-label={changeLanguageLabel}
            className="language-switcher border-border bg-transparent dark:bg-transparent dark:border-input hover:bg-muted dark:hover:bg-input/50"
          />
        }
      >
        <LanguagesIcon data-icon="inline-start" aria-hidden="true" />
        <span className="font-mono text-xs">{currentLabel}</span>
        <ChevronDownIcon data-icon="inline-end" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuRadioGroup value={locale}>
          <DropdownMenuRadioItem
            value="en"
            render={<a href={englishHref} lang="en" />}
          >
            {isEnglish ? "English" : "İngilizce"}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="tr"
            render={<a href={turkishHref} lang="tr" />}
          >
            {isEnglish ? "Turkish" : "Türkçe"}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
