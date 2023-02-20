const http = require("http")
const port = 3000;

const rotas = {
    '/': 'Curso de Node',
    '/livros': 'Pagina de livros',
    '/autores': 'Lista de autores',
    '/editora': 'Pagina de editora',
    '/sobre': 'Informacoes sobre o projeto'
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text-plain' });
    console.log(`URL: ${req.url}`);
    console.log(`rota: ${rotas[req.url]}`);
    res.end(rotas[req.url]);
})

server.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`);
})