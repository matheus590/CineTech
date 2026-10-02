import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TelaLocal.module.css';

export default function TelaLocal({ executarComAtraso, setLocal }) {
  const navegar = useNavigate();

  const escolherLocal = (opcaoLocal) => {
    executarComAtraso(() => {
      setLocal(opcaoLocal);
      navegar('/menu');
    });
  };

  return (
    <div className={styles["tela-local"]}>
      <h2 className={styles["titulo"]}>Como deseja receber seu pedido?</h2>
      <div className={styles["opcoes-local"]}>
        <button className={styles["opcao-card"]} onClick={() => escolherLocal('Comer Aqui')}>
          <span className={styles["icone-local"]}>🍽️</span>
          <h2>Comer Aqui</h2>
        </button>
        <button className={styles["opcao-card"]} onClick={() => escolherLocal('Levar')}>
          <span className={styles["icone-local"]}>🛍️</span>
          <h2>Levar</h2>
        </button>
      </div>
    </div>
  );
}