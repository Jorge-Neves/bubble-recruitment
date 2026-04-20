const assert = require('assert');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Sword form - Form Validation Tests', function () {
  this.timeout(30000);

  let driver;

  beforeEach(async function () {
    const options = new chrome.Options();
    // TODO : Uncomment after review meeting
    // options.addArguments('--headless=new');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.get('http://localhost:3000');
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('blank submit shows validation errors', async function () {
    const submit = await driver.findElement(
      By.css('input[type="submit"][value="Submit"]')
    );
    await submit.click();

    await driver.wait(until.elementLocated(By.css('.error-message')), 5000);

    const errors = await driver.findElements(By.css('.error-message'));
    assert.ok(errors.length > 0, 'Expected at least one validation error');

    const thankYou = await driver.findElements(
      By.xpath("//*[contains(text(),'Thank you for your time!')]")
    );
    assert.strictEqual(thankYou.length, 0, 'Modal should not open');
  });

  it('invalid email shows validation errors', async function () {
    await driver
      .findElement(By.css('input[placeholder="Email"]'))
      .sendKeys('abc');
    await driver
      .findElement(By.css('input[placeholder="First Name"]'))
      .sendKeys('Paulo');
    await driver
      .findElement(By.css('input[placeholder="Last Name"]'))
      .sendKeys('Silva');
    await driver
      .findElement(By.css('input[placeholder="Phone Number"]'))
      .sendKeys('912345678');

    const submit = await driver.findElement(
      By.css('input[type="submit"][value="Submit"]')
    );
    await submit.click();

    await driver.wait(until.elementLocated(By.css('.error-message')), 5000);

    const errors = await driver.findElements(By.css('.error-message'));
    assert.ok(errors.length > 0, 'Expected validation error for bad email');

    const thankYou = await driver.findElements(
      By.xpath("//*[contains(text(),'Thank you for your time!')]")
    );
    assert.strictEqual(thankYou.length, 0, 'Modal should not open');
  });

  it('fields accept correct inputs', async function () {
    const email = await driver.findElement(
      By.css('input[placeholder="Email"]')
    );
    const firstName = await driver.findElement(
      By.css('input[placeholder="First Name"]')
    );
    const lastName = await driver.findElement(
      By.css('input[placeholder="Last Name"]')
    );
    const phone = await driver.findElement(
      By.css('input[placeholder="Phone Number"]')
    );

    await email.sendKeys('paulo@example.com');
    await firstName.sendKeys('Paulo');
    await lastName.sendKeys('Silva');
    await phone.sendKeys('912345678');

    //TODO : Remove after followup meeting
    await driver.sleep(10000);

    assert.strictEqual(await email.getAttribute('value'), 'paulo@example.com');
    assert.strictEqual(await firstName.getAttribute('value'), 'Paulo');
    assert.strictEqual(await lastName.getAttribute('value'), 'Silva');
    assert.strictEqual(await phone.getAttribute('value'), '912345678');
  });
});
