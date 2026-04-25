(() => {
  const HIGH_E_THRESHOLD = 18;
  const HIGH_I_THRESHOLD = 18;
  const HIGH_P_THRESHOLD = 20;
  const HIGH_L_THRESHOLD = 22;
  const HIGH_S_THRESHOLD = 18;
  const HIGH_X_THRESHOLD = 17;

  const a1 = 0.15;
  const a2 = 0.25;
  const a3 = 0.41;

  const dimensionThresholds = {
    E: HIGH_E_THRESHOLD,
    I: HIGH_I_THRESHOLD,
    L: HIGH_L_THRESHOLD,
    S: HIGH_S_THRESHOLD,
    X: HIGH_X_THRESHOLD,
    P: HIGH_P_THRESHOLD
  };

  function getInitialScores() {
    return { E: 0, I: 0, L: 0, S: 0, X: 0, P: 0 };
  }

  function calculateScores(answers, questionList) {
    const scores = getInitialScores();
    const questions = questionList || [];

    answers.forEach((optionIndex, questionIndex) => {
      const question = questions[questionIndex];
      if (!question || question.countForScore === false) {
        return;
      }

      const option = question.options[optionIndex];
      if (!option || !Array.isArray(option.type)) {
        return;
      }

      option.type.forEach((typeKey) => {
        if (Object.prototype.hasOwnProperty.call(scores, typeKey)) {
          scores[typeKey] += 1;
        }
      });
    });

    return scores;
  }

  function getResultKey(scores) {
    const { E, I, L, S, X, P } = scores;

    if (P > HIGH_P_THRESHOLD * a3) {
      return "MAFIA";
    }
    if (L > HIGH_L_THRESHOLD * a2) {
      if (P > HIGH_P_THRESHOLD * a2 && E >= I + 2) {
        return "RTH";
      }
      if (I > E + 2 && P > HIGH_P_THRESHOLD * a1) {
        return "MIRACLE";
      }
    }
    if (X > HIGH_X_THRESHOLD * a2) {
      if (I > E && P > 0) {
        return "QUEEN";
      }
      if (E > I + 1) {
        return "WQNL";
      }
    }
    if (E >= HIGH_E_THRESHOLD * a3) {
      return "EEEE";
    }
    if (S > HIGH_S_THRESHOLD * a2) {
      if (I > HIGH_I_THRESHOLD * a3 - 1) {
        return "FOREST";
      }
    }
    if (P <= HIGH_P_THRESHOLD * a1 || L <= HIGH_L_THRESHOLD * a1) {
      return "O_RLY";
    }
    if (S > HIGH_S_THRESHOLD * a2) {
      if (L > HIGH_L_THRESHOLD * a1) {
        return "MAJIA";
      }
    }
    if (X > HIGH_X_THRESHOLD * a1 && P > 1) {
      return "AJEOSSI";
    }
    return "HAHA";
  }

  function calculateResult(answers, questionList) {
    const scores = calculateScores(answers || [], questionList || []);
    const resultKey = getResultKey(scores);

    return {
      scores,
      resultKey
    };
  }

  function getOptionLabel(index) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (index < alphabet.length) {
      return alphabet[index];
    }

    const first = Math.floor(index / alphabet.length) - 1;
    const second = index % alphabet.length;
    return `${alphabet[first]}${alphabet[second]}`;
  }

  window.NexTiScoring = {
    dimensionThresholds,
    getInitialScores,
    calculateResult,
    getOptionLabel
  };
})();
