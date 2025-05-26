import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export function ViewDetails() {
  const data = [
    {
      image: require('../assets/images/img.jpg'),
      title: 'Governors Choice',
      subtitle: 'Arrack',
      price: {
        type: ['MRP', 'PTR', 'Margin', 'Stock'],
        value: ['\u20B94,000', '\u20B93980', '13.78%', '5002'],
      },
    },
  ];

  return (
    <View>
      {data.map((item, index) => (
        <View key={index} style={styles.item}>
          <View style={{ backgroundColor: '#D3D3D3', marginBottom: 10 }}>
            <Image source={item.image} style={styles.image} />
          </View>

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>

          <View style={styles.row}>
            {item.price.type.map((type, i) => (
              <View key={i} style={styles.cell}>
                <Text style={styles.type}>{type}</Text>
              </View>
            ))}
          </View>

          <View style={styles.row}>
            {item.price.value.map((value, i) => (
              <View key={i} style={styles.cell}>
                <Text style={styles.value}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      <Text style={styles.paragraph}>
        Governor’s Choice is as refined, revered and respected as Governors of Ceylon past. Our Master
        Blenders have meticulously blended 22% coconut arrack in a whisky style to produce a well-balanced
        and distinctive flavour profile. Made to celebrate in style – The Governor’s choice of export
        quality blend.
      </Text>

      <Text style={styles.heading}>Tasting Notes</Text>
      <Text style={styles.paragraph}>
        Blended in a whisky style to suit the modern palate. Well balanced and exceptionally smooth.
      </Text>

      <Text style={styles.heading}>Signature Serve</Text>
      <Text style={styles.paragraph}>
        Drunk on its own, on the rocks or topped up with your favourite chaser.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    marginLeft: 10,   
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 10, 
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  cell: {
    flex: 1,
  },
  type: {
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 10,    
  },
  value: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,  
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 10,   
  },
  heading: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,  
  },
});
