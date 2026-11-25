import { Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { SystemEnum } from '../enums/system.enum';

@Service()
export class EnvironmentService {
  private readonly _apiUrl: string = environment.apiUrl;
  private readonly _DEFAULT_LANG: string = SystemEnum.DEFAULT_LANG;
  private readonly _SYSTEM_LANG: string =
    Intl.DateTimeFormat().resolvedOptions().locale;

  public get apiUrl(): string {
    return this._apiUrl;
  }

  public get DEFAULT_LANG(): string {
    return this._DEFAULT_LANG;
  }

  public get SYSTEM_LANG(): string {
    return this._SYSTEM_LANG;
  }
}
