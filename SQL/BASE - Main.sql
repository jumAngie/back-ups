/*
DROP DATABASE databaseCine

DROP SCHEMA cine
GO
DROP SCHEMA acce
GO
DROP SCHEMA gral

*/
 
--CREATE DATABASE db_Cine
--GO
--USE db_Cine
--GO 



CREATE SCHEMA cine
GO
CREATE SCHEMA acce
GO
CREATE SCHEMA gral
GO 
---------------------------------------tbUsuarios-------------------------------------
go
CREATE TABLE acce.tbUsuarios(
	user_Id						INT IDENTITY(1,1),
	user_NombreUsuario			NVARCHAR(200)		NOT	NULL,
	user_Contrasenia			VARCHAR(250)		NOT NULL,
	user_Empleado				INT					NOT NULL,
	user_Rol					INT					,
	user_EsAdmin				BIT					,

	user_Estado					BIT DEFAULT 1		NOT NULL,
	user_UsuarioCrea		    INT					NOT NULL,
	user_FechaCrea				DATETIME DEFAULT GETDATE() NOT NULL,
	user_UsuarioModifica	    INT,
	user_FechaModifica			DATETIME,

	CONSTRAINT PK_acce_tbUsuarios_user_Id PRIMARY KEY (user_Id),
	CONSTRAINT UQ_acce_tbUsuarios_user_NombreUsuario UNIQUE (user_NombreUsuario)
 ); 

				--///***************** INSERTS DE USUARIOS --///*****************
DECLARE @User NVARCHAR(100) = 'Admin'
DECLARE @CLAVE2 VARBINARY (MAX) = HASHBYTES('SHA2_512','Admin')
DECLARE @INCRI2 VARCHAR(MAX) = CONVERT(VARCHAR(MAX),@CLAVE2,2)

INSERT INTO [acce].[tbUsuarios]
						(user_NombreUsuario, user_Contrasenia, user_Empleado, user_Rol, user_EsAdmin, user_UsuarioCrea)
						VALUES
						(@User,               @INCRI2,          1,          1 ,			1,             1)
GO

---------------------------------------tbRoles-------------------------------------

CREATE TABLE acce.tbRoles(
	role_Id					INT IDENTITY,
	role_Nombre				NVARCHAR(100)	NOT NULL,

	role_UsuCreacion		INT				NOT NULL,
	role_FechaCreacion		DATETIME		NOT NULL CONSTRAINT DF_tbRoles_role_FechaCreacion DEFAULT(GETDATE()),
	role_UsuModificacion	INT,
	role_FechaModificacion	DATETIME,
	role_Estado				BIT				NOT NULL CONSTRAINT DF_tbRoles_role_Estado DEFAULT(1)

	CONSTRAINT PK_acce_tbRoles_role_Id PRIMARY KEY(role_Id),

	-- USUARIOS CONSTRAINTS --
	CONSTRAINT FK_gral_tbRoles_role_UsuCreacion_acce_tbUsuarios_userId		FOREIGN KEY (role_UsuCreacion)		REFERENCES acce.tbUsuarios (user_Id),
	CONSTRAINT FK_gral_tbRoles_role_UsuModificacion_acce_tbUsuarios_userId		FOREIGN KEY (role_UsuModificacion)	REFERENCES acce.tbUsuarios (user_Id)
  );
GO
						--///***************** INSERTS DE ROLES --///*****************
								INSERT INTO acce.tbRoles(role_Nombre, role_UsuCreacion)
								VALUES('Digitador', 1);
								GO

								INSERT INTO acce.tbRoles(role_Nombre, role_UsuCreacion)
								VALUES('Visualizador', 1);
								GO

								INSERT INTO acce.tbRoles(role_Nombre, role_UsuCreacion)
								VALUES('Miembro',1);
								GO

							-- AÑADO EL CONSTRAINT PARA LA TABLA DE USUARIOS (USER_ROL)
ALTER TABLE acce.tbUsuarios
	ADD CONSTRAINT FK_gral_tbUsuarios_user_Rol_acce_tbRoles_role_Id	FOREIGN KEY (user_Rol) REFERENCES acce.tbRoles (role_Id)
GO

---------------------------------------tbPantallas-------------------------------------
CREATE TABLE acce.tbPantallas(
		panta_Id				INT IDENTITY(1,1),
		panta_Descripcion		NVARCHAR(MAX)			NOT NULL,
		panta_Menu				NVARCHAR(MAX)			,
		panta_label				NVARCHAR(MAX)			,
		panta_to				NVARCHAR(MAX)			,
		icon					NVARCHAR(MAX)			,

		panta_Estado			BIT DEFAULT 1			,
		panta_UserCrea			INT						NOT NULL,
		panta_FechaCrea			DATETIME DEFAULT GETDATE(),
		panta_UserMofica	    INT,
		panta_FechaModifica		DATETIME

		CONSTRAINT PK_acce_tbPantallas_panta_Id PRIMARY KEY(panta_Id)
);
GO
				--///***************** INSERTS DE PANTALLAS --///*****************
INSERT INTO acce.tbPantallas(panta_Descripcion, panta_UserCrea, panta_Menu, panta_label, panta_to, icon)
VALUES
							('Empleados', 1, 'Menu General', 'Empleados', '/uikit/Empleados', 'pi pi-fw pi-user'),
							('Salas', 1, 'Menu Administraivo', 'Salas', '/uikit/Salas', 'pi pi-fw pi-inbox'),
							('Insumos', 1, 'Menu Administraivo', 'Insumos', '/uikit/Insumo', 'pi pi-fw pi-apple'),							('Metodos de Pago', 1, 'Menu General', 'Método de Pago', '/uikit/MetodosPago', 'pi pi-fw pi-credit-card'),
							('Peliculas', 1, 'Menu Administraivo', 'Peliculas', '/uikit/Peliculas', 'pi pi-fw pi-eye'),
							('Directores', 1, 'Menu Administraivo', 'Directores', '/uikit/Director', 'pi pi-fw pi-users'),
							('Categorias', 1, 'Menu General', 'Categorías', '/uikit/Categorias', 'pi pi-fw pi-bars'),
							('Proyecciones', 1, 'Menu Administraivo', 'Proyecciones', '/uikit/Proyeccion', 'pi pi-fw pi-video'),
							('Sucursales', 1, 'Menu Administraivo', 'Sucursales', '/uikit/Sucursal', 'pi pi-fw pi-building'),
							('Facturas', 1, 'Menu Administraivo', 'Factura', '/uikit/Factura', 'pi pi-fw pi-bookmark'),
							('Usuarios', 1, 'Menu Seguridad', 'Usuario', '/uikit/Usuarios', 'pi pi-fw pi-id-card'),
							('Roles', 1, 'Menu Seguridad', 'Roles', '/uikit/table', 'pi pi-fw pi-cog'),
							('Clientes', 1, 'Menu General', 'Clientes', '/uikit/Clientes', 'pi pi-user-plus');
GO

---------------------------------------tbRolesPantallas-------------------------------------
CREATE TABLE acce.tbRolesPantallas(
			
		ropa_Id				INT IDENTITY(1,1),
		ropa_Rol			INT					NOT NULL,
		ropa_Pantalla		INT					NOT NULL,
		ropa_Estado			BIT DEFAULT 1	    NOT NULL,
		ropa_UserCrea		INT					NOT NULL,
		ropa_FechaCrea		DATETIME DEFAULT GETDATE(),
		ropa_UserMofica		INT,
		ropa_FechaModifica	DATETIME


		CONSTRAINT PK_acce_tbRolesPantallas_ropa_Id PRIMARY KEY (ropa_Id),
		CONSTRAINT FK_acce_tbRolesPantallas_ropa_Rol_acce_tbRoles_role_Id			FOREIGN KEY (ropa_Rol)		REFERENCES acce.tbRoles (role_Id),
		CONSTRAINT FK_acce_tbRolesPantallas_ropa_Pantalla_acce_tbPantallas_panta_Id	FOREIGN KEY (ropa_Pantalla) REFERENCES acce.tbPantallas (panta_Id),

		-- USUARIOS CONSTRAINTS --
	CONSTRAINT FK_acce_tbRolesPantallas_ropa_UserCrea_acce_tbUsuarios_userId			FOREIGN KEY (ropa_UserCrea)		REFERENCES acce.tbUsuarios (user_Id),
	CONSTRAINT FK_acce_tbRolesPantallas_ropa_UsuarioModifica_acce_tbUsuarios_userId		FOREIGN KEY (ropa_UserMofica)	REFERENCES acce.tbUsuarios (user_Id)
  );

			--///***************** INSERTS DE ROLES X PANTALLAS --///*****************
 INSERT INTO acce.tbRolesPantallas(ropa_Rol, ropa_Pantalla, ropa_UserCrea)
 VALUES								(1,           1,              1),
									(1,           2,              1),
									(1,           3,              1),
									(1,           4,              1),
									(1,           5,              1),

									(2,           6,              1),
									(2,           8,              1),
									(2,           7,              1),
									(2,           9,              1),
									(2,           10,              1),

									(3,           11,              1),
									(3,           12,              1);
								
 GO
