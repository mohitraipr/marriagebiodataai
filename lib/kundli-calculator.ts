// Kundli Milan (Ashtakoot Gun Milan) Calculator

import {
  rashiData,
  nakshatraData,
  varnaByRashi,
  vashyaByRashi,
  yoniByNakshatra,
} from "./biodata-config";

export interface KundliInput {
  name: string;
  rashi: string;
  nakshatra: number;
}

export interface GunResult {
  name: string;
  hindi: string;
  maxPoints: number;
  obtainedPoints: number;
  description: string;
  details: string;
}

export interface KundliResult {
  totalPoints: number;
  maxPoints: number;
  percentage: number;
  verdict: string;
  verdictColor: string;
  guns: GunResult[];
  recommendation: string;
}

// Varna Gun Calculation (Max 1 point)
function calculateVarna(boyRashi: string, girlRashi: string): { points: number; details: string } {
  const varnaOrder = ["Brahmin", "Kshatriya", "Vaishya", "Shudra"];
  const boyVarna = varnaByRashi[boyRashi];
  const girlVarna = varnaByRashi[girlRashi];

  const boyIndex = varnaOrder.indexOf(boyVarna);
  const girlIndex = varnaOrder.indexOf(girlVarna);

  // Boy's Varna should be equal or higher than Girl's
  if (boyIndex <= girlIndex) {
    return { points: 1, details: `Boy (${boyVarna}) >= Girl (${girlVarna}) - Compatible` };
  }
  return { points: 0, details: `Boy (${boyVarna}) < Girl (${girlVarna}) - Not compatible` };
}

// Vashya Gun Calculation (Max 2 points)
function calculateVashya(boyRashi: string, girlRashi: string): { points: number; details: string } {
  const boyVashya = vashyaByRashi[boyRashi];
  const girlVashya = vashyaByRashi[girlRashi];

  // Same Vashya = 2 points
  if (boyVashya === girlVashya) {
    return { points: 2, details: `Same Vashya (${boyVashya}) - Excellent` };
  }

  // Dwipada with any other = 1 point
  if (boyVashya === "Dwipada" || girlVashya === "Dwipada") {
    return { points: 1, details: `${boyVashya} & ${girlVashya} - Partial compatibility` };
  }

  // Chatushpada-Vanachara = 1 point
  if ((boyVashya === "Chatushpada" && girlVashya === "Vanachara") ||
      (boyVashya === "Vanachara" && girlVashya === "Chatushpada")) {
    return { points: 1, details: `${boyVashya} & ${girlVashya} - Partial compatibility` };
  }

  return { points: 0, details: `${boyVashya} & ${girlVashya} - Not compatible` };
}

// Tara Gun Calculation (Max 3 points)
function calculateTara(boyNakshatra: number, girlNakshatra: number): { points: number; details: string } {
  // Calculate Tara from boy to girl and girl to boy
  const boyTara = ((girlNakshatra - boyNakshatra + 27) % 27) % 9;
  const girlTara = ((boyNakshatra - girlNakshatra + 27) % 27) % 9;

  const inauspiciousTaras = [2, 4, 6, 8]; // Vipat, Pratyari, Vadh, Mrityu

  const boyAuspicious = !inauspiciousTaras.includes(boyTara);
  const girlAuspicious = !inauspiciousTaras.includes(girlTara);

  if (boyAuspicious && girlAuspicious) {
    return { points: 3, details: "Both Taras auspicious - Excellent" };
  } else if (boyAuspicious || girlAuspicious) {
    return { points: 1.5, details: "One Tara auspicious - Moderate" };
  }
  return { points: 0, details: "Both Taras inauspicious - Caution advised" };
}

// Yoni Gun Calculation (Max 4 points)
function calculateYoni(boyNakshatra: number, girlNakshatra: number): { points: number; details: string } {
  const boyYoni = yoniByNakshatra[boyNakshatra];
  const girlYoni = yoniByNakshatra[girlNakshatra];

  if (!boyYoni || !girlYoni) {
    return { points: 2, details: "Unable to determine Yoni" };
  }

  // Same animal = 4 points
  if (boyYoni.animal === girlYoni.animal) {
    return { points: 4, details: `Same Yoni (${boyYoni.animal}) - Excellent compatibility` };
  }

  // Enemy animals = 0 points
  const enemies: Record<string, string> = {
    "Horse": "Buffalo", "Elephant": "Lion", "Goat": "Monkey",
    "Serpent": "Mongoose", "Dog": "Deer", "Cat": "Rat",
    "Tiger": "Cow", "Buffalo": "Horse", "Lion": "Elephant",
    "Monkey": "Goat", "Mongoose": "Serpent", "Deer": "Dog",
    "Rat": "Cat", "Cow": "Tiger"
  };

  if (enemies[boyYoni.animal] === girlYoni.animal) {
    return { points: 0, details: `Enemy Yonis (${boyYoni.animal} & ${girlYoni.animal}) - Not compatible` };
  }

  // Friendly = 3 points, Neutral = 2 points
  return { points: 2, details: `${boyYoni.animal} & ${girlYoni.animal} - Moderate compatibility` };
}

