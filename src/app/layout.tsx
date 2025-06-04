import React from 'react'
import '../styles/_index.scss'
import { ApolloClientProvider } from '@/providers/ApolloClientProvider'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloClientProvider>{children}</ApolloClientProvider>
      </body>
    </html>
  )
}
