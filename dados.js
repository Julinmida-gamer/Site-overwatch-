"use strict";

/*
  DADOS DO SITE — Overwatch
  Fonte principal: overwatch.blizzard.com (roster com 54 heróis).
  Textos de história resumidos e reescritos em português para o trabalho.

  Formato de cada herói:
  { id, nome, funcao, sub, origem, resumo, historia, habilidades:[[nome, descrição],...], conferir? }
  - id = mesmo nome usado no endereço oficial (overwatch.blizzard.com/heroes/<id>)
  - a imagem de capa é lida de  imagens/herois/<id>.png
  - conferir:true = ficha resumida; vale revisar na página oficial.
*/

const HEROIS = [
  { id: "ana", nome: "Ana", funcao: "Suporte", sub: "Estratégia", origem: "Egito",
    resumo: "Atiradora veterana e médica de campo.",
    historia: "Ana Amari foi uma das fundadoras da Overwatch e comandou a unidade de elite que defendeu o Egito. Dada como morta após um confronto com Widowmaker, ela passou anos escondida. Voltou à ação quando percebeu que a organização precisava dela e hoje luta ao lado de antigos companheiros e de sua filha, Fareeha (Pharah).",
    habilidades: [["Rifle Biótico", "Cura aliados e causa dano a inimigos à distância."], ["Dardo Sonífero", "Faz um inimigo dormir por alguns segundos."], ["Granada Biótica", "Cura aliados e impede a cura dos inimigos atingidos."], ["Nano Reforço (suprema)", "Deixa um aliado mais forte e mais resistente."]] },

  { id: "anran", nome: "Anran", funcao: "Dano", sub: "Flanqueamento", origem: "Chengdu, China", conferir: false,
    resumo: "Prodígio da Faculdade do Fogo da Universidade Wuxing.",
    historia: "Anran Ye foi treinada desde criança em artes marciais e dança por pais muito exigentes. Formou-se no topo da turma na Faculdade do Fogo da Universidade Wuxing e protegeu o irmão mais novo, Wuyang, durante toda a vida. Durante o ataque da Null Sector a Chengdu, ela segurou os inimigos sozinha até o irmão chegar. A coragem dos dois chamou a atenção da Overwatch, que os convidou para a equipe.",
    habilidades: [["Leques Zhuque", "Leques que disparam projéteis de fogo."], ["Atiçar as Chamas", "Rajada de vento quente que amplia o dano de queimadura."], ["Chama Dançante", "Desvia de todo dano enquanto golpeia inimigos próximos e se cura."], ["Investida Infernal", "Avança contra os inimigos e causa dano."], ["Ascensão Vermelhão (suprema)", "Avança e explode, incendiando os inimigos instantaneamente."]] },

  { id: "ashe", nome: "Ashe", funcao: "Dano", sub: "Especialidade", origem: "Estados Unidos",
    resumo: "Líder da gangue Deadlock, famosa pela mira precisa.",
    historia: "Elizabeth Caledonia Ashe lidera a gangue Deadlock, que ganhou fama por assaltos ousados no Sudoeste dos Estados Unidos. Ela é inteligente, elegante e muito perigosa. Seu braço direito é o robô Bob, e o passado dela com Cassidy rende uma rivalidade antiga.",
    habilidades: [["A Víbora", "Rifle de disparo rápido com mira para tiros precisos."], ["Dinamite", "Explosivo que causa dano em área e incendeia."], ["Disparo Coach", "Tiro de curta distância que a impulsiona para trás."], ["B.O.B. (suprema)", "Invoca o robô Bob para combater ao lado dela."]] },

  { id: "baptiste", nome: "Baptiste", funcao: "Suporte", sub: "Sobrevivência", origem: "Haiti",
    resumo: "Médico de combate que protege a equipe com tecnologia.",
    historia: "Jean-Baptiste Augustin nasceu no Haiti e serviu como médico de combate. Depois de lutar em guerras que não escolheu, desertou para ajudar quem precisava de verdade. Hoje usa sua experiência para salvar vidas em vez de tirá-las.",
    habilidades: [["Canhão Biótico", "Dispara rajadas que curam aliados."], ["Matriz de Regeneração", "Libera uma área de cura contínua."], ["Campo de Imortalidade", "Aliados dentro do campo não podem ser eliminados."], ["Matriz de Amplificação (suprema)", "Dobra o efeito de projéteis que a atravessam."]] },

  { id: "bastion", nome: "Bastion", funcao: "Dano", sub: "Artilharia", origem: "Desconhecida",
    resumo: "Robô de combate que descobriu a natureza.",
    historia: "Bastion é um robô de guerra da época da Crise Ômnica. Depois de anos desativado, acordou em uma floresta, onde passou a se interessar por pássaros e pela natureza. Ele não entende bem os humanos, mas defende quem o trata com gentileza.",
    habilidades: [["Configuração: Assalto", "Metralhadora que causa muito dano, mas o deixa parado."], ["Configuração: Reconhecimento", "Anda e dispara como um herói comum."], ["Autorreparo", "Recupera a própria vida."], ["Configuração: Artilharia (suprema)", "Bombardeia uma área com projéteis explosivos."]] },

  { id: "brigitte", nome: "Brigitte", funcao: "Suporte", sub: "Sobrevivência", origem: "Suécia",
    resumo: "Engenheira e escudeira que protege seus aliados.",
    historia: "Brigitte Lindholm é filha de Torbjörn e foi escudeira de Reinhardt desde jovem. Cresceu entre oficinas de engenharia e acabou se tornando uma guerreira completa, que une conserto de armaduras com combate corpo a corpo.",
    habilidades: [["Mangual de Foguete", "Arma corpo a corpo de longo alcance."], ["Pacote de Reparos", "Lança um pacote de cura para aliados."], ["Escudo-Relâmpago", "Bloqueia ataques e avança contra os inimigos."], ["Reunir Forças (suprema)", "Aumenta a vida e cura aliados próximos."]] },

  { id: "cassidy", nome: "Cassidy", funcao: "Dano", sub: "Especialidade", origem: "Estados Unidos",
    resumo: "Pistoleiro de passado de fora da lei.",
    historia: "Cassidy (antes conhecido como McCree) foi membro da gangue Deadlock e entrou na Blackwatch para escapar da vida criminosa. Hoje é caçador de recompensas por conta própria, com um estilo clássico de velho oeste e um senso de justiça muito particular.",
    habilidades: [["Pacificador", "Revólver de tiro certeiro ou disparo rápido."], ["Granada Magnética", "Granada que gruda no alvo e causa dano."], ["Rolamento de Combate", "Rola para esquivar e recarregar a arma."], ["Pegar e Meter Bala (suprema)", "Marca vários inimigos e elimina todos eles."]] },

  { id: "dmon", nome: "D.Mon", funcao: "Tanque", sub: "Combate", origem: "Coreia do Sul", conferir: true,
    resumo: "Piloto de mecha do universo dos pilotos MEKA.",
    historia: "D.Mon é um dos pilotos de mecha do universo MEKA, o mesmo mundo de D.Va. Esta ficha é resumida: consulte a página oficial do herói para ver história e habilidades atualizadas.",
    habilidades: [["Habilidades", "Veja a lista atual de habilidades na página oficial do herói."]] },

  { id: "dva", nome: "D.Va", funcao: "Tanque", sub: "Combate", origem: "Coreia do Sul",
    resumo: "Ex-jogadora profissional que pilota um mecha.",
    historia: "Hana Song era uma jogadora profissional famosa antes de ser recrutada pelas forças militares MEKA da Coreia do Sul para combater ômnicos gigantes. Quando o mecha é destruído, ela segue em combate a pé, usando sua pistola.",
    habilidades: [["Canhões de Fusão", "Duas metralhadoras de curto alcance montadas no mecha."], ["Propulsores", "Voa e empurra inimigos."], ["Matriz de Defesa", "Absorve projéteis que vêm pela frente."], ["Autodestruição (suprema)", "Detona o mecha causando enorme dano em área."]] },

  { id: "domina", nome: "Domina", funcao: "Tanque", sub: "Robustez", origem: "Londres, Inglaterra / Utopea, Índia",
    resumo: "Negociadora da Vishkar que domina a luz sólida.",
    historia: "Vaira Singhania é neta do fundador da Vishkar Corporation e cresceu sob muita pressão para herdar a empresa. Perfeccionista e estrategista, chegou a vice-presidente da corporação. Nos bastidores, financia Vendetta e outros aliados em troca do direito de reconstruir comunidades devastadas pelos planos da Talon.",
    habilidades: [["Magnum de Fótons", "Feixe de médio alcance que termina em um tiro de grande impacto."], ["Matriz de Barreira", "Constrói uma barreira dividida em segmentos."], ["Repulsores Sônicos", "Empurram inimigos e os atordoam se baterem na parede."], ["Carga de Cristal", "Projeta um cristal explosivo que pode ser detonado."], ["Panóptico (suprema)", "Lança uma barreira de luz sólida que aprisiona inimigos."]] },

  { id: "doctrine", nome: "Doctrine", funcao: "Suporte", sub: "Sobrevivência", origem: "Watchpoint: Grímsvötn",
    resumo: "Cibernético que virou supervilão e usa drones que sugam vida.",
    historia: "Tamuka Yeukai, engenheiro cibernético, dedicou a vida a salvar o irmão doente, Tatenda. Quando a medicina falhou, criou drones que sugam a vida de outras pessoas e os usou em um campo de refugiados. Tatenda o denunciou e ele foi preso por décadas em Watchpoint: Grímsvötn, até ser libertado por Doomfist e seus aliados.",
    habilidades: [["Cetro Eterno", "Arma de médio alcance que cura aliados e fere inimigos."], ["Infundir", "Dá um efeito poderoso à próxima habilidade."], ["Drones Revigorantes", "Drones em um aliado dão velocidade de ataque e cura."], ["Impulso Velado", "Avanço horizontal com redução de dano."], ["Redenção (suprema)", "Enxame de drones que reduz a vida máxima dos inimigos e dá vida extra aos aliados."]] },

  { id: "doomfist", nome: "Doomfist", funcao: "Tanque", sub: "Incursão", origem: "Nigéria",
    resumo: "Lutador poderoso com uma manopla cibernética.",
    historia: "Akande Ogundimu herdou o título de Doomfist, símbolo de força e liderança dentro da Talon. Ele acredita que o conflito torna a humanidade mais forte e usa sua manopla para provar isso em combate.",
    habilidades: [["Canhão de Mão", "Dispara quatro tiros curtos de energia."], ["Soco Foguete", "Carrega e avança socando o primeiro inimigo."], ["Golpe Sísmico", "Salta e golpeia o chão, arremessando inimigos."], ["Gancho Ascendente", "Soco para cima que lança os inimigos para o alto."], ["Golpe Meteoro (suprema)", "Salta e cai em área com enorme dano."]] },

  { id: "echo", nome: "Echo", funcao: "Dano", sub: "Reconhecimento", origem: "Desconhecida",
    resumo: "Robô adaptável que copia características de outros heróis.",
    historia: "Echo é uma inteligência artificial criada pela Dra. Mina Liao, da Overwatch. Seu corpo robótico permite voar e aprender novas habilidades, e ela busca descobrir o que significa ser livre e ter propósito.",
    habilidades: [["Raios Focais", "Feixe que causa muito dano em alvos feridos."], ["Disparo Aderente", "Bombas que grudam nos inimigos."], ["Voo", "Voa por um curto período."], ["Duplicar (suprema)", "Assume a forma de um herói inimigo."]] },

  { id: "emre", nome: "Emre", funcao: "Dano", sub: "Especialidade", origem: "Istambul, Turquia / Roma, Itália",
    resumo: "Ex-agente da Overwatch controlado por uma força desconhecida.",
    historia: "Emre Sarioglu foi um estrategista admirado e o primeiro a entrar na equipe de ataque depois da Crise Ômnica. Cansado da corrupção, deixou a Overwatch. Anos depois, reapareceu como um ciborgue dominado por algo misterioso. Freja, sua amiga mais próxima, ficou ao lado dele na Talon para ajudá-lo a manter a humanidade.",
    habilidades: [["Rifle de Rajada Sintético", "Arma de três tiros, com mira para maior precisão."], ["Cibergranada", "Granada que explode logo após quicar."], ["Protocolo de Anulação (suprema)", "Transforma Emre em uma arma viva."], ["Sinais Alterados", "A regeneração começa mais cedo e restaura vida na hora."]] },

  { id: "freja", nome: "Freja", funcao: "Dano", sub: "Reconhecimento", origem: "Copenhague, Dinamarca",
    resumo: "Ex-agente de busca e salvamento que virou caçadora de recompensas.",
    historia: "Freja foi recrutada por Ana para a equipe de busca e resgate da Overwatch e era considerada a melhor rastreadora do mundo. Com a queda da organização, perdeu o rumo e passou a trabalhar como caçadora de recompensas sob o nome Gefn. Contratada por Maximilien, ela reencontrou Emre e decidiu permanecer ao lado dele na Talon.",
    habilidades: [["Tiro Bola", "Bola explosiva que prende o inimigo e puxa os próximos."], ["Investida Rápida", "Salta na direção em que se move e renova a Mira."], ["Mirar", "Diminui o ritmo para disparar um virote explosivo veloz."], ["Corrente de Ar", "Impulsiona Freja para cima com uma rajada de vento."]] },

  { id: "genji", nome: "Genji", funcao: "Dano", sub: "Flanqueamento", origem: "Japão",
    resumo: "Ninja ciborgue ágil, herdeiro do clã Shimada.",
    historia: "Genji Shimada foi gravemente ferido pelo próprio irmão, Hanzo, e salvo por Angela Ziegler, que o reconstruiu como ciborgue. Ele passou anos em busca de paz interior com a ajuda do mestre Zenyatta e hoje luta ao lado da Overwatch.",
    habilidades: [["Shurikens", "Dispara três estrelas ninja de uma vez."], ["Golpe Veloz", "Avança e atravessa inimigos."], ["Deflexão", "Rebate projéteis na direção de quem os lançou."], ["Lâmina do Dragão (suprema)", "Saca a espada e golpeia à queima-roupa."]] },

  { id: "hanzo", nome: "Hanzo", funcao: "Dano", sub: "Especialidade", origem: "Japão",
    resumo: "Arqueiro habilidoso da família Shimada.",
    historia: "Hanzo Shimada abandonou o clã depois de ferir o irmão Genji e viveu como mercenário por anos. Mais tarde, passou a buscar redenção e a reparar os erros do passado.",
    habilidades: [["Arco Tempestade", "Dispara flechas de longa distância."], ["Flecha Sônica", "Revela inimigos próximos através de paredes."], ["Flecha Dispersa", "A flecha se divide em várias ao ricochetear."], ["Dragões Gêmeos (suprema)", "Invoca dois dragões que atravessam o cenário."]] },

  { id: "hazard", nome: "Hazard", funcao: "Tanque", sub: "Combate", origem: "Desconhecida", conferir: true,
    resumo: "Combatente agressivo ligado ao grupo Phreaks.",
    historia: "Hazard é um lutador de estilo agressivo associado ao grupo Phreaks. Esta ficha é resumida: consulte a página oficial do herói para ver a história completa.",
    habilidades: [["Habilidades", "Veja a lista atual de habilidades na página oficial do herói."]] },

  { id: "illari", nome: "Illari", funcao: "Suporte", sub: "Estratégia", origem: "Peru",
    resumo: "Guerreira que usa tecnologia solar para apoiar sua equipe.",
    historia: "Illari é a defensora do povo inca moderno e usa a energia do sol para proteger a comunidade. Ela cresceu cuidando de seu vilarejo, e a luta pelo ambiente e pelas tradições do povo guia seus passos.",
    habilidades: [["Pilão Biótico", "Cura aliados próximos."], ["Raio Solar", "Dispara raios que ferem ou curam."], ["Turbilhão Solar", "Salta e pula, protegendo a equipe."], ["Sol Resplandecente (suprema)", "Lança um poderoso ataque solar."]] },

  { id: "jetpack-cat", nome: "Jetpack Cat", funcao: "Suporte", sub: "Sobrevivência", origem: "Desconhecida", conferir: true,
    resumo: "Gato que usa um equipamento de voo.",
    historia: "Jetpack Cat é um personagem felino com mochila de voo que se juntou ao elenco de suporte. Esta ficha é resumida: consulte a página oficial do herói para ver a história e as habilidades.",
    habilidades: [["Habilidades", "Veja a lista atual de habilidades na página oficial do herói."]] },

  { id: "junker-queen", nome: "Rainha Junker", funcao: "Tanque", sub: "Incursão", origem: "Austrália",
    resumo: "Líder guerreira de Junkertown.",
    historia: "Rainha Junker governa Junkertown depois de um golpe contra o antigo líder. Forte, carismática e brutal, ela impõe respeito entre os sucateiros do deserto australiano.",
    habilidades: [["Escopeta", "Arma de curto alcance."], ["Lâmina Serrilhada", "Lança uma lâmina que fere e puxa o inimigo."], ["Grito de Comando", "Aumenta a velocidade dela e dos aliados."], ["Carnificina", "Ataque em área de curto alcance."], ["Massacre (suprema)", "Avança e causa feridas em quem estiver no caminho."]] },

  { id: "junkrat", nome: "Junkrat", funcao: "Dano", sub: "Especialidade", origem: "Austrália",
    resumo: "Especialista em explosivos de comportamento imprevisível.",
    historia: "Junkrat vive nos desertos australianos e transformou a sucata do local em armas. Foi depois de uma explosão nuclear na região que ele e Roadhog fugiram de Junkertown e seguiram uma vida de crimes.",
    habilidades: [["Lança-Granadas", "Granadas que quicam e explodem."], ["Mina de Concussão", "Lança uma mina que arremessa os alvos pelo ar."], ["Armadilha de Aço", "Prende o inimigo no lugar."], ["Pneu Mortal (suprema)", "Dirige um pneu explosivo contra os inimigos."]] },

  { id: "juno", nome: "Juno", funcao: "Suporte", sub: "Estratégia", origem: "Marte",
    resumo: "Exploradora espacial que usa tecnologia avançada.",
    historia: "Juno é uma astronauta da colônia de Marte e uma das mais respeitadas pesquisadoras do planeta vermelho. Ela une exploração, ciência e coragem para proteger quem está ao seu lado.",
    habilidades: [["Torpedos Pulsantes", "Lança torpedos que ferem inimigos ou curam aliados."], ["Impulso Planante", "Desliza e dá velocidade a ela e aos aliados próximos."], ["Anel Hiper", "Cria um anel que acelera quem passa por ele."], ["Raio Orbital (suprema)", "Marca uma área e potencializa os aliados dentro dela."]] },

  { id: "kiriko", nome: "Kiriko", funcao: "Suporte", sub: "Sobrevivência", origem: "Japão",
    resumo: "Protetora espiritual que une tradição e tecnologia.",
    historia: "Kiriko Shimada é uma sacerdotisa e ninja de Kanezaka. Treinada desde cedo para proteger a cidade, usa ofudas e espíritos para curar aliados e confundir inimigos.",
    habilidades: [["Ofuda de Cura", "Lança talismãs que seguem e curam aliados."], ["Kunai", "Facas arremessadas com alto dano."], ["Passo da Raposa", "Teletransporta até um aliado."], ["Proteção Suzu", "Cura e protege aliados contra efeitos negativos."], ["Kitsune Rush (suprema)", "Aumenta a velocidade e o ritmo de ação dos aliados."]] },

  { id: "lifeweaver", nome: "Lifeweaver", funcao: "Suporte", sub: "Estratégia", origem: "Tailândia",
    resumo: "Cientista que domina a tecnologia de bioluz.",
    historia: "Niran Pruksamanee é um botânico e cientista tailandês que trabalha com tecnologia de bioluz. Idealista, acredita que a ciência deve servir ao bem-estar de todos e aproxima a natureza da tecnologia em tudo que cria.",
    habilidades: [["Lança-Pétalas", "Dispara pétalas que curam aliados."], ["Plataforma de Pétalas", "Cria uma plataforma que eleva aliados e objetos."], ["Abraço da Vida", "Puxa um aliado para longe do perigo."], ["Árvore da Vida (suprema)", "Cria uma árvore que cura e fortalece aliados."]] },

  { id: "lucio", nome: "Lúcio", funcao: "Suporte", sub: "Sobrevivência", origem: "Brasil",
    resumo: "DJ brasileiro que usa a música para ajudar a equipe.",
    historia: "Lúcio Correia dos Santos cresceu no Rio de Janeiro e usou a música como forma de resistência contra a empresa Vishkar, que dominava seu bairro. A luta o transformou em um herói conhecido, que usa o som para curar, acelerar e proteger as pessoas.",
    habilidades: [["Transição", "Alterna entre cura e aumento de velocidade."], ["Solta o Som", "Aumenta o efeito da música atual."], ["Onda Sonora", "Empurra inimigos para longe."], ["Barreira de Som (suprema)", "Cria vida extra para os aliados próximos."]] },

  { id: "mauga", nome: "Mauga", funcao: "Tanque", sub: "Incursão", origem: "Samoa",
    resumo: "Combatente de grande porte com duas metralhadoras.",
    historia: "Mauga é um dos chefes mais fortes da Talon, vindo da região de Samoa. Pesado e agressivo, enfrenta inimigos de frente e luta com um jeito despreocupado de quem gosta de combate.",
    habilidades: [["Canhões Incendiários", "Duas metralhadoras com efeito de fogo."], ["Investida", "Avança contra os inimigos."], ["Cardiofortalecer", "Fortalece os ataques e reduz o dano recebido."], ["Cage Fight (suprema)", "Cria uma gaiola em que ninguém escapa."]] },

  { id: "mei", nome: "Mei", funcao: "Dano", sub: "Especialidade", origem: "China",
    resumo: "Climatologista que usa tecnologia de gelo.",
    historia: "Mei-Ling Zhou é climatologista e integrou uma missão científica na Antártida. Depois de ficar congelada por anos, foi resgatada e voltou à ação, usando o equipamento de gelo para estudar o clima e proteger os amigos.",
    habilidades: [["Blaster Endotérmico", "Congela inimigos próximos ou dispara estalactites."], ["Criocongelamento", "Torna-se um bloco de gelo e se cura."], ["Muro de Gelo", "Cria uma barreira de gelo."], ["Nevasca (suprema)", "Provoca uma tempestade de gelo em área."]] },

  { id: "mercy", nome: "Mercy", funcao: "Suporte", sub: "Restauração", origem: "Zurique, Suíça",
    resumo: "Médica prodígio e defensora da paz.",
    historia: "Angela Ziegler ficou órfã por causa da Crise Ômnica e se tornou uma pioneira da nanomedicina. Entrou na Overwatch para salvar vidas em escala maior, mesmo discordando da abordagem militar da organização. Após a queda da Overwatch, passou anos ajudando vítimas de guerra e acabou voltando à equipe quando o mundo voltou a precisar dela.",
    habilidades: [["Bastão Caduceu", "Cura um aliado ou aumenta o dano dele."], ["Blaster Caduceu", "Arma automática."], ["Anjo da Guarda", "Voa até um aliado."], ["Ressurreição", "Revive um aliado caído."], ["Valquíria (suprema)", "Voa e potencializa as habilidades."]] },

  { id: "mizuki", nome: "Mizuki", funcao: "Suporte", sub: "Sobrevivência", origem: "Japão", conferir: true,
    resumo: "Heroína do elenco recente de Overwatch.",
    historia: "Mizuki é uma das heroínas mais recentes de suporte. Esta ficha é resumida: consulte a página oficial do herói para ver a história e as habilidades completas.",
    habilidades: [["Habilidades", "Veja a lista atual de habilidades na página oficial do herói."]] },

  { id: "moira", nome: "Moira", funcao: "Suporte", sub: "Restauração", origem: "Irlanda",
    resumo: "Cientista de métodos de modificação genética controversos.",
    historia: "Moira O'Deorain é uma geneticista irlandesa de métodos polêmicos. Ela trabalhou com a Blackwatch e, depois, com a Talon, em busca de respostas sobre a natureza da vida e da biologia.",
    habilidades: [["Agarre Biótico", "Cura aliados ou drena a vida dos inimigos."], ["Orbe Biótico", "Pode curar ou causar dano em área."], ["Dissipar", "Se teletransporta rapidamente."], ["Coalescência (suprema)", "Feixe que cura aliados e fere inimigos ao mesmo tempo."]] },

  { id: "orisa", nome: "Orisa", funcao: "Tanque", sub: "Robustez", origem: "Numbani, Nigéria",
    resumo: "Robô guardião criado para proteger Numbani.",
    historia: "Orisa foi construída pela jovem engenheira Efi Oladele a partir de peças de robôs de defesa. Seu objetivo é proteger a cidade de Numbani e aprender o que significa ser uma heroína.",
    habilidades: [["Canhão de Fusão", "Dispara projéteis de alta velocidade."], ["Dardo Energético", "Empurra ou interrompe adversários."], ["Barreira Fortificada", "Reduz dano e dá resistência."], ["Supercarga (suprema)", "Aumenta a velocidade e a resistência dos aliados."]] },

  { id: "pharah", nome: "Pharah", funcao: "Dano", sub: "Especialidade", origem: "Egito",
    resumo: "Soldado de armadura com propulsores.",
    historia: "Fareeha Amari é filha de Ana e cresceu ouvindo as histórias da Overwatch. Hoje é chefe de segurança da empresa Helix e usa o traje Raptora para proteger o céu e as pessoas.",
    habilidades: [["Lançador de Foguetes", "Dispara foguetes explosivos."], ["Propulsores", "Permitem voar por algum tempo."], ["Salva de Foguetes", "Dispara vários foguetes pequenos."], ["Barragem (suprema)", "Despeja uma saraivada de foguetes."]] },

  { id: "ramattra", nome: "Ramattra", funcao: "Tanque", sub: "Combate", origem: "Desconhecida",
    resumo: "Líder ômnico que luta pela liberdade do seu povo.",
    historia: "Ramattra é um ômnico monge que ajudou a fundar o movimento Shambali e depois se tornou líder da Null Sector, convencido de que humanos e ômnicos jamais viveriam em paz.",
    habilidades: [["Canhão de Vazio", "Dispara projéteis de energia escura."], ["Forma Nêmesis", "Muda o estilo de combate para o corpo a corpo."], ["Barreira de Vazio", "Cria um escudo à frente."], ["Aniquilação (suprema)", "Provoca devastação em área."]] },

  { id: "reaper", nome: "Reaper", funcao: "Dano", sub: "Flanqueamento", origem: "Estados Unidos",
    resumo: "Mercenário misterioso com duas espingardas.",
    historia: "Reaper é o apelido de Gabriel Reyes, ex-comandante da Blackwatch. Sua transformação em uma criatura capaz de se desmaterializar o deixou obcecado por vingança contra a Overwatch.",
    habilidades: [["Espingardas Hellfire", "Duas armas de curto alcance."], ["Forma Espectral", "Torna-se imune a dano por um tempo."], ["Passo das Sombras", "Teletransporta para outro lugar."], ["Chuva de Balas (suprema)", "Dispara em todas as direções."]] },

  { id: "reinhardt", nome: "Reinhardt", funcao: "Tanque", sub: "Combate", origem: "Alemanha",
    resumo: "Guerreiro honrado com armadura pesada.",
    historia: "Reinhardt Wilhelm é um veterano das guerras e um cavaleiro moderno, com valores de honra e coragem. Lutou ao lado de Ana, Jack e Gabriel, e hoje transmite sua experiência para novos heróis.",
    habilidades: [["Martelo de Foguete", "Ataque corpo a corpo de grande alcance."], ["Campo de Barreira", "Projeta um escudo frontal."], ["Carga", "Avança e empurra o primeiro inimigo."], ["Golpe Terrestre (suprema)", "Golpeia o chão e derruba inimigos."]] },

  { id: "roadhog", nome: "Roadhog", funcao: "Tanque", sub: "Combate", origem: "Austrália",
    resumo: "Combatente resistente conhecido por seu gancho.",
    historia: "Mako Rutledge é parceiro de Junkrat e o brutamontes do dueto. Sobreviveu à explosão que arruinou a região de Junkertown e agora procura apenas viver bem.",
    habilidades: [["Canhão de Sucata", "Dispara estilhaços que se espalham."], ["Gancho", "Puxa um adversário até ele."], ["Respirar Fundo", "Recupera vida."], ["Cano Aberto (suprema)", "Dispara uma rajada contínua."]] },

  { id: "shion", nome: "Shion", funcao: "Dano", sub: "Especialidade", origem: "Desconhecida", conferir: true,
    resumo: "Personagem do elenco recente de Overwatch.",
    historia: "Shion é uma das heroínas mais recentes do elenco de dano. Esta ficha é resumida: consulte a página oficial do herói para ver a história e as habilidades completas.",
    habilidades: [["Habilidades", "Veja a lista atual de habilidades na página oficial do herói."]] },

  { id: "sierra", nome: "Sierra", funcao: "Dano", sub: "Especialidade", origem: "Desconhecida", conferir: true,
    resumo: "Chefe de segurança da Helix (Sierra Turner Woods).",
    historia: "Sierra Turner Woods é a chefe de segurança da Helix. Ela enfrentou Emre e Freja quando os dois invadiram o Cofre Naughton, em Watchpoint: Grand Mesa. Esta ficha é resumida: consulte a página oficial para ver o restante da história.",
    habilidades: [["Habilidades", "Veja a lista atual de habilidades na página oficial do herói."]] },

  { id: "sigma", nome: "Sigma", funcao: "Tanque", sub: "Robustez", origem: "Países Baixos",
    resumo: "Astrofísico que manipula forças gravitacionais.",
    historia: "O doutor Siebren de Kuiper é um astrofísico holandês. Um experimento com um buraco negro mudou sua mente e lhe deu poderes gravitacionais. Hoje ele luta em busca de equilíbrio entre genialidade e loucura.",
    habilidades: [["Hiperesferas", "Disparam esferas que explodem."], ["Barreira Experimental", "Escudo que bloqueia projéteis."], ["Cinética", "Absorve projéteis e os converte em escudo."], ["Gravitação (suprema)", "Levanta inimigos e os lança ao chão."]] },

  { id: "sojourn", nome: "Sojourn", funcao: "Dano", sub: "Artilharia", origem: "Canadá",
    resumo: "Ex-comandante com implantes cibernéticos.",
    historia: "Vivian Chase, conhecida como Sojourn, foi capitã da Overwatch e se dedica a manter a ordem após a queda da organização. Sua experiência e sua prótese cibernética a tornam uma forte combatente.",
    habilidades: [["Canhão Elétrico", "Dispara rajadas rápidas ou um tiro carregado."], ["Disparo Disruptivo", "Cria uma área de dano e lentidão."], ["Patins Elétricos", "Desliza em alta velocidade."], ["Sobrecarga (suprema)", "Acumula energia para tiros potentes."]] },

  { id: "soldier-76", nome: "Soldado: 76", funcao: "Dano", sub: "Artilharia", origem: "Estados Unidos",
    resumo: "Combatente experiente que busca revelar uma conspiração.",
    historia: "Jack Morrison foi comandante da Overwatch e símbolo de uma geração. Dado como morto depois da explosão do quartel-general, voltou às sombras como o Soldado: 76, em busca da verdade sobre o fim da organização.",
    habilidades: [["Rifle de Pulso Pesado", "Arma automática de longo alcance."], ["Foguete Hélix", "Dispara um foguete explosivo."], ["Disparada", "Corre mais rápido."], ["Campo Biótico", "Cura os aliados e a si mesmo."], ["Mira Tática (suprema)", "Trava a mira em alvos."]] },

  { id: "sombra", nome: "Sombra", funcao: "Suporte", sub: "Estratégia", origem: "México",
    resumo: "Hacker especialista em infiltração e sabotagem.",
    historia: "Olivia Colomar nasceu no México e se tornou uma das maiores hackers do mundo. Ao descobrir uma conspiração, passou a trabalhar com a Talon e a vigiar todos. Atualmente atua como suporte, com habilidades de hackeamento e invisibilidade.",
    habilidades: [["Máquina Pistola", "Arma automática de curto alcance."], ["Hackear", "Desativa as habilidades de um inimigo."], ["Translocador", "Lança um dispositivo e teletransporta até ele."], ["Camuflagem Térmica", "Fica invisível."], ["EMP (suprema)", "Hackeia todos os inimigos ao alcance."]] },

  { id: "symmetra", nome: "Symmetra", funcao: "Dano", sub: "Especialidade", origem: "Índia",
    resumo: "Arquiteta que cria construções de luz sólida.",
    historia: "Satya Vaswani trabalhou como arquiteta na Vishkar Corporation, acreditando em um mundo ordenado. Ao descobrir métodos cruéis da empresa, mudou de lado e passou a usar a luz sólida para proteger comunidades.",
    habilidades: [["Projetor de Fótons", "Feixe que causa dano crescente."], ["Torre Sentinela", "Instala torres que atiram automaticamente."], ["Barreira Fotônica", "Cria uma barreira de luz."], ["Teletransportador (suprema)", "Cria um teletransportador para a equipe."]] },

  { id: "torbjorn", nome: "Torbjörn", funcao: "Dano", sub: "Especialidade", origem: "Suécia",
    resumo: "Engenheiro especializado em armas e construções.",
    historia: "Torbjörn Lindholm é um engenheiro sueco brilhante e um dos primeiros membros da Overwatch. Pai de Brigitte, é conhecido pelo temperamento e pelas torres que constrói.",
    habilidades: [["Arma de Rebite", "Dispara rebites ou fundição de metal."], ["Torreta", "Instala uma torreta automática."], ["Pacote de Armadura", "Dá armadura aos aliados."], ["Núcleo Fundido (suprema)", "Aumenta o poder de fogo e a resistência."]] },

  { id: "tracer", nome: "Tracer", funcao: "Dano", sub: "Flanqueamento", origem: "Reino Unido",
    resumo: "Aventureira que se move no tempo.",
    historia: "Lena Oxton era uma piloto prodígio da Overwatch que sofreu um acidente em um experimento de teletransporte. Ela ficou presa no tempo até ser estabilizada por um acelerador cronal e, desde então, luta com humor e ousadia.",
    habilidades: [["Pistolas de Pulso", "Duas pistolas rápidas de curto alcance."], ["Translação", "Teletransporta alguns metros à frente."], ["Recordar", "Volta no tempo e recupera a vida."], ["Bomba de Pulso (suprema)", "Lança uma bomba que gruda no alvo."]] },

  { id: "vendetta", nome: "Vendetta", funcao: "Dano", sub: "Flanqueamento", origem: "Roma, Itália",
    resumo: "Campeã do Colosseo que busca recuperar o império de sua família.",
    historia: "Marzia Bartalotti, filha do chefão da Talon, perdeu seu lugar quando o pai foi morto pela Blackwatch. Treinou até se tornar a gladiadora Vendetta, campeã do Colosseo, e passou a construir uma rede de aliados poderosos. Hoje lidera a Talon e quer reconstruir o império do pai.",
    habilidades: [["Presa Palatina", "Espada de luz sólida com golpes combinados."], ["Postura de Defesa", "Bloqueia o dano frontal e defende golpes."], ["Investida Redemoinho", "Avança em um golpe circular."], ["Corte Planante", "Lança a espada e voa até ela."], ["Lâmina Destruidora (suprema)", "Corta quase qualquer defesa."]] },

  { id: "venture", nome: "Venture", funcao: "Dano", sub: "Flanqueamento", origem: "Canadá",
    resumo: "Arqueóloga e aventureira com uma broca tecnológica.",
    historia: "Sirin Fuangthong, a Venture, é uma arqueóloga que viaja pelo mundo atrás de relíquias antigas. Usa uma broca e escavação para se mover pelo subsolo.",
    habilidades: [["Carabina Inteligente", "Dispara com precisão."], ["Escavação", "Permite se mover pelo subsolo."], ["Broca de Impacto", "Avança com a broca para causar dano."], ["Tectônico (suprema)", "Provoca um forte tremor."]] },

  { id: "widowmaker", nome: "Widowmaker", funcao: "Dano", sub: "Reconhecimento", origem: "França",
    resumo: "Atiradora de elite da Talon.",
    historia: "Amélie Lacroix era uma bailarina casada com um agente da Overwatch. Foi sequestrada e condicionada pela Talon a ser uma assassina impiedosa, e hoje atua como Widowmaker.",
    habilidades: [["Beijo da Viúva", "Rifle de precisão com mira."], ["Gancho de Arpéu", "Ajuda a chegar em lugares altos."], ["Mina Venenosa", "Cria uma mina de veneno."], ["Infravisão (suprema)", "Revela inimigos através das paredes."]] },

  { id: "winston", nome: "Winston", funcao: "Tanque", sub: "Incursão", origem: "Colônia Lunar Horizon",
    resumo: "Gorila geneticamente aprimorado e cientista brilhante.",
    historia: "Winston nasceu na base lunar Horizon e foi parte de um projeto científico. Quando a equipe foi atacada, fugiu para a Terra e se juntou à Overwatch. Foi ele quem chamou os antigos agentes de volta durante o Chamado.",
    habilidades: [["Canhão de Tesla", "Emite uma descarga de eletricidade."], ["Salto de Jato", "Salta para longe e cai em área."], ["Projetor de Barreira", "Cria uma cúpula de proteção."], ["Fúria Primal (suprema)", "Ataca com força e agilidade."]] },

  { id: "wrecking-ball", nome: "Wrecking Ball", funcao: "Tanque", sub: "Incursão", origem: "Colônia Lunar Horizon",
    resumo: "Hamster pilota um robô esférico de combate.",
    historia: "Hammond é um hamster que escapou da colônia lunar Horizon e foi viver em Junkertown. Lá, construiu seu robô esférico e entrou na arena de combate, onde se tornou campeão.",
    habilidades: [["Canhões Quad", "Disparam projéteis em sequência."], ["Garra de Agarrar", "Balança pelo cenário e ganha velocidade."], ["Rolamento", "Vira uma esfera e passa por inimigos."], ["Campo Minado (suprema)", "Cria minas em área."]] },

  { id: "wuyang", nome: "Wuyang", funcao: "Suporte", sub: "Sobrevivência", origem: "China", conferir: true,
    resumo: "Irmão mais novo de Anran, da Faculdade da Água de Wuxing.",
    historia: "Wuyang é o irmão três anos mais novo de Anran e estudou na Faculdade da Água da Universidade Wuxing. Ao lado da irmã, ajudou a defender Chengdu do ataque da Null Sector e foi convidado pela Overwatch. Esta ficha é resumida: consulte a página oficial para ver as habilidades.",
    habilidades: [["Habilidades", "Veja a lista atual de habilidades na página oficial do herói."]] },

  { id: "zarya", nome: "Zarya", funcao: "Tanque", sub: "Robustez", origem: "Rússia",
    resumo: "Soldado que usa partículas de energia para proteger aliados.",
    historia: "Aleksandra Zaryanova foi atleta de força antes de se tornar soldado. Defende a Rússia e acredita que a força serve para proteger quem não pode lutar.",
    habilidades: [["Canhão de Partículas", "Feixe de energia ou projétil explosivo."], ["Barreira de Partículas", "Escudo em si mesma que fortalece o canhão."], ["Barreira de Projeção", "Escudo em um aliado."], ["Graviton (suprema)", "Puxa todos os inimigos para um ponto."]] },

  { id: "zenyatta", nome: "Zenyatta", funcao: "Suporte", sub: "Estratégia", origem: "Nepal",
    resumo: "Monge ômnico que busca harmonia entre humanos e ômnicos.",
    historia: "Zenyatta é um ômnico do mosteiro Shambali, no Nepal, e prega a paz entre humanos e máquinas. Ele ajuda a quem busca equilíbrio, como Genji.",
    habilidades: [["Orbe da Destruição", "Dispara orbes de dano."], ["Orbe da Harmonia", "Cura um aliado."], ["Orbe da Discórdia", "Aumenta a vulnerabilidade do alvo."], ["Transcendência (suprema)", "Cura aliados e o deixa invulnerável."]] }
];

