import {Injectable} from '@angular/core'
import {HEROES} from './mock-heroes'
import {Http, Headers} from '@angular/http'
import 'rxjs/add/operator/toPromise'
import {Hero} from './hero'

@Injectable()
export class HeroService {
  private heroesUrl= 'api/heroes';
  constructor(private http:Http) {}
  //GET
  getHeroes() {    //return Promise.resolve(HEROES);
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(res => {        // console.log('res:',res);         // console.log('res:',res._body);         // console.log('res:',res.json()); 
        return res.json().data as Hero[]; 
      })
      .catch(this.handleError)
  }
  getHeroesSlowly() {
    return new Promise((resolve, reject)=>{
      setTimeout(()=>resolve(HEROES), 2000)
    })
  }
  getHero(id:number) {
    return this.getHeroes()
      .then( heroes => heroes.find( h => h.id===id) )
  }
  //POST
  private post(hero:Hero): Promise<Hero> {
    let headers = new Headers({'Content-Type':'application/json'});
    return this.http
      .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
  //PUT
  private put(hero:Hero): Promise<Hero> {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http
      .put(`${this.heroesUrl}/${hero.id}`, JSON.stringify(hero), {headers: headers})
      .toPromise()
      .then(()=>hero)      // .then(res => res.json().data)
      .catch(this.handleError);
  }
  //DELETE
  delete(hero:Hero) { //no return type? //Promise<any> okay
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http
      .delete(`${this.heroesUrl}/${hero.id}`, {headers: headers})
      .toPromise()      //.then(()=>hero)      // .then(res => res.json().data)
      .catch(this.handleError);
  }
  //SAVE (put|post)
  save(hero:Hero) {
    if (hero.id) {return this.put(hero)} else {return this.post(hero)};
  }



  private handleError(err: any) {
    console.log('ERROR: ', err);
    return Promise.reject(err.message || err);
  }
}