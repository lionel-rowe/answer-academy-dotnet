import { autoinject } from 'aurelia-framework';
import { Router, RouteConfig } from 'aurelia-router'
import { HttpClient, json } from 'aurelia-fetch-client';
import { Person } from '../models/person';
import { IColour } from '../interfaces/icolour';
import { IPerson } from '../interfaces/iperson';

@autoinject
export class PersonEdit {

  constructor(private http: HttpClient, private router: Router) { }

  private heading: string;
  private person: Person;
  private colourOptions: IColour[] = [];
  private routerConfig: RouteConfig;

  async activate(params, routerConfig: RouteConfig) {
    this.routerConfig = routerConfig;

    const personResponse = await this.http.fetch(`/people/${params.id}`);
    this.personFetched(await personResponse.json());

    const colourResponse = await this.http.fetch('/colours');
    this.colourOptions = await colourResponse.json() as IColour[];
  }

  personFetched(person: IPerson): void {
    this.person = new Person(person)
    this.heading = `Update ${this.person.fullName}`;
    this.routerConfig.navModel.setTitle(`Update ${this.person.fullName}`);
  }

  colourMatcher(favouriteColour: IColour, checkBoxColour: IColour) {
    return favouriteColour.id === checkBoxColour.id;
  }

  async submit() {

    // DONE: Step 7

    const { id, authorised, enabled, colours } = this.person;

    const body = {
      authorised,
      enabled,
      colours
    };

    const response = await this.http.fetch(`/people/${this.person.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json; charset=utf-8'
      }
    });

    if (response.ok) {
      this.router.navigate('people');
    } else {
      // In production, we'd have considerably more in-depth error handling,
      // but here I'm just using a simple `alert` and ignoring non-HTTP errors.
      alert('An error occurred while saving. Please try again or contact tech support.');
    }

  }

  cancel() {
    this.router.navigate('people');
  }
}
