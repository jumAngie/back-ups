USE db_Cine


GO
-- FILTRO PARA ORGANIZAR LOS ASIENTOS POR EL ID DE LA SALA
CREATE OR ALTER PROC cine.VW_tbAsientos_PorSala
@asie_Sala INT
AS
BEGIN
	SELECT   asie_Id, asie_Sala, asie_Reservado, asie_Code  FROM cine.tbAsientos
	WHERE	 asie_Sala = @asie_Sala
END

GO
-- FILTRO PARA ORANIZAR LAS SALAS POR TIPO DE SALA
CREATE OR ALTER PROC cine.VW_tbSalas_PorTipo
	@sala_Tipo INT
AS
BEGIN

	DECLARE @Sala CHAR(3)

	IF @sala_Tipo = 1
			SET @Sala = 'NOR'
	ELSE
			SET @Sala = 'VIP'

	SELECT sala_Id, sala_Butacas, sala_Tipo, sala_Sucursal, sala_Estado FROM cine.tbSalas
	WHERE sala_Tipo = @Sala
END