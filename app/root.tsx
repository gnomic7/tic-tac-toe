import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from 'remix';
import type { MetaFunction } from 'remix';

import styles from '~/styles/app.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export const meta: MetaFunction = () => {
  return { title: 'Anshi: Tic Tac Toe' };
};
export const handle = { hydrate: true };

export default function App() {
  const matches = useMatches();
  const includeScripts = matches.some((match) => match.handle?.hydrate);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="container">
          <Outlet />
          <ScrollRestoration />
          {<LiveReload />}
        </main>
        {includeScripts ? <Scripts /> : null}
      </body>
    </html>
  );
}
