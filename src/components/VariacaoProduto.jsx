import React from 'react';
import styles from './VariacaoProduto.module.css';
import ProdutoCard from './ProdutoCard';

export default function VariacaoProduto({ produtoAtivo, selecionarVariacao, executarComAtraso, setProdutoAtivo }) {
  return (
    <div className={styles["options-container"]}>
      <button className={styles["btn-voltar-inline"]} onClick={() => executarComAtraso(() => setProdutoAtivo(null))}>Voltar</button>
      <h2>Escolha a opção:</h2>
      <div className={styles["produtos-grid"]}>
        {produtoAtivo.category.name === 'Lanches' ? (
          <>
            <ProdutoCard
              produto={produtoAtivo}
              onClick={() => selecionarVariacao('Só o Lanche', 0)}
              nomeOpcao="Só o Lanche"
            />
            <ProdutoCard
              produto={produtoAtivo}
              onClick={() => selecionarVariacao('Combo', 15)}
              nomeOpcao="Combo"
              precoExtra={15}
              iconeVisual="🍟🥤"
            />
          </>
        ) : produtoAtivo.category.name === 'Acompanhamentos' || produtoAtivo.category.name === 'Bebidas' ? (
          <>
            <ProdutoCard
              produto={produtoAtivo}
              onClick={() => selecionarVariacao('Pequeno', 0)}
              nomeOpcao="Pequeno"
              fontSize="2rem"
            />
            <ProdutoCard
              produto={produtoAtivo}
              onClick={() => selecionarVariacao('Médio', 3.00)}
              nomeOpcao="Médio"
              precoExtra={3.00}
              fontSize="2.8rem"
            />
            <ProdutoCard
              produto={produtoAtivo}
              onClick={() => selecionarVariacao('Grande', 5.00)}
              nomeOpcao="Grande"
              precoExtra={5.00}
              fontSize="3.5rem"
            />
          </>
        ) : (
          <ProdutoCard
            produto={produtoAtivo}
            onClick={() => selecionarVariacao('Porção Única', 0)}
            nomeOpcao="Porção Única"
          />
        )}
      </div>
    </div>
  );
}
