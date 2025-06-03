import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface ProfileHeaderProps {
  title?: string;
  subtitle?: string;
  percentage?: string;
  saversCount?: string;
  onJoinPress?: () => void;
  onMenuPress?: () => void;
  onMorePress?: () => void;
}

export function ProfileHeader({
  title = 'Gluon',
  subtitle = 'Super Savings - withdraw anytime',
  percentage = '5.6%',
  saversCount = '12,510 Savers',
  onJoinPress,
  onMenuPress,
  onMorePress,
}: ProfileHeaderProps) {
  return (
    <LinearGradient
      colors={['#4A90E2', '#357ABD', '#2E5984']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Ionicons name="refresh" size={20} color="white" style={styles.refreshIcon} />
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

        <TouchableOpacity onPress={onMorePress} style={styles.iconButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Savers Count */}
      <View style={styles.saversContainer}>
        <Text style={styles.saversText}>{saversCount}</Text>
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>🏆</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.percentage}>
          {percentage}
          <Text style={styles.percentageUnit}>p.a.</Text>
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {/* Join Button */}
      <View style={styles.joinContainer}>
        <View style={styles.joinButtonWrapper}>
          <Text style={styles.joinButtonLabel}>{subtitle.split(' - ')[0]}</Text>
          <TouchableOpacity style={styles.joinButton} onPress={onJoinPress}>
            <Text style={styles.joinButtonText}>JOIN</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    position: 'relative',
    overflow: 'hidden',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconButton: {
    padding: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshIcon: {
    marginRight: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  saversContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  saversText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconText: {
    fontSize: 20,
  },
  mainContent: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  percentage: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
    lineHeight: 70,
  },
  percentageUnit: {
    fontSize: 24,
    fontWeight: '400',
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    marginTop: 8,
  },
  joinContainer: {
    marginTop: 10,
  },
  joinButtonWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  joinButtonLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  joinButton: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  joinButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
  },
  circle1: {
    position: 'absolute',
    top: 50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  circle2: {
    position: 'absolute',
    bottom: -30,
    right: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});
