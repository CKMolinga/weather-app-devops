const puppeteer = require('puppeteer')

describe('Weather App Functional Tests', () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    })

    page = await browser.newPage()
    await page.goto('http://localhost:8080')
  })

  afterAll(async () => {
    await browser.close()
  })

  // ✅ Test 1: Page loads
  test('Page loads successfully', async () => {
    const title = await page.title()
    expect(title).toBeTruthy()
  })

  // ✅ Test 2: Input field exists
  test('Search input is present', async () => {
    const input =
      (await page.$('.search-city')) || (await page.$('.mobile-search-city'))
    expect(input).not.toBeNull()
  })

  // ✅ Test 3: Weather search works
  test('User can search for a city', async () => {
    let selector = '.search-city'

    let input = await page.$(selector)

    if (!input) {
      selector = '.mobile-search-city'
    }

    await page.type(selector, 'London')

    await page.keyboard.press('Enter')

    await page.waitForTimeout(4000)

    const content = await page.content()

    expect(content).toMatch(/London/i)
  })
})
