/**
 * ============================================================
 *  KALPANA DIDI SURPRISE — CENTRAL CONFIGURATION
 * ============================================================
 *  This is the only file you need to edit to personalise the
 *  experience. Change `person.name` and every scene updates.
 *
 *  Any text may contain the token {name} — it is replaced with
 *  `person.name` wherever it appears.
 *
 *  Scenes (one at a time, never stacked):
 *    1. The first question
 *    2. The second question
 *    3. The shoebox (every photo in public/photos/)
 *    4. The love letter from Ajay
 *    5. The Doraemon-inspired Anywhere Door
 * ============================================================
 */

export const config = {
  /* ----------------------------------------------------------
   *  WHO IS THIS FOR?
   * ---------------------------------------------------------- */
  person: {
    name: 'Kalpana Didi',
  },

  /* ----------------------------------------------------------
   *  BROWSER TAB
   * ---------------------------------------------------------- */
  site: {
    title: 'Something special for {name} ✨',
    description:
      'Five little scenes made by Ajay — a question, a few memories, a letter and one door.',
  },

  /* ----------------------------------------------------------
   *  SCENE 1 — THE FIRST QUESTION
   *  `bubble` is the tiny line Doraemon says above his head.
   * ---------------------------------------------------------- */
  sceneOne: {
    eyebrow: 'Five little scenes · just for you',
    bubble: 'Okay. Deep breath. She is here.',
    lead: "I've made something special for you.",
    question: 'Do you wanna see it?',
    yesLabel: 'YES',
    noLabel: 'NO',
    hint: 'No scrollbars. No rush. Just us.',
    replies: [
      'That button is feeling shy. Give it another go?',
      'Hmm. Try again — I promise it is worth it.',
      'The NO button keeps running away. Very suspicious.',
      'I can wait. I am extremely patient. (Mostly.)',
      'Nice try. The YES button has been waiting all day.',
    ],
  },

  /* ----------------------------------------------------------
   *  SCENE 2 — THE SECOND QUESTION
   * ---------------------------------------------------------- */
  sceneTwo: {
    eyebrow: 'One tiny check',
    bubble: 'Wait. Are you absolutely sure?',
    lead: 'Do you REALLY wanna see it?',
    yesLabel: 'YES',
    noLabel: 'NO',
    hint: 'There is no going back after this. (There is. But still.)',
    replies: [
      'Bold. Incorrect, but bold.',
      'You are really committing to this bit, huh?',
      'I can do this all day. I have snacks.',
      'The YES button is getting nervous. Be gentle.',
      'You know you want to. I can see it in your face.',
    ],
  },

  /* ----------------------------------------------------------
   *  SCENE 3 — THE SHOEBOX
   *  Every image dropped into public/photos/ appears here as a
   *  scrapbook card, in file-name order. Captions are derived
   *  from the file name; override any of them below by file name.
   * ---------------------------------------------------------- */
  gallery: {
    eyebrow: 'The shoebox',
    title: 'A Little Collection of Our Memories',
    subtitle: 'A few of my favourite days, kept in one little box.',
    continueLabel: 'Continue',
    emptyTitle: 'The shoebox is still being filled.',
    /* e.g. 'beach-day.jpg': 'The day you stole my ice cream' */
    captions: {
      'IMG-20261108-WA0005.jpg.jpeg': 'The whole family, one frame',
      'IMG-20261112-WA0007(1).jpg.jpeg': 'Dressed up for the festival',
      'IMG-20261112-WA0011.jpg.jpeg': 'All of us, side by side',
      'IMG-20261112-WA0012.jpg.jpeg': 'Dinner together, the best kind of noisy',
      'IMG-20261113-WA0012.jpg.jpeg': 'Squeezed in for one more',
      'IMG-20261114-WA0012.jpg.jpeg': 'One last selfie before goodbye',
    },
  },

  /* ----------------------------------------------------------
   *  SCENE 4 — THE LETTER
   * ---------------------------------------------------------- */
  letter: {
    eyebrow: 'Something I have been meaning to say',
    title: 'A letter for {name}',
    envelopeHint: 'Tap the envelope — it is embarrassingly sincere inside',
    openLabel: 'Open your letter',
    greeting: 'Dear {name},',
    paragraphs: [
      'You were my first friend and my loudest one — the person who turned ordinary afternoons into blanket forts and invented games with rules only we understood. Half of who I am was shaped in those messy, giggling years with you.',
      'We have argued over the last slice and the front seat, and made up before dinner every single time. That is the thing about us: the door slams, then someone brings tea. You have seen me at my worst and stayed anyway.',
      'So here is my promise — wherever life puts us, I am on your side. I will answer the phone, show up when it matters, and keep believing in you on the days you cannot. Same team, always. That part never changes.',
    ],
    closing: 'Always in your corner,',
    signature: '— Ajay',
    continueLabel: 'Continue',
  },

  /* ----------------------------------------------------------
   *  SCENE 5 — THE ANYWHERE DOOR + FINALE
   * ---------------------------------------------------------- */
  door: {
    eyebrow: 'One last door',
    title: 'One more thing, {name}…',
    message: 'Behind this door is the only wish I have ever needed to make for us.',
    doorSign: 'Anywhere Door',
    photoAlt: 'The photo waiting behind the Anywhere Door',
    doorHint: 'Tap the door to open it',
    doorLabel: 'Open the Anywhere Door',
    finale: {
      eyebrow: 'And that is the whole surprise',
      title: 'Wherever you go, I am already there.',
      body: 'Any distance, any city, any year — the door still opens back to me. Same team, always.',
      signature: '— Ajay, forever',
      replayLabel: 'Replay from the start',
    },
  },
}

/* ============================================================
 *  HELPERS — no need to edit below this line
 * ============================================================ */

const NAME_TOKEN = '{name}'

/**
 * Replaces every {name} token in a string with the configured name.
 */
export function withName(text) {
  if (typeof text !== 'string') return text
  return text.split(NAME_TOKEN).join(config.person.name)
}

export default config
