"use client";
import { Document, Page, Text } from "@react-pdf/renderer";

function InvoicePDFDocument({ invoice }) {
  const { id } = invoice;

  const documentTitle = `Invoice #${id}`;
  const author = `Aemro Bekalu`;

  return (
    <Document title={documentTitle} author={author} subject="Invoice statement">
      <Page size={"A4"} orientation="portrait">
        <Text>Invoice app</Text>
      </Page>
    </Document>
  );
}

export default InvoicePDFDocument;
