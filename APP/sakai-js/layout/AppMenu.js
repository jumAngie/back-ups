import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model = [
        {
            label: 'Inicio',
            items: [{ label: 'Principal', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'Menu General',
            items: [
                { label: 'Categorías', icon: 'pi pi-fw pi-bookmark', to: '/uikit/Categorias' },
                { label: 'Empleados', icon: 'pi pi-fw pi-id-card', to: '/uikit/Empleados' },
                { label: 'Método de Pago', icon: 'pi pi-fw pi-briefcase', to: '/uikit/MetodosPago' },
                { label: 'Prueba', icon: 'pi pi-fw pi-bookmark', to: '/uikit/table' },
              
            ]
        },
        {
            label: 'Menu Administraivo',
            items: [
                { label: 'Directores', icon: 'pi pi-fw pi-users', to: '/uikit/Director' },
                { label: 'Insumos', icon: 'pi pi-fw pi-apple', to: '/uikit/Insumo' },
                { label: 'Sucursales', icon: 'pi pi-fw pi-amazon', to: '/uikit/Sucursal' },
                { label: 'Combos', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/Combos' },
                { label: 'Peliculas', icon: 'pi pi-fw pi-eye', to: '/uikit/Peliculas' },
            ]
        },
        {
            label: 'Menu Seguridad',
            items: [
                { label: 'Roles', icon: 'pi pi-fw pi-user', to: '/uikit/Roles' },
                { label: 'Usuario', icon: 'pi pi-fw pi-globe', to: '/uikit/Usuarios' },
            ]
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

               
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
