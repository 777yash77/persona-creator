'use client';
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const PersonaContext = createContext();

export const usePersona = () => {
  return useContext(PersonaContext);
};

export const PersonaProvider = ({ children }) => {
  const [personas, setPersonas] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    try {
      const saved = localStorage.getItem('persona-hub-data');
      if (saved) {
        setPersonas(JSON.parse(saved));
      } else {
        setPersonas([]);
        localStorage.setItem('persona-hub-data', JSON.stringify([]));
      }
    } catch (error) {
      console.error('Failed to load personas from storage:', error);
      setPersonas([]);
    }
    setIsLoaded(true);
  }, []);

  const addPersona = useCallback((persona) => {
    const newPersona = {
      ...persona,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };
    setPersonas((prev) => {
      const next = [newPersona, ...prev];
      try {
        localStorage.setItem('persona-hub-data', JSON.stringify(next));
      } catch (error) {
        console.error('Failed to save personas to storage:', error);
      }
      return next;
    });
    return newPersona.id;
  }, []);

  const updatePersona = useCallback((id, updatedData) => {
    setPersonas((prev) => {
      const next = prev.map(p => p.id === id ? { ...p, ...updatedData } : p);
      try {
        localStorage.setItem('persona-hub-data', JSON.stringify(next));
      } catch (error) {
        console.error('Failed to save personas to storage:', error);
      }
      return next;
    });
  }, []);

  const deletePersona = useCallback((id) => {
    setPersonas((prev) => {
      const next = prev.filter(p => p.id !== id);
      try {
        localStorage.setItem('persona-hub-data', JSON.stringify(next));
      } catch (error) {
        console.error('Failed to save personas to storage:', error);
      }
      return next;
    });
  }, []);

  const duplicatePersona = useCallback((id) => {
    let newId = null;
    setPersonas((prev) => {
      const existing = prev.find(p => p.id === id);
      if (!existing) return prev;
      const duplicate = {
        ...existing,
        id: Date.now().toString(),
        name: `${existing.name} (Copy)`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      newId = duplicate.id;
      const next = [duplicate, ...prev];
      try {
        localStorage.setItem('persona-hub-data', JSON.stringify(next));
      } catch (error) {
        console.error('Failed to save personas to storage:', error);
      }
      return next;
    });
    return newId;
  }, []);

  const toggleFavorite = useCallback((id) => {
    setPersonas((prev) => {
      const next = prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p);
      try {
        localStorage.setItem('persona-hub-data', JSON.stringify(next));
      } catch (error) {
        console.error('Failed to save personas to storage:', error);
      }
      return next;
    });
  }, []);

  const getPersona = useCallback((id) => {
    return personas.find(p => p.id === id);
  }, [personas]);

  const value = useMemo(() => ({
    personas,
    isLoaded,
    addPersona,
    updatePersona,
    deletePersona,
    duplicatePersona,
    toggleFavorite,
    getPersona
  }), [personas, isLoaded, addPersona, updatePersona, deletePersona, duplicatePersona, toggleFavorite, getPersona]);

  return (
    <PersonaContext.Provider value={value}>
      {children}
    </PersonaContext.Provider>
  );
};