-------------------------------------tbDepartamentos----------------------------------
 CREATE TABLE [gral].[tbDepartamentos](
	 [dept_Id]				INT	IDENTITY(1,1),
	 [dept_Descripcion]		NVARCHAR(200)		NOT NULL,
	 [dept_Estado]			BIT DEFAULT 1		NOT NULL,
	 [dept_UserCrea]		INT					NOT NULL,
	 [dept_FechaCrea]		DATETIME DEFAULT GETDATE(),
	 [dept_UserMofica]	    INT,
	 [dept_FechaModifica]	DATETIME

	 CONSTRAINT PK_gral_tbDepartamentos_dept_Id PRIMARY KEY([dept_Id]),
	 CONSTRAINT UQ_gral_tbDepartamentos_dept_Descripcion UNIQUE([dept_Descripcion]),
 
	-- USUARIOS CONSTRAINTS --
	CONSTRAINT FK_gral_tbDepartamentos_dept_dept_UserCrea_acce_tbUsuarios_userId		FOREIGN KEY (dept_UserCrea)		REFERENCES acce.tbUsuarios (user_Id),
	CONSTRAINT FK_gral_tbDepartamentos_dept_UsuarioModifica_acce_tbUsuarios_userId		FOREIGN KEY (dept_UserMofica)	REFERENCES acce.tbUsuarios (user_Id)
  );

 GO
					--///***************** INSERTS DE DEPARTAMENTOS --///*****************
 INSERT INTO gral.tbDepartamentos(dept_Descripcion, dept_UserCrea)
									VALUES	('Atlantida',		    1 ),
											('Colon',			    1 ),
											('Comayagua',		    1 ),
											('Copan',			    1 ),
											('Cortes',			    1 ),
											('Choluteca',		    1 ),
											('El Paraiso',		    1 ),
											('Francisco Morazan',   1 ),
											('Gracias a Dios',	    1 ),
											('Intibuca',		    1 ),
											('Islas de la Bahia',   1 ),
											('La Paz',			    1 ),
											('Lempira',			    1 ),
											('Ocotepeque',		    1 ),
											('Olancho',			    1 ),
											('Santa Barbara',	    1 ),
											('Valle',			    1 ),
											('Yoro',			    1 );

 -------------------------------------tbMunicipios------------------------------------

 CREATE TABLE [gral].[tbMunicipios](
	 [muni_Id]				INT IDENTITY (1,1),
	 [muni_depId]			INT						NOT NULL,
	 [muni_Descripcion]		NVARCHAR(200)			NOT NULL,
	 [muni_Estado]			BIT DEFAULT 1			NOT NULL,
	 [muni_UserCrea]		INT						NOT NULL,
	 [muni_FechaCrea]		DATETIME DEFAULT GETDATE(),
	 [muni_UserMofica]		INT,
	 [muni_FechaModifica]	DATETIME

	 CONSTRAINT PK_gral_tbMunicipios_muni_Id PRIMARY KEY(muni_Id),
	 CONSTRAINT FK_gral_tbMunicipios_dept_Id FOREIGN KEY (muni_depId) REFERENCES gral.tbDepartamentos ([dept_Id]),

	-- USUARIOS CONSTRAINTS --
	CONSTRAINT FK_gral_tbMunicipios_muni_UserCrea_acce_tbUsuarios_userId		FOREIGN KEY (muni_UserCrea)		REFERENCES acce.tbUsuarios (user_Id),
	CONSTRAINT FK_gral_tbMunicipios_muni_UserMofica_acce_tbUsuarios_userId		FOREIGN KEY (muni_UserMofica)	REFERENCES acce.tbUsuarios (user_Id)
  );

					 --///***************** INSERTS DE MUNICIPIOS --///*****************
  INSERT INTO Gral.tbMunicipios(	muni_depId, muni_Descripcion, muni_UserCrea)
							VALUES   ( 1, 'La Ceiba',				   1),
									 ( 1, 'Tela',					   1),
									 ( 1, 'La Masica',				   1),
									 ( 1, 'Arizona',				   1),
									 ( 1, 'Jutiapa',				   1),
									 ( 1, 'El Porvenir',			   1),
									 ( 1, 'Esparta',				   1),
									 ( 1, 'San Francisco',			   1),
									 ( 2, 'Trujillo',				   1),
									 ( 2, 'Balfate',				   1),
									 ( 2, 'Iriona',					   1),
									 ( 2, 'Limon',					   1),
									 ( 2, 'Saba',					   1),
									 ( 2, 'Santa Fe',				   1),
									 ( 2, 'Santa Rosa de Aguan',	   1),
									 ( 2, 'Sonaguera',				   1),
									 ( 2, 'Tocoa',					   1),
									 ( 2, 'Bonito Oriental',		   1),
									 ( 3, 'Comayagua',				   1),
									 ( 3, 'Ajuterique',				   1),
									 ( 3, 'El Rosario',				   1),
									 ( 3, 'Esquias',				   1),
									 ( 3, 'Humuya',					   1),
									 ( 3, 'La Libertad',			   1),
									 ( 3, 'Lamani',					   1),
									 ( 3, 'La Trinidad',			   1),
									 ( 3, 'Lejamani',				   1),
									 ( 3, 'Meambar',				   1),
									 ( 3, 'Minas de Oro',			   1),
									 ( 3, 'Ojos de Agua',			   1),
									 ( 3, 'San Jeronimo',			   1),
									 ( 3, 'San Jose de Comayagua',	   1),
									 ( 3, 'San Jose del Potrero',	   1),
									 ( 3, 'San Luis',				   1),
									 ( 3, 'San Sebastian',			   1),
									 ( 3, 'Siguatepeque',			   1),
									 ( 3, 'Villas de San Antonio',	   1),
									 ( 3, 'Las Lajas',				   1),
									 ( 3, 'Taulabe',				   1),
									 ( 4, 'Santa Rosa de Copan',	   1),
									 ( 4, 'Cabañas',				   1),
									 ( 4, 'Concepcion',				   1),
									 ( 4, 'Copan Ruinas',			   1),
									 ( 4, 'Corquin',				   1),
									 ( 4, 'Cucuyagua',				   1),
									 ( 4, 'Dolores',				   1),
									 ( 4, 'Dulce Nombre',			   1),
									 ( 4, 'El Paraiso',				   1),
									 ( 4, 'Florida',				   1),
									 ( 4, 'Lajigua',				   1),
									 ( 4, 'La Union',				   1),
									 ( 4, 'Nueva Arcadia',			   1),
									 ( 4, 'San Agustin',			   1),
									 ( 4, 'San Antonio',			   1),
									 ( 4, 'San Jeronimo',			   1),
									 ( 4, 'San Jose',				   1),
									 ( 4, 'San Juan de Ocoa',		   1),
									 ( 4, 'San Nicolas',			   1),
									 ( 4, 'San Pedro',				   1),
									 ( 4, 'Santa Rita',				   1),
									 ( 4, 'Trinidad de Copan',		   1),
									 ( 4, 'Veracruz',				   1),
									 ( 5, 'San Pedro Sula',			   1),
									 ( 5, 'Choloma',				   1),
									 ( 5, 'Omoa',					   1),
									 ( 5, 'Pimienta',				   1),
									 ( 5, 'Potrerillos',			   1),
									 ( 5, 'Puerto Cortes',			   1),
									 ( 5, 'San Antonio de Cortes',	   1),
									 ( 5, 'San Francisco de Yojoa',    1),
									 ( 5, 'San Manuel',				   1),
									 ( 5, 'Santa Cruz de Yoja',		   1),
									 ( 5, 'La Lima',				   1),
									 ( 6, 'Pascilagua',				   1),
									 ( 6, 'Comcepcion de Maria',	   1),
									 ( 6, 'Duyure',					   1),
									 ( 6, 'El Corpues',				   1),
									 ( 6, 'El Triunfo',				   1),
									 ( 6, 'Marcovia',				   1),
									 ( 6, 'Morolica',				   1),
									 ( 6, 'Namasigue',				   1),
									 ( 6, 'Orocuina',				   1),
									 ( 6, 'Pespire',				   1),
									 ( 6, 'San Antonio de Flores',	   1),
									 ( 6, 'San Isidrio',			   1),
									 ( 6, 'San Jose',				   1),
									 ( 6, 'San Marcos de Colon',	   1),
									 ( 6, 'Santa Ana de Yuscuare',	   1),
									 ( 7, 'Yuscaran',				   1),
									 ( 7, 'Alauca',					   1),
									 ( 7, 'Danli',					   1),
									 ( 7, 'El Paraiso',				   1),
									 ( 7, 'Guinope',				   1),
									 ( 7, 'Jacaleapa',				   1),
									 ( 7, 'Liure',					   1),
									 ( 7, 'Moroceli',				   1),
									 ( 7, 'Oropoli',				   1),
									 ( 7, 'Potrerillos',			   1),
									 ( 7, 'San Antonio de Flores',	   1),
									 ( 7, 'San Lucas',				   1),		 
									 ( 7, 'San Matias',				   1),
									 ( 7, 'Soledad',				   1),
									 ( 7, 'Teupasenti',				   1),
									 ( 7, 'Texiguat',				   1),
									 ( 7, 'Vado Ancho',				   1),		
									 ( 7, 'Yauyupe',				   1),
									 ( 7, 'Trojes',					   1),
									 ( 8, 'Distrito Central',		   1),
									 ( 8, 'Alubaren',				   1),
									 ( 8, 'Cedros',					   1),
									 ( 8, 'Cucaren',				   1),
									 ( 8, 'El Porvenir',			   1),
									 ( 8, 'Guaimaca',				   1),
									 ( 8, 'La Libertad',			   1),
									 ( 8, 'La Venta',				   1),
									 ( 8, 'Lepaterique',			   1),
									 ( 8, 'Maraita',				   1),
									 ( 8, 'Marale',					   1),
									 ( 8, 'Nueva Armedia',			   1),
									 ( 8, 'Ojojona',				   1),
									 ( 8, 'Orica',					   1),
									 ( 8, 'Reitoca',				   1),
									 ( 8, 'Sabana Grande',			   1),
									 ( 8, 'San Antonio de Oriente',    1),
									 ( 8, 'San Buenaventura',		   1),
									 ( 8, 'San Ignacio',			   1),
									 ( 8, 'San Juan de Flores',		   1),
									 ( 8, 'San Miguelito',			   1),
									 ( 8, 'Santa Ana',				   1),
									 ( 8, 'Santa Lucia',			   1),
									 ( 8, 'Talanga',				   1),
									 ( 8, 'Tatumbla',				   1),
									 ( 8, 'Valle de angeles',		   1),
									 ( 8, 'Villas de San Fernando',    1),
									 ( 8, 'Vallecillo',				   1),
									 ( 9, 'Puerto Lempira',			   1),
									 ( 9, 'Brus Laguna',			   1),
									 ( 9, 'Hauas',					   1),
									 ( 9, 'Juan Francisco Bulnes',	   1),
									 ( 9, 'Villeda Morales',		   1),
									 ( 9, 'Wanpucirpe',				   1),
									 (10, 'La Esperanza',			   1),
									 (10, 'Camasca',				   1),
									 (10, 'Colomcagua',				   1),
									 (10, 'Concepcion',				   1),
									 (10, 'Dolores',				   1),
									 (10, 'Intibuca',				   1),
									 (10, 'Jesus de Otoro',			   1),
									 (10, 'Magadalena',				   1),
									 (10, 'Masaguara',				   1),
									 (10, 'San Antonio',			   1),
									 (10, 'San Isidro',				   1),
									 (10, 'San Juan',				   1),
									 (10, 'San Marcos de la Sierra',   1),
									 (10, 'San Miguelito',			   1),
									 (10, 'Santa Lucia',			   1),
									 (10, 'Yamaranguila',			   1),
									 (10, 'San Francisco de Opalaca',  1),
									 (11, 'Roatan',					   1),
									 (11, 'Guanaja',				   1),
									 (11, 'Jose Santos Guardiola',	   1),
									 (11, 'Utila',					   1),
									 (12, 'Aguanqueterique',		   1),
									 (12, 'Cabañas',				   1),
									 (12, 'Cane',					   1),
									 (12, 'Chinacla',				   1),
									 (12, 'Guagiquiro',				   1),
									 (12, 'Lauterique',				   1),
									 (12, 'Marcala',				   1),
									 (12, 'Mercedes de Oriente',	   1),
									 (12, 'Opatoro',				   1),
									 (12, 'San Antonio del Norte',	   1),
									 (12, 'San Jose',				   1),
									 (12, 'San Juan',				   1),
									 (12, 'San Pedro de Tutule',	   1),
									 (12, 'Santa Ana',				   1),
									 (12, 'San Elena',				   1),
									 (12, 'Santa Maria',			   1),
									 (12, 'Santiago de Puringla',	   1),
									 (12, 'Yarula',					   1),
									 (13, 'Gracias',				   1),
									 (13, 'Belen',					   1),
									 (13, 'Candelaria',				   1),
									 (13, 'Cololaca',				   1),
									 (13, 'Erandique',				   1),
									 (13, 'Guascinse',				   1),
									 (13, 'Guarita',				   1),
									 (13, 'La Campa',				   1),
									 (13, 'La Iguala',				   1),
									 (13, 'Las Flores',				   1),
									 (13, 'La Union',				   1),
									 (13, 'La Virtud',				   1),
									 (13, 'Lepaera',				   1),
									 (13, 'Mapulaca',				   1),
									 (13, 'Piraera',				   1),
									 (13, 'San Andres',				   1),
									 (13, 'San Francisco',			   1),
									 (13, 'San Juan Guarita',		   1),
									 (13, 'San Manuel Colohete',	   1),
									 (13, 'San Rafael',				   1),
									 (13, 'San Sebastian',			   1),
									 (13, 'Santa Cruz',				   1),
									 (13, 'Talgua',					   1),
									 (13, 'Tambla',					   1),
									 (13, 'Tomala',					   1),
									 (13, 'Valladolid',				   1),
									 (13, 'Virginia',				   1),
									 (13, 'San Marcos de Caiquin',	   1),
									 (14, 'Ocotepeque',				   1),
									 (14, 'Belen Gualcho',			   1),
									 (14, 'Concepcion',				   1),
									 (14, 'Dolores Merendon',		   1),
									 (14, 'Fraternidad',			   1),
									 (14, 'La Encarnacion',			   1),
									 (14, 'La Labor',				   1),
									 (14, 'Lucerna',				   1),
									 (14, 'Mercedes',				   1),
									 (14, 'San Fernando',			   1),
									 (14, 'San Francisco del Valle',   1),
									 (14, 'San Jorge',				   1),
									 (14, 'San Marcos',				   1),
									 (14, 'Santa Fe',				   1),
									 (14, 'Sesenti',				   1),
									 (14, 'Sinuapa',				   1),
									 (15, 'Juticalpa',				   1),
									 (15, 'Campamento',				   1),
									 (15, 'Catacamas',				   1),
									 (15, 'Concordia',				   1),
									 (15, 'Dulce Nombre de Culmi',	   1),
									 (15, 'El Rosario',				   1),
									 (15, 'Esquipulas del Norte',	   1),
									 (15, 'Gualaco',				   1),
									 (15, 'Guarizama',				   1),
									 (15, 'Guata',					   1),
									 (15, 'Guayape',				   1),
									 (15, 'Jano',					   1),
									 (15, 'La Union',				   1),
									 (15, 'Mangulile',				   1),
									 (15, 'Manto',					   1),
									 (15, 'Salama',					   1),
									 (15, 'San Esteban',			   1),
									 (15, 'San Francisco de Becerra',  1),
									 (15, 'San Francisco de La Paz',   1),
									 (15, 'San Maria del Real',		   1),
									 (15, 'Silca',					   1),
									 (15, 'Yocon',					   1),
									 (15, 'Patuca',					   1),
									 (16, 'Santa Barbara',			   1),
									 (16, 'Arada',					   1),
									 (16, 'Atima',					   1),
									 (16, 'Azacualpa',				   1),
									 (16, 'Ceguaca',				   1),
									 (16, 'Concepcion del Norte',	   1),
									 (16, 'Concepcion del Sur',		   1),
									 (16, 'Chinda',					   1),
									 (16, 'El Nispero',				   1),
									 (16, 'Gualala',				   1),
									 (16, 'Ilama',					   1),
									 (16, 'Las Vegas',				   1),
									 (16, 'Macuelizo',				   1),
									 (16, 'Naranjito',				   1),
									 (16, 'Nuevo Celilac',			   1),
									 (16, 'Nueva Frontera',			   1),
									 (16, 'Petoa',					   1),
									 (16, 'Proteccion',				   1),
									 (16, 'Quimistan',				   1),
									 (16, 'San Francisco de Ojuera',   1),
									 (16, 'San Jose de Colinas',	   1),
									 (16, 'San Luis',				   1),
									 (16, 'San Marcos',				   1),
									 (16, 'San Nicolas',			   1),
									 (16, 'San Pedro Zacapa',		   1),
									 (16, 'San Vicente Centenario',    1),
									 (16, 'Santa Rita',				   1),
									 (16, 'Trinidad',				   1),
									 (17, 'Nacome',					   1),
									 (17, 'Alianza',				   1),
									 (17, 'Amapala',				   1),
									 (17, 'Aramecina',				   1),
									 (17, 'Caridad',				   1),
									 (17, 'Goascoran',				   1),
									 (17, 'Langue',					   1),
									 (17, 'San Francisco de Coray',    1),
									 (17, 'San Lorenzo',			   1),
									 (18, 'Yoro',					   1),
									 (18, 'Arenal',					   1),
									 (18, 'El Negrito',				   1),
									 (18, 'El Progreso',			   1),
									 (18, 'Jocon',					   1),
									 (18, 'Morazan',				   1),
									 (18, 'Olanchito',				   1),
									 (18, 'Santa Rita',				   1),
									 (18, 'Sulaco',					   1),
									 (18, 'Victoria',				   1),
									 (18, 'Yorito',					   1);
		


 -------------------------------------tbEstadosCiviles---------------------------------

 CREATE TABLE [gral].[tbEstadosCiviles](
	 [estc_Id]				INT IDENTITY(1,1),
	 [estc_Descripcion]		NVARCHAR(100)			NOT NULL,
	 [estc_Estado]			BIT DEFAULT 1,
	 [estc_UserCrea]		INT						NOT NULL,
	 [estc_FechaCrea]		DATETIME DEFAULT GETDATE(),
	 [estc_UserMofica]	INT,
	 [estc_FechaModifica]	DATETIME

	 CONSTRAINT PK_gral_tbEstadosCiviles_estc_Id PRIMARY KEY ([estc_Id]),
	 CONSTRAINT UQ_gral_tbEstadosCiviles_estc_Descripcion UNIQUE ([estc_Descripcion]),

 -- USUARIOS CONSTRAINTS --
	CONSTRAINT FK_gral_tbEstadosCiviles_estc_UserCrea_acce_tbUsuarios_userId		FOREIGN KEY (estc_UserCrea)		REFERENCES acce.tbUsuarios (user_Id),
	CONSTRAINT FK_gral_tbEstadosCiviles_estc_UserMofica_acce_tbUsuarios_userId		FOREIGN KEY (estc_UserMofica)	REFERENCES acce.tbUsuarios (user_Id)
 
 );
							--///***************** INSERTS DE ESTADOS CIVILES --///*****************
 INSERT INTO Gral.tbEstadosCiviles(estc_Descripcion, estc_UserCrea)
										VALUES  ('Amante',			1),
												('Casado(a)',		1),
												('Comprometido(a)', 1),
												('Divorciado(a)',	1),
												('Soltero(a)',		1),
												('Union Libre',		1),
												('Viudo(a)',		1);
