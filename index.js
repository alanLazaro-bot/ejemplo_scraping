
const puppeteer = require('puppeteer');


(async ()=> {

    const browser = await puppeteer.launch({headless : true}); //Se abre un nevagador

    const page = await browser.newPage(); //se abre una pestaña

    await page.goto('https://www.mercadolibre.com.ar'); //nos llega a una pagina en particular
    
    await page.type('.nav-search-input', 'teclado razer');
  
    await page.click('.nav-search-btn');

    await page.waitForSelector('.ui-search-result__content-wrapper')
    await page.waitForTimeout(2000)
    await page.screenshot({path: 'meli3.jpg'}); //toma una captura de pantalla

    const enlaces = await page.evaluate(()=>{

            const elements = document.querySelectorAll('.ui-search-result__content-wrapper a')

            const links = [];

            for(let element of elements){
                links.push(element.href);
            }
            return links;

    });

    
    const products = [];
    for(let enlace of enlaces){

        await page.goto(enlace);
        await page.waitForSelector("h1")
        

        const product = await page.evaluate(()=>{
            const tmp = {};
            tmp.title = document.querySelector('h1').innerText;
            
           tmp.price = document.querySelector(".price-tag-fraction").innerText;
            

            return tmp;
        })
        products.push(product);
    }

   console.log(products)

    await browser.close() //cierra el navegador


    
}) ();
