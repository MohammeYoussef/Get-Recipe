import { PrimeReactProvider } from "primereact/api";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "./index.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <Outlet />
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}
