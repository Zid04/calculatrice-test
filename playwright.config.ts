import { defineConfig, devices } from '@playwright/test'
export default defineConfig({
testDir: './e2e', // dossier contenant les tests
fullyParallel: true, // exécution parallèle des tests
retries: 1, // nombre de réessais en cas d'échec (CI: 2)
reporter: 'html', // format du rapport : 'list', 'html', 'dot'
use: {
baseURL: 'http://localhost:5173', // URL de base pour page.goto('/')
trace: 'on-first-retry', // enregistre une trace en cas d'échec
screenshot: 'only-on-failure', // capture d'écran sur échec
video: 'off', // enregistrement vidéo
headless: true, // pas d'interface graphique (CI)
},
projects: [
{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
// Mobile
{ name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
],
// Démarrage automatique du serveur de développement
webServer: {
command: 'npx vite',
url: 'http://localhost:5173',
reuseExistingServer: true, // réutilise le serveur si déjà lancé
timeout: 10_000,
},
})