GO
---------------------------------------tbSucursales-------------------------------------
CREATE TABLE cine.tbSucursales
(
		sucu_Id				INT IDENTITY(1,1)	NOT NULL,
		sucu_Nombre			NVARCHAR(MAX)		NOT NULL,
		sucu_Direccion		NVARCHAR(MAX)		NOT NULL,
		sucu_Ciudad			INT					NOT NULL,
		sucu_Estado			BIT DEFAULT 1		NOT NULL,

		sucu_UserCrea			INT								NOT NULL,
		sucu_FechaCrea			DATETIME DEFAULT GETDATE()		NOT NULL,
		sucu_UsuarioModifica	INT,
		sucu_FechaModifica		DATETIME

		CONSTRAINT PK_cine_tbSucursales_sucu_Id										PRIMARY KEY (sucu_Id),
		CONSTRAINT FK_cine_tbSucursales_sucu_Ciudad_gral_tbMunicipios_muni_Id		FOREIGN KEY (sucu_Ciudad)				REFERENCES gral.tbMunicipios (muni_Id),

		CONSTRAINT FK_cine_tbSucursaless_sucu_UsuarioCrea_acce_tbUsuarios_userId	FOREIGN KEY (sucu_UserCrea)		REFERENCES	acce.tbUsuarios (user_Id),
		CONSTRAINT FK_cine_tbSucursales_sucu_UsuarioModifica_acce_tbUsuarios_userId	FOREIGN KEY (sucu_UsuarioModifica)	REFERENCES	acce.tbUsuarios (user_Id)
);

						--///***************** INSERTS DE SUCURSALES --///*****************
INSERT INTO cine.tbSucursales (sucu_Nombre, sucu_Direccion, sucu_Ciudad, sucu_UserCrea)
						VALUES ('MegaFilms Paradise',	'Calle del Mar, 123',			1,		1),
							   ('MegaFilms Oasis',		'Avenida de las Palmeras, 456', 35,		1),
							   ('MegaFilms Galaxy',		'Plaza de las Estrellas, 789',	68,		1),
							   ('MegaFilms Infinity',	'Calle del Cosmos, 321',		137,	1),
							   ('MegaFilms Eclipse',	'Avenida del Sol, 987',			205,	1); 

 -------------------------------------tbMetodoDePago---------------------------------

