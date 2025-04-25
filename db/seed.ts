import { db } from "./index";
import * as schema from "@shared/schema";
import { eq, sql } from "drizzle-orm";

async function seed() {
  try {
    console.log("Seeding database...");
    
    // Seed categories
    console.log("Seeding categories...");
    
    // Check if categories already exist
    const existingCategories = await db.select({ name: schema.categories.name }).from(schema.categories);
    const existingCategoryNames = existingCategories.map(c => c.name);
    
    const categoriesToAdd = [
      {
        name: "suave",
        description: "Conexão emocional e romance",
        color: "#4CACBC",
        icon: "heart"
      },
      {
        name: "picante",
        description: "Esquente a relação",
        color: "#FF9B82",
        icon: "fire"
      },
      {
        name: "selvagem",
        description: "Aventuras excitantes",
        color: "#FF4B91",
        icon: "flame"
      },
      {
        name: "extremo",
        description: "Para casais ousados",
        color: "#9C2C77",
        icon: "smile"
      }
    ].filter(category => !existingCategoryNames.includes(category.name));
    
    if (categoriesToAdd.length > 0) {
      await db.insert(schema.categories).values(categoriesToAdd);
      console.log(`Added ${categoriesToAdd.length} categories`);
    } else {
      console.log("Categories already exist, skipping");
    }
    
    // Get the categories with their IDs
    const categories = await db.select().from(schema.categories);
    
    // Seed challenges
    console.log("Seeding challenges...");
    
    // Check if challenges already exist
    const existingChallengesCount = await db.select({ count: sql`count(*)` }).from(schema.challenges);
    const challengesExist = existingChallengesCount.length > 0 && Number(existingChallengesCount[0].count) > 0;
    
    if (!challengesExist) {
      // Create challenges for each category
      for (const category of categories) {
        const challengesData = getChallengesForCategory(category.name);
        
        if (challengesData.length > 0) {
          const challengesToInsert = challengesData.map(challenge => ({
            ...challenge,
            categoryId: category.id
          }));
          
          await db.insert(schema.challenges).values(challengesToInsert);
          console.log(`Added ${challengesToInsert.length} challenges for category ${category.name}`);
        }
      }
    } else {
      console.log("Challenges already exist, skipping");
    }
    
    console.log("Database seeding completed");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Helper function to get challenges for a specific category
function getChallengesForCategory(categoryName: string): Omit<schema.InsertChallenge, "categoryId">[] {
  switch (categoryName) {
    case "suave":
      return [
        {
          title: "Elogio Sincero",
          description: "Diga três coisas que você mais admira em seu parceiro(a), olhando nos olhos.",
          type: "Conversa",
          duration: "5 minutos",
          difficulty: 1
        },
        {
          title: "Memória Especial",
          description: "Compartilhe sua memória favorita que vocês têm juntos e por que ela é especial para você.",
          type: "Conversa",
          duration: "10 minutos",
          difficulty: 1
        },
        {
          title: "Momento Presente",
          description: "Tirem 10 minutos para ficarem de mãos dadas, sem celulares, apenas conversando sobre o dia de cada um.",
          type: "Conexão",
          duration: "10 minutos",
          difficulty: 1
        },
        {
          title: "Massagem Relaxante",
          description: "Faça uma massagem nas mãos ou nos pés do seu parceiro(a) por 5 minutos.",
          type: "Toque",
          duration: "5 minutos",
          difficulty: 2
        },
        {
          title: "Abraço Prolongado",
          description: "Abracem-se por 2 minutos completos, sentindo a respiração um do outro.",
          type: "Conexão",
          duration: "2 minutos",
          difficulty: 1
        },
        {
          title: "Playlist Romântica",
          description: "Criem juntos uma playlist com as músicas que marcaram a relação de vocês.",
          type: "Atividade",
          duration: "15 minutos",
          difficulty: 2
        },
        {
          title: "Carta de Amor",
          description: "Escreva um pequeno bilhete dizendo o que você ama no seu parceiro(a) e entregue para ele(a).",
          type: "Expressão",
          duration: "10 minutos",
          difficulty: 2
        },
        {
          title: "Jantar à Luz de Velas",
          description: "Preparem ou peçam um jantar e comam à luz de velas, sem distrações.",
          type: "Atividade",
          duration: "45 minutos",
          difficulty: 3
        },
        {
          title: "Planos Futuros",
          description: "Compartilhem três coisas que vocês gostariam de realizar juntos no próximo ano.",
          type: "Conversa",
          duration: "15 minutos",
          difficulty: 2
        },
        {
          title: "Dança Lenta",
          description: "Coloquem uma música romântica e dancem juntos, lentamente, por uma música inteira.",
          type: "Conexão",
          duration: "5 minutos",
          difficulty: 2
        }
      ];
    
    case "picante":
      return [
        {
          title: "Beijo Prolongado",
          description: "Beijem-se apaixonadamente por pelo menos 3 minutos sem interrupção.",
          type: "Conexão",
          duration: "3 minutos",
          difficulty: 2
        },
        {
          title: "Massagem Sensual",
          description: "Pegue um óleo ou loção e faça uma massagem relaxante no seu parceiro(a) por 10 minutos.",
          type: "Toque",
          duration: "10 minutos",
          difficulty: 3
        },
        {
          title: "Verdade Quente",
          description: "Conte para seu parceiro(a) uma fantasia que você nunca compartilhou antes.",
          type: "Conversa",
          duration: "5 minutos",
          difficulty: 3
        },
        {
          title: "Striptease Leve",
          description: "Faça um striptease sensual para seu parceiro(a) mantendo as peças íntimas.",
          type: "Performance",
          duration: "5 minutos",
          difficulty: 4
        },
        {
          title: "Vendas nos Olhos",
          description: "Vende os olhos do seu parceiro(a) e beije diferentes partes do corpo dele(a) por 5 minutos.",
          type: "Sensorial",
          duration: "5 minutos",
          difficulty: 3
        },
        {
          title: "Role Play Leve",
          description: "Escolham personagens simples e interpretem por 10 minutos (ex: estranhos se conhecendo).",
          type: "Atividade",
          duration: "10 minutos",
          difficulty: 4
        },
        {
          title: "Mensagens Provocantes",
          description: "Troquem mensagens picantes pelo celular estando na mesma sala por 10 minutos.",
          type: "Conversa",
          duration: "10 minutos",
          difficulty: 2
        },
        {
          title: "Descreva o Desejo",
          description: "Descreva em detalhes o que você gostaria de fazer com seu parceiro(a) depois do jogo.",
          type: "Conversa",
          duration: "5 minutos",
          difficulty: 3
        },
        {
          title: "Toque Proibido",
          description: "Toque todo o corpo do seu parceiro(a) por 5 minutos, exceto partes íntimas.",
          type: "Toque",
          duration: "5 minutos",
          difficulty: 3
        },
        {
          title: "Cinema Sensual",
          description: "Assistam juntos a uma cena romântica/sensual de algum filme e comentem o que gostaram.",
          type: "Atividade",
          duration: "10 minutos",
          difficulty: 2
        }
      ];
    
    case "selvagem":
      return [
        {
          title: "Gelo e Fogo",
          description: "Use cubos de gelo para massagear o corpo do seu parceiro(a) e depois aqueça com beijos.",
          type: "Sensorial",
          duration: "10 minutos",
          difficulty: 4
        },
        {
          title: "Dominação Consensual",
          description: "Decidam quem será dominante por 15 minutos, estabelecendo limites claros antes.",
          type: "Poder",
          duration: "15 minutos",
          difficulty: 4
        },
        {
          title: "Lugar Inusitado",
          description: "Troquem carícias em um lugar da casa que nunca utilizaram antes (não em público).",
          type: "Aventura",
          duration: "10 minutos",
          difficulty: 4
        },
        {
          title: "Posição Nova",
          description: "Pesquisem e experimentem uma posição que nunca tentaram antes.",
          type: "Experimentação",
          duration: "15 minutos",
          difficulty: 4
        },
        {
          title: "Brinquedo Novo",
          description: "Conversem sobre adquirir ou utilizem um brinquedo que nunca experimentaram antes.",
          type: "Experimentação",
          duration: "10 minutos",
          difficulty: 5
        },
        {
          title: "Proibido Falar",
          description: "Passem 10 minutos trocando carícias sem emitir nenhum som ou palavra.",
          type: "Sensorial",
          duration: "10 minutos",
          difficulty: 3
        },
        {
          title: "Foto Artística",
          description: "Tirem uma foto sensual juntos (para consumo próprio) que represente a conexão de vocês.",
          type: "Expressão",
          duration: "10 minutos",
          difficulty: 4
        },
        {
          title: "Jogo de Poder",
          description: "Um decide o que o outro deve fazer por 10 minutos (com consentimento mútuo).",
          type: "Poder",
          duration: "10 minutos",
          difficulty: 4
        },
        {
          title: "Prazer Dedicado",
          description: "Dedique-se exclusivamente ao prazer do seu parceiro(a) por 15 minutos.",
          type: "Conexão",
          duration: "15 minutos",
          difficulty: 3
        },
        {
          title: "Voyeurismo Consentido",
          description: "Um assiste o outro se tocando por 5 minutos sem interferir.",
          type: "Observação",
          duration: "5 minutos",
          difficulty: 5
        }
      ];
    
    case "extremo":
      return [
        {
          title: "Fantasia Realizada",
          description: "Realize uma fantasia específica que seu parceiro(a) sempre quis experimentar.",
          type: "Fantasia",
          duration: "20 minutos",
          difficulty: 5
        },
        {
          title: "Restrição Sensorial",
          description: "Usando vendas e/ou fones de ouvido, privem um dos sentidos e explorem os outros.",
          type: "Sensorial",
          duration: "15 minutos",
          difficulty: 5
        },
        {
          title: "Troca de Controle",
          description: "Um controla totalmente as ações por 20 minutos, depois inverte os papéis.",
          type: "Poder",
          duration: "40 minutos",
          difficulty: 5
        },
        {
          title: "Maratona Intensiva",
          description: "Tentem manter a intimidade por um período prolongado, alternando ritmos e intensidade.",
          type: "Resistência",
          duration: "30 minutos",
          difficulty: 5
        },
        {
          title: "Sexting Extremo",
          description: "Passem o dia trocando mensagens explícitas de desejo, culminando à noite.",
          type: "Comunicação",
          duration: "Todo o dia",
          difficulty: 4
        },
        {
          title: "Role Play Elaborado",
          description: "Criem uma fantasia completa com personagens, cenário e história para vivenciar.",
          type: "Fantasia",
          duration: "30 minutos",
          difficulty: 5
        },
        {
          title: "Experiência Tripla",
          description: "Integrem três elementos diferentes numa experiência: um brinquedo, uma posição nova e uma restrição sensorial.",
          type: "Combinação",
          duration: "20 minutos",
          difficulty: 5
        },
        {
          title: "Limite de Tempo",
          description: "Definam um limite de tempo curto e tentem maximizar o prazer nesse período.",
          type: "Desafio",
          duration: "15 minutos",
          difficulty: 4
        },
        {
          title: "Sem Restrições",
          description: "Passem 30 minutos realizando qualquer desejo que surja, sem julgamentos.",
          type: "Liberdade",
          duration: "30 minutos",
          difficulty: 5
        },
        {
          title: "Filmagem Privada",
          description: "Gravem um vídeo privado para assistirem depois (com consentimento mútuo e segurança digital).",
          type: "Registro",
          duration: "20 minutos",
          difficulty: 5
        }
      ];
    
    default:
      return [];
  }
}

seed();
