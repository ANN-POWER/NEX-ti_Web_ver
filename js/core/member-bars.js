(() => {
  const { dimensionThresholds } = window.NexTiScoring;

  const memberWeights = {
    E: [9, 9, 8, 6, 0, 3.5, 2],
    I: [4, 0, 1, 7, 11, 12, 12],
    L: [6, 10, 4.5, 8.5, 0, 8, 3.5],
    S: [12, 5, 2, 5, 9, 5.5, 3],
    X: [2, 2.5, 10, 3, 9, 2.5, 8.5],
    P: [2, 9, 9, 6.5, 8, 5, 7.5]
  };

  const memberNames = ["YU", "TOMOYA", "HARU", "SO GEON", "SEITA", "HYUI", "YUKI"];
  // const memberImageUrls = [
  //   "https://i.ibb.co/gMzD95vR/m1.png",
  //   "https://i.ibb.co/Lh5RmCvX/m2.png",
  //   "https://i.ibb.co/WWSrtCHT/m3.png",
  //   "https://i.ibb.co/6727sk2D/m4.png",
  //   "https://i.ibb.co/6cNp7zJ5/m5.png",
  //   "https://i.ibb.co/GvbMH4G0/m6.png",
  //   "https://i.ibb.co/5hLRwnhf/m7.png"
  // ];
  const memberImageUrls = [
    "../img/m1.png",
    "../img/m2.png",
    "../img/m3.png",
    "../img/m4.png",
    "../img/m5.png",
    "../img/m6.png",
    "../img/m7.png"
  ];
  function buildMemberBars(scores) {
    const members = [0, 0, 0, 0, 0, 0, 0];
    const dimensionKeys = Object.keys(memberWeights);
    const dimensionRates = {};

    dimensionKeys.forEach((key) => {
      const threshold = dimensionThresholds[key] || 1;
      const rawRate = (scores[key] || 0) / threshold;
      dimensionRates[key] = Math.max(0, rawRate);
    });

    const totalRate = dimensionKeys.reduce((sum, key) => sum + dimensionRates[key], 0);
    const normalizedRates = {};

    dimensionKeys.forEach((key) => {
      normalizedRates[key] = totalRate > 0 ? dimensionRates[key] / totalRate : 0;
    });

    dimensionKeys.forEach((key) => {
      const rate = normalizedRates[key];
      const weights = memberWeights[key];

      for (let i = 0; i < members.length; i += 1) {
        members[i] += rate * weights[i];
      }
    });

    const minScore = Math.min(...members);
    const maxScore = Math.max(...members);
    const minHeight = 120;
    const maxHeight = 180;
    const scoreRange = maxScore - minScore;

    return members.map((score, index) => ({
      key: `z${index + 1}`,
      name: memberNames[index],
      src: memberImageUrls[index],
      score: Number(score.toFixed(2)),
      height: scoreRange > 0
        ? Math.round(minHeight + ((score - minScore) / scoreRange) * (maxHeight - minHeight))
        : Math.round((minHeight + maxHeight) / 2)
    }));
  }

  window.NexTiMemberBars = {
    buildMemberBars
  };
})();
