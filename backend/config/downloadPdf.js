
async function convertPdf(htmlContent, outputFile) {
    try {
        const broswer = await puppeteer.launch();
        const page = await broswer.newPage();

        //set content to the page
        await page.setContent(htmlContent);

        //generate pdf
        await page.pdf({ path: outputFile, format: 'A4' });
        await broswer.close();
        return 'PDF created successfully';

    } catch (error) {
        throw new Error(`PDF generation failed`, error);
    }
};

convertPdf(htmlCode, 'test.pdf').then((value) => {
    console.log(value);
}).catch((error) => {
    console.log(error);
})