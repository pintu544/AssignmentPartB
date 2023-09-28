// main.js
const scrapeBookData = require('./scraper/scraper');
const db = require('./db/db');

// URLs of all 50 pages of books
const pageUrls = Array.from({ length: 50 }, (_, i) => `http://books.toscrape.com/catalogue/page-${i + 1}.html`);

async function main() {
  for (const url of pageUrls) {
    await scrapeBookData(url);
  }

  // Close the database connection after all operations are completed
  db.close();
}

// Call the main function to start the scraping process
main();
