export class Endereco {
  constructor(
    public id?: number,
    public nome?: string,
    public cep?: string,
    public logradouro?: string,
    public bairro?: string,
    public localidade?: string,
    public uf?: string,
    public ddd?: string
  ) {}
}
