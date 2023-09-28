// src/scraper/scraper.js
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../db/db');

async function scrapeBookData(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    $('article.product_pod').each((index, element) => {
    //   const title = $(element).find('h3 a').attr('title');
    //   const price = parseFloat($(element).find('div p.price_color').text().replace('Â', '').replace('£', ''));
    //   const availability = $(element).find('div p.availability').text().trim();
    //   const rating = $(element).find('div p.star-rating')['class'][1];
      const title = $(element).find('h3 a').attr('title');
      const price = parseFloat($(element).find('div p.price_color').text().replace('Â', '').replace('£', ''));
      const availability = $(element).find('div p.availability').text().trim();
      const ratingElement = $(element).find('div p.star-rating');
      const rating = ratingElement.length > 0 ? ratingElement.attr('class').split(' ')[1] : 'N/A';
    
      // Insert book data into the database
      db.serialize(() => {
        const stmt = db.prepare('INSERT INTO books (title, price, availability, rating) VALUES (?, ?, ?, ?)');
        stmt.run(title, price, availability, rating);
        stmt.finalize();
      });
    });

    console.log('Book data scraped and stored successfully.');
  } catch (error) {
    console.error('Error scraping book data:', error);
  } finally {
    db.close();
  }
}

module.exports = scrapeBookData;
