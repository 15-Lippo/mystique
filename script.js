document.addEventListener('DOMContentLoaded', function() {
    // Keep only the necessary event listeners
    const generateReadingBtn = document.getElementById('generateReading');
    const readingResult = document.getElementById('reading-result');
    const tarotContainer = document.getElementById('tarot-container');
    const tarotInterpretation = document.getElementById('tarot-interpretation');
    const chartInterpretation = document.getElementById('chart-interpretation');
    const astrologicalChart = document.getElementById('astrological-chart');
    const horoscopeContent = document.getElementById('horoscopeContent');
    const dailyCardSection = document.getElementById('daily-card-section');
    const dailyCardSelection = document.getElementById('daily-card-selection');
    const dailyCardResult = document.getElementById('daily-card-result');
    const selectedDailyCard = document.getElementById('selected-daily-card');
    const dailyCardMessage = document.getElementById('daily-card-message');
    const autoSpreadBtn = document.getElementById('auto-spread');
    const chooseCardsBtn = document.getElementById('choose-cards');
    const selectCardsContainer = document.getElementById('select-cards-container');
    const cardsSelection = document.getElementById('cards-selection');
    const confirmSelectionBtn = document.getElementById('confirm-selection');
    
    // Tarot cards data
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

    const dailyCardMessages = {
        "Il Matto": "Oggi sarà una giornata di nuove iniziative e scoperte.",
        "Il Mago": "La tua determinazione e abilità saranno fondamentali per raggiungere i tuoi obiettivi.",
        "La Papessa": "Ascolta la tua intuizione e segui il tuo istinto.",
        "L'Imperatrice": "Prenditi cura di te stesso e della tua salute.",
        "L'Imperatore": "La tua autorità e leadership saranno necessarie per guidare gli altri.",
        "Il Papa": "Ricorda la tua spiritualità e le tue credenze.",
        "Gli Amanti": "Le tue relazioni saranno al centro della tua attenzione.",
        "Il Carro": "La tua determinazione e volontà saranno essenziali per raggiungere i tuoi obiettivi.",
        "La Forza": "La tua forza interiore e compassione saranno fondamentali per superare le sfide.",
        "L'Eremita": "Prenditi del tempo per riflettere e riscoprire te stesso.",
        "La Ruota della Fortuna": "I cambiamenti sono inevitabili, ma puoi controllare la tua reazione.",
        "La Giustizia": "La verità e l'equità saranno fondamentali per le tue decisioni.",
        "L'Appeso": "Sii paziente e aspetta il momento giusto per agire.",
        "La Morte": "La trasformazione e il rinnovamento sono necessari per la tua crescita.",
        "La Temperanza": "L'equilibrio e la moderazione saranno essenziali per la tua armonia.",
        "Il Diavolo": "Non lasciarti influenzare dalle ossessioni e dalle dipendenze.",
        "La Torre": "I cambiamenti improvvisi possono essere traumatici, ma possono anche essere opportunità.",
        "La Stella": "La speranza e l'ispirazione saranno fondamentali per la tua crescita.",
        "La Luna": "La tua intuizione e il tuo istinto saranno essenziali per navigare le sfide.",
        "Il Sole": "La tua positività e la tua vitalità saranno contagiose.",
        "Il Giudizio": "Rifletti sul tuo passato e valuta le tue scelte.",
        "Il Mondo": "Il completamento e la realizzazione saranno i tuoi obiettivi."
    };

    // Zodiac signs
    const zodiacSigns = [
        "Ariete", "Toro", "Gemelli", "Cancro", "Leone", "Vergine",
        "Bilancia", "Scorpione", "Sagittario", "Capricorno", "Acquario", "Pesci"
    ];

    // Track selected cards
    let selectedCards = [];
    const maxSelections = 5;

    // Initialize daily card and card selection UI
    initializeDailyCardSection();
    initializeCardSelectionUI();

    function showPaymentModal() {
        const paymentModal = document.getElementById('payment-modal');
        paymentModal.style.display = 'block';

        // Close modal functionality with multiple methods
        const closeModal = document.querySelector('.close-modal');
        
        // Close by clicking 'x'
        closeModal.onclick = function() {
            paymentModal.style.display = 'none';
        }

        // Close by clicking outside the modal
        paymentModal.onclick = function(event) {
            if (event.target === paymentModal) {
                paymentModal.style.display = 'none';
            }
        }

        // Close by pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                paymentModal.style.display = 'none';
            }
        });

        // PayPal button rendering
        paypal.Buttons({
            style: {
                layout: 'vertical',
                color:  'blue',
                shape:  'rect',
                label:  'paypal'
            },
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: '1.50',
                            currency_code: 'EUR'
                        },
                        description: 'Lettura Tarocchi e Oroscopo Mystique Cartomanzia'
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(orderData) {
                    // Payment successful - proceed with reading
                    const paymentModal = document.getElementById('payment-modal');
                    paymentModal.style.display = 'none';
                    
                    // If payment is successful, generate reading
                    generateReading();
                });
            },
            onError: function(err) {
                console.error('PayPal Error:', err);
                alert('Si è verificato un errore durante il pagamento. Riprova.');
            }
        }).render('#paypal-button-container');
    }

    // Generate reading when button is clicked
    generateReadingBtn.addEventListener('click', function() {
        const birthDate = document.getElementById('birthDate').value;
        const birthTime = document.getElementById('birthTime').value;
        const birthPlace = document.getElementById('birthPlace').value;

        if (!birthDate || !birthTime || !birthPlace) {
            alert('Per favore, inserisci tutti i dati richiesti.');
            return;
        }

        // Show payment modal instead of directly generating reading
        showPaymentModal();
    });

    function generateReading() {
        const birthDate = document.getElementById('birthDate').value;
        const birthTime = document.getElementById('birthTime').value;
        const birthPlace = document.getElementById('birthPlace').value;

        // Generate reading as before
        if (autoSpreadBtn.classList.contains('active')) {
            generateTarotReading();
        } else {
            if (selectedCards.length !== 5) {
                alert('Seleziona 5 carte per continuare.');
                return;
            }
        }
        
        generateAstrologicalChart(birthDate, birthTime, birthPlace);

        // Show the results
        readingResult.style.display = 'block';

        // Scroll to results
        readingResult.scrollIntoView({ behavior: 'smooth' });
    }

    // Initialize daily card section
    function initializeDailyCardSection() {
        // Create 3 face-down cards for daily selection
        for (let i = 0; i < 3; i++) {
            const card = document.createElement('div');
            card.className = 'daily-card';
            card.dataset.index = i;
            dailyCardSelection.appendChild(card);
            
            card.addEventListener('click', selectDailyCard);
        }
        
        // Initially hide the result
        dailyCardResult.style.display = 'none';
    }
    
    // Handle daily card selection
    function selectDailyCard(e) {
        // Get a random card from the tarot deck
        const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
        
        // Display the selected card and message
        selectedDailyCard.innerHTML = `
            <div class="daily-card flipped">
                <div class="daily-card-inner">
                    <div class="daily-card-front"></div>
                    <div class="daily-card-back">
                        <h4>${randomCard.name}</h4>
                        <p>${randomCard.meaning}</p>
                    </div>
                </div>
            </div>
        `;
        
        // Generate a more personalized message for the day
        const dayPrediction = generateDayPrediction(randomCard.name);
        
        dailyCardMessage.innerHTML = `
            <h4>Messaggio per oggi:</h4>
            <p>${dailyCardMessages[randomCard.name]}</p>
            <h4>Come sarà la tua giornata:</h4>
            <p>${dayPrediction}</p>
        `;
        
        // Show the result and hide the selection
        dailyCardSelection.style.display = 'none';
        dailyCardResult.style.display = 'block';
        
        // Add restart button
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Scegli un\'altra carta';
        restartButton.className = 'cta-button';
        restartButton.addEventListener('click', resetDailyCardSelection);
        dailyCardMessage.appendChild(restartButton);
    }

    // Reset daily card selection
    function resetDailyCardSelection() {
        dailyCardSelection.style.display = 'flex';
        dailyCardResult.style.display = 'none';
        selectedDailyCard.innerHTML = '';
        dailyCardMessage.innerHTML = '';
    }

    // Function to generate a more personalized message for the day
    function generateDayPrediction(cardName) {
        const todayDate = new Date();
        const day = todayDate.getDay(); // 0-6 (Sunday-Saturday)
        
        // Different predictions based on card and day of week
        const predictions = {
            "Il Matto": [
                "La tua energia oggi sarà contagiosa. Le persone intorno a te saranno attratte dal tuo spirito libero. Un'opportunità inaspettata potrebbe presentarsi nel pomeriggio.",
                "Oggi è un giorno perfetto per uscire dalla tua zona di comfort. Prova qualcosa di nuovo e lasciati sorprendere dalle possibilità che si presentano.",
                "La tua creatività sarà al massimo oggi. Usa questa energia per risolvere problemi che hai rimandato. Una persona cara potrebbe aver bisogno del tuo supporto."
            ],
            "Il Mago": [
                "Oggi avrai un controllo particolare sulle tue capacità. È il momento di agire sui tuoi progetti con fiducia e determinazione. La tua abilità di persuasione sarà al massimo.",
                "La tua concentrazione oggi sarà eccezionale. Approfitta di questa chiarezza mentale per affrontare compiti complessi. Il successo è a portata di mano.",
                "Oggi le tue abilità brilleranno in situazioni sociali. La tua capacità di comunicare sarà particolarmente efficace, specialmente in ambito lavorativo."
            ],
            "La Papessa": [
                "La tua intuizione oggi sarà straordinariamente acuta. Fidati del tuo istinto, specialmente nelle decisioni importanti. Potresti ricevere informazioni nascoste.",
                "Oggi è un giorno per l'introspezione e lo studio. Dedica del tempo a riflettere sulle tue conoscenze e su come applicarle. Una verità importante potrebbe rivelarsi.",
                "La tua saggezza interiore sarà la tua guida oggi. Ascolta la voce dentro di te prima di prendere decisioni. Un messaggio importante potrebbe arrivare in forma inaspettata."
            ]
        };
        
        // Default predictions for cards not specifically listed
        const defaultPredictions = [
            "La giornata si presenta con energia mista. Mantieni l'equilibrio tra le tue responsabilità e il tempo per te stesso. Un incontro casuale potrebbe portare a nuove idee.",
            "Oggi potresti sentirti particolarmente in sintonia con le persone intorno a te. Approfitta di questa connessione per rafforzare i tuoi legami personali e professionali.",
            "La giornata richiederà adattabilità da parte tua. Sii flessibile di fronte agli imprevisti e vedrai che ogni sfida si trasformerà in un'opportunità di crescita."
        ];
        
        // Get predictions for the specific card or use defaults
        const cardPredictions = predictions[cardName] || defaultPredictions;
        
        // Use day of week to select a prediction (ensuring consistency for same day/card)
        const index = (cardName.length + day) % cardPredictions.length;
        
        return cardPredictions[index];
    }

    function initializeCardSelectionUI() {
        // Reading type buttons
        autoSpreadBtn.addEventListener('click', () => {
            autoSpreadBtn.classList.add('active');
            chooseCardsBtn.classList.remove('active');
            selectCardsContainer.style.display = 'none';
            tarotContainer.innerHTML = '';
            tarotInterpretation.innerHTML = '';
        });
        
        chooseCardsBtn.addEventListener('click', () => {
            chooseCardsBtn.classList.add('active');
            autoSpreadBtn.classList.remove('active');
            selectCardsContainer.style.display = 'block';
            tarotContainer.innerHTML = '';
            tarotInterpretation.innerHTML = '';
            
            // Create cards for selection if not already done
            if (cardsSelection.children.length === 0) {
                createCardSelectionDeck();
            }
        });
        
        // Initially hide card selection
        selectCardsContainer.style.display = 'none';
        
        // Update text to reflect 5 card selection
        document.querySelector('#select-cards-container p').textContent = 'Seleziona 5 carte per la tua lettura';
        
        // Confirm selection button
        confirmSelectionBtn.addEventListener('click', () => {
            if (selectedCards.length === 5) {
                displaySelectedCards();
            } else {
                alert('Per favore, seleziona esattamente 5 carte.');
            }
        });
    }
    
    // Create deck for card selection
    function createCardSelectionDeck() {
        tarotCards.forEach((card, index) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'selection-card';
            cardEl.dataset.index = index;
            cardEl.innerHTML = `
                <div class="selection-card-inner">
                    <div class="selection-card-front"></div>
                    <div class="selection-card-back">
                        <h4>${card.name}</h4>
                        <p>${card.meaning}</p>
                    </div>
                </div>
            `;
            cardsSelection.appendChild(cardEl);
            
            cardEl.addEventListener('click', toggleCardSelection);
        });
    }
    
    // Toggle card selection
    function toggleCardSelection(e) {
        const card = e.currentTarget;
        const cardIndex = parseInt(card.dataset.index);
        
        if (card.classList.contains('selected')) {
            // Deselect card
            card.classList.remove('selected');
            card.classList.remove('flipped');
            selectedCards = selectedCards.filter(index => index !== cardIndex);
        } else if (selectedCards.length < 5) {
            // Select card
            card.classList.add('selected');
            card.classList.add('flipped');
            selectedCards.push(cardIndex);
        }
        
        // Update confirm button state
        confirmSelectionBtn.disabled = selectedCards.length !== 5;
    }

    function displaySelectedCards() {
        // Clear previous reading
        tarotContainer.innerHTML = '';
        
        // Get selected card data
        const selectedCardData = selectedCards.map(index => tarotCards[index]);
        
        // Create and add cards to the container with commentaries
        selectedCardData.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'tarot-card';
            cardElement.innerHTML = `
                <div class="tarot-card-front"></div>
                <div class="tarot-card-back">
                    <div class="card-title">${card.name}</div>
                    <div class="card-meaning">${card.meaning}</div>
                    <div class="card-position">${getCardPosition(index % 5)}</div>
                </div>
            `;
            tarotContainer.appendChild(cardElement);

            // Add flip animation with delay based on index
            setTimeout(() => {
                cardElement.classList.add('flipped');
            }, 500 + (index * 500));
        });

        // Generate tarot interpretation based on selected cards
        setTimeout(() => {
            // Use generateInterpretation from tarotData.js
            const interpretation = generateInterpretation(selectedCardData);
            
            // Generate detailed card commentaries
            let cardCommentaries = '<h4>Analisi dettagliata delle carte selezionate</h4>';
            
            selectedCardData.forEach((card, index) => {
                cardCommentaries += `
                    <div class="card-commentary">
                        <h5>${card.name} - ${getCardPosition(index % 5)}</h5>
                        <p>${getCardCommentary(card.name)}</p>
                    </div>
                `;
            });
            
            tarotInterpretation.innerHTML = `
                <h4>Interpretazione della Lettura</h4>
                <p>${interpretation}</p>
                ${cardCommentaries}
            `;
        }, 2500);
        
        // Hide selection container
        selectCardsContainer.style.display = 'none';
        
        // Reset selection
        selectedCards = [];
        const allSelectionCards = document.querySelectorAll('.selection-card');
        allSelectionCards.forEach(card => {
            card.classList.remove('selected');
            card.classList.remove('flipped');
        });
        confirmSelectionBtn.disabled = true;
    }

    function generateTarotReading() {
        // Clear previous reading
        tarotContainer.innerHTML = '';

        // Shuffle cards and pick 5
        const shuffledCards = [...tarotCards].sort(() => 0.5 - Math.random());
        const selectedCards = shuffledCards.slice(0, 5);

        // Create and add cards to the container
        selectedCards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'tarot-card';
            cardElement.innerHTML = `
                <div class="tarot-card-front"></div>
                <div class="tarot-card-back">
                    <div class="card-title">${card.name}</div>
                    <div class="card-meaning">${card.meaning}</div>
                    <div class="card-position">${getCardPosition(index)}</div>
                </div>
            `;
            tarotContainer.appendChild(cardElement);

            // Add flip animation with delay based on index
            setTimeout(() => {
                cardElement.classList.add('flipped');
            }, 500 + (index * 500));
        });

        // Generate tarot interpretation
        setTimeout(() => {
            // Generate overall interpretation
            const interpretation = generateInterpretation(selectedCards);
            
            // Add detailed commentaries for each selected card
            let cardCommentaries = '<h4>Analisi dettagliata delle carte</h4>';
            
            selectedCards.forEach((card, index) => {
                cardCommentaries += `
                    <div class="card-commentary">
                        <h5>${card.name} - ${getCardPosition(index)}</h5>
                        <p>${getCardCommentary(card.name)}</p>
                    </div>
                `;
            });
            
            tarotInterpretation.innerHTML = `
                <h4>Interpretazione della Lettura</h4>
                <p>${interpretation}</p>
                ${cardCommentaries}
            `;
        }, 2500);
    }

    function getCardPosition(index) {
        const positions = ["Passato", "Presente", "Futuro", "Influenza", "Risultato"];
        return positions[index];
    }

    function getCardCommentary(cardName) {
        const commentaries = {
            "Il Matto": "La tua energia e libertà sono pronte per essere esplorate. Sii aperto/a a nuove avventure e scoperte.",
            "Il Mago": "La tua determinazione e abilità sono fondamentali per raggiungere i tuoi obiettivi. Sii fiducioso/a e agisci con convinzione.",
            "La Papessa": "La tua intuizione è forte e ti guiderà nelle tue decisioni. Ascolta la tua voce interiore e segui il tuo istinto.",
            "L'Imperatrice": "La tua creatività e fertilità sono pronte per essere espresse. Prenditi cura di te stesso e della tua salute.",
            "L'Imperatore": "La tua autorità e leadership sono necessarie per guidare gli altri. Sii stabile e affidabile, ma non dimenticare di ascoltare gli altri.",
            "Il Papa": "La tua spiritualità e tradizione sono importanti per la tua crescita. Ricorda le tue credenze e valori, e applicali nella tua vita quotidiana.",
            "Gli Amanti": "Le tue relazioni sono al centro della tua attenzione. Sii aperto/a a nuove connessioni e comunicazioni.",
            "Il Carro": "La tua determinazione e volontà sono essenziali per raggiungere i tuoi obiettivi. Sii forte e deciso, ma non dimenticare di essere flessibile.",
            "La Forza": "La tua forza interiore e compassione sono fondamentali per superare le sfide. Sii gentile e comprensivo/a, ma non esitare a esprimere la tua forza quando necessario.",
            "L'Eremita": "La tua introspezione e solitudine sono necessarie per la tua crescita. Prenditi del tempo per riflettere e riscoprire te stesso.",
            "La Ruota della Fortuna": "I cambiamenti sono inevitabili, ma puoi controllare la tua reazione. Sii adattabile e aperto/a a nuove opportunità.",
            "La Giustizia": "La verità e l'equità sono fondamentali per le tue decisioni. Sii onesto/a e giusto/a, e non esitare a prendere decisioni difficili quando necessario.",
            "L'Appeso": "La tua attesa e prospettiva sono necessarie per la tua crescita. Sii paziente e aspetta il momento giusto per agire.",
            "La Morte": "La trasformazione e il rinnovamento sono necessari per la tua crescita. Sii aperto/a a nuove esperienze e non esitare a lasciare andare il passato.",
            "La Temperanza": "L'equilibrio e la moderazione sono essenziali per la tua armonia. Sii equilibrato/a e non esitare a cercare aiuto quando necessario.",
            "Il Diavolo": "La tua ossessione e dipendenza sono ostacoli per la tua crescita. Sii consapevole dei tuoi limiti e non esitare a cercare aiuto quando necessario.",
            "La Torre": "I cambiamenti improvvisi possono essere traumatici, ma possono anche essere opportunità. Sii adattabile e aperto/a a nuove esperienze.",
            "La Stella": "La tua speranza e ispirazione sono fondamentali per la tua crescita. Sii ottimista e non esitare a esprimere la tua creatività.",
            "La Luna": "La tua intuizione e istinto sono essenziali per navigare le sfide. Sii consapevole dei tuoi sentimenti e non esitare a seguire la tua voce interiore.",
            "Il Sole": "La tua positività e vitalità sono contagiose. Sii felice e non esitare a condividere la tua gioia con gli altri.",
            "Il Giudizio": "La tua riflessione e valutazione sono necessarie per la tua crescita. Sii onesto/a con te stesso e non esitare a prendere decisioni difficili quando necessario.",
            "Il Mondo": "Il completamento e la realizzazione sono i tuoi obiettivi. Sii determinato/a e non esitare a lavorare sodo per raggiungere i tuoi sogni."
        };
        return commentaries[cardName] || "La carta selezionata rappresenta una sfida o un'opportunità per la tua crescita. Sii aperto/a a nuove esperienze e non esitare a esprimere la tua creatività.";
    }

    function generateInterpretation(cards) {
        // Generate a unique interpretation based on the selected cards
        const pastCard = cards[0];
        const presentCard = cards[1];
        const futureCard = cards[2];
        const influenceCard = cards[3];
        const resultCard = cards[4];

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

        interpretation += `<br><br>Nel <strong>futuro</strong>, ${futureCard.name} indica che `;

        // Future interpretations
        if (["Il Matto", "Il Mago", "Il Carro", "Il Sole", "Il Mondo"].includes(futureCard.name)) {
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

        interpretation += `<br><br>L'<strong>influenza</strong> di ${influenceCard.name} suggerisce che `;

        // Influence interpretations
        if (["Il Matto", "Il Mago", "Il Carro"].includes(influenceCard.name)) {
            interpretation += "le tue azioni e decisioni saranno influenzate da un forte desiderio di indipendenza e libertà.";
        } else if (["La Papessa", "L'Eremita", "La Luna"].includes(influenceCard.name)) {
            interpretation += "la tua intuizione e il tuo istinto saranno fondamentali per guidare le tue scelte.";
        } else if (["L'Imperatrice", "L'Imperatore", "La Forza"].includes(influenceCard.name)) {
            interpretation += "le tue relazioni e la tua posizione nella società saranno influenzate da un forte senso di responsabilità e autorità.";
        } else if (["Gli Amanti", "La Temperanza", "La Stella"].includes(influenceCard.name)) {
            interpretation += "le tue relazioni saranno influenzate da un forte desiderio di armonia e connessione.";
        } else if (["La Torre", "La Morte", "Il Diavolo"].includes(influenceCard.name)) {
            interpretation += "le tue azioni e decisioni saranno influenzate da un forte desiderio di cambiamento e trasformazione.";
        } else {
            interpretation += "le tue scelte saranno influenzate da un forte senso di equilibrio e moderazione.";
        }

        interpretation += `<br><br>Il <strong>risultato</strong> di ${resultCard.name} indica che `;

        // Result interpretations
        if (["Il Matto", "Il Mago", "Il Carro", "Il Sole", "Il Mondo"].includes(resultCard.name)) {
            interpretation += "raggiungerai il successo e la realizzazione personale.";
        } else if (["La Papessa", "La Stella", "La Luna"].includes(resultCard.name)) {
            interpretation += "svilupperai una maggiore intuizione e comprensione spirituale.";
        } else if (["L'Imperatrice", "L'Imperatore", "La Forza", "La Giustizia"].includes(resultCard.name)) {
            interpretation += "guadagnerai stabilità e controllo nella tua vita.";
        } else if (["Gli Amanti", "La Temperanza", "Il Giudizio"].includes(resultCard.name)) {
            interpretation += "vivrai momenti di armonia e connessione profonda.";
        } else if (["La Torre", "La Morte", "Il Diavolo", "La Ruota della Fortuna"].includes(resultCard.name)) {
            interpretation += "affronterai trasformazioni necessarie per la tua crescita.";
        } else {
            interpretation += "incontrerai nuove opportunità e possibilità.";
        }

        interpretation += `<br><br>Ricorda che il futuro non è fisso, ma piuttosto un riflesso del tuo percorso attuale. Hai il potere di influenzare il tuo destino con le tue scelte e azioni.`;

        return interpretation;
    }

    function generateAstrologicalChart(birthDate, birthTime, birthPlace) {
        // Clear previous chart elements except the base circle
        const elementsToKeep = ["circle"];
        const allElements = astrologicalChart.querySelectorAll("*");

        allElements.forEach(element => {
            if (!elementsToKeep.includes(element.tagName.toLowerCase())) {
                element.remove();
            }
        });

        // Generate zodiac signs around the chart
        for (let i = 0; i < 12; i++) {
            const angle = (i * 30) - 90; // Start from top (270 degrees)
            const radians = angle * Math.PI / 180;
            const x = 150 + Math.cos(radians) * 128;
            const y = 150 + Math.sin(radians) * 128;

            // Add zodiac sign symbol
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", x);
            text.setAttribute("y", y);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "middle");
            text.setAttribute("fill", "#2c0549");
            text.setAttribute("font-size", "12");
            text.textContent = zodiacSigns[i];

            astrologicalChart.appendChild(text);

            // Add dividing lines for houses
            const lineX1 = 150 + Math.cos(radians) * 110;
            const lineY1 = 150 + Math.sin(radians) * 110;
            const lineX2 = 150 + Math.cos(radians) * 145;
            const lineY2 = 150 + Math.sin(radians) * 145;

            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", lineX1);
            line.setAttribute("y1", lineY1);
            line.setAttribute("x2", lineX2);
            line.setAttribute("y2", lineY2);
            line.setAttribute("stroke", "#e6c619");
            line.setAttribute("stroke-width", "1");

            astrologicalChart.appendChild(line);
        }

        // Add planetary symbols (simplified for demo)
        const planets = [
            { name: "Sole", symbol: "☉" },
            { name: "Luna", symbol: "☽" },
            { name: "Mercurio", symbol: "☿" },
            { name: "Venere", symbol: "♀" },
            { name: "Marte", symbol: "♂" },
            { name: "Giove", symbol: "♃" },
            { name: "Saturno", symbol: "♄" }
        ];

        // This is simplified - in a real app you'd calculate actual positions
        const birthDateObj = new Date(birthDate);
        const seed = birthDateObj.getDate() + birthDateObj.getMonth();

        planets.forEach((planet, index) => {
            // Random angle based on birth date (simplified)
            const angle = ((seed * 7 + index * 50) % 360) - 90;
            const radians = angle * Math.PI / 180;
            const distance = 70 + (index * 5); // Different distances from center
            const x = 150 + Math.cos(radians) * distance;
            const y = 150 + Math.sin(radians) * distance;

            // Add planet symbol
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", x);
            text.setAttribute("y", y);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "middle");
            text.setAttribute("fill", "#9b4dca");
            text.setAttribute("font-size", "14");
            text.setAttribute("font-weight", "bold");
            text.textContent = planet.symbol;

            astrologicalChart.appendChild(text);
        });

        // Generate chart interpretation
        const sunSign = getZodiacSign(birthDateObj);
        chartInterpretation.innerHTML = `
            <h4>La Tua Carta Astrale</h4>
            <p><strong>Segno Solare (personalità):</strong> ${sunSign}<br>
            <strong>Segno Lunare (emozioni):</strong> ${zodiacSigns[(seed + 3) % 12]}<br>
            <strong>Ascendente (come ti vedono gli altri):</strong> ${zodiacSigns[(seed + 7) % 12]}</p>
            <p>La tua carta astrale rivela una personalità ${getPersonalityTrait(sunSign)}. 
            Le tue emozioni sono influenzate dalla Luna in ${zodiacSigns[(seed + 3) % 12]}, che ti rende ${getEmotionalTrait(zodiacSigns[(seed + 3) % 12])}. 
            L'Ascendente in ${zodiacSigns[(seed + 7) % 12]} fa sì che gli altri ti percepiscano come una persona ${getAscendantTrait(zodiacSigns[(seed + 7) % 12])}.</p>
            <p>Nei prossimi mesi, con la posizione attuale dei pianeti, potresti vivere ${getFuturePrediction(sunSign)}.</p>
        `;
        generateDailyHoroscope(sunSign);
    }

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

    function getLuckyNumbers(sign) {
        const numbers = {
            "Ariete": [1, 9, 17, 25],
            "Toro": [2, 11, 20, 29],
            "Gemelli": [3, 12, 21, 30],
            "Cancro": [4, 13, 22, 31],
            "Leone": [5, 14, 23],
            "Vergine": [6, 15, 24],
            "Bilancia": [7, 16, 25],
            "Scorpione": [8, 17, 26],
            "Sagittario": [9, 18, 27],
            "Capricorno": [10, 19, 28],
            "Acquario": [11, 20],
            "Pesci": [12, 21]
        };
        return numbers[sign] || [1, 2, 3];
    }

    function generateDailyHoroscope(sign) {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('it-IT', options);
        
        const horoscopePhrases = {
            "Ariete": {
                love: ["Un incontro inaspettato potrebbe sorprenderti.", "Le relazioni sono al centro della tua giornata."],
                work: ["Nuove opportunità si presentano oggi.", "Concentrati sui tuoi obiettivi professionali."],
                general: ["Giornata di energia e dinamismo.", "Sarai particolarmente ispirativo/a oggi."]
            },
            "Toro": {
                love: ["La tua stabilità emotiva aiuterà le tue relazioni.", "Un nuovo interesse amoroso potrebbe nascere."],
                work: ["La tua determinazione sarà premiata.", "Sii paziente e attendi il momento giusto per agire."],
                general: ["Una giornata di grande stabilità e pragmatismo.", "Sii fedele a te stesso e ai tuoi valori."]
            },
            "Gemelli": {
                love: ["La comunicazione sarà la chiave per le tue relazioni.", "Sii aperto/a a nuove esperienze e persone."],
                work: ["La tua creatività e adattabilità saranno fondamentali.", "Cerca di bilanciare lavoro e divertimento."],
                general: ["Una giornata di grande curiosità e scoperta.", "Sii pronto/a a imparare e a esplorare nuove idee."]
            },
            "Cancro": {
                love: ["La tua sensibilità sarà un dono per le tue relazioni.", "Proteggi il tuo cuore, ma non aver paura di amare."],
                work: ["La tua intuizione sarà la tua guida.", "Sii paziente e ascolta il tuo istinto."],
                general: ["Una giornata di profonda connessione emotiva.", "Sii gentile con te stesso e con gli altri."]
            },
            "Leone": {
                love: ["La tua passionalità sarà contagiosa.", "Sii generoso/a e aperto/a alle nuove esperienze."],
                work: ["La tua creatività e fiducia in te stesso saranno essenziali.", "Mostra al mondo il tuo talento."],
                general: ["Una giornata di grande energia e positività.", "Sii il centro dell'attenzione, ma non dimenticare gli altri."]
            },
            "Vergine": {
                love: ["La tua analisi approfondita aiuterà le tue relazioni.", "Sii preciso/a e attento/a ai dettagli."],
                work: ["La tua meticolosità sarà la chiave del successo.", "Sii organizzato/a e pianifica con cura."],
                general: ["Una giornata di grande attenzione ai dettagli.", "Sii critico/a, ma non troppo."]
            },
            "Bilancia": {
                love: ["La tua diplomazia sarà fondamentale per le tue relazioni.", "Sii equilibrato/a e armonioso/a."],
                work: ["La tua capacità di mediare sarà essenziale.", "Cerca di trovare un equilibrio tra lavoro e vita privata."],
                general: ["Una giornata di grande armonia e equilibrio.", "Sii sociale e aperto/a alle nuove esperienze."]
            },
            "Scorpione": {
                love: ["La tua intensità sarà una forza per le tue relazioni.", "Sii profondo/a e autentico/a."],
                work: ["La tua determinazione sarà la tua guida.", "Sii perseverante e non arrenderti."],
                general: ["Una giornata di grande intensità e passionalità.", "Sii vero/a e non aver paura di mostrare i tuoi sentimenti."]
            },
            "Sagittario": {
                love: ["La tua ottimismo sarà contagioso.", "Sii aperto/a a nuove esperienze e persone."],
                work: ["La tua filosofia di vita sarà la tua guida.", "Sii entusiasta e ottimista, ma anche realista."],
                general: ["Una giornata di grande espansione e crescita.", "Sii avventuroso/a e non aver paura di esplorare nuovi orizzonti."]
            },
            "Capricorno": {
                love: ["La tua serietà e responsabilità saranno apprezzate.", "Sii stabile e affidabile."],
                work: ["La tua ambizione sarà la tua guida.", "Sii disciplinato/a e lavora sodo per raggiungere i tuoi obiettivi."],
                general: ["Una giornata di grande serietà e responsabilità.", "Sii organizzato/a e pianifica con cura."]
            },
            "Acquario": {
                love: ["La tua originalità sarà un dono per le tue relazioni.", "Sii innovativo/a e aperto/a alle nuove idee."],
                work: ["La tua umanità e compassione saranno essenziali.", "Sii sociale e impegnato/a per il bene comune."],
                general: ["Una giornata di grande innovazione e progresso.", "Sii indipendente e non aver paura di essere diverso/a."]
            },
            "Pesci": {
                love: ["La tua sensibilità e empatia saranno fondamentali per le tue relazioni.", "Sii gentile e comprensivo/a."],
                work: ["La tua creatività e intuizione saranno la tua guida.", "Sii aperto/a alle nuove esperienze e persone."],
                general: ["Una giornata di grande connessione spirituale.", "Sii sognatore/trice e non aver paura di esplorare nuovi mondi."]
            }
        };

        const dailyHoroscope = horoscopePhrases[sign] || {
            love: ["Giornata interessante in amore."],
            work: ["Opportunità da cogliere al volo."],
            general: ["Una giornata piena di sorprese positive."]
        };

        // Display sign icon and name
        const horoscopeSign = document.getElementById('horoscopeSign');
        horoscopeSign.innerHTML = `${getZodiacSymbol(sign)} ${sign} - ${formattedDate}`;

        const horoscopeContent = document.getElementById('horoscopeContent');
        horoscopeContent.innerHTML = `
            <div class="horoscope-section">
                <h4>Amore ❤️</h4>
                <p>${dailyHoroscope.love[Math.floor(Math.random() * dailyHoroscope.love.length)]}</p>
            </div>
            <div class="horoscope-section">
                <h4>Lavoro 💼</h4>
                <p>${dailyHoroscope.work[Math.floor(Math.random() * dailyHoroscope.work.length)]}</p>
            </div>
            <div class="horoscope-section">
                <h4>Generale ✨</h4>
                <p>${dailyHoroscope.general[Math.floor(Math.random() * dailyHoroscope.general.length)]}</p>
                <p>Consiglio del giorno: ${getDailyAdvice(sign)}</p>
            </div>
            <div class="horoscope-section">
                <h4>Numeri fortunati 🍀</h4>
                <p>${getLuckyNumbers(sign).join(' - ')}</p>
            </div>
        `;
    }

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
});