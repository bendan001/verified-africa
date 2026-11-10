# Verified Africa - Canva Design Analysis

## Reference and scope

Primary visual source: [Verified Africa UI Concept_20261004_201033_0000.pdf](./Verified%20Africa%20UI%20Concept_20261004_201033_0000.pdf).

All 16 PDF pages were reviewed visually. Pages 1 and 3 show the splash treatment; page 2 is the explicit visual-system board; pages 3-16 contain the product flows, screen mockups, component examples, and explanatory callouts. The inventory below counts 25 distinct app screens or modal states, not the presentation boards or supporting diagrams.

This document records the design as shown. Product rules follow the authoritative decisions in `AGENTS.md`; those decisions override contradictory labels or examples in the PDF while the PDF remains the visual source of truth.

## Visual principles

The reference describes the product as trustworthy, modern, warm, and affordable-premium. Trust is shown at the point of decision through verification marks and plain language. The UI uses rounded human forms, generous spacing, coral highlights, restrained safety controls, and clear prices and coin activity. Core connection and safety are not framed as paywalls. Avoid scarcity cues, aggressive prompts, decorative noise, and loud safety actions.

## Color tokens

The first four entries are explicitly named on the PDF's visual-system page. Other values are sampled from repeated vector fills or text in the screen mockups and assigned the closest observed role. Treat sampled roles as implementation tokens, not as a separate palette.

| Role | Token | Evidence / use |
| --- | --- | --- |
| Primary indigo | `#0E1A3A` | Named Indigo; splash, dark headers and surfaces, primary dark controls. |
| Coral accent | `#FF6A4D` | Named Coral; primary actions, selected states, active emphasis, self chat bubbles, verification marks. |
| Surface | `#FFFFFF` | Named Surface; most phone screens, cards, dialogs, and input fields. |
| Warm neutral | `#F1ECE4` | Named Neutral; chat bubbles, filters, profile details, notices, and soft panels. |
| Main text | `#121A33` | Repeated dark text color across screen content and headings. |
| Muted text | `#6B7390` | Supporting copy, captions, inactive labels, and secondary metadata. |
| Deep ink / device frame | `#070F24` | Device outlines, dark overlays, and deepest indigo areas. Use as a supporting dark, not a replacement for primary indigo. |
| Indigo secondary surface | `#1A2A55` | Secondary dark panels and selected dark states. |
| Indigo secondary surface 2 | `#17224A` | Additional dark panel tone in the end-to-end board. Keep usage limited to matching those panels. |
| Pale coral | `#FFD8CF` | Soft badge, icon, and selected-interest backgrounds. |
| Coin gold | `#F4B63F` | Coin markers, coin/avatar accents, and small celebratory details. |
| Success / online | `#2FA36A` | Online indicators, earned transaction values, and positive status marks. |
| Divider / disabled | `#E6E2DB` | Rules, input outlines, progress tracks, and disabled controls. |
| Presentation canvas | `#FBF7F2` | Warm PDF board background; use only where a screen in the reference actually uses that warm canvas. |

Do not use pure black as a general UI token: black areas in the PDF include image placeholders and frame/mask artifacts. For green, gold, and pale coral, reserve color for the compact status or decorative roles shown; the interface remains primarily indigo, coral, white, and warm neutral.

## Typography

The explicit type specification on page 2 is:

| Hierarchy | Declared style |
| --- | --- |
| Display | Sora, 56, bold |
| Heading | Sora, 24, bold |
| Body | DM Sans, 16, regular; the board says readable on indigo at WCAG AA |
| Caption / eyebrow | DM Sans, 12, uppercase, tracking +14 (as written on the board) |

In the mobile mockups, use the visual hierarchy rather than applying the presentation-board display size to every screen: screen titles and section headings are substantially smaller than the cover title; profile names and balances receive stronger weight; helper copy and timestamps are quiet; uppercase labels are small and tracked. The mockups suggest roughly 20-24 for screen/section headings, 14-16 for primary body copy, 10-12 for metadata, and 30-36 for prominent balances. Those mobile values are estimates from scaled device mockups, not additional explicit tokens.

