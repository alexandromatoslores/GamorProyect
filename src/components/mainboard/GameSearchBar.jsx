import styles from '../mainboard/styles.module.css';
import Select from 'react-select';
import { CiCircleList } from "react-icons/ci";
import React from 'react';

export default function GameSearchBar({
  games,
  inputValue,
  handleChange,
  handleInputChange,
  menuOpen,
  setMenuOpen,
  selectRef,
  isDark
}) {
  return (
    <div className={styles.selectWrapper} ref={selectRef}>
      <Select
        id='searchbox'
        options={games.filter(g => inputValue.length === 0 ? true : g.label.toLowerCase().includes(inputValue.toLowerCase()))}
        className={styles.searchBox}
        placeholder={'Select a game'}
        onChange={handleChange}
        onInputChange={handleInputChange}
        inputValue={inputValue}
        menuIsOpen={menuOpen || (inputValue.length > 0)}
        components={{ DropdownIndicator: () => null }}
        styles={{
          control: (base) => ({
            ...base,
            background: 'transparent',
            boxShadow: 'none',
            border: 'none',
            minHeight: '56px',
            height: '56px',
            paddingRight: '44px',
          }),
          valueContainer: (base) => ({
            ...base,
            background: 'transparent',
          }),
          input: (base) => ({
            ...base,
            color: 'var(--dark)',
            background: 'transparent',
          }),
          singleValue: (base) => ({
            ...base,
            color: 'var(--dark)',
          }),
          placeholder: (base) => ({
            ...base,
            color: 'var(--dark)',
            opacity: 0.7,
          }),
          menu: (base) => ({
            ...base,
            background: isDark ? 'var(--lightgrey)' : 'var(--block)',
            color: 'var(--dark)',
            zIndex: 20,
          }),
          option: (base, state) => ({
            ...base,
            background: state.isFocused ? 'rgba(0,0,0,0.05)' : 'transparent',
            color: 'var(--dark)',
          }),
          dropdownIndicator: (base) => ({
            ...base,
            padding: 0,
            color: 'var(--dark)',
          }),
          indicatorSeparator: () => ({ display: 'none' }),
        }}
      />
      <div className={styles.fixedDropdownIcon} onClick={() => setMenuOpen(m => !m)}>
        <CiCircleList size={28} style={{ color: 'var(--dark)' }} />
      </div>
    </div>
  );
} 