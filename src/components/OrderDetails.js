import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const bill = [
  { label: "Item Total", value: "\u20B93,04,500" },
  { label: "Discount", value: "-\u20B910,000" },
  { label: "Tax", value: "\u20B920,000" },
  { label: "Bill Total", value: "\u20B93,14,500" },
];

const outletInfo = [
  { label: 'Owner Name:', value: 'Kunal Singh' },
  { label: 'Outlet Name:', value: 'Kapruka' },
  { label: 'Phone no:', value: '+91 98765432110' },
  { label: 'Location:', value: 'Nugegoda' },
  { label: 'Email:', value: 'colombo.office@kapruka.com' },
  { label: 'Website:', value: 'Kapruka.com' },
];

const products = [
  {
    id: '1',
    name: "Governor’s Choice",
    type: 'Arrack',
    size: '750ml (Pack of 6)',
    quantity: 4,
    image: require('../assets/images/img.jpg'),
  },
  {
    id: '2',
    name: 'Navy Seal',
    type: 'Arrack',
    size: '750ml (Pack of 6)',
    quantity: 4,
    image: require('../assets/images/NavySeal.jpg'),
  },
];

const orderStatus = [
  {
    id: 1,
    title: 'Order Placed',
    date: 'Thu, 18 Jun 2024',
    time: '10:00 AM',
    active: true,
  },
  {
    id: 2,
    title: 'Order Dispatched',
    expected: 'Sat, 24 Jun 2024',
    active: true,
  },
  {
    id: 3,
    title: 'Order Dispatch Initiated',
    expected: 'Sat, 24 Jun 2024',
    active: false,
  },
  {
    id: 4,
    title: 'Order Delivered',
    expected: 'Sat, 24 Jun 2024',
    active: false,
  },
];

export function OrderDetails() {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.text}>Order Details</Text>

      <View style={styles.card}>
        {orderStatus.map((step, index) => {
          const isLast = index === orderStatus.length - 1;
          const nextStepActive = orderStatus[index + 1]?.active;

          return (
            <View key={step.id} style={styles.statusRow}>
              <View style={styles.iconColumn}>
                <Image
                  source={
                    step.active
                      ? require('../assets/icons/greenTick.png')
                      : require('../assets/icons/grey.png')
                  }
                  style={styles.statusIcon}
                />
                {!isLast && (
                  <View
                    style={[
                      styles.verticalLine,
                      (step.active && nextStepActive) && styles.greenLine,
                      (!step.active || !nextStepActive) && styles.greyLine,
                    ]}
                  />
                )}
              </View>
              <View style={styles.statusInfo}>
                <Text style={[styles.statusTitle, step.active ? styles.activeStatus : styles.inactiveStatus]}>
                  {step.title}
                </Text>
                <Text style={styles.statusSub}>
                  {step.date ? `${step.date}   ${step.time}` : `Expected by ${step.expected}`}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={require('../assets/icons/BuildingRetail.png')} style={styles.icons} />
          <Text style={styles.sectionTitle}>Outlet Info</Text>
        </View>
        {outletInfo.map((item, index) => (
          <View key={index} style={styles.detailRow}>
            <Text style={styles.outletLabel}>{item.label}</Text>
            <Text style={styles.outletValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={require('../assets/icons/Package.png')} style={styles.icons} />
          <Text style={styles.sectionTitle}>Order Summary</Text>
        </View>
        {products.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.imageOuter}>
              <View style={styles.imageInner}>
                <Image source={item.image} style={styles.productImage} />
              </View>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productSubText}>{item.type}</Text>
              <Text style={styles.productSubText}>{item.size}</Text>
            </View>
            <Text style={styles.qtyText}>Qty: {item.quantity}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={require('../assets/icons/DocumentText.png')} style={styles.icons} />
          <Text style={styles.sectionTitle}>Bill Summary</Text>
        </View>
        {bill.map((item, idx) => {
          const isDiscount = item.label === "Discount";
          const isTotal = item.label === "Bill Total";
          return (
            <View key={idx} style={styles.billRow}>
              <Text style={[styles.billLabel, isDiscount && styles.discountText, isTotal && styles.totalText]}>
                {item.label}
              </Text>
              <Text style={[styles.billValue, isDiscount && styles.discountText, isTotal && styles.totalText]}>
                {item.value}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={require('../assets/icons/DocumentText.png')} style={styles.icons} />
          <Text style={styles.sectionTitle}>Order Details</Text>
        </View>
        <View style={styles.detailRowSpace}>
          <Text style={styles.detailLabel}>Order ID:</Text>
          <Text style={styles.detailValue}>100092</Text>
        </View>
        <View style={styles.detailRowSpace}>
          <Text style={styles.detailLabel}>Mode of Payment:</Text>
          <Text style={styles.detailValue}>Cash</Text>
        </View>
        <View style={styles.detailRowSpace}>
          <Text style={styles.detailLabel}>Payment Status:</Text>
          <Text style={styles.detailValue}>Done</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: '#daecf5',
    borderRadius: 10,
    padding: 12,
    margin: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icons: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#777',
  },
  statusRow: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  iconColumn: {
    width: 40,
    alignItems: 'center',
    position: 'relative',
  },
  statusIcon: {
    width: 36,
    height: 36,
    zIndex: 2,
  },
  verticalLine: {
    position: 'absolute',
    top: 40,
    width: 2,
    height: 20,
    backgroundColor: '#ccc',
    zIndex: 1,
  },
  greenLine: {
    backgroundColor: '#7bcd12',
  },
  greyLine: {
    backgroundColor: '#ccc',
  },
  statusInfo: {
    marginLeft: 10,
    flex: 1,
  },
  statusTitle: {
    fontWeight: '600',
    fontSize: 15,
  },
  statusSub: {
    fontSize: 13,
    color: '#888',
  },
  activeStatus: {
    color: '#000',
  },
  inactiveStatus: {
    color: '#aaa',
  },
  detailRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 6,
  },
  detailRowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  detailLabel: {
    fontWeight: '500',
    color: '#727272',
  },
  detailValue: {
    fontWeight: '500',
    color: '#727272',
  },
  outletLabel: {
    fontWeight: '500',
    color: '#727272',
    flexShrink: 0,
    marginRight: 8,
  },
  outletValue: {
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    flexWrap: 'wrap',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  imageOuter: {
    width: 60,
    height: 60,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#d8d8d8',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginRight: 12,
  },
  imageInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 25,
  },
  itemInfo: {
    flex: 1,
  },
  productName: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 2,
  },
  productSubText: {
    fontSize: 13,
    color: '#666',
  },
  qtyText: {
    fontWeight: '600',
    color: '#333',
    marginLeft: 6,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  billLabel: {
    fontWeight: '500',
    color: '#727272',
  },
  billValue: {
    fontWeight: '500',
    color: '#727272',
  },
  discountText: {
    color: 'red',
  },
  totalText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
