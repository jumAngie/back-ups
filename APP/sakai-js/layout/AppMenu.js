import React, { useContext, useEffect, useRef, useState } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import axios from "axios";

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const [menuItems, setMenuItems] = useState([]);
    let rol_id = null;
    let esAdmin = null;


    if (typeof window !== 'undefined') {
        rol_id = localStorage.getItem('id_rol');
        esAdmin = localStorage.getItem('EsAdmin');
    }
    useEffect(() => {
        // Aquí llamarías a la API para obtener los datos del menú
        fetch(`https://localhost:44312/api/RolPantallas/DibujarMenu/${rol_id},${esAdmin}`)
          .then(response => response.json())
          .then(data => setMenuItems(data.data));
      }, []);

      return (
        <MenuProvider>
            <br>
            </br>
            <center style={{color: 'gray', fontWeight: 'bold'}}><h4>Menú</h4></center>
            <ul className="layout-menu">
                {menuItems && menuItems.map(item => (
                    <li key={item.panta_Menu} className="menu-item">
                        <Link href={{ pathname: item.panta_to }}>
                            <i style={{color: 'black', fontWeight: 'bold'}} className={item.icon}></i>
                            <span style={{color: 'gray', fontWeight: 'bold'}}>{item.panta_label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <style jsx>{`
                a,
                Link {
                  text-decoration: none;
                  color: #000;
                }
                .layout-menu {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    list-style-type: none;
                    padding: 0;
                    margin-top: 20px;
                }

                .menu-item {
                    margin-bottom: 10px;
                    padding: 5px 10px;
                    border-radius: 5px;
                    background-color: #f5f5f5;
                }

                .menu-item:hover {
                    background-color: #d5d5d5;
                }

                .menu-item a {
                    color: #000000;
                    text-decoration: none;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }

                .menu-item i {
                    margin-right: 10px;
                }
            `}</style>
        </MenuProvider>
    );
};

export default AppMenu;
