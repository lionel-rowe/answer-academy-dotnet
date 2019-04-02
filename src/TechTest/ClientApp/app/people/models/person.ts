import { computedFrom } from 'aurelia-framework';
import { IPerson } from '../interfaces/iperson';
import { IColour } from '../interfaces/icolour';

export class Person implements IPerson {

  constructor(person: IPerson) {
    this.id = person.id;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.authorised = person.authorised;
    this.enabled = person.enabled;
    this.colours = person.colours;
  }

  id: number;
  firstName: string;
  lastName: string;
  authorised: boolean;
  enabled: boolean;
  colours: IColour[];

  @computedFrom('firstName', 'lastName')
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @computedFrom('fullName')
  get palindrome(): boolean {
    // DONE: Step 5
    const sanitized = this.fullName.replace(/\s+/g, '').toLowerCase();

    // [...str] deals with slightly more edge cases than str.split(''), due to
    // correctly handling non-BMP unicode characters, but this will still fail
    // for corner cases such as combining diacritics, and cases like Turkish
    // İi/Iı will also fail due to `toLowerCase()` being locale agnostic.
    // 
    // Mathias Bynens has a fantastic article
    // (https://mathiasbynens.be/notes/javascript-unicode) on the problems of
    // handling every possible case when reversing a string in JavaScript.
    // 
    // I'm assuming the corner cases aren't too important here, as all the
    // names in the sample are ASCII-compatible.
    return [...sanitized].reverse().join('') === sanitized;
  }
}