CREATE TABLE gral.tbMetodosPago(
	pago_Id						INT IDENTITY(1,1),
	pago_Descripcion			NVARCHAR (200),
	pago_Estado					INT DEFAULT 1,
	pago_UsuarioCreador			INT,
	pago_FechaCreacion			DATETIME DEFAULT GETDATE(),
	pago_UsuarioModificador		INT,
	pago_FechaModificacion		DATETIME,

	CONSTRAINT PK_gral_tbMetodosPago_pago_ID PRIMARY KEY (pago_Id),

	-- USUARIOS CONSTRAINTS --
	CONSTRAINT FK_gral_tbMetodosPago_pago_UsuarioCreador_acce_tbUsuarios_userId			FOREIGN KEY (pago_UsuarioCreador)		REFERENCES acce.tbUsuarios (user_Id),
	CONSTRAINT FK_gral_tbMetodosPago_pago_UsuarioModificador_acce_tbUsuarios_userId		FOREIGN KEY (pago_UsuarioModificador)	REFERENCES acce.tbUsuarios (user_Id)
 
)
GO

						--///***************** INSERTS DE METODO DE PAGO --///*****************
INSERT INTO gral.tbMetodosPago(pago_Descripcion, pago_UsuarioCreador)
								VALUES  ('Bitcoin', 1),
										('ethereum', 1),
										('Efectivo',							 1),
										('Cheques',								 1),
										('Tarjeta de Debito',					 1),
										('Tarjeta de Credito',					 1),
										('Tranferencias Bancarias Electronicas', 1),
										('TigoMoney', 1);

 -------------------------------------tbCargos---------------------------------

CREATE TABLE gral.tbCargos(
	carg_Id					INT IDENTITY(1,1),
	carg_Cargo				NVARCHAR(250) NOT NULL,

	car_Estado				BIT DEFAULT 1,
	carg_UsuarioCreador		INT NOT NULL,
	carg_FechaCreacion		DATETIME  DEFAULT (GETDATE()), 
	carg_UsuarioModificado	INT,
	carg_FechaModificacion	DATETIME

	CONSTRAINT PK_gral_tbCargos_carg_Id PRIMARY KEY(carg_Id),
	-- USUARIOS CONSTRAINTS --
	CONSTRAINT FK_gral_tbCargos_carg_UsuarioCreador_acce_tbUsuarios_userId			FOREIGN KEY (carg_UsuarioCreador)		REFERENCES acce.tbUsuarios (user_Id),
	CONSTRAINT FK_gral_tbCargos_carg_UsuarioModificado_acce_tbUsuarios_userId		FOREIGN KEY (carg_UsuarioModificado)	REFERENCES acce.tbUsuarios (user_Id)
	
);
GO
						--///***************** INSERTS DE CARGOS --///*****************
						
							INSERT INTO gral.tbCargos(carg_Cargo, carg_UsuarioCreador)
							VALUES 
											('Gerente General',			 1),
											('Gerente de Operaciones',	 1),
											('Gerente de Ventas',		 1),
											('Jefe de Proyeccion',		 1),
											('Asistente de Proyeccion',	 1),
											('Jefe de Ventas',			 1),
											('Cajero',					 1),
											('Acomodador',				 1),
											('Supervisor de Limpieza',	 1);


 -------------------------------------tbEmpleados---------------------------------

CREATE TABLE gral.tbEmpleados(
	empl_Id					INT IDENTITY(1,1),
	empl_DNI				VARCHAR(13) NOT NULL,
	empl_Nombre				NVARCHAR(255)NOT NULl,
	empl_Apellidos			NVARCHAR(255) NOT NULL,
	empl_Sexo				CHAR(1) NOT NULL,
	empl_Estadocivil		INT NOT NULL,
	empl_Muni				INT NOT NULL,
	empl_Cargo				INT NOT NULL,
	empl_Sucursal			INT,
	empl_DireccionExacta	NVARCHAR(250)NOT NULL,
	empl_FechaNacimiento	DATE NOT NULL,
	empl_Telefono			NVARCHAR(9)NOT NULL,

	empl_UsuarioCreador		INT NOT NULL,
	empl_FechaCreacion		DATETIME DEFAULT (GETDATE()),
	empl_UsuarioModificado	INT,
	empl_FechaModificacion	DATETIME,
	empl_Estado				BIT DEFAULT 1, 
	CONSTRAINT PK_gral_tbEmpleados_empl_Id											PRIMARY KEY(empl_ID),
	CONSTRAINT FK_gral_tbEmpleados_empl_EstadoCivil_gral_tbEstadosCiviles_estc_Id	FOREIGN KEY(empl_Estadocivil)		REFERENCES gral.tbEstadosCiviles(estc_Id),
	CONSTRAINT CK_gral_tbEmpleados_empl_Sexo										CHECK(empl_Sexo IN('F','M')),
	CONSTRAINT FK_gral_tbEmpleados_carg_Id_gral_tbCargos_carg_Id					FOREIGN KEY(empl_Cargo)		REFERENCES gral.tbCargos(carg_Id),

	-- USUARIOS CONSTRAINTS --
	CONSTRAINT FK_gral_tbEmpleados_empl_UsuarioCreador_acce_tbUsuarios_userId			FOREIGN KEY (empl_UsuarioCreador)		REFERENCES acce.tbUsuarios (user_Id),
	CONSTRAINT FK_gral_tbEmpleados_empl_UsuarioModificado_acce_tbUsuarios_userId		FOREIGN KEY (empl_UsuarioModificado)	REFERENCES acce.tbUsuarios (user_Id)
 
);
GO

						--///***************** INSERTS DE EMPLEADOS --///*****************
INSERT INTO gral.tbEmpleados(empl_DNI, empl_Nombre, empl_Apellidos, empl_Sexo, empl_Estadocivil, empl_Muni, empl_Cargo, empl_DireccionExacta, empl_FechaNacimiento, empl_Telefono, empl_UsuarioCreador, empl_Sucursal)
VALUES 
				('0512200300736', 'Juan',	'Perez Gonzalez',	'M', 2, 3, 1,	'Calle Mayor 1',			'01-01-2003', '123456789', 1,	5),
				('0512200400732', 'Maria',	'Garcia Rodriguez', 'F', 1, 5, 2,	'Plaza del Sol 2',			'01-02-1994', '987654321', 1,	5),
				('0512199400732', 'Carlos', 'Martinez Lopez',	'M', 3, 12, 3,	'Avenida de la Libertad 3', '01-03-1995', '456789123', 1,	5),
				('0512199600730', 'Ana',	'Ruiz Sanchez',		'F', 2, 20, 4,	'Calle del Mar 4',			'01-04-1989', '654123789', 1,	5),
				('0512199900730', 'Pedro',	'Fernandez Martin', 'M', 1, 6, 5,	'Calle del Carmen 5',		'01-05-1949', '789123456', 1,	5),
				('0201199900734', 'Laura',	'Gomez Garcia',		'F', 3, 2, 6,	'Avenida de la Paz 6',		'01-06-1959', '321654987', 1,	2),
				('1201199800923', 'David',	'Lopez Hernandez',	'M', 4, 15, 7,	'Calle del Pilar 7',		'01-06-1989', '987321654', 1,	2),
				('0901200600234', 'Sofia',	'Sanchez Perez',	'F', 1, 10, 8,	'Plaza de España 8',		'01-07-1979', '159487263', 1,	2),
				('0901200300235', 'Javier', 'Hernandez Ruiz',	'M', 2, 8, 9,	'Calle de la Fuente 9',		'01-08-1969', '357159486', 1,	2),
				('0901200500230', 'Paola',	'Garcia Sanchez',	'F', 3, 1, 1,	'Calle Mayor 10',			'01-09-1978', '456321789', 1,	2),
				('1801200200123', 'Luis',	'Martinez Garcia',	'M', 4, 4, 2,	'Plaza del Sol 11',			'01-10-1990', '789654123', 1,	1),
				('1802200200123', 'Elena',	'Rodriguez Lopez',	'F', 1, 7, 3,	'Avenida de la Libertad 12','01-11-1993', '852741963', 1,	1),
				('1802200900123', 'Lea',	'Rodriguez Lopez',	'F', 1, 7, 3,	'Avenida del Lomar 212',	'10-12-1998', '852741960', 1,	1),
				('0512200877980', 'Juan',	'Gonzalez',			'M', 1, 1, 1,	'Calle A #123',				'09-01-1997', '987654321', 1,	1),
				('0512200300223', 'Maria',	'Perez',			'F', 2, 2, 2,	'Calle B #234',				'08-02-1996', '123456789', 1,	1),
				('0511200000234', 'Pedro',	'Rodriguez',		'M', 3, 3, 3,	'Calle C #345',				'07-01-1995', '456789123', 1,	3),
				('0512200301111', 'Luisa',	'Fernandez',		'F', 4, 4, 4,	'Calle D #456',				'06-01-1994', '789123456', 1,	3),
				('0512200300000', 'Jorge',	'Garcia',			'M', 5, 5, 5,	'Calle E #567',				'05-01-1993', '123456789', 1,	3),
				('0512200900234', 'Florencia', 'Vargas',		'F', 6, 6, 6,	'Calle F #678',				'05-01-1992', '456789123', 1,	3),
				('0512200877985', 'Ricardo',	'Sanchez',		'M', 7, 7, 7,	'Calle G #789',				'04-01-1990', '789123456', 1,	3),
				('0512200477985', 'Lucia',	'Gomez',			'F', 1, 8, 8,	'Calle H #890',				'03-01-1992', '123456789', 1,	4),
				('0512200500736', 'Manuel', 'Castillo',			'M', 2, 9, 9,	'Calle I #901',				'02-01-1998', '456789123', 1,	4),
				('0512200900731', 'Marta',	'Jimenez',			'F', 3, 10, 9, 'Calle J #012',				'01-01-1999', '789123456', 1,	4),
				('0512200900234', 'Alberto', 'Guzman',			'M', 4, 11, 1,	'Calle K #123',				'01-01-1999', '987654321', 1,	4)



-- CONSTRAINTS PARA LA TABLA DE USUARIOS (SE AGREGA EL CNSTRNT DE AUDITORIA Y EMPLEADO)
	ALTER TABLE acce.tbUsuarios
	ADD CONSTRAINT FK_gral_tbUsuarios_user_UsuarioCrea_acce_tbUsuarios_userId	FOREIGN KEY (user_UsuarioCrea) REFERENCES acce.tbUsuarios (user_Id)
GO 
	ALTER TABLE acce.tbUsuarios
	ADD CONSTRAINT FK_gral_tbUsuarios_user_UsuarioModifica_acce_tbUsuarios_userId	FOREIGN KEY (user_UsuarioModifica) REFERENCES acce.tbUsuarios (user_Id)
GO
	ALTER TABLE acce.tbUsuarios
	ADD CONSTRAINT FK_gral_tbUsuarios_user_Empleado_gral_tbEmpleados_empl_Id	FOREIGN KEY (user_Empleado) REFERENCES gral.tbEmpleados (empl_Id)
