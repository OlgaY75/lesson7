// @ts-check
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

test('nova poshta search', async ({}) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.pause();
  await page.goto('https://novaposhta.ua/');
  await page.getByRole('link', { name: 'Відділення', exact: true }).click();
  await page.getByRole('link', { name: 'Пошук за адресою' }).click();
  await page.getByPlaceholder('Вкажіть адресу').click();
  await page.getByPlaceholder('Вкажіть адресу').fill('васильківська');
  await page.getByText('вулиця ВасильківськаKyiv,').click();
  await page.getByRole('link', { name: 'Київ, пров. Коломийський, 17/31а, під\'їзд №3 (ТІЛЬКИ ДЛЯ МЕШКАНЦІВ)' }).click()
  await page.close();
  await browser.close;
});

test('nova poshta calculate', async ({}) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.pause();
  await page.goto('https://novaposhta.ua/');
  const context = await browser.newContext();
  await page.getByRole('link', { name: 'Вартість доставки' }).click();
  await page.getByRole('insertion').first().click();
  await page.locator('#delivery_sender_cities li').filter({ hasText: 'Вінниця' }).click();
  await page.getByLabel('Місто-одержувач').click();
  await page.locator('#delivery_recipient_cities li').filter({ hasText: 'Київ' }).click();
  await page.locator('input[name="DeliveryForm\\[optionsSeat\\]\\[1\\]\\[cost\\]"]').click();
  await page.locator('input[name="DeliveryForm\\[optionsSeat\\]\\[1\\]\\[cost\\]"]').fill('100');
  await page.locator('input[name="DeliveryForm\\[optionsSeat\\]\\[1\\]\\[weight\\]"]').click();
  await page.locator('input[name="DeliveryForm\\[optionsSeat\\]\\[1\\]\\[weight\\]"]').fill('1');
  await page.locator('#add-pack').check();
  await page.locator('input[name="DeliveryForm\\[packing\\]\\[1\\]\\[packType\\]"]').click();
  await page.locator('li').filter({ hasText: 'Великий пакет для одягу (4 кг)' }).click();
  await page.getByRole('button', { name: 'Розрахувати вартість' }).click();
  await page.close();
  await browser.close;
});

test('silpo cinotyzhky', async ({}) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.pause();
  await page.goto('https://shop.silpo.ua/');
  await expect(page.getByRole('link', { name: 'Цінотижики' })).toBeVisible();
  await page.close();
  await browser.close;
});

test('silpo search', async ({}) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.pause();
  await page.goto('https://shop.silpo.ua/');
  const context = await browser.newContext();
  await page.getByPlaceholder('Я шукаю').click();
  await page.getByPlaceholder('Я шукаю').fill('milky way');
  await page.getByPlaceholder('Я шукаю').press('Enter');
  await expect(page.getByRole('link', { name: 'Печиво Milky Way з шоколадом' })).toBeVisible();
  await page.close();
  await browser.close;
});