import React, { useEffect } from 'react';
import styles from './TelaSplash.module.css';

export default function TelaProcessando({ metodoPagamento, onConcluido }) {
  useEffect(() => {
    const timer = window.setTimeout(onConcluido, 5000);
    return () => window.clearTimeout(timer);
  }, [onConcluido]);

  return (
    <div className={styles["tela-splash"]}>
      <h1 className={styles["texto-iniciar"]}>⏳ Processando seu pedido...</h1>
      <p style={{ fontSize: '1.5rem', marginTop: '20px' }}>
        {metodoPagamento === 'Dinheiro' ? "Dirija-se ao caixa para realizar o pagamento." : "Siga as instruções na máquina de cartão."}
      </p>
    </div>
  );
}