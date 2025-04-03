// Zodiac signs data moved from script.js
const zodiacSigns = [
    "Ariete", "Toro", "Gemelli", "Cancro", "Leone", "Vergine",
    "Bilancia", "Scorpione", "Sagittario", "Capricorno", "Acquario", "Pesci"
];

// Get zodiac sign based on birth date
function getZodiacSign(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
        return "Ariete";
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
        return "Toro";
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
        return "Gemelli";
    } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
        return "Cancro";
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
        return "Leone";
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
        return "Vergine";
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
        return "Bilancia";
    } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
        return "Scorpione";
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
        return "Sagittario";
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return "Capricorno";
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
        return "Acquario";
    } else {
        return "Pesci";
    }
}

// Get personality trait based on zodiac sign
function getPersonalityTrait(sign) {
    const traits = {
        "Ariete": "dinamica e coraggiosa",
        "Toro": "pratica e affidabile",
        "Gemelli": "versatile e comunicativa",
        "Cancro": "sensibile e protettiva",
        "Leone": "creativa e sicura di sé",
        "Vergine": "analitica e meticolosa",
        "Bilancia": "diplomatica ed equilibrata",
        "Scorpione": "intensa e determinata",
        "Sagittario": "ottimista ed avventurosa",
        "Capricorno": "ambiziosa e disciplinata",
        "Acquario": "innovativa e indipendente",
        "Pesci": "intuitiva e compassionevole"
    };
    return traits[sign] || "complessa e unica";
}

// Get emotional trait based on zodiac sign
function getEmotionalTrait(sign) {
    const traits = {
        "Ariete": "impulsivo/a ed entusiasta",
        "Toro": "calmo/a ma testardo/a",
        "Gemelli": "curioso/a e adattabile",
        "Cancro": "profondamente emotivo/a e intuitivo/a",
        "Leone": "passionale e generoso/a",
        "Vergine": "riservato/a ma profondo/a",
        "Bilancia": "armonioso/a e socievole",
        "Scorpione": "intenso/a e misterioso/a",
        "Sagittario": "ottimista e franco/a",
        "Capricorno": "controllato/a ma sensibile",
        "Acquario": "distaccato/a ma umanitario/a",
        "Pesci": "empatico/a e sognatore/trice"
    };
    return traits[sign] || "emotivamente complesso/a";
}

// Get ascendant trait based on zodiac sign
function getAscendantTrait(sign) {
    const traits = {
        "Ariete": "diretta e energica",
        "Toro": "calma e affidabile",
        "Gemelli": "brillante e vivace",
        "Cancro": "premurosa e accogliente",
        "Leone": "carismatica e autoritaria",
        "Vergine": "precisa e attenta",
        "Bilancia": "elegante e diplomatica",
        "Scorpione": "magnetica e riservata",
        "Sagittario": "entusiasta e ottimista",
        "Capricorno": "seria e responsabile",
        "Acquario": "originale ed eccentrica",
        "Pesci": "gentile e impressionabile"
    };
    return traits[sign] || "dall'apparenza interessante";
}

// Get future prediction based on zodiac sign
function getFuturePrediction(sign) {
    const predictions = {
        "Ariete": "un periodo di nuove iniziative e opportunità professionali",
        "Toro": "una fase di stabilità finanziaria e di piaceri materiali",
        "Gemelli": "un momento di connessioni sociali e nuove idee",
        "Cancro": "un ciclo di evoluzione emotiva e rafforzamento familiare",
        "Leone": "un periodo di riconoscimento e realizzazione creativa",
        "Vergine": "una fase di miglioramento personale e organizzazione",
        "Bilancia": "un momento di armonia nelle relazioni e collaborazioni",
        "Scorpione": "un ciclo di trasformazione personale e scoperte profonde",
        "Sagittario": "un periodo di espansione, viaggi e nuove filosofie",
        "Capricorno": "una fase di successo professionale e responsabilità",
        "Acquario": "un momento di innovazione e connessioni sociali significative",
        "Pesci": "un ciclo di crescita spirituale e intuizione potenziata"
    };
    return predictions[sign] || "un periodo di cambiamenti interessanti";
}

// Get zodiac symbol
function getZodiacSymbol(sign) {
    const symbols = {
        "Ariete": "♈",
        "Toro": "♉",
        "Gemelli": "♊",
        "Cancro": "♋",
        "Leone": "♌",
        "Vergine": "♍",
        "Bilancia": "♎",
        "Scorpione": "♏",
        "Sagittario": "♐",
        "Capricorno": "♑",
        "Acquario": "♒",
        "Pesci": "♓"
    };
    return symbols[sign] || "⭐";
}

// Get daily advice
function getDailyAdvice(sign) {
    const advice = [
        "Dedica del tempo a te stesso oggi.",
        "Una pausa dalla routine ti farà bene.",
        "Comunica apertamente con le persone che ami.",
        "Non avere paura di chiedere aiuto quando ne hai bisogno.",
        "Segui la tua intuizione nelle decisioni importanti.",
        "Prenditi un momento per riflettere prima di agire.",
        "Un piccolo gesto di gentilezza può fare una grande differenza.",
        "Ricorda di bere abbastanza acqua e mangiare sano oggi.",
        "Trova gioia nelle piccole cose quotidiane.",
        "Affronta una sfida che hai rimandato per troppo tempo."
    ];
    
    // Use sign as seed for pseudo-random selection
    const index = (sign.length + new Date().getDate()) % advice.length;
    return advice[index];
}