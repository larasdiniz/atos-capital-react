import type { Metadata } from 'next'
import '../src/index.css'

export const metadata: Metadata = {
  title: 'Atos Capital Chat',
  description: 'Chat application for Atos Capital',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
