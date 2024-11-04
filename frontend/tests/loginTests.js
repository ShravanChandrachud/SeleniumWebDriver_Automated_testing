// loginTests.js
import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

/* eslint-env mocha */

describe("Login Page Tests", function () {
    let driver;

    before(async function () {
        this.timeout(10000);
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('http://localhost:3000');
    });

    after(async function () {
        await driver.quit();
    });

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    it("should load login page", async function () {
        this.timeout(5000);
        await driver.wait(until.titleIs('Login'), 5000);
        const title = await driver.getTitle();
        expect(title).to.include("Login");
        await delay(3000);
    });

    it("should login successfully with valid credentials", async function () {
        this.timeout(5000);
        await driver.findElement(By.id("username")).sendKeys("testuser");
        await driver.findElement(By.id("password")).sendKeys("password123");
        await driver.findElement(By.id("submit")).click();
        const successMsg = await driver.wait(until.elementLocated(By.id("success-msg")), 5000);
        const isDisplayed = await successMsg.isDisplayed();
        expect(isDisplayed).to.equal(true);
        await delay(3000);
    });

    it("should display error for invalid credentials", async function () {
        this.timeout(5000);
        await driver.findElement(By.id("username")).sendKeys("wronguser");
        await driver.findElement(By.id("password")).sendKeys("wrongpassword");
        await driver.findElement(By.id("submit")).click();
        const errorMsg = await driver.wait(until.elementLocated(By.id("error-msg")), 5000);
        const isDisplayed = await errorMsg.isDisplayed();
        expect(isDisplayed).to.equal(true);
        await delay(3000);
    });
});
