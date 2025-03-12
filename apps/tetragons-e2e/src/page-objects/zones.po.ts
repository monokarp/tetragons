import { AppTestIds } from '@tetragons/shared';
import { zoneFormComponent } from './zone-form.co';
import { zoneRowsComponent } from './zone-row.co';

class ZonesPage {
  private readonly testIds = AppTestIds.ZonePage;

  public readonly Form = zoneFormComponent;
  public readonly Rows = zoneRowsComponent;

  public get itself() {
    return cy.byTestId(this.testIds.Host);
  }
}

export const zonesPage = new ZonesPage();
