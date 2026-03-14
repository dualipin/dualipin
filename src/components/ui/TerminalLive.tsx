import { useEffect, useState } from "react"

const terminalLines = [
  { type: "command", text: "$ docker-compose up -d" },
  { type: "output", text: "[+] Running 3/3" },
  { type: "output", text: " ⠿ Container postgres      Started    0.8s" },
  { type: "output", text: " ⠿ Container redis         Started    0.6s" },
  { type: "output", text: " ⠿ Container app           Started    1.2s" },
  { type: "command", text: "$ npm run build" },
  { type: "output", text: "> app@1.0.0 build" },
  { type: "output", text: "> next build" },
  { type: "output", text: "" },
  { type: "output", text: "   Creating an optimized production build..." },
  { type: "success", text: " ✓ Compiled successfully" },
  { type: "output", text: "   Route (app)              Size     First Load JS" },
  { type: "output", text: "   ┌ ○ /                    5.2 kB   89.4 kB" },
  { type: "output", text: "   └ ○ /api/health          0 B      0 B" },
  { type: "success", text: " ✓ Build completed in 12.4s" },
  { type: "command", text: "$ ssh deploy@azure-vm" },
  { type: "output", text: "Welcome to Ubuntu 22.04.3 LTS" },
  { type: "command", text: "$ sudo systemctl status nginx" },
  { type: "success", text: "● nginx.service - Active: active (running)" },
  { type: "command", text: "$ _" },
]

export function TerminalLive() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < terminalLines.length) {
          return prev + 1
        }
        return prev
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-box overflow-hidden border border-base-300 bg-base-100 font-mono text-sm max-w-3xl mx-auto w-full shadow-lg">
      <div className="flex items-center gap-2 px-4 py-3 bg-base-300">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-error" />
          <div className="w-3 h-3 rounded-full bg-warning" />
          <div className="w-3 h-3 rounded-full bg-success" />
        </div>
        <span className="text-base-content/50 text-xs ml-2">terminal — zsh</span>
      </div>
      <div className="p-4 h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
        {terminalLines.slice(0, visibleLines).map((line, index) => (
          <div
            key={index}
            className={`leading-6 ${
              line.type === "command"
                ? "text-primary"
                : line.type === "success"
                ? "text-success"
                : "text-base-content/80"
            }`}
          >
            {line.text || "\u00A0"}
          </div>
        ))}
        {visibleLines < terminalLines.length && (
          <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
        )}
      </div>
    </div>
  )
}