GO

---------------------------------------tbClientes-------------------------------------
CREATE TABLE gral.tbClientes(
		clie_Id				INT IDENTITY(1,1),
		clie_Nombres		NVARCHAR(100)		NOT NULL,
		clie_Apellidos		NVARCHAR(100)		NOT NULL,
		clie_RTN			VARCHAR(14)			NOT NULL,

		clie_Estado			BIT DEFAULT 1		NOT NULL,
		clie_UserCrea		INT					NOT NULL,
		clie_FechaCrea		DATETIME DEFAULT	GETDATE(),
		clie_UserModifica	INT,
		clie_FechaModifica	DATETIME
		
		CONSTRAINT PK_gral_tbClientes_clie_Id	PRIMARY KEY (clie_Id),
		CONSTRAINT UQ_gral_tbClientes_clie_RTN	UNIQUE		(clie_RTN),

		-- CONSTRAINT USUARIOS
		CONSTRAINT FK_gral_tbClientes_clie_UsuarioCrea_acce_tbUsuarios_userId		FOREIGN KEY (clie_UserCrea)		REFERENCES	acce.tbUsuarios (user_Id),
		CONSTRAINT FK_gral_tbClientes_clie_UsuarioModifica_acce_tbUsuarios_userId	FOREIGN KEY (clie_UserModifica)	REFERENCES	acce.tbUsuarios (user_Id)
);
GO
			--///***************** INSERTS DE CLIENTES --///*****************
INSERT INTO gral.tbClientes(clie_Nombres,	clie_Apellidos,		clie_RTN, clie_UserCrea)
					VALUES	('Angie Yahaira',  'Campos Arias', '12345678901234', 1),
							('Andrea Melissa', 'Sabillon',	   '05123456789012', 1),
							('Elvira Josefa',	'Reyes III',   '09091234567890', 1)
GO
---------------------------------------tbInsumos-------------------------------------
CREATE TABLE cine.tbInsumos
(
	insu_Id					INT IDENTITY (1,1)				NOT NULL,
	insu_Descripcion		NVARCHAR(MAX)					NOT NULL,
	insu_Precio				DECIMAL(18,2)					NOT NULL,
	insu_href				NVARCHAR(MAX)					,
	insu_src				NVARCHAR(MAX)					,
	insu_alt				NVARCHAR(20)					,
	insu_Estado				BIT DEFAULT 1					NOT NULL,
	insu_UserCrea			INT								NOT NULL,
	insu_FechaCrea			DATETIME DEFAULT GETDATE()		NOT NULL,
	insu_UsuarioModifica	INT,
	insu_FechaModifica		DATETIME

	CONSTRAINT PK_cine_tbInsumos_insu_Id										PRIMARY KEY (insu_Id),

	-- CONSTRAINT USUARIOS
	CONSTRAINT FK_cine_tbInsumos_insu_UsuarioCrea_acce_tbUsuarios_userId		FOREIGN KEY (insu_UserCrea)			REFERENCES	acce.tbUsuarios (user_Id),
	CONSTRAINT FK_cine_tbInsumos_insu_UsuarioModifica_acce_tbUsuarios_userId	FOREIGN KEY (insu_UsuarioModifica)	REFERENCES	acce.tbUsuarios (user_Id)
);

						--///***************** INSERTS DE INSUMOS --///*****************
						INSERT INTO cine.tbInsumos (insu_Descripcion, insu_Precio, insu_UserCrea, insu_href, 
													insu_src, insu_alt)
											VALUES 
											('Palomitas',			50.00, 1,	'', '', ''),
											('Refresco',			30.00, 1,	'', '', ''),
											('Nachos con queso',	60.00, 1,	'', '', ''),
											('Hot dogs',			45.00, 1,	'', '', ''),
											('Agua embotellada',	20.00, 1,	'', '', ''),
											('Gomitas',				25.00, 1,	'', '', ''),
											('Papas fritas',		40.00, 1,	'', '', ''),
											('ICEE Granitas',		90.00, 1,	'', '', ''),
											('Chicles',				10.00, 1,	'', '', '');

---------------------------------------tbCombo-------------------------------------
GO
	CREATE TABLE cine.tbCombos(
		comb_Id						INT IDENTITY(1,1)				NOT NULL,
		comb_Descripcion			NVARCHAR(MAX)					NOT NULL,
		comb_Precio					DECIMAL(18,2)					NOT NULL,
		comb_Estado					BIT DEFAULT 1					NOT NULL,

		comb_UserCrea				INT								NOT NULL,
		comb_FechaCrea				DATETIME DEFAULT GETDATE()		NOT NULL,
		comb_UsuarioModifica	    INT,
		comb_FechaModifica			DATETIME

		CONSTRAINT PK_cine_tbCombo_comb_Id	PRIMARY KEY (comb_Id),

		CONSTRAINT FK_cine_tbCombo_comb_UserCrea_acce_tbUsuarios_userId			FOREIGN KEY (comb_UserCrea)			REFERENCES	acce.tbUsuarios (user_Id),
		CONSTRAINT FK_cine_tbCombo_insu_UsuarioModifica_acce_tbUsuarios_userId	FOREIGN KEY (comb_UsuarioModifica)	REFERENCES	acce.tbUsuarios (user_Id)
	);

					--///***************** INSERTS DE COMBOS --///*****************
INSERT INTO cine.tbCombos(comb_Descripcion, comb_Precio, comb_UserCrea)
VALUES
							('Combo Pollo',					100.99,				1),
							('Combo Personal',            130.99,				1),
							('Combo Nacho-Amigos',        230.00,				1),
							('Combo Personal Premium',    220.00,				1),
							('Combo Familiar',            329.00,				1);

---------------------------------------tbComboDetalle-------------------------------------
GO
CREATE TABLE cine.tbComboDetalle(
		cdet_Id					INT IDENTITY(1,1)			NOT NULL,
		cdet_combId				INT							NOT NULL,
		cdet_insuId				INT							NOT NULL,
		cdet_Estado				BIT DEFAULT 1				NOT NULL,

		cdet_UserCrea			INT							NOT NULL,
		cdet_FechaCrea			DATETIME DEFAULT GETDATE()	NOT NULL,
		cdet_UserMofica			INT,
		cdet_FechaModifica		DATETIME

		CONSTRAINT PK_cine_tbComboDetalle_cdet_Id	PRIMARY KEY (cdet_Id),
		CONSTRAINT FK_cine_tbComboDetalle_cdet_insuId_cine_tbInsumos_insu_Id			FOREIGN KEY (cdet_insuId)		REFERENCES cine.tbInsumos (insu_Id),
		CONSTRAINT FK_cine_tbComboDetalle_cdet_combId_cine_tbCombos_comb_Id				FOREIGN KEY (cdet_combId)		REFERENCES cine.tbCombos  (comb_Id),
		
		CONSTRAINT FK_cine_tbComboDetalle_cdet_UserCrea_acce_tbUsuarios_userId			FOREIGN KEY (cdet_UserCrea)		REFERENCES	acce.tbUsuarios (user_Id),
		CONSTRAINT FK_cine_tbComboDetalle_cdet_UsuarioModifica_acce_tbUsuarios_userId	FOREIGN KEY (cdet_UserMofica)	REFERENCES	acce.tbUsuarios (user_Id)
);

				--///***************** INSERTS DE COMBO DETALLES --///*****************
INSERT INTO cine.tbComboDetalle(cdet_combId, cdet_insuId, cdet_UserCrea)
VALUES
								(1, 1, 1 ),
								(1, 2, 1 ),
								(2, 3, 1 ),
								(2, 2, 1 ),
								(2, 6, 1 ),
								(3, 1, 1 ),
								(3, 4, 1 ),
								(3, 2, 1 ),
								(3, 9, 1 ),
								(4, 1, 1 ),
								(4, 2, 1 ),
								(4, 7, 1 ),
								(4, 8, 1 ),
								(4, 3, 1 );

---------------------------------------tbCategoriaSala-----------------------------------
GO
CREATE TABLE cine.tbCategoriaSala(
	casa_Id				INT IDENTITY(1,1),
	casa_Categoria		VARCHAR(100),
	casa_Precio			INT

	CONSTRAINT PK_cine_tbCategoriaSala_casa_Id	PRIMARY KEY (casa_Id)
);

INSERT INTO cine.tbCategoriaSala (casa_Categoria, casa_Precio)
VALUES ('Normal', 100);

INSERT INTO cine.tbCategoriaSala (casa_Categoria, casa_Precio)
VALUES ('VIP', 200);

---------------------------------------tbSalas-------------------------------------
GO
CREATE TABLE cine.tbSalas(
		sala_Id					INT IDENTITY(1,1)			NOT NULL,
		sala_Butacas			INT							NOT NULL,
		sala_Tipo				INT							NOT NULL,
		sala_Sucursal			INT							NOT NULL,
		sala_Estado				BIT DEFAULT 1				NOT NULL,

		sala_UserCrea			INT							NOT NULL,
		sala_FechaCrea			DATETIME DEFAULT GETDATE()	NOT NULL,
		sala_UserMofica			INT,
		sala_FechaModifica		DATETIME

		CONSTRAINT PK_cine_tbSalas_sala_Id		PRIMARY KEY (sala_Id),
		CONSTRAINT FK_cine_tbSalas_sala_Sucursal_cine_tbSucursales_sucu_Id FOREIGN KEY (sala_Sucursal)		REFERENCES cine.tbSucursales (sucu_Id),
		CONSTRAINT FK_cine_tbCategoriaSala_sala_Tipo					   FOREIGN KEY (sala_Tipo)			REFERENCES cine.tbCategoriaSala (casa_Id),

		CONSTRAINT FK_cine_tbSalas_sala_UserCrea_acce_tbUsuarios_userId		FOREIGN KEY (sala_UserCrea)		REFERENCES	acce.tbUsuarios (user_Id),
		CONSTRAINT FK_cine_tbSalas_sala_UserMofica_acce_tbUsuarios_userId	FOREIGN KEY (sala_UserMofica)	REFERENCES	acce.tbUsuarios (user_Id)
);
GO

					--///***************** INSERTS DE SALAS --///*****************

INSERT INTO cine.tbSalas(sala_Butacas, sala_Sucursal, sala_Tipo, sala_UserCrea)
VALUES					
						(25,			1,             1,				1),
						(30,			1,             1,				1),
						(10,			1,             2,				1),
						(15,			1,             2,				1),

						(25,			2,			  1,				1),
						(30,			2,            1,				1),
						(10,			2,            2,				1),
						(15,			2,            2,				1),

						(25,			3,             1,				1),
						(10,			3,             2,				1),
						(15,			3,             2,				1),
						
						(25,			4,            1,				1),
						(10,			4,            2,				1),

						(25,			5,            1,				1),
						(10,			5,            2,				1);
