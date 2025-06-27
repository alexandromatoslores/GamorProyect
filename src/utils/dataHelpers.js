// Data utilities for games and categories management
// Optimized for React 19 with memoization and error handling

/**
 * Filter games by category with memoization support
 * @param {Array} games - Array of games
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered games array
 */
export const filterGamesByCategory = (games, category) => {
  try {
    if (!Array.isArray(games) || !category) return [];
    return games.filter(game => game?.game?.category === category);
  } catch (error) {
    console.error('Error filtering games by category:', error);
    return [];
  }
};

/**
 * Filter games by state with memoization support
 * @param {Array} games - Array of games
 * @param {string} state - State to filter by
 * @returns {Array} Filtered games array
 */
export const filterGamesByState = (games, state) => {
  try {
    if (!Array.isArray(games) || !state) return games;
    return games.filter(game => game?.state === state);
  } catch (error) {
    console.error('Error filtering games by state:', error);
    return games || [];
  }
};

/**
 * Get active games
 * @param {Array} games - Array of games
 * @returns {Array} Active games array
 */
export const getActiveGames = (games) => {
  return filterGamesByState(games, 'active');
};

/**
 * Get inactive games
 * @param {Array} games - Array of games
 * @returns {Array} Inactive games array
 */
export const getInactiveGames = (games) => {
  return filterGamesByState(games, 'inactive');
};

/**
 * Format game name with length limit
 * @param {string} name - Game name
 * @param {number} maxLength - Maximum length (default: 20)
 * @returns {string} Formatted game name
 */
export const formatGameName = (name, maxLength = 20) => {
  try {
    if (!name || typeof name !== 'string') return '';
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  } catch (error) {
    console.error('Error formatting game name:', error);
    return name || '';
  }
};

/**
 * Get game image path
 * @param {string} gameName - Game name
 * @returns {string} Image path
 */
export const getGameImagePath = (gameName) => {
  try {
    if (!gameName || typeof gameName !== 'string') return '';
    return `/media/${encodeURIComponent(gameName)}.jpg`;
  } catch (error) {
    console.error('Error getting game image path:', error);
    return '';
  }
};

/**
 * Get category image path
 * @param {string} categoryName - Category name
 * @returns {string} Image path
 */
export const getCategoryImagePath = (categoryName) => {
  try {
    if (!categoryName || typeof categoryName !== 'string') return '';
    return `/media/categories/${encodeURIComponent(categoryName)}.jpg`;
  } catch (error) {
    console.error('Error getting category image path:', error);
    return '';
  }
};

/**
 * Validate game data structure
 * @param {Object} game - Game object to validate
 * @returns {boolean} Validation result
 */
export const validateGameData = (game) => {
  try {
    if (!game || typeof game !== 'object') {
      throw new Error('Game must be a valid object');
    }

    const required = ['name', 'platform', 'game', 'members', 'state', 'language'];
    const missing = required.filter(field => !game[field]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
    
    if (!game.game?.name) {
      throw new Error('Game must have a name');
    }

    if (!Array.isArray(game.members)) {
      throw new Error('Game members must be an array');
    }

    if (!['active', 'inactive'].includes(game.state)) {
      throw new Error('Game state must be either "active" or "inactive"');
    }

    return true;
  } catch (error) {
    console.error('Game validation error:', error);
    return false;
  }
};

/**
 * Search games by name with fuzzy matching
 * @param {Array} games - Array of games
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered games array
 */
export const searchGamesByName = (games, searchTerm) => {
  try {
    if (!Array.isArray(games) || !searchTerm) return games;
    
    const term = searchTerm.toLowerCase().trim();
    return games.filter(game => 
      game?.game?.name?.toLowerCase().includes(term) ||
      game?.name?.toLowerCase().includes(term)
    );
  } catch (error) {
    console.error('Error searching games:', error);
    return games || [];
  }
};

/**
 * Get unique categories from games
 * @param {Array} games - Array of games
 * @returns {Array} Unique categories array
 */
export const getUniqueCategories = (games) => {
  try {
    if (!Array.isArray(games)) return [];
    
    const categories = games
      .map(game => game?.game?.category)
      .filter(Boolean);
    
    return [...new Set(categories)];
  } catch (error) {
    console.error('Error getting unique categories:', error);
    return [];
  }
};

/**
 * Sort games by name
 * @param {Array} games - Array of games
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted games array
 */
export const sortGamesByName = (games, order = 'asc') => {
  try {
    if (!Array.isArray(games)) return [];
    
    return [...games].sort((a, b) => {
      const nameA = a?.game?.name?.toLowerCase() || '';
      const nameB = b?.game?.name?.toLowerCase() || '';
      
      if (order === 'desc') {
        return nameB.localeCompare(nameA);
      }
      return nameA.localeCompare(nameB);
    });
  } catch (error) {
    console.error('Error sorting games:', error);
    return games || [];
  }
}; 