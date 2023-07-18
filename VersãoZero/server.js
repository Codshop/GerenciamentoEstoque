const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// URL de conexão com o MongoDB
const url = 'mongodb://localhost:27017';

// Nome do banco de dados
const nomeBancoDados = 'Estoque001';

// Método para conectar com o servidor MongoDB
MongoClient.connect(url, function(erro, cliente) {
  if (erro) {
    console.error("Erro ao conectar ao servidor MongoDB:", erro);
    return;
  }
  console.log("Conectado com sucesso ao servidor");

  const db = cliente.db(nomeBancoDados);

  // Inserir documentos e encontrar todos após a inserção
  insereDocumentos(db, function() {
    buscaDocumentos(db, function() {
      cliente.close(); // Fechar a conexão com o MongoDB após a operação
    });
  });
});

// Função para inserir documentos na coleção 'documentos'
const insereDocumentos = function(db, callback) {
  // Obtendo a coleção 'documentos'
  const colecao = db.collection('documentos');
  // Inserindo alguns documentos
  colecao.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(erro, resultado) {
    if (erro) {
      console.error("Erro ao inserir documentos:", erro);
      return;
    }
    console.log("Inseridos 3 documentos na coleção");
    callback(resultado);
  });
}

// Função para buscar todos os documentos na coleção 'documentos'
const buscaDocumentos = function(db, callback) {
  // Obtendo a coleção 'documentos'
  const colecao = db.collection('documentos');
  // Buscando todos os documentos
  colecao.find({}).toArray(function(erro, documentos) {
    if (erro) {
      console.error("Erro ao buscar documentos:", erro);
      return;
    }
    console.log("Encontrados os seguintes registros");
    console.log(documentos);
    callback(documentos);
  });
}

// Rota POST para adicionar um produto na coleção 'produtos'
app.post('/add-produto', function (req, res) {
  MongoClient.connect(url, function(erro, cliente) {
    if (erro) {
      console.error("Erro ao conectar ao servidor MongoDB:", erro);
      return;
    }
    console.log("Conectado com sucesso ao servidor");
    const db = cliente.db(nomeBancoDados);
    const colecao = db.collection('produtos');

    // Extrair informações do corpo da requisição
    const { productName, productQuantity, productPrice } = req.body;

    // Inserir um documento na coleção 'produtos'
    colecao.insertOne({ name: productName, quantity: productQuantity, price: productPrice }, function(erro, resultado) {
      if (erro) {
        console.error("Erro ao inserir produto:", erro);
        res.status(500).send('Erro ao adicionar o produto.');
        return;
      }
      console.log("Inserido um documento na coleção de produtos.");
      cliente.close();
      res.status(200).send('Produto adicionado com sucesso.');
    });
  });
});

// Iniciar o servidor Express na porta 3000
app.listen(3000, () => console.log('Servidor está rodando na porta 3000'));
