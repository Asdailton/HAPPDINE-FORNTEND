import React, { useState, useEffect } from 'react';
import estilos from './ConteudoInicio.module.css';
import banner from '../../image/DineMatch/banner.png'

export function ConteudoInicio() {
    return (
        <div className={estilos.container}>
            <img src={banner} className={estilos.banner} alt="Banner"></img>
        </div>
    );
}
