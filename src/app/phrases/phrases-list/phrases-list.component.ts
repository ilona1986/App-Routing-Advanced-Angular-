import { Component, OnInit } from '@angular/core';
import {Phrase} from "../../shared/phrases.class";
import {PhraseService} from "../../shared/phrase.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-phrases-list',
  templateUrl: './phrases-list.component.html',
  styleUrls: ['./phrases-list.component.scss']
})
export class PhrasesListComponent implements OnInit {

  phrases!: Phrase[];
  private selectedID!: number;

  constructor(
    private  phraseService: PhraseService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.selectedID = +params.id;
      this.phraseService
        .getAllPhrases()
        .then(res => {
        this.phrases = res
      })
    })
  }

  onSelect(phrase: Phrase):void {
    this.router.navigate(['phrases', phrase.id]).then()
  }

  isSelected(phrase: Phrase): boolean {
    return phrase.id === this.selectedID;
  }
}
