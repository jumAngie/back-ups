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
                { label: 'Categorías', icon: 'pi pi-fw pi-bars', to: '/uikit/Categorias' },
                { label: 'Empleados', icon: 'pi pi-fw pi-user', to: '/uikit/Empleados' },
                { label: 'Método de Pago', icon: 'pi pi-fw pi-credit-card', to: '/uikit/MetodosPago' },
              
            ]
        },
        {
            label: 'Menu Administraivo',
            items: [
                { label: 'Directores', icon: 'pi pi-fw pi-users', to: '/uikit/Director' },
                { label: 'Insumos', icon: 'pi pi-fw pi-apple', to: '/uikit/Insumo' },
                { label: 'Sucursales', icon: 'pi pi-fw pi-building', to: '/uikit/Sucursal' },
                { label: 'Combos', icon: 'pi pi-fw pi-star-fill', to: '/uikit/Combos' },
                { label: 'Peliculas', icon: 'pi pi-fw pi-eye', to: '/uikit/Peliculas' },
                { label: 'Factura', icon: 'pi pi-fw pi-bookmark', to: '/uikit/Factura' },
            ]
        },
        {
            label: 'Menu Seguridad',
            items: [
                { label: 'Roles', icon: 'pi pi-fw pi-cog', to: '/uikit/table' },
                { label: 'Usuario', icon: 'pi pi-fw pi-id-card', to: '/uikit/Usuarios' },
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