---------------------------------------tbAsientos-------------------------------------

CREATE TABLE cine.tbAsientos(
		asie_Id					INT IDENTITY(1,1)			NOT NULL,
		asie_Sala				INT							NOT NULL,
		asie_Code				CHAR(2)						NOT NULL,
		asie_Reservado			BIT	DEFAULT 1				NOT NULL,

		asie_UserCrea			INT							NOT NULL,
		asie_FechaCrea			DATETIME DEFAULT GETDATE()	NOT NULL,
		asie_UserMofica			INT,
		asie_FechaModifica		DATETIME

		CONSTRAINT PK_cine_tbAsientos_asie_Id		PRIMARY KEY(asie_Id),
		CONSTRAINT FK_cine_tbAsientos_asie_Sala_cine_tbSalas_sala_Id			FOREIGN KEY (asie_Sala)			REFERENCES	cine.tbSalas (sala_Id),
		
		CONSTRAINT FK_cine_tbAsientos_asie_UserCrea_acce_tbUsuarios_userId		FOREIGN KEY (asie_UserCrea)		REFERENCES	acce.tbUsuarios (user_Id),
		CONSTRAINT FK_cine_tbAsiento_asie_UserMofica_acce_tbUsuarios_userId		FOREIGN KEY (asie_UserMofica)	REFERENCES	acce.tbUsuarios (user_Id)
);
GO

						--///***************** INSERTS DE ASIENTOS --///*****************
INSERT INTO cine.tbAsientos(asie_Sala, asie_UserCrea, asie_Code)
VALUES					-- sala 1
							(1, 1, 'A1'),
							(1, 1, 'A2'),
							(1, 1, 'A3'),
							(1, 1, 'A4'),
							(1, 1, 'A5'),
							(1, 1, 'A6'),
							(1, 1, 'A7'),
							(1, 1, 'A8'),
							(1, 1, 'A9'),
							(1, 1, 'B1'),
							(1, 1, 'B2'),
							(1, 1, 'B3'),
							(1, 1, 'B4'),
							(1, 1, 'B5'),
							(1, 1, 'B6'),
							(1, 1, 'B7'),
							(1, 1, 'B8'),
							(1, 1, 'B9'),
							(1, 1, 'C1'),
							(1, 1, 'C2'),
							(1, 1, 'C3'),
							(1, 1, 'C4'),
							(1, 1, 'C5'),
							(1, 1, 'C6'),
							(1, 1, 'C7'),

							-- sala #2
							(2, 1, 'A1'),
							(2, 1, 'A2'),
							(2, 1, 'A3'),
							(2, 1, 'A4'),
							(2, 1, 'A5'),
							(2, 1, 'A6'),
							(2, 1, 'A7'),
							(2, 1, 'A8'),
							(2, 1, 'A9'),
							(2, 1, 'B1'),
							(2, 1, 'B2'),
							(2, 1, 'B3'),
							(2, 1, 'B4'),
							(2, 1, 'B5'),
							(2, 1, 'B6'),
							(2, 1, 'B7'),
							(2, 1, 'B8'),
							(2, 1, 'B9'),
							(2, 1, 'C1'),
							(2, 1, 'C2'),
							(2, 1, 'C3'),
							(2, 1, 'C4'),
							(2, 1, 'C5'),
							(2, 1, 'C6'),
							(2, 1, 'C7'),
							(2, 1, 'C8'),
							(2, 1, 'C9'),
							(2, 1, 'D1'),
							(2, 1, 'D2'),
							(2, 1, 'D3'),
						
						-- sala 3
							(3, 1, 'A1'),
							(3, 1, 'A2'),
							(3, 1, 'A3'),
							(3, 1, 'A4'),
							(3, 1, 'A5'),
							(3, 1, 'A6'),
							(3, 1, 'A7'),
							(3, 1, 'A8'),
							(3, 1, 'A9'),
							(3, 1, 'B1'),

						-- sala 4
							(4, 1, 'A1'),
							(4, 1, 'A2'),
							(4, 1, 'A3'),
							(4, 1, 'A4'),
							(4, 1, 'A5'),
							(4, 1, 'A6'),
							(4, 1, 'A7'),
							(4, 1, 'A8'),
							(4, 1, 'A9'),
							(4, 1, 'B1'),
							(4, 1, 'B2'),
							(4, 1, 'B3'),
							(4, 1, 'B4'),
							(4, 1, 'B5'),
							(4, 1, 'B6'),

						-- sala 5

							(5, 1, 'A1'),
							(5, 1, 'A2'),
							(5, 1, 'A3'),
							(5, 1, 'A4'),
							(5, 1, 'A5'),
							(5, 1, 'A6'),
							(5, 1, 'A6'),
							(5, 1, 'A7'),
							(5, 1, 'A8'),
							(5, 1, 'A9'),
							(5, 1, 'B1'),
							(5, 1, 'B2'),
							(5, 1, 'B3'),
							(5, 1, 'B4'),
							(5, 1, 'B5'),
							(5, 1, 'B6'),
							(5, 1, 'B7'),
							(5, 1, 'B8'),
							(5, 1, 'B9'),
							(5, 1, 'C1'),
							(5, 1, 'C2'),
							(5, 1, 'C3'),
							(5, 1, 'C4'),
							(5, 1, 'C5'),
							(5, 1, 'C6'),

							-- sala #6
							(6, 1, 'A1'),
							(6, 1, 'A2'),
							(6, 1, 'A3'),
							(6, 1, 'A4'),
							(6, 1, 'A5'),
							(6, 1, 'A6'),
							(6, 1, 'A7'),
							(6, 1, 'A8'),
							(6, 1, 'A9'),
							(6, 1, 'B1'),
							(6, 1, 'B2'),
							(6, 1, 'B3'),
							(6, 1, 'B4'),
							(6, 1, 'B5'),
							(6, 1, 'B6'),
							(6, 1, 'B7'),
							(6, 1, 'B8'),
							(6, 1, 'B9'),
							(6, 1, 'C1'),
							(6, 1, 'C2'),
							(6, 1, 'C3'),
							(6, 1, 'C4'),
							(6, 1, 'C5'),
							(6, 1, 'C6'),
							(6, 1, 'C7'),
							(6, 1, 'C8'),
							(6, 1, 'C9'),
							(6, 1, 'D1'),
							(6, 1, 'D2'),
							(6, 1, 'D3'),

						-- sala 7
							(7, 1, 'A1'),
							(7, 1, 'A2'),
							(7, 1, 'A3'),
							(7, 1, 'A4'),
							(7, 1, 'A5'),
							(7, 1, 'A6'),
							(7, 1, 'A7'),
							(7, 1, 'A8'),
							(7, 1, 'A9'),
							(7, 1, 'B1'),

						-- sala 8
							(8, 1, 'A1'),
							(8, 1, 'A2'),
							(8, 1, 'A3'),
							(8, 1, 'A4'),
							(8, 1, 'A5'),
							(8, 1, 'A6'),
							(8, 1, 'A7'),
							(8, 1, 'A8'),
							(8, 1, 'A9'),
							(8, 1, 'B1'),
							(8, 1, 'B2'),
							(8, 1, 'B3'),
							(8, 1, 'B4'),
							(8, 1, 'B5'),
							(8, 1, 'B6'),

							-- sala 9
							(9, 1, 'A1'),
							(9, 1, 'A2'),
							(9, 1, 'A3'),
							(9, 1, 'A4'),
							(9, 1, 'A5'),
							(9, 1, 'A6'),
							(9, 1, 'A7'),
							(9, 1, 'A8'),
							(9, 1, 'A9'),
							(9, 1, 'B1'),
							(9, 1, 'B2'),
							(9, 1, 'B3'),
							(9, 1, 'B4'),
							(9, 1, 'B5'),
							(9, 1, 'B6'),
							(9, 1, 'B7'),
							(9, 1, 'B8'),
							(9, 1, 'B9'),
							(9, 1, 'C1'),
							(9, 1, 'C2'),
							(9, 1, 'C3'),
							(9, 1, 'C4'),
							(9, 1, 'C5'),
							(9, 1, 'C6'),
							(9, 1, 'C7'),

						-- sala 10
							(10, 1, 'A1'),
							(10, 1, 'A2'),
							(10, 1, 'A3'),
							(10, 1, 'A4'),
							(10, 1, 'A5'),
							(10, 1, 'A6'),
							(10, 1, 'A7'),
							(10, 1, 'A8'),
							(10, 1, 'A9'),
							(10, 1, 'B1'),

						-- sala 11
							(11, 1, 'A1'),
							(11, 1, 'A2'),
							(11, 1, 'A3'),
							(11, 1, 'A4'),
							(11, 1, 'A5'),
							(11, 1, 'A6'),
							(11, 1, 'A7'),
							(11, 1, 'A8'),
							(11, 1, 'A9'),
							(11, 1, 'B1'),
							(11, 1, 'B2'),
							(11, 1, 'B3'),
							(11, 1, 'B4'),
							(11, 1, 'B5'),
							(11, 1, 'B6'),

						-- sala 12

							(12, 1, 'A1'),
							(12, 1, 'A2'),
							(12, 1, 'A3'),
							(12, 1, 'A4'),
							(12, 1, 'A5'),
							(12, 1, 'A6'),
							(12, 1, 'A7'),
							(12, 1, 'A8'),
							(12, 1, 'A9'),
							(12, 1, 'B1'),
							(12, 1, 'B2'),
							(12, 1, 'B3'),
							(12, 1, 'B4'),
							(12, 1, 'B5'),
							(12, 1, 'B6'),
							(12, 1, 'B7'),
							(12, 1, 'B8'),
							(12, 1, 'B9'),
							(12, 1, 'C1'),
							(12, 1, 'C2'),
							(12, 1, 'C3'),
							(12, 1, 'C4'),
							(12, 1, 'C5'),
							(12, 1, 'C6'),
							(12, 1, 'C7'),

							-- sala 13
							(13, 1, 'A1'),
							(13, 1, 'A2'),
							(13, 1, 'A3'),
							(13, 1, 'A4'),
							(13, 1, 'A5'),
							(13, 1, 'A6'),
							(13, 1, 'A7'),
							(13, 1, 'A8'),
							(13, 1, 'A9'),
							(13, 1, 'B1'),
							

						-- sala 15
							(14, 1, 'A1'),
							(14, 1, 'A2'),
							(14, 1, 'A3'),
							(14, 1, 'A4'),
							(14, 1, 'A5'),
							(14, 1, 'A6'),
							(14, 1, 'A7'),
							(14, 1, 'A8'),
							(14, 1, 'A9'),
							(14, 1, 'B1'),
							(14, 1, 'B2'),
							(14, 1, 'B3'),
							(14, 1, 'B4'),
							(14, 1, 'B5'),
							(14, 1, 'B6'),
							(14, 1, 'B7'),
							(14, 1, 'B8'),
							(14, 1, 'B9'),
							(14, 1, 'C1'),
							(14, 1, 'C2'),
							(14, 1, 'C3'),
							(14, 1, 'C4'),
							(14, 1, 'C5'),
							(14, 1, 'C6'),
							(14, 1, 'C7'),

						-- sala 16
							(15, 1, 'A1'),
							(15, 1, 'A2'),
							(15, 1, 'A3'),
							(15, 1, 'A4'),
							(15, 1, 'A5'),
							(15, 1, 'A6'),
							(15, 1, 'A7'),
							(15, 1, 'A8'),
							(15, 1, 'A9'),
							(15, 1, 'B1');
							
