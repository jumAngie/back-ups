use db_Cine
go

--*****************************************************--
--*************** ESQUEMA DE Acceso ******************--


--*****************************************************--
--*************** VISTA DE ROL ******************--

GO
CREATE OR ALTER VIEW acce.VW_tbRoles
AS
SELECT [role_Id]
      ,[role_Nombre]
      ,[role_UsuCreacion]
	  ,t2.user_Empleado
	  ,t3.empl_Nombre + ' ' + t3.empl_Apellidos AS 'Nombre'
      ,[role_FechaCreacion]
      ,[role_UsuModificacion]
      ,[role_FechaModificacion]
      ,[role_Estado]
  FROM [acce].[tbRoles] T1 INNER JOIN acce.tbUsuarios t2
  ON	T1.[role_UsuCreacion] = t2.user_Id INNER JOIN gral.tbEmpleados t3
  ON	t2.user_Empleado = t3.empl_Id



--*************** SELECT DE ROL ******************-
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbRoles_SELECT
AS
BEGIN
	SELECT TOP (1000) [role_Id]
      ,[role_Nombre]
      ,[role_UsuCreacion]
      ,[user_Empleado]
      ,[Nombre]
      ,[role_FechaCreacion]
      ,[role_UsuModificacion]
      ,[role_FechaModificacion]
      ,[role_Estado]
  FROM [db_Cine].[acce].[VW_tbRoles]
  WHERE [role_Estado] = 1

END

--*************** FIND DE ROL ******************-
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbRoles_FIND
@role_Id INT
AS
BEGIN

	SELECT TOP (1000) [role_Id]
      ,[role_Nombre]
      ,[role_UsuCreacion]
      ,[user_Empleado]
      ,[Nombre]
      ,[role_FechaCreacion]
      ,[role_UsuModificacion]
      ,[role_FechaModificacion]
      ,[role_Estado]
  FROM [db_Cine].[acce].[VW_tbRoles]
  WHERE [role_Estado] = 1
  AND [role_Id] = @role_Id

END

GO
--*************** INSERT DE ROL ******************-
CREATE OR ALTER PROCEDURE acce.UDP_tbROL_INSERT
 @role_Nombre nvarchar(100),
 @role_UsuCreacion int,
 @id int OUTPUT
 AS
BEGIN
BEGIN TRY		
INSERT INTO [acce].[tbRoles]
           ([role_Nombre] ,[role_UsuCreacion] )
     VALUES
           (@role_Nombre,@role_UsuCreacion)
 
SET @id = SCOPE_IDENTITY()

SELECT @id CodeStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus
END CATCH

END
--*************** UPDATE DE ROL ******************-
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbROL_UPDATE
@role_Id INT,
 @role_Nombre nvarchar(100),
 @role_UsuModificacion int
 AS
BEGIN
BEGIN TRY		
		UPDATE	[acce].[tbRoles]
			SET [role_Nombre] = @role_Nombre
				,[role_UsuModificacion] = @role_UsuModificacion
				,[role_FechaModificacion] = GETDATE()
		WHERE	[role_Id] = @role_Id
 
			SELECT 1 CodeStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus
END CATCH

END

--*************** DELETE DE ROL ******************-
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbROL_DELETE
@role_Id INT
AS
BEGIN
BEGIN TRY
		
			
		UPDATE [acce].[tbRoles]
		SET [role_Estado] = 0
		WHERE	[role_Id] = @role_Id
 
			SELECT 1 CodeStatus , 'Operacion completada exitosamente.' messageStatus
	END TRY
	BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
	END CATCH

END

--********************************************************************************************************
--*************** VISTA DE ROLES X PANTALLAS ******************--
GO
CREATE OR ALTER VIEW acce.VW_RolPantallas
AS
SELECT TOP (1000) [ropa_Id]
      ,[ropa_Rol]
      ,[ropa_Pantalla]
      ,[ropa_Estado]
      ,[ropa_UserCrea]
      ,[ropa_FechaCrea]
      ,[ropa_UserMofica]
      ,[ropa_FechaModifica]
  FROM [db_Cine].[acce].[tbRolesPantallas]

--*************** SELECT DE ROLES X PANTALLAS ******************--
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbRolPantallas_SELECT
AS
BEGIN
SELECT TOP (1000) [ropa_Id]
      ,[ropa_Rol]
      ,[ropa_Pantalla]
      ,[ropa_Estado]
      ,[ropa_UserCrea]
      ,[ropa_FechaCrea]
      ,[ropa_UserMofica]
      ,[ropa_FechaModifica]
  FROM [db_Cine].[acce].[tbRolesPantallas]
  WHERE ropa_Estado = 1
END

  --*************** INSERT DE ROLES X PANTALLAS ******************--
  GO
 CREATE OR ALTER PROCEDURE acce.UDP_tbRolPantallas_Insert  
 @ropa_Rol		INT, 
 @ropa_Pantalla INT,
 @ropa_UserCrea INT
 AS
 BEGIN
 BEGIN TRY
	INSERT INTO [acce].[tbRolesPantallas] ([ropa_Rol],[ropa_Pantalla],[ropa_UserCrea] )
    VALUES								   (@ropa_rol, @ropa_Pantalla, @ropa_UserCrea)
		   SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
END TRY
BEGIN CATCH
			SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
END CATCH
END

   --*************** FIND DE ROLES X PANTALLAS ******************--
  GO
  CREATE OR ALTER PROCEDURE acce.UDP_tbRolPantallas_FIND 
  @ropa_Id INT
  AS
  BEGIN
		BEGIN TRY
			SELECT *  
			FROM	acce.VW_RolPantallas
			WHERE	ropa_Estado = 1 
			AND		ropa_Id = @ropa_Id
		END TRY
		BEGIN CATCH
			SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
		END CATCH
END
 --*************** UPDATE DE ROLES X PANTALLAS ******************--
 GO
CREATE OR ALTER PROCEDURE acce.UDP_tbRolPantallas_UPDATE  
	@ropa_Id				INT, 
	@ropa_Rol				INT, 
	@ropa_Pantalla			INT, 
	@ropa_UserMofica		INT
	 AS
	 BEGIN
	  BEGIN TRY
			UPDATE	[acce].[tbRolesPantallas]
					SET ropa_Rol = @ropa_Rol,
						ropa_Pantalla = @ropa_Pantalla,
						ropa_UserMofica = @ropa_UserMofica,
						ropa_FechaModifica = GETDATE()
 			WHERE		ropa_Id = @ropa_Id

			SELECT 1 CodeStatus, 'Operación completada exitosamente.' messageStatus
	END TRY
	BEGIN CATCH
			SELECT 0 CodeStatus, 'No se pudo completar el proceso.' messageStatus
	END CATCH

	 END

--*************** DELETE DE ROLES X PANTALLAS ******************--
GO 
CREATE OR ALTER PROCEDURE acce.UDP_tbRolPantallas_Delete  
@ropa_Id INT
AS
BEGIN
 BEGIN TRY
		UPDATE	[acce].[tbRolesPantallas]
		SET		ropa_Estado = 0
		WHERE	ropa_Id= @ropa_Id
		SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
END CATCH
END


--*****************************************************--
--*************** VISTA DE Usuario ******************--
GO
CREATE OR ALTER VIEW acce.VW_Usuario
AS
SELECT TOP (1000) [user_Id]
      ,[user_NombreUsuario]
      ,[user_Contrasenia]
      ,[user_Empleado]
	  ,t2.empl_Nombre + ' ' + t2.empl_Apellidos AS 'Nombre'
      ,ISNULL([user_Rol], 0) AS 'user_Rol'
	  ,ISNULL(role_Nombre, 'N/A') AS 'role_Nombre'
      ,[user_EsAdmin]
      ,[user_Estado]
      ,[user_UsuarioCrea]
      ,[user_FechaCrea]
      ,[user_UsuarioModifica]
      ,[user_FechaModifica]
  FROM [db_Cine].[acce].[tbUsuarios] T1 INNER JOIN gral.tbEmpleados t2
  ON	t1.user_Empleado = t2.empl_Id  LEFT JOIN acce.tbRoles t3
  ON	t1.user_Rol = t3.role_Id





--*************** SELECT DE Usuario ******************--
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuario_Select
AS
BEGIN
	
	SELECT TOP (1000) [user_Id]
      ,[user_NombreUsuario]
      ,[user_Contrasenia]
      ,[user_Empleado]
      ,[Nombre]
      ,[user_Rol]
      ,[role_Nombre]
      ,[user_EsAdmin]
      ,[user_Estado]
      ,[user_UsuarioCrea]
      ,[user_FechaCrea]
      ,[user_UsuarioModifica]
      ,[user_FechaModifica]
  FROM [db_Cine].[acce].[VW_Usuario]
  WHERE user_Estado = 1

END

--*************** FIND DE Usuario ******************--
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuario_FIND
@user_Id    INT
AS
BEGIN
	BEGIN TRY
	SELECT TOP (1000) [user_Id]
      ,[user_NombreUsuario]
      ,[user_Contrasenia]
      ,[user_Empleado]
      ,[Nombre]
      ,[user_Rol]
      ,[role_Nombre]
      ,[user_EsAdmin]
      ,[user_Estado]
      ,[user_UsuarioCrea]
      ,[user_FechaCrea]
      ,[user_UsuarioModifica]
      ,[user_FechaModifica]
  FROM [db_Cine].[acce].[VW_Usuario]
  WHERE user_Estado = 1
  AND   user_Id = @user_Id
  	IF @@ROWCOUNT = 0
	BEGIN
		SELECT 2 AS codeStatus
	END
END TRY
BEGIN CATCH
	SELECT 0 AS codeStatus
END CATCH

END

--*************** INSERT DE Usuario ******************--
 GO
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuario_INSERT
@user_NombreUsuario		NVARCHAR(200),
@user_Contrasenia		VARCHAR(250),
@user_Empleado				int,
@user_Rol					int,
@user_EsAdmin				bit,
@user_UsuarioCrea		int
AS
BEGIN

BEGIN TRY

DECLARE @CLAVE2 VARBINARY (MAX) = HASHBYTES('SHA2_512', @user_Contrasenia)
DECLARE @INCRI2 VARCHAR(MAX) = CONVERT(VARCHAR(MAX),@CLAVE2,2)

INSERT INTO [acce].[tbUsuarios]
						(user_NombreUsuario, user_Contrasenia, user_Empleado, user_Rol, user_EsAdmin, user_UsuarioCrea)
						VALUES
						(@user_NombreUsuario,               @INCRI2,          @user_Empleado,          @user_Rol,			@user_EsAdmin,             @user_UsuarioCrea)


 	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH
END
--*************** UPDATE DE Usuario ******************--
 GO
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuario_UPDATE
@user_Id				int,
@user_NombreUsuario		nvarchar(150),
@user_Empleado				int,
@user_Rol					int,
@user_EsAdmin				bit,
@user_UsuarioModifica		int
AS
BEGIN

 BEGIN TRY
 
		UPDATE [acce].[tbUsuarios]
   SET [user_NombreUsuario] = @user_NombreUsuario
      ,[user_Empleado] = @user_Empleado
      ,[user_Rol] = @user_Rol
      ,[user_EsAdmin] = @user_EsAdmin
       ,[user_UsuarioModifica] = @user_UsuarioModifica
      ,[user_FechaModifica] = GETDATE()
 WHERE [user_Id] = @user_Id

 	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH


END


--*************** DELETE DE Usuario ******************--

 GO
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuario_DELETE
@user_Id				int
 AS
BEGIN

 BEGIN TRY
 
UPDATE [acce].[tbUsuarios]
   SET [user_Estado] = 0
 WHERE [user_Id] = @user_Id

 	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH


END


--*****************************************************--
--*************** ESQUEMA DE CINE ******************--


--*****************************************************--
--*************** VISTA DE FACTURA ******************--

GO
CREATE OR ALTER VIEW cine.VW_tbFactura
AS
SELECT TOP (1000) [fact_Id]
      ,[fact_Cliente]
	  ,t4.clie_Nombres
	  ,t4.clie_Apellidos
	  ,t4.clie_RTN
      ,[fact_Estado]
      ,[fact_UsuCrea]
	  ,t2.user_Empleado
	  ,t3.empl_Nombre + ' ' + t3.empl_Apellidos AS 'Nombre'
      ,[fact_FechaCrea]
      ,[fact_UsuMofica]
      ,[fact_FechaModifica]
  FROM [db_Cine].[cine].[tbFacturas]T1 INNER JOIN acce.tbUsuarios t2
  ON	T1.[fact_UsuCrea] = t2.user_Id INNER JOIN gral.tbEmpleados t3
  ON	t2.user_Empleado = t3.empl_Id  INNER JOIN gral.tbClientes t4
  ON	t1.fact_Cliente = t4.clie_Id
 
 


 --*************** SELECT DE FACTURA ******************--
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbFactura_SELECT
AS
BEGIN

	SELECT *
  FROM [cine].VW_tbFactura
  WHERE [fact_Estado] = 1

END

 --*************** INSERT DE FACTURA ******************--
 
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbFactura_INSERT 
@fact_Cliente	INT,
@fact_UsuCrea	int
AS
BEGIN

 BEGIN TRY
	INSERT INTO [cine].[tbFacturas]
			(fact_Cliente
            ,[fact_UsuCrea]
            ,[fact_UsuMofica]
			,[fact_FechaModifica])
     VALUES
           (@fact_Cliente
            ,@fact_UsuCrea
            ,NULL
			,NULL)

		DECLARE @facturaId INT;
		SET @facturaId = SCOPE_IDENTITY();

			   SELECT 1 CodeStatus , @facturaId messageStatus
	END TRY
	BEGIN CATCH
				SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
	END CATCH

