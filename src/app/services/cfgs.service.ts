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
  etiqueta: string;
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
      let el: HTMLElement = <HTMLElement>document.getElementById(property.id);
      if (el === null) continue; // Si el elemento no existe saltamos al siguiente

      //   console.log(property);
      //   console.log(el);

      // visible
      if (property.visible !== undefined && property.visible) {
        this.visible(el);

        let label: HTMLElement = <HTMLElement>(
          document.getElementById('label_' + property.id)
        );
        if (label !== null) this.visible(label);
      }

      // ocultar
      if (property.visible !== undefined && !property.visible) {
        this.ocultar(el);
        let label: HTMLElement = <HTMLElement>(
          document.getElementById('label_' + property.id)
        );
        if (label !== null) this.ocultar(label);
      }

      // editable
      if (property.editable !== undefined && property.editable) {
        this.editable(el);
      }

      // no editable
      if (property.editable !== undefined && !property.editable) {
        this.bloquear(el);
      }

      // obligatorio
      if (property.obligatorio !== undefined && property.obligatorio) {
        this.obligatorio(el);
      }

      // opcional
      if (property.obligatorio !== undefined && !property.obligatorio) {
        this.opcional(el);
      }

      // valor
      if (property.valor !== undefined) {
        this.valor(el, property.valor);
      }

      // label
      if (property.etiqueta !== undefined) {
        let label: HTMLElement = <HTMLElement>(
          document.getElementById('label_' + property.id)
        );
        if (label !== null) this.etiqueta(label, property.etiqueta);
      }
    }

    console.log('Salida this.f_tratarCfgFile ' + new Date().getTime());
  }

  visible(el: HTMLElement) {
    // console.log('visible ' + el);
    this.renderer.removeAttribute(el, 'hidden');
  }

  ocultar(el: HTMLElement) {
    // console.log('ocultar ' + el);

    this.renderer.setProperty(el, 'hidden', 'true');
  }

  editable(el: HTMLElement) {
    // console.log('editable ' + el);

    this.renderer.removeAttribute(el, 'disabled');
    this.renderer.setProperty(el, 'disabled', 'false');
  }

  bloquear(el: HTMLElement) {
    // console.log('bloquear ' + el);

    this.renderer.setProperty(el, 'disabled', 'true');
  }

  obligatorio(el: HTMLElement) {
    this.renderer.addClass(el, 'cfg-obligatorio');
  }

  opcional(el: HTMLElement) {
    this.renderer.removeClass(el, 'cfg-obligatorio');
  }

  valor(el: HTMLElement, value: string) {
    this.renderer.setProperty(el, 'value', value);
  }

  etiqueta(el: HTMLElement, value: string) {
    this.renderer.setProperty(el, 'textContent', value);
  }
}
