export enum PROFILES {
    ADMIN = 1,
    CLIENT = 2,
    STAFF = 3,
}
export enum PARAMETER_TYPE {
    STRING = 1,
    NUMBER = 2,
    BOOLEAN = 3,
    DATE = 4,
    OPTIONS = 5,
}

export enum ENTRY_TYPE {
    IN = 1,
    OUT = 2,
    COMPLEX_IN = 3,
    COMPLEX_OUT = 4,
}

export interface JWTInterface {
    id: number
    email: string
    password: string
    profileId: PROFILES
    iat?: number
}

export enum UNIT_TYPE {
    // UNIDADES GENERALES Y DE CONTEO
    UND = "UNIDAD",
    PAR = "PAR",
    JGO = "JUEGO",
    KIT = "KIT",
    DOC = "DOCENA",
    CEN = "CENTENA",
    MIL = "MILLAR",
    PZA = "PIEZA",
    PZAJ = "PAQUETE DE PIEZAS",
    SER = "SERVICIO",
    LOTE = "LOTE",
    MOD = "MODULO",
    CONJ = "CONJUNTO",
    PR = "PAR DE UNIDADES",

    // UNIDADES DE EMPAQUE Y PRESENTACION
    EMP = "EMPAQUE",
    PAQ = "PAQUETE",
    BOL = "BOLSA",
    CAJ = "CAJA",
    CJM = "CAJA MASTER",
    BUL = "BULTO",
    FAR = "FARDO",
    SAC = "SACO",
    BOB = "BOBINA",
    ROL = "ROLLO",
    ENV = "ENVASE",
    FRA = "FRASCO",
    BOT = "BOTELLA",
    LAT = "LATA",
    TAR = "TARRO",
    TUB = "TUBO DE EMPAQUE",
    BLIS = "BLISTER",
    BAN = "BANDEJA",
    CAN = "CANASTILLA",
    EST = "ESTUCHE",
    PAL = "PALET",
    CONT = "CONTENEDOR",

    // UNIDADES DE PESO Y MASA
    MG = "MILIGRAMO",
    G = "GRAMO",
    KG = "KILOGRAMO",
    TON = "TONELADA",
    LB = "LIBRA",
    OZ = "ONZA",
    QQ = "QUINTAL",

    // UNIDADES DE VOLUMEN Y CAPACIDAD
    ML = "MILILITRO",
    L = "LITRO",
    M3 = "METRO CUBICO",
    CM3 = "CENTIMETRO CUBICO",
    GAL = "GALON",
    M3H = "METRO CUBICO POR HORA",
    BBL = "BARRIL",

    // UNIDADES DE LONGITUD
    MM = "MILIMETRO",
    CM = "CENTIMETRO",
    M = "METRO",
    KM = "KILOMETRO",
    PULG = "PULGADA",
    PIE = "PIE",
    YD = "YARDA",
    FT = "PIE (UNIDAD INTERNACIONAL)",
    VAR = "VARA",

    // UNIDADES DE AREA Y SUPERFICIE
    CM2 = "CENTIMETRO CUADRADO",
    M2 = "METRO CUADRADO",
    KM2 = "KILOMETRO CUADRADO",
    FT2 = "PIE CUADRADO",
    PULG2 = "PULGADA CUADRADA",
    YD2 = "YARDA CUADRADA",
    HA = "HECTAREA",

    // UNIDADES ELECTRICAS Y TECNICAS
    V = "VOLTIO",
    KV = "KILOVOLTIO",
    A = "AMPERIO",
    MA = "MILIAMPERIO",
    W = "VATIO",
    KW = "KILOVATIO",
    WH = "VATIO-HORA",
    KWH = "KILOVATIO-HORA",
    HP = "CABALLO DE FUERZA",
    RPM = "REVOLUCIONES POR MINUTO",
    HZ = "HERCIO",
    BAR = "BAR",
    PSI = "LIBRA POR PULGADA CUADRADA",
    PA = "PASCAL",
    MPA = "MEGAPASCAL",
    NM = "NEWTON-METRO",
    C = "GRADO CELSIUS",

    // UNIDADES DE TIEMPO Y OPERACION
    SEG = "SEGUNDO",
    MIN = "MINUTO",
    H = "HORA",
    DIA = "DIA",
    MES = "MES",
    TUR = "TURNO",
    CIC = "CICLO",
    KMREC = "KILOMETRO RECORRIDO",
    //OTRAS OPCIONES PERSONALIZABLES

    OTROS = "OTROS",
}
