import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import styles from './Totem.module.css';
import TelaSplash from './TelaSplash';
import TelaLocal from './TelaLocal';
import TelaMenu from './TelaMenu';
import TelaResumo from './TelaResumo';
import TelaModificarItem from './TelaModificarItem';
import TelaPagamento from './TelaPagamento';
import TelaProcessando from './TelaProcessando';
import TelaSucesso from './TelaSucesso';
import { categoriasDados, produtosDados } from '../data/menuDados';

export default function Totem() {
  const navegar = useNavigate();

  const [local, setLocal] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  const [carrinho, setCarrinho] = useState([]);
  const [itemParaModificar, setItemParaModificar] = useState(null);
  const [indiceModificacao, setIndiceModificacao] = useState(-1);
  const [metodoPagamento, setMetodoPagamento] = useState('');
  const [numeroPedido, setNumeroPedido] = useState(null);

  const executarComAtraso = (acao) => {
    setTimeout(() => {
      acao();
    }, 150);
  };

  useEffect(() => {
    setCategorias(categoriasDados);
    if (categoriasDados.length > 0) setCategoriaSelecionada(categoriasDados[0].id);
  }, []);

  useEffect(() => {
    if (categoriaSelecionada) {
      setProdutos(produtosDados.filter(p => p.categoryId === categoriaSelecionada));
    }
  }, [categoriaSelecionada]);

  const cancelarPedido = () => {
    setCarrinho([]);
    setLocal('');
    setMetodoPagamento('');
    setNumeroPedido(null);
    setItemParaModificar(null);
    setIndiceModificacao(-1);
    navegar('/');
  };

  const processarPagamento = (metodo) => {
    setMetodoPagamento(metodo);
    navegar('/processando');
  };

  const concluirProcessamento = useCallback(() => {
    setNumeroPedido(1000 + Math.floor(Math.random() * 9000));
    navegar('/sucesso');
  }, [navegar]);

  const finalizarAtendimento = useCallback(() => {
    setCarrinho([]);
    setLocal('');
    setMetodoPagamento('');
    setNumeroPedido(null);
    setItemParaModificar(null);
    setIndiceModificacao(-1);
    navegar('/');
  }, [navegar]);

  return (
    <div className={styles["totem-wrapper"]}>
      <Routes>
        <Route path="/" element={<TelaSplash executarComAtraso={executarComAtraso} />} />

        <Route path="/local" element={<TelaLocal executarComAtraso={executarComAtraso} setLocal={setLocal} />} />

        <Route path="/menu" element={!local ? <Navigate to="/local" replace /> :
          <TelaMenu
            categorias={categorias}
            produtos={produtos}
            categoriaSelecionada={categoriaSelecionada}
            setCategoriaSelecionada={setCategoriaSelecionada}
            carrinho={carrinho}
            setCarrinho={setCarrinho}
            executarComAtraso={executarComAtraso}
            local={local}
            cancelarPedido={cancelarPedido}
          />
        } />

        <Route path="/resumo" element={carrinho.length === 0 ? <Navigate to={local ? '/menu' : '/local'} replace /> :
          <TelaResumo
            carrinho={carrinho}
            setCarrinho={setCarrinho}
            executarComAtraso={executarComAtraso}
            setItemParaModificar={setItemParaModificar}
            setIndiceModificacao={setIndiceModificacao}
          />
        } />

        <Route path="/modificar" element={!itemParaModificar || indiceModificacao < 0 ? <Navigate to="/resumo" replace /> :
          <TelaModificarItem
            itemParaModificar={itemParaModificar}
            setItemParaModificar={setItemParaModificar}
            indiceModificacao={indiceModificacao}
            carrinho={carrinho}
            setCarrinho={setCarrinho}
            executarComAtraso={executarComAtraso}
          />
        } />

        <Route path="/pagamento" element={carrinho.length === 0 ? <Navigate to={local ? '/menu' : '/local'} replace /> :
          <TelaPagamento
            executarComAtraso={executarComAtraso}
            processarPagamento={processarPagamento}
          />
        } />

        <Route path="/processando" element={!metodoPagamento || carrinho.length === 0 ? <Navigate to={local ? '/menu' : '/local'} replace /> :
          <TelaProcessando metodoPagamento={metodoPagamento} onConcluido={concluirProcessamento} />
        } />

        <Route path="/sucesso" element={!numeroPedido ? <Navigate to={local ? '/menu' : '/local'} replace /> :
          <TelaSucesso numeroPedido={numeroPedido} onFinalizar={finalizarAtendimento} />
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