**Font-family note:** the specification names Sora for display and headings, while text inspection identifies Montserrat in many rendered heading spans. The authoritative choice is Sora for display/headings and DM Sans for body/captions. Use Sora assets; do not substitute Montserrat. Preserve the shown weight, scale, line breaks, and hierarchy.

## Spacing, shape, and elevation

- Explicit spacing scale: **4 / 8 / 12 / 16 / 24 / 32 / 48**. Prefer these steps for padding, gaps, and section spacing.
- Mobile content is left aligned with clear screen-edge gutters; forms, cards, and buttons generally share a common content width.
- Use compact spacing within a component and larger 24-48 steps between sections. Lists rely on clear row separation, not oversized cards.
- Buttons, inputs, cards, chips, and message blocks are rectangular or only subtly rounded. Do not turn them into large pills. The PDF does not specify numeric corner radii; a small 4-8 dp radius is a reasonable starting estimate for rectangular controls, while avatars and circular marks are fully round.
- No consistent drop shadow is visible. Separation comes from fill color, rules, spacing, and the dark device frames in the presentation. Avoid adding elevation shadows without a matching Canva element.
- The safety callout on page 15 specifies **48 px minimum tap targets**, high-contrast type, and clear focus states. Preserve this even where the visual glyph itself is small.

## Controls and component styling

### Buttons

- Primary: full-width coral fill (`#FF6A4D`) with centered white DM Sans label; medium/semibold weight. Shown for Get started, Continue, Verify, Message, Buy coins, Upgrade, and report confirmation.
- Secondary: primary indigo fill (`#0E1A3A`) with white label, or the dark-indigo Keep browsing action on the match state.
- Tertiary: white or transparent fill with indigo text; fine neutral outline when presented as a control beside another action.
- Disabled: warm gray-neutral (`#E6E2DB`) with muted text.
- Keep paired actions visually clear: Message is primary and Add friend is secondary; Send a message is primary and Keep browsing remains an equally legible, lower-emphasis choice.

### Inputs and selection

- White input surface, thin warm-neutral border, small field label above, dark entered text, muted helper copy below.
- Coral outline indicates the focused/active phone field and entered OTP cells in the reference. Keep error messaging inline; the phone verification notes explicitly say no modal for inline errors.
- The OTP screen uses six separate square cells, a visible resend countdown, and one clear Verify action.
- Selected discover filters use filled indigo with white text for the verified-only safety mode. Selected interest chips use coral with white text; unselected chips use warm neutral with dark text. Match each selection treatment to its control type as drawn.
- Profile setup shows a thin coral progress line above each stage's form content, a square photo crop/zoom area, and a character count on the bio.

### Cards, rows, dialogs

- Discover cards use a two-column grid, square/near-square photo area, compact name/age/location/bio details, and an overlaid coral verification mark.
- Room lists use clean, compact rows: circular initial avatar, room name, last-message preview, active count, and small green live dot. Avoid turning each row into a large floating card.
- Wallet activity is a vertically grouped list with a colored circular event marker, description/context, time, and right-aligned signed amount.
- Premium plan cards are stacked white panels. The selected Quarterly option is coral-filled and marked Best Value; other options remain white with fine neutral borders. Keep the offer feature list concise and prices locally configurable.
- Report/block is a centered white confirmation dialog over a darkened indigo screen. It has a pale coral alert mark, plain-language outcome, optional reason chips, coral confirmation, and a text Cancel action.
- Rules use a pale coral panel with a coral leading rule and a short pinned label.

## Icon, avatar, and verification treatment