END

 --EXECUTE gral.UDP_tbClientes_Insert   'Juan', 'Pérez', '22222522222', 1;


-- --*************** FIND DE FACTURA ******************--
-- GO
--CREATE OR ALTER PROCEDURE cine.UDP_tbFactura_FIND 
--@fact_Id		INT
--AS
--BEGIN
-- BEGIN TRY
--	SELECT [fact_Id]
--      ,[fact_Nombres]
--      ,[fact_Apellidos]
--      ,[fact_RTN]
--      ,[fact_Estado]
--      ,[fact_UsuCrea]
--      ,[fact_FechaCrea]
--      ,[fact_UsuMofica]
--      ,[fact_FechaModifica]
--  FROM [cine].VW_tbFactura
--  WHERE [fact_Estado] = 1
--  AND	[fact_Id] = @fact_Id

--  	   SELECT 1 CodeStatus
--	END TRY
--	BEGIN CATCH
--		   SELECT 0 CodeStatus
--	END CATCH

--END

 --*************** UPDATE DE FACTURA ******************--
-- GO
--CREATE OR ALTER PROCEDURE cine.UDP_tbFactura_UPDATE 
--@fact_Id		INT,
--@fact_Nombres nvarchar(100),
--@fact_Apellidos nvarchar(100),
--@fact_RTN varchar(14),
--@fact_UsuMofica int
--AS
--BEGIN
-- BEGIN TRY
--	 UPDATE [cine].[tbFacturas]
--   SET [fact_Nombres] = @fact_Nombres
--      ,[fact_Apellidos] = @fact_Apellidos
--      ,[fact_RTN] = @fact_RTN
--         ,[fact_UsuMofica] =  @fact_UsuMofica
--      ,[fact_FechaModifica] = GETDATE()
-- WHERE	[fact_Id] = @fact_Id
-- 	   SELECT 1 CodeStatus
--	END TRY
--	BEGIN CATCH
--		   SELECT 0 CodeStatus
--	END CATCH
--END


-- --*************** DELETE DE FACTURA ******************--
-- GO
--CREATE OR ALTER PROCEDURE cine.UDP_tbFactura_DELETE 
--@fact_Id		INT

--AS
--BEGIN
-- BEGIN TRY

--	UPDATE [cine].[tbFacturas]
--   SET [fact_Estado] = 0
-- WHERE	[fact_Id] = @fact_Id
-- 	   SELECT 1 CodeStatus
--	END TRY
--	BEGIN CATCH
--		   SELECT 0 CodeStatus
--	END CATCH
--END

--*****************************************************--
--*************** VISTA DE FACTURA DETALLE ******************--

GO
CREATE OR ALTER VIEW cine.VW_tbFacturaDetalle
AS
SELECT t1.fade_Factura
	  ,t3.clie_RTN
	  ,t3.clie_Nombres
	  ,t3.clie_Apellidos
	  ,t5.peli_Titulo
	  ,[fade_Tickets]
  FROM [db_Cine].[cine].[tbFacturaDetalle] t1
	INNER JOIN cine.tbFacturas t2
  	ON t1.fade_Factura = t2.fact_Id
	INNER JOIN gral.tbClientes t3
  	ON t2.fact_Cliente = t3.clie_Id
	INNER JOIN cine.tbProyecciones t4
  	ON t1.fade_Proyeccion = t4.proy_Id
	INNER JOIN cine.tbPeliculas t5
  	ON t4.proy_Pelicula = t5.peli_Id
GROUP BY  t1.fade_Factura,t3.clie_RTN, t5.peli_Titulo, [fade_Tickets], t3.clie_Nombres, t3.clie_Apellidos
GO
CREATE OR ALTER VIEW cine.VW_tbFacturaDetalle1
AS
SELECT TOP (1000) [fade_Id]
 ,[fade_Factura]
  ,t3.clie_RTN
	  ,t3.clie_Nombres
	  ,t3.clie_Apellidos
	    ,[fade_Proyeccion]
		  ,t5.peli_Titulo
	  ,t6.sala_Id
	  ,t7.casa_Categoria
	    ,[fade_Tickets]
    ,CAST(t7.casa_Precio AS decimal(10,2)) AS casa_Precio
      ,CASE WHEN [fade_Combo_Id] IS NULL THEN 'N/A' ELSE CAST([fade_Combo_Id] AS varchar(10)) END AS [fade_Combo_Id]
      ,CASE WHEN [fade_Combo_Cantidad] IS NULL THEN 'N/A' ELSE CAST([fade_Combo_Cantidad] AS varchar(10)) END AS [fade_Combo_Cantidad]
	  ,t9.comb_Descripcion
      ,CASE WHEN [fade_ComboDetalle] IS NULL THEN 'N/A' ELSE CAST([fade_ComboDetalle] AS varchar(10)) END AS [fade_ComboDetalle]
      ,CASE WHEN [fade_ComboDetalle_Cantidad] IS NULL THEN 'N/A' ELSE CAST([fade_ComboDetalle_Cantidad] AS varchar(10)) END AS [fade_ComboDetalle_Cantidad]
      ,[fade_Pago]
	  ,t8.pago_Descripcion
      , [fade_Tickets] * t7.casa_Precio as [fade_Total_Tickets]
      , fade_Combo_Cantidad * t9.comb_Precio as [fade_Total_Combo]
      ,([fade_Tickets] * t7.casa_Precio) + (fade_Combo_Cantidad * t9.comb_Precio) as [fade_Total]
      ,[fade_Estado]
      ,[fade_UsuCrea]
      ,[fade_FechaCrea]
      ,[fade_UsuMofica]
      ,[fade_FechaModifica]
  FROM [db_Cine].[cine].[tbFacturaDetalle] t1
  INNER JOIN cine.tbFacturas t2
  	ON t1.fade_Factura = t2.fact_Id
  INNER JOIN gral.tbClientes t3
  	ON t2.fact_Cliente = t3.clie_Id
  INNER JOIN cine.tbProyecciones t4
  	ON t1.fade_Proyeccion = t4.proy_Id
  INNER JOIN cine.tbPeliculas t5
  	ON t4.proy_Pelicula = t5.peli_Id
  INNER JOIN cine.tbSalas t6
	  ON t4.proy_Sala = t6.sala_Id
  INNER JOIN cine.tbCategoriaSala t7
	  ON t6.sala_Tipo = t7.casa_Id
  INNER JOIN gral.tbMetodosPago t8
	  ON  t1.fade_Pago = t8.pago_Id
  INNER JOIN cine.tbCombos t9
     on t1.fade_Combo_Id = t9.comb_Id
UNION ALL
SELECT TOP (1000) [fade_Id]
      ,[fade_Factura]
	  ,t3.clie_RTN
	  ,t3.clie_Nombres
	  ,t3.clie_Apellidos
      ,[fade_Proyeccion]
	  ,t5.peli_Titulo
	  ,t6.sala_Id
	  ,t7.casa_Categoria
      ,[fade_Tickets]
	  ,CAST(t7.casa_Precio AS decimal(10,2)) AS casa_Precio
      ,CASE WHEN [fade_Combo_Id] IS NULL THEN 'N/A' ELSE CAST([fade_Combo_Id] AS varchar(10)) END AS [fade_Combo_Id]
      ,CASE WHEN [fade_Combo_Cantidad] IS NULL THEN 'N/A' ELSE CAST([fade_Combo_Cantidad] AS varchar(10)) END AS [fade_Combo_Cantidad]
      ,CASE WHEN [fade_ComboDetalle] IS NULL THEN 'N/A' ELSE CAST([fade_ComboDetalle] AS varchar(10)) END AS [fade_ComboDetalle]
	  ,t9.insu_Descripcion
      ,CASE WHEN [fade_ComboDetalle_Cantidad] IS NULL THEN 'N/A' ELSE CAST([fade_ComboDetalle_Cantidad] AS varchar(10)) END AS [fade_ComboDetalle_Cantidad]
      ,[fade_Pago]
	  ,t8.pago_Descripcion
      ,[fade_Tickets] * t7.casa_Precio as [fade_Total_Tickets]
      , [fade_ComboDetalle] * t9.insu_Precio as [fade_Total_Combo]
      ,([fade_Tickets] * t7.casa_Precio) + ([fade_ComboDetalle] * t9.insu_Precio) as [fade_Total]
      ,[fade_Estado]
      ,[fade_UsuCrea]
      ,[fade_FechaCrea]
      ,[fade_UsuMofica]
      ,[fade_FechaModifica]
  FROM [db_Cine].[cine].[tbFacturaDetalle] t1
  INNER JOIN cine.tbFacturas t2
  	ON t1.fade_Factura = t2.fact_Id
  INNER JOIN gral.tbClientes t3
  	ON t2.fact_Cliente = t3.clie_Id
  INNER JOIN cine.tbProyecciones t4
  	ON t1.fade_Proyeccion = t4.proy_Id
  INNER JOIN cine.tbPeliculas t5
  	ON t4.proy_Pelicula = t5.peli_Id
  INNER JOIN cine.tbSalas t6
	  ON t4.proy_Sala = t6.sala_Id
  INNER JOIN cine.tbCategoriaSala t7
	  ON t6.sala_Tipo = t7.casa_Id
  INNER JOIN gral.tbMetodosPago t8
	  ON  t1.fade_Pago = t8.pago_Id
  INNER JOIN cine.tbInsumos t9
     on t1.fade_ComboDetalle = t9.insu_Id
UNION ALL
SELECT TOP (1000) [fade_Id]
      ,[fade_Factura]
	  ,t3.clie_RTN
	  ,t3.clie_Nombres
	  ,t3.clie_Apellidos
      ,[fade_Proyeccion]
	  ,t5.peli_Titulo
	  ,t6.sala_Id
	  ,t7.casa_Categoria
      ,[fade_Tickets]
	  ,t7.casa_Precio
      ,CASE WHEN [fade_Combo_Id] IS NULL THEN 'N/A' ELSE CAST([fade_Combo_Id] AS varchar(10)) END AS [fade_Combo_Id]
      ,CASE WHEN [fade_Combo_Cantidad] IS NULL THEN 'N/A' ELSE CAST([fade_Combo_Cantidad] AS varchar(10)) END AS [fade_Combo_Cantidad]
      ,CASE WHEN [fade_ComboDetalle] IS NULL THEN 'N/A' ELSE CAST([fade_ComboDetalle] AS varchar(10)) END AS [fade_ComboDetalle]
	  ,NULL AS col4
      ,CASE WHEN [fade_ComboDetalle_Cantidad] IS NULL THEN 'N/A' ELSE CAST([fade_ComboDetalle_Cantidad] AS varchar(10)) END AS [fade_ComboDetalle_Cantidad]
	   ,[fade_Pago]
	     ,t8.pago_Descripcion
      ,[fade_Tickets] * t7.casa_Precio as [fade_Total_Tickets]
      , null as [fade_Total_Combo]
      ,([fade_Tickets] * t7.casa_Precio) as [fade_Total]
	      ,[fade_Estado]
      ,[fade_UsuCrea]
      ,[fade_FechaCrea]
      ,[fade_UsuMofica]
      ,[fade_FechaModifica]
	   FROM [db_Cine].[cine].[tbFacturaDetalle] t1
  INNER JOIN cine.tbFacturas t2
  	ON t1.fade_Factura = t2.fact_Id
  INNER JOIN gral.tbClientes t3
  	ON t2.fact_Cliente = t3.clie_Id
  INNER JOIN cine.tbProyecciones t4
  	ON t1.fade_Proyeccion = t4.proy_Id
  INNER JOIN cine.tbPeliculas t5
  	ON t4.proy_Pelicula = t5.peli_Id
  INNER JOIN cine.tbSalas t6
	  ON t4.proy_Sala = t6.sala_Id
  INNER JOIN cine.tbCategoriaSala t7
	  ON t6.sala_Tipo = t7.casa_Id
  INNER JOIN gral.tbMetodosPago t8
	  ON  t1.fade_Pago = t8.pago_Id
WHERE [fade_Combo_Cantidad] IS NULL AND [fade_ComboDetalle] IS NULL



 --*************** SELECT DE FACTURA DETALLE ******************--
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbFacturaDetalle_SELECT
AS
BEGIN
	SELECT TOP (1000)  fade_Factura
		,[clie_RTN]
      ,[clie_Nombres]
      ,[clie_Apellidos]
      ,[peli_Titulo]
      ,[fade_Tickets]
	  FROM [db_Cine].[cine].[VW_tbFacturaDetalle]
END

GO
CREATE OR ALTER PROCEDURE cine.UDP_tbFacturaDetalleFinal_SELECT 
@clie_RTN VARCHAR(200),
@fade_Factura int 
AS
BEGIN
	DECLARE @tikets decimal(16,2) = (SELECT TOP (1) fade_Tickets * [casa_Precio] FROM cine.VW_tbFacturaDetalle1 WHERE clie_RTN = @clie_RTN AND fade_Factura = @fade_Factura)
