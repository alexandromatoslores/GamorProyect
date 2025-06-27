import React, { useState } from 'react';

export default function RoomFilters({ showFilter, setShowFilter, languages, states, language, state, getFilters }) {
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedState, setSelectedState] = useState(state);

  if (!showFilter) return null;

  return (
    <div style={{
      position: 'absolute', background: '#fff', border: '1px solid #ccc', padding: 20, zIndex: 100
    }}>
      <h4>Filtrar salas</h4>
      <div>
        <label>Idioma: </label>
        <select value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)}>
          {languages.map(l => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Estado: </label>
        <select value={selectedState} onChange={e => setSelectedState(e.target.value)}>
          {states.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      <button onClick={() => { getFilters(selectedState, selectedLanguage); setShowFilter(false); }}>
        Aplicar
      </button>
      <button onClick={() => setShowFilter(false)}>
        Cerrar
      </button>
    </div>
  );
} 