- Icons are small, simple, high-contrast glyphs: back chevron, overflow ellipsis, search, message/activity marks, heart, gift/coin, and send arrow. The reference does not present a detailed proprietary icon family. Prefer a consistent restrained outline or solid glyph set; avoid colorful illustrated icons outside the shown emoji in user-generated chat.
- Bottom navigation has four text-labelled destinations: **Home, Chat, Wallet, Profile**. Keep tab labels and icon treatment consistent across screens. The exact icon artwork is not specified by the PDF.
- Avatars are circular. In list/chat examples they use a single initial on alternating coral, indigo, gold, or green fills; larger profile areas use a large image/placeholder treatment with name and profile context. Setup provides a square crop/zoom image step. The colored initials and white circles in the discover tiles are visual placeholders, not a requirement to use synthetic user photos.
- Verification is a small white check on a coral circle, often overlapping the lower-right edge of an avatar or sitting at the upper-right of a discover tile. In profile detail it is repeated near the avatar and in the verified-ID line. Preserve the badge's compact size and consistent shape, while keeping its placement contextual.
- Online state is a small green dot with a concise “Online” label where appropriate. Room counts use small coral text; avoid turning activity counts into alerts.

## Navigation chrome and screen patterns

- The phone mockups show a quiet system status bar and bottom home indicator; app content respects both safe areas.
- Standard screen headers are simple: back chevron where the route is nested, left-aligned title, and optional right-side overflow or coin balance. Avoid adding a heavy app bar to private chat; its design deliberately drops the room chrome.
- Discover has a search/filter surface followed by filter chips and profile cards.
- Country and age room lists have a simple title/header and repeated rows; a room detail has back navigation, room title, active count, pinned rules, message list, and composer.
- Private chat has the other person's avatar, verified mark, name, online/location status, message list, typing indicator, and composer.
- Wallet and profile screens use the four-tab bar. The Wallet tab includes a dark balance card, Naira equivalent, Buy coins / Redeem / History actions, activity list, and an explanatory activity chart on the presentation board.
- Settings is reached from Profile and uses a white, single-column list of concise rows with chevrons and subtle dividers.

## Chat, rooms, coins, and premium

### Chat bubbles and composers

- Other people's messages use warm-neutral (`#F1ECE4`) bubbles; the current user's message uses coral (`#FF6A4D`) with white text.
- Bubbles are rectangular/subtly rounded, without prominent tails. Keep sender/avatar context above or beside grouped messages. Public room messages may show an avatar and verification mark; private chat prioritizes the participant header and conversation.
- Composer is a white bottom-aligned field with emoji/action affordance on the left and coral send arrow on the right. Typing state is a quiet three-dot indicator plus the participant's name.

### Rooms

- Country room list is explicitly headed “Nigeria rooms” and presents named city/community rooms, recent message, active count, and green live state. The explanatory board says the country selector can move to Ghana, Kenya, and South Africa.
- Age room list presents four broad tiers with short descriptions and live counts. Africa General is a distinct continental room with member count and member country markers.
- Room detail pins community rules near the top. Verified avatars and active signals are visible but restrained. The PDF says the visual system should remain identical across room types.

### Coins and wallet

- Coin symbol is shown in a gold circular token; the balance appears in a navy card with a small uppercase label and large white number. The PDF also shows an estimated Naira-equivalent line, but the authoritative coin rule permits fiat currency only for actual purchases, so omit that conversion from the current component.
- Coin purchase offers use white pack cards with token icon, quantity, and Naira price; Buy coins is a full-width coral button.
- Transactions show event context and signed amounts; earned values are green, spent values coral. History is transparent and contextual, including source and time. The chart compares Spent (coral) and Earned (indigo) over four weeks.
- The public chat board visually presents coins as a way to tip or gift. Product behavior is authoritative in `AGENTS.md`: each public room message costs one coin; private chat between accepted friends and dating matches is free. Keep that rule out of these presentational components.

**Coin glyph:** the PDF's coin token resembles a cedi mark, but coins are internal virtual currency. Preserve the small gold circular token treatment and use a dedicated coin icon/asset without a currency glyph. Fiat currency appears only as a localized amount for actual purchases.

### Premium

