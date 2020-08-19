// import knex from 'knex';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import jsonfile from 'jsonfile'


async function test2() {
    await (async () => {
        const browser = await puppeteer.launch({
            // headless: false,
            args: [`–no - sandbox`, `–disable - setuid - sandbox`],
            ignoreDefaultArgs: [`–disable - extensions`]
        })

        // const knexConfig = require("./knexfile");
        // const Knex = knex(knexConfig[process.env.NODE_ENV || "development"]);
        // await Knex.raw(/* sql */`DELETE FROM hacker`);
       


            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0);
            await page.goto('https://news.ycombinator.com/news')

           

            // await page.waitForSelector('#intercom-container')
            await page.waitFor(2 * 1000);

            let body = await page.content()

            let $ = await cheerio.load(body)
            const memos = await jsonfile.readFile('./news.json')
            // const memos = (await Knex.raw(/* sql */`SELECT * FROM hacker`)).rows;
            let table =$(".athing")
            let subtitle =$('.subtext')
            // let span=$('span')
            let i,j
            for (i=1,j=3; i<table.length;i++,j+=4){
                const id =i
                const title=table.find('a.storylink').eq(i).text().trim()
                const points=subtitle.find('.score').eq(i).text().trim()
                const author=subtitle.find('.hnuser').eq(i).text().trim()
                const time =subtitle.find('.age').eq(i).text().trim()
                const numberofcomment=subtitle.find('a').eq(j).text().trim()
                const weblink=table.find('a.storylink').eq(i).attr('href')
                memos.push(Object.assign({id,title,points,author,time,numberofcomment,weblink}))
               
            }
            console.log(memos)
       
            // await Knex.raw(/* sql */`DELETE FROM hacker`);

            // for (let i = 0; i < memos.length; i++) {
            //     await Knex.raw(/*sql*/`INSERT INTO hacker 
            //     (title,points,author,time,numberOfComment) VALUES (?,?,?,?,?)`
            //         , [memos[i].title, memos[i].points, memos[i].author, memos[i].time, memos[i].numberofcomment]);
            


        
        // await Knex.destroy()
        await browser.close()
        await jsonfile.writeFile('./news.json',memos)

    })();

  
        


}

test2();