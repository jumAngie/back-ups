
CREATE OR ALTER PROC acce.UDP_PantallasPorRol
	@role_Id		INT
AS
BEGIN
SELECT	ropa_Id, ropa_Rol, ropa_Pantalla, pants.panta_Descripcion, roles.role_Nombre FROM acce.tbRolesPantallas ropa INNER JOIN acce.tbPantallas pants
ON		pants.panta_Id = ropa.ropa_Pantalla INNER JOIN acce.tbRoles roles
ON		ropa.ropa_Rol = roles.role_Id
WHERE	ropa_Rol = @role_Id
END

