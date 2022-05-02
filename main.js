const shufflleArray = (arr) => arr.sort((a, b) => Math.random() - 0.5);
const minosArray = (arr1, arr2) => arr1.filter(e => !arr2.includes(e));

const hiragana = ["ぁ", "あ", "ぃ", "い", "ぅ", "う", "ぇ", "え", "ぉ", "お", "か", "が", "き", "ぎ", "く", "ぐ", "け", "げ", "こ", "ご", "さ", "ざ", "し", "じ", "す", "ず", "せ", "ぜ", "そ", "ぞ", "た", "だ", "ち", "ぢ", "っ", "つ", "づ", "て", "で", "と", "ど", "な", "に", "ぬ", "ね", "の", "は", "ば", "ぱ", "ひ", "び", "ぴ", "ふ", "ぶ", "ぷ", "へ", "べ", "ぺ", "ほ", "ぼ", "ぽ", "ま", "み", "む", "め", "も", "ゃ", "や", "ゅ", "ゆ", "ょ", "よ", "ら", "り", "る", "れ", "ろ", "ゎ", "わ", "ゐ", "ゑ", "を", "ん", "ゔ"];
const memory = JSON.parse(localStorage.getItem("memory") ?? "[]");
let lastRollDate = +(localStorage.getItem("lastRoll") ?? 0);
const tweet = (text) => window.open().location.href=`https://twitter.com/intent/tweet?&text=${text}%0A%23バベルガチャ%0Ahttps://hutinoatari.github.io/babelGacha/`;
const reset = () => {
    if(window.confirm("ほんとうに？"));
    localStorage.removeItem("memory");
    while(memory.length !== 0) memory.pop();
    localStorage.removeItem("lastRoll");
    lastRollDate = 0;
}

const display = document.querySelector("main");
const homeScene = () => display.innerHTML = `<p>げんざい${memory.length}こ</p><ul><li><button onclick="getCharScene()">もじをさがす</button></li><li><button onclick="charDictScene()">もじをみる</button></li><li><button onclick="createStrScene()">ぶんをつくる</button></li><li><button onclick="reset()">すべてわすれる</button></li></ul>`;
const getCharScene = () => {
    const nowvDate = Date.now();
    const passedHour = Math.floor((nowvDate-54000000)/3600000) - Math.floor((lastRollDate-54000000)/3600000);
    lastRollDate = nowvDate;
    localStorage.setItem("lastRoll", nowvDate);
    if(passedHour > 0){
        if(memory.length < hiragana.length){
            const c = shufflleArray(minosArray(hiragana, memory))[0];
            hiragana.sort();
            memory.push(c);
            memory.sort();
            localStorage.setItem("memory", JSON.stringify(memory));
            display.innerHTML = `<p>「${c}」をみつけた！</p><div><button onclick="tweet('「${c}」をみつけた！')">みんなにおしえる</button></div><button onclick="homeScene()">もどる</button>`;
        }else{
            display.innerHTML = `<p>みつかっていないもじはなさそうだ。</p><button onclick="homeScene()">もどる</button>`;
        }
    }else{
        display.innerHTML = `<p>もじがみつからない......。しばらくしたらまたきてね！</p><button onclick="homeScene()">もどる</button>`;
    }
}
const charDictScene = () => display.innerHTML = `<p>げん${memory.length}こ/ぜん${hiragana.length}こ</p><p>${memory.join("、")}</p><button onclick="homeScene()">もどる</button>`;
const createStrScene = () => display.innerHTML = `<p id="field"></p><div>${[...memory, "ー", "、", "。", "　", "！", "？"].map((c) => `<button onclick="field.innerHTML+='${c}'">${c}</button>`).join("")}<button onclick="field.innerHTML=field.innerHTML.slice(0,-1)">けす</button></div><div><button onclick="tweet(field.innerHTML)">つぶやく</button></div><button onclick="homeScene()">もどる</button>`;

homeScene();