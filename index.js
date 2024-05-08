import axios from "axios";
import { load } from "cheerio";

import xlsx from "xlsx";


const url = "https://www.bewakoof.com/classic-t-shirt-for-men";

(async ()=>{
    const reponse = await axios.get(url);
    // console.log(reponse.data);

    const html = reponse.data;

    const j$ = load(html);
    const data = [];
    data.push(['Name', 'Price', 'Rating'])

    const details = j$('.productCardBox')
    console.log(details.length);
    details.each((_,ele)=>{
        const container = j$(ele);

        const name = container.find('h2').text();
        const price = container.find('.discountedPriceText').text();
        const rating = container.find('.clr-shade-3').text()
        console.log("name: " + name + " price: " + price + " rating: " + rating);

        data.push([name, price, rating]);
    })

    const workbook = xlsx.utils.book_new();

    const sheet = xlsx.utils.aoa_to_sheet(data);
    xlsx.utils.book_append_sheet(workbook, sheet, 'Scraped data');
    xlsx.writeFile(workbook,'bewakoof.xlsx',)
    console.log("done!");
})()