- Premium is branded **Verified+**. The screen starts with a dark indigo hero and white headline, then stacked Monthly, Quarterly, and Yearly options.
- The selected Quarterly card is coral, carries a Best Value tag, and lists savings. The primary upgrade CTA is coral; Cancel anytime and Secure payment are quiet supporting assurances. The PDF's price examples are visual reference only: initial Nigeria pricing is configurable at ₦4,999/month and must not be hard-coded into a UI component.
- Benefits appear beside the phone mockup as four white cards with pale coral circular icons: unlimited messaging, profile views, priority discover, and Verified+ badge. A dark indigo testimonial panel closes the group.
- The PDF labels the experience “Premium, not exclusionary” and says core safety is free. Keep premium emphasis warm and restrained.

## Reusable components evidenced by the PDF

These are candidates for later implementation; the PDF is the evidence, not a claim that the codebase already contains them.

| Component candidate | Evidence / reuse |
| --- | --- |
| `PrimaryButton` | Coral CTA repeated across onboarding, verification, profile setup, chat, wallet, premium, and safety. |
| `SecondaryButton` / `TextAction` | Indigo secondary actions, outlined actions, and Cancel/Keep browsing choices. |
| `TextInput` / `FormField` | Phone, profile basics, bio, and reason entry share labels, borders, and helper/error placement. |
| `OtpCodeInput` | Six individual code cells plus resend countdown and verify state. |
| `ScreenHeader` | Back, title, optional overflow and coin balance variants. |
| `Avatar` | Initial/photo circles in discover, room, chat, profile, and match contexts. |
| `VerifiedBadge` | Coral check mark over avatar/card and inline profile identity. |
| `OnlineIndicator` | Repeated small green online/live status. |
| `FilterChip` / `InterestChip` | Discover filters and profile interests, with distinct selected palettes. |
| `ProfileCard` | Repeated two-column discover cards with photo, identity, location, bio, and badge. |
| `ProfileSummary` | Name, age, location, verified identity, rating, bio, interests, and actions. |
| `RoomCard` / `RoomListItem` | Country room list rows with activity and last-message preview. |
| `AgeRoomRow` | Age tier title, short explanation, and live count. |
| `RoomRulesBanner` | Pinned, always-visible community rules. |
| `ChatBubble` | Neutral incoming and coral outgoing message variants. |
| `MessageComposer` | Text/emoji entry and send action for room and private chat. |
| `TypingIndicator` | Three dots and participant name. |
| `CoinBalanceCard` / `CoinIcon` | Gold token, large balance, and Naira equivalence. |
| `CoinPackCard` | Quantity and Naira price for a purchase option. |
| `TransactionRow` | Event icon, context, date/time, and signed amount. |
| `PremiumPlanCard` / `PremiumBenefitCard` | Three plan states and four benefit summaries. |
| `BottomTabBar` | Repeated four-destination navigation. |
| `ActivityRow` / `DateGroupHeading` | Notifications grouped by Today and This week. |
| `ConfirmationDialog` | Report/block reason selection, clear consequences, confirm and cancel. |
| `ProgressIndicator` | Profile setup progress, OTP countdown, and liveness progress. |
| `SectionEyebrow` | Small uppercase, tracked labels repeated on panels and screens. |

The PDF does **not** show dedicated empty, loading, or full-screen error states. It does show inline phone errors in the written guidance, an OTP countdown, and liveness progress. Implement those states when their flows are built, but do not invent a new empty-state visual language from this reference alone.

## Screen inventory

Navigation destinations below are inferred from the screen sequence and page 16 flow diagram; the PDF does not define every tap target or route name.

