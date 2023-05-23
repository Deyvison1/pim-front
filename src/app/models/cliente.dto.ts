import { Endereco } from './endereco.dto';

export class Cliente {
  constructor(
    public id?: number,
    public rg?: string,
    public cpf?: string,
    public nome?: string,
    public dataCadastro?: Date,
    public telefone?: string,
    public email?: string,
    public endereco?: Endereco
  ) {}
}
