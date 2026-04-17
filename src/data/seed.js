import abbyAvatar from '../assets/avatar/floral_cardigan.jpg'
import kyleAvatar from "../assets/avatar/kycardio86.png";
import postBlueShirt from '../assets/posts/blue_shirt.jpeg'
import postBW from '../assets/posts/b&w.jpg'
import postBWGuitar from '../assets/posts/b&w_guitar.jpg'
import postGlitter from '../assets/posts/glitter.JPG'
import postStage from '../assets/posts/stage.JPG'
import postLibrarian from '../assets/posts/librarian.jpeg'
import postRuffleDress from '../assets/posts/ruffle_dress_w_blue.jpeg'
import postGreyShirt from '../assets/posts/grey_shirt.jpeg'
import postCat from '../assets/posts/cat.jpg'
import postGlass from '../assets/posts/glass.jpg'
import postWheat from '../assets/posts/wheat.jpg'

// ─── Users ────────────────────────────────────────────────────────────────────

export const users = [
  {
    id: 'user_abby',
    username: 'sodowntonabby',
    displayName: 'Abby',
    bio: 'living in lowercase · portland, or · she/her',
    avatarUrl: abbyAvatar,
    followerCount: 847,
    followingCount: 312,
    postCount: 9,
  },
  {
    id: 'user_kyle',
    username: 'kycardio86',
    displayName: 'Kyle',
    bio: 'fitness · food · figuring it out',
    avatarUrl: kyleAvatar,
    followerCount: 203,
    followingCount: 198,
    postCount: 2,
  },
  {
    id: 'user_remi',
    username: 'sunsetprague',
    displayName: 'Remi',
    bio: 'chasing golden hour everywhere',
    avatarUrl: 'https://i.pravatar.cc/150?u=goldenremi',
    followerCount: 1204,
    followingCount: 440,
    postCount: 1,
  },
  {
    id: 'user_cass',
    username: 'coffeeandchaos_r',
    displayName: 'Cass',
    bio: 'oat latte or nothing · she/they',
    avatarUrl: 'https://i.pravatar.cc/150?u=coffeeandchaos_r',
    followerCount: 512,
    followingCount: 267,
    postCount: 1,
  },
  {
    id: 'user_nate',
    username: 'nate_outside',
    displayName: 'Nate',
    bio: 'trails, maps, bad weather',
    avatarUrl: 'https://i.pravatar.cc/150?u=outdoorsman',
    followerCount: 389,
    followingCount: 155,
    postCount: 1,
  },
  {
    id: 'user_vjcdp',
    username: 'vjcdp',
    displayName: 'vjcdp',
    bio: '',
    avatarUrl: 'https://i.pravatar.cc/150?u=gray_hour',
    followerCount: 44,
    followingCount: 71,
    postCount: 3,
  },
]

// ─── Posts ────────────────────────────────────────────────────────────────────
// 9 Abby posts (all appear in her profile grid; first 4 also shown in feed)
// 2 Kyle posts
// 1 post each from 3 fake accounts
// Feed renders all posts sorted by timestamp desc; Profile grid filters by userId

