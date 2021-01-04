import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CfgService {
  constructor(private _http: HttpClient) {
    console.log('constructor CfgService');
  }

  leerCfg(cfgFile: String) {
    this._http
      .get('/assets/cfgs/' + cfgFile + '.xml', {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append(
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method'
          ),
        responseType: 'text',
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
