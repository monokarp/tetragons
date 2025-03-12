import { AppTestIds } from '@tetragons/shared';

class ZoneRow {
  private readonly testIds = AppTestIds.ZonePage.Row;

  public get itself() {
    return cy.byTestId(this.testIds.Host);
  }

  public deleteButton() {
    return this.itself.byTestId(this.testIds.Delete);
  }
}

export const zoneRowsComponent = new ZoneRow();
