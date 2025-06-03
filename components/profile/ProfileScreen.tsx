import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ProfileHeader } from './ProfileHeader';
import { FeaturedProducts } from './FeaturedProducts';
import { ComingSoon, ProfileTabBar } from './ComingSoon';

interface ProfileScreenProps {
  onMenuPress?: () => void;
  onMorePress?: () => void;
  onJoinPress?: () => void;
  onProductPress?: (product: any) => void;
  onComingSoonItemPress?: (item: any) => void;
  onSeeAllPress?: () => void;
  onTabPress?: (tabId: string) => void;
  triggerElement?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ProfileScreen({
  onMenuPress,
  onMorePress,
  onJoinPress,
  onProductPress,
  onComingSoonItemPress,
  onSeeAllPress,
  onTabPress,
  open = true,
}: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState('earn');

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    onTabPress?.(tabId);
  };

  const handleJoinPress = () => {
    console.log('Join button pressed');
    onJoinPress?.();
  };

  const handleMenuPress = () => {
    console.log('Menu button pressed');
    onMenuPress?.();
  };

  const handleMorePress = () => {
    console.log('More button pressed');
    onMorePress?.();
  };

  const handleProductPress = (product: any) => {
    console.log('Product pressed:', product.name);
    onProductPress?.(product);
  };

  const handleComingSoonItemPress = (item: any) => {
    console.log('Coming soon item pressed:', item.name);
    onComingSoonItemPress?.(item);
  };

  const handleSeeAllPress = () => {
    console.log('See all pressed');
    onSeeAllPress?.();
  };

  return open ? (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} bounces={false}>
        <ProfileHeader
          title="Gluon"
          subtitle="Super Savings - withdraw anytime"
          percentage="5.6%"
          saversCount="12,510 Savers"
          onJoinPress={handleJoinPress}
          onMenuPress={handleMenuPress}
          onMorePress={handleMorePress}
        />

        <View style={styles.contentContainer}>
          <FeaturedProducts onProductPress={handleProductPress} onSeeAllPress={handleSeeAllPress} />

          <ComingSoon onItemPress={handleComingSoonItemPress} onSeeAllPress={handleSeeAllPress} />
        </View>
      </ScrollView>

      <ProfileTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </SafeAreaView>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
});
