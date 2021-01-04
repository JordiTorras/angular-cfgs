import { Injectable } from '@angular/core';
import { Renderer2, RendererFactory2 } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// interface CfgPropertiesResponse {
//   cfgs: CfgPropertyResponse[];
// }

interface CfgPropertyResponse {
  id: string;
  visible: string;
  editable: string;
  obligatorio: string;
  valor: string;
}

// class CfgProperty {
//   id: string;
//   visible: boolean;
//   editable: boolean;
//   obligatorio: boolean;
//   valor: string;

//   constructor() {}

//   static f_PropertyDesdeJson(datos: CfgPropertyResponse): CfgProperty {
//     let a = new CfgProperty();
//     a.id = datos.id;
//     a.visible = datos.visible === 'true' ? true : false;
//     a.editable = datos.editable === 'false' ? false : true;
//     a.obligatorio = datos.obligatorio === 'true' ? true : false;
//     a.valor = datos.valor;
//     return a;
//   }
// }

@Injectable({
  providedIn: 'root',
})
export class CfgService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2, private _http: HttpClient) {
    console.log('constructor CfgService');
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  f_leerCfg(cfgFile: string) {
    this._http
      .get<CfgPropertyResponse[]>('/assets/cfgs/' + cfgFile + '.json')
      .subscribe((data) => {
        // console.log(data);
        //console.log(this.cfgProperties);
        this.f_tratarCfgFile(data);
      });
  }

  f_tratarCfgFile(properties: CfgPropertyResponse[]) {
    console.log('Entrada this.f_tratarCfgFile');
    const numProperties = properties.length;

    for (let property of properties) {
      let el: HTMLInputElement = <HTMLInputElement>(
        document.getElementById(property.id)
      );
      if (el === null) continue; // Si el elemento no existe saltamos al siguiente

      console.log(property);
      console.log(el);

      // visible / no visible
      if (property.visible === 'verdadero') this.visualizar(el);
      if (property.visible === 'falso') this.visualizar(el);

      if (property.editable) this.editable(el);
      if (!property.editable) this.bloqueado(el);
    }
  }

  visualizar(el: HTMLInputElement) {
    //this.renderer.setProperty(el, 'visible', 'true');
  }
  editable(el: HTMLInputElement) {}

  bloqueado(el: HTMLInputElement) {
    console.log(el);
    this.renderer.setProperty(el, 'disabled', 'true');
  }
}