DECLARE @combo decimal(16,2) = (SELECT SUM([fade_Total_Combo]) FROM cine.VW_tbFacturaDetalle1 WHERE clie_RTN = @clie_RTN AND fade_Factura = @fade_Factura)
DECLARE @Total decimal(16,2) = COALESCE(@combo, @tikets)
IF @Total = 0
    SET @Total = COALESCE(@combo, @tikets)
	SELECT TOP (1000) [fade_Id]
      ,[fade_Factura]
      ,[clie_RTN]
      ,[clie_Nombres]
      ,[clie_Apellidos]
      ,[fade_Proyeccion]
      ,[peli_Titulo]
      ,[sala_Id]
      ,[casa_Categoria]
      ,[fade_Tickets]
      ,[casa_Precio]
      ,[fade_Combo_Id]
      ,[fade_Combo_Cantidad]
      ,[comb_Descripcion]
      ,[fade_ComboDetalle]
      ,[fade_ComboDetalle_Cantidad]
      ,[fade_Pago]
      ,[pago_Descripcion]
      ,[fade_Total_Tickets]
      ,[fade_Total_Combo]
      ,@Total as [fade_Total]
      ,[fade_Estado]
      ,[fade_UsuCrea]
      ,[fade_FechaCrea]
      ,[fade_UsuMofica]
      ,[fade_FechaModifica]
  FROM [db_Cine].[cine].[VW_tbFacturaDetalle1]
  where clie_RTN = @clie_RTN and fade_Factura = @fade_Factura
END

/*

 --*************** INSERT DE FACTURA DETALLE ******************--
 GO
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbFacturaDetalle_INSERT 
	@fade_Factura		INT, 
	@fade_Proyeccion	INT, 
	@fade_ComboDetalle  INT, 
	@fade_UsuCrea		INT
AS
BEGIN
 BEGIN TRY
	INSERT INTO [cine].[tbFacturaDetalle]([fade_Factura], [fade_Proyeccion],[fade_ComboDetalle], [fade_UsuCrea])
     VALUES								(@fade_Factura, @fade_Proyeccion, @fade_ComboDetalle, @fade_UsuCrea)
		   	   
			   SELECT 1 CodeStatus , 'Operacion completada exitosamente.' messageStatus
	END TRY
	BEGIN CATCH
				SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
	END CATCH

END
 --*************** FIND DE FACTURA DETALLE ******************--
 GO
CREATE OR ALTER PROCEDURE cine.UDP_tbFacturaDetalle_FIND 
@fade_Id		INT
AS
BEGIN
 BEGIN TRY
			SELECT	fade_Id, 
					fade_Factura, 
					fade_Proyeccion, 
					fade_ComboDetalle, 
					fade_Estado, 
					fade_UsuCrea, 
					fade_FechaCrea, 
					fade_UsuMofica, 
					fade_FechaModifica
			FROM    [cine].[tbFacturaDetalle]
			WHERE	fade_Estado = 1
			AND		fade_Id= @fade_Id
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus,  'No se pudo completar el proceso.' messageStatus
	END CATCH
END

 --*************** UPDATE DE FACTURA DETALLE ******************--
 GO
CREATE OR ALTER PROCEDURE cine.UDP_tbFacturaDetalle_UPDATE 
	@fade_Id			INT, 
	@fade_Factura		INT, 
	@fade_Proyeccion	INT, 
	@fade_ComboDetalle	INT, 
	@fade_UsuMofica		INT
AS
BEGIN
 BEGIN TRY
	 UPDATE [cine].[tbFacturaDetalle]
	 SET	fade_Factura = @fade_Factura,
			fade_Proyeccion = @fade_Proyeccion,
			fade_ComboDetalle = @fade_ComboDetalle,
			fade_UsuMofica = @fade_UsuMofica,
			fade_FechaModifica = GETDATE()
	 WHERE	fade_Id = @fade_Id
		
 	   SELECT 1 CodeStatus , 'Operacion completada exitosamente.' messageStatus
	END TRY
	BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
	END CATCH
END
*/
-- EXEC cine.UDP_tbFacturaDetalle_INSERT 1,1,20,'[]','[]',1,1,1
---- EXEC cine.UDP_tbFacturaDetalle_INSERT 1,1,20,'[{"id": 2, "cantidad": 12}, {"id": 2, "cantidad": 2}, {"id": 3, "cantidad": 1}]','[{"id": 1, "cantidad": 3}, {"id": 2, "cantidad": 2}, {"id": 3, "cantidad": 1}]',1,1,1

go
CREATE OR ALTER PROCEDURE cine.UDP_tbFacturaDetalle_INSERT  
(
    @fade_Factura INT,
    @fade_Proyeccion INT,
	@fade_Tickets		INT,
	@fade_ContenidoCombo NVARCHAR(MAX),
	@fade_ContenidoInsumo NVARCHAR(MAX),
    @fade_Pago INT,
    @fade_Total  INT,
    @fade_UsuCrea INT
)
AS
BEGIN
	BEGIN TRY
	BEGIN TRAN
	CREATE TABLE #tempFacturaDetalle (
		fade_Factura			INT,
		fade_Proyeccion			INT,
		fade_Tickets			INT,
		fade_ContenidoCombo		NVARCHAR(MAX),
		fade_ContenidoInsumo	NVARCHAR(MAX),
		fade_Pago				INT,
		fade_Total				INT,
		fade_UsuCrea			INT
		)

	INSERT INTO #tempFacturaDetalle (
			fade_Factura,
			fade_Proyeccion,
			fade_Tickets,
			fade_ContenidoCombo,
			fade_ContenidoInsumo,
			fade_Pago,
			fade_Total,
			fade_UsuCrea
		)
		VALUES (
			@fade_Factura,
			@fade_Proyeccion,
			@fade_Tickets,
			@fade_ContenidoCombo,
			@fade_ContenidoInsumo,
			@fade_Pago,
			@fade_Total,
			@fade_UsuCrea
		)
   
			IF (@fade_ContenidoInsumo = '[]' AND @fade_ContenidoCombo = '[]')
BEGIN
    INSERT INTO [cine].[tbFacturaDetalle]
    (
        [fade_Factura],
        [fade_Proyeccion],
        [fade_Tickets],
        [fade_Pago],
        [fade_Total],
        [fade_UsuCrea]
    )
    SELECT
        [fade_Factura],
        [fade_Proyeccion],
        [fade_Tickets],
        [fade_Pago],
        [fade_Total],
        [fade_UsuCrea]
    FROM #tempFacturaDetalle
END
ELSE
BEGIN
    INSERT INTO [cine].[tbFacturaDetalle]
    (
        [fade_Factura],
        [fade_Proyeccion],
        [fade_Tickets],
        [fade_Combo_Id],
        [fade_Combo_Cantidad],
        [fade_ComboDetalle],
        [fade_ComboDetalle_Cantidad],
        [fade_Pago],
        [fade_Total],
        [fade_UsuCrea]
    )
    SELECT
        [fade_Factura],
        [fade_Proyeccion],
        [fade_Tickets],
        t2.[id] as [fade_Combo_Id],
        t2.[cantidad] as [fade_Combo_Cantidad],
        null as [fade_ComboDetalle],
        null as [fade_ComboDetalle_Cantidad],
        [fade_Pago],
        [fade_Total],
        [fade_UsuCrea]
    FROM #tempFacturaDetalle t1
    CROSS APPLY OPENJSON(@fade_ContenidoCombo) WITH ([id] int '$.id', [cantidad] int '$.cantidad') t2
    UNION ALL
    SELECT
        [fade_Factura],
        [fade_Proyeccion],
        [fade_Tickets],
        null as [fade_Combo_Id],
        null as [fade_Combo_Cantidad],
        t2.[id] as [fade_ComboDetalle],
        t2.[cantidad] as [fade_ComboDetalle_Cantidad],
        [fade_Pago],
        [fade_Total],
        [fade_UsuCrea]
    FROM #tempFacturaDetalle t1
    CROSS APPLY OPENJSON(@fade_ContenidoInsumo) WITH ([id] int '$.id', [cantidad] int '$.cantidad') t2
END

 		SELECT 1 CodeStatus, 'Operacion completada exitosamente.' messageStatus

		COMMIT

	END TRY
	BEGIN CATCH
	ROLLBACK
		SELECT 0 CodeStatus, 'No se pudo completar el proceso.' messageStatus

	END CATCH
END;


--EXEC cine.UDP_tbFacturaDetalle_INSERT @factura = 1, @proyeccion = 1, @Tickets = 33, @comboDetalle = 1, @fade_ContenidoCombo = {"comboDetalle": [{"id": 2, "cantidad": 2}, {"id": 4, "cantidad": 2}]}'), @pago = 1, @usuCrea = 1;

GO
CREATE OR ALTER PROCEDURE cine.UDP_tbTickets_INSERT
    @tick_Factura INT,
    @tick_Proyeccion INT,
    @tick_Asiento INT,
    @tick_UsuCrea INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRANSACTION
	begin try
	

    -- Insertar nuevo registro en tbTickets
    INSERT INTO cine.tbTickets (tick_Factura, tick_Proyeccion, tick_Asiento, tick_UsuCrea)
    VALUES (@tick_Factura, @tick_Proyeccion, @tick_Asiento, @tick_UsuCrea)

    -- Actualizar estado del asiento correspondiente a 0
    UPDATE cine.tbAsientos
    SET asie_Reservado = 0, asie_UserMofica = @tick_UsuCrea, asie_FechaModifica = GETDATE()
    WHERE asie_Id = @tick_Asiento
	 	   SELECT 1 CodeStatus , 'Operacion completada exitosamente.' messageStatus

	end try
	begin catch
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus

	end catch
    COMMIT TRANSACTION
END

--FacturaAqui

 --*************** DELETE DE FACTURA DETALLE ******************--
 GO
CREATE OR ALTER PROCEDURE cine.UDP_tbFacturaDetalle_DELETE 
@fade_Id		INT
AS
BEGIN
 BEGIN TRY
	UPDATE [cine].[tbFacturaDetalle]
	SET     fade_Estado = 0
	WHERE		fade_Id = @fade_Id

 	SELECT 1 CodeStatus , 'Operacion completada exitosamente.' messageStatus
	END TRY
	BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
	END CATCH
END


--*****************************************************--
--*************** VISTA DE SUCURSAL ******************--
GO
CREATE OR ALTER view cine.VW_tbSUCURSAL
AS
SELECT [sucu_Id]
      ,[sucu_Nombre]
      ,[sucu_Direccion]
	    ,t5.dept_Id
	  ,t5.dept_Descripcion
      ,[sucu_Ciudad]
	    ,t4.muni_Descripcion
      ,[sucu_Estado]
      ,[sucu_UserCrea]
	  ,t2.user_Empleado
	  ,t3.empl_Nombre + ' ' + t3.empl_Apellidos AS 'Nombre'
      ,[sucu_FechaCrea]
      ,[sucu_UsuarioModifica]
      ,[sucu_FechaModifica]
  FROM [cine].[tbSucursales] T1 INNER JOIN acce.tbUsuarios t2
  ON	T1.sucu_UserCrea = t2.user_Id INNER JOIN gral.tbEmpleados t3
  ON	t2.user_Empleado = t3.empl_Id  INNER JOIN gral.tbMunicipios t4
  on t1.sucu_Ciudad = t4.muni_Id	INNER JOIN gral.tbDepartamentos t5
  on t4.muni_depId = t5.dept_Id


 --*************** SELECT DE SUCURSAL ******************--

GO
CREATE OR ALTER PROCEDURE cine.UDP_tbSucursale_SELECT
AS
BEGIN
	
	SELECT TOP (1000) [sucu_Id]
      ,[sucu_Nombre]
      ,[sucu_Direccion]
	   ,[dept_Id]
      ,[dept_Descripcion]
      ,[sucu_Ciudad]
	     ,[muni_Descripcion]
      ,[sucu_Estado]
      ,[sucu_UserCrea]
      ,[user_Empleado]
	  ,[Nombre]
      ,[sucu_FechaCrea]
      ,[sucu_UsuarioModifica]
      ,[sucu_FechaModifica]
  FROM [db_Cine].[cine].[VW_tbSUCURSAL]
  WHERE [sucu_Estado] = 1

END


--*************** INSERT DE SUCURSAL ******************--
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbSucursale_INSERT
@sucu_Nombre nvarchar(max),
@sucu_Direccion nvarchar(max),
@sucu_Ciudad int,
@sucu_UserCrea int
AS
BEGIN
	
	 BEGIN TRY

	 INSERT INTO [cine].[tbSucursales]
           ([sucu_Nombre]
           ,[sucu_Direccion]
           ,[sucu_Ciudad]
           ,[sucu_UserCrea]
           ,[sucu_UsuarioModifica]
           ,[sucu_FechaModifica])
     VALUES
           (@sucu_Nombre
           ,@sucu_Direccion
           ,@sucu_Ciudad
            ,@sucu_UserCrea
            ,NULL
           ,NULL)

	 	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH

END
--*************** FIND DE SUCURSAL ******************--
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbSucursale_FIND 
@sucu_Id INT
AS
BEGIN
	
	SELECT TOP (1000) [sucu_Id]
      ,[sucu_Nombre]
      ,[sucu_Direccion]
	    ,[dept_Id]
      ,[dept_Descripcion]
      ,[sucu_Ciudad]
	   ,[muni_Descripcion]
      ,[sucu_Estado]
      ,[sucu_UserCrea]
      ,[user_Empleado]
	   ,[Nombre]
      ,[sucu_FechaCrea]
      ,[sucu_UsuarioModifica]
      ,[sucu_FechaModifica]
  FROM [db_Cine].[cine].[VW_tbSUCURSAL]
  WHERE [sucu_Estado] = 1
  AND	[sucu_Id] = @sucu_Id

END

--*************** UPDATE DE SUCURSAL ******************--
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbSucursale_UPDATE
@sucu_Id INT,
@sucu_Nombre nvarchar(max),
@sucu_Direccion nvarchar(max),
@sucu_Ciudad int,
@sucu_UsuarioModifica int
AS
BEGIN
	
	 BEGIN TRY

UPDATE [cine].[tbSucursales]
   SET [sucu_Nombre] = @sucu_Nombre
      ,[sucu_Direccion] = @sucu_Direccion
      ,[sucu_Ciudad] = @sucu_Ciudad
         ,[sucu_UsuarioModifica] = @sucu_UsuarioModifica
      ,[sucu_FechaModifica] = GETDATE()
 WHERE [sucu_Id] = @sucu_Id

	 	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH

