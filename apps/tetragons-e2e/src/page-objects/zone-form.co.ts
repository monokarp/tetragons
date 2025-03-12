import { AppTestIds, Vertices } from '@tetragons/shared';
import { flatMap } from 'cypress/types/lodash';

class ZoneForm {
  private readonly testIds = AppTestIds.ZonePage.Form;

  public get itself() {
    return cy.byTestId(this.testIds.Host);
  }

  public nameInput() {
    return this.itself.byTestId(this.testIds.Name);
  }

  public coordinateInputs() {
    return this.itself.byTestId(this.testIds.Coordinate);
  }

  public errors() {
    return this.itself.byTestId(this.testIds.Errors);
  }

  public submitButton() {
    return this.itself.byTestId(this.testIds.Submit);
  }

  public typeInCoordinates(values: Vertices) {
    values
      .reduce((acc, pair) => acc.concat(...pair), [] as number[])
      .forEach((v, idx) =>
        this.coordinateInputs().eq(idx).clear().type(v.toString())
      );
  }
}

export const zoneFormComponent = new ZoneForm();
