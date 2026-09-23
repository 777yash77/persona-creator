'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { recentPersonas as initialMockData } from '../data/mockData';

const PersonaContext = createContext();

export const usePersona = () => {
  return useContext(PersonaContext);
};

export const PersonaProvider = ({ children }) => {
  const [personas, setPersonas] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem('persona-hub-data');
    if (saved) {
      setPersonas(JSON.parse(saved));
    } else {
      // Seed with mock data
      setPersonas(initialMockData);
      localStorage.setItem('persona-hub-data', JSON.stringify(initialMockData));
    }
    setIsLoaded(true);
  }, []);

  const saveToStorage = (data) => {
    setPersonas(data);
    localStorage.setItem('persona-hub-data', JSON.stringify(data));
  };

  const addPersona = (persona) => {
    const newPersona = {
      ...persona,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };
    saveToStorage([newPersona, ...personas]);
    return newPersona.id;
  };

  const updatePersona = (id, updatedData) => {
    const newData = personas.map(p => p.id === id ? { ...p, ...updatedData } : p);
    saveToStorage(newData);
  };

  const deletePersona = (id) => {
    const newData = personas.filter(p => p.id !== id);
    saveToStorage(newData);
  };

  const duplicatePersona = (id) => {
    const existing = personas.find(p => p.id === id);
    if (!existing) return;
    const duplicate = {
      ...existing,
      id: Date.now().toString(),
      name: `${existing.name} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    saveToStorage([duplicate, ...personas]);
    return duplicate.id;
  };

  const getPersona = (id) => {
    return personas.find(p => p.id === id);
  };

  return (
    <PersonaContext.Provider value={{
      personas,
      isLoaded,
      addPersona,
      updatePersona,
      deletePersona,
      duplicatePersona,
      getPersona
    }}>
      {children}
    </PersonaContext.Provider>
  );
};
