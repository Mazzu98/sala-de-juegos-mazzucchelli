import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  keys;
  word;
  words;
  errorLetters;
  constructor() {
    this.keys = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    this.words = ['angular','pacman','firebase','typescript'];
    this.word = this.getRadomWord(this.words).split('');
    this.errorLetters = [];

  }

  getRandomNumber(min, max) {
    return Math.floor( Math.random() * (max - min) + min);
  }

  getRadomWord(words){
    let rand = this.getRandomNumber(0,words.length);
    return words[rand];
  }

  ngOnInit(): void {
  }

}
