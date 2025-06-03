import React, { useState } from 'react';
import { Drawer } from 'vaul';
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
  triggerElement?: React.ReactNode; // Web 端可以自定义触发元素
  open?: boolean; // Web 端可以控制默认打开状态
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
  triggerElement,
  open = false,
  onOpenChange,
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

  const ProfileContent = () => (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Profile Header */}
      <div className="flex-shrink-0">
        <ProfileHeader
          title="Gluon"
          subtitle="Super Savings - withdraw anytime"
          percentage="5.6%"
          saversCount="12,510 Savers"
          onJoinPress={handleJoinPress}
          onMenuPress={handleMenuPress}
          onMorePress={handleMorePress}
        />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full bg-gray-50">
          <FeaturedProducts onProductPress={handleProductPress} onSeeAllPress={handleSeeAllPress} />

          <ComingSoon onItemPress={handleComingSoonItemPress} onSeeAllPress={handleSeeAllPress} />
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex-shrink-0">
        <ProfileTabBar activeTab={activeTab} onTabPress={handleTabPress} />
      </div>
    </div>
  );

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} shouldScaleBackground>
      {/* <Drawer.Trigger asChild={!!triggerElement}>{triggerElement}</Drawer.Trigger> */}
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-white flex flex-col fixed bottom-0 left-0 right-0 h-[96%] mt-24 rounded-t-[20px]">
          {/* Drawer Handle */}
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4 mt-4" />

          {/* Hidden title for accessibility */}
          <Drawer.Title className="sr-only">Profile Dashboard</Drawer.Title>

          {/* Profile Content */}
          <div className="flex-1 overflow-hidden">
            <ProfileContent />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