GO
---------------------------------------tbCategorias-------------------------------------
CREATE TABLE gral.tbCategorias(
		cate_Id                  INT IDENTITY(1,1),
		cate_Nombre              NVARCHAR(200),
		cate_Estado              BIT DEFAULT 1,
		cate_UsuarioCreador	     INT,
		cate_FechaCreacion       DATETIME DEFAULT GETDATE(),
		cate_UsuarioModificador  INT,
		cate_FechaModificacion   DATETIME
		
		CONSTRAINT PK_gral_tbCategorias_cate_Id PRIMARY KEY (cate_Id),

		-- CNSTS USUARIOS
		CONSTRAINT FK_gral_tbCategorias_cate_UserCrea_acce_tbUsuarios_userId	FOREIGN KEY (cate_UsuarioCreador)		REFERENCES	acce.tbUsuarios (user_Id),
		CONSTRAINT FK_gral_tbCategorias_cate_UserMofica_acce_tbUsuarios_userId	FOREIGN KEY (cate_UsuarioModificador)	REFERENCES	acce.tbUsuarios (user_Id)
);
GO

				--///***************** INSERTS DE CATEGORIAS --///*****************
INSERT INTO gral.tbCategorias(cate_Nombre,cate_UsuarioCreador)
								VALUES('Terror',	1),
									  ('Suspenso',	1),
									  ('Comedia',	1),
									  ('Romance',	1),
									  ('Accion',	1)

---------------------------------------tbDirectores-------------------------------------
CREATE TABLE cine.tbDirectores(
		
		dire_Id					INT IDENTITY(1,1),
		dire_Nombres			NVARCHAR(100)	NOT NULL,
		dire_Apellidos			NVARCHAR(100)	NOT NULL,
		dire_FechaNacimiento	DATE,
		dire_Sexo				CHAR(1)			NOT NULL,

		dire_Estado				BIT DEFAULT 1,
		dire_UsuCrea			INT				NOT NULL,
		dire_FechaCrea			DATETIME DEFAULT GETDATE(),
		dire_UsuMofica			INT,
		dire_FechaModifica		DATETIME

		CONSTRAINT PK_cine_tbDirectores_dire_Id		PRIMARY KEY (dire_Id),
		CONSTRAINT CK_cine_tbDirectores_dire_Sexo	CHECK(dire_Sexo IN('F','M')),

		
		-- CNSTS USUARIOS
		CONSTRAINT FK_cine_tbDirectores_dire_UserCrea_acce_tbUsuarios_userId	FOREIGN KEY (dire_UsuCrea)		REFERENCES	acce.tbUsuarios (user_Id),
		CONSTRAINT FK_cine_tbDirectores_dire_UserMofica_acce_tbUsuarios_userId	FOREIGN KEY (dire_UsuMofica)	REFERENCES	acce.tbUsuarios (user_Id)
);
GO
						--///***************** INSERTS DE DIRECTORES --///*****************
			INSERT INTO cine.tbDirectores(dire_Nombres, dire_Apellidos, dire_FechaNacimiento, dire_Sexo, dire_UsuCrea)
			VALUES ('Steven', 'Spielberg', '12-12-1946', 'M', 1);
			GO
			INSERT INTO cine.tbDirectores(dire_Nombres, dire_Apellidos, dire_FechaNacimiento, dire_Sexo, dire_UsuCrea)
			VALUES ('Quentin', 'Tarantino', '03-03-1963', 'M', 1);
			GO
			INSERT INTO cine.tbDirectores(dire_Nombres, dire_Apellidos, dire_FechaNacimiento, dire_Sexo, dire_UsuCrea)
			VALUES ('Sofia', 'Coppola', '12-04-1997', 'F', 1);
			GO
			INSERT INTO cine.tbDirectores(dire_Nombres, dire_Apellidos, dire_FechaNacimiento, dire_Sexo, dire_UsuCrea)
			VALUES ('Christopher', 'Nolan', '12-04-1970', 'M', 1);
			GO
			INSERT INTO cine.tbDirectores(dire_Nombres, dire_Apellidos, dire_FechaNacimiento, dire_Sexo, dire_UsuCrea)
			VALUES ('Alfonso', 'Cuaron', '09-09-1961', 'M', 1);
			GO
			INSERT INTO cine.tbDirectores(dire_Nombres, dire_Apellidos, dire_FechaNacimiento, dire_Sexo, dire_UsuCrea)
			VALUES ('Alejandro', 'Gonzalez Iñarritu', '12-04-1963', 'M', 1);
			GO
			INSERT INTO cine.tbDirectores(dire_Nombres, dire_Apellidos, dire_FechaNacimiento, dire_Sexo, dire_UsuCrea)
			VALUES ('Martin', 'Scorsese', '11-11-1942', 'M', 1);
			GO
			INSERT INTO cine.tbDirectores(dire_Nombres, dire_Apellidos, dire_FechaNacimiento, dire_Sexo, dire_UsuCrea)
			VALUES ('Francis Ford', 'Coppola', '04-09-1939', 'M', 1);
			GO
			INSERT INTO cine.tbDirectores(dire_Nombres, dire_Apellidos, dire_FechaNacimiento, dire_Sexo, dire_UsuCrea)
			VALUES ('Tim', 'Burton', '09-04-1958', 'M', 1);
			GO
			INSERT INTO cine.tbDirectores(dire_Nombres, dire_Apellidos, dire_FechaNacimiento, dire_Sexo, dire_UsuCrea)
			VALUES ('David', 'Fincher', '05-09-1962', 'M', 1);
			GO
---------------------------------------tbPeliculas-------------------------------------
CREATE TABLE cine.tbPeliculas(
			
			peli_Id				INT IDENTITY(1,1),
			peli_Titulo			NVARCHAR(250)			NOT NULL,
			peli_TitulOriginal	NVARCHAR(250)			NOT NULL,
			peli_AnioEstreno	INT						NOT NULL,
			peli_Duracion		INT						NOT NULL,
			peli_Categoria		INT						NOT NULL,
			peli_Director		INT						NOT NULL,

			peli_Estado			BIT DEFAULT 1,
			peli_UsuCrea		INT						NOT NULL,
			peli_FechaCrea		DATETIME DEFAULT GETDATE(),
			peli_UsuMofica		INT,
			peli_FechaModifica	DATETIME

			CONSTRAINT PK_cine_tbPeliculas_peli_Id		PRIMARY KEY (peli_Id),
			CONSTRAINT FK_cine_tbPelicuas_peli_Categoria_gral_tbCategorias_cate_Id FOREIGN KEY (peli_Categoria)		REFERENCES gral.tbCategorias (cate_Id),
			CONSTRAINT FK_cine_tbPelicuas_peli_Director_cine_tbDirectores_dire_Id FOREIGN KEY (peli_Director)		REFERENCES cine.tbDirectores (dire_Id),


			-- CNSTS USUARIOS
			CONSTRAINT FK_cine_tbPeliculas_peli_UserCrea_acce_tbUsuarios_userId		FOREIGN KEY (peli_UsuCrea)		REFERENCES	acce.tbUsuarios (user_Id),
			CONSTRAINT FK_cine_tbPeliculas_peli_UserMofica_acce_tbUsuarios_userId	FOREIGN KEY (peli_UsuMofica)	REFERENCES	acce.tbUsuarios (user_Id)
);
					--///***************** INSERTS DE PELICULAS --///*****************
