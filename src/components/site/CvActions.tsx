import { useState } from "react"
import { CheckIcon, ChevronDownIcon, ClipboardCopyIcon, DownloadIcon, FileDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
  locale: "en" | "tr"
  markdown: string
  pdfUrl: string
}

export function CvActions({ locale, markdown, pdfUrl }: Props) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle")
  const [open, setOpen] = useState(false)
  const isEnglish = locale === "en"
  const filename = isEnglish ? "erdogan-bulut-cv.md" : "erdogan-bulut-ozgecmis.md"

  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(markdown)
      setCopyStatus("copied")
    } catch {
      setCopyStatus("failed")
    }
    setTimeout(() => {
      setCopyStatus("idle")
      setOpen(false)
    }, 2000)
  }

  function downloadMarkdown() {
    const url = URL.createObjectURL(new Blob([markdown], { type: "text/markdown;charset=utf-8" }))
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.click()
    setTimeout(() => URL.revokeObjectURL(url))
  }

  const copyLabel = copyStatus === "copied"
    ? (isEnglish ? "Copied" : "Kopyalandı")
    : copyStatus === "failed"
      ? (isEnglish ? "Copy failed" : "Kopyalanamadı")
      : (isEnglish ? "Copy as Markdown" : "Markdown olarak kopyala")

  return (
    <ButtonGroup className="cv-actions" aria-label={isEnglish ? "CV download options" : "Özgeçmiş indirme seçenekleri"}>
      <Button
        variant="outline"
        size="sm"
        render={<a href={pdfUrl} download="erdogan-bulut-cv.pdf" />}
        nativeButton={false}
      >
        <DownloadIcon data-icon="inline-start" aria-hidden="true" />
        {isEnglish ? "Download as PDF" : "PDF olarak indir"}
      </Button>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size="icon-sm"
              aria-label={isEnglish ? "More download options" : "Diğer indirme seçenekleri"}
            />
          }
        >
          <ChevronDownIcon aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={copyMarkdown} closeOnClick={false}>
              {copyStatus === "copied" ? <CheckIcon /> : <ClipboardCopyIcon />}
              <span role="status">{copyLabel}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={downloadMarkdown}>
              <FileDownIcon />
              {isEnglish ? "Download Markdown" : "Markdown olarak indir"}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
