/*
Scrape every single link for Men and Women, then store the links into an array.

Loop through the array and for each link call function
scrape(link){
    navigate to page
    scrape data
    store to db

algorithm will run every day / week

check for new links every week

make a price graph for that item
 */
const scrapeLinks = () => {
    links = []

    for (let i = 1; i < document.querySelector('#plp > div > div._3JNRYc8 > div > div._3-pEc3l > section').children.length; i++) {
        links.push(document.querySelector('#plp > div > div._3JNRYc8 > div > div._3-pEc3l > section > article:nth-child(' + i + ') > a').href)
    }

    for (let i = 1; i < document.querySelector('#plp > div > div._3JNRYc8 > div > div._3-pEc3l > section > div').children.length + 1; i++) {
        links.push(document.querySelector('#plp > div > div._3JNRYc8 > div > div._3-pEc3l > section > div > article:nth-child(' + i + ') > a').href)
    }

    return links
}

const findNumberOfPages = () => {
    all = parseInt(document.querySelector('#plp > div > div._3JNRYc8 > div > p').innerText.split(" ")[0].replace(/,/g, ''))
    return Math.ceil(all/72)
}

const scrapeWomenData = () => {
    const link = 'https://www.asos.com/search/?page=' + i + '&q=women'
}