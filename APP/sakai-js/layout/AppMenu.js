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
                { label: 'Directores', icon: 'pi pi-fw pi-users', to: '/uikit/Director' },
                { label: 'Insumos', icon: 'pi pi-fw pi-apple', to: '/uikit/Insumo' },
                { label: 'Sucursales', icon: 'pi pi-fw pi-amazon', to: '/uikit/Sucursal' },
                { label: 'Usuario', icon: 'pi pi-fw pi-globe', to: '/uikit/Usuarios' },
                { label: 'Peliculas', icon: 'pi pi-fw pi-eye', to: '/uikit/Peliculas' },
                { label: 'Categorías', icon: 'pi pi-fw pi-bookmark', to: '/uikit/Categorias' },
                { label: 'Combos', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/Combos' },
                { label: 'Método de Pago', icon: 'pi pi-fw pi-briefcase', to: '/uikit/MetodosPago' },
               

              
            ]
        },
        {
            label: 'Menu Administraivo',
            items: [
                { label: 'Empleados', icon: 'pi pi-fw pi-id-card', to: '/uikit/Empleados' },
                { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://blocks.primereact.org', target: '_blank' }
            ]
        },
        {
            label: 'Menu Seguridad',
            items: [
                { label: 'Roles', icon: 'pi pi-fw pi-user', to: '/uikit/Roles' },
                { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://blocks.primereact.org', target: '_blank' }
            ]
        },
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                <Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>
                    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
                </Link>
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
