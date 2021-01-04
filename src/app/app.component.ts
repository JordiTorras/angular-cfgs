import { Component, ElementRef, Renderer2 } from '@angular/core';
import { __classPrivateFieldGet } from 'tslib';
import { CfgService } from './services/cfgs.service';

@Component({
  selector: 'app-root',
  template: '<button #myButton></button>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-cfgs';

  //@ViewChild('myButton') myButton: ElementRef;

  constructor(private _cfg: CfgService /* , private renderer: Renderer2 */) {}

  ngAfterViewInit(): void {
    // Se ejecuta despues de inicialiar la vista
    console.log('Inicio');
    //this.wait(5000);

    console.log('despues de cargar la pagina ' + new Date().getTime());

    this._cfg.f_leerCfg('axissin006');
  }

  wait(ms: any) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  f_onclick() {
    console.log('done');
  }
}
