import styles from './styles.module.css';
import Clock from './Clock';
import RoomMemberAvatar from '../room/RoomMemberAvatar';

export default function BoardAd({ imgStyle, game, joinedRoom, user, searchResults, platform }) {
  return (
    <div className={styles.bgImage} style={imgStyle}>
      <div className={styles.ad}>
        <div className={styles.adClockWrapper}>
          <Clock joinedRoom={joinedRoom} />
        </div>
        <p className={styles.adTitle}>{game}</p>
        <p className={styles.adSubtitle}>
          {joinedRoom ?
            `You're in ${joinedRoom[0].name}` :
            `Join Live ${searchResults.length ? searchResults[0].platform : platform}`
          }
        </p>
      </div>
      <div className={styles.clockSection}>
        {joinedRoom && (() => {
          const positions = [
            { top: '10%', left: '10%' },
            { top: '10%', right: '10%' },
            { bottom: '10%', left: '10%' },
            { bottom: '10%', left: '45%' },
            { bottom: '10%', right: '10%' },
          ];
          const members = [...joinedRoom[0].members];
          if (user && !members.map(m => m.toLowerCase()).includes(user.username)) {
            members.push(user.username);
          }
          return members.slice(0, 5).map((member, idx) => {
            const pos = positions[idx] || { bottom: '10%', left: `${20 + idx * 15}%` };
            return (
              <RoomMemberAvatar key={member} member={member} idx={idx} pos={pos} />
            );
          });
        })()}
      </div>
    </div>
  );
}
