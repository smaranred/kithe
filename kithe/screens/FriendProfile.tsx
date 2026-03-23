import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Friend } from '../database/schema';

interface FriendProfileProps {
  friend: Friend;
}

const FriendProfile: React.FC<FriendProfileProps> = ({ friend }) => {
  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1: return '#A855F7'; // purple
      case 2: return '#14B8A6'; // teal
      case 3: return '#F59E0B'; // amber
      case 4: return '#94A3B8'; // gray
      default: return '#94A3B8';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.name}>{friend.name}</Text>
          {friend.nickname && <Text style={styles.nickname}>"{friend.nickname}"</Text>}
          <View style={[styles.tierBadge, { backgroundColor: getTierColor(friend.tier) }]}>
            <Text style={styles.tierText}>Tier {friend.tier}</Text>
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
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  name: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
  },
  nickname: {
    fontSize: 18,
    color: '#64748B',
    marginTop: 4,
  },
  tierBadge: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tierText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  chapterText: {
    fontSize: 18,
    color: '#334155',
    lineHeight: 26,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  interestText: {
    fontSize: 14,
    color: '#475569',
  },
  handleWithCareText: {
    fontSize: 16,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
  noteContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  noteText: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
});

export default FriendProfile;