-- Insert 1
INSERT INTO cine.tbPeliculas(peli_Titulo, peli_TitulOriginal, peli_AnioEstreno, peli_Duracion, peli_Categoria, peli_Director, peli_UsuCrea)
VALUES ('La Gran Aventura', 'The Great Adventure', 2020, 120, 3, 2, 1);
GO
-- Insert 2
INSERT INTO cine.tbPeliculas(peli_Titulo, peli_TitulOriginal, peli_AnioEstreno, peli_Duracion, peli_Categoria, peli_Director, peli_UsuCrea)
VALUES ('El Misterio del Castillo', 'The Mystery of the Castle', 2021, 95, 4, 5, 1);
GO
-- Insert 3
INSERT INTO cine.tbPeliculas(peli_Titulo, peli_TitulOriginal, peli_AnioEstreno, peli_Duracion, peli_Categoria, peli_Director, peli_UsuCrea)
VALUES ('La Vida es Bella', 'La Vita è Bella', 1997, 116, 1, 1, 1);
GO
-- Insert 4
INSERT INTO cine.tbPeliculas(peli_Titulo, peli_TitulOriginal, peli_AnioEstreno, peli_Duracion, peli_Categoria, peli_Director, peli_UsuCrea)
VALUES ('La Leyenda de la Isla Perdida', 'The Legend of the Lost Island', 2022, 135, 3, 3, 1);
GO
-- Insert 5
INSERT INTO cine.tbPeliculas(peli_Titulo, peli_TitulOriginal, peli_AnioEstreno, peli_Duracion, peli_Categoria, peli_Director, peli_UsuCrea)
VALUES ('El ultimo Samurai', 'The Last Samurai', 2003, 154, 2, 4, 1);
GO
-- Insert 6
INSERT INTO cine.tbPeliculas(peli_Titulo, peli_TitulOriginal, peli_AnioEstreno, peli_Duracion, peli_Categoria, peli_Director, peli_UsuCrea)
VALUES ('La Chica de al Lado', 'The Girl Next Door', 2004, 108, 5, 6, 1);
GO
-- Insert 7
INSERT INTO cine.tbPeliculas(peli_Titulo, peli_TitulOriginal, peli_AnioEstreno, peli_Duracion, peli_Categoria, peli_Director, peli_UsuCrea)
VALUES ('La Sombra del Diablo', 'Shadow of the Devil', 2022, 142, 4, 7, 1);
GO
-- Insert 8
INSERT INTO cine.tbPeliculas(peli_Titulo, peli_TitulOriginal, peli_AnioEstreno, peli_Duracion, peli_Categoria, peli_Director, peli_UsuCrea)
VALUES ('La Era de los Dinosaurios', 'The Age of Dinosaurs', 2013, 88, 3, 8, 1);
GO
-- Insert 9
INSERT INTO cine.tbPeliculas(peli_Titulo, peli_TitulOriginal, peli_AnioEstreno, peli_Duracion, peli_Categoria, peli_Director, peli_UsuCrea)
VALUES ('Interstellar', 'Interstellar', 2014, 169, 3, 7, 1);
GO
-- Insert 10
INSERT INTO cine.tbPeliculas(peli_Titulo, peli_TitulOriginal, peli_AnioEstreno, peli_Duracion, peli_Categoria, peli_Director, peli_UsuCrea)
VALUES ('El rey leon', 'The Lion King', 2019, 118, 5, 8, 1);
GO
-- Insert 11
INSERT INTO cine.tbPeliculas(peli_Titulo, peli_TitulOriginal, peli_AnioEstreno, peli_Duracion, peli_Categoria, peli_Director, peli_UsuCrea)
VALUES ('El irlandes', 'The Irishman', 2019, 209, 2, 9, 1);
GO
-- Insert 12
INSERT INTO cine.tbPeliculas(peli_Titulo, peli_TitulOriginal, peli_AnioEstreno, peli_Duracion, peli_Categoria, peli_Director, peli_UsuCrea)
VALUES ('La naranja mecanica', 'A Clockwork Orange', 1971, 136, 4, 10, 1);
GO
-- Insert 13
INSERT INTO cine.tbPeliculas(peli_Titulo, peli_TitulOriginal, peli_AnioEstreno, peli_Duracion, peli_Categoria, peli_Director, peli_UsuCrea)
VALUES ('El club de la pelea', 'Fight Club', 1999, 139, 4, 1, 1);
GO


---------------------------------------tbProyeccion -------------------------------------
CREATE TABLE cine.tbHorarios (
    hor_Id INT IDENTITY(1,1),
    hor_HoraInicio TIME NOT NULL,
    hor_HoraFin TIME NOT NULL

	CONSTRAINT PK_cine_tbHorarios	 PRIMARY KEY (hor_Id),

);

--//Insert tar de los horarios//--
-- Inserts para películas de corta duración
INSERT INTO cine.tbHorarios (hor_HoraInicio, hor_HoraFin)
VALUES
('13:00:00', '14:30:00'),
('15:00:00', '16:30:00'),
('17:00:00', '18:30:00'),
('19:00:00', '20:30:00'),
('21:00:00', '22:30:00'),
('23:00:00', '23:50:00');

-- Inserts para películas de duración media
INSERT INTO cine.tbHorarios (hor_HoraInicio, hor_HoraFin)
VALUES
('13:00:00', '15:00:00'),
('15:30:00', '17:30:00'),
('18:00:00', '20:00:00'),
('20:30:00', '22:30:00'),
('23:00:00', '23:50:00'),
('13:30:00', '15:30:00');

-- Inserts para películas de larga duración
INSERT INTO cine.tbHorarios (hor_HoraInicio, hor_HoraFin)
VALUES
('13:00:00', '16:00:00'),
('16:30:00', '19:30:00'),
('20:00:00', '23:00:00'),
('13:30:00', '16:30:00'),
('17:00:00', '20:00:00'),
('20:30:00', '23:30:00');



---------------------------------------tbProyecci�n -------------------------------------
GO
CREATE TABLE cine.tbProyecciones(

	proy_Id				INT IDENTITY(1,1),
	proy_Pelicula		INT,
	proy_Sala			INT,
	proy_Horario		INT,
	proy_Estado			bit DEFAULT 1

	CONSTRAINT PK_cine_tbProyecciones_proy_Id			 PRIMARY KEY (proy_Id),
	CONSTRAINT FK_cine_tbPeliculas_proy_Pelicula_peli_Id FOREIGN KEY (proy_Pelicula) REFERENCES cine.tbPeliculas(peli_Id),
	CONSTRAINT FK_cine_tbSalas_proy_Sala_sala_Id		 FOREIGN KEY (proy_Sala)	 REFERENCES cine.tbSalas(sala_Id),
	CONSTRAINT FK_cine_tbHorarios_proy_Horario			 FOREIGN KEY (proy_Horario)	 REFERENCES cine.tbHorarios(hor_Id)

);

 -- inserts de proyecciones -- 
DECLARE @i INT = 1;
DECLARE @max INT = 20;

WHILE @i <= @max
BEGIN
    -- generar valores aleatorios para los campos proy_Pelicula, proy_Sala, y proy_Horario
    DECLARE @pelicula INT = (SELECT TOP 1 peli_Id FROM cine.tbPeliculas ORDER BY NEWID());
    DECLARE @sala INT = (SELECT TOP 1 sala_Id FROM cine.tbSalas ORDER BY NEWID());
    DECLARE @horario INT = (SELECT TOP 1 hor_Id FROM cine.tbHorarios ORDER BY NEWID());
    
    -- insertar fila en la tabla tbProyecciones con los valores generados aleatoriamente
    INSERT INTO cine.tbProyecciones (proy_Pelicula, proy_Sala, proy_Horario)
    VALUES (@pelicula, @sala, @horario);
    
    SET @i = @i + 1;
END

-- inserts de proyecciones -- 



---------------------------------------tbFacturas-------------------------------------
GO
CREATE TABLE cine.tbFacturas(
		
		fact_Id				INT IDENTITY(1,1),
		fact_Cliente		INT,
		fact_Estado			BIT DEFAULT 1,
		fact_UsuCrea		INT					NOT NULL,
		fact_FechaCrea		DATETIME DEFAULT GETDATE(),
		fact_UsuMofica		INT,
		fact_FechaModifica	DATETIME

		CONSTRAINT PK_cine_tbFacturas_fact_ID		PRIMARY KEY (fact_ID)
		CONSTRAINT FK_cine_tbFacturas_fact_Cliente	FOREIGN KEY (fact_Cliente)		REFERENCES gral.tbClientes (clie_Id),
);
/*
GO
CREATE TABLE cine.tbFacturaDetalle(

	fade_Id				INT IDENTITY(1,1),
	fade_Factura		INT,
	fade_Proyeccion		INT,
	fade_ComboDetalle	INT,

	fade_Estado			BIT DEFAULT 1,
	fade_UsuCrea		INT					NOT NULL,
	fade_FechaCrea		DATETIME DEFAULT GETDATE(),
	fade_UsuMofica		INT,
	fade_FechaModifica	DATETIME

	CONSTRAINT PK_cine_tbFacturaDetalle_fade_Id			PRIMARY KEY(fade_Id)
	CONSTRAINT FK_cine_tbFacturas_fade_Factura			FOREIGN KEY (fade_Factura)		REFERENCES cine.tbFacturas (fact_Id),
	CONSTRAINT FK_cine_tbProyeccion_fade_Proyeccion		FOREIGN KEY (fade_Proyeccion)	REFERENCES cine.tbProyecciones (proy_Id),
	CONSTRAINT FK_cine_tbComboDetalle_fade_ComboDetalle FOREIGN KEY (fade_ComboDetalle) REFERENCES cine.tbComboDetalle (cdet_Id)

);
*/
--/////////////////////////////////////////////////////////////////////////////--
-- factura

GO
CREATE TABLE cine.tbFacturaDetalle(

	fade_Id							INT IDENTITY(1,1),
	fade_Factura					INT,
	fade_Proyeccion					INT,
	fade_Tickets					INT,
	fade_Combo_Id					INT,
	fade_Combo_Cantidad				INT,
	fade_ComboDetalle				INT,
	fade_ComboDetalle_Cantidad		INT,
	fade_Pago						INT,
	fade_Total						INT,
	fade_Estado						BIT DEFAULT 1,
	fade_UsuCrea					INT					NOT NULL,
	fade_FechaCrea					DATETIME DEFAULT GETDATE(),
	fade_UsuMofica					INT,
	fade_FechaModifica				DATETIME

	CONSTRAINT PK_cine_tbFacturaDetalle_fade_Id			PRIMARY KEY(fade_Id)
	CONSTRAINT FK_cine_tbFacturas_fade_Factura			FOREIGN KEY (fade_Factura)		REFERENCES cine.tbFacturas (fact_Id),
	CONSTRAINT FK_cine_tbProyeccion_fade_Proyeccion		FOREIGN KEY (fade_Proyeccion)	REFERENCES cine.tbProyecciones (proy_Id),
	CONSTRAINT FK_cine_tbMetodoPago_fade_Pago			FOREIGN KEY (fade_Pago)			REFERENCES gral.tbMetodosPago (pago_Id),
	CONSTRAINT FK_cine_tbComboDetalle_fade_ComboDetalle	FOREIGN KEY (fade_ComboDetalle)			REFERENCES cine.tbComboDetalle (cdet_Id)

);

GO
CREATE TABLE cine.tbTickets(

	tick_Id				INT IDENTITY(1,1),
	tick_Factura		INT,
	tick_Proyeccion		INT,
	tick_Asiento		INT,
	tick_Estado			BIT DEFAULT 1,
	tick_UsuCrea		INT					NOT NULL,
	tick_FechaCrea		DATETIME DEFAULT	GETDATE(),
	tick_UsuMofica		INT,
	tick_FechaModifica	DATETIME

	CONSTRAINT PK_cine_tbTickets_tick_Id				PRIMARY KEY(tick_Id)
	CONSTRAINT FK_cine_tbFacturas_tick_Factura			FOREIGN KEY (tick_Factura)		REFERENCES cine.tbFacturas (fact_Id), 
	CONSTRAINT FK_cine_tbProyeccion_tick_Proyeccion		FOREIGN KEY (tick_Proyeccion)	REFERENCES cine.tbProyecciones (proy_Id),
	CONSTRAINT FK_cine_tbTickets_tick_Asiento			FOREIGN KEY (tick_Asiento)		REFERENCES [cine].[tbAsientos] 	 ([asie_Id]),

);
