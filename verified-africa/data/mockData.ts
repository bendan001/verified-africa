
export type MockProfile = { id: string; name: string; age: number; location: string; bio: string; interests: string[]; verified: boolean; tone: 'coral' | 'indigo' | 'coin' | 'success' };
export type MockRoom = { id: string; name: string; category: 'country' | 'age' | 'africa'; preview: string; activeCount: number; tone: 'coral' | 'indigo' | 'coin' | 'success' };
export type MockMessage = { id: string; senderName: string; text: string; direction: 'incoming' | 'outgoing'; verified?: boolean; time: string };
export type MockTransaction = { id: string; title: string; description: string; timeLabel: string; amount: number; direction: 'earned' | 'spent' };
export type MockNotification = { id: string; kind: 'match' | 'message' | 'digest' | 'coins' | 'moderation'; title: string; description: string; time: string; group: 'Today' | 'This week' };

export const mockProfiles: MockProfile[] = [
  { id: 'zuri', name: 'Zuri Mensah', age: 25, location: 'Accra', bio: 'Choreographer at a studio in Accra. I love good music, good company, and new places.', interests: ['Afrobeats', 'Dance', 'Film'], verified: true, tone: 'coin' },
  { id: 'tunde', name: 'Tunde Adeyemi', age: 30, location: 'Abuja', bio: 'Documentary filmmaker. Dog dad to Simba. Looking for honest conversation and good suya spots.', interests: ['Film', 'Travel', 'Afrobeats'], verified: true, tone: 'coral' },
  { id: 'amara', name: 'Amara Okafor', age: 27, location: 'Lagos', bio: 'Lagos-based creative, lover of jollof debates and golden hour walks.', interests: ['Afrobeats', 'Travel', 'Film'], verified: true, tone: 'coral' },
  { id: 'kwame', name: 'Kwame', age: 29, location: 'Nairobi', bio: 'Trail runner and weekend explorer.', interests: ['Fitness', 'Travel', 'Afrobeats'], verified: true, tone: 'success' },
];

export const mockRooms: MockRoom[] = [
  { id: 'nigeria-general', name: 'Nigeria General', category: 'country', preview: 'Chidi: Jollof wars tonight 😄', activeCount: 4218, tone: 'coral' },
  { id: 'age-18-25', name: '18–25', category: 'age', preview: 'Students, first jobs, big dreams.', activeCount: 6400, tone: 'indigo' },
  { id: 'age-26-35', name: '26–35', category: 'age', preview: 'Builders, movers, long walks on Sunday.', activeCount: 11200, tone: 'coral' },
  { id: 'age-36-45', name: '36–45', category: 'age', preview: 'Grounded and growing.', activeCount: 3800, tone: 'indigo' },
  { id: 'age-46-plus', name: '46+', category: 'age', preview: 'Seasoned & social.', activeCount: 1100, tone: 'coin' },
  { id: 'africa-general', name: 'Africa General', category: 'africa', preview: 'Kwame: Who’s going to Afrochella this year?', activeCount: 32114, tone: 'success' },
];

export const mockRoomMessages: MockMessage[] = [
  { id: 'room-1', senderName: 'Amara', text: 'Any brunch spots in Lekki this weekend?', direction: 'incoming', verified: true, time: '10:42' },
  { id: 'room-2', senderName: 'Tomi', text: 'Try the new place off Admiralty — jollof pancakes 😄', direction: 'incoming', verified: true, time: '10:44' },
  { id: 'room-3', senderName: 'You', text: 'Count me in! Saturday noon?', direction: 'outgoing', time: '10:46' },
];

export const mockPrivateMessages: MockMessage[] = [
  { id: 'dm-1', senderName: 'Zuri', text: 'Hey! Just saw your bio — you dance?', direction: 'incoming', verified: true, time: '10:42' },
  { id: 'dm-2', senderName: 'You', text: 'I do 💃 Afrobeats mostly. You?', direction: 'outgoing', time: '10:45' },
  { id: 'dm-3', senderName: 'Zuri', text: 'Choreographer at a studio in Accra 💃', direction: 'incoming', verified: true, time: '10:46' },
  { id: 'dm-4', senderName: 'You', text: 'No way. We need to collab.', direction: 'outgoing', time: '10:47' },
];

export const mockTundeMessages: MockMessage[] = [
  { id: 'tunde-1', senderName: 'Tunde Adeyemi', text: 'Hey, are you going to the film night?', direction: 'incoming', verified: true, time: '09:50' },
  { id: 'tunde-2', senderName: 'You', text: 'I might! What are they showing?', direction: 'outgoing', time: '09:54' },
];

export const mockTransactions: MockTransaction[] = [
  { id: 'tx-tip', title: 'Tip to DJ Lola', description: 'Afrobeats Lounge · room', timeLabel: '2m ago', amount: -10, direction: 'spent' },
  { id: 'tx-daily', title: 'Daily login reward', description: 'System', timeLabel: '1h ago', amount: 5, direction: 'earned' },
  { id: 'tx-pack', title: 'Coin pack', description: 'Purchase', timeLabel: 'Yesterday', amount: 500, direction: 'earned' },
  { id: 'tx-gift', title: 'Gift to Zuri', description: 'Private chat', timeLabel: 'Mon', amount: -25, direction: 'spent' },
];

export const mockNotifications: MockNotification[] = [
  { id: 'note-match', kind: 'match', title: 'You matched with Zuri Mensah', description: 'Your interests in Afrobeats and film line up.', time: '2m ago', group: 'Today' },
  { id: 'note-message', kind: 'message', title: 'Tunde sent you a message', description: '“Hey, are you going to the film night?”', time: '18m ago', group: 'Today' },
  { id: 'note-digest', kind: 'digest', title: 'Weekly digest — 12 new verified members in Lagos', description: 'Open Discover to meet people nearby.', time: 'Mon', group: 'This week' },
  { id: 'note-coins', kind: 'coins', title: 'You earned 5 coins for daily login', description: 'Added to your wallet.', time: 'Mon', group: 'This week' },
  { id: 'note-moderation', kind: 'moderation', title: 'A room moderator reviewed your report', description: 'Thanks for helping keep the community safe.', time: 'Sun', group: 'This week' },
];

export const mockWallet = { balance: 248 } as const;
export const mockMarketConfiguration = { market: 'NG', locale: 'en-NG', currency: 'NGN' } as const;
export const mockPremiumConfiguration = { ...mockMarketConfiguration, monthlyPrice: 4999, monthlyPeriod: 'per month' } as const;
export const mockCoinPacks = [
  { id: 'coins-100', amount: 100, priceMinor: 95000 },
  { id: 'coins-500', amount: 500, priceMinor: 420000 },
  { id: 'coins-1500', amount: 1500, priceMinor: 1100000 },
] as const;

export const mockMatch = { first: mockProfiles[2], second: mockProfiles[0], interests: ['Afrobeats', 'Dance', 'Film'] };

export const roomMessageCost = 1;

export function formatMarketPrice(amount: number, currency: string = mockMarketConfiguration.currency, locale: string = mockMarketConfiguration.locale) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}
