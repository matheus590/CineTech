import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TelaSplash.module.css';

const banner = '/img/meat_stack.jpeg';

export default function TelaSplash({ executarComAtraso }) {
    const navegar = useNavigate();
    return (
        <div
            className={styles['tela-splash']}
            onClick={() => executarComAtraso(() => navegar('/local'))}>
            <img
                className={styles['banner-placeholder']}
                src={banner}
                alt="Hambúrguer da OrderTech"
            />
            <h1 className={styles['texto-iniciar']}>Toque para iniciar</h1>
        </div>
    );
}
