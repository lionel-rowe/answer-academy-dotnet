import { IColour } from '../people/interfaces/icolour';

export class ColourNamesValueConverter {

  toView(colours: IColour[]): string {

    // DONE: Step 4

    return colours.map(c => c.name).sort().join(', ');
  }

}
