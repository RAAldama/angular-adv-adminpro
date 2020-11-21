import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  base_url = environment.base_url;

  constructor() { }

  async upatePhoto(file: File, type: 'users'|'medics'|'hospitals', id: string){
    //USANDO FECTH DE JAVASCRIPT EN LUGAR DE HTTP DE ANGULAR, AMBOS VALIDOS

    try {
      const url = `${this.base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const ans = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await ans.json();
      console.log(data);

      if (data.ok){
        return data.fileName;
      }else{
        console.log(data.msg);
        return false;
      }
      
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
