use db_Cine
go

--*****************************************************--
--*************** ESQUEMA DE Acceso ******************--


--*****************************************************--
--*************** VISTA DE ROL ******************--
GO
CREATE OR ALTER VIEW VW_tbRoles
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
  FROM [db_Cine].[dbo].[VW_tbRoles]
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
  FROM [db_Cine].[dbo].[VW_tbRoles]
  WHERE [role_Estado] = 1
  AND [role_Id] = @role_Id

END

--*************** INSERT DE ROL ******************-
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbROL_INSERT
 @role_Nombre nvarchar(100),
 @role_UsuCreacion int
 AS
BEGIN
BEGIN TRY
		
			
INSERT INTO [acce].[tbRoles]
           ([role_Nombre] ,[role_UsuCreacion] )
     VALUES
           (@role_Nombre,@role_UsuCreacion)
 
			SELECT 1 CodeStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus
END CATCH

END
--*************** UPDATE DE ROL ******************-
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbROL_UPDATE
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
CREATE OR ALTER PROCEDURE cine.UDP_tbROL_DELETE
@role_Id INT
AS
BEGIN
BEGIN TRY
		
			
		UPDATE [acce].[tbRoles]
   SET [role_Estado] = 0
		WHERE	[role_Id] = @role_Id
 
			SELECT 1 CodeStatus
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus
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
      ,[user_Rol]
	  ,role_Nombre
      ,[user_EsAdmin]
      ,[user_Estado]
      ,[user_UsuarioCrea]
      ,[user_FechaCrea]
      ,[user_UsuarioModifica]
      ,[user_FechaModifica]
  FROM [db_Cine].[acce].[tbUsuarios] T1 INNER JOIN gral.tbEmpleados t2
  ON	t1.user_Empleado = t2.empl_Id  INNER JOIN acce.tbRoles t3
  ON	t1.user_Rol = t3.role_Id

go
CREATE or alter PROCEDURE acce.UDP_ValidarLogIN  
    @correoElectronico NVARCHAR(50),
    @contrasenia NVARCHAR(150)
AS
BEGIN
    DECLARE @usuarioId INT;
    DECLARE @usuarioNombre NVARCHAR(250);
    DECLARE @usuarioApellido NVARCHAR(250);

    SELECT @usuarioId = user_Id,
           @usuarioNombre = [user_NombreUsuario],
           @usuarioApellido = [user_Contrasenia]
    FROM [acce].[tbUsuarios]
    WHERE [user_NombreUsuario] = @correoElectronico
      AND [user_Contrasenia] = HASHBYTES('Sha2_512', @contrasenia);

    IF (@usuarioId IS NOT NULL)
    BEGIN
        SELECT @usuarioId AS [user_Id],
               @usuarioNombre AS [user_NombreUsuario],
               @usuarioApellido AS [user_Contrasenia];
    END
    ELSE
    BEGIN
        SELECT 'Usuario o contraseña incorrectos' AS mensaje;
    END
END




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

END

--*************** INSERT DE Usuario ******************--
 GO
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuario_INSERT 
@user_NombreUsuario		nvarchar(150),
@user_Contrasenia		nvarchar(150),
@user_Empleado				int,
@user_Rol					int,
@user_EsAdmin				bit,
@user_UsuarioCrea		int
AS
BEGIN

 BEGIN TRY
 
DECLARE @password NVARCHAR(MAX)=(SELECT HASHBYTES('Sha2_512', @user_Contrasenia));

INSERT INTO [acce].[tbUsuarios]
						(user_NombreUsuario, user_Contrasenia, user_Empleado, user_Rol, user_EsAdmin, user_UsuarioCrea)
						VALUES
						(@user_NombreUsuario,               @password,          @user_Empleado,          @user_Rol,			@user_EsAdmin,             @user_UsuarioCrea)


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
@user_Contrasenia		nvarchar(150),
@user_Empleado				int,
@user_Rol					int,
@user_EsAdmin				bit,
@user_UsuarioModifica		int
AS
BEGIN

 BEGIN TRY
 
		UPDATE [acce].[tbUsuarios]
   SET [user_NombreUsuario] = @user_NombreUsuario
      ,[user_Contrasenia] = @user_Contrasenia
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
SELECT [fact_Id]
      ,[fact_Nombres]
      ,[fact_Apellidos]
      ,[fact_RTN]
      ,[fact_Estado]
      ,[fact_UsuCrea]
	  ,t2.user_Empleado
	  ,t3.empl_Nombre + ' ' + t3.empl_Apellidos AS 'Nombre'
      ,[fact_FechaCrea]
      ,[fact_UsuMofica]
      ,[fact_FechaModifica]
  FROM [cine].[tbFacturas] T1 INNER JOIN acce.tbUsuarios t2
  ON	T1.[fact_UsuCrea] = t2.user_Id INNER JOIN gral.tbEmpleados t3
  ON	t2.user_Empleado = t3.empl_Id  



 --*************** SELECT DE FACTURA ******************--
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbFactura_SELECT
AS
BEGIN

	SELECT [fact_Id]
      ,[fact_Nombres]
      ,[fact_Apellidos]
      ,[fact_RTN]
      ,[fact_Estado]
      ,[fact_UsuCrea]
      ,[fact_FechaCrea]
      ,[fact_UsuMofica]
      ,[fact_FechaModifica]
  FROM [cine].VW_tbFactura
  WHERE [fact_Estado] = 1