END

--*************** DELETE DE SUCURSAL ******************--
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbSucursale_DELETE
 @sucu_Id INT
AS
BEGIN
	
	 BEGIN TRY

UPDATE [cine].[tbSucursales]
   SET [sucu_Estado] = 0
 WHERE [sucu_Id] = @sucu_Id

	 	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH

END

--*****************************************************--
--*************** VISTA DE INSUMOS ******************--

GO
CREATE OR ALTER VIEW cine.VW_tbInsumos
AS 
SELECT TOP (1000) [insu_Id]
      ,[insu_Descripcion]
      ,[insu_Precio]
      ,[insu_href]
      ,[insu_src]
      ,[insu_alt]
      ,[insu_Estado]
      ,[insu_UserCrea]
 	  ,t2.user_Empleado
	  ,t3.empl_Nombre + ' ' + t3.empl_Apellidos AS 'Nombre'
      ,[insu_FechaCrea]
      ,[insu_UsuarioModifica]
      ,[insu_FechaModifica]
  FROM [db_Cine].[cine].[tbInsumos] T1 INNER JOIN acce.tbUsuarios t2
  ON	T1.[insu_UserCrea] = t2.user_Id INNER JOIN gral.tbEmpleados t3
  ON	t2.user_Empleado = t3.empl_Id  


--*************** SELECT DE INSUMO ******************--
GO
CREATE OR ALTER PROCEDURE cine.UPD_tbInsumo_SELECT 
AS
BEGIN

	SELECT TOP (1000)	[insu_Id]
						,[insu_Descripcion]
						,[insu_Precio]
						,[insu_href]
						,[insu_src]
						,[insu_alt]
						,[insu_Estado]
						,[insu_UserCrea]
						,[insu_FechaCrea]
						,[insu_UsuarioModifica]
						,[insu_FechaModifica]
  FROM					[cine].[VW_tbInsumos]
  WHERE					insu_Estado = 1

END


--*************** INSERT DE INSUMO ******************--
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbInsumos_INSERT  
@insu_Descripcion nvarchar(max),
@insu_Precio decimal(18,2),
@insu_UserCrea int
AS
BEGIN

 BEGIN TRY

	INSERT INTO [cine].[tbInsumos]
           ([insu_Descripcion]
           ,[insu_Precio]
           ,[insu_href]
           ,[insu_src]
           ,[insu_alt]
            ,[insu_UserCrea]
            ,[insu_UsuarioModifica]
           ,[insu_FechaModifica])
     VALUES
           (@insu_Descripcion
           ,@insu_Precio
           ,NULL
           ,NULL
           ,NULL
            ,@insu_UserCrea
            ,NULL
           ,NULL)

		   	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH

END


--*************** FIND DE INSUMO ******************--

GO
CREATE OR ALTER PROCEDURE cine.UPD_tbInsumo_FIND
@insu_Id int
AS
BEGIN

 BEGIN TRY

	SELECT TOP (1000)	[insu_Id]
						,[insu_Descripcion]
						,[insu_Precio]
						,[insu_href]
						,[insu_src]
						,[insu_alt]
						,[insu_Estado]
						,[insu_UserCrea]
						,[insu_FechaCrea]
						,[insu_UsuarioModifica]
						,[insu_FechaModifica]
  FROM					[cine].[VW_tbInsumos]
  WHERE					insu_Estado = 1
  AND					[insu_Id] = @insu_Id

  	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH

END

--*************** UPDATE DE INSUMO ******************--


GO
CREATE OR ALTER PROCEDURE cine.UDP_tbInsumo_UPDATE
@insu_Id int,
@insu_Descripcion nvarchar(max),
@insu_Precio decimal(18,2),
@insu_UsuarioModifica int  
AS
BEGIN

 BEGIN TRY
	UPDATE [cine].[tbInsumos]
   SET [insu_Descripcion] = @insu_Descripcion
      ,[insu_Precio] = @insu_Precio
      ,[insu_href] = NULL
      ,[insu_src] = NULL
      ,[insu_alt] = NULL
       ,[insu_UsuarioModifica] = @insu_UsuarioModifica
      ,[insu_FechaModifica] = GETDATE()
 WHERE [insu_Id] = @insu_Id
 	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH


END

--*************** DELETE DE INSUMO ******************--


GO
CREATE OR ALTER PROCEDURE cine.UDP_Insumo_DELETE
@insu_Id int
AS
BEGIN

	UPDATE [cine].[tbInsumos]
	SET  [insu_Estado] = 0
	WHERE [insu_Id] = @insu_Id


END
	


--*****************************************************--
--*************** VISTA DE COMBOS ******************--
GO
CREATE OR ALTER VIEW cine.VW_tbCombo
AS
 SELECT TOP (1000) [comb_Id]
      ,[comb_Descripcion]
      ,[comb_Precio]
      ,[comb_Estado]
      ,[comb_UserCrea]
	  ,t2.user_Empleado
	  ,t3.empl_Nombre + ' ' + t3.empl_Apellidos AS 'Nombre'
      ,[comb_FechaCrea]
      ,[comb_UsuarioModifica]
      ,[comb_FechaModifica]
  FROM [db_Cine].[cine].[tbCombos] T1 INNER JOIN acce.tbUsuarios t2
  ON	T1.[comb_UserCrea] = t2.user_Id INNER JOIN gral.tbEmpleados t3
  ON	t2.user_Empleado = t3.empl_Id  


--*************** SELECT DE COMBOS ******************--
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbCombos_SELECT
AS
BEGIN

	SELECT TOP (1000) [comb_Id]
      ,[comb_Descripcion]
      ,[comb_Precio]
      ,[comb_Estado]
      ,[comb_UserCrea]
      ,[comb_FechaCrea]
      ,[comb_UsuarioModifica]
      ,[comb_FechaModifica]
  FROM [db_Cine].[cine].[VW_tbCombo]
  WHERE [comb_Estado] = 1

END

 --*************** INSERT DE COMBOS ******************--
 GO
 CREATE OR ALTER PROCEDURE cine.UDP_tbCombos_INSERT
@comb_Descripcion nvarchar(max),
@comb_Precio decimal(18,2),
@comb_UserCrea int
 AS
 BEGIN
	 BEGIN TRY
	INSERT INTO [cine].[tbCombos]
				([comb_Descripcion]
				,[comb_Precio]
				,[comb_UserCrea]
				,[comb_UsuarioModifica]
				,[comb_FechaModifica])
     VALUES
				(@comb_Descripcion
				,@comb_Precio
				,@comb_UserCrea
				,NULL
				,NULL)

	SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
	END TRY
	BEGIN CATCH
	SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
	END CATCH
 END



 --*************** FIND DE COMBOS ******************--
 GO
  
CREATE OR ALTER PROCEDURE cine.UDP_tbCombos_FIND
@comb_Id INT
AS
BEGIN
 BEGIN TRY
	SELECT TOP (1000) [comb_Id]
      ,[comb_Descripcion]
      ,[comb_Precio]
      ,[comb_Estado]
      ,[comb_UserCrea]
      ,[comb_FechaCrea]
      ,[comb_UsuarioModifica]
      ,[comb_FechaModifica]
  FROM [db_Cine].[cine].[VW_tbCombo]
  WHERE [comb_Estado] = 1
  AND	[comb_Id] = @comb_Id
  	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH
END

 --*************** UPDATE DE COMBOS ******************--
 GO
 CREATE OR ALTER PROCEDURE cine.UDP_tbCombos_UPDATE
@comb_Id INT,
@comb_Descripcion nvarchar(max),
@comb_Precio decimal(18,2),
@comb_UsuarioModifica int
AS
BEGIN
 BEGIN TRY
		UPDATE [cine].[tbCombos]
		SET [comb_Descripcion] = @comb_Descripcion
		,[comb_Precio] = @comb_Precio
		,[comb_UsuarioModifica] = @comb_UsuarioModifica
		,[comb_FechaModifica] = GETDATE()
		WHERE [comb_Id] = @comb_Id
			   SELECT 1 CodeStatus
	SELECT 1 CodeStatus , 'Operacion completada exitosamente.' messageStatus
	END TRY
	BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
	END CATCH

END

 --*************** DELETE DE COMBOS ******************--

 GO
 CREATE OR ALTER PROCEDURE cine.UDP_tbCombos_DELETE
@comb_Id INT

AS
BEGIN
	BEGIN TRY
	UPDATE [cine].[tbCombos]
	SET [comb_Estado] = 0
	WHERE [comb_Id] = @comb_Id

		SELECT 1 CodeStatus , 'Operacion completada exitosamente.' messageStatus
	END TRY
	BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
	END CATCH
END
--------------------------------------------------------------
-------------------------------------------------------------


--*****************************************************--
--*************** VISTA DE COMBOSDETALLES ******************--
GO
CREATE OR ALTER VIEW cine.VW_tbComboDetalles
AS
 SELECT TOP (1000) [cdet_Id]
      ,[cdet_combId]
	  ,T4.comb_Descripcion
	  ,T4.comb_Precio
      ,[cdet_insuId]
	  ,t5.insu_Descripcion
	  ,t5.insu_Precio
      ,[cdet_Estado]
      ,[cdet_UserCrea]
	  ,t2.user_Empleado
	  ,t3.empl_Nombre + ' ' + t3.empl_Apellidos AS 'Nombre'
      ,[cdet_FechaCrea]
      ,[cdet_UserMofica]
      ,[cdet_FechaModifica]
	FROM [db_Cine].[cine].[tbComboDetalle] T1
	INNER JOIN acce.tbUsuarios t2 ON T1.[cdet_UserCrea] = t2.user_Id
	INNER JOIN gral.tbEmpleados t3 ON t2.user_Empleado = t3.empl_Id
	INNER JOIN cine.tbCombos T4 ON T1.cdet_combId = T4.comb_Id
	INNER JOIN cine.tbInsumos t5 ON T1.cdet_insuId = t5.insu_Id


--*************** SELECT DE COMBOS ******************--
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbCombosDetalle_SELECT
AS
BEGIN

	SELECT TOP (1000) [cdet_Id]
      ,[cdet_combId]
      ,[cdet_insuId]
      ,[cdet_Estado]
      ,[cdet_UserCrea]
      ,[cdet_FechaCrea]
      ,[cdet_UserMofica]
      ,[cdet_FechaModifica]
  FROM  [cine].[VW_tbComboDetalles]
  WHERE [cdet_Estado] = 1

END

 --*************** INSERT DE COMBOS ******************--
 GO
 CREATE OR ALTER PROCEDURE cine.UDP_tbCombosDetalles_INSERT
@cdet_combId int,
@cdet_insuId int,
@cdet_UserCrea int
 AS
 BEGIN
	 BEGIN TRY
	INSERT INTO [cine].[tbComboDetalle]
			([cdet_combId]
			,[cdet_insuId]
			,[cdet_UserCrea]
			,[cdet_UserMofica]
			,[cdet_FechaModifica])
     VALUES
			(@cdet_combId
			,@cdet_insuId
			,@cdet_UserCrea
			,NULL
			,NULL)
		SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
	END TRY
	BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
	END CATCH
 END



 --*************** FIND DE COMBOS ******************--
 GO
  
CREATE OR ALTER PROCEDURE cine.UDP_tbCombosDtalle_FIND
@cdet_Id INT
AS
BEGIN
 BEGIN TRY
	SELECT TOP (1000) [cdet_Id]
      ,[cdet_combId]
      ,[cdet_insuId]
      ,[cdet_Estado]
      ,[cdet_UserCrea]
      ,[cdet_FechaCrea]
      ,[cdet_UserMofica]
      ,[cdet_FechaModifica]
  FROM  [cine].[VW_tbComboDetalles]
  WHERE [cdet_Estado] = 1
  AND	[cdet_Id] = @cdet_Id
  		SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
	END TRY
	BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
	END CATCH
END

 --*************** UPDATE DE COMBOS ******************--
 GO
 CREATE OR ALTER PROCEDURE cine.UDP_tbComboDetalle_UPDATE
@cdet_Id INT,
@cdet_combId int,
@cdet_insuId int,
@cdet_UserMofica int
AS
BEGIN
 BEGIN TRY
		UPDATE [cine].[tbComboDetalle]
   SET [cdet_combId] = @cdet_combId
      ,[cdet_insuId] = @cdet_insuId
       ,[cdet_UserMofica] = @cdet_UserMofica
      ,[cdet_FechaModifica] = GETDATE()
 WHERE [cdet_Id] = @cdet_Id

	SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH

END

 --*************** DELETE DE COMBOS ******************--

 GO
 CREATE OR ALTER PROCEDURE cine.UDP_tbComboDetalle_DELETE
@cdet_Id INT

AS
BEGIN
	BEGIN TRY
		UPDATE [cine].[tbComboDetalle]
		SET [cdet_Estado] = 0
		WHERE [cdet_Id] = @cdet_Id
		SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
	END TRY
	BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
	END CATCH
END


