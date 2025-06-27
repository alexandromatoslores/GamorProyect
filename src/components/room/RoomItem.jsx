import styles from '../mainboard/styles.module.css';
import { usersList } from '../../data/users';
import React from 'react';

export default function RoomItem({ room, index, isDark, addUser, joinedRoom }) {
  const avatars = room.members.slice(0, 2);
  return (
    <div key={room.name} className={styles.gamesListRow} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0, gap: 28 }}>
        <span className={`${styles.roomNumber} ${isDark ? styles.light : styles.dark}`}>{index + 1}</span>
        <strong className={styles.roomName}>{room.name || 'Sin nombre'}</strong>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginLeft: 16 }}>
        {avatars.map((member, idx) => {
          const memberLower = member.toLowerCase();
          const userObj = usersList.find(u => u.username === memberLower);
          return (
            <img
              className={styles.listAvatar}
              key={member}
              src={userObj ? userObj.avatar : `/users/${memberLower}.png`}
              width={22}
              height={22}
              alt={`Avatar de ${member}`}
              style={{
                marginLeft: idx === 0 ? 0 : -10,
                background: '#eee',
              }}
            />
          );
        })}
        <button
          id={room.name}
          className={`${styles.btnAdd} ${isDark ? styles.light : styles.dark}`}
          onClick={addUser}
          style={{ marginLeft: 50 }}
        >
          {joinedRoom && joinedRoom[0].name === room.name ? '-' : '+'}
        </button>
      </div>
    </div>
  );
} 