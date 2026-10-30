"use client";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { formatDate } from "../../lib/utils/formatters";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 25,
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#DFE3FA",
  },
  invoiceId: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0c0e16",
  },
  description: {
    color: "#7e88c3",
    marginTop: 4,
  },
  addressBlock: {
    alignItems: "flex-end",
  },
  addressText: {
    color: "#494e6e",
    lineHeight: 0.9,
  },
  billingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  label: {
    color: "#7e88c3",
    marginBottom: 6,
  },
  value: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0c0e16",
  },
  dateBlock: {
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#DFE3Fa",
  },
  headerText: {
    fontSize: 9,
    fontWeight: "bold",
  },
  colName: {
    flex: 3,
    color: "#5f6b7a",
  },
  colQty: {
    flex: 1,
    color: "#5f6b7a",
    textAlign: "center",
  },
  colPrice: {
    flex: 1.5,
    textAlign: "right",
    color: "#5f6b7a",
  },
  colTotal: {
    flex: 1.5,
    textAlign: "right",
    fontWeight: "bold",
    color: "#5f6b7a",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  itemTitle: {
    fontWeight: "bold",
    color: "#0c0e16",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#373b53",
    padding: 24,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  totalLabel: {
    color: "#fff",
  },
  totalAmount: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

function InvoicePDFDocument({ invoice }) {
  const {
    id: invoiceId,
    description,
    senderAddress,
    clientAddress,
    paymentDue,
    createdAt,
    clientName,
    clientEmail,
    items,
    total,
  } = invoice;

  const documentTitle = `Invoice #${invoiceId}`;
  const author = `Aemro Bekalu`;

  return (
    <Document title={documentTitle} author={author} subject="Invoice statement">
      <Page size={"A4"} orientation="portrait" style={styles.page}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.invoiceId}>#{invoiceId}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          <View style={styles.addressBlock}>
            <Text style={styles.addressText}>{senderAddress.street}</Text>
            <Text style={styles.addressText}>{senderAddress.city}</Text>
            <Text style={styles.addressText}>{senderAddress.postCode}</Text>
            <Text style={styles.addressText}>{senderAddress.country}</Text>
          </View>
        </View>

        {/* Billing Section */}
        <View style={styles.billingContainer}>
          <View>
            <View style={styles.dateBlock}>
              <Text style={styles.label}>Invoice Date</Text>
              <Text style={styles.value}>{formatDate(createdAt)}</Text>
            </View>

            <View>
              <Text style={styles.label}>Payment Due</Text>
              <Text style={styles.value}>{formatDate(paymentDue)}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.label}>Bill to</Text>
            <Text
              style={[
                styles.value,
                {
                  marginBottom: 10,
                },
              ]}
            >
              {clientName}
            </Text>

            <Text style={styles.addressText}>{clientAddress?.street}</Text>
            <Text style={styles.addressText}>{clientAddress?.city}</Text>
            <Text style={styles.addressText}>{clientAddress?.postCode}</Text>
            <Text style={styles.addressText}>{clientAddress?.country}</Text>
          </View>

          <View>
            <Text style={styles.label}>Sent to</Text>
            <Text style={styles.value}>{clientEmail}</Text>
          </View>
        </View>

        {/* Line Items Section */}
        <View>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, styles.colName]}>Item Name</Text>
            <Text style={[styles.headerText, styles.colQty]}>QTY.</Text>
            <Text style={[styles.headerText, styles.colPrice]}>Price</Text>
            <Text style={[styles.headerText, styles.colTotal]}>Total</Text>
          </View>
        </View>

        {items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text
              style={[
                styles.itemTitle,
                styles.colName,
                {
                  color: "#0c0e16",
                },
              ]}
            >
              {item.name}
            </Text>
            <Text style={styles.colQty}>{item.quantity}</Text>
            <Text style={styles.colPrice}>$ {item.price.toFixed(2)}</Text>
            <Text
              style={[
                styles.colTotal,
                {
                  color: "#0c0e16",
                },
              ]}
            >
              $ {item.total.toFixed(2)}
            </Text>
          </View>
        ))}

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Amount</Text>
          <Text style={styles.totalAmount}>$ {total.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default InvoicePDFDocument;