--*****************************************************--
--*************** VISTA DE Director ******************--
GO
CREATE OR ALTER VIEW cine.VW_tbDirector
AS
SELECT [dire_Id]
      ,[dire_Nombres]
      ,[dire_Apellidos]
      ,[dire_FechaNacimiento]
 	  ,CASE [dire_Sexo]
             WHEN 'M' THEN 'Masculino'
             WHEN 'F' THEN 'Femenino'
             ELSE 'No especificado'
        END AS [dire_Sexo]
      ,[dire_Estado]
      ,[dire_UsuCrea]
	  ,t2.user_Empleado
	  ,t3.empl_Nombre + ' ' + t3.empl_Apellidos AS 'Nombre'
      ,[dire_FechaCrea]
      ,[dire_UsuMofica]
      ,[dire_FechaModifica]
  FROM [cine].[tbDirectores] T1 INNER JOIN acce.tbUsuarios t2
  ON	T1.[dire_UsuCrea] = t2.user_Id INNER JOIN gral.tbEmpleados t3
  ON	t2.user_Empleado = t3.empl_Id 


 --*************** SELECT DE Director ******************-
 GO
 CREATE OR ALTER PROCEDURE cine.UDP_tbDirector_SELECT
 AS
 BEGIN
	
	SELECT TOP (1000) [dire_Id]
      ,[dire_Nombres]
      ,[dire_Apellidos]
      ,[dire_FechaNacimiento]
      ,[dire_Sexo]
      ,[dire_Estado]
      ,[dire_UsuCrea]
      ,[user_Empleado]
      ,[Nombre]
      ,[dire_FechaCrea]
      ,[dire_UsuMofica]
      ,[dire_FechaModifica]
  FROM [db_Cine].[cine].[VW_tbDirector]

 END

 --*************** INSERT DE Director ******************--
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbDirectores_INSERT
@dire_Nombres nvarchar(100),
@dire_Apellidos nvarchar(100),
@dire_FechaNacimiento date,
@dire_Sexo char(1),
@dire_UsuCrea int
AS
BEGIN
BEGIN TRY
INSERT INTO [cine].[tbDirectores]
        ([dire_Nombres]
        ,[dire_Apellidos]
        ,[dire_FechaNacimiento]
        ,[dire_Sexo]
        ,[dire_UsuCrea]
        ,[dire_UsuMofica]
        ,[dire_FechaModifica])
    VALUES
        (@dire_Nombres
        ,@dire_Apellidos
        ,@dire_FechaNacimiento
        ,@dire_Sexo
        ,@dire_UsuCrea
        ,NULL
        ,NULL)

			SELECT 1 CodeStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus
END CATCH

END


 --*************** FIND DE Director ******************--
 GO
 CREATE OR ALTER PROCEDURE cine.UDP_tbDirector_FIND
 @dire_Id INT
 AS
 BEGIN
	
	SELECT TOP (1000) [dire_Id]
      ,[dire_Nombres]
      ,[dire_Apellidos]
      ,[dire_FechaNacimiento]
      ,[dire_Sexo]
      ,[dire_Estado]
      ,[dire_UsuCrea]
      ,[user_Empleado]
      ,[Nombre]
      ,[dire_FechaCrea]
      ,[dire_UsuMofica]
      ,[dire_FechaModifica]
  FROM [db_Cine].[cine].[VW_tbDirector]
  WHERE dire_Id = @dire_Id

 END
 --*************** UPDATE DE Director ******************--
 GO
CREATE OR ALTER PROCEDURE cine.UDP_tbDirectores_UPDATE
@dire_Id INT,
@dire_Nombres nvarchar(100),
@dire_Apellidos nvarchar(100),
@dire_FechaNacimiento date,
@dire_Sexo char(1),
@dire_UsuMofica int
AS
BEGIN
BEGIN TRY

	UPDATE	[cine].[tbDirectores]
			SET [dire_Nombres] = @dire_Nombres
			,[dire_Apellidos] = @dire_Apellidos
			,[dire_FechaNacimiento] = @dire_FechaNacimiento
			,[dire_Sexo] = @dire_Sexo
			,[dire_UsuMofica] = @dire_UsuMofica
			,[dire_FechaModifica] = GETDATE()
 WHERE		[dire_Id] = @dire_Id


			SELECT 1 CodeStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus
END CATCH

END
 --*************** DELETE DE Director ******************--
 GO
CREATE OR ALTER PROCEDURE cine.UDP_tbDirectores_DELETE
 @dire_Id INT
AS
BEGIN
BEGIN TRY
UPDATE [cine].[tbDirectores]
   SET [dire_Estado] = 0
 
 WHERE		[dire_Id] = @dire_Id

			SELECT 1 CodeStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus
END CATCH

END

-----------------------------------------------------------


--*****************************************************--
--*************** VISTA DE PELICULAS ******************--
GO
CREATE OR ALTER VIEW cine.VW_tbPeliculas
AS
SELECT [peli_Id]
      ,[peli_Titulo]
      ,[peli_TitulOriginal]
      ,[peli_AnioEstreno]
      ,[peli_Duracion]
      ,[peli_Categoria]
	  ,T4.cate_Nombre
      ,[peli_Director]
	  ,T5.dire_Nombres + ' ' + T5.dire_Apellidos as 'Dire_Nombre'
      ,[peli_Estado]
      ,[peli_UsuCrea]
	  ,t2.user_Empleado
	  ,t3.empl_Nombre + ' ' + t3.empl_Apellidos AS 'Nombre'
      ,[peli_FechaCrea]
      ,[peli_UsuMofica]
      ,[peli_FechaModifica]
  FROM [cine].[tbPeliculas] T1 INNER JOIN acce.tbUsuarios t2
  ON	T1.[peli_UsuCrea] = t2.user_Id INNER JOIN gral.tbEmpleados t3
  ON	t2.user_Empleado = t3.empl_Id INNER JOIN gral.tbCategorias t4
  ON	T1.peli_Categoria = T4.cate_Id	INNER JOIN cine.tbDirectores t5
  ON	T1.peli_Director = T5.dire_Id


 --*************** SELECT DE Director ******************-
 GO
 CREATE OR ALTER PROCEDURE cine.UDP_tbPeliculas_SELECT
 AS
 BEGIN
	
	SELECT TOP (1000) [peli_Id]
      ,[peli_Titulo]
      ,[peli_TitulOriginal]
	,[peli_AnioEstreno]
      ,[peli_Duracion]
      ,[peli_Categoria]
      ,[cate_Nombre]
      ,[peli_Director]
      ,[Dire_Nombre]
      ,[peli_Estado]
      ,[peli_UsuCrea]
      ,[user_Empleado]
      ,[Nombre]
      ,[peli_FechaCrea]
      ,[peli_UsuMofica]
      ,[peli_FechaModifica]
  FROM [db_Cine].[cine].[VW_tbPeliculas]
  where [peli_Estado] = 1

 END

 --*************** INSERT DE Director ******************--
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbPeliculas_INSERT
@peli_Titulo nvarchar(250),
@peli_TitulOriginal nvarchar(250),
@peli_AnioEstreno int,
@peli_Duracion int,
@peli_Categoria int,
@peli_Director int,
@peli_UsuCrea int
 AS
BEGIN
BEGIN TRY

INSERT INTO [cine].[tbPeliculas]
           ([peli_Titulo]
           ,[peli_TitulOriginal]
           ,peli_AnioEstreno
           ,[peli_Duracion]
           ,[peli_Categoria]
           ,[peli_Director]
            ,[peli_UsuCrea]
            ,[peli_UsuMofica]
           ,[peli_FechaModifica])
     VALUES
           (@peli_Titulo
           ,@peli_TitulOriginal
           ,@peli_AnioEstreno
           ,@peli_Duracion
           ,@peli_Categoria
           ,@peli_Director
            ,@peli_UsuCrea
            ,NULL
           ,NULL)

			SELECT 1 CodeStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus
END CATCH

END


 --*************** FIND DE Director ******************--
 GO
 CREATE OR ALTER PROCEDURE cine.UDP_tbPeliculas_FIND
 @peli_Id INT
 AS
 BEGIN
	
	SELECT [peli_Id]
      ,[peli_Titulo]
      ,[peli_TitulOriginal]
      ,[peli_AnioEstreno]
      ,[peli_Duracion]
      ,[peli_Categoria]
      ,[cate_Nombre]
      ,[peli_Director]
      ,[Dire_Nombre]
      ,[peli_Estado]
      ,[peli_UsuCrea]
      ,[user_Empleado]
      ,[Nombre]
      ,[peli_FechaCrea]
      ,[peli_UsuMofica]
      ,[peli_FechaModifica]
  FROM [cine].[VW_tbPeliculas]
  WHERE peli_Id = @peli_Id

 END
 --*************** UPDATE DE Director ******************--
 GO
CREATE OR ALTER PROCEDURE cine.UDP_tbPeliculas_UPDATE
 @peli_Id INT,
@peli_Titulo nvarchar(250),
@peli_TitulOriginal nvarchar(250),
@peli_AnioEstreno int,
@peli_Duracion int,
@peli_Categoria int,
@peli_Director int,
@peli_UsuMofica int
AS
BEGIN
BEGIN TRY

UPDATE [cine].[tbPeliculas]
   SET [peli_Titulo] = @peli_Titulo
      ,[peli_TitulOriginal] = @peli_TitulOriginal
      ,[peli_AnioEstreno] = @peli_AnioEstreno
      ,[peli_Duracion] = @peli_Duracion
      ,[peli_Categoria] = @peli_Categoria
      ,[peli_Director] = @peli_Director
         ,[peli_UsuMofica] = @peli_UsuMofica
      ,[peli_FechaModifica] = GETDATE()
    WHERE peli_Id = @peli_Id



			SELECT 1 CodeStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus
END CATCH

END
 --*************** DELETE DE Director ******************--
 GO
CREATE OR ALTER PROCEDURE cine.UDP_tbPeliculas_DELETE
 @peli_Id INT
AS
BEGIN
BEGIN TRY
UPDATE [cine].[tbPeliculas]
   SET [peli_Estado] = 0
 
    WHERE peli_Id = @peli_Id

	SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
END CATCH

END

EXEC cine.UDP_tbPeliculas_DELETE 6

--*****************************************************--
--*************** ESQUEMA DE GENERAL ******************--

--*****************************************************--
--*************** VISTA DE EMPLEADOS ******************--
GO
CREATE OR ALTER VIEW gral.VW_tbEmpleados
AS
SELECT  [empl_Id]
       ,[empl_DNI]
       ,[empl_Nombre]
       ,[empl_Apellidos]
       ,CASE [empl_Sexo]
             WHEN 'M' THEN 'Masculino'
             WHEN 'F' THEN 'Femenino'
             ELSE 'No especificado'
        END AS [empl_Sexo]
       ,[empl_Estadocivil]
	   ,t2.estc_Descripcion
	   ,t3.muni_depId
	   ,t4.dept_Descripcion
       ,[empl_Muni]
	   ,t3.muni_Descripcion
       ,[empl_Cargo]
	   ,t5.carg_Cargo
       ,[empl_Sucursal]
	   ,t6.sucu_Nombre
       ,[empl_DireccionExacta]
       ,[empl_FechaNacimiento]
       ,[empl_Telefono]
       ,[empl_UsuarioCreador]
       ,[empl_FechaCreacion]
       ,[empl_UsuarioModificado]
       ,[empl_FechaModificacion]
       ,[empl_Estado]
  FROM [gral].[tbEmpleados] t1 INNER JOIN gral.tbEstadosCiviles t2
  ON   empl_Estadocivil = t2.estc_Id INNER JOIN  gral.tbMunicipios t3
  ON   empl_Muni = t3.muni_Id INNER JOIN gral.tbDepartamentos t4
  ON   t3.muni_depId = t4.dept_Id	INNER JOIN gral.tbCargos t5
  ON   t1.empl_Cargo = t5.carg_Id	INNER JOIN cine.tbSucursales t6
  ON   t1.empl_Sucursal = t6.sucu_Id


  --*****************************************************--
--***************** CRUD DE EMPLEADOS ********************--


 --*************** SELECT DE EMPLEADOS ******************--
  GO
  CREATE OR ALTER PROCEDURE gral.UDP_tbEmpleados_Select
  AS
  BEGIN

	SELECT  [empl_Id], 
			[empl_DNI], 
			[empl_Nombre],
			[empl_Apellidos], 
			[empl_Sexo],
			[empl_Estadocivil],
			[estc_Descripcion], 
			[muni_depId],
			[dept_Descripcion],
			[empl_Muni],
			[muni_Descripcion],
			[empl_Cargo], 
			[carg_Cargo], 
			[empl_Sucursal],
			[sucu_Nombre], 
			[empl_DireccionExacta],
			[empl_FechaNacimiento],
			[empl_Telefono],
			[empl_UsuarioCreador], 
			[empl_FechaCreacion],
			[empl_UsuarioModificado],
			[empl_FechaModificacion],
			[empl_Estado]
	FROM	gral.VW_tbEmpleados
	WHERE	empl_Estado = 1
	
  END

  --*************** INSERT DE EMPLEADOS ******************--
  GO
 CREATE OR ALTER PROCEDURE gral.UDP_tbEmpleado_Insert  
 @empl_DNI varchar(13), 
 @empl_Nombre nvarchar(255), 
 @empl_Apellidos nvarchar(255), 
 @empl_Sexo char(1), 
 @empl_Estadocivil int, 
 @empl_Muni int, 
 @empl_Cargo int, 
 @empl_Sucursal int, 
 @empl_DireccionExacta nvarchar(250), 
 @empl_FechaNacimiento date, 
 @empl_Telefono nvarchar(9), 
 @empl_UsuarioCreador int 
 AS
 BEGIN

 BEGIN TRY
	
	INSERT INTO [gral].[tbEmpleados]
           ([empl_DNI]
           ,[empl_Nombre]
           ,[empl_Apellidos]
           ,[empl_Sexo]
           ,[empl_Estadocivil]
           ,[empl_Muni]
           ,[empl_Cargo]
           ,[empl_Sucursal]
           ,[empl_DireccionExacta]
           ,[empl_FechaNacimiento]
           ,[empl_Telefono]
           ,[empl_UsuarioCreador]
            ,[empl_UsuarioModificado]
           ,[empl_FechaModificacion])
      VALUES
           (@empl_DNI,  
           @empl_Nombre,   
           @empl_Apellidos,  
           @empl_Sexo,  
           @empl_Estadocivil,   
           @empl_Muni,   
           @empl_Cargo, 
           @empl_Sucursal,  
           @empl_DireccionExacta,  
           @empl_FechaNacimiento, 
           @empl_Telefono,  
           @empl_UsuarioCreador,  
           NULL,
           NULL)

		   SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
