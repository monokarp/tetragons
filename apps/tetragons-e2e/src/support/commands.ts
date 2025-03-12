/// <reference types="cypress" />
import { testIdAttrName } from '@tetragons/shared';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      byTestId<E extends Node = HTMLElement>(
        id: string,
        options?: CyOptions
      ): CyChainable<E>;
    }
  }
}

export type CyOptions = Partial<
  Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow
>;
export type CyChainable<E extends Node = HTMLElement> = Cypress.Chainable<
  JQuery<E>
>;

Cypress.Commands.add(
  'byTestId',
  <E extends Node = HTMLElement>(
    id: string,
    options?: CyOptions
  ): CyChainable<E> => cy.get(`[${testIdAttrName}="${id}"]`, options)
);