| # | Screen / state | PDF page | Purpose and main UI | Inferred destination | Reusable components |
| ---: | --- | ---: | --- | --- | --- |
| 1 | Splash | 1, 3 | Indigo field, coral V mark, Verified Africa wordmark and short tagline. | Welcome | Brand mark, splash layout |
| 2 | Welcome | 3 | Profile illustration, “Meet real people, verified first”, Get started and Sign in. | 18+ gate or sign-in | PrimaryButton, TextAction |
| 3 | 18+ confirmation | 3 | 18+ mark, adult-only explanation, explicit acceptance checkbox, Proceed. | Phone verification | PrimaryButton, checkbox row |
| 4 | Enter phone number | 4 | Nigerian flag/+234 default, number field, Send code, policy links. | OTP entry | ScreenHeader, FormField, PrimaryButton |
| 5 | Enter OTP | 4 | Six code cells, destination number, resend countdown, Verify. | Identity verification | OtpCodeInput, PrimaryButton |
| 6 | Verification steps | 5 | Two-step ID and liveness explanation, privacy assurance, I'm ready. | ID capture | Step row, privacy notice, PrimaryButton |
| 7 | Capture government ID | 5 | ID frame, sample card, lighting/glare/edge checks, Capture and Upload. | Liveness selfie | Camera frame, checklist, buttons |
| 8 | Liveness scan | 5 | Face outline, blink prompt, progress bar, live-scan privacy text. | Profile setup | ProgressIndicator, privacy notice |
| 9 | Profile basics | 6 | Full name, age, gender fields, progress line, Continue. | Add photo | FormField, ProgressIndicator, PrimaryButton |
| 10 | Add profile photo | 6 | Large image crop, zoom control, Use photo. | Interests and bio | Photo picker/crop, PrimaryButton |
| 11 | Interests and bio | 6 | Interest chips, short bio, character count, Finish setup. | Discover | InterestChip, TextInput, PrimaryButton |
| 12 | Discover feed | 7 | Search summary, filter chips, verified-only filter, two-column profile cards, four-tab bar. | Profile detail, Chat, Wallet, Profile | FilterChip, ProfileCard, BottomTabBar |
| 13 | Verified profile detail | 8 | Back/overflow, large avatar/photo, identity/rating, bio, interests, Message and Add friend. | Private chat or friend action; overflow menu | Avatar, VerifiedBadge, InterestChip, buttons, menu |
| 14 | Nigeria country rooms | 9 | Country heading, coin balance, compact list of city rooms, activity and live dots, tab bar. | Selected country room | ScreenHeader, CoinBalance, RoomListItem, BottomTabBar |
| 15 | Country room conversation | 9 | Room header/count, pinned rules, verified messages, composer. | Room list or other tabs | ScreenHeader, RoomRulesBanner, ChatBubble, MessageComposer |
| 16 | Age-based rooms | 10 | Four age-tier rows with descriptions/live counts and tab bar. | Selected age room | AgeRoomRow, BottomTabBar |
| 17 | Africa General conversation | 10 | Continental member count, country-marked avatars, messages and composer. | Other room types or tabs | ScreenHeader, Avatar, VerifiedBadge, ChatBubble, MessageComposer |
| 18 | Public group chat | 11 | Room title/online count, coin balance/add affordance, verified group messages, composer. | Room list, Wallet/purchase options | ScreenHeader, CoinBalance, ChatBubble, MessageComposer |
| 19 | Private direct chat | 12 | Participant header, online/location status, neutral/coral messages, typing indicator, composer. | Match state or Chat tab | ScreenHeader, Avatar, VerifiedBadge, ChatBubble, TypingIndicator, MessageComposer |
| 20 | New match celebration | 12 | Dark indigo celebration, paired verified avatars, mutual interests, Send a message and Keep browsing. | Private chat or Discover | Avatar, VerifiedBadge, InterestChip, paired buttons |
| 21 | Wallet | 13 | Balance card/Naira value, Buy coins/Redeem/History, recent transactions, tab bar; board also shows a four-week chart. | Coin packs, redemption/history, other tabs | CoinBalanceCard, TransactionRow, BottomTabBar, activity chart |
| 22 | Verified+ premium | 14 | Hero, three plans, Quarterly Best Value, upgrade/cancel/payment copy, benefit cards and testimonial. | Payment flow or return | PremiumPlanCard, PremiumBenefitCard, PrimaryButton |
| 23 | Activity notifications | 15 | Today/This week groups for matches, messages, digest, coin reward, and moderation. | Match, Chat, relevant feature | DateGroupHeading, ActivityRow, BottomTabBar |
| 24 | Report/block confirmation | 15 | Modal with outcomes, optional reason choices, Report & block and Cancel. | Dismiss to prior screen; block can be undone in Settings | ConfirmationDialog, reason chips, buttons |
| 25 | Profile/settings | 16 | Verified profile summary, edit/privacy/subscription/notifications/safety/language/help/logout rows, tab bar. | Profile details, settings subsections, sign out | ProfileSummary, settings row, BottomTabBar |