END CATCH


 END

   --*************** FIND DE EMPLEADOS ******************--
  GO
  CREATE OR ALTER PROCEDURE gral.UDP_tbEmpleados_FIND 
  @empl_Id   INT
  AS
  BEGIN

   BEGIN TRY
	SELECT  [empl_Id], 
			[empl_DNI], 
			[empl_Nombre],
			[empl_Apellidos], 
			[empl_Sexo],
			[empl_Estadocivil],
			[estc_Descripcion], 
			[muni_depId],
			[dept_Descripcion],
			[empl_Muni],
			[muni_Descripcion],
			[empl_Cargo], 
			[carg_Cargo], 
			[empl_Sucursal],
			[sucu_Nombre], 
			[empl_DireccionExacta],
			[empl_FechaNacimiento],
			[empl_Telefono],
			[empl_UsuarioCreador], 
			[empl_FechaCreacion],
			[empl_UsuarioModificado],
			[empl_FechaModificacion],
			[empl_Estado]
	FROM	gral.VW_tbEmpleados
	WHERE	empl_Estado = 1 
	AND		[empl_Id] = @empl_Id
	
		   SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
END CATCH


  END

  select getdate()
     --*************** UPDATE DE EMPLEADOS ******************--
	GO
	CREATE OR ALTER PROCEDURE gral.UDP_tbEmpleados_UPDATE  
	@empl_Id   INT,
	@empl_DNI varchar(13), 
	@empl_Nombre nvarchar(255), 
	@empl_Apellidos nvarchar(255), 
	@empl_Sexo char(1), 
	@empl_Estadocivil int, 
	@empl_Muni int, 
	@empl_Cargo int, 
	@empl_Sucursal int, 
	@empl_DireccionExacta nvarchar(250), 
	@empl_FechaNacimiento date, 
	@empl_Telefono nvarchar(9), 
	@empl_UsuarioModificador int 
	 AS
	 BEGIN

	  BEGIN TRY
			UPDATE	[gral].[tbEmpleados]
					SET [empl_DNI] = @empl_DNI
					,[empl_Nombre] = @empl_Nombre
					,[empl_Apellidos] = @empl_Apellidos
					,[empl_Sexo] = @empl_Sexo
					,[empl_Estadocivil] = @empl_Estadocivil
					,[empl_Muni] = @empl_Muni
					,[empl_Cargo] = @empl_Cargo
					,[empl_Sucursal] = @empl_Sucursal
					,[empl_DireccionExacta] = @empl_DireccionExacta
					,[empl_FechaNacimiento] = @empl_FechaNacimiento
					,[empl_Telefono] = @empl_Telefono
 					,[empl_UsuarioModificado] = @empl_UsuarioModificador
					,[empl_FechaModificacion] = GETDATE()
 			WHERE	 [empl_Id] = @empl_Id

	SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH

	 END


--*************** DELETE DE EMPLEADOS ******************--
GO 
CREATE OR ALTER PROCEDURE gral.UDP_tbEmpleados_Delete  
@empl_Id   INT

AS
BEGIN

 BEGIN TRY

		UPDATE	[gral].[tbEmpleados]
		SET		[empl_Estado] = 0
		WHERE	[empl_Id] = @empl_Id

			   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH
	
END

GO
CREATE OR ALTER VIEW VW_Departamento
AS
select * from  gral.tbDepartamentos




--*****************************************************--
--*************** VISTA DE ESTADO CIVIL ******************--
GO
CREATE OR ALTER VIEW gral.VW_EstadoCivil
AS
SELECT TOP (1000) [estc_Id]
      ,[estc_Descripcion]
      ,[estc_Estado]
      ,[estc_UserCrea]
      ,[estc_FechaCrea]
      ,[estc_UserMofica]
      ,[estc_FechaModifica]
  FROM [db_Cine].[gral].[tbEstadosCiviles]

--*************** SELECT DE CIVIL ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbEstadoCivil_SELECT
AS
BEGIN
	
		SELECT TOP (1000) [estc_Id]
      ,[estc_Descripcion]
      ,[estc_Estado]
      ,[estc_UserCrea]
      ,[estc_FechaCrea]
      ,[estc_UserMofica]
      ,[estc_FechaModifica]
  FROM [db_Cine].[gral].[VW_EstadoCivil]
  WHERE [estc_Estado] = 1

END

--*********************************************************************************************************************
--*************** VISTA DE CARGO ******************--
GO
CREATE OR ALTER VIEW gral.VW_Cargo
AS
SELECT TOP (1000) [carg_Id]
      ,[carg_Cargo]
      ,[car_Estado]
      ,[carg_UsuarioCreador]
      ,[carg_FechaCreacion]
      ,[carg_UsuarioModificado]
      ,[carg_FechaModificacion]
  FROM [db_Cine].[gral].[tbCargos]

--*************** SELECT DE CARGO ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbCargo_SELECT
AS
BEGIN
	
		 SELECT TOP (1000) [carg_Id]
      ,[carg_Cargo]
      ,[car_Estado]
      ,[carg_UsuarioCreador]
      ,[carg_FechaCreacion]
      ,[carg_UsuarioModificado]
      ,[carg_FechaModificacion]
  FROM [db_Cine].[gral].[VW_Cargo]
  WHERE [car_Estado] = 1

END

  --*************** INSERT DE CARGOS ******************--
  GO
 CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Insert  
 @carg_Cargo			NVARCHAR(250), 
 @carg_UsuarioCreador	INT
 AS
 BEGIN

 BEGIN TRY
	
	INSERT INTO [gral].[tbCargos]
           (carg_Cargo, carg_UsuarioCreador)
      VALUES
           (@carg_Cargo, @carg_UsuarioCreador)

		   SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
		END TRY
BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
END CATCH


 END

   --*************** FIND DE CARGOS ******************--
  GO
  CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_FIND 
  @carg_Id  INT
  AS
  BEGIN
		BEGIN TRY
			SELECT *  
			FROM	gral.VW_Cargo
			WHERE	car_Estado = 1 
			AND		carg_Id = @carg_Id
		END TRY
		BEGIN CATCH
			SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
		END CATCH
END
 --*************** UPDATE DE CARGOS ******************--
	GO
	CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_UPDATE  
	@carg_Id		INT,
	@carg_Cargo     NVARCHAR(250), 
	@carg_UsuarioModificado INT
	 AS
	 BEGIN
	  BEGIN TRY
			UPDATE	[gral].[tbCargos]
					SET carg_Cargo = @carg_Cargo,
						carg_FechaModificacion= GETDATE()
 			WHERE		carg_Id = @carg_Id
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus, 'No se pudo completar el proceso.' messageStatus
	END CATCH

	 END


--*************** DELETE DE CARGOS ******************--
GO 
CREATE OR ALTER PROCEDURE gral.UDP_tbCargos_Delete  
@carg_Id INT

AS
BEGIN

 BEGIN TRY

		UPDATE	[gral].[tbCargos]
		SET		car_Estado = 0
		WHERE	carg_Id = @carg_Id

		SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
END CATCH
	
END


--********************************************************************************************************
--*************** VISTA DE METODO DE PAGO ******************--
GO
CREATE OR ALTER VIEW gral.VW_MetodoPago
AS
SELECT TOP (1000) [pago_Id]
      ,[pago_Descripcion]
      ,[pago_Estado]
      ,[pago_UsuarioCreador]
      ,[pago_FechaCreacion]
      ,[pago_UsuarioModificador]
      ,[pago_FechaModificacion]
  FROM [db_Cine].[gral].[tbMetodosPago]

--*************** SELECT DE METODO DE PAGO ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMetodoPago_SELECT
AS
BEGIN
		SELECT TOP (1000) [pago_Id]
      ,[pago_Descripcion]
      ,[pago_Estado]
      ,[pago_UsuarioCreador]
      ,[pago_FechaCreacion]
      ,[pago_UsuarioModificador]
      ,[pago_FechaModificacion]
  FROM [db_Cine].[gral].[tbMetodosPago]
  WHERE pago_Estado = 1

END

  --*************** INSERT DE METODO DE PAGO ******************--
  GO
 CREATE OR ALTER PROCEDURE gral.UDP_tbMetodoPago_Insert  
 @pago_Descripcion			NVARCHAR(200), 
 @pago_UsuarioCreador		INT
 AS
 BEGIN
 BEGIN TRY
	
	INSERT INTO [gral].[tbMetodosPago] (pago_Descripcion,[pago_UsuarioCreador] )
    VALUES							   (@pago_Descripcion, @pago_UsuarioCreador)
		   SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
END TRY
BEGIN CATCH
			SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
END CATCH
END

   --*************** FIND DE METODO DE PAGO ******************--
  GO
  CREATE OR ALTER PROCEDURE gral.UDP_tbMetodoPago_FIND 
  @pago_Id  INT
  AS
  BEGIN
		BEGIN TRY
			SELECT *  
			FROM	gral.VW_MetodoPago
			WHERE	pago_Estado = 1 
			AND		pago_Id = @pago_Id
		END TRY
		BEGIN CATCH
			SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
		END CATCH
END
 --*************** UPDATE DE METODO DE PAGO ******************--
	GO
	CREATE OR ALTER PROCEDURE gral.UDP_tbMetodoPago_UPDATE  
	@pago_Id				INT, 
	@pago_Descripcion		NVARCHAR(200), 
	@pago_UsuarioModificador INT
	 AS
	 BEGIN
	  BEGIN TRY
			UPDATE	[gral].[tbMetodosPago]
					SET pago_Descripcion = @pago_Descripcion,
						pago_FechaModificacion= GETDATE()
 			WHERE		pago_Id = @pago_Id

			SELECT 1 CodeStatus, 'Operación completada exitosamente.' messageStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus, 'No se pudo completar el proceso.' messageStatus
	END CATCH

	 END


--*************** DELETE DE METODO DE PAGO ******************--
GO 
CREATE OR ALTER PROCEDURE gral.UDP_tbMetodoPago_Delete  
@pago_Id INT

AS
BEGIN

 BEGIN TRY

		UPDATE	[gral].[tbMetodosPago]
		SET		[pago_Estado] = 0
		WHERE	[pago_Id]= @pago_Id

		SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
END CATCH
	
END

--********************************************************************************************************
--*************** VISTA DE CATEGORIAS ******************--
GO
CREATE OR ALTER VIEW gral.VW_Categorias
AS
SELECT TOP (1000) [cate_Id]
      ,[cate_Nombre]
      ,[cate_Estado]
      ,[cate_UsuarioCreador]
      ,[cate_FechaCreacion]
      ,[cate_UsuarioModificador]
      ,[cate_FechaModificacion]
  FROM [db_Cine].[gral].[tbCategorias]

--*************** SELECT DE CATEGORIA ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbCategorias_SELECT
AS
BEGIN
		SELECT TOP (1000) [cate_Id]
      ,[cate_Nombre]
      ,[cate_Estado]
      ,[cate_UsuarioCreador]
      ,[cate_FechaCreacion]
      ,[cate_UsuarioModificador]
      ,[cate_FechaModificacion]
  FROM [db_Cine].[gral].[tbCategorias]
  WHERE cate_Estado = 1

END

  --*************** INSERT DE CATEGORIA ******************--
  GO
 CREATE OR ALTER PROCEDURE gral.UDP_tbCategoria_Insert  
 @cate_Nombre			NVARCHAR(200), 
 @cate_UsuarioCreador	INT
 AS
 BEGIN
 BEGIN TRY
	
	INSERT INTO [gral].[tbCategorias] ([cate_Nombre], [cate_UsuarioCreador])
    VALUES							   (@cate_Nombre, @cate_UsuarioCreador)
		   SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
END TRY
BEGIN CATCH
			SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
END CATCH
END

   --*************** FIND DE CATEGORIA ******************--
  GO
  CREATE OR ALTER PROCEDURE gral.UDP_tbCategoria_FIND 
  @cate_Id  INT
  AS
  BEGIN
		BEGIN TRY
			SELECT *  
			FROM	gral.VW_Categorias
			WHERE	cate_Estado = 1 
			AND		cate_Id = @cate_Id
		END TRY
		BEGIN CATCH
			SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
		END CATCH
END
 --*************** UPDATE DE CATEGORIA ******************--
 GO
CREATE OR ALTER PROCEDURE gral.UDP_tbCategoria_UPDATE  
@cate_Id					INT, 
@cate_Nombre				NVARCHAR(200), 
@cate_UsuarioModificador	INT
	 AS
	 BEGIN
	  BEGIN TRY
			UPDATE	[gral].[tbCategorias]
					SET cate_Nombre = @cate_Nombre,
						cate_UsuarioModificador = @cate_UsuarioModificador,
						cate_FechaModificacion= GETDATE()
 			WHERE		cate_Id = @cate_Id
			SELECT 1 CodeStatus, 'Operación completada exitosamente.' messageStatus
	END TRY
	BEGIN CATCH
			SELECT 0 CodeStatus, 'No se pudo completar el proceso.' messageStatus
	END CATCH

	 END

--*************** DELETE DE CATEGORÍA ******************--
GO 
CREATE OR ALTER PROCEDURE gral.UDP_tbCategoria_Delete  
@cate_Id INT
AS
BEGIN
 BEGIN TRY
		UPDATE	[gral].[tbCategorias]
		SET		cate_Estado = 0
		WHERE	cate_Id= @cate_Id
		SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
