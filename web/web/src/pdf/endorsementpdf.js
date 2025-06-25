import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts"; // No need to assign
import { localizeTime } from "../helpers/helper";
// import JsBarcode from "jsbarcode";

// const formatBarcodeText = (text) => {
//   return text.replace(/(\d{4})/g, "$1 ").trim();
// };
export const generateEndorsementPdf = (data) => {
  // Reusable layout for tables with only an outside border
    const docDefinition = {
    content: [
        {
        text: 'Republic of the Philippines\nProvince of Antique\nOffice of the Provincial Public Employment Service Manager\nSan Jose de Buenavista, Antique',
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 20]
        },
        {
        text: `\n\n${(new Date).toDateString()}\n${data.employer_data.contact_person}\n${data.employer_data.establishment}\n${data.employer_data.business_address}`,
        margin: [0, 0, 0, 10]
        },
        {
        text: 'Dear Mr./Mrs. ' + data.employer_data.contact_person,
        margin: [0, 0, 0, 10]
        },
        {
        text: `This pertains to the vacancy in your office for the position of ${data?.match?.position_title}. We are sending the attached resume for an interview and possible employment.`,
        style: 'body',
        margin: [0, 0, 0, 0]
        },
        // {
        // text: 'for an interview and possible employment.\n\nWe wish to inform you that the applicants have attended and completed the Contact Center Services NC II course as conducted by the Philippines Call Center Institute (PCCI) in partnership of the Office of the Provincial Public Employment Service Manager Province of Antique.\n\nThank you.',
        // style: 'body'
        // },
        {
        text: '\n\nVery truly yours,\n\nMYRA E. PE\nPGDH- Provincial PESO Manager\nProvince of Antique',
        style: 'signature',
        margin: [0, 20, 0, 30]
        },
        { canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ] },
        {
        text: '(RETURN SLIP)',
        style: 'returnSlipHeader',
        margin: [0, 10, 0, 10]
        },
        {
        text: [
            { text: 'PESO Manager Designate: ', bold: true },
            'Myra E. Pe\n',
            { text: 'Public Employment Service Office: ', bold: true },
            { text: 'Provincial Government of Antique', link: 'https://antique.gov.ph', color: 'blue' }
        ]
        },
        {
        table: {
            widths: ['auto', '*'],
            body: [
            ['Name of Applicant:', data.applicant.full_name],
            ['Position Applied for:', data?.match?.position_title],
            ['Name of Company:', data?.match?.employer_name],
            ['Was he/she accepted?', 'Yes ________________   No ________________'],
            ['Is the Position still vacant?', 'Yes ________________   No ________________'],
            ['Accomplished by:', '_______________________________________________'],
            ['Signature over printed name:', '_______________________________________________'],
            ['Designation:', '_______________________________________________'],
            ['Date Accomplished:', '_______________________________________________']
            ]
        },
        layout: 'noBorders',
        margin: [0, 10, 0, 0]
        }
    ],
    styles: {
        header: { fontSize: 12, bold: true },
        body: { fontSize: 11 },
        signature: { fontSize: 11 },
        returnSlipHeader: { alignment: 'center', bold: true, decoration: 'underline' }
    },
    defaultStyle: {
        font: 'Roboto'
    }
    };


  pdfMake.createPdf(docDefinition).open();
};
