import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {PhraseService} from "./phrase.service";
import {Phrase} from "./phrases.class";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PhraseDetailsResolver implements Resolve<Phrase | boolean> {

  constructor(
    private router: Router,
    private phraseService:PhraseService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Phrase | boolean> | Promise<Phrase | boolean> {
    const id = +route.params.id;

    if (isNaN(id)) this.emptyNavigate();

    return this.phraseService
      .getPhrase(id)
      .then((phrase: Phrase | undefined) => {
      if (phrase) {
        return phrase
      }

      this.emptyNavigate();

      return false;
    })
  }

  private emptyNavigate(): void {
    this.router.navigate(['/phrases']).then();
  }
}
