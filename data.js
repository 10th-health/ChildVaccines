const vaccinationData = {
    "الميلاد": [
        { name: "رضع B كبدي", disease: "الالتهاب الكبدي الفيروسي B", dose: "0.5 سم2", method: "حقناً بالعضل في الجزء الخارجي من العضلة الأمامية بالفخذ اليمنى" },
        { name: "سابين", disease: "شلل الأطفال", dose: "نقطتان", method: "بالفم" },
        { name: "بي.سي.جي", disease: "الدرن", dose: "0.05 سم2", method: "حقناً داخل الجلد (في الطبقة الأولى) أعلى الذراع الأيسر للطفل" }
    ],
    "شهرين": [
        { name: "سابين", disease: "شلل الأطفال", dose: "نقطتان", method: "بالفم" },
        { name: "الخماسي", disease: "الدفتريا، السعال الديكي، التيتانوس، الالتهاب الكبدي الفيروسي B، الانفلونزا المستديمة النزفية B", dose: "0.5 سم2", method: "حقناً بالعضل في الجزء الخارجي من العضلة الأمامية بالفخذ اليمنى" },
        { name: "سولك", disease: "شلل الأطفال", dose: "0.5 سم2", method: "حقناً بالعضل في الجزء الخارجي من العضلة الأمامية بالفخذ اليسرى" }
    ],
    "4 شهور": [
        { name: "سابين", disease: "شلل الأطفال", dose: "نقطتان", method: "بالفم" },
        { name: "الخماسي", disease: "الدفتريا، السعال الديكي، التيتانوس، الالتهاب الكبدي الفيروسي B، الانفلونزا المستديمة النزفية B", dose: "0.5 سم2", method: "حقناً بالعضل في الجزء الخارجي من العضلة الأمامية بالفخذ اليمنى" },
        { name: "سولك", disease: "شلل الأطفال", dose: "0.5 سم2", method: "حقناً بالعضل في الجزء الخارجي من العضلة الأمامية بالفخذ اليسرى" }
    ],
    "6 شهور": [
        { name: "سابين", disease: "شلل الأطفال", dose: "نقطتان", method: "بالفم" },
        { name: "الخماسي", disease: "الدفتريا، السعال الديكي، التيتانوس، الالتهاب الكبدي الفيروسي B، الانفلونزا المستديمة النزفية B", dose: "0.5 سم2", method: "حقناً بالعضل في الجزء الخارجي من العضلة الأمامية بالفخذ اليمنى" },
        { name: "سولك", disease: "شلل الأطفال", dose: "0.5 سم2", method: "حقناً بالعضل في الجزء الخارجي من العضلة الأمامية بالفخذ اليسرى" },
        { name: "فيتامين أ", disease: "-", dose: "كبسولة واحدة (زرقاء)", method: "بالفم" }
    ],
    "9 شهور": [
        { name: "سابين", disease: "شلل الأطفال", dose: "نقطتان", method: "بالفم" }
    ],
    "12 شهر": [
        { name: "سابين", disease: "شلل الأطفال", dose: "نقطتان", method: "بالفم" },
        { name: "ام.ام.ار", disease: "الحصبة والنكاف والحصبة الألمانية", dose: "0.5 سم2", method: "حقناً تحت الجلد بالذراع اليمنى" },
        { name: "فيتامين أ", disease: "-", dose: "كبسولة واحدة (زرقاء)", method: "بالفم" }
    ],
    "18 شهر": [
        { name: "سابين", disease: "شلل الأطفال", dose: "نقطتان", method: "بالفم" },
        { name: "ام.ام.ار", disease: "الحصبة والنكاف والحصبة الألمانية", dose: "0.5 سم2", method: "حقناً تحت الجلد بالذراع اليمنى" },
        { name: "الثلاثي البكتيري", disease: "الدفتريا والتيتانوس والسعال الديكي", dose: "0.5 سم2", method: "حقناً بالعضل في الجزء الخارجي من العضلة الأمامية بالفخذ اليسرى" },
        { name: "فيتامين أ", disease: "-", dose: "كبسولة واحدة (زرقاء)", method: "بالفم" }
    ]
};

