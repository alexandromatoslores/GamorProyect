import styles from './styles.module.css'
import { useEffect, useState, useRef } from 'react'
import { useUser } from "../../context/UserContext"
import BoardHeader from './BoardHeader';
import BoardAd from './BoardAd';
import BoardSteps from './BoardSteps';
import RoomSearchManager from '../room/RoomSearchManager';
import Alert from '../ui/alert';

/**
 * Sincroniza la imagen de fondo según el juego seleccionado.
 * @param {object} props
 * @param {string} props.game - Nombre del juego
 * @param {function} props.setImgPath - Setter para la ruta de la imagen
 * @returns {null}
 */
function SyncImgPath({ game, setImgPath }) {
    useEffect(() => {
        if (game) {
            setImgPath('/media/' + game + '.jpg');
        }
    }, [game, setImgPath]);
    return null;
}

/**
 * Componente principal del tablero de la aplicación.
 * Gestiona la lógica de salas, usuario, imágenes y notificaciones.
 * @param {object} props
 * @param {Array} props.rooms - Lista de salas disponibles
 * @returns {JSX.Element}
 */
export default function MainBoard({ rooms }) {
    const [joinedRoom, setJoinedRoom] = useState(null)
    const [imgPath, setImgPath] = useState('')
    const [opened, setOpened] = useState(false);
    const [attention, setAttention] = useState({
        active: false,
        message: ''
    })
    const [imgStyle, setImgStyle] = useState({
        backgroundImage: `url('../../public/media/call-of-duty-cover-portrait.jpg')`,
        height: `100%`,
        width: `100%`,
        backgroundSize: `cover`,
        backgroundRepeat: `none`,
        padding: `32px`,
    })
    const { user } = useUser();
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const selectRef = useRef();

    useEffect(() => {
        const gamesArr = []
        rooms.forEach(room => {
            gamesArr.push({
                label: room.game.name,
                value: room.game.name
            })
        })
        setImgPath(gamesArr[0] ? '/media/' + gamesArr[0].label + '.jpg' : '')
    }, [rooms])

    useEffect(() => {
        updateImgStyle()
    }, [imgPath])

    /**
     * Actualiza el estilo de la imagen de fondo.
     */
    function updateImgStyle() {
        setImgStyle({
            backgroundImage: `url('${imgPath}')`,
            height: `100%`,
            width: `100%`,
            backgroundSize: `cover`,
            backgroundRepeat: `none`,
            padding: `32px`,
        })
    }

    /**
     * Lógica para unirse o salir de una sala.
     * @param {React.MouseEvent} e
     * @param {string} game - Nombre del juego seleccionado
     */
    function addUser(e, game) {
        if (!game) {
            setAttention({
                active: true,
                message: 'You must select a game before joining a room',
            });
            return;
        }
        if (!user) {
            setAttention({
                active: true,
                message: 'Please log in to join a room',
            });
            return;
        }
        const roomName = e.currentTarget.id;
        const roomToJoin = rooms.filter(room => room.name === roomName);
        if (!roomToJoin.length) {
            setAttention({
                active: true,
                message: 'Room not found',
            });
            return;
        }
        const username = user.username;
        if (joinedRoom && joinedRoom[0].name === roomName) {
            roomToJoin[0].members = roomToJoin[0].members.filter(m => m.toLowerCase() !== username.toLowerCase());
            setJoinedRoom(null);
            setAttention({
                active: true,
                message: 'You left ' + roomName
            });
            setTimeout(() => setAttention({ active: false, message: '' }), 1500);
            return;
        } else {
            // Unirse a la sala: agregar usuario si no está
            if (!roomToJoin[0].members.map(m => m.toLowerCase()).includes(username.toLowerCase())) {
                roomToJoin[0].members.push(username);
            }
            setJoinedRoom(roomToJoin);
            setAttention({
                active: true,
                message: 'You joined ' + roomName
            });
            setTimeout(() => setAttention({ active: false, message: '' }), 1500);
        }
    }

    const toggleMenu = () => {
        setOpened(!opened);
    };

    return (
        <RoomSearchManager rooms={rooms}>
            {({ platform, selectPlatform, games, inputValue, handleChange, handleInputChange, menuOpen, setMenuOpen, search, searchGame, state, states, language, languages, getFilters, filteredRooms, hasSearched, game }) => (
                <>
                    <SyncImgPath game={game} setImgPath={setImgPath} />
                    <div className={styles.mainBoard}>
                        {attention.active && <Alert message={attention.message} onClose={() => setAttention({ active: false, message: '' })} />}
                        <div className={styles.boardSection}>
                            <BoardHeader user={user} />
                        </div>
                        <div className={styles.boardSectionWithBg}>
                            <BoardAd imgStyle={imgStyle} game={game} joinedRoom={joinedRoom} user={user} searchResults={filteredRooms} platform={platform} />
                        </div>
                        <div className={styles.boardSection}>
                            <BoardSteps
                                platform={platform} selectPlatform={selectPlatform} games={games} inputValue={inputValue}
                                handleChange={handleChange} handleInputChange={handleInputChange} menuOpen={menuOpen} setMenuOpen={setMenuOpen}
                                isDark={isDark} search={search} searchGame={searchGame} showFilter={false} setShowFilter={() => {}}
                                languages={languages} states={states} language={language} state={state} getFilters={getFilters}
                                searchResults={filteredRooms} hasSearched={hasSearched} addUser={(e) => addUser(e, game)} selectRef={selectRef}
                                joinedRoom={joinedRoom}
                            />
                        </div>
                        {opened && (
                            <div className={styles.mobileMenuOverlay} onClick={toggleMenu} />
                        )}
                        <ul id="accordion" className={opened ? styles.accordion : styles.accordionHidden}></ul>
                    </div>
                </>
            )}
        </RoomSearchManager>
    )
}