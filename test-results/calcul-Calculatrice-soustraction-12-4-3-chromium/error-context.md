# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: calcul.test.ts >> Calculatrice + >> soustraction : 12 / 4 = 3
- Location: e2e\calcul.test.ts:44:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: '/', exact: true })

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e7]: "12"
      - generic [ref=e8]:
        - button "AC" [ref=e9] [cursor=pointer]
        - button "+/-" [ref=e10] [cursor=pointer]
        - button "MS" [ref=e11] [cursor=pointer]
        - button "MR" [ref=e12] [cursor=pointer]
        - button "÷" [ref=e13] [cursor=pointer]
        - button "7" [ref=e14] [cursor=pointer]
        - button "8" [ref=e15] [cursor=pointer]
        - button "9" [ref=e16] [cursor=pointer]
        - button "×" [ref=e17] [cursor=pointer]
        - button "4" [ref=e18] [cursor=pointer]
        - button "5" [ref=e19] [cursor=pointer]
        - button "6" [ref=e20] [cursor=pointer]
        - button "−" [ref=e21] [cursor=pointer]
        - button "1" [ref=e22] [cursor=pointer]
        - button "2" [active] [ref=e23] [cursor=pointer]
        - button "3" [ref=e24] [cursor=pointer]
        - button "+" [ref=e25] [cursor=pointer]
        - button "0" [ref=e26] [cursor=pointer]
        - button "." [ref=e27] [cursor=pointer]
        - button "=" [ref=e28] [cursor=pointer]
    - generic [ref=e29]:
      - heading "Historique" [level=3] [ref=e30]
      - generic [ref=e31]: Aucune opération
```

# Test source

```ts
  1  | // e2e/calculator.spec.ts
  2  | import { test, expect, type Page } from '@playwright/test'
  3  | 
  4  | // Helpers réutilisables
  5  | async function clickBtn(page: Page, label: string) {
> 6  |   await page.getByRole('button', { name: label, exact: true }).click()
     |                                                                ^ Error: locator.click: Test timeout of 30000ms exceeded.
  7  | }
  8  | 
  9  | // Avant chaque test : naviguer à la racine
  10 | test.beforeEach(async ({ page }) => {
  11 |   await page.goto('/')
  12 | })
  13 | 
  14 | test.describe('Calculatrice +', () => {
  15 | 
  16 |   test('affiche 0 au chargement', async ({ page }) => {
  17 |     await expect(page.locator('.display-value')).toHaveText('0')
  18 |   })
  19 | 
  20 |   test('addition : 3 + 4 = 7', async ({ page }) => {
  21 |     await clickBtn(page, '3')
  22 |     await clickBtn(page, '+')
  23 |     await clickBtn(page, '4')
  24 |     await clickBtn(page, '=')
  25 |     await expect(page.locator('.display-value')).toHaveText('7')
  26 |   })
  27 | 
  28 |   test('soustraction : 3 - 4 = -1', async ({ page }) => {
  29 |     await clickBtn(page, '3')
  30 |     await clickBtn(page, '-')
  31 |     await clickBtn(page, '4')
  32 |     await clickBtn(page, '=')
  33 |     await expect(page.locator('.display-value')).toHaveText('-1')
  34 |   })
  35 | 
  36 |   test('soustraction : 3 * 4 = 12', async ({ page }) => {
  37 |     await clickBtn(page, '3')
  38 |     await clickBtn(page, '×')
  39 |     await clickBtn(page, '4')
  40 |     await clickBtn(page, '=')
  41 |     await expect(page.locator('.display-value')).toHaveText('12')
  42 |   })
  43 | 
  44 |   test('soustraction : 12 / 4 = 3', async ({ page }) => {
  45 |     await clickBtn(page, '1')
  46 |     await clickBtn(page, '2')
  47 |     await clickBtn(page, '/')
  48 |     await clickBtn(page, '4')
  49 |     await clickBtn(page, '=')
  50 |     await expect(page.locator('.display-value')).toHaveText('3')
  51 |   })
  52 | })
  53 | 
```