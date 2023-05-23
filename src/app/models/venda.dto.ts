import { Cliente } from './cliente.dto';
import { Produto } from './produto.dto';

export class Venda {
  constructor(
    public valor?: number,
    public id?: number,
    public dataVenda?: Date,
    public tipoPagamento?: string,
    public statusVenda?: string,
    public product?: Produto,
    public cliente?: Cliente
  ) {}
}
