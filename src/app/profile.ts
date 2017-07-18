
import { Country }            from './country';
import { State }            from './state';
import { City }            from './city';
export class Profile {constructor(
        public professionalTitle: string,
        public yourStatement: string,
        public aboutYou: string,
        public country: Country,
        public state: State,
        public city: City

    ) { }   
   
}