import { type SQLiteDatabase } from "expo-sqlite";

export async function initializaDb(database: SQLiteDatabase) {

    await database.execAsync(`
    CREATE TABLE IF NOT EXISTS cadastro (
      id INTEGER,
      nome TEXT NOT NULL);
      `);
      
    //   ,
    //   cpf TEXT NOT NULL,
    //   qtd_pessoa INTEGER NOT NULL DEFAULT 1,
    //   renda_total NUMERIC NOT NULL DEFAULT 0.00,
    //   tipo_moradia TEXT NOT NULL DEFAULT '0',
    //   endereco TEXT DEFAULT NULL DEFAULT 'Endereço',
    //   comunidade TEXT NOT NULL DEFAULT 'Comunidade',
    //   municipio TEXT NOT NULL DEFAULT 'Município',
    //   area_telhado NUMERIC NOT NULL DEFAULT 0.00,
    //   comp_testada NUMERIC NOT NULL DEFAULT 0.00,
    //   num_caida INTEGER NOT NULL DEFAULT 0,
    //   ck_amianto INTEGER NOT NULL DEFAULT 0,
    //   ck_pvc INTEGER NOT NULL DEFAULT 0,
    //   ck_concreto INTEGER NOT NULL DEFAULT 0,
    //   ck_ceramica INTEGER NOT NULL DEFAULT 0,
    //   ck_fib_cimento INTEGER NOT NULL DEFAULT 0,
    //   ck_zinco INTEGER NOT NULL DEFAULT 0,
    //   ck_metalico INTEGER NOT NULL DEFAULT 0,
    //   ck_outros INTEGER NOT NULL DEFAULT 0,
    //   descr_out_tp_material TEXT DEFAULT NULL,
    //   fogao_lenha INTEGER NOT NULL DEFAULT 0,
    //   fog_lenha_metrag_telh INTEGER NOT NULL DEFAULT 0,
    //   fog_lenha_metrag_calha INTEGER NOT NULL DEFAULT 0,
    //   fornecimento_pipa INTEGER NOT NULL DEFAULT 0,
    //   responsavel_fornec_pipa TEXT DEFAULT NULL ,
    //   agente_resp_pesquisa TEXT NOT NULL,
    //   matricula_agente TEXT NOT NULL,
    //   obs TEXT DEFAULT NULL,
    //   dt_cadastro NUMERIC NOT NULL,
    //   lat_long TEXT NOT NULL,
    //   PRIMARY KEY (id AUTOINCREMENT)
    //   );    
        
    // `)
}
