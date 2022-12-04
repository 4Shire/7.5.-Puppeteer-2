module.exports = {
  getDays: async function (page, number) {
    try {
      let selector = `nav > a:nth-child(${number}) > span.page-nav__day-number`;
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  getMovieTime: async function (page, movie, time) {
    try {
      let selector = `body > main > section:nth-child(${movie}) > div:nth-child(${time}) > ul > li > a`;
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  getSeats: async function (page, row, seat) {
    try {
      let selector = `main > section div:nth-child(${row}) > span:nth-child(${seat})`;
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  getHall: async function (page, film, hall) {
    try {
      const linkToHall = `section:nth-child(${film}) > div:nth-child(${hall}) > ul > li > a`;
      await page.waitForSelector(linkToHall);
      await page.click(linkToHall);
      await page.waitForSelector("div.buying-scheme", {
        visible: true,
      });
    } catch (error) {
      throw new Error("The movie or hall is specified incorrectly");
    }
  },
};
