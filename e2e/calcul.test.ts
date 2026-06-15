// e2e/calculator.spec.ts
import { test, expect, type Page } from '@playwright/test'

// Helpers réutilisables
async function clickBtn(page: Page, label: string) {
  await page.getByRole('button', { name: label, exact: true }).click()
}

// Avant chaque test : naviguer à la racine
test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('Calculatrice +', () => {

  test('affiche 0 au chargement', async ({ page }) => {
    await expect(page.locator('.display-value')).toHaveText('0')
  })

  test('addition : 3 + 4 = 7', async ({ page }) => {
    await clickBtn(page, '3')
    await clickBtn(page, '+')
    await clickBtn(page, '4')
    await clickBtn(page, '=')
    await expect(page.locator('.display-value')).toHaveText('7')
  })

  test('soustraction : 3 - 4 = -1', async ({ page }) => {
    await clickBtn(page, '3')
    await clickBtn(page, '−')
    await clickBtn(page, '4')
    await clickBtn(page, '=')
    await expect(page.locator('.display-value')).toHaveText('-1')
  })

  test('multiplication : 3 * 4 = 12', async ({ page }) => {
    await clickBtn(page, '3')
    await clickBtn(page, '×')
    await clickBtn(page, '4')
    await clickBtn(page, '=')
    await expect(page.locator('.display-value')).toHaveText('12')
  })

  test('division : 12 / 4 = 3', async ({ page }) => {
    await clickBtn(page, '1')
    await clickBtn(page, '2')
    await clickBtn(page, '÷')
    await clickBtn(page, '4')
    await clickBtn(page, '=')
    await expect(page.locator('.display-value')).toHaveText('3')
  })
})
