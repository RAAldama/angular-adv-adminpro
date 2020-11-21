import { environment } from '../../environments/environment';


export class User {
    base_url = environment.base_url;

    constructor(
        public name: string, 
        public email: string, 
        public password?: string,
        public img?: string, 
        public google?: boolean, 
        public role?: string, 
        public uid?: string
    ){}

    get imageUrl(){
        if(this.img.includes('https')){
            return this.img;
        }

        if(this.img){
            return `${this.base_url}/upload/users/${this.img}`
        }else{
            return `${this.base_url}/upload/users/no-image`
        }
    }
}