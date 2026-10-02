import React from 'react';
import styles from './ProdutoCard.module.css';

export default function ProdutoCard({ produto, onClick, nomeOpcao, precoExtra, iconeVisual, fontSize }) {
  const precoCalculado = produto.price + (precoExtra || 0);
  const nomeExibicao = nomeOpcao || produto.name;
  const imagemExibicao = iconeVisual || produto.image;
  const imagemArquivo = typeof imagemExibicao === 'string' && /^(https?:|\/|data:)/.test(imagemExibicao);
  
  return (
    <div className={styles["produto-card"]} onClick={onClick}>
      <div className={styles["produto-img"]} style={fontSize ? { fontSize } : {}}>
        {imagemArquivo ? <img src={imagemExibicao} alt={produto.name} /> : imagemExibicao}
      </div>
      <h3>{nomeExibicao}</h3>
      <p>R$ {precoCalculado.toFixed(2).replace('.', ',')}</p>
    </div>
  );
}
