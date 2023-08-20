export namespace FindAndDo {

    export function getElement(selector: string) {
       return cy.get(selector)
    }
    export function findAndClick(selector: string) {
        cy.get(selector).click();
    }
}