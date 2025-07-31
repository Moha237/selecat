const API_BASE = 'http://localhost:3001';

export const quizAPI = {
  // ========================
  // GESTIÓN DE PROGRESO
  // ========================
  
  // Obtener todo el progreso de un usuario
  getUserProgress: async (userId) => {
    try {
      const response = await fetch(`${API_BASE}/quizProgress?userId=${userId}`);
      if (!response.ok) throw new Error('Error al cargar progreso');
      return await response.json();
    } catch (error) {
      console.error('Error cargando progreso:', error);
      return [];
    }
  },

  // Obtener progreso de un quiz específico
  getQuizProgress: async (userId, quizId) => {
    try {
      const response = await fetch(`${API_BASE}/quizProgress?userId=${userId}&quizId=${quizId}`);
      if (!response.ok) throw new Error('Error al cargar progreso del quiz');
      const data = await response.json();
      return data[0] || null; // Devuelve el primer resultado o null
    } catch (error) {
      console.error('Error cargando progreso del quiz:', error);
      return null;
    }
  },

  // Crear nuevo progreso de quiz
  createQuizProgress: async (progressData) => {
    try {
      const response = await fetch(`${API_BASE}/quizProgress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...progressData,
          lastUpdated: new Date().toISOString()
        })
      });
      if (!response.ok) throw new Error('Error al crear progreso');
      return await response.json();
    } catch (error) {
      console.error('Error creando progreso:', error);
      throw error;
    }
  },

  // Actualizar progreso existente
  updateQuizProgress: async (progressId, updates) => {
    try {
      const response = await fetch(`${API_BASE}/quizProgress/${progressId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updates,
          lastUpdated: new Date().toISOString()
        })
      });
      if (!response.ok) throw new Error('Error al actualizar progreso');
      return await response.json();
    } catch (error) {
      console.error('Error actualizando progreso:', error);
      throw error;
    }
  },

  // ========================
  // GESTIÓN DE INTENTOS
  // ========================

  // Guardar un intento completado
  saveQuizAttempt: async (attemptData) => {
    try {
      const response = await fetch(`${API_BASE}/quizAttempts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attemptData)
      });
      if (!response.ok) throw new Error('Error al guardar intento');
      return await response.json();
    } catch (error) {
      console.error('Error guardando intento:', error);
      throw error;
    }
  },

  // Obtener historial de intentos de un quiz
  getQuizAttempts: async (userId, quizId) => {
    try {
      const response = await fetch(`${API_BASE}/quizAttempts?userId=${userId}&quizId=${quizId}&_sort=completedAt&_order=desc`);
      if (!response.ok) throw new Error('Error al cargar intentos');
      return await response.json();
    } catch (error) {
      console.error('Error cargando intentos:', error);
      return [];
    }
  },

  // ========================
  // DEFINICIONES DE QUIZZES
  // ========================

  // Obtener todas las definiciones de quizzes
  getQuizDefinitions: async () => {
    try {
      const response = await fetch(`${API_BASE}/quizDefinitions?_sort=order&_order=asc`);
      if (!response.ok) throw new Error('Error al cargar definiciones');
      return await response.json();
    } catch (error) {
      console.error('Error cargando definiciones:', error);
      return [];
    }
  },

  // Obtener definición de un quiz específico
  getQuizDefinition: async (quizId) => {
    try {
      const response = await fetch(`${API_BASE}/quizDefinitions/${quizId}`);
      if (!response.ok) throw new Error('Error al cargar definición del quiz');
      return await response.json();
    } catch (error) {
      console.error('Error cargando definición:', error);
      return null;
    }
  },

  // ========================
  // UTILIDADES
  // ========================

  // Calcular estadísticas generales del usuario
  getUserStats: async (userId) => {
    try {
      const [progress, attempts] = await Promise.all([
        quizAPI.getUserProgress(userId),
        fetch(`${API_BASE}/quizAttempts?userId=${userId}`).then(r => r.json())
      ]);

      const completed = progress.filter(p => p.status === 'completed').length;
      const inProgress = progress.filter(p => p.status === 'in_progress').length;
      const totalTime = progress.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
      const avgScore = attempts.length > 0 
        ? attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length 
        : 0;

      return {
        completed,
        inProgress,
        totalQuizzes: progress.length,
        totalTime,
        avgScore: Math.round(avgScore),
        totalAttempts: attempts.length
      };
    } catch (error) {
      console.error('Error calculando estadísticas:', error);
      return {
        completed: 0,
        inProgress: 0, 
        totalQuizzes: 0,
        totalTime: 0,
        avgScore: 0,
        totalAttempts: 0
      };
    }
  }
};

// ========================
// HELPERS PARA PROGRESO
// ========================

export const progressHelpers = {
  // Crear datos iniciales de progreso para un nuevo quiz
  createInitialProgress: (userId, quizId) => ({
    userId,
    quizId,
    status: 'pending',
    score: null,
    totalQuestions: 4,
    correctAnswers: 0,
    answers: [],
    currentQuestion: 0,
    timeSpent: 0,
    attempts: 0,
    completedAt: null,
    startedAt: null
  }),

  // Calcular score basado en respuestas correctas
  calculateScore: (correctAnswers, totalQuestions) => {
    return Math.round((correctAnswers / totalQuestions) * 100);
  },

  // Determinar si un quiz está aprobado
  isPassed: (score, passingScore = 75) => {
    return score >= passingScore;
  },

  // Formatear tiempo en formato legible
  formatTime: (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
};