END CATCH
END

--********************************************************************************************************
--*************** VISTA DE SALA ******************--
GO
CREATE OR ALTER VIEW cine.VW_Salas
AS
SELECT TOP (1000) [sala_Id]
      ,[sala_Butacas]
      ,[sala_Tipo]
	    ,t2.casa_Categoria
	  ,t2.casa_Precio
      ,[sala_Sucursal]
      ,[sala_Estado]
      ,[sala_UserCrea]
      ,[sala_FechaCrea]
      ,[sala_UserMofica]
      ,[sala_FechaModifica]
   FROM [db_Cine].[cine].[tbSalas] t1 INNER JOIN cine.tbCategoriaSala t2
  ON	t1.sala_Tipo = t2.casa_Id

--*************** SELECT DE SALAS ******************--
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbSalas_SELECT
AS
BEGIN
SELECT TOP (1000) [sala_Id]
      ,[sala_Butacas]
      ,[sala_Tipo]
	   ,[casa_Categoria]
      ,[casa_Precio]
      ,[sala_Sucursal]
      ,[sala_Estado]
      ,[sala_UserCrea]
      ,[sala_FechaCrea]
      ,[sala_UserMofica]
      ,[sala_FechaModifica]
 FROM [db_Cine].[cine].[VW_Salas]
  WHERE sala_Estado = 1
END

  --*************** INSERT DE SALAS ******************--
  GO
 CREATE OR ALTER PROCEDURE cine.UDP_tbSalas_Insert  
 @sala_Butacas	INT, 
 @sala_Tipo     INT,  
 @sala_Sucursal INT, 
 @sala_UserCrea INT
 AS
 BEGIN
 BEGIN TRY
	INSERT INTO [cine].[tbSalas] ([sala_Butacas],[sala_Tipo],[sala_Sucursal],[sala_UserCrea])
    VALUES						 (@sala_Butacas, @sala_Tipo, @sala_Sucursal, @sala_UserCrea)
		   SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
END TRY
BEGIN CATCH
			SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
END CATCH
END

   --*************** FIND DE SALAS ******************--
  GO
  CREATE OR ALTER PROCEDURE cine.UDP_tbSalas_FIND 
  @sala_Id  INT
  AS
  BEGIN
		BEGIN TRY
			SELECT TOP (1000) [sala_Id]
      ,[sala_Butacas]
      ,[sala_Tipo]
      ,[casa_Categoria]
      ,[casa_Precio]
      ,[sala_Sucursal]
      ,[sala_Estado]
      ,[sala_UserCrea]
      ,[sala_FechaCrea]
      ,[sala_UserMofica]
      ,[sala_FechaModifica]
		FROM [db_Cine].[cine].[VW_Salas]
		WHERE	sala_Estado = 1 
			AND		sala_Id = @sala_Id
		END TRY
		BEGIN CATCH
			SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
		END CATCH
END
 --*************** UPDATE DE SALAS ******************--
 GO
CREATE OR ALTER PROCEDURE cine.UDP_tbSalas_UPDATE  
	@sala_Id			INT, 
	@sala_Butacas		INT, 
	@sala_Tipo			CHAR(3), 
	@sala_Sucursal		INT, 
	@sala_UserMofica	INT
	 AS
	 BEGIN
	  BEGIN TRY
			UPDATE	[cine].[tbSalas]
					SET sala_Butacas = @sala_Butacas,
						sala_Tipo = @sala_Tipo,
						sala_Sucursal = @sala_Sucursal,
						sala_UserMofica = @sala_UserMofica,
						sala_FechaModifica = GETDATE()
 			WHERE		sala_Id = @sala_Id
			SELECT 1 CodeStatus, 'Operación completada exitosamente.' messageStatus
	END TRY
	BEGIN CATCH
			SELECT 0 CodeStatus, 'No se pudo completar el proceso.' messageStatus
	END CATCH

	 END

--*************** DELETE DE SALAS ******************--
GO 
CREATE OR ALTER PROCEDURE cine.UDP_tbSalas_Delete  
@sala_Id INT
AS
BEGIN
 BEGIN TRY
		UPDATE	[cine].[tbSalas]
		SET		sala_Estado = 0
		WHERE	sala_Id= @sala_Id
		SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
END CATCH
END


--********************************************************************************************************
--*************** VISTA DE CLIENTES ******************--
GO
CREATE OR ALTER VIEW gral.VW_Clientes
AS
SELECT TOP (1000) [clie_Id]
      ,[clie_Nombres]
      ,[clie_Apellidos]
      ,[clie_RTN]
      ,[clie_Estado]
      ,[clie_UserCrea]
      ,[clie_FechaCrea]
      ,[clie_UserModifica]
      ,[clie_FechaModifica]
  FROM [db_Cine].[gral].[tbClientes]

--*************** SELECT DE CLIENTES ******************--
GO
CREATE OR ALTER PROCEDURE gral.UDP_tbClientes_SELECT
AS
BEGIN
SELECT TOP (1000) [clie_Id]
      ,[clie_Nombres]
      ,[clie_Apellidos]
      ,[clie_RTN]
      ,[clie_Estado]
      ,[clie_UserCrea]
      ,[clie_FechaCrea]
      ,[clie_UserModifica]
      ,[clie_FechaModifica]
  FROM [db_Cine].[gral].[tbClientes]
  WHERE clie_Estado = 1
END

  --*************** INSERT DE CLIENTES ******************--
 GO
CREATE OR ALTER PROCEDURE gral.UDP_tbClientes_Insert 
@clie_Nombres NVARCHAR(100),
@clie_Apellidos NVARCHAR(100),
@clie_RTN VARCHAR(14),
@clie_UserCrea INT
AS
BEGIN
SET NOCOUNT ON;

	BEGIN TRY
	BEGIN TRANSACTION;
	-- Validar si el cliente ya existe en la tabla gral.tbClientes (insensible a mayúsculas y minúsculas)
	DECLARE @clienteId INT;
	SELECT @clienteId = clie_Id 
	FROM gral.tbClientes 
	WHERE LOWER(clie_Nombres) = LOWER(@clie_Nombres) 
		AND LOWER(clie_Apellidos) = LOWER(@clie_Apellidos) 
		AND clie_RTN = @clie_RTN;
	IF @clienteId IS NULL
	BEGIN
		-- Insertar en la tabla gral.tbClientes
		INSERT INTO gral.tbClientes (clie_Nombres, clie_Apellidos, clie_RTN, clie_UserCrea)
		VALUES (@clie_Nombres, @clie_Apellidos, @clie_RTN, @clie_UserCrea);
	
		SET @clienteId = SCOPE_IDENTITY();
	END

		COMMIT TRANSACTION;
		 SELECT 1 CodeStatus , @clienteId messageStatus
	END TRY
	BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH;

END;
GO



   --*************** FIND DE CLIENTES ******************--
  GO
  CREATE OR ALTER PROCEDURE gral.UDP_tbClientes_FIND 
  @clie_Id  INT
  AS
  BEGIN
		BEGIN TRY
			SELECT *  
			FROM	gral.VW_Clientes
			WHERE	clie_Estado = 1 
			AND		clie_Id = @clie_Id
		END TRY
		BEGIN CATCH
			SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
		END CATCH
END
 --*************** UPDATE DE CLIENTES ******************--
 GO
CREATE OR ALTER PROCEDURE gral.UDP_tbClientes_UPDATE  
	@clie_Id			INT, 
	@clie_Nombres		NVARCHAR(100), 
	@clie_Apellidos		NVARCHAR(100),
	@clie_RTN			VARCHAR(14),
	@clie_UserModifica	INT
	 AS
	 BEGIN
	  BEGIN TRY
			UPDATE	[gral].[tbClientes]
					SET clie_Nombres = @clie_Nombres,
						clie_Apellidos = @clie_Apellidos,
						clie_RTN = @clie_RTN,
						clie_UserModifica = @clie_UserModifica,
						clie_FechaModifica = GETDATE()
 			WHERE		clie_Id = @clie_Id
			SELECT 1 CodeStatus, 'Operación completada exitosamente.' messageStatus
	END TRY
	BEGIN CATCH
			SELECT 0 CodeStatus, 'No se pudo completar el proceso.' messageStatus
	END CATCH

	 END

--*************** DELETE DE CLIENTES ******************--
GO 
CREATE OR ALTER PROCEDURE gral.UDP_tbClientes_Delete  
@clie_Id INT
AS
BEGIN
 BEGIN TRY
		UPDATE	[gral].[tbClientes]
		SET		clie_Estado = 0
		WHERE	clie_Id= @clie_Id
		SELECT 1 CodeStatus , 'Operación completada exitosamente.' messageStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus , 'No se pudo completar el proceso.' messageStatus
END CATCH
END

--********************************************************************************************************
--*************** VISTA DE PANTALLAS ******************--
GO
CREATE OR ALTER VIEW acce.VW_Pantallas
AS
SELECT TOP (1000) [panta_Id]
      ,[panta_Descripcion]
      ,panta_label
      ,[panta_Menu]
      ,panta_to
	  ,icon
      ,[panta_Estado]
      ,[panta_UserCrea]
      ,[panta_FechaCrea]
      ,[panta_UserMofica]
      ,[panta_FechaModifica]
  FROM [db_Cine].[acce].[tbPantallas]

--*************** SELECT DE PANTALLAS ******************--
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbPantallas_SELECT
AS
BEGIN
SELECT TOP (1000) [panta_Id]
      ,[panta_Descripcion]
      ,panta_label
      ,[panta_Menu]
      ,panta_to
	  ,icon
      ,[panta_Estado]
      ,[panta_UserCrea]
      ,[panta_FechaCrea]
      ,[panta_UserMofica]
      ,[panta_FechaModifica]
  FROM [db_Cine].[acce].[tbPantallas]
  WHERE panta_Estado = 1
END

---------------------------------------------------------------------------
---------------- DEPARTAMENTOS --------------------------------------------
GO
--*************** VISTA DE DEPARTAMENTOS ******************-- 
CREATE OR ALTER VIEW VW_Departamento
AS
SELECT		[dept_Id], 
			[dept_Descripcion], 
			[dept_Estado], 
			[dept_UserCrea],
			[dept_FechaCrea], 
			[dept_UserMofica]
	 FROM	[gral].[tbDepartamentos]
	 

--*************** SELECT DE DEPARTAMENTOS ******************-- 
GO
CREATE OR ALTER PROCEDURE UDP_Prueba_Departamento
AS
BEGIN
	
	SELECT	[dept_Id], 
			[dept_Descripcion], 
			[dept_Estado], 
			[dept_UserCrea],
			[dept_FechaCrea], 
			[dept_UserMofica]
			 
	FROM	 [dbo].[VW_Departamento]
	WHERE	 [dept_Estado] = 1

END

--*************** INSERT DE DEPARTAMENTOS ******************-- 
GO
CREATE OR ALTER PROCEDURE UDP_Departamento_Insert
@dept_Descripcion   nvarchar(200),
@dept_UserCrea		INT
AS
BEGIN

	begin try
	
	 INSERT INTO [gral].[tbDepartamentos] (dept_Descripcion, [dept_UserCrea])
           VALUES (@dept_Descripcion, @dept_UserCrea)

	   SELECT 1 CodeStatus
	end try 
	begin catch

		   SELECT 0 CodeStatus

	end catch
      
END

--*************** FIND DE DEPARTAMENTOS ******************-- 

GO
CREATE OR ALTER PROCEDURE UDP_Departamento_Find  
@dept_Id INT
AS
BEGIN
	
	SELECT		[dept_Id], 
				[dept_Descripcion], 
				[dept_Estado], 
				[dept_UserCrea], 
				[dept_FechaCrea], 
				[dept_UserMofica] 
	FROM		[dbo].[VW_Departamento]
	WHERE		[dept_Id] = @dept_Id

END

--*************** UPDATE DE DEPARTAMENTOS ******************-- 

GO
CREATE OR ALTER PROCEDURE UDP_Departamento_Update
@dept_Id INT,
@dept_Descripcion nvarchar(200),
@dept_UserModifica	INT
AS
BEGIN

	begin try
	
		UPDATE [gral].[tbDepartamentos]
		SET [dept_Descripcion] = @dept_Descripcion, dept_UserMofica = @dept_UserModifica
		WHERE dept_Id = @dept_Id

	   SELECT 1 CodeStatus
	end try 
	begin catch

		   SELECT 0 CodeStatus

	end catch
      
END

--*************** DELETE DE DEPARTAMENTOS ******************-- 
GO
CREATE OR ALTER PROCEDURE UDP_Departamento_Delete  
@dept_Id INT
AS
BEGIN
	BEGIN TRY
		UPDATE [gral].[tbDepartamentos]
		SET  [dept_Estado] = 0
		WHERE dept_Id  = @dept_Id

	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 CodeStatus
	END CATCH   
END

--************************************************** SEGURIDAD ***********************************************************--

---- UDP para seleccionar las pantallas de un rol en especifico.
GO
CREATE OR ALTER PROC acce.UDP_Menu_PantallasPorRol
		@rol_Id		INT,
		@EsAdmin	BIT
AS
BEGIN
	IF @EsAdmin = 1
		BEGIN
			SELECT DISTINCT panta_Id, panta_Descripcion, panta_to, panta_Menu, panta_label, icon, @rol_Id AS role_Id, @EsAdmin AS EsAdmin 
			FROM acce.tbPantallas
		END
	ELSE
			SELECT DISTINCT pant.panta_Id, panta_Descripcion, panta_to, panta_Menu, panta_label, icon, @rol_Id AS role_Id, @EsAdmin AS esAdmin 
			FROM acce.tbPantallas pant
			INNER JOIN acce.tbRolesPantallas pantrol
			ON		   pant.panta_Id = pantrol.ropa_Pantalla
			WHERE	   pantrol.ropa_Rol = @rol_Id

