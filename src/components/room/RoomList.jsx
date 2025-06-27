import styles from '../mainboard/styles.module.css';
import RoomItem from './RoomItem';

export default function RoomList({ rooms, isDark, addUser, hasSearched, joinedRoom }) {
  if (!rooms.length && hasSearched) return <div className={styles.nothingHere}>No rooms to show.</div>;
  if (!rooms.length && !hasSearched) return <div className={styles.nothingHere}>Selecciona un juego y busca para ver salas</div>;
  return (
    <div className={styles.gamesList}>
      {rooms.map((room, i) => (
        <RoomItem key={room.name} room={room} index={i} isDark={isDark} addUser={addUser} joinedRoom={joinedRoom} />
      ))}
    </div>
  );
} 