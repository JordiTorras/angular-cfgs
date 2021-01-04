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

  constructor(private _cfg: CfgService, private renderer: Renderer2) {}

  /*
  addMyClass() {
    //this.myButton.nativeElement.classList.add("my-class"); //BAD PRACTICE
    this.renderer.addClass(this.myButton.nativeElement, 'my-class');
  }

  removeMyClass() {
    //this.myButton.nativeElement.classList.remove("my-class"); //BAD PRACTICE
    this.renderer.removeClass(this.myButton.nativeElement, 'my-class');
  }

  disable() {
    //this.myButton.nativeElement.setAttribute("disabled", "true"); //BAD PRACTICE
    this.renderer.setAttribute(this.myButton.nativeElement, 'disabled', 'true');
  }

  enable() {
    //this.myButton.nativeElement.removeAttribute("disabled"); //BAD PRACTICE
    this.renderer.removeAttribute(this.myButton.nativeElement, 'disabled');
  }

  clickButton() {
    //this.myButton.nativeElement.click(); //BAD PRACTICE
    this.renderer.selectRootElement(this.myButton.nativeElement).click();
  }
  */

  ngAfterViewInit(): void {
    // Se ejecuta despues de inicialiar la vista
    console.log('Inicio');
    //this.wait(5000);

    // this.renderer.setProperty(
    //   document.getElementById('nombre'),
    //   'disabled',
    //   'true'
    // );
    console.log('despues de cargar la pagina');

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

    this.renderer.setProperty(
      document.getElementById('nombre'),
      'value',
      'Jordi'
    );

    console.log();
  }
}
