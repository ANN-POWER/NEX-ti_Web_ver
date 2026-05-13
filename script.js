(() => {
  const { dimensions, getQuizQuestions, shuffleOptions } = window.NexTiQuestions;
  const { resultProfiles } = window.NexTiResults;
  const { calculateResult, getInitialScores, getOptionLabel } = window.NexTiScoring;
  const { buildMemberBars } = window.NexTiMemberBars;
  const { playRandomBgmOnGesture } = window.NexTiAudio;

  const OPTION_FEEDBACK_DELAY = 240;
  const LANGUAGE_COPY = {
    zh: {
      startButton: "开始测试",
      progress: (current, total) => `第 ${current} 题 / 共 ${total} 题`,
      prevButton: "上一题",
      dnaSubtitle: "七呐成分表——和我最像的成员是……？",
      shareTitle: "分享你的结果",
      shareTip: "需等待七呐成分表加载完成后方能生成分享海报。",
      shareButton: "生成结果图片",
      shareHint: "长按下方图片可保存到手机",
      restartButton: "重新测试",
      signatureEntertainment: "测试结果仅供娱乐（^-^）",
      signatureCopyright: "部分素材源于网络，如有侵权请联系删除",
      signatureCredit: "出品：Chaeriz、芒果汁大猫、宵夜Kyle、junjun22、Fay",
      signatureContact: "联系我们：chaeriz@qq.com"
    },
    ja: {
      startButton: "診断スタート",
      progress: (current, total) => `第 ${current} 問 / 全 ${total} 問`,
      prevButton: "前の問題",
      dnaSubtitle: "七呐成分表——あなたと一番似ているメンバーは……？",
      shareTitle: "診断結果をシェアする",
      shareTip: "NEXZ成分表の読み込み完了後に、シェア画像を生成できます。",
      shareButton: "結果画像を生成",
      shareHint: "下の画像を長押しすると保存できます。",
      restartButton: "もう一回診断",
      signatureEntertainment: "この診断結果はエンタメ目的です（^-^）",
      signatureCopyright: "一部の素材はインターネット上のものを使用しています。著作権等の問題がある場合は削除対応いたしますので、ご連絡ください。",
      signatureCredit: "制作：Chaeriz、芒果汁大猫、宵夜Kyle、junjun22、Fay",
      signatureContact: "お問い合わせは以下まで：chaeriz@qq.com"
    },
    en: {
      startButton: "Start Test",
      progress: (current, total) => `Question ${current} of ${total}`,
      prevButton: "Previous",
      dnaSubtitle: "NEXZ DNA Breakdown — Which member are you most like…?",
      shareTitle: "Share Your Result",
      shareTip: "Please wait until the NEXZ DNA breakdown is fully generated before creating your share card.",
      shareButton: "Generate Result Image",
      shareHint: "Long-press the image below to save it to your phone",
      restartButton: "Retake Test",
      signatureEntertainment: "For entertainment purposes only (^ - ^)",
      signatureCopyright: "Some materials are sourced from the internet. Please contact us for removal if there is any infringement.",
      signatureCredit: "Produced by: Chaeriz, 芒果汁大猫, 宵夜Kyle, junjun22, Fay",
      signatureContact: "Contact us: chaeriz@qq.com"
    }
  };

  let questions = [];
  let optionCache = {};
  let currentIndex = 0;
  let answerHistory = [];
  let currentScores = getInitialScores();
  let isSelecting = false;
  let optionFeedbackTimer = null;
  let latestResultKey = null;
  let selectedLanguage = "zh";

  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const startBtn = document.getElementById("start-btn");
  const languageButtons = Array.from(document.querySelectorAll(".language-btn"));
  const progressText = document.getElementById("progress-text");
  const progressBar = document.getElementById("progress-bar");
  const questionTitle = document.getElementById("question-title");
  const questionImageWrap = document.getElementById("question-image-wrap");
  const questionImage = document.getElementById("question-image");
  const optionsContainer = document.getElementById("options");
  const quizArea = document.getElementById("quiz-area");
  const resultArea = document.getElementById("result-area");
  const resultCode = document.getElementById("result-code");
  const resultName = document.getElementById("result-name");
  const resultImage = document.getElementById("result-image");
  const mbtiDescription = document.getElementById("mbti-description");
  const dimensionBreakdown = document.getElementById("dimension-breakdown");
  const memberBarsContainer = document.getElementById("member-bars");
  const restartBtn = document.getElementById("restart-btn");
  const prevBtn = document.getElementById("prev-btn");
  const shareCanvas = document.getElementById("share-canvas");
  const shareBtn = document.getElementById("share-btn");
  const dnaSubtitle = document.getElementById("dna-subtitle");
  const shareTitle = document.getElementById("share-title");
  const shareTip = document.getElementById("share-tip");
  const sharePreviewWrap = document.getElementById("share-preview-wrap");
  const sharePreviewHint = document.getElementById("share-preview-hint");
  const sharePreview = document.getElementById("share-preview");
  const signatureEntertainment = document.getElementById("signature-entertainment");
  const signatureCopyright = document.getElementById("signature-copyright");
  const signatureCredit = document.getElementById("signature-credit");
  const signatureContact = document.getElementById("signature-contact");

  function enterQuiz() {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
  }

  function backToStart() {
    quizScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
  }

  function buildLabeledOptions(options) {
    const indexed = (options || []).map((option, originalIndex) => ({
      ...option,
      originalIndex
    }));

    return shuffleOptions(indexed).slice(0, 4).map((option, index) => ({
      ...option,
      label: getOptionLabel(index)
    }));
  }

  function getOrBuildOptions(questionIndex, questionList) {
    const question = (questionList || [])[questionIndex];
    if (!question) {
      return [];
    }

    if (!optionCache[questionIndex]) {
      optionCache[questionIndex] = buildLabeledOptions(question.options);
    }

    return optionCache[questionIndex];
  }

  function getLocalizedText(value, language = selectedLanguage) {
    if (typeof value === "string") {
      return value;
    }

    if (!value || typeof value !== "object") {
      return "";
    }

    return value[language] || value.zh || value.en || value.ja || "";
  }

  function getLocalizedResultProfile(profile) {
    if (!profile) {
      return profile;
    }

    return {
      ...profile,
      name: getLocalizedText(profile.name),
      summary: getLocalizedText(profile.summary)
    };
  }

  function updateLanguageSelection(language) {
    if (!LANGUAGE_COPY[language]) {
      return;
    }

    selectedLanguage = language;
    const copy = LANGUAGE_COPY[language];

    startBtn.textContent = copy.startButton;
    prevBtn.textContent = copy.prevButton;
    shareBtn.textContent = copy.shareButton;

    if (dnaSubtitle) {
      dnaSubtitle.textContent = copy.dnaSubtitle;
    }
    if (shareTitle) {
      shareTitle.textContent = copy.shareTitle;
    }
    if (shareTip) {
      shareTip.textContent = copy.shareTip;
    }
    if (sharePreviewHint) {
      sharePreviewHint.textContent = copy.shareHint;
    }
    if (restartBtn) {
      restartBtn.textContent = copy.restartButton;
    }
    if (signatureEntertainment) {
      signatureEntertainment.textContent = copy.signatureEntertainment;
    }
    if (signatureCopyright) {
      signatureCopyright.textContent = copy.signatureCopyright;
    }
    if (signatureCredit) {
      signatureCredit.textContent = copy.signatureCredit;
    }
    if (signatureContact) {
      signatureContact.textContent = copy.signatureContact;
    }

    languageButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.language === language);
    });

    if (questions.length && !quizArea.classList.contains("hidden")) {
      renderQuestion();
    }
  }

  function renderQuestion() {
    const question = questions[currentIndex];
    const currentOptions = getOrBuildOptions(currentIndex, questions);
    const progress = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;

    progressText.textContent = LANGUAGE_COPY[selectedLanguage].progress(currentIndex + 1, questions.length);
    progressBar.style.width = `${progress}%`;
    questionTitle.textContent = getLocalizedText(question.question);
    prevBtn.disabled = currentIndex === 0;

    if (question.image) {
      questionImage.src = question.image;
      questionImageWrap.classList.remove("hidden");
    } else {
      questionImage.removeAttribute("src");
      questionImageWrap.classList.add("hidden");
    }

    optionsContainer.innerHTML = currentOptions.map((option) => `
    <button class="option-btn" data-index="${option.originalIndex}">
      <span class="option-inner">
        <span class="option-label">${option.label}</span>
        <span class="option-text">${getLocalizedText(option.text)}</span>
      </span>
    </button>
  `).join("");

    Array.from(optionsContainer.querySelectorAll(".option-btn")).forEach((button) => {
      button.addEventListener("click", () => answerQuestion(Number(button.dataset.index), button));
    });
  }

  function answerQuestion(optionIndex, clickedButton) {
    if (isSelecting) {
      return;
    }

    const nextIndex = currentIndex + 1;
    const nextHistory = answerHistory.concat(optionIndex);

    isSelecting = true;
    if (clickedButton) {
      clickedButton.classList.add("is-selected");
    }

    if (optionFeedbackTimer) {
      clearTimeout(optionFeedbackTimer);
    }

    optionFeedbackTimer = window.setTimeout(() => {
      if (nextIndex < questions.length) {
        const preview = calculateResult(nextHistory, questions);
        currentScores = preview.scores;
        answerHistory = nextHistory;
        currentIndex = nextIndex;
        isSelecting = false;
        renderQuestion();
        return;
      }

      isSelecting = false;
      showResult(nextHistory);
    }, OPTION_FEEDBACK_DELAY);
  }

  function goToPreviousQuestion() {
    if (isSelecting || currentIndex === 0 || answerHistory.length === 0) {
      return;
    }

    currentIndex -= 1;
    answerHistory = answerHistory.slice(0, -1);
    currentScores = calculateResult(answerHistory, questions).scores;
    renderQuestion();
  }

  function renderDimensionBreakdown(scores) {
    if (!dimensionBreakdown) {
      return;
    }

    dimensionBreakdown.innerHTML = Object.keys(scores).map((key) => `
    <div class="breakdown-item">
      <span class="breakdown-label">${dimensions[key]}</span>
      <span class="breakdown-value">${scores[key]}</span>
    </div>
  `).join("");
  }

  function renderMemberBars(scores) {
    const bars = buildMemberBars(scores);
    memberBarsContainer.innerHTML = bars.map((bar) => `
    <div class="member-bar">
      <img class="member-bar-image" src="${bar.src}" alt="${bar.name}" style="height:${bar.height}px">
      <div class="member-bar-name">${bar.name}</div>
      <div class="member-bar-score">${bar.score}</div>
    </div>
  `).join("");
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Image load failed: ${src}`));
      img.src = src;
    });
  }

  function drawRoundedImage(ctx, img, x, y, width, height, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.clip();
    ctx.drawImage(img, x, y, width, height);
    ctx.restore();
  }

  async function buildShareImage(profile, scores) {
    const ctx = shareCanvas.getContext("2d");
    const width = shareCanvas.width;
    const SHARE_LAYOUTS = {
      zh: {
        dynamicHeight: false,
        canvasHeight: 1180,
        padding: 40,
        cardX: 40,
        cardY: 40,
        resultImageSize: 320,
        resultImageOffsetX: 40,
        titleOffsetY: 60,
        nameOffsetY: 140,
        resultImageOffsetY: 170,
        textOffsetX: 30,
        textOffsetY: 50,
        textRightPadding: 70,
        sectionGap: 10,
        chartTitleMinGap: 4,
        chartTitleFixedGap: 60,
        chartLabelGap: -40,
        chartSidePadding: 50,
        chartHeight: 500,
        chartBarGap: 8,
        chartBottomExtra: 68,
        minimumHeight: 1180
      },
      ja: {
        dynamicHeight: true,
        padding: 40,
        cardX: 40,
        cardY: 40,
        resultImageSize: 320,
        resultImageOffsetX: 40,
        titleOffsetY: 60,
        nameOffsetY: 140,
        resultImageOffsetY: 170,
        textOffsetX: 30,
        textOffsetY: 50,
        textRightPadding: 70,
        sectionGap: 20,
        chartTitleMinGap: 20,
        chartLabelGap: 0,
        chartSidePadding: 50,
        chartHeight: 430,
        chartBarGap: 8,
        chartBottomExtra: 68,
        minimumHeight: 1240
      },
      en: {
        dynamicHeight: true,
        padding: 40,
        cardX: 40,
        cardY: 40,
        resultImageSize: 320,
        resultImageOffsetX: 40,
        titleOffsetY: 60,
        nameOffsetY: 140,
        resultImageOffsetY: 170,
        textOffsetX: 30,
        textOffsetY: 50,
        textRightPadding: 70,
        sectionGap: 20,
        chartTitleMinGap: 20,
        chartLabelGap: 0,
        chartSidePadding: 50,
        chartHeight: 430,
        chartBarGap: 8,
        chartBottomExtra: 68,
        minimumHeight: 1240
      }
    };
    const layout = SHARE_LAYOUTS[selectedLanguage] || SHARE_LAYOUTS.zh;
    const PADDING = layout.padding;
    const CARD_X = layout.cardX;
    const CARD_Y = layout.cardY;
    const CARD_W = width - CARD_X * 2;
    const RESULT_IMG_SIZE = layout.resultImageSize;
    const RESULT_IMG_X = CARD_X + layout.resultImageOffsetX;
    const TITLE_Y = CARD_Y + layout.titleOffsetY;
    const NAME_Y = CARD_Y + layout.nameOffsetY;
    const RESULT_IMG_Y = CARD_Y + layout.resultImageOffsetY;
    const TEXT_X = RESULT_IMG_X + RESULT_IMG_SIZE + layout.textOffsetX;
    const TEXT_Y = RESULT_IMG_Y + layout.textOffsetY;
    const TEXT_MAX_WIDTH = CARD_W - 40 - RESULT_IMG_SIZE - layout.textRightPadding;
    const SECTION_GAP = layout.sectionGap;
    const CHART_TITLE_MIN_GAP = layout.chartTitleMinGap;
    const CHART_LABEL_GAP = layout.chartLabelGap;
    const chartWidth = CARD_W - layout.chartSidePadding * 2;
    const chartX = CARD_X + layout.chartSidePadding;
    const chartHeight = layout.chartHeight;
    const gap = layout.chartBarGap;
    const barWidth = (chartWidth - gap * 6) / 7;
    const bars = buildMemberBars(scores);

    function smartWrapText(ctx, text, x, y, maxWidth, lineHeight, shouldDraw = true) {
      const forbiddenStartChars = /[\u3002\uff1f\uff01\uff0c\u3001\uff1b\uff1a\u201d\u2019\uff09\u300b\u3009\u3011\u300d\u3015\u2026]/;
      const forbiddenEndChars = /[\uff08\u300a\u3008\u3010\u300c\u300e\uff3b\uff5b\u201c\u2018]/;
      const isWhitespace = (segment) => /^\s+$/.test(segment);
      const isLatinWord = (segment) => /^[A-Za-z0-9]+$/.test(segment);
      const isCJKChar = (segment) => /^[\u4e00-\u9fff\u3040-\u30ff]$/.test(segment);

      const segments = [];
      const matcher = /([A-Za-z0-9]+|\s+|[\u4e00-\u9fff\u3040-\u30ff]|[^\sA-Za-z0-9\u4e00-\u9fff\u3040-\u30ff])/g;
      let match;
      while ((match = matcher.exec(text)) !== null) {
        segments.push(match[1]);
      }

      let currentLine = "";
      let cursorY = y;

      const drawLine = (line, drawY) => {
        if (line && shouldDraw) {
          ctx.fillText(line, x, drawY);
        }
      };

      const flushLine = () => {
        const line = currentLine.replace(/\s+$/g, "");
        if (line) {
          drawLine(line, cursorY);
          cursorY += lineHeight;
        }
        currentLine = "";
      };

      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        if (isWhitespace(segment) && currentLine === "") {
          continue;
        }

        const testLine = currentLine + segment;
        const testWidth = ctx.measureText(testLine).width;

        if (testWidth <= maxWidth || currentLine === "") {
          currentLine = testLine;
          continue;
        }

        const lastChar = currentLine.slice(-1);
        if (forbiddenEndChars.test(lastChar)) {
          const contentBeforeBracket = currentLine.slice(0, -1).replace(/\s+$/g, "");
          if (contentBeforeBracket) {
            drawLine(contentBeforeBracket, cursorY);
          }
          currentLine = lastChar + segment;
          cursorY += lineHeight;
          continue;
        }

        if (forbiddenStartChars.test(segment)) {
          currentLine = testLine;
          continue;
        }

        if (isLatinWord(segment) && currentLine.trim()) {
          flushLine();
          currentLine = segment;
          continue;
        }

        if (isCJKChar(segment)) {
          flushLine();
          currentLine = segment;
          continue;
        }

        flushLine();
        currentLine = segment.trimStart();
      }

      if (currentLine) {
        drawLine(currentLine.replace(/\s+$/g, ""), cursorY);
        cursorY += lineHeight;
      }

      return cursorY;
    }

    ctx.font = "26px 'Segoe UI'";
    const summaryBottom = smartWrapText(ctx, profile.summary, TEXT_X, TEXT_Y, TEXT_MAX_WIDTH, 40, false);
    const chartTitleMinY = RESULT_IMG_Y + RESULT_IMG_SIZE + CHART_TITLE_MIN_GAP;
    const chartTitleY = selectedLanguage === "zh"
      ? RESULT_IMG_Y + RESULT_IMG_SIZE + layout.chartTitleFixedGap
      : Math.max(chartTitleMinY, summaryBottom + SECTION_GAP);
    const chartY = chartTitleY + CHART_LABEL_GAP;
    const contentBottom = chartY + chartHeight + layout.chartBottomExtra;
    const height = layout.dynamicHeight
      ? Math.max(layout.minimumHeight, contentBottom + PADDING)
      : layout.canvasHeight;
    const CARD_H = height - 80;

    shareCanvas.height = height;
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#f5d0fe");
    gradient.addColorStop(0.5, "#ddd6fe");
    gradient.addColorStop(1, "#bfdbfe");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.beginPath();
    ctx.roundRect(CARD_X, CARD_Y, CARD_W, CARD_H, 36);
    ctx.fill();

    ctx.textAlign = "start";
    ctx.fillStyle = "#7c3aed";
    ctx.font = "bold 32px 'Segoe UI'";
    ctx.fillText("NEX-ti TEST", CARD_X + 40, TITLE_Y);

    ctx.fillStyle = "#111827";
    ctx.font = "bold 50px 'Segoe UI'";
    ctx.fillText(`${profile.code} · ${profile.name}`, CARD_X + 60, NAME_Y);

    const resultImgEl = document.getElementById("result-image");
    const resultImgSrc = (resultImgEl && resultImgEl.getAttribute("src")) || "img/fox2y.jpg";
    try {
      const resultImg = await loadImage(resultImgSrc);
      drawRoundedImage(ctx, resultImg, RESULT_IMG_X, RESULT_IMG_Y, RESULT_IMG_SIZE, RESULT_IMG_SIZE, 20);
    } catch (_error) {
      ctx.fillStyle = "#e9d5ff";
      ctx.beginPath();
      ctx.roundRect(RESULT_IMG_X, RESULT_IMG_Y, RESULT_IMG_SIZE, RESULT_IMG_SIZE, 20);
      ctx.fill();
      ctx.fillStyle = "#6d28d9";
      ctx.font = "bold 26px 'Segoe UI'";
      ctx.textAlign = "center";
      ctx.fillText("RESULT", RESULT_IMG_X + RESULT_IMG_SIZE / 2, RESULT_IMG_Y + RESULT_IMG_SIZE / 2);
      ctx.textAlign = "start";
    }

    ctx.fillStyle = "#374151";
    ctx.font = "26px 'Segoe UI'";
    smartWrapText(ctx, profile.summary, TEXT_X, TEXT_Y, TEXT_MAX_WIDTH, 40, true);

    ctx.fillStyle = "#6d28d9";
    ctx.font = "bold 28px 'Segoe UI'";
    ctx.fillText("MY NEXZ DNA", CARD_X + 40, chartTitleY);

    const memberImages = await Promise.all(
      bars.map(async (bar) => {
        try {
          return await loadImage(bar.src);
        } catch (_error) {
          return null;
        }
      })
    );

    ctx.strokeStyle = "rgba(139, 92, 246, 0.28)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(chartX, chartY + chartHeight + 6);
    ctx.lineTo(chartX + chartWidth, chartY + chartHeight + 6);
    ctx.stroke();

    const scoreValues = bars.map((b) => b.score);
    const minScore = Math.min(...scoreValues);
    const maxScore = Math.max(...scoreValues);
    const MAX_H = 420;
    const MIN_H = 260;

    bars.forEach((bar, index) => {
      const x = chartX + index * (barWidth + gap);
      let ratio = 0;
      if (maxScore !== minScore) {
        ratio = (bar.score - minScore) / (maxScore - minScore);
      }

      const heightPx = MIN_H + (MAX_H - MIN_H) * ratio;
      const y = chartY + chartHeight - heightPx;
      const memberImg = memberImages[index];

      if (memberImg) {
        drawRoundedImage(ctx, memberImg, x, y, barWidth, heightPx, 12);
      } else {
        ctx.fillStyle = "#ede9fe";
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, heightPx, 12);
        ctx.fill();
      }

      ctx.textAlign = "center";
      ctx.fillStyle = "#334155";
      ctx.font = "bold 18px 'Segoe UI'";
      ctx.fillText(bar.name, x + barWidth / 2, chartY + chartHeight + 32);

      ctx.fillStyle = "#4b5563";
      ctx.font = "bold 16px 'Segoe UI'";
      ctx.fillText(String(bar.score), x + barWidth / 2, chartY + chartHeight + 54);
    });

    try {
      const dataUrl = shareCanvas.toDataURL("image/png");
      if (sharePreview) {
        sharePreview.src = dataUrl;
      }
      if (sharePreviewWrap) {
        sharePreviewWrap.classList.remove("hidden");
      }
    } catch (_error) {
      window.alert("分享图生成失败：图片跨域限制导致无法导出，请稍后重试。");
    }
  }

  function showResult(history) {
    const { scores, resultKey } = calculateResult(history, questions);
    const rawProfile = resultProfiles[resultKey] || resultProfiles.FOREST;
    const profile = getLocalizedResultProfile(rawProfile);

    currentScores = scores;
    answerHistory = history;
    latestResultKey = resultKey;

    resultCode.textContent = profile.code;
    resultName.textContent = profile.name;
    resultImage.src = profile.image;
    mbtiDescription.textContent = profile.summary;
    renderDimensionBreakdown(scores);
    renderMemberBars(scores);
    if (sharePreviewWrap) {
      sharePreviewWrap.classList.add("hidden");
    }
    if (sharePreview) {
      sharePreview.removeAttribute("src");
    }

    quizArea.classList.add("hidden");
    resultArea.classList.remove("hidden");
  }

  function resetQuiz(showStartScreen = false) {
    if (optionFeedbackTimer) {
      clearTimeout(optionFeedbackTimer);
    }

    optionCache = {};
    questions = getQuizQuestions(undefined, selectedLanguage);
    currentIndex = 0;
    answerHistory = [];
    currentScores = getInitialScores();
    isSelecting = false;
    latestResultKey = null;

    if (sharePreviewWrap) {
      sharePreviewWrap.classList.add("hidden");
    }
    if (sharePreview) {
      sharePreview.removeAttribute("src");
    }
    resultArea.classList.add("hidden");
    quizArea.classList.remove("hidden");
    renderQuestion();

    if (showStartScreen) {
      backToStart();
    }
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateLanguageSelection(button.dataset.language);
    });
  });

  startBtn.addEventListener("click", () => {
    playRandomBgmOnGesture();
    resetQuiz();
    enterQuiz();
  });

  prevBtn.addEventListener("click", goToPreviousQuestion);
  restartBtn.addEventListener("click", () => resetQuiz(true));
  shareBtn.addEventListener("click", async () => {
    if (!latestResultKey) {
      return;
    }
    await buildShareImage(getLocalizedResultProfile(resultProfiles[latestResultKey]), currentScores);
  });

  updateLanguageSelection(selectedLanguage);
  resetQuiz(true);
})();
