import {
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ITranslation } from '../../shared/models/translations.type';
import { TranslationService } from '../../shared/services/translation.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginForm } from './models/login-form-group.interface';
import { RouterLink } from '@angular/router';
import { CarouselModule } from '@coreui/angular';
import { Slide } from '../../shared/models/slide.interface';
import { SystemEnum } from '../../shared/enums/system.enum';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    CarouselModule
],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly translationService: TranslationService = inject(TranslationService);
  private readonly subscription$: Subscription = new Subscription();
  
  protected readonly translations$: Observable<Partial<ITranslation>> = this.translationService.getTranslations();
  protected readonly fb: FormBuilder = inject(FormBuilder);

  protected form!: FormGroup<LoginForm>;
  protected slides: Slide[] = Array(3).fill({});

  private translations!: Partial<ITranslation>;

  public ngOnInit(): void {
    this.subscription$.add(
      this.translations$.subscribe({
        next: (translations) => this.setSlides(translations)
      })
    );

    this.translationService.load('test/test');
    this.createForm();
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private setSlides(translations: Partial<ITranslation>): void {
    this.slides[0] = {
      id: 0,
      type: 'image',
      src: '/assets/img/flower-dog.svg',
      alt: translations['DogImageAlt'] ?? '',
      title: translations['DogImageTitle'] ?? '',
      subtitle: translations['DogImageCaption'] ?? ''
    };

    this.slides[1] = {
      id: 1,
      type: 'image',
      src: '/assets/img/cat-sunglasses.svg',
      alt: translations['CatImageAlt'] ?? '',
      title: translations['CatImageTitle'] ?? '',
      subtitle: translations['CatImageCaption'] ?? ''
    };

    this.slides[2] = {
      id: 2,
      type: 'image',
      src: '/assets/img/panda-on-tree.svg',
      alt: translations['PandaImageAlt'] ?? '',
      title: translations['PandaImageTitle'] ?? '',
      subtitle: translations['PandaImageCaption'] ?? ''
    };
  }

  private createForm(): void {
    this.form = this.fb.group<LoginForm>({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: Validators.required }),
    });
  }

  protected submit(): void {
    console.log();
  }

  protected get system(): typeof SystemEnum {
    return SystemEnum;
  }

  protected get f(): LoginForm {
    return this.form.controls;
  }
}