export const posts = [
  // ── Abby ──────────────────────────────────────────────────────────────────
  {
    id: 'post_a1',
    userId: 'user_abby',
    username: 'sodowntonabby',
    avatarUrl: abbyAvatar,
    imageUrl: postBlueShirt,
    caption: 'the scarf is doing a lot of work and i fully support it',
    likes: 112,
    likedBy: [],
    comments: [
      { id: 'c_a1_2', userId: 'user_cass', username: 'coffeeandchaos_r', text: 'the paisley!!! where is this from', timestamp: '2025-01-18T16:05:00Z' },
    ],
    timestamp: '2025-01-18T14:50:00Z',
  },
  {
    id: 'post_a2',
    userId: 'user_abby',
    username: 'sodowntonabby',
    avatarUrl: abbyAvatar,
    imageUrl: postBW,
    caption: 'channeling something. not sure what. the headscarf knows.',
    likes: 98,
    likedBy: [],
    comments: [
      { id: 'c_a2_1', userId: 'user_nate', username: 'nate_outside', text: 'iconic honestly', timestamp: '2025-01-14T09:45:00Z' },
    ],
    timestamp: '2025-01-14T08:30:00Z',
  },
  {
    id: 'post_a3',
    userId: 'user_abby',
    username: 'sodowntonabby',
    avatarUrl: abbyAvatar,
    imageUrl: postBWGuitar,
    caption: 'played for two hours and forgot every single thing that was bothering me',
    likes: 204,
    likedBy: [],
    comments: [
      { id: 'c_a3_3', userId: 'user_remi', username: 'sunsetprague', text: 'i had no idea you played', timestamp: '2025-01-09T21:00:00Z' },
    ],
    timestamp: '2025-01-09T19:55:00Z',
  },
  {
    id: 'post_a4',
    userId: 'user_abby',
    username: 'sodowntonabby',
    avatarUrl: abbyAvatar,
    imageUrl: postGlitter,
    caption: 'new year new glitter. same me underneath it all.',
    likes: 176,
    likedBy: [],
    comments: [
      { id: 'c_a4_1', userId: 'user_cass', username: 'coffeeandchaos_r', text: 'this is the energy', timestamp: '2025-01-02T11:30:00Z' },
    ],
    timestamp: '2025-01-01T23:58:00Z',
  },
  // ── Abby profile-grid extras ───────────────────────────────────────────────
  {
    id: 'post_a5',
    userId: 'user_abby',
    username: 'sodowntonabby',
    avatarUrl: abbyAvatar,
    imageUrl: postStage,
    caption: 'last night of the run. the corset held. barely.',
    likes: 143,
    likedBy: [],
    comments: [
      { id: 'c_a5_1', userId: 'user_nate', username: 'nate_outside', text: 'front row next time. no exceptions.', timestamp: '2024-12-19T10:20:00Z' },
    ],
    timestamp: '2024-12-19T09:00:00Z',
  },
  {
    id: 'post_a6',
    userId: 'user_abby',
    username: 'sodowntonabby',
    avatarUrl: abbyAvatar,
    imageUrl: postLibrarian,
    caption: 'the whole look. all thrifted. the glasses are not a prescription.',
    likes: 321,
    likedBy: [],
    comments: [
      { id: 'c_a6_2', userId: 'user_remi', username: 'sunsetprague', text: 'the thrift gods were watching over you', timestamp: '2024-12-08T15:10:00Z' },
    ],
    timestamp: '2024-12-08T14:20:00Z',
  },
  {
    id: 'post_a7',
    userId: 'user_abby',
    username: 'sodowntonabby',
    avatarUrl: abbyAvatar,
    imageUrl: postRuffleDress,
    caption: 'the lace blouse said yes. i said let\'s find out.',
    likes: 88,
    likedBy: [],
    comments: [],
    timestamp: '2024-11-22T17:00:00Z',
  },
  {
    id: 'post_a8',
    userId: 'user_abby',
    username: 'sodowntonabby',
    avatarUrl: abbyAvatar,
    imageUrl: postGreyShirt,
    caption: 'golden hour did not have to go this hard. and yet.',
    likes: 261,
    likedBy: [],
    comments: [
      { id: 'c_a8_1', userId: 'user_cass', username: 'coffeeandchaos_r', text: 'stop it. the light on you.', timestamp: '2024-11-10T13:45:00Z' },
    ],
    timestamp: '2024-11-10T12:30:00Z',
  },
  {
    id: 'post_a9',
    userId: 'user_abby',
    username: 'sodowntonabby',
    avatarUrl: abbyAvatar,
    imageUrl: 'https://picsum.photos/seed/abby9/400/400',
    caption: 'first real rain of fall. opened every window. made soup.',
    likes: 194,
    likedBy: [],
    comments: [
      { id: 'c_a9_2', userId: 'user_nate', username: 'nate_outside', text: 'what kind of soup', timestamp: '2024-10-28T19:55:00Z' },
      { id: 'c_a9_3', userId: 'user_abby', username: 'sodowntonabby', text: 'tomato obviously', timestamp: '2024-10-28T20:10:00Z' },
    ],
    timestamp: '2024-10-28T18:45:00Z',
  },

  // ── Kyle ──────────────────────────────────────────────────────────────────
  {
    id: 'post_k1',
    userId: 'user_kyle',
    username: 'kycardio86',
    avatarUrl: kyleAvatar,
    imageUrl: 'https://picsum.photos/seed/kyle1/400/400',
    caption: '5am run in the rain. no notes.',
    likes: 67,
    likedBy: [],
    comments: [
      { id: 'c_k1_1', userId: 'user_abby', username: 'sodowntonabby', text: 'you are a different species', timestamp: '2025-01-15T06:22:00Z' },
    ],
    timestamp: '2025-01-15T05:58:00Z',
  },
  {
    id: 'post_k2',
    userId: 'user_kyle',
    username: 'kycardio86',
    avatarUrl: kyleAvatar,
    imageUrl: 'https://picsum.photos/seed/kyle2/400/400',
    caption: 'meal prepped for the whole week. feel like a functional adult for approximately 30 more minutes',
    likes: 134,
    likedBy: [],
    comments: [
      { id: 'c_k2_1', userId: 'user_nate', username: 'nate_outside', text: 'king behavior', timestamp: '2025-01-05T15:10:00Z' },
      { id: 'c_k2_2', userId: 'user_abby', username: 'sodowntonabby', text: 'the 30 min timeline is generous lol', timestamp: '2025-01-05T15:33:00Z' },
    ],
    timestamp: '2025-01-05T14:40:00Z',
  },

  // ── vjcdp ──────────────────────────────────────────────────────────────────
  {
    id: 'post_v1',
    userId: 'user_vjcdp',
    username: 'vjcdp',
    avatarUrl: 'https://i.pravatar.cc/150?u=gray_hour',
    imageUrl: postCat,
    caption: 'he has a bow tie and he knows it.',
    likes: 31,
    likedBy: [],
    comments: [],
    timestamp: '2025-01-16T11:20:00Z',
  },
  {
    id: 'post_v2',
    userId: 'user_vjcdp',
    username: 'vjcdp',
    avatarUrl: 'https://i.pravatar.cc/150?u=gray_hour',
    imageUrl: postGlass,
    caption: 'somewhere between the second drink and a bad idea',
    likes: 18,
    likedBy: [],
    comments: [],
    timestamp: '2025-01-10T09:44:00Z',
  },
  {
    id: 'post_v3',
    userId: 'user_vjcdp',
    username: 'vjcdp',
    avatarUrl: 'https://i.pravatar.cc/150?u=gray_hour',
    imageUrl: postWheat,
    caption: 'drove out of the city for this. no regrets.',
    likes: 52,
    likedBy: [],
    comments: [
      { id: 'c_v3_1', userId: 'user_remi', username: 'sunsetprague', text: 'where is this', timestamp: '2024-12-29T17:05:00Z' },
    ],
    timestamp: '2024-12-29T16:30:00Z',
  },

  // ── Fake accounts ──────────────────────────────────────────────────────────
  {
    id: 'post_r1',
    userId: 'user_remi',
    username: 'sunsetprague',
    avatarUrl: 'https://i.pravatar.cc/150?u=goldenremi',
    imageUrl: 'https://picsum.photos/seed/remi1/400/400',
    caption: 'last night of the trip. the sky did not disappoint',
    likes: 489,
    likedBy: [],
    comments: [
      { id: 'c_r1_1', userId: 'user_abby', username: 'sodowntonabby', text: 'this is insane', timestamp: '2025-01-12T21:45:00Z' },
    ],
    timestamp: '2025-01-12T21:00:00Z',
  },
  {
    id: 'post_c1',
    userId: 'user_cass',
    username: 'coffeeandchaos_r',
    avatarUrl: 'https://i.pravatar.cc/150?u=coffeeandchaos_r',
    imageUrl: 'https://picsum.photos/seed/cass1/400/400',
    caption: 'new cafe spotted. oat latte: a solid 8. vibes: 11.',
    likes: 77,
    likedBy: [],
    comments: [
      { id: 'c_c1_1', userId: 'user_abby', username: 'sodowntonabby', text: 'send location immediately', timestamp: '2025-01-11T11:12:00Z' },
    ],
    timestamp: '2025-01-11T10:50:00Z',
  },
  {
    id: 'post_n1',
    userId: 'user_nate',
    username: 'nate_outside',
    avatarUrl: 'https://i.pravatar.cc/150?u=outdoorsman',
    imageUrl: 'https://picsum.photos/seed/nate1/400/400',
    caption: 'summit number 12 this year. knees are cooked. it was worth it.',
    likes: 156,
    likedBy: [],
    comments: [
      { id: 'c_n1_1', userId: 'user_kyle', username: 'kycardio86', text: 'goat behavior', timestamp: '2025-01-07T16:40:00Z' },
    ],
    timestamp: '2025-01-07T16:05:00Z',
  },
]

