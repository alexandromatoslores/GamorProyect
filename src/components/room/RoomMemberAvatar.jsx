import styles from '../mainboard/styles.module.css';
import { usersList } from '../../data/users';

export default function RoomMemberAvatar({ member, idx, pos }) {
  const memberLower = member.toLowerCase();
  const userObj = usersList.find(u => u.username === memberLower);
  return (
    <div
      className={styles.roomMemberAvatarBlock}
      style={{
        position: 'absolute',
        ...pos,
        zIndex: 20 + idx
      }}
    >
      <img
        className={styles.userBall}
        src={userObj ? userObj.avatar : `/users/${memberLower}.png`}
        alt={member}
      />
      <div className={styles.roomMemberName}>{member}</div>
    </div>
  );
} 