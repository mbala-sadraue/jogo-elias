import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LanguageContextType = {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string, params?: Record<string, any>) => string;
};

type TranslationsType = {
  [key: string]: {
    [key: string]: string;
  };
};

// Inclua aqui todas as strings que precisam ser traduzidas
export const translations: TranslationsType = {
  // Traduções para o sistema de pontuação
  'player.level': {
    pt: 'Nível',
    en: 'Level',
    es: 'Nivel',
    ru: 'Уровень',
    fr: 'Niveau'
  },
  'player.points': {
    pt: 'Pontos',
    en: 'Points',
    es: 'Puntos',
    ru: 'Очки',
    fr: 'Points'
  },
  'player.levelProgress': {
    pt: 'do próximo nível',
    en: 'to next level',
    es: 'al siguiente nivel',
    ru: 'до следующего уровня',
    fr: 'au niveau suivant'
  },
  'player.pointsToNext': {
    pt: 'pontos restantes',
    en: 'points remaining',
    es: 'puntos restantes',
    ru: 'очков осталось',
    fr: 'points restants'
  },
  'player.questionsAnswered': {
    pt: 'Perguntas Respondidas',
    en: 'Questions Answered',
    es: 'Preguntas Respondidas',
    ru: 'Ответы на вопросы',
    fr: 'Questions Répondues'
  },
  'player.challengesCompleted': {
    pt: 'Desafios Completados',
    en: 'Challenges Completed',
    es: 'Desafíos Completados',
    ru: 'Выполненные задания',
    fr: 'Défis Terminés'
  },
  'player.achievements': {
    pt: 'Conquistas',
    en: 'Achievements',
    es: 'Logros',
    ru: 'Достижения',
    fr: 'Succès'
  },
  'buttons.showDetails': {
    pt: 'Mostrar detalhes',
    en: 'Show details',
    es: 'Mostrar detalles',
    ru: 'Показать детали',
    fr: 'Afficher les détails'
  },
  'buttons.hideDetails': {
    pt: 'Ocultar detalhes',
    en: 'Hide details',
    es: 'Ocultar detalles',
    ru: 'Скрыть детали',
    fr: 'Masquer les détails'
  },
  
  // Traduções para álbum de memórias
  'memory.albumTitle': {
    pt: 'Álbum de Memórias',
    en: 'Memory Album',
    es: 'Álbum de Memorias',
    ru: 'Альбом Воспоминаний',
    fr: 'Album de Souvenirs'
  },
  'memory.createNew': {
    pt: 'Criar Nova Memória',
    en: 'Create New Memory',
    es: 'Crear Nueva Memoria',
    ru: 'Создать Новое Воспоминание',
    fr: 'Créer un Nouveau Souvenir'
  },
  'memory.createTitle': {
    pt: 'Criar Nova Memória',
    en: 'Create New Memory',
    es: 'Crear Nueva Memoria',
    ru: 'Создать Новое Воспоминание',
    fr: 'Créer un Nouveau Souvenir'
  },
  'memory.title': {
    pt: 'Título',
    en: 'Title',
    es: 'Título',
    ru: 'Название',
    fr: 'Titre'
  },
  'memory.titlePlaceholder': {
    pt: 'Dê um título para esta memória...',
    en: 'Give this memory a title...',
    es: 'Da un título a esta memoria...',
    ru: 'Дайте название этому воспоминанию...',
    fr: 'Donnez un titre à ce souvenir...'
  },
  'memory.description': {
    pt: 'Descrição',
    en: 'Description',
    es: 'Descripción',
    ru: 'Описание',
    fr: 'Description'
  },
  'memory.descriptionPlaceholder': {
    pt: 'Descreva este momento especial...',
    en: 'Describe this special moment...',
    es: 'Describe este momento especial...',
    ru: 'Опишите этот особенный момент...',
    fr: 'Décrivez ce moment spécial...'
  },
  'memory.mood': {
    pt: 'Clima',
    en: 'Mood',
    es: 'Estado de ánimo',
    ru: 'Настроение',
    fr: 'Ambiance'
  },
  'memory.mood_romantic': {
    pt: 'Romântico',
    en: 'Romantic',
    es: 'Romántico',
    ru: 'Романтичный',
    fr: 'Romantique'
  },
  'memory.mood_funny': {
    pt: 'Divertido',
    en: 'Funny',
    es: 'Divertido',
    ru: 'Веселый',
    fr: 'Amusant'
  },
  'memory.mood_exciting': {
    pt: 'Excitante',
    en: 'Exciting',
    es: 'Emocionante',
    ru: 'Захватывающий',
    fr: 'Excitant'
  },
  'memory.mood_emotional': {
    pt: 'Emocional',
    en: 'Emotional',
    es: 'Emocional',
    ru: 'Эмоциональный',
    fr: 'Émouvant'
  },
  'memory.selectPlayers': {
    pt: 'Selecione os jogadores',
    en: 'Select players',
    es: 'Seleccionar jugadores',
    ru: 'Выберите игроков',
    fr: 'Sélectionner les joueurs'
  },
  'memory.relatedChallenge': {
    pt: 'Desafio relacionado',
    en: 'Related challenge',
    es: 'Desafío relacionado',
    ru: 'Связанное задание',
    fr: 'Défi associé'
  },
  'memory.noMemories': {
    pt: 'Ainda não há memórias. Crie sua primeira memória!',
    en: 'No memories yet. Create your first memory!',
    es: 'Aún no hay memorias. ¡Crea tu primera memoria!',
    ru: 'Пока нет воспоминаний. Создайте ваше первое воспоминание!',
    fr: 'Pas encore de souvenirs. Créez votre premier souvenir!'
  },
  
  // Traduções para teste de conexão
  'connection.title': {
    pt: 'Teste de Conexão Emocional',
    en: 'Emotional Connection Test',
    es: 'Prueba de Conexión Emocional',
    ru: 'Тест на Эмоциональную Связь',
    fr: 'Test de Connexion Émotionnelle'
  },
  'connection.question': {
    pt: 'Pergunta',
    en: 'Question',
    es: 'Pregunta',
    ru: 'Вопрос',
    fr: 'Question'
  },
  'connection.results': {
    pt: 'Resultados do Teste',
    en: 'Test Results',
    es: 'Resultados de la Prueba',
    ru: 'Результаты Теста',
    fr: 'Résultats du Test'
  },
  'connection.whatItMeans': {
    pt: 'O que isso significa?',
    en: 'What does this mean?',
    es: '¿Qué significa esto?',
    ru: 'Что это значит?',
    fr: 'Qu\'est-ce que cela signifie?'
  },
  'connection.explanation': {
    pt: 'Esta pontuação representa o nível de conexão emocional entre vocês. Quanto maior a pontuação, mais forte é a conexão.',
    en: 'This score represents the level of emotional connection between you. The higher the score, the stronger the connection.',
    es: 'Esta puntuación representa el nivel de conexión emocional entre ustedes. Cuanto mayor sea la puntuación, más fuerte será la conexión.',
    ru: 'Этот результат представляет уровень эмоциональной связи между вами. Чем выше балл, тем сильнее связь.',
    fr: 'Ce score représente le niveau de connexion émotionnelle entre vous. Plus le score est élevé, plus la connexion est forte.'
  },
  'connection.level1': {
    pt: 'Conexão Iniciante',
    en: 'Starter Connection',
    es: 'Conexión Inicial',
    ru: 'Начальная Связь',
    fr: 'Connexion Débutante'
  },
  'connection.level2': {
    pt: 'Conexão Moderada',
    en: 'Moderate Connection',
    es: 'Conexión Moderada',
    ru: 'Умеренная Связь',
    fr: 'Connexion Modérée'
  },
  'connection.level3': {
    pt: 'Boa Conexão',
    en: 'Good Connection',
    es: 'Buena Conexión',
    ru: 'Хорошая Связь',
    fr: 'Bonne Connexion'
  },
  'connection.level4': {
    pt: 'Conexão Excelente',
    en: 'Excellent Connection',
    es: 'Conexión Excelente',
    ru: 'Отличная Связь',
    fr: 'Excellente Connexion'
  },
  'connection.tips1': {
    pt: 'Vocês estão começando a se conectar. Dediquem mais tempo para conhecer as preferências, desejos e fantasias um do outro.',
    en: 'You are beginning to connect. Spend more time getting to know each other\'s preferences, desires, and fantasies.',
    es: 'Están comenzando a conectarse. Dediquen más tiempo a conocer las preferencias, deseos y fantasías del otro.',
    ru: 'Вы только начинаете общаться. Уделите больше времени тому, чтобы узнать предпочтения, желания и фантазии друг друга.',
    fr: 'Vous commencez à vous connecter. Consacrez plus de temps à connaître les préférences, les désirs et les fantasmes de l\'autre.'
  },
  'connection.tips2': {
    pt: 'Vocês têm uma base sólida. Experimentem novas experiências juntos para aprofundar sua conexão.',
    en: 'You have a solid foundation. Try new experiences together to deepen your connection.',
    es: 'Tienen una base sólida. Experimenten nuevas experiencias juntos para profundizar su conexión.',
    ru: 'У вас прочная основа. Попробуйте новые впечатления вместе, чтобы углубить свою связь.',
    fr: 'Vous avez une base solide. Essayez de nouvelles expériences ensemble pour approfondir votre connexion.'
  },
  'connection.tips3': {
    pt: 'Vocês têm uma ótima conexão! Continuem explorando e comunicando seus desejos abertamente.',
    en: 'You have a great connection! Keep exploring and communicating your desires openly.',
    es: '¡Tienen una gran conexión! Continúen explorando y comunicando sus deseos abiertamente.',
    ru: 'У вас отличная связь! Продолжайте исследовать и открыто сообщать о своих желаниях.',
    fr: 'Vous avez une excellente connexion! Continuez à explorer et à communiquer ouvertement vos désirs.'
  },
  'connection.tips4': {
    pt: 'Conexão extraordinária! Vocês estão verdadeiramente sincronizados e compartilham uma química rara.',
    en: 'Extraordinary connection! You are truly in sync and share a rare chemistry.',
    es: '¡Conexión extraordinaria! Están verdaderamente sincronizados y comparten una química rara.',
    ru: 'Необыкновенная связь! Вы действительно синхронизированы и разделяете редкую химию.',
    fr: 'Connexion extraordinaire! Vous êtes vraiment synchronisés et partagez une chimie rare.'
  },
  
  // Perguntas teste de conexão
  'connection.q1': {
    pt: 'Quão à vontade você se sente para expressar seus desejos ao seu parceiro?',
    en: 'How comfortable do you feel expressing your desires to your partner?',
    es: '¿Qué tan cómodo te sientes expresando tus deseos a tu pareja?',
    ru: 'Насколько комфортно вы себя чувствуете, выражая свои желания партнеру?',
    fr: 'À quel point vous sentez-vous à l\'aise pour exprimer vos désirs à votre partenaire?'
  },
  'connection.q1_a1': {
    pt: 'Não me sinto confortável compartilhando meus desejos',
    en: 'I don\'t feel comfortable sharing my desires',
    es: 'No me siento cómodo compartiendo mis deseos',
    ru: 'Я не чувствую себя комфортно, делясь своими желаниями',
    fr: 'Je ne me sens pas à l\'aise de partager mes désirs'
  },
  'connection.q1_a2': {
    pt: 'Compartilho apenas alguns desejos mais básicos',
    en: 'I share only some basic desires',
    es: 'Comparto solo algunos deseos más básicos',
    ru: 'Я делюсь только некоторыми основными желаниями',
    fr: 'Je ne partage que quelques désirs de base'
  },
  'connection.q1_a3': {
    pt: 'Compartilho a maioria dos meus desejos',
    en: 'I share most of my desires',
    es: 'Comparto la mayoría de mis deseos',
    ru: 'Я делюсь большинством своих желаний',
    fr: 'Je partage la plupart de mes désirs'
  },
  'connection.q1_a4': {
    pt: 'Compartilho abertamente todos os meus desejos',
    en: 'I openly share all my desires',
    es: 'Comparto abiertamente todos mis deseos',
    ru: 'Я открыто делюсь всеми своими желаниями',
    fr: 'Je partage ouvertement tous mes désirs'
  },
  'connection.q2': {
    pt: 'Quanto você sabe sobre as preferências e fantasias do seu parceiro?',
    en: 'How much do you know about your partner\'s preferences and fantasies?',
    es: '¿Cuánto sabes sobre las preferencias y fantasías de tu pareja?',
    ru: 'Как много вы знаете о предпочтениях и фантазиях вашего партнера?',
    fr: 'Que savez-vous des préférences et des fantasmes de votre partenaire?'
  },
  'connection.q2_a1': {
    pt: 'Sei muito pouco sobre suas preferências',
    en: 'I know very little about their preferences',
    es: 'Sé muy poco sobre sus preferencias',
    ru: 'Я очень мало знаю об их предпочтениях',
    fr: 'Je sais très peu de choses sur ses préférences'
  },
  'connection.q2_a2': {
    pt: 'Conheço algumas de suas preferências',
    en: 'I know some of their preferences',
    es: 'Conozco algunas de sus preferencias',
    ru: 'Я знаю некоторые из их предпочтений',
    fr: 'Je connais certaines de ses préférences'
  },
  'connection.q2_a3': {
    pt: 'Conheço a maioria de suas preferências',
    en: 'I know most of their preferences',
    es: 'Conozco la mayoría de sus preferencias',
    ru: 'Я знаю большинство их предпочтений',
    fr: 'Je connais la plupart de ses préférences'
  },
  'connection.q2_a4': {
    pt: 'Conheço praticamente todas as suas preferências',
    en: 'I know virtually all of their preferences',
    es: 'Conozco prácticamente todas sus preferencias',
    ru: 'Я знаю практически все их предпочтения',
    fr: 'Je connais pratiquement toutes ses préférences'
  },
  'game.title': {
    pt: 'ELONDA',
    en: 'ELONDA',
    es: 'ELONDA',
    ru: 'ЭЛОНДА',
    fr: 'ELONDA'
  },
  'setup.welcome': {
    pt: 'Bem-vindo ao Jogo de Casal Mais Picante!',
    en: 'Welcome to the Spiciest Couple Game!',
    es: '¡Bienvenido al Juego de Pareja Más Picante!',
    ru: 'Добро пожаловать в самую пикантную игру для пар!',
    fr: 'Bienvenue au Jeu de Couple le Plus Épicé!'
  },
  'intensity.level': {
    pt: 'Nível de Intensidade',
    en: 'Intensity Level',
    es: 'Nivel de Intensidad',
    ru: 'Уровень интенсивности',
    fr: 'Niveau d\'Intensité'
  },
  'intensity.suave': {
    pt: 'Suave',
    en: 'Mild',
    es: 'Suave',
    ru: 'Мягкий',
    fr: 'Doux'
  },
  'intensity.suave.description': {
    pt: 'Provocante, mas leve',
    en: 'Teasing, but light',
    es: 'Provocativo, pero ligero',
    ru: 'Дразнящий, но легкий',
    fr: 'Taquin, mais léger'
  },
  'intensity.picante': {
    pt: 'Picante',
    en: 'Spicy',
    es: 'Picante',
    ru: 'Острый',
    fr: 'Épicé'
  },
  'intensity.picante.description': {
    pt: 'Um pouco mais quente',
    en: 'A bit hotter',
    es: 'Un poco más caliente',
    ru: 'Немного горячее',
    fr: 'Un peu plus chaud'
  },
  'intensity.selvagem': {
    pt: 'Selvagem',
    en: 'Wild',
    es: 'Salvaje',
    ru: 'Дикий',
    fr: 'Sauvage'
  },
  'intensity.selvagem.description': {
    pt: 'Aventura e sensualidade',
    en: 'Adventure and sensuality',
    es: 'Aventura y sensualidad',
    ru: 'Приключения и чувственность',
    fr: 'Aventure et sensualité'
  },
  'intensity.extremo': {
    pt: 'Extremo',
    en: 'Extreme',
    es: 'Extremo',
    ru: 'Экстремальный',
    fr: 'Extrême'
  },
  'intensity.extremo.description': {
    pt: 'Sem limites',
    en: 'No limits',
    es: 'Sin límites',
    ru: 'Без ограничений',
    fr: 'Sans limites'
  },
  'relationship.type': {
    pt: 'Tipo de Relacionamento',
    en: 'Relationship Type',
    es: 'Tipo de Relación',
    ru: 'Тип отношений',
    fr: 'Type de Relation'
  },
  'relationship.hetero': {
    pt: 'Hétero',
    en: 'Straight',
    es: 'Hetero',
    ru: 'Гетеро',
    fr: 'Hétéro'
  },
  'relationship.lesbico': {
    pt: 'Lésbico',
    en: 'Lesbian',
    es: 'Lésbico',
    ru: 'Лесбийский',
    fr: 'Lesbien'
  },
  'relationship.gay': {
    pt: 'Gay',
    en: 'Gay',
    es: 'Gay',
    ru: 'Гей',
    fr: 'Gay'
  },
  'relationship.outro': {
    pt: 'Outro',
    en: 'Other',
    es: 'Otro',
    ru: 'Другое',
    fr: 'Autre'
  },
  'players.management': {
    pt: 'Gerenciamento de Jogadores',
    en: 'Player Management',
    es: 'Gestión de Jugadores',
    ru: 'Управление игроками',
    fr: 'Gestion des Joueurs'
  },
  'options.title': {
    pt: 'Opções de Jogo',
    en: 'Game Options',
    es: 'Opciones de Juego',
    ru: 'Параметры игры',
    fr: 'Options de Jeu'
  },
  'button.start': {
    pt: 'Iniciar Jogo',
    en: 'Start Game',
    es: 'Iniciar Juego',
    ru: 'Начать игру',
    fr: 'Commencer le Jeu'
  },
  'game.round': {
    pt: 'Rodada',
    en: 'Round',
    es: 'Ronda',
    ru: 'Раунд',
    fr: 'Tour'
  },
  'player.turn': {
    pt: 'Vez de',
    en: 'Turn of',
    es: 'Turno de',
    ru: 'Очередь',
    fr: 'Tour de'
  },
  'content.type': {
    pt: 'Escolha o tipo:',
    en: 'Choose type:',
    es: 'Elige el tipo:',
    ru: 'Выберите тип:',
    fr: 'Choisissez le type:'
  },
  'content.question': {
    pt: 'Pergunta',
    en: 'Question',
    es: 'Pregunta',
    ru: 'Вопрос',
    fr: 'Question'
  },
  'content.challenge': {
    pt: 'Desafio',
    en: 'Challenge',
    es: 'Desafío',
    ru: 'Вызов',
    fr: 'Défi'
  },
  'content.reward': {
    pt: 'Prêmio',
    en: 'Reward',
    es: 'Premio',
    ru: 'Награда',
    fr: 'Récompense'
  },
  'content.penalty': {
    pt: 'Penalidade',
    en: 'Penalty',
    es: 'Penalidad',
    ru: 'Штраф',
    fr: 'Pénalité'
  },
  'buttons.confirm': {
    pt: 'Confirmar',
    en: 'Confirm',
    es: 'Confirmar',
    ru: 'Подтвердить',
    fr: 'Confirmer'
  },
  'buttons.skip': {
    pt: 'Pular',
    en: 'Skip',
    es: 'Saltar',
    ru: 'Пропустить',
    fr: 'Passer'
  },
  'buttons.completed': {
    pt: 'Concluído',
    en: 'Completed',
    es: 'Completado',
    ru: 'Выполнено',
    fr: 'Terminé'
  },
  'game.back_to_normal_question': {
    pt: 'Voltar à Pergunta Normal',
    en: 'Back to Normal Question',
    es: 'Volver a Pregunta Normal',
    ru: 'Вернуться к обычному вопросу',
    fr: 'Retour à la Question Normale'
  },
  'game.reveal_forbidden_version': {
    pt: 'Revelar Versão Proibida',
    en: 'Reveal Forbidden Version',
    es: 'Revelar Versión Prohibida',
    ru: 'Показать запрещенную версию',
    fr: 'Révéler Version Interdite'
  },
  'game.challenge_in_pairs': {
    pt: 'Este desafio deve ser realizado em dupla',
    en: 'This challenge must be performed in pairs',
    es: 'Este desafío debe realizarse en pareja',
    ru: 'Это испытание нужно выполнять в паре',
    fr: 'Ce défi doit être réalisé en couple'
  },
  'game.spinning': {
    pt: 'Girando...',
    en: 'Spinning...',
    es: 'Girando...',
    ru: 'Вращение...',
    fr: 'Rotation en cours...'
  },
  'game.selected': {
    pt: 'Selecionado',
    en: 'Selected',
    es: 'Seleccionado',
    ru: 'Выбрано',
    fr: 'Sélectionné'
  },
  'content.or_challenge': {
    pt: 'Ou Desafio',
    en: 'Or Challenge',
    es: 'O Desafío',
    ru: 'Или Вызов',
    fr: 'Ou Défi'
  },
  'button.settings': {
    pt: 'Configurações',
    en: 'Settings',
    es: 'Configuración',
    ru: 'Настройки',
    fr: 'Paramètres'
  },
  'button.roulette': {
    pt: 'Roleta',
    en: 'Roulette',
    es: 'Ruleta',
    ru: 'Рулетка',
    fr: 'Roulette'
  },
  'roulette.title': {
    pt: 'Roleta Sensual',
    en: 'Sensual Roulette',
    es: 'Ruleta Sensual',
    ru: 'Чувственная рулетка',
    fr: 'Roulette Sensuelle'
  },
  'button.spin': {
    pt: 'Girar Roleta',
    en: 'Spin Roulette',
    es: 'Girar Ruleta',
    ru: 'Крутить рулетку',
    fr: 'Tourner la Roulette'
  },
  'challenge.skip': {
    pt: 'Pular',
    en: 'Skip',
    es: 'Saltar',
    ru: 'Пропустить',
    fr: 'Passer'
  },
  'challenge.complete': {
    pt: 'Completar',
    en: 'Complete',
    es: 'Completar',
    ru: 'Завершить',
    fr: 'Terminer'
  },
  'age.verification': {
    pt: 'Verificação de Idade',
    en: 'Age Verification',
    es: 'Verificación de Edad',
    ru: 'Проверка возраста',
    fr: 'Vérification d\'Âge'
  },
  'age.confirm': {
    pt: 'Confirmo que sou maior de 18 anos',
    en: 'I confirm that I am over 18 years old',
    es: 'Confirmo que soy mayor de 18 años',
    ru: 'Подтверждаю, что мне больше 18 лет',
    fr: 'Je confirme avoir plus de 18 ans'
  },
  'terms.accept': {
    pt: 'Aceitar',
    en: 'Accept',
    es: 'Aceptar',
    ru: 'Принять',
    fr: 'Accepter'
  },
  'player.default': {
    pt: 'Jogador',
    en: 'Player',
    es: 'Jugador',
    ru: 'Игрок',
    fr: 'Joueur'
  },
  'game.subtitle': {
    pt: 'Jogo Sensual para Casais',
    en: 'Sensual Game for Couples',
    es: 'Juego Sensual para Parejas',
    ru: 'Чувственная игра для пар',
    fr: 'Jeu Sensuel pour Couples'
  },
  'game.description': {
    pt: 'Configure o jogo de acordo com suas preferências e prepare-se para momentos inesquecíveis com seu parceiro(a).',
    en: 'Configure the game according to your preferences and get ready for unforgettable moments with your partner.',
    es: 'Configura el juego según tus preferencias y prepárate para momentos inolvidables con tu pareja.',
    ru: 'Настройте игру в соответствии с вашими предпочтениями и приготовьтесь к незабываемым моментам с вашим партнером.',
    fr: 'Configurez le jeu selon vos préférences et préparez-vous à des moments inoubliables avec votre partenaire.'
  },
  'age.description': {
    pt: 'Este aplicativo contém conteúdo adulto e é destinado apenas para pessoas com 18 anos ou mais.',
    en: 'This application contains adult content and is intended only for people aged 18 or over.',
    es: 'Esta aplicación contiene contenido para adultos y está destinada solo a personas mayores de 18 años.',
    ru: 'Это приложение содержит контент для взрослых и предназначено только для лиц старше 18 лет.',
    fr: 'Cette application contient du contenu pour adultes et est destinée uniquement aux personnes âgées de 18 ans ou plus.'
  },
  'terms.title': {
    pt: 'Termos de Uso',
    en: 'Terms of Use',
    es: 'Términos de Uso',
    ru: 'Условия использования',
    fr: 'Conditions d\'Utilisation'
  },
  'terms.introduction': {
    pt: 'Ao usar este aplicativo, você concorda com os seguintes termos:',
    en: 'By using this application, you agree to the following terms:',
    es: 'Al usar esta aplicación, aceptas los siguientes términos:',
    ru: 'Используя это приложение, вы соглашаетесь со следующими условиями:',
    fr: 'En utilisant cette application, vous acceptez les conditions suivantes:'
  },
  'terms.item1': {
    pt: 'Todo o conteúdo deste aplicativo é destinado apenas para entretenimento adulto entre parceiros consensuais.',
    en: 'All content in this application is intended only for adult entertainment between consenting partners.',
    es: 'Todo el contenido de esta aplicación está destinado solo al entretenimiento para adultos entre parejas consensuales.',
    ru: 'Весь контент в этом приложении предназначен только для развлечения взрослых между согласными партнерами.',
    fr: 'Tout le contenu de cette application est destiné uniquement au divertissement pour adultes entre partenaires consentants.'
  },
  'terms.item2': {
    pt: 'Você é responsável pelo uso adequado do conteúdo e atividades sugeridas pelo aplicativo.',
    en: 'You are responsible for the proper use of the content and activities suggested by the application.',
    es: 'Eres responsable del uso adecuado del contenido y las actividades sugeridas por la aplicación.',
    ru: 'Вы несете ответственность за надлежащее использование контента и действий, предлагаемых приложением.',
    fr: 'Vous êtes responsable de l\'utilisation appropriée du contenu et des activités suggérées par l\'application.'
  },
  'terms.item3': {
    pt: 'Não somos responsáveis por qualquer lesão, desconforto ou constrangimento que possa ocorrer durante o uso deste aplicativo.',
    en: 'We are not responsible for any injury, discomfort or embarrassment that may occur during the use of this application.',
    es: 'No somos responsables de ninguna lesión, incomodidad o vergüenza que pueda ocurrir durante el uso de esta aplicación.',
    ru: 'Мы не несем ответственности за любые травмы, дискомфорт или смущение, которые могут возникнуть во время использования этого приложения.',
    fr: 'Nous ne sommes pas responsables des blessures, de l\'inconfort ou de la gêne qui pourraient survenir lors de l\'utilisation de cette application.'
  },
  'terms.item4': {
    pt: 'Você concorda em usar este aplicativo de forma responsável e respeitando os limites e consentimento do(s) seu(s) parceiro(s).',
    en: 'You agree to use this application responsibly and respecting the limits and consent of your partner(s).',
    es: 'Aceptas usar esta aplicación de manera responsable y respetando los límites y el consentimiento de tu(s) pareja(s).',
    ru: 'Вы соглашаетесь использовать это приложение ответственно и уважать границы и согласие вашего партнера (партнеров).',
    fr: 'Vous acceptez d\'utiliser cette application de manière responsable et en respectant les limites et le consentement de votre ou vos partenaire(s).'
  },
  'terms.item5': {
    pt: 'Seus dados de jogo são armazenados apenas localmente no seu dispositivo.',
    en: 'Your game data is stored only locally on your device.',
    es: 'Los datos de tu juego se almacenan solo localmente en tu dispositivo.',
    ru: 'Ваши игровые данные хранятся только локально на вашем устройстве.',
    fr: 'Vos données de jeu sont stockées uniquement localement sur votre appareil.'
  },
  'players.title': {
    pt: 'Jogadores',
    en: 'Players',
    es: 'Jugadores',
    ru: 'Игроки',
    fr: 'Joueurs'
  },
  'players.nameInputPlaceholder': {
    pt: 'Nome do Jogador {number}',
    en: 'Player {number} Name',
    es: 'Nombre del Jugador {number}',
    ru: 'Имя Игрока {number}',
    fr: 'Nom du Joueur {number}'
  },
  'players.limitsButton': {
    pt: 'Limites',
    en: 'Limits',
    es: 'Límites',
    ru: 'Ограничения',
    fr: 'Limites'
  },
  'players.limitsTitle': {
    pt: 'Limites e preferências pessoais',
    en: 'Personal limits and preferences',
    es: 'Límites y preferencias personales',
    ru: 'Личные ограничения и предпочтения',
    fr: 'Limites et préférences personnelles'
  },
  'players.noFood': {
    pt: 'Sem desafios com comida',
    en: 'No food challenges',
    es: 'Sin desafíos con comida',
    ru: 'Без испытаний с едой',
    fr: 'Pas de défis avec nourriture'
  },
  'players.noAlcohol': {
    pt: 'Sem desafios com álcool',
    en: 'No alcohol challenges',
    es: 'Sin desafíos con alcohol',
    ru: 'Без испытаний с алкоголем',
    fr: 'Pas de défis avec alcool'
  },
  'players.noOutdoor': {
    pt: 'Sem desafios ao ar livre',
    en: 'No outdoor challenges',
    es: 'Sin desafíos al aire libre',
    ru: 'Без испытаний на открытом воздухе',
    fr: 'Pas de défis en extérieur'
  },
  'players.noClothing': {
    pt: 'Sem remover roupas',
    en: 'No removing clothes',
    es: 'Sin quitar ropa',
    ru: 'Без снятия одежды',
    fr: 'Pas de retrait de vêtements'
  },
  'players.otherLimits': {
    pt: 'Outros limites (opcional):',
    en: 'Other limits (optional):',
    es: 'Otros límites (opcional):',
    ru: 'Другие ограничения (по желанию):',
    fr: 'Autres limites (facultatif):'
  },
  'players.limitsPlaceholder': {
    pt: 'Descreva outros limites ou restrições pessoais...',
    en: 'Describe other personal limits or restrictions...',
    es: 'Describe otros límites o restricciones personales...',
    ru: 'Опишите другие личные ограничения или запреты...',
    fr: 'Décrivez d\'autres limites ou restrictions personnelles...'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState('pt');

  // Carrega o idioma salvo no localStorage ao iniciar
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Salva o idioma no localStorage quando mudar
  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Função para traduzir textos com suporte a parâmetros
  const t = (key: string, params?: Record<string, any>): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    let text = translations[key][currentLanguage] || translations[key]['pt'] || key;
    
    // Substituir parâmetros se fornecidos
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{${paramKey}}`, String(paramValue));
      });
    }
    
    return text;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  
  return context;
};