// ─── Messages ─────────────────────────────────────────────────────────────────
// Thread between sodowntonabby and kycardio86
// Placeholder dramatic content — to be revised once film script is finalized

export const messages = [
  {
    id: 'msg_01',
    senderId: 'user_kyle',
    recipientId: 'user_abby',
    text: 'Hey.',
    timestamp: '2025-01-17T19:03:00Z',
  },
  {
    id: 'msg_02',
    senderId: 'user_kyle',
    recipientId: 'user_abby',
    text: 'I wanted to say sorry about the other day.',
    timestamp: '2025-01-17T19:04:00Z',
  },
  {
    id: 'msg_03',
    senderId: 'user_kyle',
    recipientId: 'user_abby',
    text: 'If you would just let me explain...',
    timestamp: '2025-01-17T19:05:00Z',
  },
  {
    id: 'msg_04',
    senderId: 'user_abby',
    recipientId: 'user_kyle',
    text: "I'm a little confused\u2026",
    timestamp: '2025-01-17T19:07:00Z',
  },
  {
    id: 'msg_05',
    senderId: 'user_kyle',
    recipientId: 'user_abby',
    text: "It's really no big deal.",
    timestamp: '2025-01-17T19:08:00Z',
  },
  {
    id: 'msg_06',
    senderId: 'user_abby',
    recipientId: 'user_kyle',
    text: 'Yeah.',
    timestamp: '2025-01-17T19:10:00Z',
  },
  {
    id: 'msg_07',
    senderId: 'user_abby',
    recipientId: 'user_kyle',
    text: "I don't know what you want me to say.",
    timestamp: '2025-01-17T19:10:00Z',
  },
  {
    id: 'msg_08',
    senderId: 'user_kyle',
    recipientId: 'user_abby',
    text: 'Give me a chance to explain.',
    timestamp: '2025-01-17T19:11:00Z',
  },
]
