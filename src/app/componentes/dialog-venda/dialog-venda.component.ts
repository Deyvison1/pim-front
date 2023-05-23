import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/models/cliente.dto';
import { Produto } from 'src/app/models/produto.dto';
import { Venda } from 'src/app/models/venda.dto';
import { ClienteService } from 'src/app/services/cliente.service';
import { VendaService } from 'src/app/services/venda.service';

@Component({
  selector: 'app-dialog-venda',
  templateUrl: './dialog-venda.component.html',
  styleUrls: ['./dialog-venda.component.scss'],
})
export class DialogVendaComponent implements OnInit {
  tipoPagamento = ['CARTÃO', 'DINHEIRO', 'PIX'];
  selectedFormaPagamento: string;
  quantidade: number;
  clientes: Cliente[] = [];
  selectedCliente: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Produto,
    private clienteService: ClienteService,
    private serviceVenda: VendaService,
    private snackMessage: MatSnackBar,
    private dialogRef: MatDialogRef<DialogVendaComponent>,
  ) {}

  ngOnInit(): void {
    this.getAllClientes();
  }

  setTipoPagamento(value) {
    const formaPagamento = this.tipoPagamento.find((x) => x === value);
    if (formaPagamento) {
      this.selectedFormaPagamento = formaPagamento;
    }
  }

  setCliente(id) {
    if (id) {
      this.selectedCliente = id;
    }
  }

  vender() {
    const products: Produto[] = [];
    this.data.quantidade = this.quantidade;
    products.push(this.data)
    const cliente = (this.clientes.length === 1)? this.clientes[0].id : this.selectedCliente;
    const formaPagamento = (this.selectedCliente)? this.selectedCliente : this.tipoPagamento[0];
    console.log(formaPagamento)
    const venda = {
      tipoPagamento: formaPagamento, cliente: Object.assign({id: cliente}), products: products, valor: this.data.valor, statusVenda: 'ANDAMENTO'
    };
    if(!venda.cliente || !venda.tipoPagamento) {
      return;
    }
    this.serviceVenda.add(venda).subscribe(
      {
        next: (resp) => {
          this.snackMessage.open(`Successo na venda do produto ${this.data.nome} no valor de ${this.data.valor} e quantidade de ${this.data.quantidade}`, 'OK')
          this.dialogRef.close();
        }, complete: () => {}, error: () => {
          this.snackMessage.open(`Error inesperado`, 'OK')
        }
      }
    )
    
  }

  getAllClientes() {
    this.clienteService.getAll().subscribe({
      next: (resp) => {
        this.clientes = resp;
      },
      complete: () => {},
      error: () => {},
    });
  }
}
