import { inject, Service } from '@angular/core';
import { EnvironmentService } from './environment.service';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { ITranslation } from '../models/translations.type';
import { HttpService } from './http.service';
import { LanguagesEnum } from '../enums/languages.enum';

@Service()
export class TranslationService {
  private readonly environmentService: EnvironmentService =
    inject(EnvironmentService);
  private readonly httpService: HttpService = inject(HttpService);

  private readonly translations$: BehaviorSubject<Partial<ITranslation>> =
    new BehaviorSubject<Partial<ITranslation>>({});

  private loaded = false;

  public getTranslations(): Observable<Partial<ITranslation>> {
    return this.translations$.asObservable();
  }

  public load(filepath: string): void {
    if (this.loaded) return;

    const lang = this.getAvailableLanguages().includes(
      this.environmentService.SYSTEM_LANG as LanguagesEnum
    )
      ? this.environmentService.SYSTEM_LANG
      : this.environmentService.DEFAULT_LANG;

    const url = `assets/i18n/${lang}/${filepath}.json`;
    this.httpService
      .get<Partial<ITranslation>>(url, false)
      .pipe(finalize(() => (this.loaded = true)))
      .subscribe({
        next: translations => this.handleLoad(translations),
      });
  }

  private handleLoad(translations: Partial<ITranslation>): void {
    this.translations$.next(translations);
  }

  private getAvailableLanguages(): LanguagesEnum[] {
    return Object.values(LanguagesEnum);
  }
}
