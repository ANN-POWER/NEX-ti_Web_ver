(() => {
  const { dimensions, getQuizQuestions, shuffleOptions } = window.NexTiQuestions;
  const { resultProfiles } = window.NexTiResults;
  const { calculateResult, getInitialScores, getOptionLabel } = window.NexTiScoring;
  const { buildMemberBars } = window.NexTiMemberBars;
  const { playRandomBgmOnGesture } = window.NexTiAudio;

  const OPTION_FEEDBACK_DELAY = 240;

  let questions = [];
  let optionCache = {};
  let currentIndex = 0;
  let answerHistory = [];
  let currentScores = getInitialScores();
  let isSelecting = false;
  let optionFeedbackTimer = null;
  let latestResultKey = null;

  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const startBtn = document.getElementById("start-btn");
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
  const mbtiDescription = document.getElementById("mbti-description");
  const dimensionBreakdown = document.getElementById("dimension-breakdown");
  const memberBarsContainer = document.getElementById("member-bars");
  const restartBtn = document.getElementById("restart-btn");
  const prevBtn = document.getElementById("prev-btn");
  const shareCanvas = document.getElementById("share-canvas");
  const shareBtn = document.getElementById("share-btn");
  const sharePreviewWrap = document.getElementById("share-preview-wrap");
  const sharePreview = document.getElementById("share-preview");

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

  function renderQuestion() {
    const question = questions[currentIndex];
    const currentOptions = getOrBuildOptions(currentIndex, questions);
    const progress = questions.length ? ((currentIndex + 1) / questions.length) * 100 : 0;

    progressText.textContent = `第 ${currentIndex + 1} 题 / 共 ${questions.length} 题`;
    progressBar.style.width = `${progress}%`;
    questionTitle.textContent = question.question;
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
        <span class="option-text">${option.text}</span>
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

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const chars = Array.from(text || "");
    const tokens = [];
    let line = "";
    let currentY = y;
    let index = 0;

    while (index < chars.length) {
      const char = chars[index];

      if (/\s/.test(char)) {
        while (index < chars.length && /\s/.test(chars[index])) {
          index += 1;
        }
        tokens.push(" ");
        continue;
      }

      if (/[A-Za-z0-9]/.test(char)) {
        let word = char;
        index += 1;
        while (index < chars.length && /[A-Za-z0-9._'-]/.test(chars[index])) {
          word += chars[index];
          index += 1;
        }
        tokens.push(word);
        continue;
      }

      tokens.push(char);
      index += 1;
    }

    tokens.forEach((token) => {
      const testLine = line + token;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line.trimEnd(), x, currentY);
        line = token.trimStart();
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    });

    if (line) {
      ctx.fillText(line.trimEnd(), x, currentY);
    }
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
    const height = shareCanvas.height;

    ctx.clearRect(0, 0, width, height);
    const PADDING = 50; // 全局留白，防止贴边
    const CONTENT_WIDTH = width - PADDING * 2; // 内容区域总宽 = 980

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#f5d0fe");
    gradient.addColorStop(0.5, "#ddd6fe");
    gradient.addColorStop(1, "#bfdbfe");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const CARD_SIZE = 980;
    const CARD_X = (width - CARD_SIZE) / 2; // 自动计算居中 X = 50
    const CARD_Y = 40;
    ctx.fillStyle = "rgba(255,255,255,0.95)"; // 稍微提高不透明度
    ctx.beginPath();
    ctx.roundRect(CARD_X, CARD_Y, CARD_SIZE, 1000, 36); // 高度给足，防止底部被切
    ctx.fill();
    // --- 2. 顶部标题区 ---
    ctx.textAlign = "start"; // 左对齐
    ctx.fillStyle = "#7c3aed";
    ctx.font = "bold 32px 'Segoe UI'";
    ctx.fillText("NEX-ti TEST", CARD_X + 40, CARD_Y + 60);

    ctx.fillStyle = "#111827";
    ctx.font = "bold 50px 'Segoe UI'";
    // 这里的 Y 轴稍微下调，留出标题间距
    ctx.fillText(`${profile.code} · ${profile.name}`, CARD_X + 60, CARD_Y + 140);



    const resultImgEl = document.getElementById("result-image");
    const resultImgSrc = (resultImgEl && resultImgEl.getAttribute("src")) || "img/fox2y.jpg";
    const RESULT_IMG_SIZE = 280; // 稍微调小一点以适应布局
    const RESULT_IMG_X = CARD_X + 40;
    const RESULT_IMG_Y = CARD_Y + 170;
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
      ctx.fillText("RESULT", RESULT_IMG_X + RESULT_IMG_SIZE / 2, RESULT_IMG_Y + RESULT_IMG_SIZE / 2);
    }

    ctx.fillStyle = "#374151";
    ctx.font = "26px 'Segoe UI'";
    const TEXT_MAX_WIDTH = CONTENT_WIDTH - 40 - RESULT_IMG_SIZE - 70;
    wrapText(ctx, profile.summary, RESULT_IMG_X + RESULT_IMG_SIZE + 30, RESULT_IMG_Y + 42, TEXT_MAX_WIDTH, 40);

    // --- 4. 底部图表区 (DNA Bars) ---
    const SECTION_GAP = 80; // 模块间距
    const CHART_TITLE_Y = RESULT_IMG_Y + RESULT_IMG_SIZE + SECTION_GAP;
    ctx.fillStyle = "#6d28d9";
    ctx.font = "bold 28px 'Segoe UI'";
    ctx.fillText("MY NEXZ DNA", CARD_X + 40, CHART_TITLE_Y);


    const bars = buildMemberBars(scores);

    const chartWidth = 600;
    const chartHeight = 340;
    const chartX = (width - chartWidth) / 2;
    const chartY = CHART_TITLE_Y + 40;
    const gap = 0;
    const barWidth = (chartWidth - gap * 6) / 7;

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

    // --- 1. 计算数据的极值 (最大值和最小值) ---
    const scoreValues = bars.map((b) => b.score);
    const minScore = Math.min(...scoreValues);
    const maxScore = Math.max(...scoreValues);

    // --- 2. 设置柱子的高度范围 (在这里调整视觉上限和下限) ---
    const MAX_H = 360; // 最高柱子的高度 (对应分数最高的人)
    const MIN_H = 240;  // 最矮柱子的高度 (对应分数最低的人，防止太短看不见)


    // --- 4. 循环绘制 ---
    bars.forEach((bar, index) => {
      const x = chartX + index * (barWidth + gap);

      // 【核心算法】线性插值
      // 计算当前分数在 [minScore, maxScore] 区间内的位置比例 (0 ~ 1)
      let ratio = 0;
      if (maxScore !== minScore) {
        ratio = (bar.score - minScore) / (maxScore - minScore);
      }

      // 根据比例计算实际高度：最小高度 + (总可用高度差 * 比例)
      const heightPx = MIN_H + (MAX_H - MIN_H) * ratio;

      // 计算 Y 轴坐标 (底部对齐)
      const y = chartY + chartHeight - heightPx;

      const memberImg = memberImages[index];

      // 1. 绘制柱体 (图片拉伸填充)
      if (memberImg) {
        drawRoundedImage(ctx, memberImg, x, y, barWidth, heightPx, 12);
      } else {
        // 图片加载失败时的占位色块
        ctx.fillStyle = "#ede9fe";
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, heightPx, 12);
        ctx.fill();
      }

      // 2. 绘制底部文字 (名字 + 分数)
      ctx.textAlign = "center";

      // 第一行：成员名字
      ctx.fillStyle = "#334155";
      ctx.font = "bold 14px 'Segoe UI'";
      // 注意：这里的 Y 轴是基于 chartY + chartHeight 的绝对位置，不受柱子高度影响
      ctx.fillText(bar.name, x + barWidth / 2, chartY + chartHeight + 24);

      // 第二行：分数
      ctx.fillStyle = "#4b5563";
      ctx.font = "bold 13px 'Segoe UI'";
      ctx.fillText(String(bar.score), x + barWidth / 2, chartY + chartHeight + 44);
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
    const profile = resultProfiles[resultKey] || resultProfiles.FOREST;

    currentScores = scores;
    answerHistory = history;
    latestResultKey = resultKey;

    resultCode.textContent = profile.code;
    resultName.textContent = profile.name;
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
    questions = getQuizQuestions();
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
    await buildShareImage(resultProfiles[latestResultKey], currentScores);
  });

  resetQuiz(true);
})();
