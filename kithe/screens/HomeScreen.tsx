import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Friend } from '../database/schema';

const dummyFriends: Friend[] = [
  {
    id: 1,
    name: 'Sara',
    nickname: 'Sarita',
    tier: 1,
    birthday: '1995-06-15',
    currentChapter: 'Just started a new job as a UX designer and is learning to play the cello.',
    interests: ['Design', 'Cello', 'Hiking', 'Sci-fi Books'],
    handleWithCare: 'Recently lost her cat, may be a bit sensitive about pets.',
    lastNote: 'We talked about her new job and the challenges of learning a new instrument.',
    lastContactDate: '2024-03-20',
    friendsSince: '2010-09-01',
    timezone: 'PST',
    communicationStyle: 'Prefers long texts over calls.',
  },
  {
    id: 2,
    name: 'James',
    nickname: 'Jim',
    tier: 2,
    birthday: '1992-08-10',
    currentChapter: 'Moving to a new apartment next month.',
    interests: ['Cooking', 'Running', 'Movies'],
    handleWithCare: 'Stressed about the move.',
    lastNote: 'Helped him look for boxes.',
    lastContactDate: '2024-03-22',
    friendsSince: '2015-05-12',
    timezone: 'EST',
    communicationStyle: 'Casual calls.',
  },
  {
    id: 3,
    name: 'Maya',
    nickname: 'May',
    tier: 2,
    birthday: '1994-11-25',
    currentChapter: 'Training for her first marathon.',
    interests: ['Sports', 'Podcasts'],
    handleWithCare: 'None',
    lastNote: "Talked about her training schedule.",
    lastContactDate: '2024-03-18',
    friendsSince: '2018-02-20',
    timezone: 'GMT',
    communicationStyle: 'Voice notes.',
  },
  {
    id: 4,
    name: 'Tom',
    nickname: 'Tommy',
    tier: 3,
    birthday: '1990-01-05',
    currentChapter: 'Working on a new software project.',
    interests: ['Coding', 'Gaming'],
    handleWithCare: 'Busy with work.',
    lastNote: 'Gaming session last weekend.',
    lastContactDate: '2024-03-15',
    friendsSince: '2020-07-30',
    timezone: 'CET',
    communicationStyle: 'Discord.',
  },
];

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  const getTierInfo = (tier: number) => {
    switch (tier) {
      case 1: return { color: '#A855F7', label: 'Inner Circle', bg: '#F3E8FF' };
      case 2: return { color: '#14B8A6', label: 'Close Friend', bg: '#F0FDFA' };
      case 3: return { color: '#F59E0B', label: 'Good Friend', bg: '#FFFBEB' };
      case 4: return { color: '#94A3B8', label: 'Acquaintance', bg: '#F8FAFC' };
      default: return { color: '#94A3B8', label: 'Friend', bg: '#F8FAFC' };
    }
  };

  const getTimeAgo = (dateString: string) => {
    const contacted = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - contacted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderItem = ({ item }: { item: Friend }) => {
    const tierInfo = getTierInfo(item.tier);
    return (
      <TouchableOpacity 
        style={styles.friendItem} 
        onPress={() => navigation.navigate('FriendProfile', { friend: item })}
      >
        <View style={[styles.avatar, { backgroundColor: tierInfo.bg, borderColor: tierInfo.color + '40' }]}>
          <Text style={[styles.avatarText, { color: tierInfo.color }]}>{getInitials(item.name)}</Text>
        </View>
        <View style={styles.friendInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.friendName}>{item.name}</Text>
            <View style={[styles.tierBadge, { backgroundColor: tierInfo.color }]}>
              <Text style={styles.tierText}>{tierInfo.label}</Text>
            </View>
          </View>
          <Text style={styles.chapterSubtitle} numberOfLines={1}>{item.currentChapter}</Text>
          <Text style={styles.lastContactLine}>Talked {getTimeAgo(item.lastContactDate)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Friends</Text>
      </View>
      <FlatList
        data={dummyFriends}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
  },
  friendInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  friendName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  tierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  chapterSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  lastContactLine: {
    fontSize: 12,
    color: '#94A3B8',
  },
});

export default HomeScreen;
