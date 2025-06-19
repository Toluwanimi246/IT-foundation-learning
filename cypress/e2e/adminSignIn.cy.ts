describe('admin sign in', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    cy.get('#select').select('Regular');
    cy.get('#select').select('Admin');
    cy.get('input[name="email"]').type('admin1@mail.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('input[name="adminKey"]').type('ADM001');
    cy.contains('div', 'Submit').click();

    cy.get('#sort').select('Title');

    cy.get('input[name="title"]').type('The Thirteen Curses');
    cy.get('input[name="year"]').type('2018');
    cy.get('input[name="author"]').type('Michelle Harrison');
    cy.get('input[name="isbn"]').type('9785577394875');
    cy.get('[data-cy="Add"]').click();

  })
})