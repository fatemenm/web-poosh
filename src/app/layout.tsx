export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="http://www.webpoosh.com/site/app/img/logo/favicon_webpoosh.ico?v=002" sizes="any" />
      <body
      >
        {children}
      </body>
    </html>
  );
}
