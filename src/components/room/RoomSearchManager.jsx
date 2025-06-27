import { useEffect, useState } from 'react';

const roomStates = ['active', 'inactive', 'all'];
const availableLangs = ['en', 'es', 'ch', 'fr', 'it', 'all'];

/**
 * Componente de gestión de búsqueda y filtrado de salas.
 * Provee lógica y estado a través de render props.
 * @param {object} props
 * @param {Array} props.rooms - Lista de salas disponibles
 * @param {function} props.children - Render prop que recibe los datos y handlers
 * @returns {JSX.Element}
 */
export default function RoomSearchManager({ rooms, children }) {
  const [platform, setPlatform] = useState('Party');
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [game, setGame] = useState('');
  const [games, setGames] = useState([]);
  const [state, setState] = useState("all");
  const [states, setStates] = useState([]);
  const [language, setLanguage] = useState("all");
  const [languages, setLanguages] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const gamesArr = [];
    rooms.forEach(room => {
      gamesArr.push({
        label: room.game.name,
        value: room.game.name
      });
    });
    setGames(gamesArr.sort((a, b) => a.label.localeCompare(b.label)));
    setStates(roomStates.map(item => ({ label: item, value: item })));
    setLanguages(availableLangs.map(item => ({ label: item, value: item })));
  }, [rooms]);

  useEffect(() => {
    if (platform && !game) {
      const res = rooms.filter(
        (room) =>
          room.platform === platform &&
          (room.state === state || state === "all") &&
          (room.language === language || language === "all")
      );
      setSearchResults(res);
    }
  }, [platform, state, language, rooms, game]);

  /**
   * Cambia la plataforma seleccionada y reinicia los filtros.
   * @param {React.MouseEvent} e
   */
  function selectPlatform(e) {
    const platformText = e.currentTarget.innerText.replace('🎉 ', '');
    setPlatform(platformText);
    setSearchResults([]);
    setSearch('');
    setHasSearched(false);
    setGame('');
    setInputValue('');
  }

  /**
   * Maneja el cambio de selección de juego.
   * @param {object} newValue
   */
  function handleChange(newValue) {
    if (!newValue) return;
    setSearch(newValue.label);
    setInputValue(newValue.label);
    setGame(newValue.label);
    setSearchResults([]);
    setMenuOpen(false);
    setHasSearched(false);
  }

  /**
   * Maneja el cambio de texto en el input de búsqueda.
   * @param {string} newValue
   */
  function handleInputChange(newValue) {
    setInputValue(newValue);
    setSearchResults([]);
    setHasSearched(false);
  }

  /**
   * Aplica filtros de estado y lenguaje.
   * @param {string} [stateArg]
   * @param {string} [languageArg]
   */
  function getFilters(stateArg = undefined, languageArg = undefined) {
    if (stateArg) setState(stateArg);
    if (languageArg) setLanguage(languageArg);
  }

  /**
   * Ejecuta la búsqueda de salas por juego.
   */
  function searchGame() {
    if (!game) return;
    setHasSearched(true);
  }

  const filteredRooms = (!game)
    ? searchResults
    : (hasSearched && game)
      ? rooms.filter(
        (room) =>
          room.game.name === game &&
          room.platform === platform &&
          (room.state === state || state === "all") &&
          (room.language === language || language === "all")
      )
      : [];

  return children({
    platform,
    selectPlatform,
    games,
    inputValue,
    handleChange,
    handleInputChange,
    menuOpen,
    setMenuOpen,
    search,
    searchGame,
    state,
    setState,
    states,
    language,
    setLanguage,
    languages,
    getFilters,
    filteredRooms,
    hasSearched,
    setHasSearched,
    game,
    setGame
  });
} 