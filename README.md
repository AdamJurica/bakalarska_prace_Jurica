# Bakalářský projekt playwright testů

Automatizovaný testovací projekt postavený na Playwrightu pro ověřování WordPress/WooCommerce e-shopu. Repo obsahuje UI testy, end-to-end scénáře i základní API kontroly nad veřejnými i autentizovanými endpointy.

## Co projekt pokrývá

- UI kontroly klíčových stránek jako homepage, katalog, detail produktu, můj účet a administrace.
- E2E scénáře pro přihlášení, změnu údajů účtu a vytvoření testovací objednávky.
- API testy nad WordPress a WooCommerce endpointy včetně produktů a objednávek.
- Page Object Model pro přehlednější údržbu testů a znovupoužití společných akcí.

## Použité technologie

- Node.js
- TypeScript
- Playwright
- dotenv

## Struktura projektu

```text
pages/         Page objecty pro jednotlivé části aplikace
tests/ui/      Samostatné UI testy
tests/e2e/     End-to-end scénáře napříč aplikací
tests/api/     API testy nad WordPress/WooCommerce endpointy
utils/         Pomocné utility, např. autentizace pro API
```

## Požadované proměnné prostředí

Projekt využívá `.env` soubor s těmito hodnotami:

```env
BASE_URL=https://testovaci-web.cz
WC_CONSUMER_KEY=your_consumer_key
WC_CONSUMER_SECRET=your_consumer_secret
```

## Instalace

```bash
npm install
npx playwright install
```

## Spuštění testů

```bash
npm test
```

Spuštění jen konkrétní části sady:

```bash
npm run test:ui
npm run test:e2e
npm run test:api
```

HTML report:

```bash
npm run report
```

## Poznámky k implementaci

- Testy používají `baseURL` z Playwright konfigurace, takže v testech stačí relativní cesty.
- Sdílené kroky jako přihlášení nebo kontrola dostupnosti stránky jsou centralizované v `BasePage`.
- WooCommerce API autentizace je řešena přes HTTP Basic hlavičku generovanou v `utils/auth.ts`.

## Možná další rozšíření

- Přidat `.env.example` pro jednodušší onboard nového vývojáře.
- Doplnit detailnější validace dat v API testech.
