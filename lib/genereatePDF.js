
const PDFDocument = require('./pdfkit-tables');
const fs = require('fs');
console.log('pdf generator');

function pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }

function generatePDF (res,tableData,fileName, clientDetails,officeaddress) {

	 return new Promise((resolve, reject) =>{
		let date = new Date();
		date.setDate(date.getDate() + parseInt(officeaddress.Terms));
		console.log(clientDetails.ct_invoice_number);
		let invoiceNo = parseInt(clientDetails.ct_invoice_number);
		invoiceNo = invoiceNo + 1;
		invoiceNo = pad(invoiceNo, 6)
		console.log(invoiceNo);
		invoiceNo = clientDetails.ct_invoice_prefix + invoiceNo;
	 	const doc = new PDFDocument;
		

        //var writeStream = fs.createWriteStream('./Payslips/output.pdf');
         var writeStream = fs.createWriteStream('./Payslips/' + fileName + '.pdf');
        const stream = doc.pipe(writeStream);



            doc.fontSize(14).font('Times-Bold').text('Invoice',{
                        align:'right'
                });

                    doc.image('./Payslips/logo.png', 495, 90, {width: 50});

                    doc.fontSize(12).font('Times-Bold').text('Cambridge Care Services', 50,80, {
                                margin:50,
                                align:'left',
    
                })
        doc.fontSize(10).font('Times-Roman').text(officeaddress.Street_No_Name);
        doc.text(officeaddress.City_PinCode);
        doc.text(officeaddress.Tel_No);
        doc.fillColor('blue').text(officeaddress.Email);
        doc.text(officeaddress.Website);
        doc.fillColor('black').text(officeaddress.Company_Reg_No);
        doc.text(officeaddress.VAT_Reg_No);

        doc.fontSize(10).font('Times-Bold').text(`INVOICE NO: ${invoiceNo}`, 350,200, {
                    align:'right',
    
        });
        doc.text( `Date : ${new Date().toISOString().slice(0,10)}` , {
            align:'right'
        });
        doc.text(`Due Date: ${date.toISOString().slice(0,10)}`,{
            align:'right'
        });
        doc.text( `TERMS: ${officeaddress.Terms} Days`,{
            align:'right'
		});


 
doc.moveDown(2); 

doc.fontSize(12).font('Times-Bold').text('INVOICE TO' ,50,200);
doc.fontSize(10).font('Times-Roman').text(clientDetails.ct_name);
doc.text(clientDetails.ct_street_name);
doc.text(clientDetails.ct_street_number);
doc.text(clientDetails.ct_city_name);
doc.text(clientDetails.ct_pincode);
doc.text('                        ');


        doc.moveDown(2);

        doc.moveTo(50, 300)
                        .lineTo(550,300)
                        .lineWidth(0.5)
                        .opacity(0.7)
                        .stroke()
                        .opacity(1);

        doc.text('Please make payment payable to “Cambridge Care Services Limited"',{
            align:"center",
        })
        doc.text(`${officeaddress.Bank_Name} – Account No: ${officeaddress.Account_Number} – Sort Code: ${officeaddress.Sort_Code}`,{
            align:"center",
        })

        doc.moveTo(50, 330)
                        .lineTo(550,330)
                        .lineWidth(0.5)
                        .opacity(0.7)
                        .stroke()
                        .opacity(1);

        doc.moveDown(2);

        const table0 = {
            headers: ['S.No', 'Place', 'Service','Description','Hours','Hourly Rates(€)','Amount(€)','VAT'],
            rows: tableData,
        };



        doc.table(table0, {
            prepareHeader: () => doc.font('Helvetica-Bold').fontSize(7),
            prepareRow: (row, i) => doc.font('Helvetica').fontSize(5)
        });

        doc.moveDown(2)

        doc.fontSize(10).text('THANK YOU FOR YOUR BUSINESS!',{
            align:"center",
        })


        doc.moveDown();

        doc.fontSize(10).font('Times-Bold').text('Payment Terms',{
            align:"left",
        })
        doc.fontSize(10).font('Times-Roman').text(officeaddress.Payment_Terms ,{
            align:"left",
        })
        doc.fontSize(10).font('Times-Bold').text('VAT Exemption Certificate',{
            align:"left",
        })
        doc.fontSize(10).font('Times-Roman').text('Please kindly send us your VAT exemption certificate, if applicable.',{
            align:"left",
        })

        doc.end();  
       
        stream.on("finish", () => {
        	console.log("resolve pdf")
         	resolve(true); }); // not sure why you want to pass a boolean
   		// stream.on("error", () => {
     //    	console.log("reject pdf")
     //     	reject(true); }); // don't forget this!

      })

}
module.exports = {generatePDF};

