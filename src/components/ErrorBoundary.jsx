import React from 'react';

/**
 * Componente ErrorBoundary para capturar errores de renderizado en React.
 * Muestra una interfaz de error amigable y permite recargar o reintentar.
 * @class
 * @extends React.Component
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {function} [props.onError] - Callback opcional para manejar errores globales
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  /**
   * Actualiza el estado cuando ocurre un error en un hijo.
   * @param {Error} error
   * @returns {object}
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Maneja el error capturado y ejecuta el callback si existe.
   * @param {Error} error
   * @param {object} errorInfo
   */
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({ errorInfo });
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  /**
   * Recarga la página.
   */
  handleReload = () => {
    window.location.reload();
  };

  /**
   * Resetea el estado de error para intentar renderizar de nuevo.
   */
  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: 'var(--background)',
          color: 'var(--dark)',
          fontFamily: 'var(--font-family)'
        }}>
          <div style={{
            maxWidth: '500px',
            padding: '2rem',
            borderRadius: '12px',
            backgroundColor: 'var(--block)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              marginBottom: '1rem',
              color: 'var(--highlight)'
            }}>
              Oops! Something went wrong
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '2rem',
              lineHeight: '1.6',
              color: 'var(--darkgrey)'
            }}>
              An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
            </p>

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button 
                onClick={this.handleReload}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--highlight)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Refresh Page
              </button>
              
              <button 
                onClick={this.handleReset}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'transparent',
                  color: 'var(--dark)',
                  border: '2px solid var(--lightgrey)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = 'var(--hover)';
                  e.target.style.color = 'var(--hover)';
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = 'var(--lightgrey)';
                  e.target.style.color = 'var(--dark)';
                }}
              >
                Try Again
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                marginTop: '2rem',
                textAlign: 'left',
                backgroundColor: 'rgba(0,0,0,0.05)',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: '600' }}>
                  Error Details (Development)
                </summary>
                <pre style={{
                  marginTop: '1rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontSize: '0.8rem',
                  color: 'var(--darkgrey)'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 