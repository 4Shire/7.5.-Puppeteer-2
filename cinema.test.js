const {
  default: test_case_runner,
} = require("cucumber/lib/runtime/test_case_runner");
const { clickElement, getText } = require("./lib/commands");
const { getDays, getMovieTime, getSeats, getHall } = require("./lib/util.js");

let page;

describe("Buying a movie ticket", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await page.setDefaultNavigationTimeout(60000);
  });

  afterEach(async () => {
    await page.close();
  });

  test("Should buy one ticket", async () => {
    await getDays(page, "3");
    await getMovieTime(page, "1", "2");
    await page.waitForSelector("h1");
    await getSeats(page, "6", "5");
    await clickElement(page, "button");
    await page.waitForSelector("h1");
    const actual = await getText(page, "h2");
    expect(actual).toContain("Вы выбрали билеты:");
  });

  test("Should book two ticket", async () => {
    await getDays(page, "5");
    await getMovieTime(page, "2", "3");
    await page.waitForSelector("h1");
    await getSeats(page, "1", "7");
    await getSeats(page, "1", "8");
    await clickElement(page, "button");
    await page.waitForSelector("h1");
    const actual = await getText(page, "h2");
    expect(actual).toContain("Вы выбрали билеты:");
  });

  test("Inactive booking button", async () => {
    await getDays(page, "2");
    await getHall(page, "1", "3");

    const actual = await page.$eval("button", (link) =>
      link.hasAttribute("disabled")
    );
    expect(actual).toBe(true);
  });
});
