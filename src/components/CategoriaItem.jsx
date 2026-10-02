import React from 'react';
import styles from './CategoriaItem.module.css';

export default function CategoriaItem({ categoria, categoriaSelecionada, executarComAtraso, setCategoriaSelecionada, getIconeCategoria }) {
  return (
    <div
      className={styles["categoria-item"] + " " + (categoriaSelecionada === categoria.id ? styles["categoria-ativa"] : '')}
      onClick={() => executarComAtraso(() => setCategoriaSelecionada(categoria.id))}
    >
      <span style={{ fontSize: '2rem', marginBottom: '5px' }}>{getIconeCategoria(categoria.name)}</span>
      {categoria.name}
    </div>
  );
}
