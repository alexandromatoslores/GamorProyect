import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaChevronLeft } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import ThemeToggle from "./theme-toggle";
import styles from "./styles.module.css";

/**
 * Componente de barra de navegación para escritorio.
 * Muestra enlaces principales y controles de usuario.
 * @returns {JSX.Element}
 */
function NavbarDesktop() {
  const { user, logout } = useUser();

  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.home}>
        <Link to="/">
          <span className={styles.homeOval}>
            <span className={styles.homeOvalText}>Home</span>
          </span>
        </Link>
      </div>
      <div className={styles.linksContainerLeft}>
        <ul className={styles.linksList}>
          <li className={styles.link}>
            <Link to="/#">Stream</Link>
          </li>
          <li className={styles.link}>
            <Link to="/#">Party</Link>
          </li>
          <li className={styles.link}>
            <Link to="/#">Premium</Link>
          </li>
        </ul>
      </div>
      <div className={styles.titleContainer}>
        <strong>
          <span className={styles.gLupa}>
            G
            <span className={styles.lupaZoom}>
              <span className={styles.lupaZoomInner}>G</span>
            </span>
          </span>
          amor
        </strong>
      </div>
      <div className={styles.linksContainerRight}>
        {user ? (
          <div className={styles.userSection}>
            <img
              src={user.avatar}
              alt={`Avatar de ${user.username}`}
              className={styles.userAvatar}
              width={40}
              height={40}
            />
            <span className={styles.userName}>{user.username}</span>
            <button onClick={logout} className={styles.logoutBtn} aria-label="Cerrar sesión">
              Sign out
            </button>
            <ThemeToggle />
          </div>
        ) : (
          <ul className={styles.linksList}>
            <li className={styles.link}>
              <Link to="/sign-in">Sign In</Link>
            </li>
            <li className={styles.linkBtn}>
              <Link to="/sign-up">Sign up</Link>
            </li>
            <li className={styles.themeToggleItem}>
              <ThemeToggle />
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

/**
 * Componente de barra de navegación para dispositivos móviles.
 * Incluye menú hamburguesa, acordeón y enlaces de usuario.
 * @returns {JSX.Element}
 */
function NavbarMobile() {
  const [opened, setOpened] = useState(false);
  const [funcionesDown, setFuncionesDown] = useState(true);
  const [descargasDown, setDescargasDown] = useState(true);
  const { isLoaded, isSignedIn, user, logout } = useUser();
  const location = useLocation();
  const accordionRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!opened) return;
    function handleClickOutside(e) {
      if (
        accordionRef.current &&
        !accordionRef.current.contains(e.target) &&
        !e.target.closest(`.${styles.hamburguer}`)
      ) {
        setOpened(false);
        const accordion = document.getElementById("accordion");
        if (accordion) accordion.className = styles.accordionHidden;
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [opened]);

  /**
   * Alterna la visibilidad del menú móvil (acordeón).
   */
  function toggleMenu() {
    const accordion = document.getElementById("accordion");
    if (!accordion) return;
    if (accordion.className === styles.accordionHidden) {
      accordion.className = styles.accordion;
      setOpened(true);
      return;
    }
    if (accordion.className === styles.accordion) {
      accordion.className = styles.accordionHidden;
      setOpened(false);
    }
  }

  useEffect(() => {
    if (!opened) return;
    const handleScroll = () => {
      if (accordionRef.current) {
        setScrolled(accordionRef.current.scrollTop > 0);
      }
    };
    const ref = accordionRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (ref) {
        ref.removeEventListener('scroll', handleScroll);
      }
    };
  }, [opened]);

  /**
   * Alterna la visibilidad de los dropdowns del menú móvil.
   * @param {string} id - ID del dropdown a alternar
   */
  function dropdownClick(id) {
    const dropdown = document.getElementById(id);
    if (!dropdown) return;
    if (id === "descargas-dropdown") {
      setDescargasDown(!descargasDown);
    } else if (id === "funciones-dropdown") {
      setFuncionesDown(!funcionesDown);
    }
    if (dropdown.className === styles.accordionDropdownHidden) {
      dropdown.className = styles.accordionDropdown;
      return;
    }
    if (dropdown.className === styles.accordionDropdown) {
      dropdown.className = styles.accordionDropdownHidden;
    }
  }

  const links = [
    { to: "/", label: "Home" },
    { to: "/stream", label: "Stream" },
    { to: "/party", label: "Party" },
    { to: "/premium", label: "Premium" },
  ];
  const authLinks = [
    { to: "/sign-in", label: "Sign In" },
    { to: "/sign-up", label: "Sign up" },
  ];

  return (
    <nav aria-label="Mobile navigation">
      <div className={styles.navbarMobile}>
        <div className={styles.hamburguer}>
          <button onClick={toggleMenu} aria-label={opened ? "Cerrar menú" : "Abrir menú"} style={{ minWidth: 38, minHeight: 38, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {opened ? (
              <FaChevronLeft style={{ color: `var(--dark)` }} size={22} />
            ) : (
              <FaBars size={24} style={{ color: `var(--dark)` }} />
            )}
          </button>
        </div>
        <div className={styles.mobileTitleContainer}><strong>Gamor</strong></div>
        <div className={styles.themeToggleMobile}>
          <ThemeToggle />
        </div>
      </div>
      {opened && (
        <div
          className={styles.mobileMenuOverlay}
          onClick={toggleMenu}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999 }}
          aria-label="Cerrar menú móvil"
        />
      )}
      <div>
        <ul
          id="accordion"
          ref={accordionRef}
          className={
            opened
              ? `${styles.accordion} ${scrolled ? styles.accordionScrolled : ''}`
              : styles.accordionHidden
          }
          style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 24px)' }}
        >
          {links.map((link) => (
            <li
              key={link.to}
              className={
                location.pathname === link.to
                  ? `${styles.linkBtn} ${styles.activeLink}`
                  : styles.linkBtn
              }
              onClick={toggleMenu}
            >
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
          {!user && authLinks.map((link) => (
            <li
              key={link.to}
              className={
                location.pathname === link.to
                  ? `${styles.linkBtn} ${styles.activeLink}`
                  : styles.linkBtn
              }
              onClick={toggleMenu}
            >
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
          {user && (
            <li className={styles.linkBtn}>
              <a
                href="#"
                tabIndex={0}
                onClick={e => {
                  e.preventDefault();
                  setOpened(false);
                  logout();
                }}
              >
                Sign out
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

/**
 * Componente principal de Navbar. Renderiza la versión móvil o escritorio según el tamaño de pantalla.
 * @returns {JSX.Element}
 */
export default function Navbar() {
  const [windowSize, setWindowSize] = useState([0, 0]);

  useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return windowSize[0] < 760 ? <NavbarMobile /> : <NavbarDesktop />;
}