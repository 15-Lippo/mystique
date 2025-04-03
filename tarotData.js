// Tarot cards data moved from script.js
const tarotCards = [
    { name: "Il Matto", meaning: "Nuovi inizi, avventura, libertà, spontaneità" },
    { name: "Il Mago", meaning: "Azione, potere, concentrazione, abilità" },
    { name: "La Papessa", meaning: "Intuizione, saggezza, conoscenza, mistero" },
    { name: "L'Imperatrice", meaning: "Fertilità, crescita, abbondanza, nutrimento" },
    { name: "L'Imperatore", meaning: "Autorità, struttura, controllo, stabilità" },
    { name: "Il Papa", meaning: "Spiritualità, tradizione, conformità, credenza" },
    { name: "Gli Amanti", meaning: "Amore, relazioni, scelte, allineamento di valori" },
    { name: "Il Carro", meaning: "Controllo, volontà, successo, determinazione" },
    { name: "La Forza", meaning: "Coraggio, forza interiore, compassione, influenza" },
    { name: "L'Eremita", meaning: "Introspezione, solitudine, ricerca interiore" },
    { name: "La Ruota della Fortuna", meaning: "Cambiamento, cicli, fortuna, destino" },
    { name: "La Giustizia", meaning: "Equità, verità, legge, equilibrio" },
    { name: "L'Appeso", meaning: "Sacrificio, attesa, prospettiva, sospensione" },
    { name: "La Morte", meaning: "Trasformazione, fine, rinnovamento, transizione" },
    { name: "La Temperanza", meaning: "Equilibrio, moderazione, armonia, pazienza" },
    { name: "Il Diavolo", meaning: "Ossessione, dipendenza, materialismo, sessualità" },
    { name: "La Torre", meaning: "Distruzione, cambiamento improvviso, caos, rivelazione" },
    { name: "La Stella", meaning: "Speranza, ispirazione, serenità, rinnovamento" },
    { name: "La Luna", meaning: "Illusione, paura, ansia, intuizione, inconscio" },
    { name: "Il Sole", meaning: "Successo, gioia, vitalità, positività, chiarezza" },
    { name: "Il Giudizio", meaning: "Riflessione, valutazione, rinascita, chiamata" },
    { name: "Il Mondo", meaning: "Completamento, realizzazione, integrazione, viaggio" }
];

