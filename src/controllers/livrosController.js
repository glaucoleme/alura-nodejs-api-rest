import livros from "../models/Livro.js";
import autores from "../models/Autor.js";
import editoras from "../models/Editora.js";

class LivroController {
    static listarLivros = (req, res) => {
        livros.find()
            .populate('autor')
            .populate('editora')
            .exec((err, livros) => {
                if (err) {
                    res.status(400).send({ message: `Id do livro não localizado: ${err.message}` });
                } else {
                    res.status(200).json(livros);
                }
            })
    }

    static listarLivroPorId = (req, res) => {
        const id = req.params.id;
        livros.findById(id)
            .populate('autor', 'nome')
            .populate('editora')
            .exec((err, livro) => {
                if (err) {
                    res.status(400).send({ message: `Id do livro não localizado: ${err.message}` });
                } else {
                    res.status(200).send(livro.toJSON());
                }
            })
    }

    static cadastrarLivro = (req, res) => {
        let livro = new livros(req.body);
        livro.save((err) => {
            if (err) {
                res.status(500).send({ message: `Falha ao cadastrar livro: ${err.message}` });
            } else {
                res.status(201).send(livro.toJSON());
            }
        })
    }

    static atualizarLivro = (req, res) => {
        const id = req.params.id;
        livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Livro atualizado com sucesso!' })
            } else {
                res.status(500).send({ message: `Falha ao atualizar livro: ${err.message}` });
            }
        });
    }

    static excluirLivro = (req, res) => {
        const id = req.params.id;
        livros.findByIdAndDelete(id, (err) => {
            if (err) {
                res.status(500).send({ message: `Falha ao deletar livro: ${err.message}` });
            } else {
                res.status(200).send({ message: 'Livro deletado com sucesso!' })
            }
        })
    }

    static listarLivroPorEditora = (req, res) => {
        const nomeEditora = req.query.editora;
        editoras.find({ 'nome': nomeEditora }, {}, (err, editora) => {
            if (err) {
                res.status(400).send({ message: `Falha ao buscar livro: ${err.message}` });
            } else {
                livros.find({ 'editora': editora.map(x => x._id) }, {})
                    .populate('autor')
                    .populate('editora')
                    .exec((err, livros) => {
                        if (err) {
                            res.status(400).send({ message: `Falha ao buscar livro: ${err.message}` });
                        } else {
                            res.status(200).send(livros);
                        }
                    })
            }
        })
    }

    static listarLivroPorAutor = (req, res) => {
        const nomeAutor = req.query.autor;
        autores.find({ 'nome': nomeAutor }, {}, (err, autor) => {
            if (err) {
                res.status(400).send({ message: `Falha ao buscar livro: ${err.message}` });
            } else {
                livros.find({ 'autor': autor.map(x => x._id) }, {})
                    .populate('autor')
                    .populate('editora')
                    .exec((err, livros) => {
                        if (err) {
                            res.status(400).send({ message: `Falha ao buscar livro: ${err.message}` });
                        } else {
                            res.status(200).send(livros);
                        }
                    })
            }
        })
    }
}

export default LivroController