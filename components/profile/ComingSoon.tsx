import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ComingSoonItem {
  id: string;
  name: string;
  icon: string;
  backgroundColor: string;
}

interface ComingSoonProps {
  items?: ComingSoonItem[];
  onItemPress?: (item: ComingSoonItem) => void;
  onSeeAllPress?: () => void;
}

const defaultItems: ComingSoonItem[] = [
  {
    id: '1',
    name: 'Remittence',
    icon: '💸',
    backgroundColor: '#E3F2FD',
  },
  {
    id: '2',
    name: 'Insurance',
    icon: '☂️',
    backgroundColor: '#E8F5E8',
  },
  {
    id: '3',
    name: 'Micro-lending',
    icon: '💰',
    backgroundColor: '#FFF3E0',
  },
];

export function ComingSoon({ items = defaultItems, onItemPress, onSeeAllPress }: ComingSoonProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Coming Soon</Text>
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.itemsContainer}>
        {items.map(item => (
          <TouchableOpacity key={item.id} style={styles.itemWrapper} onPress={() => onItemPress?.(item)}>
            <View style={[styles.iconContainer, { backgroundColor: item.backgroundColor }]}>
              <Text style={styles.iconText}>{item.icon}</Text>
            </View>
            <Text style={styles.itemName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

interface TabBarItem {
  id: string;
  name: string;
  icon: string;
  isActive?: boolean;
}

interface ProfileTabBarProps {
  items?: TabBarItem[];
  activeTab?: string;
  onTabPress?: (tabId: string) => void;
}

const defaultTabItems: TabBarItem[] = [
  {
    id: 'earn',
    name: 'Earn',
    icon: 'stats-chart',
  },
  {
    id: 'send',
    name: 'Send',
    icon: 'send',
  },
  {
    id: 'spend',
    name: 'Spend',
    icon: 'card',
  },
  {
    id: 'account',
    name: 'Account',
    icon: 'person',
  },
];

export function ProfileTabBar({ items = defaultTabItems, activeTab = 'earn', onTabPress }: ProfileTabBarProps) {
  return (
    <View style={styles.tabBarContainer}>
      {items.map(item => {
        const isActive = item.id === activeTab;
        return (
          <TouchableOpacity key={item.id} style={styles.tabItem} onPress={() => onTabPress?.(item.id)}>
            <Ionicons name={item.icon as any} size={24} color={isActive ? '#4A90E2' : '#999'} />
            <Text style={[styles.tabLabel, { color: isActive ? '#4A90E2' : '#999' }]}>{item.name}</Text>
          </TouchableOpacity>
        );
      })}
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
    marginBottom: 20,
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
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  itemWrapper: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconText: {
    fontSize: 28,
  },
  itemName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});
