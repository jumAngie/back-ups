


using Cine.BusinessLogic.Services.Access;
using Cine.BusinessLogic.Services.Cine;
using Cine.BusinessLogic.Services.General;
using Cine.DataAccess;
using Cine.DataAccess.Context;
using Cine.DataAccess.Repository;
using Cine.DataAccess.Repository.Cine;
using Cine.DataAccess.Repository.Acce;
using Cine.DataAccess.Repository.Gral;
using Microsoft.Extensions.DependencyInjection;

namespace Cine.BusinessLogic
{
    public static class ServiceConfiguration
    {
        public static void DataAccess(this IServiceCollection service, string connectionString)
        {// AddScoped de los repositorios


            //SCHEMA ACCESS
            service.AddScoped<UsuarioRepository>();
            service.AddScoped<PantallasRepository>();
            service.AddScoped<RolRepository>();
            service.AddScoped<RolPantallasRepository>();

            //SCHEMA CINE
            service.AddScoped<DirectorRepository>();
            service.AddScoped<InsumoRepository>();
            service.AddScoped<SucursalesRepository>();
            service.AddScoped<PeliculasRepository>();
            service.AddScoped<CombosRepository>();
            service.AddScoped<ComboDetallesRepository>();
            service.AddScoped<FacturaDetallesRepository>();
            service.AddScoped<FacturasRepository>();
            service.AddScoped<SalaRepository>();

            //SCHEMA GENERAL
            service.AddScoped<EmpleadoRepository>();
            service.AddScoped<DepartamentoRepository>();
            service.AddScoped<EstadoCivilRepository>();
            service.AddScoped<CargoRepository>();
            service.AddScoped<CategoriasRepository>();
            service.AddScoped<ClientesRepository>();
            service.AddScoped<MetodoPagoRepository>();
            service.AddScoped<MunicipioRepository>();

            CineContext.BuildConnectionString(connectionString);
        }

        public static void BusinessLogic(this IServiceCollection service)
        {//AddScoped de los servicios 


            service.AddScoped<GeneralService>();
            service.AddScoped<CineService>();
            service.AddScoped<AccessService>();
        }
    }
}
