import { Story } from "@/types/game-modes";

export const stories: Story[] = [
  {
    id: "story1",
    title: "Uma Noite no Hotel Misterioso",
    description: "Uma aventura sensual em um hotel cheio de mistérios e surpresas.",
    startingPointId: "s1-start",
    category: "picante",
    storyPoints: [
      {
        id: "s1-start",
        text: "Vocês chegam a um hotel luxuoso e misterioso após receberem um convite anônimo. A recepcionista entrega uma chave dourada e um envelope selado com seus nomes.",
        mood: "mysterious",
        options: [
          {
            id: "s1-opt1",
            text: "Abrir o envelope ali mesmo",
            nextId: "s1-envelope",
          },
          {
            id: "s1-opt2",
            text: "Ir para o quarto antes de abrir",
            nextId: "s1-room",
          }
        ]
      },
      {
        id: "s1-envelope",
        text: "Vocês abrem o envelope e encontram um cartão que diz: 'Bem-vindos ao Hotel dos Desejos. Aqui, fantasias se tornam realidade. Vocês serão guiados por desafios que testarão a intimidade de vocês.'",
        mood: "mysterious",
        options: [
          {
            id: "s1-env-opt1",
            text: "Continuar para o quarto",
            nextId: "s1-room",
          },
          {
            id: "s1-env-opt2",
            text: "Perguntar mais informações na recepção",
            nextId: "s1-reception",
            challengeId: "p12",
            intensity: "picante"
          }
        ]
      },
      {
        id: "s1-reception",
        text: "A recepcionista sorri misteriosamente e diz: 'Tudo que precisa saber está no jogo. Confie nos seus instintos e siga seu desejo.' Ela aponta para o elevador.",
        mood: "mysterious",
        options: [
          {
            id: "s1-rec-opt1",
            text: "Ir para o quarto",
            nextId: "s1-room",
          }
        ]
      },
      {
        id: "s1-room",
        text: "O quarto é deslumbrante, com uma cama enorme, iluminação suave e uma vista incrível da cidade. Na mesa de cabeceira, há uma garrafa de champanhe, duas taças e outro envelope.",
        mood: "romantic",
        options: [
          {
            id: "s1-room-opt1",
            text: "Servir champanhe",
            nextId: "s1-champagne",
            challengeId: "p13",
            intensity: "picante"
          },
          {
            id: "s1-room-opt2",
            text: "Abrir o segundo envelope",
            nextId: "s1-envelope2",
          }
        ]
      },
      {
        id: "s1-champagne",
        text: "Vocês brindam à noite especial. A bebida tem um sabor delicioso e deixa um calor agradável pelo corpo. Ambos sentem uma conexão mais forte enquanto compartilham olhares cúmplices.",
        mood: "romantic",
        options: [
          {
            id: "s1-champ-opt1",
            text: "Abrir o segundo envelope",
            nextId: "s1-envelope2",
          },
          {
            id: "s1-champ-opt2",
            text: "Explorar o banheiro luxuoso",
            nextId: "s1-bathroom",
          }
        ]
      },
      {
        id: "s1-envelope2",
        text: "O segundo envelope contém um cartão que diz: 'Seu primeiro desafio: encontre a caixa escondida no quarto que contém um presente para vocês. Vocês têm 3 minutos.'",
        mood: "playful",
        options: [
          {
            id: "s1-env2-opt1",
            text: "Procurar debaixo da cama",
            nextId: "s1-under-bed",
          },
          {
            id: "s1-env2-opt2",
            text: "Verificar o armário",
            nextId: "s1-closet",
            challengeId: "p16",
            intensity: "picante"
          },
          {
            id: "s1-env2-opt3",
            text: "Olhar na varanda",
            nextId: "s1-balcony",
          }
        ]
      },
      {
        id: "s1-bathroom",
        text: "O banheiro é igualmente luxuoso, com uma banheira enorme. Vocês notam que já está cheia de água quente com pétalas de rosa e sais aromáticos. Ao lado, há uma pequena caixa com um cartão que diz 'Abra-me'.",
        mood: "romantic",
        options: [
          {
            id: "s1-bath-opt1",
            text: "Abrir a caixa",
            nextId: "s1-box-bath",
            challengeId: "sv9",
            intensity: "selvagem"
          },
          {
            id: "s1-bath-opt2",
            text: "Voltar ao quarto e abrir o envelope",
            nextId: "s1-envelope2",
          }
        ]
      },
      {
        id: "s1-under-bed",
        text: "Debaixo da cama, vocês encontram uma pequena caixa preta com um cadeado de combinação. Há uma nota: 'A combinação é a data de hoje'.",
        mood: "mysterious",
        options: [
          {
            id: "s1-bed-opt1",
            text: "Tentar abrir o cadeado",
            nextId: "s1-box-open",
            challengeId: "p18",
            intensity: "picante"
          }
        ]
      },
      {
        id: "s1-closet",
        text: "No armário, vocês encontram roupões de seda, mas nenhuma caixa. Porém, notam um botão discreto na parte de trás do armário.",
        mood: "mysterious",
        options: [
          {
            id: "s1-closet-opt1",
            text: "Pressionar o botão",
            nextId: "s1-secret-compartment",
          },
          {
            id: "s1-closet-opt2",
            text: "Procurar debaixo da cama",
            nextId: "s1-under-bed",
          }
        ]
      },
      {
        id: "s1-balcony",
        text: "Na varanda, vocês encontram uma mesa com frutas exóticas, chocolate derretido e um pequeno cartão que sugere alimentar um ao outro de forma sensual.",
        mood: "romantic",
        options: [
          {
            id: "s1-balc-opt1",
            text: "Desfrutar das frutas com chocolate",
            nextId: "s1-fruits",
            challengeId: "p19",
            intensity: "picante"
          },
          {
            id: "s1-balc-opt2",
            text: "Voltar ao quarto e continuar procurando",
            nextId: "s1-under-bed",
          }
        ]
      },
      {
        id: "s1-secret-compartment",
        text: "O botão revela um compartimento secreto com uma caixa vermelha e um terceiro envelope.",
        mood: "mysterious",
        options: [
          {
            id: "s1-sec-opt1",
            text: "Abrir a caixa vermelha",
            nextId: "s1-red-box",
            challengeId: "sv8",
            intensity: "selvagem"
          },
          {
            id: "s1-sec-opt2",
            text: "Abrir o terceiro envelope",
            nextId: "s1-envelope3",
          }
        ]
      },
      {
        id: "s1-fruits",
        text: "Vocês se divertem alimentando um ao outro com as frutas e chocolate, criando um momento íntimo e sensual. Enquanto isso, vocês notam uma caixa escondida sob a mesa da varanda.",
        mood: "romantic",
        options: [
          {
            id: "s1-fruits-opt1",
            text: "Abrir a caixa da varanda",
            nextId: "s1-box-balcony",
          }
        ]
      },
      {
        id: "s1-box-bath",
        text: "Dentro da caixa do banheiro, há óleos aromáticos para massagem e um convite para compartilhar um banho relaxante juntos.",
        mood: "romantic",
        options: [
          {
            id: "s1-boxb-opt1",
            text: "Aceitar o convite para o banho",
            nextId: "s1-bath-together",
            challengeId: "sv10",
            intensity: "selvagem"
          },
          {
            id: "s1-boxb-opt2",
            text: "Voltar ao quarto e continuar a história",
            nextId: "s1-envelope2",
          }
        ]
      },
      {
        id: "s1-box-open",
        text: "Vocês conseguem abrir o cadeado. Dentro da caixa, há vendas de seda, penas macias e um cartão que sugere um jogo sensorial.",
        mood: "playful",
        options: [
          {
            id: "s1-boxo-opt1",
            text: "Experimentar o jogo sensorial",
            nextId: "s1-sensory-game",
            challengeId: "sv7",
            intensity: "selvagem"
          },
          {
            id: "s1-boxo-opt2",
            text: "Continuar explorando o quarto",
            nextId: "s1-continue-exploring",
          }
        ]
      },
      {
        id: "s1-continue-exploring",
        text: "Enquanto continuam explorando, vocês encontram mais um envelope escondido sob os travesseiros.",
        mood: "mysterious",
        options: [
          {
            id: "s1-cont-opt1",
            text: "Abrir o envelope sob os travesseiros",
            nextId: "s1-envelope3",
          }
        ]
      },
      {
        id: "s1-red-box",
        text: "A caixa vermelha contém um conjunto de cartas com desafios íntimos e um timer para controlar o tempo de cada desafio.",
        mood: "playful",
        options: [
          {
            id: "s1-redb-opt1",
            text: "Começar a jogar com as cartas",
            nextId: "s1-card-game",
            challengeId: "sv13",
            intensity: "selvagem"
          },
          {
            id: "s1-redb-opt2",
            text: "Abrir o terceiro envelope",
            nextId: "s1-envelope3",
          }
        ]
      },
      {
        id: "s1-envelope3",
        text: "O terceiro envelope contém uma chave dourada e uma mensagem: 'Parabéns por chegarem até aqui. A chave dourada abre a porta para a suíte especial no último andar, onde a experiência completa os aguarda.'",
        mood: "mysterious",
        options: [
          {
            id: "s1-env3-opt1",
            text: "Ir para a suíte especial",
            nextId: "s1-special-suite",
          },
          {
            id: "s1-env3-opt2",
            text: "Ficar no quarto atual e continuar a intimidade",
            nextId: "s1-stay-current",
            challengeId: "e6",
            intensity: "extremo"
          }
        ]
      },
      {
        id: "s1-box-balcony",
        text: "Dentro da caixa da varanda, vocês encontram um controle remoto com instruções para ativar a banheira de hidromassagem no banheiro e aromas ambientes no quarto.",
        mood: "romantic",
        options: [
          {
            id: "s1-boxbal-opt1",
            text: "Ativar a banheira de hidromassagem",
            nextId: "s1-hot-tub",
            challengeId: "sv9",
            intensity: "selvagem"
          },
          {
            id: "s1-boxbal-opt2",
            text: "Voltar ao quarto e procurar mais pistas",
            nextId: "s1-continue-exploring",
          }
        ]
      },
      {
        id: "s1-sensory-game",
        text: "O jogo sensorial cria um momento de intensa conexão e descoberta entre vocês, explorando toques e sensações novas.",
        mood: "intense",
        options: [
          {
            id: "s1-sens-opt1",
            text: "Continuar a exploração do quarto",
            nextId: "s1-continue-exploring",
          }
        ]
      },
      {
        id: "s1-bath-together",
        text: "O banho compartilhado se torna um momento íntimo e relaxante. A tensão no ar é palpável enquanto vocês desfrutam da companhia um do outro na água quente e aromática.",
        mood: "romantic",
        options: [
          {
            id: "s1-batht-opt1",
            text: "Voltar ao quarto depois do banho",
            nextId: "s1-after-bath",
          }
        ]
      },
      {
        id: "s1-after-bath",
        text: "De volta ao quarto, envoltos nos roupões de seda, vocês percebem que um novo envelope apareceu na cama.",
        mood: "mysterious",
        options: [
          {
            id: "s1-afterb-opt1",
            text: "Abrir o novo envelope",
            nextId: "s1-envelope3",
          }
        ]
      },
      {
        id: "s1-card-game",
        text: "O jogo de cartas leva vocês por uma jornada de perguntas íntimas e pequenos desafios que aumentam gradualmente a tensão e a conexão entre vocês.",
        mood: "playful",
        options: [
          {
            id: "s1-cardg-opt1",
            text: "Continuar após o jogo de cartas",
            nextId: "s1-after-cards",
          }
        ]
      },
      {
        id: "s1-after-cards",
        text: "Após terminarem o jogo de cartas, vocês notam que um novo envelope apareceu misteriosamente na mesa.",
        mood: "mysterious",
        options: [
          {
            id: "s1-afterc-opt1",
            text: "Abrir o novo envelope",
            nextId: "s1-envelope3",
          }
        ]
      },
      {
        id: "s1-hot-tub",
        text: "A hidromassagem proporciona um momento de relaxamento e conexão, enquanto a atmosfera do quarto se torna cada vez mais íntima com os aromas ativados.",
        mood: "romantic",
        options: [
          {
            id: "s1-hott-opt1",
            text: "Retornar ao quarto após a hidromassagem",
            nextId: "s1-after-hot-tub",
          }
        ]
      },
      {
        id: "s1-after-hot-tub",
        text: "De volta ao quarto, vocês encontram um envelope dourado sobre a cama que não estava lá antes.",
        mood: "mysterious",
        options: [
          {
            id: "s1-afterh-opt1",
            text: "Abrir o envelope dourado",
            nextId: "s1-envelope3",
          }
        ]
      },
      {
        id: "s1-special-suite",
        text: "A suíte especial no último andar é ainda mais luxuosa, com uma vista panorâmica da cidade, uma cama circular enorme e um ambiente que parece saído de um sonho.",
        mood: "romantic",
        options: [
          {
            id: "s1-spec-opt1",
            text: "Explorar a nova suíte",
            nextId: "s1-explore-suite",
          },
          {
            id: "s1-spec-opt2",
            text: "Dirigir-se diretamente à cama",
            nextId: "s1-bed-suite",
            challengeId: "e6",
            intensity: "extremo"
          }
        ]
      },
      {
        id: "s1-explore-suite",
        text: "A suíte especial tem diversas surpresas, incluindo um bar privativo, um sistema de som ambiente e iluminação que pode ser controlada para criar diferentes atmosferas.",
        mood: "mysterious",
        options: [
          {
            id: "s1-exps-opt1",
            text: "Criar um ambiente romântico com luzes e música",
            nextId: "s1-romantic-setting",
            challengeId: "e7",
            intensity: "extremo"
          },
          {
            id: "s1-exps-opt2",
            text: "Verificar o que há no mini-bar",
            nextId: "s1-minibar",
          }
        ]
      },
      {
        id: "s1-minibar",
        text: "O mini-bar contém bebidas premium e, para sua surpresa, um livro com sugestões de jogos sensuais para casais.",
        mood: "playful",
        options: [
          {
            id: "s1-bar-opt1",
            text: "Escolher uma bebida e folhear o livro",
            nextId: "s1-book-games",
            challengeId: "e13",
            intensity: "extremo"
          },
          {
            id: "s1-bar-opt2",
            text: "Criar um ambiente romântico com luzes e música",
            nextId: "s1-romantic-setting",
          }
        ]
      },
      {
        id: "s1-romantic-setting",
        text: "Com a iluminação suave e a música perfeita, o ambiente se torna mágico. A tensão entre vocês é quase palpável.",
        mood: "romantic",
        options: [
          {
            id: "s1-rom-opt1",
            text: "Aproximar-se para um momento íntimo",
            nextId: "s1-intimate-moment",
            challengeId: "e14",
            intensity: "extremo"
          }
        ]
      },
      {
        id: "s1-bed-suite",
        text: "A cama circular é incrivelmente confortável e possui um painel de controle que ajusta sua posição e temperatura.",
        mood: "romantic",
        options: [
          {
            id: "s1-beds-opt1",
            text: "Explorar as funcionalidades da cama",
            nextId: "s1-bed-features",
          },
          {
            id: "s1-beds-opt2",
            text: "Convidar para um momento íntimo",
            nextId: "s1-intimate-moment",
            challengeId: "e8",
            intensity: "extremo"
          }
        ]
      },
      {
        id: "s1-bed-features",
        text: "Entre as funcionalidades da cama, vocês descobrem vibrações relaxantes, aquecimento personalizado e até mesmo um céu estrelado que pode ser projetado no teto.",
        mood: "romantic",
        options: [
          {
            id: "s1-bedf-opt1",
            text: "Ativar o céu estrelado e deitar-se juntos",
            nextId: "s1-starry-ceiling",
            challengeId: "e10",
            intensity: "extremo"
          }
        ]
      },
      {
        id: "s1-book-games",
        text: "O livro contém jogos que vão do leve ao intenso, todos projetados para aumentar a intimidade e a conexão entre casais.",
        mood: "playful",
        options: [
          {
            id: "s1-book-opt1",
            text: "Escolher um jogo mais suave",
            nextId: "s1-light-game",
            challengeId: "sv14",
            intensity: "selvagem"
          },
          {
            id: "s1-book-opt2",
            text: "Escolher um jogo mais intenso",
            nextId: "s1-intense-game",
            challengeId: "e7",
            intensity: "extremo"
          }
        ]
      },
      {
        id: "s1-light-game",
        text: "O jogo mais suave envolve massagens e carícias, criando um momento de conexão sensual e relaxante.",
        mood: "romantic",
        options: [
          {
            id: "s1-light-opt1",
            text: "Continuar a noite após o jogo",
            nextId: "s1-continue-night",
          }
        ]
      },
      {
        id: "s1-intense-game",
        text: "O jogo mais intenso desafia vocês a explorarem fantasias e desejos mais profundos, criando uma experiência inesquecível.",
        mood: "intense",
        options: [
          {
            id: "s1-int-opt1",
            text: "Continuar a noite após o jogo",
            nextId: "s1-continue-night",
          }
        ]
      },
      {
        id: "s1-intimate-moment",
        text: "Vocês compartilham um momento de intensa conexão e intimidade, explorando a paixão que cresce entre vocês.",
        mood: "intense",
        options: [
          {
            id: "s1-int-mom-opt1",
            text: "Continuar a noite juntos",
            nextId: "s1-continue-night",
          }
        ]
      },
      {
        id: "s1-starry-ceiling",
        text: "Sob o céu estrelado projetado, deitados na cama confortável, vocês compartilham segredos, desejos e carícias.",
        mood: "romantic",
        options: [
          {
            id: "s1-star-opt1",
            text: "Aprofundar o momento de intimidade",
            nextId: "s1-deepen-intimacy",
            challengeId: "e15",
            intensity: "extremo"
          }
        ]
      },
      {
        id: "s1-deepen-intimacy",
        text: "O momento de intimidade se aprofunda, levando vocês a uma conexão ainda mais intensa e significativa.",
        mood: "intense",
        options: [
          {
            id: "s1-deep-opt1",
            text: "Continuar a noite juntos",
            nextId: "s1-continue-night",
          }
        ]
      },
      {
        id: "s1-continue-night",
        text: "A noite continua, com vocês explorando todos os aspectos da suíte especial e da conexão entre vocês. A experiência no Hotel Misterioso se torna uma memória que vocês nunca esquecerão.",
        mood: "romantic",
        options: [
          {
            id: "s1-cont-n-opt1",
            text: "Concluir a história",
            nextId: "s1-conclusion",
          }
        ]
      },
      {
        id: "s1-stay-current",
        text: "Vocês decidem ficar no quarto atual, aproveitando a intimidade que já construíram e continuando a explorar a conexão entre vocês.",
        mood: "romantic",
        options: [
          {
            id: "s1-stay-opt1",
            text: "Aprofundar o momento juntos",
            nextId: "s1-deepen-current",
            challengeId: "e9",
            intensity: "extremo"
          }
        ]
      },
      {
        id: "s1-deepen-current",
        text: "O momento se aprofunda, com vocês descobrindo novos aspectos da conexão e intimidade entre vocês.",
        mood: "intense",
        options: [
          {
            id: "s1-deep-c-opt1",
            text: "Concluir a noite juntos",
            nextId: "s1-conclude-current",
          }
        ]
      },
      {
        id: "s1-conclude-current",
        text: "A noite no quarto atual se torna um momento especial e memorável, mesmo sem irem à suíte especial. Às vezes, o lugar não importa tanto quanto a companhia.",
        mood: "romantic",
        options: [
          {
            id: "s1-conc-c-opt1",
            text: "Concluir a história",
            nextId: "s1-conclusion",
          }
        ]
      },
      {
        id: "s1-conclusion",
        text: "A experiência no Hotel Misterioso foi uma jornada de descoberta e conexão mais profunda entre vocês. Momentos como esse fortalecem o vínculo e criam memórias que durarão para sempre.",
        mood: "romantic",
        options: [
          {
            id: "s1-final",
            text: "Retornar ao menu principal",
            nextId: "menu",
          }
        ]
      }
    ]
  }
];