// Graha Maitri Gun Calculation (Max 5 points)
function calculateGrahaMaitri(boyRashi: string, girlRashi: string): { points: number; details: string } {
  const boyRashiData = rashiData.find(r => r.id === boyRashi);
  const girlRashiData = rashiData.find(r => r.id === girlRashi);

  if (!boyRashiData || !girlRashiData) {
    return { points: 2.5, details: "Unable to determine lords" };
  }

  const boyLord = boyRashiData.lord;
  const girlLord = girlRashiData.lord;

  // Same lord = 5 points
  if (boyLord === girlLord) {
    return { points: 5, details: `Same Lord (${boyLord}) - Excellent mental compatibility` };
  }

  // Friendly lords
  const friends: Record<string, string[]> = {
    "Sun": ["Moon", "Mars", "Jupiter"],
    "Moon": ["Sun", "Mercury"],
    "Mars": ["Sun", "Moon", "Jupiter"],
    "Mercury": ["Sun", "Venus"],
    "Jupiter": ["Sun", "Moon", "Mars"],
    "Venus": ["Mercury", "Saturn"],
    "Saturn": ["Mercury", "Venus"],
    "Rahu": ["Saturn", "Venus"],
    "Ketu": ["Mars", "Jupiter"],
  };

  const boyFriends = friends[boyLord] || [];
  const girlFriends = friends[girlLord] || [];

  const mutualFriendship = boyFriends.includes(girlLord) && girlFriends.includes(boyLord);
  const oneSidedFriendship = boyFriends.includes(girlLord) || girlFriends.includes(boyLord);

  if (mutualFriendship) {
    return { points: 5, details: `${boyLord} & ${girlLord} - Mutual friendship` };
  } else if (oneSidedFriendship) {
    return { points: 3, details: `${boyLord} & ${girlLord} - One-sided friendship` };
  }

  return { points: 0, details: `${boyLord} & ${girlLord} - Not friendly` };
}

// Gana Gun Calculation (Max 6 points)
function calculateGana(boyNakshatra: number, girlNakshatra: number): { points: number; details: string } {
  const boyNakshatraData = nakshatraData.find(n => n.id === boyNakshatra);
  const girlNakshatraData = nakshatraData.find(n => n.id === girlNakshatra);

  if (!boyNakshatraData || !girlNakshatraData) {
    return { points: 3, details: "Unable to determine Gana" };
  }

  const boyGan = boyNakshatraData.gan;
  const girlGan = girlNakshatraData.gan;

  // Same Gana = 6 points
  if (boyGan === girlGan) {
    return { points: 6, details: `Same Gana (${boyGan}) - Excellent temperament match` };
  }

  // Deva-Manushya = 5 points
  if ((boyGan === "Deva" && girlGan === "Manushya") ||
      (boyGan === "Manushya" && girlGan === "Deva")) {
    return { points: 5, details: `${boyGan} & ${girlGan} - Good compatibility` };
  }

  // Deva-Rakshasa = 1 point
  if ((boyGan === "Deva" && girlGan === "Rakshasa") ||
      (boyGan === "Rakshasa" && girlGan === "Deva")) {
    return { points: 1, details: `${boyGan} & ${girlGan} - Caution advised` };
  }

  // Manushya-Rakshasa = 0 points (but can be 3 with exceptions)
  return { points: 0, details: `${boyGan} & ${girlGan} - May face challenges` };
}

// Bhakoot Gun Calculation (Max 7 points)
function calculateBhakoot(boyRashi: string, girlRashi: string): { points: number; details: string } {
  const rashiOrder = ["mesh", "vrishabh", "mithun", "kark", "singh", "kanya",
                      "tula", "vrishchik", "dhanu", "makar", "kumbh", "meen"];

  const boyIndex = rashiOrder.indexOf(boyRashi);
  const girlIndex = rashiOrder.indexOf(girlRashi);

  if (boyIndex === -1 || girlIndex === -1) {
    return { points: 3.5, details: "Unable to determine position" };
  }

  const diff = Math.abs(boyIndex - girlIndex);
  const position = Math.min(diff, 12 - diff) + 1;

  // 1/1, 1/7, 3/11, 4/10, 5/9, 6/8 are inauspicious
  const inauspicious = [1, 6, 8, 12]; // Positions that form inauspicious combinations

  // Check for specific inauspicious combinations
  if ([2, 6, 8, 12].includes(position)) {
    return { points: 0, details: `Position ${position}/12 - Bhakoot Dosha present` };
  }

  return { points: 7, details: `Position ${position}/12 - Auspicious combination` };
}

