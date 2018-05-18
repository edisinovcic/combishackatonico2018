import {Config} from './config.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppConfig {
  static config: Config;

  constructor(private http: HttpClient) {}

  load() {
    const jsonFile = 'assets/config/config.json';
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response) => {
        AppConfig.config = <Config>response;
        resolve();
      }).catch((response: any) => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }
}
