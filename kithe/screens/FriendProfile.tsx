import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Friend } from '../database/schema';

interface FriendProfileProps {
  friend: Friend;
}

const FriendProfile: React.FC<FriendProfileProps> = ({ friend }) => {
  const getTierInfo = (tier: number) => {
    switch (tier) {
      case 1: return { color: '#A855F7', label: 'Inner Circle' };
      case 2: return { color: '#14B8A6', label: 'Close Friend' };
      case 3: return { color: '#F59E0B', label: 'Good Friend' };
      case 4: return { color: '#94A3B8', label: 'Acquaintance' };
      default: return { color: '#94A3B8', label: 'Friend' };
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
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const tierInfo = getTierInfo(friend.tier);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(friend.name)}</Text>
          </View>
          <Text style={styles.name}>{friend.name}</Text>
          {friend.nickname && <Text style={styles.nickname}>"{friend.nickname}"</Text>}
          <Text style={styles.lastContacted}>
            Last talked {getTimeAgo(friend.lastContactDate)}
          </Text>
          <View style={[styles.tierBadge, { backgroundColor: tierInfo.color }]}>
            <Text style={styles.tierText}>{tierInfo.label}</Text>
          </View>
        </View>

        <Section title="Right now">
          <Text style={styles.chapterText}>{friend.currentChapter}</Text>
        </Section>

        <Section title="Interests">
          <View style={styles.interestsContainer}>
            {friend.interests.map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Handle with care">
          <Text style={styles.handleWithCareText}>{friend.handleWithCare}</Text>
        </Section>

        <Section title="Last conversation">
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{friend.lastNote}</Text>
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingHorizontal: 28,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E9D5FF',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#A855F7',
  },
  name: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
  },
  nickname: {
    fontSize: 18,
    color: '#64748B',
    marginTop: 2,
  },
  lastContacted: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 8,
  },
  tierBadge: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tierText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#CBD5E1',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  chapterText: {
    fontSize: 18,
    color: '#334155',
    lineHeight: 28,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  interestTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  interestText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  handleWithCareText: {
    fontSize: 16,
    color: '#94A3B8',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  noteContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  noteText: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 26,
  },
});

export default FriendProfile;