Page 16's six-step diagram summarizes these groups: Onboard -> Verify -> Setup -> Discover -> Connect -> Grow.

## Inferred navigation structure

```text
Splash
  -> Welcome
  -> 18+ confirmation
  -> Phone number -> OTP
  -> Government ID steps -> ID capture -> Liveness
  -> Profile basics -> Photo -> Interests and bio
  -> Home / Discover
       -> Profile detail -> Private chat -> Match celebration
       -> Country rooms -> Country room conversation
       -> Age rooms -> Age/continental room conversation
       -> Public group chat -> Coin packs / Wallet
  -> Chat tab
  -> Wallet tab -> Buy coins / Redeem / History
  -> Profile tab -> Profile/settings
       -> Activity, privacy, subscription, safety, language, help
```

The four persistent tabs explicitly shown are **Home, Chat, Wallet, Profile**. Rooms are reached through the Home/discovery experience rather than a fifth bottom tab. Activity/notifications are listed in Profile settings and shown as a screen, but their exact entry point is not drawn. The precise relationship between “Chat” tab, room lists, and private conversations is not fully specified; preserve the shown screens and make that routing decision explicit when implementing navigation.

## Product decisions and implementation clarifications

The following values are authoritative in `AGENTS.md` and override conflicting copy or sample data in the Canva PDF:

- Age-room labels and access are 18-25, 26-35, 36-45, and 46+, based on verified date of birth. The PDF labels are examples, not product rules.
- Each public room message costs one coin. Private chat between accepted friends and dating matches is free. The PDF's coin-tipping example does not change that behavior.
- Verified users start with 100 coins. Friend requests are free and will need anti-spam/rate limits.
- Initial Nigeria Premium pricing is ₦4,999/month. Prices are configurable/localized and must be passed into UI components as display values rather than embedded in those components; the PDF's ₦2,500/₦6,500/₦22,000 examples are not current product prices.
- Country rooms use verified country; age rooms use verified date of birth; Africa General is for eligible users in participating countries.
- Coins are an internal token. Use a dedicated coin icon, never a fiat symbol. Use localized fiat currency only for actual purchases.
- The PDF wallet includes a fiat estimate beside a virtual coin balance; omit that estimate under the confirmed fiat-display rule. Show localized fiat prices for actual coin packs or subscriptions only.

Remaining design clarifications are visual rather than product-rule conflicts:

1. **Verification badge placement:** the same coral check moves between card corner, avatar edge, and profile identity line. Standardize its geometry and accessible label while retaining these contextual placements.
2. **Navigation detail:** the PDF shows four tabs but does not specify the exact icon artwork or the entry point for Activity notifications. Keep the labels and structure; settle those details when implementing navigation.
3. **Screen typography scale:** presentation-board titles are much larger than phone content. Use the declared hierarchy and phone mockup proportions, not the 56 display size for routine screen headers.

## Implementation reference rules

- Read this file and inspect the relevant PDF page before implementing a screen group.
- Use the PDF's layout, proportions, content order, visual hierarchy, and component states as the acceptance reference. Do not invent a new brand palette or navigation system.
- Keep shared controls and tokens centralized so repeated screens remain consistent.
- Use synthetic data only for the sample names, messages, identity card, phone number, and transaction values shown in the prototype. Never copy sample identity values into real-user handling.
- Keep market prices configurable and localized. Render virtual coins with a dedicated icon rather than a fiat symbol.
- Follow the confirmed Sora/DM Sans pairing and product rules in `AGENTS.md`; those product rules override conflicting numbers or behavior shown in the PDF.
