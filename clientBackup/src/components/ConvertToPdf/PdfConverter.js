import React,{useRef} from 'react'
import { Button } from "antd";
import html2pdf from 'html2pdf.js'

function PdfConverter(prop) {
    const {html} = prop
    const convertToPdf = () => {
		const content = html.current.children[1];

		const options = {
			filename: 'Report.pdf',
			margin: 1,
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: {
				unit: 'in',
				format: 'letter',
				orientation: 'portrait',
			},
		};

		html2pdf().set(options).from(content).save();
	}
  return (
    <div>
        <Button onClick={convertToPdf}>Print Report</Button>
    </div>
  )
}

export default PdfConverter