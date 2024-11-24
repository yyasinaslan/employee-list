import {expect, test} from '@playwright/test';

test('should go to employee list page', async ({page}) => {
    await page.goto('/');

    const employeesLink = page.getByRole('link', {name: 'Employees'})
    await employeesLink.click();
    await page.waitForTimeout(1000)

    // Expect a title "to contain" a substring.
    expect(page.url()).toMatch('/employees');
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();
//
//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
