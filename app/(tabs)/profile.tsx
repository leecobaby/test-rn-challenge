import React from 'react';
import { Alert } from 'react-native';
import { Profile } from '@/components/profile';

export default function ProfileTab() {
  const handleMenuPress = () => {
    Alert.alert('Menu', 'Menu button pressed');
  };

  const handleMorePress = () => {
    Alert.alert('More', 'More options');
  };

  const handleJoinPress = () => {
    Alert.alert('Join', 'Join Super Savings product');
  };

  const handleProductPress = (product: any) => {
    Alert.alert('Product', `Selected: ${product.name}\nRate: ${product.rate}`);
  };

  const handleComingSoonItemPress = (item: any) => {
    Alert.alert('Coming Soon', `${item.name} feature is coming soon!`);
  };

  const handleSeeAllPress = () => {
    Alert.alert('See All', 'View all products and features');
  };

  const handleTabPress = (tabId: string) => {
    Alert.alert('Tab', `Switched to ${tabId} tab`);
  };

  return (
    <Profile
      onMenuPress={handleMenuPress}
      onMorePress={handleMorePress}
      onJoinPress={handleJoinPress}
      onProductPress={handleProductPress}
      onComingSoonItemPress={handleComingSoonItemPress}
      onSeeAllPress={handleSeeAllPress}
      onTabPress={handleTabPress}
    />
  );
}
