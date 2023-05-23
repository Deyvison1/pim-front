import { Category } from "./category.dto";

export class Produto {
    constructor(
        public id?: number,
        public codigoBarra?: string,
        public nome?: string,
        public fabricante?: string,
        public valor?: number,
        public quantidade?: number,
        public category?: Category
    ) {}
  }
  