const vaccinationCentersData = {
    "مركز طبي أول": {
        "0-9": ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء"],
        "12-18": ["الأحد", "الاثنين", "الأربعاء"],
        "TB": ["السبت", "الثلاثاء"],
        "location": "https://maps.app.goo.gl/gbWNY8Y1vnFjLmFe9?g_st=ac"
    },
    "مركز طبي 40": {
        "0-9": ["الاثنين", "الثلاثاء", "الأربعاء"],
        "12-18": ["الاثنين", "الثلاثاء"],
        "TB": ["الثلاثاء"],
        "location": "https://maps.app.goo.gl/Axx6rX29PjLRTdi4A?g_st=ac"
    },
    "مركز 54": {
        "0-9": ["الاثنين", "الثلاثاء", "الأربعاء"],
        "12-18": ["الاثنين", "الثلاثاء"],
        "TB": ["الثلاثاء"],
        "location": "https://maps.app.goo.gl/xp6dLtuEPkFkwKUi8?g_st=ac"
    },
    "مركز طبي 28": {
        "0-9": ["الاثنين", "الثلاثاء", "الأربعاء"],
        "12-18": ["الثلاثاء", "الأربعاء"],
        "location": "https://maps.app.goo.gl/nmnWBafKDx73SLxp7?g_st=ac"
    },
    "مركز طبي 12": {
        "0-9": ["السبت", "الأحد", "الاثنين", "الثلاثاء"],
        "12-18": ["السبت", "الثلاثاء"],
        "TB": ["السبت", "الثلاثاء"],
        "location": "https://maps.app.goo.gl/2aogmuy7mVpMNcVy7?g_st=ac"
    },
    "مركز طبي 46": {
        "0-9": ["الأحد", "الاثنين", "الثلاثاء"],
        "12-18": ["الأحد", "الاثنين"],
        "location": "https://maps.app.goo.gl/U2Q7gBpXjHmHrBoV7?g_st=ac"
    },
    "مركز طبي الحي 10 ج": {
        "0-9": ["الاثنين", "الثلاثاء", "الأربعاء"],
        "12-18": ["الاثنين", "الثلاثاء"],
        "location": "https://maps.app.goo.gl/RuGcb83oehcFtGEP6?g_st=ac"
    },
    "مركز طبي الحي 10 أ": {
        "0-9": ["الأحد"],
        "location": "https://maps.app.goo.gl/GaSU1m3kauorS7Ht8?g_st=ac"
    },
    "مركز طبي الحي 12": {
        "0-9": ["الثلاثاء", "الأربعاء", "الخميس"],
        "12-18": ["الأربعاء", "الخميس"],
        "TB": ["الأربعاء"],
        "location": "https://maps.app.goo.gl/ZLxcoYvkjfdRvUfF6?g_st=ac"
    },
    "مركز طبي الحي 16 القديم": {
        "0-9": ["الاثنين"],
        "12-18": ["الاثنين", "الثلاثاء"],
        "location": "https://maps.app.goo.gl/sb44tuH9uqfGMeWXA?g_st=ac"
    },
    "مركز طبي الحي 16 الجديد": {
        "0-9": ["السبت"],
        "12-18": ["السبت"],
        "location": "https://maps.app.goo.gl/MAejLktvuNq44Vb28?g_st=ac"
    },
    "الحي 15 الجديد": {
        "0-9": ["الأحد", "الاثنين"],
        "12-18": ["الأحد"],
        "location": "https://maps.app.goo.gl/p7HCP9mnZDzCmvkcA?g_st=ac"
    },
    "الحي 15 القديم": {
        "0-9": ["الثلاثاء"],
        "12-18": ["الثلاثاء"],
        "location": "https://maps.app.goo.gl/2ythQAEq2QVLz3qq7?g_st=ac"
    },
    "وحدة الحي 14": {
        "0-9": ["الاثنين", "الثلاثاء", "الأربعاء"],
        "12-18": ["الثلاثاء", "الأربعاء"],
        "location": "https://maps.app.goo.gl/WWyoJx5Et9Qs2tkV7?g_st=ac"
    },
    "مركز طبي حي 30": {
        "0-9": ["السبت"],
        "12-18": ["السبت"],
        "location": "https://maps.app.goo.gl/t2Cwj7MZJy1LBXqQA?g_st=ac"
    },
    "مركز طبي الحي 31": {
        "0-9": ["الثلاثاء"],
        "12-18": ["الثلاثاء"],
        "location": "https://maps.app.goo.gl/xkDEdCpJdr1a9pcd7?g_st=ac"
    },
    "مركز طبي الحي 11": {
        "0-9": ["الخميس"],
        "12-18": ["الخميس"],
        "location": "https://maps.app.goo.gl/SQhZWY7WUjFqdN1W9?g_st=ac"
    }
};
