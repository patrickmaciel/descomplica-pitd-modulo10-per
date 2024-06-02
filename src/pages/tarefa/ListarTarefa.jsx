import React, { useState, useEffect, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';

//A função abaixo é usada para criar o array contendo os dados iniciais da listagem de tarefas.
function createData(
  idTarefa: number,
  tituloTarefa: string,
  descricaoTarefa: string,
  inicioTarefa: string,
  fimTarefa: string,
  statusTarefa: string,
  recursoTarefa: string,
) {
  return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

//Definição do array contendo os dados iniciais da listagem de tarefas
const initialRows = [
  createData(1, 'Implementar API', 'Desenvolver a API para o novo recurso X', '2022-01-01', '2022-01-02', 'Concluída', 'Desenvolvedor 1'),
  createData(2, 'Criar testes do módulo X', 'Escrever testes unitários e de integração para o módulo X', '2022-01-03', '2022-01-04', 'Em Andamento', 'Desenvolvedor 2'),
  createData(3, 'Criar nova página', 'Desenvolver a nova página de perfil do usuário', '2022-01-04', '2022-01-05', 'Em Andamento', 'Desenvolvedor 3'),
  createData(4, 'Atualizar componente Y', 'Refatorar o componente Y para melhorar a performance', '2022-01-05', '2022-01-06', 'Em Andamento', 'Desenvolvedor 4'),
  createData(5, 'Corrigir bug Z', 'Investigar e corrigir o bug Z reportado pelos usuários', '2022-01-06', '2022-01-07', 'Em Andamento', 'Desenvolvedor 5'),
  createData(6, 'Documentar API', 'Escrever a documentação para a nova API', '2022-01-07', '2022-01-08', 'Aguardando', 'Desenvolvedor 6'),
];

//Componente ListarTarefa
const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);
  const [searchText, setSearchText] = useState('');
  const timerRef = useRef();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  //O array definido acima é setado como conteúdo do state Tarefas na renderização inicial do componente.
  useEffect(() => {
    setTarefas(initialRows);
  },[]);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);

    //Objeto local para armazenamento da tarefa filtrada de acordo com a seleção do usuário
    let tarefaParaEditar = tarefas.filter(obj => {
      return obj.idTarefa === id;
    })[0];

    //Atribuição do Objeto local, setado acima, ao state Tarefa
    setTarefa(tarefaParaEditar);

    //Seta como true o state responsável pela exibição do Model de Editar Tarefa
    setOpenEditar(true)
  };

  const handleDeletar = (id) => {
    setTarefas(current =>
      current.filter(tarefa => {
        return tarefa.idTarefa !== id;
      }),
    );
    setSearchText('');
  };

  const handleSearch = () => {
    if (searchText !== '') {
      setTarefas(tarefas.filter(tarefa =>
        tarefa.tituloTarefa.toLowerCase().includes(searchText.toLowerCase()) ||
        tarefa.descricaoTarefa.toLowerCase().includes(searchText.toLowerCase())
      ));
    } else {
      setTarefas(initialRows);
    }
  };


  return(
    <>
      <Card>
        <CardHeader
          title="Tarefas"
          subheader="Listagem de Tarefas"
        />
        <CardContent>
          <Grid container spacing={1} alignItems="center">
            <Grid item lg={11}>
              <TextField
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                label="Buscar"
                variant="outlined"
              />
              <Button variant="contained" color="primary" onClick={handleSearch}>
                <SearchIcon />
                Buscar
              </Button>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell align="right">Descrição</TableCell>
                  <TableCell align="right">Data de Início</TableCell>
                  <TableCell align="right">Data de Finalização</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Recurso</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarefas.map((row, indice) => (
                  <TableRow
                    key={indice}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                  >
                    <TableCell component="th" scope="row">
                      {row.idTarefa}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.tituloTarefa}
                    </TableCell>
                    <TableCell align="right">{row.descricaoTarefa}</TableCell>
                    <TableCell align="right">{row.inicioTarefa}</TableCell>
                    <TableCell align="right">{row.fimTarefa}</TableCell>
                    <TableCell align="right">{row.statusTarefa}</TableCell>
                    <TableCell align="right">{row.recursoTarefa}</TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="success"
                              onClick={() => handleEditar(row.idTarefa)}><EditIcon
                        fontSize="small"/></Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="error"
                              onClick={() => handleDeletar(
                                row.idTarefa)}><DeleteIcon
                        fontSize="small"/></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" onClick={handleOpen}>Criar
            Tarefa</Button>
          <Button size="small" variant="outlined">Cancelar</Button>
        </CardActions>
      </Card>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
          </div>
        </Modal>
      </div>
      <div>
        <Modal
          open={openEditar}
          onClose={handleCloseEditar}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            <EditarTarefa handleCloseEditar={handleCloseEditar} idTarefaSelecionada={idTarefaSelecionada} tarefas={tarefas} tarefa={tarefa} setTarefas={setTarefas} />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ListarTarefa;