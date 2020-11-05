import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /*
    const promise = new Promise( (resolve, reject) => {
      if(false){
        resolve('Hola Mundo');
      } else {
        reject('Algo salió mal');
      }
    });

    promise.then( (message) => {
      console.log(message);
    })
    .catch( error => {
      console.log('Error en la promesa', error);
    })

    console.log('Fin del ngInit');
    */

    this.getUsers().then(users => {
      console.log(users);
    })
  }

  getUsers(){
    const promise = new Promise(resolve => {
      fetch('https://reqres.in/api/users')
      .then(resp => resp.json())
      .then(body => resolve(body.data));
    });

    return promise;
  }

}
