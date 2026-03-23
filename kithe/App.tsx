import React from 'react';
import { StyleSheet, View } from 'react-native';
import FriendProfile from './screens/FriendProfile';
import { Friend } from './database/schema';

const dummyFriend: Friend = {
  id: 1,
  name: 'Sara',
  nickname: 'Sarita',
  tier: 1,
  birthday: '1995-06-15',
  currentChapter: 'Just started a new job as a UX designer and is learning to play the cello.',
  interests: ['Design', 'Cello', 'Hiking', 'Sci-fi Books'],
  handleWithCare: 'Recently lost her cat, may be a bit sensitive about pets.',
  lastNote: 'We talked about her new job and the challenges of learning a new instrument. She seems really excited but a bit overwhelmed.',
  lastContactDate: '2024-03-20',
  friendsSince: '2010-09-01',
  timezone: 'PST',
  communicationStyle: 'Prefers long texts over calls.',
};

export default function App() {
  return (
    <View style={styles.container}>
      <FriendProfile friend={dummyFriend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
