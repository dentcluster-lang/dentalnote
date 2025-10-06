import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dental Cluster',
  description: 'Dental Cluster Chat App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <style>{`
          body {
            margin: 0;
            padding: 0;
            background-color: #ffeb3b;
            font-family: system-ui, sans-serif;
          }
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
