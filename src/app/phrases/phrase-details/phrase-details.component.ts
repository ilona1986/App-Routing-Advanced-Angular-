import { Component, OnInit } from '@angular/core';
import {PhraseService} from "../../shared/phrase.service";
import {Phrase} from "../../shared/phrases.class";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {AuthService} from "../../shared/auth.service";
import {CanComponentDeactivate} from "../../shared/can-deactivate.guard";
import {Observable} from "rxjs";

@Component({
  selector: 'app-phrase-details',
  templateUrl: './phrase-details.component.html',
  styleUrls: ['./phrase-details.component.scss']
})
export class PhraseDetailsComponent implements OnInit, CanComponentDeactivate {

  phrase!: Phrase;
  editValue!: string;
  editLanguage!: string;

  constructor(
    private phraseService:PhraseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.phrase = data.phrase;
      this.editValue = this.phrase.value;
      this.editLanguage = this.phrase.language;
    })
  }

  gotoPhrasesList(): void {
    this.router.navigate(['/phrases', {id: this.phrase?.id, param1: 'test', param2: 123}]).then()
  }

  isChanged(): boolean {
    return !(this.phrase?.value === this.editValue && this.phrase.language === this.editLanguage);
  }

  save(): void {
    if(this.phrase) {
      this.phrase.value = this.editValue;
      this.phrase.language = this. editLanguage;
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean  {
    if (!this.phrase) return true
    if (!this.isChanged()) return true
    return confirm('Вы не сохранили изменения. \n Данные будут потеряны.\nУйти со страницы в любом случае?');
  }
}
