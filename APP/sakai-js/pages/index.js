import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../demo/service/ProductService';
import { LayoutContext } from '../layout/context/layoutcontext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';



const Dashboard = () => {
    const router = useRouter();
    const [products, setProducts] = useState(null);
    const menu1 = useRef(null);
    const menu2 = useRef(null);
    const [lineOptions, setLineOptions] = useState(null);
    const { layoutConfig } = useContext(LayoutContext);

    const [directorData, setDirectorData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://www.megafilms.somee.com/api/Director/List');
            setDirectorData(response.data.data);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, []);

    const maleDirectors = Array.isArray(directorData) ? directorData.filter(director => director.dire_Sexo === 'Masculino').length : 0;
    const femaleDirectors = Array.isArray(directorData) ? directorData.filter(director => director.dire_Sexo === 'Femenino').length : 0;

    const barData = {
        labels: ['Masculino', 'Femenino'],
        datasets: [
          {
            label: 'Directores por Sexo',
            data: [maleDirectors, femaleDirectors],
            backgroundColor: ['#2f4860', '#00bb7e'],
            borderColor: ['#2f4860', '#00bb7e'],
            borderWidth: 2,
          },
        ],
      };
      

    useEffect(()=>{
        if(localStorage.getItem('usuario') == "" || localStorage.getItem('usuario') == null || localStorage.getItem('usuario') == undefined){
            router.push('/auth/login');
        }
        
    }, [])

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };



    return (
        <div className="grid">
            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Insumos</h5>
                    <DataTable value={products} rows={5} paginator responsiveLayout="scroll">
                        <Column header="Imagen" body={(data) => <img className="shadow-2" src={`/demo/images/product/${data.image}`} alt={data.image} width="50" />} />
                        <Column field="name" header="Nombre" sortable style={{ width: '35%' }} />
                       
                    </DataTable>
                </div>
            </div>
            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Cantidad de Directores por Sexo</h5>
                    <Chart type="bar" data={barData} options={lineOptions} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;