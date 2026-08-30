/**
 * ==============================================================================
 * CONFIGURACIÓN DE REGALOS - CUMPLEAÑOS DE VANESSA (23º ANIVERSARIO)
 * ==============================================================================
 */

export const BIRTHDAY_INFO = {
  name: "Vanessa",
  age: 23,
  tagline: "Por muchos más años a tu lado.",
  celebrationTitle: "Tus 23 Regalos & Sorpresas",
  celebrationSubtitle: "Rasca cada tarjeta dorada para descubrir lo que te espera",
};

export const GIFTS_DATA = [
  {
    id: 1,
    title: "Maquillaje",
    subtitle: "Glamour & Belleza",
    icon: "Sparkles",
    badge: "Belleza & Glow",
    colorTheme: "rosegold",
    cardPreviewText: "Toca para abrir y rascar",
    imageSrc: "/images/maquillaje.png",
    revealed: {
      tag: "Regalo 1 ✨",
      title: "Maquillaje",
      imageSrc: "/images/maquillaje.png",
    }
  },
  {
    id: 2,
    title: "Sesión de Masaje",
    subtitle: "Desconexión & Bienestar",
    icon: "HeartHandshake",
    badge: "Relax Total",
    colorTheme: "champagne",
    cardPreviewText: "Toca para abrir y rascar",
    imageSrc: "/images/masaje.png",
    revealed: {
      tag: "Experiencia Relax 🌿",
      title: "Sesión de Masaje",
      imageSrc: "/images/masaje.png",
      places: [
        {
          name: "ARomaMatSens",
          icon: "💆‍♂️",
          details: "(abre todos los días, domingos incluidos, de 9:00 a 23:00).",
          rating: "5⭐"
        },
        {
          name: "Terapias Bienestar Esther Madrid",
          icon: "💆‍♀️",
          details: "",
          rating: "5⭐"
        }
      ],
      footnote: "Elige tu centro favorito y coordinamos la reserva cuando quieras"
    }
  },
  {
    id: 3,
    title: "Paquete Uno",
    subtitle: "Caja Especial 1",
    icon: "Package",
    badge: "Sorpresa Exclusiva",
    colorTheme: "rosegold",
    cardPreviewText: "Toca para abrir y rascar",
    imageSrc: "/images/paquete1.png",
    revealed: {
      tag: "Regalo 3 ✨",
      title: "Paquete Uno",
      imageSrc: "/images/paquete1.png",
    }
  },
  {
    id: 4,
    title: "Pegatina Camino de Santiago",
    subtitle: "Recuerdo Único",
    icon: "Image",
    badge: "Camino de Santiago 🥾",
    colorTheme: "rosegold",
    cardPreviewText: "Toca para abrir y rascar",
    imageSrc: "/images/pegatina.png",
    revealed: {
      tag: "Regalo 4 ✨",
      title: "Pegatina Camino de Santiago",
      imageSrc: "/images/pegatina.png",
    }
  },
  {
    id: 5,
    title: "Paquete Dos",
    subtitle: "Caja Especial 2",
    icon: "PackageCheck",
    badge: "Sorpresa Exclusiva",
    colorTheme: "champagne",
    cardPreviewText: "Toca para abrir y rascar",
    imageSrc: "/images/paquete2.png",
    revealed: {
      tag: "Regalo 5 ✨",
      title: "Paquete Dos",
      imageSrc: "/images/paquete2.png",
    }
  },
  {
    id: 6,
    title: "Carta Romántica",
    subtitle: "Escrita a Mano",
    icon: "Heart",
    badge: "Escrita a Mano 💌",
    colorTheme: "rosegold",
    cardPreviewText: "Toca para abrir y rascar",
    imageSrc: "/images/carta.png",
    revealed: {
      tag: "Regalo 6 ✨",
      title: "Carta Romántica",
      imageSrc: "/images/carta.png",
    }
  },
  {
    id: 7,
    title: "Escapada de Fin de Semana",
    subtitle: "Aventura Multinivel",
    icon: "Compass",
    badge: "3 Pistas Misteriosas",
    colorTheme: "champagne",
    isMultiLevel: true,
    cardPreviewText: "Rasca las pistas para adivinar el destino...",
    steps: [
      {
        stepNumber: 1,
        title: "Pista 1: Comida Típica",
        badge: "Pista 1: Gastronomía 🥧",
        scratchPrompt: "✨ Rasca para descubrir la comida típica ✨",
        imageSrc: "/images/hornazo.png",
        hintContent: {
          icon: "UtensilsCrossed",
          heading: "El Hornazo de -------",
          imageSrc: "/images/hornazo.png",
          text: "Una delicia tradicional rellena de los mejores embutidos ibéricos, lomo, chorizo y huevo duro.",
          bullet: "🍴 ¿A qué ciudad pertenece este famoso plato típico?"
        },
        buttonNextText: "Continuar a la Pista 2 ✨"
      },
      {
        stepNumber: 2,
        title: "Pista 2: La Bandera",
        badge: "Pista 2: Símbolo de la Ciudad 🚩",
        scratchPrompt: "✨ Rasca para revelar la bandera oficial ✨",
        imageSrc: "/images/bandera_salamanca.png",
        hintContent: {
          icon: "Compass",
          heading: "Bandera de la Ciudad",
          imageSrc: "/images/bandera_salamanca.png",
          text: "Estandarte carmesí con el histórico puente romano y el toro. Ciudad de plazas doradas y leyendas.",
          bullet: "🏛️ ¡Ya casi lo tienes! ¿Reconoces estos colores?"
        },
        buttonNextText: "Revelar Destino Final 🎉"
      },
      {
        stepNumber: 3,
        title: "¿A dónde nos vamos?",
        badge: "Pista 3: Gran Revelación ✈️",
        scratchPrompt: "✨ ¡Rasca fuerte para descubrir el destino! ✨",
        imageSrc: "/images/salamanca.png",
        hintContent: {
          icon: "PlaneTakeoff",
          heading: "¡Nos vamos a SALAMANCA!",
          destinationName: "Salamanca · La Ciudad Dorada",
          imageSrc: "/images/salamanca.png",
          dates: "Fechas a elegir · Escapada de Fin de Semana",
          text: "¡Plaza Mayor iluminada, tapeo inolvidable, callejear por la historia y disfrutar al máximo de tus 23!",
          bullet: "🏨 Hotel con encanto, paseos y todo preparado para disfrutar juntos."
        },
        buttonNextText: "Guardar en mis regalos 🎁"
      }
    ]
  }
];

export const SCRATCH_THRESHOLD_PERCENT = 52;
