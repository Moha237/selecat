import { useState, useEffect, useCallback } from 'react';
import { quizAPI, progressHelpers } from '../services/quizAPI';

export const useQuizProgress = (userId = '1') => {
  const [progress, setProgress] = useState({});
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ========================
  // CARGA INICIAL DE DATOS
  // ========================

  const loadAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [progressData, quizDefs] = await Promise.all([
        quizAPI.getUserProgress(userId),
        quizAPI.getQuizDefinitions()
      ]);

      // Convertir array de progreso a objeto indexado por quizId
      const progressMap = {};
      progressData.forEach(item => {
        progressMap[item.quizId] = item;
      });

      setProgress(progressMap);
      setDefinitions(quizDefs);
    } catch (err) {
      setError('Error cargando datos');
      console.error('Error en loadAllData:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // ========================
  // GESTIÓN DE PROGRESO
  // ========================

  const startQuiz = useCallback(async (quizId) => {
    try {
      const existingProgress = progress[quizId];
      
      if (existingProgress) {
        // Si ya existe progreso, solo actualizar estado a 'in_progress'
        const updated = await quizAPI.updateQuizProgress(existingProgress.id, {
          status: 'in_progress',
          startedAt: new Date().toISOString(),
          currentQuestion: existingProgress.status === 'completed' ? 0 : existingProgress.currentQuestion,
          answers: existingProgress.status === 'completed' ? [] : existingProgress.answers
        });
        
        setProgress(prev => ({
          ...prev,
          [quizId]: updated
        }));
        
        return updated;
      } else {
        // Crear nuevo progreso
        const initialData = {
          ...progressHelpers.createInitialProgress(userId, quizId),
          status: 'in_progress',
          startedAt: new Date().toISOString()
        };
        
        const created = await quizAPI.createQuizProgress(initialData);
        
        setProgress(prev => ({
          ...prev,
          [quizId]: created
        }));
        
        return created;
      }
    } catch (err) {
      setError('Error al iniciar quiz');
      console.error('Error en startQuiz:', err);
      throw err;
    }
  }, [progress, userId]);

  const saveAnswer = useCallback(async (quizId, questionIndex, answerIndex, isCorrect) => {
    try {
      const currentProgress = progress[quizId];
      if (!currentProgress) throw new Error('No se encontró progreso del quiz');

      const newAnswers = [...currentProgress.answers];
      newAnswers[questionIndex] = answerIndex;
      
      const correctAnswers = newAnswers.reduce((count, answer, idx) => {
        // Aquí necesitarías la lógica para determinar si la respuesta es correcta
        // Por simplicidad, asumimos que el índice 0 es siempre correcto
        return count + (isCorrect ? 1 : 0);
      }, 0);

      const updates = {
        answers: newAnswers,
        correctAnswers,
        currentQuestion: questionIndex + 1
      };

      const updated = await quizAPI.updateQuizProgress(currentProgress.id, updates);
      
      setProgress(prev => ({
        ...prev,
        [quizId]: updated
      }));

      return updated;
    } catch (err) {
      setError('Error al guardar respuesta');
      console.error('Error en saveAnswer:', err);
      throw err;
    }
  }, [progress]);

  const completeQuiz = useCallback(async (quizId, finalScore, timeSpent) => {
    try {
      const currentProgress = progress[quizId];
      if (!currentProgress) throw new Error('No se encontró progreso del quiz');

      // Actualizar progreso como completado
      const updates = {
        status: 'completed',
        score: finalScore,
        timeSpent,
        completedAt: new Date().toISOString(),
        attempts: currentProgress.attempts + 1
      };

      const [updatedProgress] = await Promise.all([
        quizAPI.updateQuizProgress(currentProgress.id, updates),
        // Guardar también como intento
        quizAPI.saveQuizAttempt({
          userId,
          quizId,
          score: finalScore,
          timeSpent,
          completedAt: new Date().toISOString(),
          answers: currentProgress.answers
        })
      ]);

      setProgress(prev => ({
        ...prev,
        [quizId]: updatedProgress
      }));

      return updatedProgress;
    } catch (err) {
      setError('Error al completar quiz');
      console.error('Error en completeQuiz:', err);
      throw err;
    }
  }, [progress, userId]);

  const resetQuiz = useCallback(async (quizId) => {
    try {
      const currentProgress = progress[quizId];
      if (!currentProgress) return;

      const updates = {
        status: 'pending',
        score: null,
        correctAnswers: 0,
        answers: [],
        currentQuestion: 0,
        completedAt: null,
        startedAt: null
      };

      const updated = await quizAPI.updateQuizProgress(currentProgress.id, updates);
      
      setProgress(prev => ({
        ...prev,
        [quizId]: updated
      }));

      return updated;
    } catch (err) {
      setError('Error al reiniciar quiz');
      console.error('Error en resetQuiz:', err);
      throw err;
    }
  }, [progress]);

  // ========================
  // UTILIDADES Y GETTERS
  // ========================

  const getQuizStatus = useCallback((quizId) => {
    const quizProgress = progress[quizId];
    const definition = definitions.find(d => d.id === quizId);
    
    return {
      progress: quizProgress || progressHelpers.createInitialProgress(userId, quizId),
      definition: definition || null,
      exists: !!quizProgress
    };
  }, [progress, definitions, userId]);

  const getOverallStats = useCallback(() => {
    const allProgress = Object.values(progress);
    const completed = allProgress.filter(p => p.status === 'completed').length;
    const inProgress = allProgress.filter(p => p.status === 'in_progress').length;
    const totalQuizzes = definitions.length;
    const completionRate = totalQuizzes > 0 ? Math.round((completed / totalQuizzes) * 100) : 0;

    return {
      completed,
      inProgress,
      pending: totalQuizzes - completed - inProgress,
      totalQuizzes,
      completionRate
    };
  }, [progress, definitions]);

  return {
    // Estado
    progress,
    definitions,
    loading,
    error,
    
    // Acciones
    startQuiz,
    saveAnswer,
    completeQuiz,
    resetQuiz,
    refreshData: loadAllData,
    
    // Utilidades
    getQuizStatus,
    getOverallStats
  };
};