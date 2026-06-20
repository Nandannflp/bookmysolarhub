
export const metadata = {
  title: 'SolarSquare - Bharat ki #1 Home Rooftop Solar Company',
  description: 'Discover the best rooftop solar panel system for your home.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
      </head>
      <body>
        ${children}
      </body>
    </html>
  )
}
