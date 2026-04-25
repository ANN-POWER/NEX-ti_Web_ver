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
  const memberImageUrls = [
      "https://cloudflarecnimg.scdn.io/i/69ecacbbba5cc_1777118395.webp",
      "https://i.ibb.co/Lh5RmCvX/m2.png",
      "https://videotourl.com/images/1777117742488-0b15c680-e648-41f9-a510-9a0257c47e4c.png",
      "https://videotourl.com/images/1777117753356-88a776bf-51c0-4853-8539-ffab558a2650.png",
      "https://videotourl.com/images/1777117766678-29e75e5b-8401-4cf8-a5ac-ce9d5af2d7ba.png",
      "https://videotourl.com/images/1777117779734-9e859686-c501-4baa-85ac-c0c11abebe30.png",
      "https://videotourl.com/images/1777117792309-18141db0-b1ae-4d77-a09b-7fdf747eb128.png"
  ];
  // const memberImageUrls = [
  //   "../img/m1.png",
  //   "../img/m2.png",
  //   "../img/m3.png",
  //   "../img/m4.png",
  //   "../img/m5.png",
  //   "../img/m6.png",
  //   "../img/m7.png"
  // ];
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