END
GO

GO

GO
CREATE OR ALTER PROCEDURE gral.UDP_tbMunicipio_DDL 
@muni_depId    int
AS
BEGIN
    SELECT TOP (1000) [muni_Id]
      ,[muni_depId]
      ,[muni_Descripcion]
      ,[muni_Estado]
      ,[muni_UserCrea]
      ,[muni_FechaCrea]
      ,[muni_UserMofica]
      ,[muni_FechaModifica]
  FROM [db_Cine].[gral].[tbMunicipios]
  where [muni_Estado] = 1 
  AND    [muni_depId] = @muni_depId
END
GO

---- UDP para seleccionar las pantallas de un rol en especifico.
CREATE OR ALTER PROC Acce.UDP_tbRolesPorPantalla_ListarPantallas
		@rol_Id		NVARCHAR(10)
AS
BEGIN	
		SELECT DISTINCT pant.panta_Id, panta_Descripcion
		FROM acce.tbPantallas pant
		INNER JOIN acce.tbRolesPantallas pantrol
		ON		   pant.panta_Id = pantrol.ropa_Id
		WHERE	   pantrol.ropa_Id = @rol_Id

END
GO

--*************** VALIDACIÓN LOGIN ******************--
GO
CREATE or alter PROCEDURE acce.UDP_ValidarLogIN  
    @correoElectronico NVARCHAR(50),
    @contrasenia VARCHAR(250)
AS
BEGIN
    DECLARE @usuarioId INT;
    DECLARE @usuarioNombre NVARCHAR(250);

    DECLARE @CLAVE2 VARBINARY (MAX) = HASHBYTES('SHA2_512', @contrasenia)
	DECLARE @INCRI2 VARCHAR(MAX) = CONVERT(VARCHAR(MAX),@CLAVE2,2)

	DECLARE @usuario_EmpleadoId			INT;
	DECLARE @usuario_EmpleadoNombre		NVARCHAR(255);
	DECLARE @usuario_EmpleadoApellido	NVARCHAR(255);
	DECLARE @usuario_Sucursal			INT;
	DECLARE @usuario_Cargo				NVARCHAR(250);
	DECLARE @usuario_NombreSucursal		NVARCHAR(MAX);
	DECLARE @rol_Id						INT;
	DECLARE @rol_Nombre					NVARCHAR(100);
	DECLARE @EsAdmin					BIT;
	DECLARE @EsAdministrador			NVARCHAR(10);
	DECLARE @user_Estado				BIT;

    SELECT	@usuarioId = user_Id,
			@usuarioNombre = [user_NombreUsuario],
			@usuario_EmpleadoId = emple.empl_Id,
			@usuario_EmpleadoNombre = emple.empl_Nombre,
			@usuario_EmpleadoApellido = emple.empl_Apellidos,
			@usuario_Sucursal = emple.empl_Sucursal,
			@usuario_Cargo = cargo.carg_Cargo,
			@usuario_NombreSucursal = sucu.sucu_Nombre,
			@rol_Id = user_Rol,
			@rol_Nombre = rol.role_Nombre,
			@EsAdmin = usu.user_EsAdmin,
			@user_Estado = usu.user_Estado
    FROM	[acce].[tbUsuarios] usu				INNER JOIN gral.tbEmpleados emple
	ON		usu.user_Empleado = emple.empl_Id	INNER JOIN gral.tbCargos cargo
	ON		emple.empl_Cargo = cargo.carg_Id	INNER JOIN cine.tbSucursales sucu
	ON		emple.empl_Sucursal = sucu.sucu_Id	INNER JOIN acce.tbRoles rol
	ON		usu.user_Rol = rol.role_Id
    WHERE	[user_NombreUsuario] = @correoElectronico
    AND		[user_Contrasenia] = @INCRI2
	AND		user_Estado = 1

    IF (@usuarioId IS NOT NULL)
    BEGIN
		IF (@EsAdmin = 1)
			BEGIN
				SET	@EsAdministrador = 'Si'
			END
		ELSE
			BEGIN
				SET @EsAdministrador = 'No'
			END

        SELECT	@usuarioId AS [user_Id],
				@usuarioNombre AS [user_NombreUsuario],
				@usuario_EmpleadoId AS user_Empleado,
				@usuario_EmpleadoNombre + ' ' + @usuario_EmpleadoApellido AS nombre,
				@usuario_Sucursal AS empl_Sucursal,
				@usuario_Cargo AS carg_Cargo,
				@usuario_NombreSucursal AS sucu_Nombre,
				@rol_Nombre AS  role_Nombre,
				@rol_Id AS user_Rol,
				@EsAdministrador AS EsAdmin,
				@EsAdmin AS user_EsAdmin,
				@user_Estado AS user_Estado			
    END
    ELSE
    BEGIN
        SELECT 'Usuario o contraseña incorrectos' AS mensaje;
		 PRINT @usuarioId
		 PRINT @INCRI2
    END
END
GO
---------------
CREATE OR ALTER PROC acce.UDP_PantallasPorRol
	@role_Id		INT
AS
BEGIN
SELECT	ropa_Id, ropa_Rol, ropa_Pantalla, pants.panta_Descripcion, roles.role_Nombre FROM acce.tbRolesPantallas ropa INNER JOIN acce.tbPantallas pants
ON		pants.panta_Id = ropa.ropa_Pantalla INNER JOIN acce.tbRoles roles
ON		ropa.ropa_Rol = roles.role_Id
WHERE	ropa_Rol = @role_Id
END
GO

---------------

--*****************************************************--
--*************** VISTA DE PROYECCIONES ******************--
CREATE OR ALTER VIEW cine.VW_Proyecciones
as
SELECT	[proy_Id], 
		[proy_Pelicula],
		t2.peli_Titulo,
		[proy_Sala],
		t3.sala_Butacas,
		t3.sala_Tipo,
		t5.casa_Categoria,
		t5.casa_Precio,
		[proy_Horario],
		CONVERT(varchar, t4.hor_HoraInicio, 100) AS hor_HoraInicio,
		CONVERT(varchar, t4.hor_HoraFin, 100) AS hor_HoraFin,
		[proy_Estado]
FROM	cine.tbProyecciones t1
INNER JOIN cine.tbPeliculas t2 ON t1.proy_Pelicula = t2.peli_Id
INNER JOIN cine.tbSalas t3 ON t1.proy_Sala = t3.sala_Id
INNER JOIN cine.tbHorarios t4 ON t1.proy_Horario = t4.hor_Id
INNER JOIN cine.tbCategoriaSala t5 ON t3.sala_Tipo = t5.casa_Id


GO
CREATE OR ALTER PROCEDURE cine.UDP_tbProyecciones_SELECT
AS 
BEGIN
	DECLARE @AsientosDisponibles INT;
	SELECT @AsientosDisponibles = COUNT(*)
	FROM cine.tbAsientos
	WHERE asie_Reservado = 0;
	SELECT TOP (1000) [proy_Id]
      ,[proy_Pelicula]
      ,[peli_Titulo]
      ,[proy_Sala]
      ,[sala_Butacas]
      ,[sala_Tipo]
      ,[casa_Categoria]
      ,[casa_Precio]
      ,[proy_Horario]
      ,[hor_HoraInicio]
      ,[hor_HoraFin]
	FROM [db_Cine].[cine].[VW_Proyecciones]
	WHERE proy_Estado = 1 and [proy_Sala] NOT IN (
	SELECT DISTINCT [asie_Sala]
		FROM cine.tbAsientos
		WHERE asie_Reservado = 0
		GROUP BY [asie_Sala]
		HAVING COUNT(*) = [sala_Butacas]
	)
END

--*******************************************************--
--*************** find DE PROYECCIONES ******************--
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbProyecciones_FIND 
    @proy_Id INT
AS 
BEGIN
	
	 
	 BEGIN TRY
		 
	SELECT TOP (1000) [proy_Id]
      ,[proy_Pelicula]
      ,[peli_Titulo]
      ,[proy_Sala]
      ,[sala_Butacas]
      ,[sala_Tipo]
      ,[casa_Categoria]
      ,[casa_Precio]
      ,[proy_Horario]
      ,[hor_HoraInicio]
      ,[hor_HoraFin]
	FROM [db_Cine].[cine].[VW_Proyecciones]
	WHERE proy_Estado = 1 AND proy_Id = @proy_Id
	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 CodeStatus
	END CATCH   
END
--*****************************************************--
--*************** INSER DE PROYECCIONES ******************--
go
CREATE OR ALTER PROCEDURE cine.UDP_tbProyecciones_INSERT
	@proy_Pelicula INT,
	@proy_Sala INT,
	@proy_Horario INT
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		 
	INSERT INTO cine.tbProyecciones (proy_Pelicula, proy_Sala, proy_Horario)
	VALUES (@proy_Pelicula, @proy_Sala, @proy_Horario);
	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 CodeStatus
	END CATCH   
END
--*******************************************************--
--*************** UPDATE DE PROYECCIONES ******************--
go
CREATE OR ALTER PROCEDURE cine.UDP_tbProyecciones_UPDATE (
    @proy_Id INT,
    @proy_Pelicula INT,
    @proy_Sala INT,
    @proy_Horario INT
)
AS
BEGIN
BEGIN TRY
		 
    UPDATE cine.tbProyecciones
    SET proy_Pelicula = @proy_Pelicula,
        proy_Sala = @proy_Sala,
        proy_Horario = @proy_Horario
    WHERE proy_Id = @proy_Id;
	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 CodeStatus
	END CATCH   
END;
--*******************************************************--
--*************** DELETE DE PROYECCIONES ******************--
go
CREATE OR ALTER PROCEDURE cine.UDP_tbProyecciones_DELETE (
    @proy_Id INT
)
AS
BEGIN
BEGIN TRY
		 
    UPDATE cine.tbProyecciones
    SET proy_Estado = 0
    WHERE proy_Id = @proy_Id;
	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		SELECT 0 CodeStatus
	END CATCH   
END;
--*****************************************************--
--*************** VISTA DE HORARIOS ******************--
go
CREATE OR ALTER VIEW cine.VW_tbHorario
as
SELECT hor_Id, 
       CONVERT(VARCHAR(15), hor_HoraInicio, 100) AS HoraInicio, 
       CONVERT(VARCHAR(15), hor_HoraFin, 100) AS HoraFin 
FROM CINE.tbHorarios;
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbHorario_SELECT
AS
BEGIN
SELECT TOP (1000) [hor_Id]
      ,[HoraInicio]
      ,[HoraFin]
  FROM [db_Cine].[cine].[VW_tbHorario]
END

--/////////////////--PRUEBA DE FACTURA--//////////////////////--
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbAsientos_SELECT 
@asie_Sala INT
AS
BEGIN
	SELECT TOP (1000) [asie_Id]
		,[asie_Sala]
		,[asie_Code]
		,[asie_Reservado]
		,[asie_UserCrea]
		,[asie_FechaCrea]
		,[asie_UserMofica]
		,[asie_FechaModifica]
  FROM	[db_Cine].[cine].[tbAsientos]
  WHERE [asie_Sala] = @asie_Sala
END

GO
------ NUEVO -------
CREATE OR ALTER PROCEDURE acce.UDP_tbRolesPantalla_PantallasNoAsociadasAlRol
    @rol_Id INT
AS
BEGIN
    SELECT DISTINCT Pantallas.panta_Id, Pantallas.panta_Descripcion
    FROM acce.tbPantallas Pantallas
    WHERE NOT EXISTS (
        SELECT 1 FROM acce.tbRolesPantallas rolpan
        WHERE rolpan.ropa_Rol = @rol_Id AND rolpan.ropa_Pantalla = Pantallas.panta_Id
    )
END
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbRolesPantallas_EliminarRolDePantalla
	@ropa_Id INT
AS
BEGIN
  BEGIN TRY
	DELETE FROM acce.tbRolesPantallas
	WHERE	ropa_Id = @ropa_Id

	SELECT 1 codeStatus
  END TRY
  BEGIN CATCH
	SELECT 0 codeStatus
  END CATCH
END
GO
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbEmpleadosSinUsuarios
AS
BEGIN
	SELECT empl_Id, empl_Nombre + ' ' + empl_Apellidos AS empl_Nombre 
	FROM gral.tbEmpleados emple
	LEFT JOIN acce.tbUsuarios usu
	ON usu.user_Empleado = emple.empl_Id
	WHERE emple.empl_Estado = 1
	AND usu.user_Empleado IS NULL
END
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbEmpleadoSinUsuario_Editar
@user_Id	 INT
AS
BEGIN
	BEGIN TRY
		DECLARE @EmpleadoId INT 
		SET @EmpleadoId = (SELECT user_Empleado FROM acce.tbUsuarios WHERE user_Id = @user_Id);

		SELECT empl_Id, empl_Nombre + ' ' + empl_Apellidos AS empl_Nombre FROM gral.tbEmpleados WHERE empl_Id = @EmpleadoId
		UNION ALL
		SELECT empl_Id, empl_Nombre + ' ' + empl_Apellidos AS empl_Nombre 
		FROM gral.tbEmpleados emple
		LEFT JOIN acce.tbUsuarios usu
		ON usu.user_Empleado = emple.empl_Id
		WHERE emple.empl_Estado = 1
		AND usu.user_Empleado IS NULL
	END TRY
	BEGIN CATCH
		SELECT 0 codeStatus
	END CATCH
END