// Daily card messages
const dailyCardMessages = {
    "Il Matto": "Oggi è un giorno per essere spontanei e avventurosi. Non aver paura di intraprendere un nuovo percorso o di esplorare nuove possibilità.",
    "Il Mago": "Oggi hai il potere di manifestare ciò che desideri. Concentrati sui tuoi obiettivi e usa le tue abilità con fiducia.",
    "La Papessa": "Ascolta la tua voce interiore oggi. La tua intuizione è particolarmente forte e può guidarti verso decisioni sagge.",
    "L'Imperatrice": "Oggi è un giorno per la creatività e la crescita. Nutri i tuoi progetti e relazioni, e vedrai abbondanza fiorire.",
    "L'Imperatore": "È il momento di assumere il controllo e stabilire strutture solide. La tua leadership e autorità sono necessarie oggi.",
    "Il Papa": "Oggi potresti trovare guida in tradizioni o figure di autorità. È anche un buon momento per riconnetterti con i tuoi valori.",
    "Gli Amanti": "Oggi le relazioni sono in primo piano. Prenditi del tempo per le connessioni significative e per allineare le tue scelte con i tuoi valori.",
    "Il Carro": "Oggi è un giorno per avanzare con determinazione. Mantieni il controllo e dirigi la tua energia verso il successo.",
    "La Forza": "La forza interiore è la tua alleata oggi. Affronta le sfide con coraggio e compassione.",
    "L'Eremita": "Oggi potresti sentire il bisogno di solitudine e riflessione. Ascolta questo richiamo e cerca la saggezza interiore.",
    "La Ruota della Fortuna": "I cambiamenti sono in arrivo. Accetta il flusso naturale degli eventi e adattati con grazia alle nuove circostanze.",
    "La Giustizia": "Oggi è un giorno per verità e equilibrio. Le decisioni prese con onestà porteranno a risultati equi.",
    "L'Appeso": "Potrebbe essere necessario fare una pausa oggi. Un cambio di prospettiva può rivelare nuove soluzioni.",
    "La Morte": "Oggi è il momento di lasciar andare ciò che non ti serve più. Questo crea spazio per il rinnovamento e la trasformazione.",
    "La Temperanza": "L'equilibrio e la moderazione sono importanti oggi. Cerca l'armonia in tutte le aree della tua vita.",
    "Il Diavolo": "Oggi riconosci ciò che ti tiene legato. La consapevolezza delle tue dipendenze è il primo passo verso la libertà.",
    "La Torre": "Sii pronto per cambiamenti improvvisi. Ciò che crolla oggi fa spazio per strutture più autentiche domani.",
    "La Stella": "Oggi è un giorno di speranza e ispirazione. Segui la tua stella guida verso il rinnovamento.",
    "La Luna": "Le tue emozioni potrebbero essere intense oggi. Non temere l'ignoto, ma usa la tua intuizione come bussola.",
    "Il Sole": "Oggi è un giorno di chiarezza e gioia. Celebra i tuoi successi e condividi la tua luce con gli altri.",
    "Il Giudizio": "È tempo di riflessione e rinascita. Ascolta la chiamata verso una versione più autentica di te stesso.",
    "Il Mondo": "Oggi potresti sentire un senso di completamento. Celebra i tuoi traguardi e preparati per nuovi cicli di esperienza."
};

// Card position descriptions
function getCardPosition(index) {
    const positions = ["Passato", "Presente", "Futuro"];
    return positions[index];
}

