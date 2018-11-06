var request = require('request');
var cheerio = require('cheerio');
var fs = request('fs');

const writeStream = fs.createWriteStream('./post.csv')

//Write Headers
writeStream.write(`Title, Link, Date\n`) //We didnt scrape date

request('https://www.asos.com/search/?q=women', (error, response, html) => {
    if(!error && response.statusCode === 200){
        const $ = cheerio.load(html)

        const centralLogo = $('.central-textlogo-wrapper')

        // console.log(centralLogo.html())
        // console.log(centralLogo.text())

        // const output = centralLogo.find('div').text()
        // const output = centralLogo.children('div').text()

        // const output = centralLogo
        //     .children('div')
        //     .next()
        //     .text()

        // const output = centralLogo
        //     .children('div')
        //     .parent()
        //     .text()

        // console.log(output)

        $('._2oHs74P a').each((i, el) => {
            const title = $(el)
                .find('ariel-label')
                .text
                .replace(/\s\s+/g, '') //gets rid of all the white spaces

            const link = $(el)
                .find('a')
                .attr('href')

            //Write Row to CSV
            writeStream.write(`${title}, ${link}`) //We did nt scrape date
        })
        console.log('Scraping done...')
    }else console.log(error)
})

// (async () => {
//
//     for (let i =0; i < 500; i++){
//         await new Promise(resolve => {
//             setTimeout(() => {
//                 resolve()
//             }, 300)
//         })
//         window.scrollBy(0, 100)
//
//     }
//
// })()