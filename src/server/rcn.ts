export default function RCN() {
  const chance = Math.random();
  if (chance < 0.99) {
    const rWords =
      "radiant ragged rapid rare rash raw recent reckless rectangular ready real realistic reasonable red reflecting regal regular reliable relieved remarkable remorseful remote repentant required respectful responsible repulsive revolving rewarding rich rigid right ringed ripe roasted robust rosy rotating rotten rough round rowdy royal rubbery rundown ruddy rude runny rural rusty"
        .split(" ")
        .filter((word) => word.trim() !== "");
    const cWords =
      "cut clever close closed cloudy clueless clumsy cluttered coarse cold colorful colorless colossal comfortable common compassionate competent complete complex complicated composed concerned concrete confused conscious considerate constant content conventional cool cooperative coordinated corny corrupt costly courageous courteous crafty crazy creative creepy criminal crisp critical crooked crowded cruel crushing cuddly cultivated cultured cumbersome curly cute cylindrical"
        .split(" ")
        .filter((word) => word.trim() !== "");
    const nWords =
      "naturist newscaster night-owl nation newspaper negotiator number-lover name nothing note-taker networker notice novelist NHS-Worker native nurse nationalist negativity nobody neurologist nuclear-engineer narcissist nihilist"
        .split(" ")
        .filter((word) => word.trim() !== "");

    const randomRWord = rWords[Math.floor(Math.random() * rWords.length)];
    const randomCWord = cWords[Math.floor(Math.random() * cWords.length)];
    const randomNWord = nWords[Math.floor(Math.random() * nWords.length)];

    const rcn = randomRWord + " " + randomCWord + " " + randomNWord;

    return rcn;
  } else {
    return "recon";
  }
}