// Lucky number generator
function getLuckyNumbers(sign) {
    // Generate seed from zodiac sign and current date
    const seed = sign.length + new Date().getDate() + new Date().getMonth();
    const numbers = [];
    
    // Generate 5 unique lucky numbers between 1-90
    while (numbers.length < 5) {
        const num = 1 + Math.floor((seed * (numbers.length + 1) * 13) % 90);
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    
    return numbers.sort((a, b) => a - b);
}

// Generate interpretation based on selected cards
function generateInterpretation(cards) {
    // Generate a unique interpretation based on the selected cards
    const pastCard = cards[0];
    const presentCard = cards[1];
    const futureCard = cards[2];
    const influenceCard = cards[3] || cards[0]; // Add influence card (or use past card if not available)
    const outcomeCard = cards[4] || cards[2]; // Add outcome card (or use future card if not available)

    let interpretation = `La carta del <strong>passato</strong>, ${pastCard.name}, indica che `;

    // Past interpretations
    if (["Il Matto", "Il Mago", "Il Carro", "La Stella"].includes(pastCard.name)) {
        interpretation += "hai attraversato un periodo di grande energia e iniziativa.";
    } else if (["La Papessa", "L'Eremita", "La Luna"].includes(pastCard.name)) {
        interpretation += "hai vissuto momenti di introspezione e ricerca interiore.";
    } else if (["L'Imperatrice", "L'Imperatore", "La Forza", "Il Mondo"].includes(pastCard.name)) {
        interpretation += "hai esercitato controllo e stabilità nella tua vita.";
    } else if (["Gli Amanti", "La Temperanza", "Il Sole"].includes(pastCard.name)) {
        interpretation += "hai sperimentato armonia e connessione con gli altri.";
    } else if (["La Torre", "La Morte", "Il Diavolo", "La Ruota della Fortuna"].includes(pastCard.name)) {
        interpretation += "hai affrontato cambiamenti significativi e trasformazioni.";
    } else {
        interpretation += "hai attraversato un periodo di apprendimento e crescita.";
    }

    interpretation += `<br><br>Nel <strong>presente</strong>, ${presentCard.name} suggerisce che `;

    // Present interpretations
    if (["Il Matto", "Il Carro", "La Ruota della Fortuna"].includes(presentCard.name)) {
        interpretation += "stai vivendo un momento di cambiamento e movimento.";
    } else if (["La Papessa", "L'Eremita", "La Giustizia"].includes(presentCard.name)) {
        interpretation += "ti trovi in una fase di riflessione e valutazione.";
    } else if (["L'Imperatrice", "L'Imperatore", "Il Papa"].includes(presentCard.name)) {
        interpretation += "sei in una posizione di potere e responsabilità.";
    } else if (["Gli Amanti", "La Temperanza", "La Stella", "Il Sole"].includes(presentCard.name)) {
        interpretation += "stai sperimentando equilibrio e soddisfazione nelle relazioni.";
    } else if (["La Torre", "La Morte", "Il Diavolo", "L'Appeso"].includes(presentCard.name)) {
        interpretation += "stai affrontando sfide e ostacoli da superare.";
    } else {
        interpretation += "sei in un periodo di transizione e adattamento.";
    }

    interpretation += `<br><br>Per il <strong>futuro</strong>, ${futureCard.name} indica che `;

    // Future interpretations
    if (["Il Matto", "Il Mago", "Il Mondo", "Il Sole"].includes(futureCard.name)) {
        interpretation += "ti aspettano successo e realizzazione personale.";
    } else if (["La Papessa", "La Stella", "La Luna"].includes(futureCard.name)) {
        interpretation += "svilupperai una maggiore intuizione e comprensione spirituale.";
    } else if (["L'Imperatrice", "L'Imperatore", "La Forza", "La Giustizia"].includes(futureCard.name)) {
        interpretation += "guadagnerai stabilità e controllo nella tua vita.";
    } else if (["Gli Amanti", "La Temperanza", "Il Giudizio"].includes(futureCard.name)) {
        interpretation += "vivrai momenti di armonia e connessione profonda.";
    } else if (["La Torre", "La Morte", "Il Diavolo", "La Ruota della Fortuna"].includes(futureCard.name)) {
        interpretation += "affronterai trasformazioni necessarie per la tua crescita.";
    } else {
        interpretation += "incontrerai nuove opportunità e possibilità.";
    }

    interpretation += `<br><br>La carta di <strong>influenza</strong>, ${influenceCard.name}, rappresenta le forze che agiscono sulla tua situazione. `;

    // Influence interpretations
    if (["Il Matto", "La Stella", "Il Sole"].includes(influenceCard.name)) {
        interpretation += "Un'energia ottimista e positiva sta influenzando il tuo cammino.";
    } else if (["La Papessa", "L'Eremita", "La Luna"].includes(influenceCard.name)) {
        interpretation += "Forze intuitive e sottili stanno lavorando in tuo favore.";
    } else if (["L'Imperatrice", "L'Imperatore", "Il Papa"].includes(influenceCard.name)) {
        interpretation += "Autorità e strutture esistenti hanno un ruolo importante nella tua situazione.";
    } else if (["Gli Amanti", "La Temperanza", "Il Giudizio"].includes(influenceCard.name)) {
        interpretation += "Le relazioni e le connessioni con gli altri stanno influenzando il tuo percorso.";
    } else if (["La Torre", "La Morte", "Il Diavolo"].includes(influenceCard.name)) {
        interpretation += "Cambiamenti improvvisi e trasformazioni profonde stanno influenzando la tua situazione.";
    } else {
        interpretation += "Ci sono forze in gioco che richiedono la tua attenzione e consapevolezza.";
    }

    interpretation += `<br><br>La carta del <strong>risultato</strong>, ${outcomeCard.name}, suggerisce l'esito probabile. `;

    // Outcome interpretations
    if (["Il Matto", "Il Mago", "Il Mondo", "Il Sole"].includes(outcomeCard.name)) {
        interpretation += "Il risultato sarà estremamente positivo e porterà grande soddisfazione.";
    } else if (["La Papessa", "L'Eremita", "La Giustizia"].includes(outcomeCard.name)) {
        interpretation += "L'esito porterà maggiore chiarezza e comprensione.";
    } else if (["L'Imperatrice", "L'Imperatore", "Il Carro"].includes(outcomeCard.name)) {
        interpretation += "Otterrai controllo e stabilità come risultato finale.";
    } else if (["Gli Amanti", "La Temperanza", "La Stella"].includes(outcomeCard.name)) {
        interpretation += "Il risultato porterà armonia e bilanciamento nella tua vita.";
    } else if (["La Torre", "La Morte", "La Luna"].includes(outcomeCard.name)) {
        interpretation += "L'esito comporterà un cambiamento significativo che alla fine sarà per il tuo bene.";
    } else {
        interpretation += "Il risultato dipenderà dalla tua capacità di adattarti e crescere.";
    }

    interpretation += `<br><br>Ricorda che il futuro non è fisso, ma piuttosto un riflesso del tuo percorso attuale. Hai il potere di influenzare il tuo destino con le tue scelte e azioni.`;

    return interpretation;
}

// Detailed card commentary
function getCardCommentary(cardName) {
    const commentaries = {
        "Il Matto": "Il Matto rappresenta l'inizio di un viaggio, la spontaneità e la libertà. Questa carta ti invita a seguire la tua strada con entusiasmo, senza preoccuparti troppo del giudizio altrui. È il momento di essere avventurosi e aperti a nuove possibilità, anche se sembrano rischiose o non convenzionali.",
        "Il Mago": "Il Mago simboleggia il potere personale, la manifestazione e la concentrazione. Questa carta indica che hai tutti gli strumenti necessari per realizzare i tuoi obiettivi. È il momento di agire con consapevolezza, focalizzando le tue energie e utilizzando le tue abilità in modo creativo ed efficace.",
        "La Papessa": "La Papessa rappresenta la saggezza interiore, l'intuizione e la conoscenza nascosta. Questa carta ti suggerisce di ascoltare la tua voce interiore e di fidarti del tuo istinto. C'è una profonda saggezza dentro di te che sta cercando di emergere, prestale attenzione.",
        "L'Imperatrice": "L'Imperatrice simboleggia l'abbondanza, la fertilità e la crescita. Questa carta indica un periodo di creatività e nutrimento. È il momento di coltivare i tuoi progetti e relazioni, permettendo loro di fiorire naturalmente sotto la tua cura amorevole.",
        "L'Imperatore": "L'Imperatore rappresenta l'autorità, la struttura e la stabilità. Questa carta suggerisce la necessità di ordine e disciplina nella tua vita. È il momento di assumere il controllo, stabilire confini chiari e creare solide fondamenta per i tuoi progetti.",
        "Il Papa": "Il Papa simboleggia la spiritualità, la tradizione e la guida morale. Questa carta indica l'importanza di seguire valori e principi consolidati. Potresti trovare ispirazione in figure di autorità, maestri spirituali o tradizioni che rispetti.",
        "Gli Amanti": "Gli Amanti rappresentano le relazioni significative, le scelte importanti e l'allineamento di valori. Questa carta suggerisce che sei di fronte a una decisione che richiede di seguire il tuo cuore, mantenendo al contempo un equilibrio tra desiderio e responsabilità.",
        "Il Carro": "Il Carro simboleggia la determinazione, il controllo e la vittoria. Questa carta indica che sei sulla strada giusta per raggiungere i tuoi obiettivi. Continua ad avanzare con fiducia, mantenendo la direzione nonostante gli ostacoli.",
        "La Forza": "La Forza rappresenta il coraggio, la pazienza e la forza interiore. Questa carta suggerisce che la vera potenza non risiede nella dominazione, ma nella gentilezza e nella perseveranza. Affronta le tue sfide con compassione e determinazione.",
        "L'Eremita": "L'Eremita simboleggia l'introspezione, la solitudine consapevole e la ricerca di verità. Questa carta indica che è il momento di ritirarsi dal rumore esterno per ascoltare la tua saggezza interiore. La solitudine non è isolamento, ma un percorso verso la conoscenza di sé.",
        "La Ruota della Fortuna": "La Ruota della Fortuna rappresenta i cicli della vita, il destino e i cambiamenti inevitabili. Questa carta indica che stai attraversando una fase di transizione. Accetta che tutto è in movimento costante e impara ad adattarti con grazia ai ritmi della vita.",
        "La Giustizia": "La Giustizia simboleggia l'equilibrio, la verità e la responsabilità delle proprie azioni. Questa carta suggerisce che le tue decisioni avranno conseguenze importanti. È il momento di agire con integrità e di considerare attentamente cause ed effetti.",
        "L'Appeso": "L'Appeso rappresenta il sacrificio volontario, la prospettiva alternativa e la pazienza. Questa carta indica la necessità di mettere in pausa e vedere le situazioni da un punto di vista completamente diverso. Ciò che sembra una limitazione potrebbe essere un'opportunità di crescita.",
        "La Morte": "La Morte simboleggia la trasformazione, la fine di un ciclo e l'inizio di uno nuovo. Questa carta, contrariamente al suo aspetto, non indica una fine fisica ma un cambiamento profondo e necessario. È il momento di lasciar andare ciò che non ti serve più per fare spazio al rinnovamento.",
        "La Temperanza": "La Temperanza rappresenta l'equilibrio, la moderazione e la pazienza. Questa carta suggerisce la necessità di integrare elementi diversi della tua vita in un insieme armonioso. È il momento di trovare un flusso naturale e di evitare gli estremi.",
        "Il Diavolo": "Il Diavolo simboleggia le dipendenze, le illusioni e le limitazioni autoimposte. Questa carta indica che potresti essere intrappolato in schemi negativi o relazioni malsane. È il momento di riconoscere le catene che ti legano e trovare il coraggio di liberartene.",
        "La Torre": "La Torre rappresenta il cambiamento improvviso, la rivelazione e la distruzione di false strutture. Questa carta indica che le fondamenta instabili nella tua vita potrebbero crollare, ma questo è necessario per costruire qualcosa di più autentico e solido.",
        "La Stella": "La Stella simboleggia la speranza, l'ispirazione e la guarigione. Questa carta indica che dopo un periodo difficile, stai entrando in una fase di rinnovamento e pace. È il momento di avere fede nel futuro e di seguire la tua luce interiore.",
        "La Luna": "La Luna rappresenta l'inconscio, le illusioni e le emozioni profonde. Questa carta suggerisce che non tutto è come appare e che devi fidarti della tua intuizione per navigare nell'incertezza. Esplora le tue paure e i tuoi sogni per scoprire verità nascoste.",
        "Il Sole": "Il Sole simboleggia la gioia, la vitalità e il successo. Questa carta indica un periodo di chiarezza e realizzazione. È il momento di celebrare i tuoi successi, condividere la tua luce con gli altri e godere della positività che ti circonda.",
        "Il Giudizio": "Il Giudizio rappresenta il risveglio, la rinascita e la chiamata al tuo vero scopo. Questa carta suggerisce che stai entrando in una fase di profonda auto-valutazione. È il momento di rispondere alla chiamata interiore e di liberarti dal passato per rinnovarti completamente.",
        "Il Mondo": "Il Mondo simboleggia il completamento, l'integrazione e la realizzazione. Questa carta indica che hai raggiunto la fine di un importante ciclo di vita. È il momento di celebrare i tuoi successi, integrare le tue esperienze e prepararti per un nuovo viaggio."
    };
    return commentaries[cardName] || "Questa carta rappresenta un elemento significativo nel tuo percorso, rifletti sul suo significato più profondo nella tua vita.";
}