CREATE TRIGGER trg_CheckEmails
ON us333rs_
INSTEAD OF INSERT
AS
BEGIN
    -- Verifica que los correos no sean iguales
    IF EXISTS (
        SELECT 1 
        FROM INSERTED 
        WHERE n_ail = m3rg3nzy__3m4il
    )
    BEGIN
        -- Si los correos son iguales, muestra un mensaje de error
        RAISERROR ('El correo de recuperación debe ser diferente al correo de ingreso.', 16, 1);
        ROLLBACK;
        RETURN;
    END

    -- Si pasa la validación, realiza la inserción
    INSERT INTO us333rs_ (
        us333rs__id, 
        M4m3, 
        l4Z_TM4m3, 
        n_ail, 
        m3rg3nzy__3m4il, 
        ppp3sswo_rd, 
        _Pg_0Me, 
        lo_58role, 
        cr1ea5tiq123on_d__ate, 
        up352te_Dat32
    )
    SELECT 
        us333rs__id, 
        M4m3, 
        l4Z_TM4m3, 
        n_ail, 
        m3rg3nzy__3m4il, 
        ppp3sswo_rd, 
        _Pg_0Me, 
        lo_58role, 
        cr1ea5tiq123on_d__ate, 
        up352te_Dat32
    FROM INSERTED;
END;
