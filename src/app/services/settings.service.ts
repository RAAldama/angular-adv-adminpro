import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  linkTheme = document.querySelector('#theme');

  constructor() { 
    this.lookForTheme();
  }

  lookForTheme(){
    const savedTheme = localStorage.getItem('theme');
    let url = '';

    if(!savedTheme){
      url = `./assets/css/colors/default-dark.css`;
    }else{
      url = savedTheme;
    }

    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
  }

  changeTheme(theme: string){
    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');;

    links.forEach(elem => {
      elem.classList.remove('working');

      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if(btnThemeUrl === currentTheme){
        elem.classList.add('working');
      }
    });
  }
}