/*
  MAPAS — formato: { id, nome, modo, local, descricao }
  Modos: Controle, Escolta, Híbrido, Empurrar, Ponto de Ignição, Confronto.
  A lista muda a cada temporada: confira no site oficial.
*/
const MAPAS = [
  { id: "antarctic-peninsula", nome: "Península Antártica", modo: "Controle", local: "Antártida", descricao: "Base de pesquisa gelada, onde Mei trabalhou." },
  { id: "busan", nome: "Busan", modo: "Controle", local: "Coreia do Sul", descricao: "Cidade portuária que mistura templos antigos e áreas urbanas." },
  { id: "ilios", nome: "Ilios", modo: "Controle", local: "Grécia", descricao: "Ilha de ruínas e vilarejos à beira-mar no Mediterrâneo." },
  { id: "lijiang-tower", nome: "Torre de Lijiang", modo: "Controle", local: "China", descricao: "Torre de negócios, mercado noturno e jardins." },
  { id: "nepal", nome: "Nepal", modo: "Controle", local: "Nepal", descricao: "Vilarejo montanhoso e santuário do mosteiro Shambali." },
  { id: "oasis", nome: "Oásis", modo: "Controle", local: "Iraque", descricao: "Cidade futurista construída no deserto." },
  { id: "samoa", nome: "Samoa", modo: "Controle", local: "Samoa", descricao: "Ilha tropical com praias, vilarejos e a casa de Mauga." },
  { id: "circuit-royal", nome: "Circuito Real", modo: "Escolta", local: "Mônaco", descricao: "Circuito de corrida urbano em Monte Carlo." },
  { id: "dorado", nome: "Dorado", modo: "Escolta", local: "México", descricao: "Cidade mexicana de ruas de pedra e praças." },
  { id: "havana", nome: "Havana", modo: "Escolta", local: "Cuba", descricao: "Capital cubana, com ruas coloridas e avenidas à beira-mar." },
  { id: "junkertown", nome: "Junkertown", modo: "Escolta", local: "Austrália", descricao: "Cidade de sucateiros no meio do deserto." },
  { id: "rialto", nome: "Rialto", modo: "Escolta", local: "Itália", descricao: "Canais, pontes e ruas estreitas de Veneza." },
  { id: "route-66", nome: "Rota 66", modo: "Escolta", local: "Estados Unidos", descricao: "Estrada clássica americana no deserto do sudoeste." },
  { id: "shambali-monastery", nome: "Mosteiro Shambali", modo: "Escolta", local: "Nepal", descricao: "Mosteiro nas montanhas, lar dos ômnicos Shambali." },
  { id: "watchpoint-gibraltar", nome: "Watchpoint: Gibraltar", modo: "Escolta", local: "Gibraltar", descricao: "Base da Overwatch no Mediterrâneo, que voltou à ativa." },
  { id: "blizzard-world", nome: "Blizzard World", modo: "Híbrido", local: "Estados Unidos", descricao: "Parque temático dedicado aos jogos da Blizzard." },
  { id: "eichenwalde", nome: "Eichenwalde", modo: "Híbrido", local: "Alemanha", descricao: "Castelo medieval devastado pela guerra." },
  { id: "hollywood", nome: "Hollywood", modo: "Híbrido", local: "Estados Unidos", descricao: "Estúdio de cinema e ruas de cenários famosos." },
  { id: "kings-row", nome: "King's Row", modo: "Híbrido", local: "Londres, Reino Unido", descricao: "Bairro londrino com ruas apertadas e ponto estratégico." },
  { id: "midtown", nome: "Midtown", modo: "Híbrido", local: "Nova York, Estados Unidos", descricao: "Região urbana movimentada de Nova York." },
  { id: "numbani", nome: "Numbani", modo: "Híbrido", local: "Nigéria", descricao: "Cidade onde humanos e ômnicos convivem." },
  { id: "paraiso", nome: "Paraíso", modo: "Híbrido", local: "Rio de Janeiro, Brasil", descricao: "Bairro carioca cheio de vida, perto da praia." },
  { id: "colosseo", nome: "Colosseo", modo: "Empurrar", local: "Roma, Itália", descricao: "Arena dos gladiadores, onde Vendetta se tornou campeã." },
  { id: "esperanca", nome: "Esperança", modo: "Empurrar", local: "Portugal", descricao: "Cidade portuguesa de ruas históricas." },
  { id: "new-queen-street", nome: "New Queen Street", modo: "Empurrar", local: "Toronto, Canadá", descricao: "Região urbana moderna do Canadá." },
  { id: "runasapi", nome: "Runasapi", modo: "Empurrar", local: "Peru", descricao: "Cidade andina de Illari, entre montanhas." },
  { id: "aatlis", nome: "Aatlis", modo: "Ponto de Ignição", local: "Marrocos", descricao: "Área africana em disputa." },
  { id: "new-junk-city", nome: "New Junk City", modo: "Ponto de Ignição", local: "Austrália", descricao: "Cidade de Junkers reconstruída no deserto." },
  { id: "suravasa", nome: "Suravasa", modo: "Ponto de Ignição", local: "Índia", descricao: "Complexo indiano de cultura e tecnologia." },
  { id: "hanaoka", nome: "Hanaoka", modo: "Confronto", local: "Japão", descricao: "Distrito japonês com templos e arranha-céus." },
  { id: "throne-of-anubis", nome: "Trono de Anúbis", modo: "Confronto", local: "Egito", descricao: "Templo egípcio dedicado ao deus Anúbis." }
];
