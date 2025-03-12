import { zonesPage } from '../page-objects/zones.po';

describe('tetragons-e2e', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
  });

  it('lands on an empty page', () => {
    zonesPage.itself.should('be.visible');

    zonesPage.Rows.itself.should('not.exist');
  });

  it('displays errors submitting the default form state', () => {
    zonesPage.Form.errors().should('not.exist');

    zonesPage.Form.submitButton().click();

    zonesPage.Form.errors().should('be.visible').should('have.lengthOf', 2);

    zonesPage.Form.errors().contains('Zone name is required');
    zonesPage.Form.errors().contains('All points must be unique');
  });

  it('displays error submitting the form with matching points present', () => {
    zonesPage.Form.nameInput().type('Test zone');

    zonesPage.Form.typeInCoordinates([
      [8.5, -3],
      [11, 9.333],
      [8.5, -3],
      [0, -12],
    ]);

    zonesPage.Form.submitButton().click();

    zonesPage.Form.errors().should('be.visible').should('have.lengthOf', 1);

    zonesPage.Form.errors().contains('All points must be unique');
  });

  it('creates new zone and deletes it', () => {
    const zoneName = 'zone 1';

    zonesPage.Form.nameInput().type(zoneName);

    zonesPage.Form.typeInCoordinates([
      [8.5, -3],
      [11, 9.333],
      [-8.5, -3],
      [0, -12],
    ]);

    zonesPage.Form.submitButton().click();

    zonesPage.Form.errors().should('not.exist');

    zonesPage.Rows.itself.should('be.visible').should('have.lengthOf', 1);

    zonesPage.Rows.itself.last().contains(zoneName);

    zonesPage.Rows.deleteButton().last().click();

    zonesPage.Rows.itself.should('not.exist');
  });
});