// Nadi Gun Calculation (Max 8 points) - MOST IMPORTANT
function calculateNadi(boyNakshatra: number, girlNakshatra: number): { points: number; details: string } {
  const boyNakshatraData = nakshatraData.find(n => n.id === boyNakshatra);
  const girlNakshatraData = nakshatraData.find(n => n.id === girlNakshatra);

  if (!boyNakshatraData || !girlNakshatraData) {
    return { points: 4, details: "Unable to determine Nadi" };
  }

  const boyNadi = boyNakshatraData.nadi;
  const girlNadi = girlNakshatraData.nadi;

  // Same Nadi = 0 points (Nadi Dosha)
  if (boyNadi === girlNadi) {
    return { points: 0, details: `Same Nadi (${boyNadi}) - NADI DOSHA - Health issues for progeny` };
  }

  // Different Nadi = 8 points
  return { points: 8, details: `Different Nadi (${boyNadi} & ${girlNadi}) - Excellent for progeny health` };
}

// Main Kundli Milan Function
export function calculateKundliMilan(boy: KundliInput, girl: KundliInput): KundliResult {
  const guns: GunResult[] = [];

  // 1. Varna
  const varnaResult = calculateVarna(boy.rashi, girl.rashi);
  guns.push({
    name: "Varna",
    hindi: "वर्ण",
    maxPoints: 1,
    obtainedPoints: varnaResult.points,
    description: "Spiritual compatibility & ego levels",
    details: varnaResult.details,
  });

  // 2. Vashya
  const vashyaResult = calculateVashya(boy.rashi, girl.rashi);
  guns.push({
    name: "Vashya",
    hindi: "वश्य",
    maxPoints: 2,
    obtainedPoints: vashyaResult.points,
    description: "Mutual attraction & dominance",
    details: vashyaResult.details,
  });

  // 3. Tara
  const taraResult = calculateTara(boy.nakshatra, girl.nakshatra);
  guns.push({
    name: "Tara",
    hindi: "तारा",
    maxPoints: 3,
    obtainedPoints: taraResult.points,
    description: "Destiny & luck compatibility",
    details: taraResult.details,
  });

  // 4. Yoni
  const yoniResult = calculateYoni(boy.nakshatra, girl.nakshatra);
  guns.push({
    name: "Yoni",
    hindi: "योनि",
    maxPoints: 4,
    obtainedPoints: yoniResult.points,
    description: "Physical & sexual compatibility",
    details: yoniResult.details,
  });

  // 5. Graha Maitri
  const maitriResult = calculateGrahaMaitri(boy.rashi, girl.rashi);
  guns.push({
    name: "Graha Maitri",
    hindi: "ग्रह मैत्री",
    maxPoints: 5,
    obtainedPoints: maitriResult.points,
    description: "Mental compatibility & friendship",
    details: maitriResult.details,
  });

  // 6. Gana
  const ganaResult = calculateGana(boy.nakshatra, girl.nakshatra);
  guns.push({
    name: "Gana",
    hindi: "गण",
    maxPoints: 6,
    obtainedPoints: ganaResult.points,
    description: "Temperament & behavior",
    details: ganaResult.details,
  });

  // 7. Bhakoot
  const bhakootResult = calculateBhakoot(boy.rashi, girl.rashi);
  guns.push({
    name: "Bhakoot",
    hindi: "भकूट",
    maxPoints: 7,
    obtainedPoints: bhakootResult.points,
    description: "Love, family welfare & finances",
    details: bhakootResult.details,
  });

  // 8. Nadi
  const nadiResult = calculateNadi(boy.nakshatra, girl.nakshatra);
  guns.push({
    name: "Nadi",
    hindi: "नाड़ी",
    maxPoints: 8,
    obtainedPoints: nadiResult.points,
    description: "Health & genes of children",
    details: nadiResult.details,
  });

  const totalPoints = guns.reduce((sum, gun) => sum + gun.obtainedPoints, 0);
  const maxPoints = 36;
  const percentage = Math.round((totalPoints / maxPoints) * 100);

  let verdict: string;
  let verdictColor: string;
  let recommendation: string;

  if (totalPoints >= 28) {
    verdict = "Excellent Match";
    verdictColor = "#22c55e";
    recommendation = "This is an excellent match. The couple is highly compatible and likely to have a harmonious married life.";
  } else if (totalPoints >= 21) {
    verdict = "Good Match";
    verdictColor = "#84cc16";
    recommendation = "This is a good match. The couple has good compatibility with minor differences that can be worked out.";
  } else if (totalPoints >= 18) {
    verdict = "Average Match";
    verdictColor = "#eab308";
    recommendation = "This is an average match. Some remedies may be needed. Consult a pandit for specific solutions.";
  } else if (totalPoints >= 14) {
    verdict = "Below Average";
    verdictColor = "#f97316";
    recommendation = "This match has some concerns. Proper remedies and mutual understanding are essential for success.";
  } else {
    verdict = "Not Recommended";
    verdictColor = "#ef4444";
    recommendation = "This match has significant compatibility issues. It is advisable to reconsider or consult an experienced astrologer for remedies.";
  }

  return {
    totalPoints,
    maxPoints,
    percentage,
    verdict,
    verdictColor,
    guns,
    recommendation,
  };
}
