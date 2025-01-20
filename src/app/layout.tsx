import React from "react"
import './globals.css'

export const metadata = {
  title: 'Weather App',
  description: 'Ứng dụng thời tiết đơn giản',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  )
}