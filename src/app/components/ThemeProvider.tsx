"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// Kita gunakan React.ComponentProps untuk mengambil tipe props langsung dari komponen aslinya
// Ini lebih aman daripada mengimpor interface manual yang lokasinya bisa berubah
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}