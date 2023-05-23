import { Component, OnInit } from '@angular/core';
import { Venda } from 'src/app/models/venda.dto';
import { VendaService } from 'src/app/services/venda.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormUtil } from 'src/app/utils/form.utils';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.scss']
})
export class VendaComponent implements OnInit {
  displayedColumns = ['statusVenda', 'tipoPagamento', 'valor', 'cliente', 'products', 'quantidade', 'acoes'];
  statusVendaList: any[] = [];
  tipoPagamentoList: any[] = [];
  statusVendaSelected = '';
  tipoPagamentoSelected = '';

  vendasFiltradas: Venda[] = [];
  vendas: Venda[] = [];
  paramsFilter = {
    statusVenda: '',
    tipoPagamento: '',
  }
  form: FormGroup;

  constructor(private service: VendaService) {}

  ngOnInit(): void {
    this.initFilter();
    this.form = FormUtil.buildForm(Object.keys(new Venda()));
    this.getAll();
  }

  initFilter() {
    this.statusVendaList.push({id: 1, statusVenda: 'CANCELADO'});
    this.statusVendaList.push({ id: 2, statusVenda: 'FINALIZADO'});
    this.statusVendaList.push({ id: 3, statusVenda: 'EN ANDAMENTO' });

    this.tipoPagamentoList.push({ id: 1 , tipoPagamento: 'PIX'});
    this.tipoPagamentoList.push({ id: 2 , tipoPagamento: 'DINHEIRO'});
    this.tipoPagamentoList.push({ id: 2 , tipoPagamento: 'CARTAO'});
  }

  finalizar(id: number) {
    this.service.finalizarVenda(id).subscribe({
      next: () => {
        this.getAll();
      }, complete: () => {}, error: () => {}
    })
  }


  cancelarVenda(id) {
    this.service.cancelarVenda(id).subscribe({
      next: (resp) => {
        this.getAll();
      }, complete: () => {}, error: () => {}
    })
  }

  getAll() {
    this.service.getAll().subscribe(
      {
        next: (resp) => {
          this.vendas = resp;
          this.vendasFiltradas = resp;
        }, complete: () => {}, error: () => {}
      }
    );
  }


}
