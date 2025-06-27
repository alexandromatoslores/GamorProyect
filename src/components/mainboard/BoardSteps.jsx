import styles from './styles.module.css';
import RoomFilters from '../room/RoomFilters';
import RoomList from '../room/RoomList';
import GameSearchBar from './GameSearchBar';

export default function BoardSteps({ platform, selectPlatform, games, inputValue, handleChange, handleInputChange, menuOpen,  setMenuOpen, isDark, search, searchGame, showFilter, setShowFilter, languages, states, language, state, getFilters, searchResults, addUser, hasSearched, selectRef, joinedRoom }) {
  return (
    <div>
      <div>
        <span className={styles.stepNum}>01.</span>
        <span className={styles.stepCont}><strong>Choose</strong> Platform</span>
      </div>
      <div className={styles.tabsPane}>
        <button className={styles.tab + (platform === 'Party' ? ' ' + styles.tabActive : '')} onClick={selectPlatform}>🎉 Party</button>
        <button className={styles.tab + (platform === 'Match' ? ' ' + styles.tabActive : '')} onClick={selectPlatform}>Match</button>
        <button className={styles.tab + (platform === 'Streams' ? ' ' + styles.tabActive : '')} onClick={selectPlatform}>Streams</button>
      </div>
      <div>
        <span className={styles.stepNum}>02.</span>
        <span className={styles.stepCont}><strong>Searching</strong> Game</span>
      </div>
      <div className={styles.searchContainer}>
        <div className={styles.searchHeader}>
          <GameSearchBar
            games={games}
            inputValue={inputValue}
            handleChange={handleChange}
            handleInputChange={handleInputChange}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            selectRef={selectRef}
            isDark={isDark}
          />
        </div>
        <RoomFilters
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          languages={languages}
          states={states}
          language={language}
          state={state}
          getFilters={getFilters}
        />
        <RoomList
          rooms={searchResults}
          isDark={isDark}
          addUser={addUser}
          hasSearched={hasSearched}
          joinedRoom={joinedRoom}
        />
        <div className={styles.gradientOverlay}></div>
        <button
          className={styles.btnRectDark}
          onClick={searchGame}
        >
          {search ? `Search "${search}"` : 'Search Now'}
        </button>
      </div>
    </div>
  );
}
