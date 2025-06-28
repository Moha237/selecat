// Estructura de cursos basada en guia_estudi.md
export const courseStructure = {
  "analisi": {
    id: "analisi",
    title: "Anàlisi",
    titleEs: "Análisis",
    description: "Funciones, límites, derivadas e integrales",
    descriptionEs: "Funciones, límites, derivadas e integrales",
    color: "#1e3a8a",
    icon: "📈",
    sections: {
      "funcions": {
        id: "funcions",
        title: "Funcions i propietats",
        titleEs: "Funciones y propiedades",
        description: "Identificació, representació i anàlisi de funcions",
        descriptionEs: "Identificación, representación y análisis de funciones",
        topics: [
          {
            id: "polinomiques",
            title: "Funcions polinòmiques",
            titleEs: "Funciones polinómicas",
            status: "pending",
            difficulty: "Bàsic"
          },
          {
            id: "trigonometriques",
            title: "Funcions trigonomètriques",
            titleEs: "Funciones trigonométricas", 
            status: "pending",
            difficulty: "Intermedi"
          },
          {
            id: "exponentials",
            title: "Funcions exponencials i logarítmiques",
            titleEs: "Funciones exponenciales y logarítmicas",
            status: "pending",
            difficulty: "Intermedi"
          },
          {
            id: "racionals",
            title: "Funcions racionals i irracionals",
            titleEs: "Funciones racionales e irracionales",
            status: "pending",
            difficulty: "Avançat"
          },
          {
            id: "trossos",
            title: "Funcions a trossos",
            titleEs: "Funciones a trozos",
            status: "pending",
            difficulty: "Intermedi"
          }
        ]
      },
      "limits": {
        id: "limits",
        title: "Límits i asímptotes",
        titleEs: "Límites y asíntotas",
        description: "Càlcul de límits i estudi d'asímptotes",
        descriptionEs: "Cálculo de límites y estudio de asíntotas",
        topics: [
          {
            id: "calcul-limits",
            title: "Càlcul de límits de funcions racionals",
            titleEs: "Cálculo de límites de funciones racionales",
            status: "pending",
            difficulty: "Intermedi"
          },
          {
            id: "asimptotes",
            title: "Asímptotes horitzontals, verticals i obliqües",
            titleEs: "Asíntotas horizontales, verticales y oblicuas",
            status: "pending",
            difficulty: "Avançat"
          }
        ]
      },
      "derivades": {
        id: "derivades",
        title: "Derivades i estudi de funcions",
        titleEs: "Derivadas y estudio de funciones",
        description: "Càlcul de derivades i anàlisi local de funcions",
        descriptionEs: "Cálculo de derivadas y análisis local de funciones",
        topics: [
          {
            id: "calcul-derivades",
            title: "Càlcul de derivades",
            titleEs: "Cálculo de derivadas",
            status: "pending",
            difficulty: "Intermedi"
          },
          {
            id: "tangent-line",
            title: "Recta tangent a una corba en un punt",
            titleEs: "Recta tangente a una curva en un punto",
            status: "completed",
            difficulty: "Intermedi",
            url: "/lesson/tangent-line"
          },
          {
            id: "continuitat",
            title: "Continuïtat i derivabilitat",
            titleEs: "Continuidad y derivabilidad",
            status: "pending",
            difficulty: "Avançat"
          },
          {
            id: "extrems",
            title: "Extrems relatius",
            titleEs: "Extremos relativos",
            status: "pending",
            difficulty: "Intermedi"
          },
          {
            id: "creixement",
            title: "Creixement i decreixement",
            titleEs: "Crecimiento y decrecimiento",
            status: "pending",
            difficulty: "Intermedi"
          },
          {
            id: "concavitat",
            title: "Concavitat i convexitat",
            titleEs: "Concavidad y convexidad",
            status: "pending",
            difficulty: "Avançat"
          },
          {
            id: "bolzano",
            title: "Teorema de Bolzano",
            titleEs: "Teorema de Bolzano",
            status: "pending",
            difficulty: "Avançat"
          }
        ]
      },
      "aplicacions-derivada": {
        id: "aplicacions-derivada",
        title: "Aplicacions de la derivada",
        titleEs: "Aplicaciones de la derivada",
        description: "Problemes d'optimització",
        descriptionEs: "Problemas de optimización",
        topics: [
          {
            id: "optimitzacio",
            title: "Resolució de problemes d'optimització",
            titleEs: "Resolución de problemas de optimización",
            status: "pending",
            difficulty: "Avançat"
          }
        ]
      },
      "integrals": {
        id: "integrals",
        title: "Integrals",
        titleEs: "Integrales",
        description: "Primitives i càlcul d'àrees",
        descriptionEs: "Primitivas y cálculo de áreas",
        topics: [
          {
            id: "primitives",
            title: "Primitives d'una funció",
            titleEs: "Primitivas de una función",
            status: "pending",
            difficulty: "Intermedi"
          },
          {
            id: "immediates",
            title: "Càlcul de primitives immediates i quasi-immediates",
            titleEs: "Cálculo de primitivas inmediatas y casi-inmediatas",
            status: "pending",
            difficulty: "Avançat"
          },
          {
            id: "areas",
            title: "Càlcul d'àrees sota corbes",
            titleEs: "Cálculo de áreas bajo curvas",
            status: "pending",
            difficulty: "Avançat"
          }
        ]
      }
    }
  },
  "algebra-geometria": {
    id: "algebra-geometria",
    title: "Àlgebra i Geometria",
    titleEs: "Álgebra y Geometría",
    description: "Geometria espacial, matrius i sistemes",
    descriptionEs: "Geometría espacial, matrices y sistemas",
    color: "#059669",
    icon: "📐",
    sections: {
      "geometria-espai": {
        id: "geometria-espai",
        title: "Geometria en l'espai",
        titleEs: "Geometría en el espacio",
        description: "Rectes, plans i relacions espacials",
        descriptionEs: "Rectas, planos y relaciones espaciales",
        topics: [
          {
            id: "equacions-rectes-plans",
            title: "Equacions de rectes i plans",
            titleEs: "Ecuaciones de rectas y planos",
            status: "pending",
            difficulty: "Intermedi"
          },
          {
            id: "posicio-relativa",
            title: "Posició relativa entre varietats lineals",
            titleEs: "Posición relativa entre variedades lineales",
            status: "pending",
            difficulty: "Avançat"
          },
          {
            id: "distancies",
            title: "Distàncies entre punts i varietats lineals",
            titleEs: "Distancias entre puntos y variedades lineales",
            status: "pending",
            difficulty: "Avançat"
          },
          {
            id: "angles",
            title: "Angles entre varietats lineals",
            titleEs: "Ángulos entre variedades lineales",
            status: "pending",
            difficulty: "Intermedi"
          },
          {
            id: "perpendicularitat",
            title: "Perpendicularitat",
            titleEs: "Perpendicularidad",
            status: "pending",
            difficulty: "Intermedi"
          }
        ]
      },
      "matrius": {
        id: "matrius",
        title: "Matrius i determinants",
        titleEs: "Matrices y determinantes",
        description: "Operacions amb matrius fins a 3x3",
        descriptionEs: "Operaciones con matrices hasta 3x3",
        topics: [
          {
            id: "operacions-matrius",
            title: "Operacions amb matrius (suma, producte, inversió)",
            titleEs: "Operaciones con matrices (suma, producto, inversión)",
            status: "pending",
            difficulty: "Intermedi"
          },
          {
            id: "determinant-rang",
            title: "Determinant i rang d'una matriu",
            titleEs: "Determinante y rango de una matriz",
            status: "pending",
            difficulty: "Avançat"
          }
        ]
      },
      "sistemes": {
        id: "sistemes",
        title: "Sistemes d'equacions",
        titleEs: "Sistemas de ecuaciones",
        description: "Discussió i resolució de sistemes lineals",
        descriptionEs: "Discusión y resolución de sistemas lineales",
        topics: [
          {
            id: "sense-parametres",
            title: "Sistemes sense paràmetres",
            titleEs: "Sistemas sin parámetros",
            status: "pending",
            difficulty: "Intermedi"
          },
          {
            id: "amb-parametres",
            title: "Sistemes amb un paràmetre",
            titleEs: "Sistemas con un parámetro",
            status: "pending",
            difficulty: "Avançat"
          },
          {
            id: "problemes-modelitzacio",
            title: "Problemes modelitzables amb sistemes",
            titleEs: "Problemas modelizables con sistemas",
            status: "pending",
            difficulty: "Avançat"
          }
        ]
      }
    }
  },
  "probabilitat": {
    id: "probabilitat",
    title: "Probabilitat",
    titleEs: "Probabilidad",
    description: "Càlcul de probabilitats i variables aleatòries",
    descriptionEs: "Cálculo de probabilidades y variables aleatorias",
    color: "#dc2626",
    icon: "🎲",
    sections: {
      "calcul-probabilitats": {
        id: "calcul-probabilitats",
        title: "Càlcul de probabilitats",
        titleEs: "Cálculo de probabilidades",
        description: "Probabilitat condicionada i independència",
        descriptionEs: "Probabilidad condicionada e independencia",
        topics: [
          {
            id: "condicionada",
            title: "Probabilitat condicionada",
            titleEs: "Probabilidad condicionada",
            status: "pending",
            difficulty: "Intermedi"
          },
          {
            id: "independencia",
            title: "Independència",
            titleEs: "Independencia",
            status: "pending",
            difficulty: "Intermedi"
          },
          {
            id: "diagrames-arbre",
            title: "Diagrames d'arbre i taules de contingència",
            titleEs: "Diagramas de árbol y tablas de contingencia",
            status: "pending",
            difficulty: "Bàsic"
          }
        ]
      },
      "bayes": {
        id: "bayes",
        title: "Teorema de Bayes",
        titleEs: "Teorema de Bayes",
        description: "Aplicació i interpretació del teorema",
        descriptionEs: "Aplicación e interpretación del teorema",
        topics: [
          {
            id: "aplicacio-bayes",
            title: "Aplicació i interpretació del teorema de Bayes",
            titleEs: "Aplicación e interpretación del teorema de Bayes",
            status: "pending",
            difficulty: "Avançat"
          }
        ]
      },
      "variables-discretes": {
        id: "variables-discretes",
        title: "Variables aleatòries discretes",
        titleEs: "Variables aleatorias discretas",
        description: "Distribució binomial",
        descriptionEs: "Distribución binomial",
        topics: [
          {
            id: "binomial",
            title: "Distribució binomial: definició i aplicacions",
            titleEs: "Distribución binomial: definición y aplicaciones",
            status: "pending",
            difficulty: "Avançat"
          }
        ]
      }
    }
  }
};

// Funciones auxiliares
export const getAllTopics = () => {
  const topics = [];
  Object.values(courseStructure).forEach(course => {
    Object.values(course.sections).forEach(section => {
      section.topics.forEach(topic => {
        topics.push({
          ...topic,
          courseId: course.id,
          sectionId: section.id,
          courseTitleEs: course.titleEs,
          sectionTitleEs: section.titleEs
        });
      });
    });
  });
  return topics;
};

export const getTopicsByStatus = (status) => {
  return getAllTopics().filter(topic => topic.status === status);
};

export const getCourseProgress = (courseId) => {
  const course = courseStructure[courseId];
  if (!course) return { completed: 0, total: 0, percentage: 0 };
  
  let completed = 0;
  let total = 0;
  
  Object.values(course.sections).forEach(section => {
    section.topics.forEach(topic => {
      total++;
      if (topic.status === 'completed') completed++;
    });
  });
  
  return {
    completed,
    total,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0
  };
};

export default courseStructure;