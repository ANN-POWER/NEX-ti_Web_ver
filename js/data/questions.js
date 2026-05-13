(() => {
  const dimensions = {
    E: "外向/社交能量",
    I: "内向/独处能量",
    L: "领导/掌控欲",
    S: "辅助/照顾他人",
    X: "搞怪/自由灵魂",
    P: "洞察力"
  };

  function t(zh, ja = "", en = "") {
    return { zh, ja, en };
  }

  const fixedQuestions = [
    {
      id: 1,
      question: t(
        "结束了繁忙的学习或工作，假期你最想怎么度过？",
        "勉強や仕事がひと段落。お休みの日、何したい？",
        "After a long stretch of studying or work, how would you most want to spend your vacation?"
      ),
      options: [
        {
          text: t(
            "立刻约上三五好友，去NEXZ去过的地方打卡巡礼",
            "友達とNEXZゆかりの場所を巡る（聖地巡礼）",
            "Immediately hit up a few friends and go on a NEXZ location pilgrimage"
          ),
          type: ["E", "L"]
        },
        {
          text: t(
            "只想一个人待着，点个外卖，看看团综和舞台直拍",
            "一人でゆっくり。好きなものを食べながらコンテンツやステージを見る",
            "Stay home alone, order takeout, and binge variety content and fancams"
          ),
          type: ["I"]
        },
        {
          text: t(
            "复刻呐呐大厨的经典菜品，研究一下食谱",
            "レシピを見ながら、NEXZの“シェフ”の定番料理を再現してみる",
            "Recreate Chef NEXZ’s signature dishes and study the recipes"
          ),
          type: ["S", "P"]
        },
        {
          text: t(
            "和朋友约饭聚会顺便安利我们六团舞一NEXZ",
            "友達とご飯に行って、NEXZを布教する",
            "Go out to eat with friends and casually convert them into NEXZ fans"
          ),
          type: ["E"]
        }
      ]
    },
    {
      id: 2,
      question: t(
        "在一个全是陌生人的派对/聚会上，你通常会是什么状态？",
        "知らない人ばかりのパーティー。あなたはどんなタイプ？",
        "At a party full of strangers, what are you usually like?"
      ),
      options: [
        {
          text: t(
            "作为活跃分子调动气氛，组织大家破冰",
            "ムードメーカーとして場を盛り上げ、みんなの緊張をほぐす",
            "The social butterfly hyping everyone up and breaking the ice"
          ),
          type: ["L", "E"]
        },
        {
          text: t(
            "找个角落或者待在熟悉的朋友身边，默默观察",
            "端の方や友達のそばで、静かに様子を見る",
            "Quietly observing from a corner or sticking close to familiar friends"
          ),
          type: ["I"]
        },
        {
          text: t(
            "别人来主动搭话会很友好地回应，不然就是抠城堡",
            "話しかけられたら対応。それ以外はスマホいじりがち",
            "I’ll respond if someone talks to me first, otherwise I just hang back awkwardly"
          ),
          type: ["S", "I"]
        },
        {
          text: t(
            "不管认不认识，只要有音乐就能一起发疯",
            "音楽があればOK。ノリで一気に盛り上がる",
            "As long as there’s music, I can go crazy with anyone"
          ),
          type: ["X", "E", "E"]
        }
      ]
    },
    {
      id: 3,
      question: t(
        "看团综时，你的关注点通常在？",
        "『Real NEXZ』見てるときのあなたは？",
        "When watching \"REAL NEXZ\", what do you usually focus on?"
      ),
      options: [
        {
          text: t(
            "我要截图做表情包",
            "スクショしてスタンプ代わりに使う",
            "I need screenshots for reaction memes"
          ),
          type: []
        },
        {
          text: t(
            "哈哈哈哈哈哈哈哈哈",
            "とにかくずっと笑ってる",
            "HAHAHAHAHAHAHAHA"
          ),
          type: []
        },
        {
          text: t(
            "好想学韩语……",
            "韓国語、ちょっと勉強したくなる",
            "I really want to learn Korean..."
          ),
          type: ["L"]
        },
        {
          text: t(
            "速扒同款香水！",
            "使ってる香水、すぐ調べる",
            "Time to hunt down their perfume!"
          ),
          type: ["P", "L"]
        },
        {
          text: t(
            "素材积累中……",
            "切り抜き素材を集める",
            "Collecting editing material..."
          ),
          type: []
        }
      ]
    },
    {
      id: 4,
      question: t(
        "如果和朋友复刻小呐呐济州岛之旅，你通常扮演什么角色？",
        "友達とNEXZの済州島旅行のルートや過ごし方を再現して旅行するなら、どんな役割？",
        "If you recreated NEXZ’s JEJU trip with friends, what role would you play?"
      ),
      options: [
        {
          text: t(
            "严肃复习vlog，安排好每天的行程，大家跟着我走就行",
            "NEXZのVlogをしっかり見直して、毎日のスケジュールを組んで、みんなを引っ張るタイプ",
            "Rewatch the vlogs seriously and plan every day’s itinerary — just follow me"
          ),
          type: ["L", "P"]
        },
        {
          text: t(
            "随遇而安，没有固定计划，走到哪玩到哪，享受惊喜",
            "流れに任せて、ノープランでその場その場を楽しむタイプ",
            "Go with the flow, no fixed plans, just enjoy whatever happens"
          ),
          type: []
        },
        {
          text: t(
            "负责旅途中的生活琐事，比如找美食、订酒店、拍照",
            "お店探しやホテル予約、写真担当のタイプ",
            "Handle the practical stuff like food, hotels, and taking photos"
          ),
          type: ["S"]
        },
        {
          text: t(
            "如果我们都不会韩语，我是负责和韩国人交涉的那一个",
            "みんな韓国語が話せない中で、韓国の人とやり取りする役はだいたい自分",
            "If none of us spoke Korean, I’d be the one talking to locals"
          ),
          type: ["E", "L"]
        },
        {
          text: t(
            "负责睡觉和当吉祥物，提供情绪价值",
            "旅の段取りはノータッチで、癒し担当＆マスコット的存在",
            "Just there to sleep and be the group mascot, providing emotional support"
          ),
          type: []
        }
      ]
    },
    {
      id: 5,
      question: t(
        "玩MAFIA类游戏时，你通常是哪种玩家？",
        "MAFIA（人狼ゲーム）では、どんな動きをする？",
        "When playing Mafia-style games, what kind of player are you?"
      ),
      options: [
        {
          text: t(
            "一起分析局势，输了会复盘",
            "みんなで状況を分析して、負けたらちゃんと振り返る",
            "Analyze the situation with everyone and review the game afterward if we lose"
          ),
          type: ["P"]
        },
        {
          text: t(
            "不太说话，暗中算身份，最后carry全场",
            "あまり発言せず、裏で票を数えて役職を推理し、最後に一気に決める",
            "Stay quiet, secretly calculate identities, then carry at the end"
          ),
          type: ["P", "I"]
        },
        {
          text: t(
            "引领讨论方向，一呼百应",
            "議論の流れをリードして、ひと言でみんなを動かす",
            "Lead the discussion and get everyone on board"
          ),
          type: ["L"]
        },
        {
          text: t(
            "怎么每个人说的都好有道理",
            "全員めっちゃ正しいこと言ってる気がする",
            "Everyone sounds convincing to me"
          ),
          type: []
        },
        {
          text: t(
            "捣乱型，乱杀乱投开心就好（^-^）",
            "場をかき乱して、ノリで投票して楽しければOK（＾ー＾）",
            "Pure chaos player — random votes, random kills, as long as it’s fun (^_^)"
          ),
          type: ["X"]
        }
      ]
    },
    {
      id: 6,
      question: t(
        "面对一个全新的、有挑战性的任务（比如学一支很难的舞），你的第一反应是？",
        "初めてのことや難しい課題（例：難しいダンス）に挑戦するとき、最初の反応は？",
        "When facing a completely new and challenging task (like learning a difficult dance), what’s your first reaction?"
      ),
      options: [
        {
          text: t(
            "有点兴奋，把它当成证明自己的机会，迎难而上",
            "ちょっとワクワクして、自分を試すチャンスだと思って挑む",
            "Excited — I see it as a chance to prove myself"
          ),
          type: ["L"]
        },
        {
          text: t(
            "感到有些焦虑，担心自己做不好，希望能有人带",
            "少し不安で、うまくできるか心配になり、誰かに頼りたくなる",
            "A little anxious and hoping someone can guide me"
          ),
          type: []
        },
        {
          text: t(
            "先拆解动作，分析难点，制定练习计划",
            "動きを分解して難しいポイントを分析し、練習計画を立てる",
            "Break down the moves, analyze the hard parts, and make a practice plan"
          ),
          type: ["L"]
        },
        {
          text: t(
            "先学了再说，动作错了就加个即兴动作混过去",
            "とりあえずやってみて、ミスはノリやアドリブでカバーする",
            "Just start learning and freestyle if I mess up the moves"
          ),
          type: []
        }
      ]
    },
    {
      id: 7,
      question: t(
        "如果不小心做错事伤害了朋友，你会？",
        "うっかりミスで友達を傷つけてしまったら、どうする？",
        "If you accidentally hurt a friend’s feelings, what would you do?"
      ),
      options: [
        {
          text: t(
            "非常自责和内疚，想尽一切办法弥补、表达歉意",
            "強く自分を責めてしまい、どうにか埋め合わせしようと必死になる",
            "Feel extremely guilty and do everything possible to make it up to them"
          ),
          type: ["S"]
        },
        {
          text: t(
            "道歉后会理性分析错误原因，争取不再犯",
            "謝ったあと、原因を冷静に分析して、次は繰り返さないようにする",
            "Apologize, then rationally analyze what went wrong so it won’t happen again"
          ),
          type: ["P"]
        },
        {
          text: t(
            "我其实意识不到我伤害到朋友了",
            "そもそも自分が相手を傷つけたことに気づいていない",
            "Honestly, I might not even realize I hurt them"
          ),
          type: []
        },
        {
          text: t(
            "不知所措，不知道怎么道歉，等对方来哄",
            "どう謝ればいいかわからず、相手から声をかけてくれるのを待ってしまう",
            "Freeze up and not know how to apologize, waiting for them to approach first"
          ),
          type: ["I"]
        }
      ]
    },
    {
      id: 8,
      question: t(
        "如果可以变成一种植物，你会选择？",
        "もし植物になれるとしたら、どれを選ぶ？",
        "If you could become a plant, what would you choose?"
      ),
      options: [
        {
          text: t(
            "向日葵：永远向阳生长",
            "ひまわり：いつも太陽のほうを向いて、まっすぐ伸びる",
            "Sunflower: always growing toward the light"
          ),
          type: ["E"]
        },
        {
          text: t(
            "仙人掌：生命力顽强，浑身带刺但有独特的生存法则",
            "サボテン：たくましくてトゲはあるけど、自分のペースで生きる",
            "Cactus: resilient, prickly, with its own survival rules"
          ),
          type: ["L"]
        },
        {
          text: t(
            "多肉：圆润温和，安安静静地待在角落里也很治愈",
            "多肉植物：やわらかくて穏やか、静かにそこにいるだけで癒しになる",
            "Succulent: soft and calming, quietly healing in a corner"
          ),
          type: ["I", "I", "S"]
        },
        {
          text: t(
            "梅花：在雪天也能绽放，花气袭人",
            "梅：寒さの中でも凛と咲く",
            "Plum blossom: blooming proudly even in snow"
          ),
          type: []
        },
        {
          text: t(
            "石楠：隆重登场！（不认识的朋友慎选）",
            "カナメモチ、満を持して登場！（知らない人は要注意）",
            "Photinia serratifolia: dramatic entrance! (Choose carefully if you know, you know)"
          ),
          type: ["X"]
        },
        {
          text: t(
            "大树：森林深处枝繁叶茂",
            "大きな木：どっしり根を張り、枝葉を広げる",
            "A giant tree deep in the forest with lush branches everywhere"
          ),
          type: ["S", "I", "S", "I", "I", "I"]
        }
      ]
    },
    {
      id: 9,
      question: t(
        "在朋友们聊天时，你通常是那个…？",
        "友達と話しているとき、あなたはどんな感じ？",
        "When chatting with friends, you’re usually the one who…"
      ),
      options: [
        {
          text: t(
            "非常优秀的倾听者！",
            "とにかく聞き上手",
            "Is an amazing listener"
          ),
          type: ["S"]
        },
        {
          text: t(
            "分享最近的八卦或奇思妙想",
            "最近の話題やちょっとしたネタをシェアする",
            "Shares the latest gossip or random thoughts"
          ),
          type: []
        },
        {
          text: t(
            "我总能敏锐察觉朋友的情绪变化",
            "相手の気持ちの変化にすぐ気づく",
            "Quickly notices changes in people’s emotions"
          ),
          type: ["P"]
        },
        {
          text: t(
            "出其不意的幽默总是语出惊人，诡秘你也为我着迷吧",
            "不意に面白い一言を放って、場を一気にさらう",
            "My unexpected jokes always leave people stunned… Admit it, you’re fascinated by me too"
          ),
          type: ["X", "E"]
        },
        {
          text: t(
            "我好想莫名其妙在大街上跳舞",
            "ふとした瞬間に、なぜか踊りたくなる",
            "Suddenly wants to dance in the middle of the street"
          ),
          type: ["X"]
        },
        {
          text: t(
            "要不我们去KTV吧？",
            "「カラオケ行かない？」って流れを作る",
            "Suggests going to karaoke instead"
          ),
          type: ["E", "L"]
        }
      ]
    },
    {
      id: 10,
      question: t(
        "关于“梦想”，以下哪种描述最符合你的情况？",
        "「夢」について、いちばん近いのはどれ？",
        "Which description fits your view on dreams the best?"
      ),
      options: [
        {
          text: t(
            "我有一个从小到大的梦想，并且正在为之死磕",
            "小さい頃からの夢があり、今も本気で追い続けている",
            "I’ve had one big dream since childhood, and I’m still chasing it hard"
          ),
          type: ["L", "P"]
        },
        {
          text: t(
            "梦想嘛，顺其自然就好，活在当下更重要",
            "夢は流れに任せて、今を大事にしたい",
            "Dreams should happen naturally — living in the moment matters more"
          ),
          type: []
        },
        {
          text: t(
            "我的梦想是过上自己喜欢的简简单单的生活",
            "自分らしく、シンプルで心地いい暮らしがしたい",
            "I want a simple, chill life that I actually enjoy"
          ),
          type: []
        },
        {
          text: t(
            "我希望能永远和好朋友们在一起",
            "大好きな友達とずっと一緒にいたい",
            "I hope I can stay with my close friends forever"
          ),
          type: ["E"]
        },
        {
          text: t(
            "只能梦一梦和想一想了",
            "夢はあるけど、今は想像するだけで満足している",
            "At this point it’s just something to dream about"
          ),
          type: []
        },
        {
          text: t(
            "我想一夜暴富，然后环游世界",
            "一気に成功して、世界中を自由に旅してみたい",
            "I want to get rich overnight and travel the world"
          ),
          type: []
        }
      ]
    },
    {
      id: 11,
      question: t(
        "如果让你拥有一种超能力，你希望是？",
        "もしひとつだけ超能力を持てるとしたら、どれがいい？",
        "If you could have one superpower, what would it be?"
      ),
      options: [
        {
          text: t(
            "瞬间移动，可以去世界任何地方探索新奇事物",
            "瞬間移動で、世界中を自由に巡って新しいものに出会いたい",
            "Teleportation — I want to explore the whole world"
          ),
          type: []
        },
        {
          text: t(
            "治愈之光，可以抚平所有伤痛和悲伤",
            "癒しの力で、すべての傷や悲しみをそっと和らげたい",
            "Healing powers that can ease all pain and sadness"
          ),
          type: ["S"]
        },
        {
          text: t(
            "绝对掌控，能让事情完全按照自己的意愿发展",
            "すべてを思い通りに操れる力がほしい",
            "Absolute control — making everything go exactly my way"
          ),
          type: ["L", "P"]
        },
        {
          text: t(
            "读心术，能看穿所有人的谎言和伪装",
            "人の心を読んで、本音や嘘を見抜きたい",
            "Mind reading — seeing through everyone’s lies and masks"
          ),
          type: ["P"]
        }
      ]
    },
    {
      id: 12,
      question: t(
        "如果让你养一只宠物，你会选择？",
        "ペットを飼うとしたら、どれに近い？",
        "If you could have any pet, what would you choose?"
      ),
      options: [
        {
          text: t(
            "一只忠诚热情的狗狗，每天带出去跑步社交",
            "人懐っこくて活発な犬と、外で体を動かすことが多い",
            "A loyal, energetic dog to go running and socialize with every day"
          ),
          type: ["E", "S"]
        },
        {
          text: t(
            "一只高冷的猫咪，偶尔也会和我亲近",
            "普段はクールな猫だけど、たまにだけ甘えてくる",
            "A cool, aloof cat that occasionally gets affectionate"
          ),
          type: ["I"]
        },
        {
          text: t(
            "一只粘人的垂耳兔，每天都要抱抱",
            "甘えん坊のたれ耳うさぎを、よくなでたり抱っこしたりする",
            "A clingy floppy-eared bunny that always wants cuddles"
          ),
          type: ["S"]
        },
        {
          text: t(
            "鳄鱼、大象或者长颈鹿，就要养别人不敢养的",
            "ワニやゾウ、キリンなど、少し変わった動物を選びがち",
            "A crocodile, elephant, or giraffe — I want something no one else dares to raise"
          ),
          type: ["X", "L"]
        }
      ]
    },
    {
      id: 13,
      question: t(
        "去KTV聚会，大家都把麦克风递来递去，你通常会？",
        "カラオケでみんながマイクをなかなか受け取らないとき、あなたはどうする？",
        "At karaoke, when everyone keeps passing the mic because no one wants to go first..."
      ),
      options: [
        {
          text: t(
            "主动点几首拿手歌，一展歌喉",
            "得意な曲を積極的に歌って、歌唱力をしっかり披露する",
            "Confidently queue up my best songs and show off my vocals"
          ),
          type: ["E", "L"]
        },
        {
          text: t(
            "坐在角落吃果盘，很少唱",
            "隅でフルーツを食べながら、あまり歌わない",
            "Sit quietly in the corner eating fruit and barely sing"
          ),
          type: ["I"]
        },
        {
          text: t(
            "点一些耳熟能详的歌大家一起唱，带动气氛",
            "みんなが知っている曲を選んで、一緒に歌って場を盛り上げる",
            "Pick familiar songs everyone can sing along to and hype the mood"
          ),
          type: ["L", "S"]
        },
        {
          text: t(
            "点个忐忑吧",
            "『忐忑』を歌う（龚琳娜『忐忑』）",
            "Queue up \"Tan Te\" （Gong Linna - Tan Te）"
          ),
          type: ["X"]
        }
      ]
    },
    {
      id: 14,
      question: t(
        "当团队里出现分歧，大家都在争吵时，你会？",
        "チーム内で意見が分かれ、みんなが言い争っているとき、あなたはどうする？",
        "When your group is arguing over a disagreement, what do you do?"
      ),
      options: [
        {
          text: t(
            "站出来拍板决定，推进进度",
            "前に出て決断を下し、物事を前に進める",
            "Step up, make the decision, and move things forward"
          ),
          type: ["L"]
        },
        {
          text: t(
            "充当和事佬，安抚大家的情绪，避免冲突升级",
            "間に入ってみんなの気持ちを落ち着かせ、衝突が大きくならないようにする",
            "Play peacemaker and calm everyone down before things escalate"
          ),
          type: ["S"]
        },
        {
          text: t(
            "冷静分析双方的利弊，指出最合理的解决方案",
            "双方のメリット・デメリットを冷静に分析し、最も合理的な解決策を示す",
            "Analyze both sides logically and point out the best solution"
          ),
          type: ["P"]
        },
        {
          text: t(
            "好恐怖，要不我还是退出吧",
            "ちょっと怖いので、いったん離れようかなと思う",
            "This is terrifying… maybe I should just leave"
          ),
          type: ["I"]
        }
      ]
    },
    {
      id: 15,
      question: t(
        "朋友向你抱怨一件很倒霉的事，你通常的反应是？",
        "友達が不運な出来事を愚痴ってきたとき、あなたは普段どう反応する？",
        "When a friend complains to you about something terrible that happened, how do you usually react?"
      ),
      options: [
        {
          text: t(
            "太惨了！我也遇到过，咱们一起谴责不公的命运！",
            "それはつらいね！私も似たようなことがあったし、一緒に不公平な運命を嘆こう！",
            "That’s awful! I’ve been through that too — let’s complain about how unfair life is together."
          ),
          type: ["E", "S"]
        },
        {
          text: t(
            "抱抱他/她，耐心倾听，递纸巾安慰情绪",
            "抱きしめてあげて、じっくり話を聞きながらティッシュを渡して気持ちを落ち着かせる",
            "Give them a hug, listen patiently, and comfort them"
          ),
          type: ["S"]
        },
        {
          text: t(
            "我来分析一下事发原因",
            "原因をちょっと分析してみようかと考える",
            "Let me analyze why this happened"
          ),
          type: ["P"]
        },
        {
          text: t(
            "哈哈哈哈哈哈哈，太离谱了，这种事也能发生",
            "ははははは、さすがにそれはないでしょ（笑）ありえない出来事だね",
            "HAHAHAHA that’s insane, how does that even happen?"
          ),
          type: []
        }
      ]
    },
    {
      id: 16,
      question: t(
        "看物料时，哪个瞬间最让你心动/印象深刻？",
        "コンテンツを見ているとき、どの瞬間に一番ときめいたり印象に残ったりする？",
        "What moments in content make the biggest impression on you?"
      ),
      options: [
        {
          text: t(
            "成员们互相照顾、彼此依靠的温馨时刻",
            "メンバー同士が支え合い、お互いに頼っている温かい瞬間",
            "The warm moments where members care for and rely on each other"
          ),
          type: ["S"]
        },
        {
          text: t(
            "他们在舞台上整齐划一、充满力量的舞蹈瞬间",
            "ステージで息の合った、力強いダンスを見せる瞬間",
            "Perfectly synchronized, powerful dance performances"
          ),
          type: ["L"]
        },
        {
          text: t(
            "展现成员智慧的时候",
            "メンバーの知的な一面が見える瞬間",
            "Moments that show off the members’ intelligence"
          ),
          type: []
        },
        {
          text: t(
            "突如其来的抽象举动或精辟吐槽",
            "突然のぶっ飛んだ行動や、キレのあるツッコミが出る瞬間",
            "Sudden absurd behavior or brutally accurate comments"
          ),
          type: ["X"]
        }
      ]
    },
    {
      id: 17,
      question: t(
        "如果用一种天气来形容你的性格，你是？",
        "自分の性格を天気にたとえるなら、どれに近い？",
        "If your personality were a type of weather, what would it be?"
      ),
      options: [
        {
          text: t(
            "晴天：热情开朗，走到哪里都是焦点",
            "晴れ：明るくて社交的。どこにいても自然と目立つタイプ",
            "Sunny: cheerful, outgoing, and the center of attention"
          ),
          type: ["E", "L"]
        },
        {
          text: t(
            "阴天：冷静内敛，适合思考和观察",
            "曇り：落ち着いていて控えめ。考え事や周りを観察するのが得意",
            "Cloudy: calm, reserved, and thoughtful"
          ),
          type: ["I", "P"]
        },
        {
          text: t(
            "雷阵雨：情绪来得快去得也快，偶尔会有惊人之举",
            "感情の切り替わりが早く、たまに驚くような行動をする",
            "Thunderstorm: emotions hit fast and fade fast, with occasional unexpected moments"
          ),
          type: ["X"]
        },
        {
          text: t(
            "微风：温柔舒适，让人感到放松",
            "そよ風：優しくて心地よく、一緒にいると安心できる",
            "A gentle breeze: soft, comforting, and relaxing to be around"
          ),
          type: []
        }
      ]
    },
    {
      id: 18,
      question: t(
        "如果要向完全不了解K-pop的人安利NEXZ，你会怎么做？",
        "K-POPをまったく知らない人にNEXZを布教するとしたら、どうする？",
        "How would you introduce NEXZ to someone who knows nothing about K-pop?"
      ),
      options: [
        {
          text: t(
            "直接按头安利各种舞台，快一起投票冲一位！",
            "とにかくいろんなステージを見せまくる！一緒に投票して1位を目指そう！",
            "Spam them with stage performances and say 'Vote for them and help them get their first win!'"
          ),
          type: ["E", "L"]
        },
        {
          text: t(
            "挑最最喜欢的歌放给他听，看他反应再决定安利哪个成员",
            "一番好きな曲を聴かせて、反応を見ながら誰を推すか決める",
            "Play your favorite song for them first and see how they react before deciding which member to recommend."
          ),
          type: ["P", "S"]
        },
        {
          text: t(
            "自信开跳！嗯七克嗯七克嗯七克！",
            "自信満々に踊り出す！Mmchk Mmchk Mmchk！",
            "Break into dance immediately! Mmchk Mmchk Mmchk!"
          ),
          type: ["X", "E"]
        },
        {
          text: t(
            "给他看团综，告诉他这群人很有趣",
            "『Real NEXZ』を見せて、「この子たち本当に面白いんだよ」って伝える",
            "Show them \"REAL NEXZ\" and tell them how funny the group is"
          ),
          type: []
        },
        {
          text: t(
            "算了，太累了，还是自己默默喜欢吧",
            "やっぱり布教は大変だし、自分だけで静かに推しておく",
            "Actually… never mind. It’s too much effort. I’ll just stan quietly alone"
          ),
          type: ["I"]
        }
      ]
    },
    {
      id: 19,
      question: t(
        "对于“运气”这件事，你怎么看？",
        "「運」って、あなたはどう考えてる？",
        "What’s your view on luck?"
      ),
      options: [
        {
          text: t(
            "运气是实力的一部分，但我更相信努力",
            "運も実力のうちだけど、やっぱり最後は努力を信じたい",
            "Luck matters, but I believe in hard work more"
          ),
          type: ["L"]
        },
        {
          text: t(
            "运气好坏无所谓，开心最重要",
            "運が良くても悪くても、楽しければそれでいい",
            "Good or bad luck doesn’t matter — being happy is what counts"
          ),
          type: []
        },
        {
          text: t(
            "我总是能敏锐地察觉到好运什么时候来",
            "なぜか“流れが来る瞬間”にはすぐ気づくタイプ",
            "I can always sense when good luck is coming"
          ),
          type: ["P"]
        },
        {
          text: t(
            "我就是那个能把坏运气当玩笑讲出来的人",
            "不運な出来事すらネタにして笑えるタイプ",
            "I’m someone who can take bad luck in stride and joke about it."
          ),
          type: ["X"]
        }
      ]
    },
    {
      id: 20,
      question: t(
        "去演唱会现场前，你的行李打包风格是？",
        "ライブに行く前の荷造り、あなたはどのタイプ？",
        "Before going to a concert, what’s your packing style like?"
      ),
      options: [
        {
          text: t(
            "列好清单，分门别类装进收纳袋，连充电线都理好了",
            "持ち物リストを作って、収納ポーチごとにきっちり整理する。充電ケーブルまでちゃんとまとめる",
            "Make a checklist, organize everything into separate bags, and even neatly pack the charging cables"
          ),
          type: ["L"]
        },
        {
          text: t(
            "做好详细攻略，交通、路线、必备物品都理清楚",
            "交通手段やルート、必要な持ち物まで事前にしっかり調べる",
            "Prepare a detailed plan for transportation, routes, and essentials"
          ),
          type: ["P"]
        },
        {
          text: t(
            "带上一堆零食、湿巾、创可贴，以备不时之需",
            "お菓子やウェットティッシュ、絆創膏などを多めに持っていく",
            "Pack tons of snacks, wet wipes, and band-aids just in case"
          ),
          type: ["S"]
        },
        {
          text: t(
            "随便塞几件衣服，主打一个“说走就走”，到了再说",
            "服を適当に詰めて、“とりあえず行けばなんとかなる”タイプ",
            "Throw a few clothes into a bag and wing it"
          ),
          type: []
        }
      ]
    },
    {
      id: 21,
      question: t(
        "在玩《谁是卧底》游戏时，如果你的词和别人的描述不符，你会？",
        "『ワードウルフ』で、自分だけみんなと違うワードっぽいとき、あなたはどうする？",
        "In a game of Undercover, if your word doesn’t match everyone else’s, what do you do?"
      ),
      options: [
        {
          text: t(
            "根据他们的描述开始热演，先帮自己排除嫌疑",
            "みんなの話に合わせて全力で演技し、とりあえず疑いを避ける",
            "Start acting dramatically based on their clues to avoid suspicion"
          ),
          type: ["P", "E", "X"]
        },
        {
          text: t(
            "通过对比大家的发言猜他们的词",
            "みんなの発言を比較しながら、相手のワードを推理する",
            "Compare everyone’s answers to figure out their word"
          ),
          type: ["P"]
        },
        {
          text: t(
            "保持沉默，然后就被怀疑百口莫辩",
            "黙っていた結果、逆に怪しまれて何も言い返せなくなる",
            "Stay silent… and end up getting suspected without being able to defend myself"
          ),
          type: ["I"]
        },
        {
          text: t(
            "怀疑对面是卧底",
            "『いや、むしろそっちがワードウルフでは？』と疑い始める",
            "Immediately think someone else is the undercover"
          ),
          type: []
        }
      ]
    },
    {
      id: 22,
      question: t(
        "当你感到压力很大时，哪种解压方式最适合你？",
        "強いストレスを感じたとき、あなたに一番合うリフレッシュ方法は？",
        "When you’re under a lot of stress, what helps you decompress the most?"
      ),
      options: [
        {
          text: t(
            "约朋友出去大吃一顿，吐槽发泄",
            "友達とご飯を食べに行って、思いっきり愚痴る",
            "Go out with friends, eat a huge meal, and rant about everything"
          ),
          type: ["E"]
        },
        {
          text: t(
            "一个人出去跑步或散步，整理心情",
            "ひとりでランニングや散歩をして、気持ちを整理する",
            "Go for a run or walk alone to clear my head"
          ),
          type: ["I", "I"]
        },
        {
          text: t(
            "找个偏僻的角落大哭一场",
            "人のいない場所で思いっきり泣く",
            "Find a quiet corner and cry it all out"
          ),
          type: ["I"]
        },
        {
          text: t(
            "制定一个新的计划表，用忙碌对抗焦虑",
            "新しい計画表を作って、忙しさで不安をごまかす",
            "Make a brand-new schedule and fight anxiety with productivity"
          ),
          type: ["L", "P"]
        }
      ]
    },
    {
      id: 23,
      question: t(
        "如果成员不开心，你会在泡泡发什么？",
        "メンバーが落ち込んでいるとき、バブル（Bubble）で何を送る？",
        "If a member seemed upset, what would you send on Bubble?"
      ),
      options: [
        {
          text: t(
            "写一大段暖心留言，治愈他鼓励他",
            "心のこもった長文メッセージで励ます",
            "A long heartfelt message to comfort and encourage them"
          ),
          type: ["S"]
        },
        {
          text: t(
            "分析上下文，推测不开心的原因",
            "前後の流れを見て、落ち込んでいる理由を考える",
            "Analyze the context and guess why they’re upset"
          ),
          type: ["P"]
        },
        {
          text: t(
            "发一堆可爱的表情包和加油打气的话刷屏",
            "かわいい絵文字や応援メッセージをたくさん送って盛り上げる",
            "Spam cute emojis and supportive messages"
          ),
          type: []
        },
        {
          text: t(
            "试图讲笑话逗他开心",
            "なんとか笑わせようとして、ジョークを送る",
            "Try telling jokes to cheer them up"
          ),
          type: ["X"]
        }
      ]
    },
    {
      id: 24,
      question: t(
        "如果要把你的生活拍成Vlog，标题会是？",
        "もし自分の生活をVlogにするとしたら、タイトルは？",
        "If your life were a vlog, what would the title be?"
      ),
      options: [
        {
          text: t(
            "《沉浸式追星的一天：特种兵式打卡》",
            "没入型オタ活の1日：弾丸スケジュールで現場巡り",
            "A day of immersive fangirling: hardcore mission-style fan pilgrimage"
          ),
          type: ["L", "P"]
        },
        {
          text: t(
            "《宅家记录：培养一个兴趣爱好》",
            "おうち時間記録：ひとつの趣味を育てる日々",
            "Cozy day at home: picking up a new hobby"
          ),
          type: ["I"]
        },
        {
          text: t(
            "《损友图鉴：我和我的冤种朋友们》",
            "ダメ友図鑑：私とクセ強な友達たち",
            "A gallery of chaotic friends: me and my disaster friend group"
          ),
          type: ["E"]
        },
        {
          text: t(
            "《今天也在努力做一个正常人（失败版）》",
            "今日も普通に生きようとしたけど無理だった件",
            "Attempting to be normal (unsuccessful version)"
          ),
          type: ["X"]
        }
      ]
    },
    {
      id: 25,
      question: t(
        "如果在大街上看到有人穿着印着NEXZ头像的衣服，你会？",
        "街でNEXZの顔がプリントされた服を着ている人を見かけたら、あなたはどうする？",
        "If you see someone on the street wearing a shirt with NEXZ’s face on it, what do you do?"
      ),
      options: [
        {
          text: t(
            "虽然很好奇，但是我社恐，只能目送同志远去",
            "気にはなるけど人見知りすぎて、結局そのまま見送る",
            "I’m curious, but too shy to say anything, so I just let them walk away"
          ),
          type: ["I"]
        },
        {
          text: t(
            "偷偷拍下来发给同担",
            "こっそり写真を撮って、同担に報告する",
            "Secretly take a photo and send it to fellow fans"
          ),
          type: []
        },
        {
          text: t(
            "上去搭讪，问他是不是二丫能不能扩列",
            "思い切って話しかけて、『NEX2Y（二丫）ですか？よかったら繋がりませんか？』と聞く",
            "I’d go up and ask if they’re also a NEX2Y and try to exchange socials"
          ),
          type: ["E", "E"]
        },
        {
          text: t(
            "一起cha刀不刀不刀",
            "一緒に『Beat-Boxer』のダンスを踊る",
            "Dance to \"Beat-Boxer\" together"
          ),
          type: ["E", "X"]
        }
      ]
    },
    {
      id: 26,
      question: t(
        "你觉得自己的大脑更像什么？",
        "自分の頭の中って、何に一番近いと思う？",
        "What do you think your mind is most like?"
      ),
      options: [
        {
          text: t(
            "像存储库，随时能调取关于成员的各种资料",
            "データベースみたいに、メンバーの情報をいつでも引き出せる",
            "Like a database, where I can instantly recall all kinds of information about members"
          ),
          type: ["P"]
        },
        {
          text: t(
            "像记事本，填满各种计划和攻略",
            "メモ帳みたいに、予定や攻略でいっぱい",
            "Like a notebook, filled with plans and strategies"
          ),
          type: ["L"]
        },
        {
          text: t(
            "像避风港，会留意大家的情绪",
            "避難所みたいに、周りの感情につい気を配ってしまう",
            "Like a safe space, always tuned in to everyone’s emotions"
          ),
          type: ["S"]
        },
        {
          text: t(
            "像万花筒，充满了各种天马行空的奇怪想法",
            "万華鏡みたいに、突拍子もない発想が次々浮かんでくる",
            "Like a kaleidoscope, full of unpredictable and imaginative ideas"
          ),
          type: ["X"]
        }
      ]
    },
    {
      id: 27,
      question: t(
        "以下哪句歌词最适合形容你？",
        "自分を表すなら、どの歌詞が一番しっくりくる？",
        "Which of the following lyrics best describes you?"
      ),
      options: [
        { text: t("Not typical."), type: ["X"] },
        { text: t("Keep going higher higher~ Like a burning fire fire."), type: ["L"] },
        { text: t("I'll do whatever you say."), type: [] },
        { text: t("Keep your eyes on me."), type: ["E"] },
        { text: t("Nalilada da nalilada."), type: [] }
      ]
    },
    {
      id: 28,
      question: t(
        "你觉得自己最大的“超能力”是什么？",
        "自分の“強み”だと思うのはどれ？",
        "What do you think your greatest superpower is?"
      ),
      options: [
        {
          text: t(
            "能敏锐察觉到朋友情绪的变化，并给予安慰。",
            "周りの人の気持ちの変化にすぐ気づき、さりげなく寄り添うことができる",
            "I can easily pick up on changes in my friends’ emotions and comfort them"
          ),
          type: ["S", "P"]
        },
        {
          text: t(
            "无论多复杂的机器或软件，上手就能学会。",
            "どんなに複雑な機械やソフトでも、すぐに使い方を理解できる",
            "I can pick up even complex machines or software really quickly"
          ),
          type: ["P"]
        },
        {
          text: t(
            "能把平淡无奇的日子过得像综艺节目一样有趣。",
            "何気ない日常でも、自分なりに楽しく盛り上げることができる",
            "I can turn an ordinary day into something that feels like a variety show"
          ),
          type: ["X"]
        },
        {
          text: t(
            "拥有稳定的情绪和积极的心态，不轻易崩溃。",
            "感情が安定していて、前向きな気持ちを保ちやすい",
            "I have stable emotions and a positive mindset, and I don’t easily get overwhelmed"
          ),
          type: ["L"]
        }
      ]
    }
  ];

  const randomQuestions = [
    {
      id: "R1",
      question: t(
        "如果得到和NEXZ互动的机会，你最想？",
        "NEXZと直接やりとりできるとしたら、いちばんやってみたいのは？",
        "If you had a chance to interact with NEXZ, what would you want to do most?"
      ),
      countForScore: false,
      options: [
        {
          text: t(
            "检查七小呐的腹肌",
            "7人の腹筋をチェックしてみたい",
            "Inspect all seven members’ abs"
          ),
          type: ["X"]
        },
        {
          text: t(
            "在fay胳膊上荡秋千",
            "YUの腕でブランコみたいに遊んでみたい",
            "Treat YU’s arm like a swing"
          ),
          type: ["X"]
        },
        {
          text: t(
            "挑战把seita逗笑",
            "SEITAを笑わせられるか挑戦してみたい",
            "Try to make SEITA laugh"
          ),
          type: ["E"]
        },
        {
          text: t(
            "给忙内line放trouble maker",
            "マンネラインに「Trouble Maker」を流してみたい",
            "Play “Trouble Maker” for the maknae line"
          ),
          type: ["X"]
        },
        {
          text: t(
            "和so geon聊到天亮",
            "SO GEONと朝まで語り合ってみたい",
            "Stay up all night talking with SO GEON"
          ),
          type: ["I"]
        },
        {
          text: t(
            "yuki说老梗，我和小森优阳比憋笑",
            "YUKIの定番ネタで、HYUIと一緒に笑わずにいられるか勝負してみたい",
            "YUKI tells old jokes, and I try not to laugh while competing with HYUI"
          ),
          type: ["X"]
        }
      ]
    },
    {
      id: "R2",
      question: t(
        "突击检查！以下歌词出自哪首歌？",
        "抜き打ちチェック！この歌詞はどの曲のもの？",
        "Surprise quiz! Can you guess which song these lyrics are from?"
      ),
      countForScore: false,
      image: "./img/lyrics.jpg",
      options: [
        { text: t("Keep on Moving"), type: ["L"] },
        { text: t("Here & Now"), type: ["S"] },
        { text: t("Make it Better"), type: ["E"] },
        { text: t("One Day"), type: ["X"] }
      ]
    },
    {
      id: "R3",
      question: t(
        "以下哪个说法是对的？",
        "次のうち、正しいのはどれ？",
        "Which of the following statements is true?"
      ),
      countForScore: false,
      options: [
        {
          text: t(
            "tomoya的嘴唇厚度是2.1cm",
            "TOMOYAの唇の厚さは2.1cm",
            "TOMOYA’s lips are 2.1 cm thick"
          ),
          type: ["X"]
        },
        {
          text: t(
            "忙内是最稳重的孩子",
            "マンネがいちばん落ち着いている",
            "The maknae(YUKI) is the most mature member"
          ),
          type: ["S"]
        },
        {
          text: t(
            "so geon其实厨艺很好",
            "SO GEONは実は料理が得意",
            "SO GEON is actually really good at cooking"
          ),
          type: ["I"]
        },
        {
          text: t(
            "haru学poping是为了演丧尸",
            "HARUがポッピングを始めたのはゾンビの演技のため",
            "HARU learned popping so he could perform as a zombie"
          ),
          type: ["I"]
        },
        {
          text: t(
            "MOMOz已经认识了7年",
            "MOMOZは7年前からの仲",
            "MOMOz have known each other for 7 years"
          ),
          type: ["I"]
        },
        {
          text: t(
            "当你惹到seita就可以飞上天空",
            "SEITAを怒らせると空を飛べるようになる",
            "If you annoy SEITA, you’ll get launched into the sky"
          ),
          type: ["X"]
        }
      ]
    },
    {
      id: "R4",
      question: t(
        "以下哪件事最难做到？",
        "次のうち、いちばん難しそうなのはどれ？",
        "Which of these would be the hardest to make happen?"
      ),
      countForScore: false,
      options: [
        {
          text: t(
            "让hyui严肃拍完一期真呐！",
            "HYUIに『REAL NEXZ』を最後まで笑わずにやり切らせる",
            "Make HYUI film a serious episode of \"Real NEXZ\"! while trying not to laugh"
          ),
          type: ["L"]
        },
        {
          text: t(
            "让yuki把老梗备忘录删掉！",
            "YUKIに“定番ネタメモ”を全部消させる",
            "Make YUKI delete his old joke memo"
          ),
          type: ["L"]
        },
        {
          text: t(
            "让yu一星期不下厨！",
            "YUに1週間まったく料理させない",
            "Make YU go a whole week without cooking"
          ),
          type: ["S"]
        },
        {
          text: t(
            "让haru一星期不做breaking！",
            "HARUに1週間ブレイキンをやらせない",
            "make HARU stop doing breaking"
          ),
          type: ["I"]
        },
        {
          text: t(
            "让so geon不许比小狗爪子！",
            "SO GEONに“犬の手ポーズ”を禁止する",
            "Make SO GEON stop doing the puppy paw gesture"
          ),
          type: ["I"]
        },
        {
          text: t(
            "让tomoya不许one bite！",
            "TOMOYAに“one bite”をさせない",
            "make TOMOYA stop doing “one bite”"
          ),
          type: ["I"]
        },
        {
          text: t(
            "让seita在公司门口倒立！",
            "SEITAに会社の前で逆立ちさせる",
            "Make SEITA do a handstand in front of the company building"
          ),
          type: ["I"]
        }
      ]
    },
    {
      id: "R5",
      question: t(
        "如果可以我想要……",
        "もし一つだけ手に入れられるとしたら、どれ？",
        "If I could have one thing, I’d want…"
      ),
      countForScore: false,
      options: [
        {
          text: t(
            "moya的capcut会员",
            "MOYAのCapCutプレミアム会員",
            "MOYA’s CapCut Pro subscription"
          ),
          type: ["L"]
        },
        {
          text: t(
            "haru的彩票",
            "HARUの宝くじ運",
            "HARU’s winning lottery ticket luck"
          ),
          type: ["I"]
        },
        {
          text: t(
            "geon的运动细胞",
            "GEONの運動神経",
            "GEON’s athletic ability"
          ),
          type: ["L"]
        },
        {
          text: t(
            "yu的厨艺",
            "YUの料理スキル",
            "YU’s cooking talent"
          ),
          type: ["S"]
        },
        {
          text: t(
            "hyui的pro按键",
            "HYUIの“PROボタン”",
            "HYUI’s on-stage performance switch"
          ),
          type: ["E"]
        },
        {
          text: t(
            "seita的锐评",
            "SEITAのキレキレなコメント力",
            "SEITA’s savage commentary"
          ),
          type: ["S"]
        },
        {
          text: t(
            "yuki的酒窝",
            "YUKIのえくぼ",
            "YUKI’s dimples"
          ),
          type: ["I"]
        },
        {
          text: t(
            "NEXZ的舞蹈实力",
            "NEXZのダンススキル",
            "NEXZ’s dancing skills"
          ),
          type: ["X"]
        }
      ]
    },
    {
      id: "R6",
      question: t(
        "如果偶遇NEXZ我会做什么吸引他们的注意力",
        "もし偶然NEXZに会えたら、どうやって気を引く？",
        "If I ran into NEXZ, what would I do to get their attention?"
      ),
      countForScore: false,
      options: [
        {
          text: t(
            "摇身一变变成Hello Kitty向hyui表白",
            "突然ハローキティに変身してHYUIに告白する",
            "Transform into Hello Kitty and confess to HYUI"
          ),
          type: ["E"]
        },
        {
          text: t(
            "去买一份香香的炸猪排围着yuki转圈圈",
            "アツアツのとんかつを買ってYUKIの周りをぐるぐる回る",
            "Buy some fried pork cutlet and spin around YUKI while holding it"
          ),
          type: ["X"]
        },
        {
          text: t(
            "突然对着哥line跳beat-boxer的dance break",
            "ヒョンラインの前でいきなり“Beat-Boxer”のダンスブレイクを踊る",
            "Start dancing the \"Beat-Boxer\" break in front of the older members (hyung line)"
          ),
          type: ["L"]
        },
        {
          text: t(
            "前面背一个库巴包后面背一个建士奇吸引so geon注意力",
            "前にクッパモチーフのバッグ、後ろにGEONSKYを背負ってSO GEONの気を引く",
            "Wear a Koopa backpack in front and a GEONSKY on your back to get SO GEON’s attention"
          ),
          type: ["X"]
        },
        {
          text: t(
            "拿着画板走到seita面前让他摆姿势开始作画",
            "スケッチブックを持ってSEITAの前に行き、ポーズを取ってもらって描き始める",
            "Walk up to SEITA with a sketchbook and ask him to pose for a drawing"
          ),
          type: ["S"]
        },
        {
          text: t(
            "突然来个后空翻然后跳出道曲离场",
            "いきなりバック宙して、そのままデビュー曲を踊って去る",
            "Do a backflip and perform their debut song while walking away"
          ),
          type: ["X"]
        }
      ]
    },
    {
      id: "R7",
      question: t(
        "你做了一个很奇怪的梦，梦里你变成了",
        "変な夢を見た。夢の中で自分は…",
        "You had a strange dream where you turned into…"
      ),
      countForScore: false,
      options: [
        {
          text: t(
            "yu的卡姿兰大眼睛。前面的帅哥是谁！嗷原来是镜子里的我",
            "YUの大きな目になっていて、イケメンだと思ったら鏡の中の自分だった",
            "YU’s big sparkly doll-like eyes — “Who’s that handsome guy? Oh… it’s me in the mirror.”"
          ),
          type: ["X"]
        },
        {
          text: t(
            "moya的明太子嘴唇。什么东西QQ弹弹还很软，原来是我",
            "MOYAのぷるぷるの唇になっていて、何これ…柔らかすぎると思ったら自分だった",
            "MOYA’s soft, bouncy jelly-like lips — “What is this… so soft and squishy… wait, it’s me.”"
          ),
          type: ["X"]
        },
        {
          text: t(
            "so geon的巧克力痣。为什么所有人都在看着我",
            "SO GEONのほくろになっていて、なぜかみんなに見られている気がした",
            "SO GEON’s chocolate-like mole — “Why is everyone staring at me?”"
          ),
          type: ["I"]
        },
        {
          text: t(
            "hyui的牙齿。啊好凉快",
            "HYUIの歯になっていて、いつも笑っているせいで、空気に触れてなんかひんやりする夢だった",
            "HYUI’s teeth — “Ah… this feels so cool and refreshing.”"
          ),
          type: ["E"]
        }
      ]
    },
    {
      id: "R8",
      question: t(
        "如果入职JYP，你想当？",
        "もしJYPに入社したら、どのポジションになりたい？",
        "If you could work at JYP Entertainment, what would your role be?"
      ),
      countForScore: false,
      options: [
        {
          text: t(
            "一楼咖啡厅的店员（有机会被请咖啡版）",
            "1階カフェの店員（アーティストにコーヒーを奢ってもらえるかも）",
            "A café staff member on the first floor (hoping to get a free coffee from an idol)"
          ),
          type: ["S"]
        },
        {
          text: t(
            "有机食堂的营养师，孩子们香蕉管够",
            "オーガニック食堂の栄養士（NEXZにバナナを無限提供）",
            "A nutritionist at the organic cafeteria, keeping NEXZ well-stocked with bananas"
          ),
          type: ["S"]
        },
        {
          text: t(
            "一本部的cody",
            "本部のスタイリスト（コーデ担当）",
            "A stylist in One Label (the cody team)"
          ),
          type: ["I"]
        },
        {
          text: t(
            "我想给孩子们写歌",
            "NEXZのために楽曲を作る作曲家",
            "I want to write songs for NEXZ"
          ),
          type: ["L"]
        },
        {
          text: t(
            "我想篡位PD nim，然后抢c位",
            "PDニムを乗っ取ってセンターを奪いたい",
            "Take over the PD role and steal the center position"
          ),
          type: ["X"]
        }
      ]
    },
    {
      id: "R9",
      question: t(
        "如果让你策划NEXZ下一次粉丝见面会的小短片，你想策划什么剧情？",
        "もしNEXZの次のファンミーティング用ショートムービーを企画できるとしたら、どんなストーリーにする？",
        "If you could plan a short video for NEXZ’s next fan meeting, what kind of concept would you create?"
      ),
      countForScore: false,
      options: [
        {
          text: t(
            "赛博朋克+机械战甲，要帅帅地打架！",
            "サイバーパンク×メカスーツで、かっこよくバトルするストーリー",
            "Cyberpunk + mecha armor concept, with cool action-packed fight scenes"
          ),
          type: []
        },
        {
          text: t(
            "校园青春+纯爱剧情，要有那种心动的眼神特写",
            "学園青春×ピュアラブ、胸キュンの視線アップ満載のストーリー",
            "A school romance concept with heart-fluttering close-up shots and emotional eye contact"
          ),
          type: ["S"]
        },
        {
          text: t(
            "无厘头搞笑剧，让他们玩点尬的",
            "シュールなコメディで、ちょっと気まずい展開を楽しむストーリー",
            "An absurd comedy concept where they do awkward and chaotic things"
          ),
          type: ["X"]
        },
        {
          text: t(
            "悬疑推理片，策划一个烧脑剧情",
            "ミステリー推理系で、頭を使う謎解きストーリー",
            "A detective-style mystery concept with a mind-bending, puzzle-like storyline"
          ),
          type: ["P"]
        }
      ]
    }
  ];

  const RANDOM_PICK_COUNT = 4;

  function cloneLocalizedText(value) {
    if (!value || typeof value !== "object") {
      return t("", "", "");
    }

    return {
      zh: value.zh || "",
      ja: value.ja || "",
      en: value.en || ""
    };
  }

  function cloneQuestions(list) {
    return list.map((question) => ({
      ...question,
      question: cloneLocalizedText(question.question),
      options: (question.options || []).map((option) => ({
        ...option,
        text: cloneLocalizedText(option.text)
      }))
    }));
  }

  function shuffle(list) {
    const result = list.slice();
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }

  function getQuizQuestions(randomCount = RANDOM_PICK_COUNT) {
    const fixed = cloneQuestions(fixedQuestions).map((question) => ({
      countForScore: true,
      ...question
    }));

    const randomPool = shuffle(cloneQuestions(randomQuestions));
    const randomPick = randomPool.slice(0, Math.min(randomCount, randomPool.length));

    return shuffle(fixed.concat(randomPick));
  }

  function shuffleOptions(list) {
    return shuffle(list);
  }

  window.NexTiQuestions = {
    dimensions,
    getQuizQuestions,
    shuffleOptions
  };
})();
