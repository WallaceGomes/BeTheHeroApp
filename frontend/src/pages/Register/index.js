import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
 
import logoImg from '../../assets/logo.svg';

import './styles.css';

//UF style > objeto javascript de css inline

export default function Resgister() {
    return(
        <div className ="register-container">
            <div className="content">
                <section>
                    <img src={logoImg}  alt="Be The Hero"></img>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas e ONGs.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Faça login
                    </Link>
                </section>
                <form>
                    <input type="text" placeholder="Nome da ONG" />
                    <input type="email" placeholder="Email" />
                    <input type="text" placeholder="Whatsapp" />

                    <div className="input-group">
                        <input type="text" placeholder="Cidade" />
                        <input type="text" placeholder="UF" style={{ width: 80 }} />
                    </div>

                    <button className="button" type="submit" >Cadastro</button>
                </form>
            </div>
        </div>
    );
}