END

 --*************** INSERT DE FACTURA ******************--
 GO
GO
CREATE OR ALTER PROCEDURE cine.UDP_tbFactura_INSERT 
@fact_Nombres nvarchar(100),
@fact_Apellidos nvarchar(100),
@fact_RTN varchar(14),
@fact_UsuCrea int
AS
BEGIN

 BEGIN TRY
	INSERT INTO [cine].[tbFacturas]
           ([fact_Nombres]
           ,[fact_Apellidos]
           ,[fact_RTN]
            ,[fact_UsuCrea]
            ,[fact_UsuMofica]
           ,[fact_FechaModifica])
     VALUES
           (@fact_Nombres
           ,@fact_Apellidos
           ,@fact_RTN
            ,@fact_UsuCrea
            ,NULL
           ,NULL)
		   	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH

END


 --*************** FIND DE FACTURA ******************--
 GO
CREATE OR ALTER PROCEDURE cine.UDP_tbFactura_FIND 
@fact_Id		INT
AS
BEGIN
 BEGIN TRY
	SELECT [fact_Id]
      ,[fact_Nombres]
      ,[fact_Apellidos]
      ,[fact_RTN]
      ,[fact_Estado]
      ,[fact_UsuCrea]
      ,[fact_FechaCrea]
      ,[fact_UsuMofica]
      ,[fact_FechaModifica]
  FROM [cine].VW_tbFactura
  WHERE [fact_Estado] = 1
  AND	[fact_Id] = @fact_Id

  	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH

END

 --*************** UPDATE DE FACTURA ******************--
 GO
CREATE OR ALTER PROCEDURE cine.UDP_tbFactura_UPDATE 
@fact_Id		INT,
@fact_Nombres nvarchar(100),
@fact_Apellidos nvarchar(100),
@fact_RTN varchar(14),
@fact_UsuMofica int
AS
BEGIN

 BEGIN TRY
	 UPDATE [cine].[tbFacturas]
   SET [fact_Nombres] = @fact_Nombres
      ,[fact_Apellidos] = @fact_Apellidos
      ,[fact_RTN] = @fact_RTN
         ,[fact_UsuMofica] =  @fact_UsuMofica
      ,[fact_FechaModifica] = GETDATE()
 WHERE	[fact_Id] = @fact_Id

 	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH


END


 --*************** DELETE DE FACTURA ******************--

 GO
CREATE OR ALTER PROCEDURE cine.UDP_tbFactura_DELETE 
@fact_Id		INT

AS
BEGIN
 BEGIN TRY

	UPDATE [cine].[tbFacturas]
   SET [fact_Estado] = 0
 WHERE	[fact_Id] = @fact_Id
 	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
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
      ,[sucu_Ciudad]
      ,[sucu_Estado]
      ,[sucu_UserCrea]
	  ,t2.user_Empleado
	  ,t3.empl_Nombre + ' ' + t3.empl_Apellidos AS 'Nombre'
      ,[sucu_FechaCrea]
      ,[sucu_UsuarioModifica]
      ,[sucu_FechaModifica]
  FROM [cine].[tbSucursales] T1 INNER JOIN acce.tbUsuarios t2
  ON	T1.sucu_UserCrea = t2.user_Id INNER JOIN gral.tbEmpleados t3
  ON	t2.user_Empleado = t3.empl_Id  


 --*************** SELECT DE SUCURSAL ******************--

GO
CREATE OR ALTER PROCEDURE cine.UDP_tbSucursale_SELECT
AS
BEGIN
	
	SELECT TOP (1000) [sucu_Id]
      ,[sucu_Nombre]
      ,[sucu_Direccion]
      ,[sucu_Ciudad]
      ,[sucu_Estado]
      ,[Nombre]
      ,[sucu_UserCrea]
      ,[user_Empleado]
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
      ,[sucu_Ciudad]
      ,[sucu_Estado]
      ,[Nombre]
      ,[sucu_UserCrea]
      ,[user_Empleado]
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
					   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
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
 CREATE OR ALTER PROCEDURE cine.UDP_tbCombo_UPDATE
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
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
	END CATCH

END

 --*************** DELETE DE COMBOS ******************--

 GO
 CREATE OR ALTER PROCEDURE cine.UDP_tbCombo_DELETE
@comb_Id INT

AS
BEGIN

	UPDATE [cine].[tbCombos]
	SET [comb_Estado] = 0
	WHERE [comb_Id] = @comb_Id

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
 CREATE OR ALTER PROCEDURE cine.UDP_tbCombos_INSERT
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
					   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
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
  	   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
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

	UPDATE [cine].[tbComboDetalle]
   SET [cdet_Estado] = 0
 WHERE [cdet_Id] = @cdet_Id

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
  where [dire_Estado] = 1

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
      ,[dire_FechaCrea]
      ,[dire_UsuMofica]
      ,[dire_FechaModifica]
  FROM [db_Cine].[cine].[tbDirectores]
  where [dire_Estado] = 1 
  and [dire_Id] = @dire_Id


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
END TRY
BEGIN CATCH
		SELECT 0 CodeStatus
END CATCH

END

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

		   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
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
	
		   SELECT 1 CodeStatus
	END TRY
	BEGIN CATCH
		   SELECT 0 CodeStatus
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

--*****************************************************--
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






