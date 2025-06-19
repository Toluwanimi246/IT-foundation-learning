describe('regular sign up', () => {
  it('passes', () => {
   cy.visit('http://localhost:3000');
    cy.contains('div', 'Regular').click();
    cy.get('input[name="email"]').type('user1@mail.com');
    cy.get('input[name="password"]').type('123456');
    cy.contains('div', 'Submit').click();
  })
})