import { type SQLiteDatabase } from "expo-sqlite";

export async function initializaDb(database: SQLiteDatabase) {

  try {
    
  
    await database.execAsync(`

    CREATE TABLE IF NOT EXISTS cadastro (
      id INTEGER,
      municipio TEXT NOT NULL DEFAULT 'Municipio',
      comunidade TEXT NOT NULL DEFAULT 'Comunidade',
      endereco TEXT DEFAULT NULL DEFAULT 'Endereço',
      localiza TEXT NOT NULL,
      nome TEXT NOT NULL,
      cpf TEXT NOT NULL,
      dtNasc TEXT NOT NULL,
      cadUnico TEXT DEFAULT NULL,
      qtdPessoa INTEGER NOT NULL DEFAULT 1,
      renda NUMERIC NOT NULL DEFAULT 0.00,
      moradia TEXT NOT NULL DEFAULT '0',
      outroMoradia TEXT DEFAULT NULL,
      compTelhado NUMERIC NOT NULL DEFAULT 0.00,
      larguracompTelhado NUMERIC NOT NULL DEFAULT 0.00,
      areaTotalTelhado NUMERIC NOT NULL DEFAULT 0.00,
      compTestada NUMERIC DEFAULT 0.00,
      numCaidaTelhado INTEGER NOT NULL DEFAULT 0,
      coberturaTelhado INTEGER NOT NULL DEFAULT 0,
      coberturaOutros TEXT DEFAULT NULL,
      existeFogaoLenha INTEGER NOT NULL DEFAULT 0,
      medidaTelhadoAreaFogao INTEGER DEFAULT 0,
      testadaDispParteFogao INTEGER DEFAULT 0,
      atendPipa TEXT NOT NULL,
      outroAtendPipa TEXT DEFAULT NULL,
      respAtendPipa TEXT DEFAULT NULL ,
      outrObs TEXT DEFAULT NULL ,
      nomeAgente TEXT NOT NULL,
      cpfAgente TEXT NOT NULL,
      nomeEng TEXT NOT NULL ,
      creaEng TEXT NOT NULL ,
      ck_amianto INTEGER DEFAULT 0,
      ck_pvc INTEGER DEFAULT 0,
      ck_concreto INTEGER DEFAULT 0,
      ck_ceramica INTEGER DEFAULT 0,
      ck_fib_cimento INTEGER DEFAULT 0,
      ck_zinco INTEGER DEFAULT 0,
      ck_metalico INTEGER DEFAULT 0,
      ck_outros INTEGER DEFAULT 0,
      obs TEXT DEFAULT NULL,
      dt_cadastro NUMERIC,
      PRIMARY KEY (id AUTOINCREMENT)
      );    
        
    `)
  } catch (error) {

    console.log(error)
  }
}
