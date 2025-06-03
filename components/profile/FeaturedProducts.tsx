import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface Product {
  id: string;
  name: string;
  description: string;
  rate: string;
  icon: string;
  iconColor: string;
  backgroundColor: string;
}

interface FeaturedProductsProps {
  products?: Product[];
  onProductPress?: (product: Product) => void;
  onSeeAllPress?: () => void;
}

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Super Savings',
    description: 'build savings overtime, withdraw anytime, low min. deposits',
    rate: '5.60% p.a.',
    icon: '🏔️',
    iconColor: '#4CAF50',
    backgroundColor: '#E8F5E8',
  },
  {
    id: '2',
    name: 'Super Growth',
    description: 'grow savings with premium and passive income, withdraw anytime',
    rate: '13.2% p.a.',
    icon: '📈',
    iconColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  {
    id: '3',
    name: 'Term Deposit',
    description: 'locked in interest rate, 1 year fixed term',
    rate: '23% p.a.',
    icon: '🎯',
    iconColor: '#FF9800',
    backgroundColor: '#FFF3E0',
  },
];

export function FeaturedProducts({ products = defaultProducts, onProductPress, onSeeAllPress }: FeaturedProductsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Featured Products</Text>
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.productsList} showsVerticalScrollIndicator={false}>
        {products.map(product => (
          <TouchableOpacity key={product.id} style={styles.productCard} onPress={() => onProductPress?.(product)}>
            <View style={styles.productContent}>
              <View style={[styles.iconContainer, { backgroundColor: product.backgroundColor }]}>
                <Text style={styles.iconText}>{product.icon}</Text>
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
              </View>

              <View style={styles.rateContainer}>
                <Text style={styles.rateText}>{product.rate}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '500',
  },
  productsList: {
    flex: 1,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 24,
  },
  productInfo: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  rateContainer: {
    alignItems: 'flex-end',
  },
  rateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
